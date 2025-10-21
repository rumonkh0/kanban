import Icon from "@/components/Icon";
import ClientSelect from "@/components/ClientSelect";
import { useEffect, useState } from "react";
import {
  Back,
  Dropdown,
  FormField,
  Input,
  InputMoney,
  RedBorderButton,
  RedButton,
} from "@/components/Component";
import { useLocation, useParams } from "react-router";
import PageTitle from "@/components/PageTitle";
// Assuming these hooks exist for PaidTo, similar to the PaidFrom example
import {
  useCreatePaidTo,
  useDeletePaidTo,
  usePaidTo,
  useUpdatePaidTo,
} from "../../hooks/useFinance";
// Re-using the project hooks since PaidTo also relates to a project
import {
  // useProject,
  useProjectMembers,
  useProjects,
} from "../../hooks/useProjects";
import { useBack } from "../../hooks/useBack";

function PaidToForm({ edit = false, title = "Add Team Payment" }) {
  const { id } = useParams();
  const location = useLocation();
  const back = useBack("/admin/finance/team-payments");
  const [more, setMore] = useState(false);
  // const [selectedMember, setSelectedMember] = useState(null);
  const [formData, setFormData] = useState({
    project: location.state?.projectId || "",
    paidTo: null,
    toBePaid: "",
    paymentDate: "",
    amountPaid: "",
    amountOwed: "",
    paidMethod: "",
    invoiceNo: "",
  });

  // Renamed file state to 'relatedFile' for consistency with PaidByForm
  const [relatedFile, setRelatedFile] = useState(null);
  const [, setInvoicePreview] = useState(null);

  // Fetch single paid to data for editing
  const { data: paidToData, isLoading: isLoadingPaidTo } = usePaidTo(id);
  const { data: projects = [] } = useProjects({}, { enabled: !edit });
  const { data: projectMembersData } = useProjectMembers(
    !edit && formData.project
  );

  const createMutation = useCreatePaidTo();
  const updateMutation = useUpdatePaidTo(id);
  const deleteMutation = useDeletePaidTo();

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (file) => {
    if (!file) return;

    setRelatedFile(file); // Set to relatedFile for consistency

    // Create preview for certain file types
    if (file.type && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setInvoicePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setInvoicePreview(file.name);
    }
  };

  const handleSubmit = () => {
    // Basic validation
    if (
      !formData.project ||
      !formData.paidTo ||
      !formData.paymentDate ||
      !formData.amountPaid ||
      !formData.paidMethod
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    // Create FormData for file upload
    const submitData = new FormData();

    // Append all form fields
    Object.keys(formData).forEach((key) => {
      const value = formData[key];
      if (value !== undefined && value !== null) {
        submitData.append(key, value);
      }
    });

    // Append file if selected (using 'relatedFile' key for consistency)
    if (relatedFile) {
      submitData.append("relatedFile", relatedFile);
    }

    if (edit) {
      updateMutation.mutate(submitData);
    } else {
      createMutation.mutate(submitData);
    }
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this payment?")) {
      deleteMutation.mutate(id);
    }
  };

  // --- useEffect for Save & Add More (copied from PaidByForm) ---
  useEffect(() => {
    const iscreated = createMutation.isSuccess;
    if (iscreated && more) {
      setFormData({
        project: "",
        paidTo: null,
        toBePaid: "",
        discount: "",
        paymentDate: "",
        amountPaid: "",
        amountOwed: "",
        paidMethod: "",
        invoiceNo: "",
      });
      setRelatedFile(null);
      setInvoicePreview(null);
      setMore(false); // Reset 'more' state after success
    } else {
      if (iscreated || updateMutation.isSuccess || deleteMutation.isSuccess) {
        back();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    createMutation.isSuccess,
    updateMutation.isSuccess,
    deleteMutation.isSuccess,
  ]);

  // --- useEffect for Editing (copied from PaidByForm) ---
  useEffect(() => {
    if (paidToData) {
      setFormData({
        project: paidToData.project || "",
        paidTo: paidToData.paidTo || null, // Updated key
        member: paidToData.freelancer._id || null,
        toBePaid: paidToData.toBePaid || "",
        discount: paidToData.discount || "",
        paymentDate: paidToData.paymentDate?.split("T")[0] || "",
        amountPaid: paidToData.amountPaid || "",
        amountOwed: paidToData.amountOwed || "",
        paidMethod: paidToData.paidMethod || "",
        invoiceNo: paidToData.invoiceNo || "",
      });
      if (paidToData.relatedFile) {
        // Check for 'relatedFile' consistency
        setInvoicePreview(paidToData.relatedFile);
      }
    }
  }, [paidToData]);

  useEffect(() => {
    if (formData.paidTo) {
      const member = projectMembersData?.find((m) => m._id === formData.paidTo);
      if (member)
        setFormData((prev) => ({
          ...prev,
          haveToPay: member.haveToPay,
          amountOwed: member.amountOwed,
          member: member.freelancer._id,
        }));
    }
  }, [formData.paidTo, projectMembersData]);

  const isLoading =
    createMutation.isPending ||
    updateMutation.isPending ||
    deleteMutation.isPending;

  if (edit && isLoadingPaidTo) {
    return <div>Loading payment data...</div>;
  }

  // // Utility to calculate Amount Owed after payment
  // const calculateAmountOwed = () => {
  //   const toBePaid = Number(formData.toBePaid) || 0;
  //   const amountPaid = Number(formData.amountPaid) || 0;
  //   const discount = Number(formData.discount) || 0;
  //   return (toBePaid - discount - amountPaid).toFixed(2);
  // };

  const projectOptions = Array.isArray(projects)
    ? projects.map((p) => ({
        value: p._id,
        label: p.projectName,
      }))
    : [];

  // Find the PaidTo entity if editing
  const paidToEntity = edit
    ? [
        {
          id: paidToData?.freelancer?._id,
          name: paidToData?.freelancer?.name,
          email: paidToData?.freelancer?.user?.email,
          profilePicture: paidToData?.freelancer?.profilePicture,
        },
      ]
    : projectMembersData?.map((f) => ({
        id: f._id,
        name: f.freelancer.name,
        // email: f.user.email,
        profilePicture: f.freelancer.profilePicture,
      })); // ClientSelect will fetch clients in non-edit mode

  return (
    <>
      <PageTitle title={edit ? "Edit Team Payment" : title} />
      <div className="flex flex-col gap-8">
        <div>
          <div className="mb-4 flex justify-between items-center">
            <div className="typo-b1">Team Payment Details</div>
            <Back>
              <Icon name="close" />
            </Back>
          </div>
          <div className="bg-surface1 rounded-xl">
            <form
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
              onSubmit={(e) => e.preventDefault()}
            >
              {/* Added onSubmit to prevent default browser behavior */}
              <FormField label="Project" required>
                {!edit ? (
                  <Dropdown
                    options={projectOptions}
                    value={formData.project || ""}
                    onChange={(val) => handleChange("project", val)}
                  />
                ) : (
                  <Input
                    className="typo-b3"
                    value={formData.project?.projectName || ""}
                    disabled
                  />
                )}
              </FormField>
              <ClientSelect
                value={edit ? formData.member : formData.paidTo}
                clients={edit && paidToEntity?.id ? paidToEntity : paidToEntity}
                onChange={(entity) => {
                  handleChange("paidTo", entity);
                }}
                label="Paid To"
                disabled={edit}
                type="paidTo"
                addButton={false}
              />
              {!edit && (
                <FormField label="Total To Be Paid" required>
                  <InputMoney
                    value={formData.haveToPay}
                    // onChange={(val) => handleChange("toBePaid", val)}
                    disabled
                  />
                </FormField>
              )}
              <FormField label="Amount Owed to Member">
                <InputMoney
                  value={formData.amountOwed}
                  // onChange={(val) => handleChange("discount", val)}
                  disabled
                />
              </FormField>
              <FormField label="Payment Date" required>
                <div className="relative">
                  <input
                    type="date"
                    value={formData.paymentDate}
                    onChange={(e) =>
                      handleChange("paymentDate", e.target.value)
                    }
                    className="w-full h-12 bg-surface2 border border-divider rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-brand typo-b3"
                  />
                  <Icon
                    name="calendar"
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4"
                  />
                </div>
              </FormField>
              <FormField label="Amount Paid" required>
                <InputMoney
                  value={formData.amountPaid}
                  onChange={(val) => handleChange("amountPaid", val)}
                />
              </FormField>
              <FormField label="Amount Owed (After Payment)">
                {/* Auto-calculate Amount Owed based on ToBePaid, Discount, and Paid */}
                <InputMoney
                  value={
                    formData.amountPaid
                      ? formData.amountOwed - formData.amountPaid
                      : ""
                  }
                  disabled
                />
              </FormField>
              <FormField label="Payment Method" required>
                <Dropdown
                  options={["Cash", "Bank Transfer", "Stripe", "Other"]}
                  value={formData.paidMethod}
                  onChange={(val) => handleChange("paidMethod", val)}
                />
              </FormField>
              {/* <FormField label="Status" required>
                <div className="relative">
                  <div
                    className={`w-2 h-2 rounded-full absolute left-4 top-1/2 -translate-y-1/2 z-50 ${
                      formData.paymentStatus === "Paid"
                        ? "bg-success"
                        : formData.paymentStatus === "Unpaid"
                        ? "bg-brand"
                        : formData.paymentStatus === "Owed"
                        ? "bg-[#A88AED]"
                        : ""
                    }`}
                  ></div>
                  <Dropdown
                    options={["Owed", "Paid", "Unpaid"]}
                    value={formData.paymentStatus}
                    onChange={(val) => handleChange("paymentStatus", val)}
                    className="pl-8 w-full h-12 bg-surface2 rounded-lg border-divider"
                  />
                </div>
              </FormField> */}
              <FormField label="Invoice No.">
                <Input
                  value={formData.invoiceNo}
                  onChange={(e) => handleChange("invoiceNo", e)}
                />
              </FormField>
              <FormField
                label="Upload Invoice"
                className="md:col-span-2 lg:col-span-3"
              >
                <div className="flex items-center justify-center h-16 bg-surface2 border-2 border-divider rounded-lg">
                  <label className="flex items-center gap-2 text-text2 cursor-pointer">
                    <Icon name="upload" size={24} />
                    <span className="typo-b3">
                      {relatedFile ? relatedFile.name : "Upload Invoice Here"}
                    </span>
                    <input
                      type="file"
                      className="hidden"
                      onChange={(e) => handleFileChange(e.target.files[0])}
                    />
                  </label>
                </div>
              </FormField>
            </form>
          </div>
        </div>

        <div className="flex justify-between">
          <div className="flex gap-4">
            <RedButton
              type="button"
              onClick={() => handleSubmit(false)} // Explicitly pass false for 'Save'
              disabled={isLoading}
            >
              {(createMutation.isPending || updateMutation.isPending) && !more
                ? "Saving..."
                : edit
                ? "Update"
                : "Save"}
            </RedButton>
            {edit ? (
              <Back>
                <RedBorderButton disabled={isLoading}>Cancel</RedBorderButton>
              </Back>
            ) : (
              <RedBorderButton
                type="button"
                onClick={() => {
                  setMore(true);
                  handleSubmit(true); // Explicitly pass true for 'Save & Add More'
                }}
                disabled={isLoading}
              >
                {createMutation.isPending && more
                  ? "Saving..."
                  : "Save & Add More"}
              </RedBorderButton>
            )}
          </div>

          {edit ? (
            <RedButton
              type="button"
              onClick={handleDelete}
              disabled={isLoading}
            >
              {deleteMutation.isPending ? "Deleting..." : "Delete Payment"}
            </RedButton>
          ) : (
            <Back>
              <RedButton disabled={isLoading}>Cancel</RedButton>
            </Back>
          )}
        </div>
      </div>
    </>
  );
}

export default PaidToForm;
