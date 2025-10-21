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
import { useProject, useProjects } from "../../hooks/useProjects";
import {
  useCreatePaidFrom,
  useDeletePaidFrom,
  usePaidFrom,
  useUpdatePaidFrom,
} from "../../hooks/useFinance";
import { useBack } from "../../hooks/useBack";
import { toast } from "react-toastify";

function PaidByForm({ edit = false, title = "Add Payment" }) {
  const { id } = useParams();
  const location = useLocation();
  const back = useBack("/admin/finance/payments");
  const [more, setMore] = useState(false);
  const [formData, setFormData] = useState({
    project: location.state?.projectId || "",
    client: null,
    toBePaid: "",
    teamPayment: "",
    revenue: "",
    paymentDate: "",
    amountPaid: "",
    amountOwed: "",
    paidMethod: "",
    invoiceNo: "",
  });
  const [relatedFile, setInvoiceFile] = useState(null);
  const [, setInvoicePreview] = useState(null);

  // Fetch paid by data for editing
  const { data: paidByData, isLoading: isLoadingPaidBy } = usePaidFrom(id);
  const { data: projectData } = useProject(!edit && formData.project);
  const { data: projects = [] } = useProjects({}, { enabled: !edit });
  const createMutation = useCreatePaidFrom();
  const updateMutation = useUpdatePaidFrom(id);
  const deleteMutation = useDeletePaidFrom();

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (file) => {
    if (!file) return;

    setInvoiceFile(file);

    // Create preview for certain file types
    if (file.type.startsWith("image/")) {
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
      // !formData.project ||
      // !formData.toBePaid ||
      !formData.paymentDate ||
      !formData.amountPaid ||
      !formData.paidMethod
      // !formData.paymentStatus
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }

    // Create FormData for file upload
    const submitData = new FormData();

    Object.keys(formData).forEach((key) => {
      const value = formData[key];
      if (value !== undefined && value !== null) {
        submitData.append(key, value);
      }
    });

    if (relatedFile) {
      submitData.append("relatedFile", relatedFile);
    }

    if (edit) {
      toast.promise(updateMutation.mutateAsync(submitData), {
        pending: "Updating Payment...",
        success: "Payment updated successfully!",
        error: {
          render: ({ data }) =>
            data?.response?.data?.message || "Failed to update payment.",
        },
      });
    } else {
      toast.promise(createMutation.mutateAsync(submitData), {
        pending: "Creating Payment...",
        success: {
          render() {
            if (more) return "Payment created! You can add another.";
            return "Payment created successfully!";
          },
        },
        error: {
          render: ({ data }) =>
            data?.response?.data?.message || "Failed to create payment.",
        },
      });
    }
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this payment?")) {
      toast.promise(deleteMutation.mutateAsync(id), {
        pending: "Deleting Payment...",
        success: "Payment deleted successfully!",
        error: {
          render: ({ data }) =>
            data?.response?.data?.message || "Failed to delete payment.",
        },
      });
    }
  };

  useEffect(() => {
    const iscreated = createMutation.isSuccess;
    if (iscreated && more) {
      setFormData({
        project: "",
        client: null,
        toBePaid: "",
        discount: "",
        teamPayment: "",
        revenue: "",
        paymentDate: "",
        amountPaid: "",
        amountOwed: "",
        paidMethod: "",
        paymentStatus: "Owed",
        invoiceNo: "",
      });
      setInvoiceFile(null);
      setInvoicePreview(null);
      setMore(false);
    } else if (iscreated) {
      back();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [createMutation.isSuccess]);

  useEffect(() => {
    if (updateMutation.isSuccess) back();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateMutation.isSuccess]);

  useEffect(() => {
    if (deleteMutation.isSuccess) back();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deleteMutation.isSuccess]);

  useEffect(() => {
    if (paidByData) {
      setFormData({
        project: paidByData.project || "",
        client: paidByData.client || null,
        projectPrice: paidByData.projectPrice || "",
        haveToPay: paidByData.haveToPay || "",
        toBePaid: paidByData.toBePaid || "",
        teamPayment: paidByData.teamPayment || "",
        revenue: paidByData.revenue || "",
        paymentDate: paidByData.paymentDate?.split("T")[0] || "",
        amountPaid: paidByData.amountPaid || "",
        amountOwed: paidByData.amountOwed || "",
        paidMethod: paidByData.paidMethod || "",
        paymentStatus: paidByData.paymentStatus || "Owed",
        invoiceNo: paidByData.invoiceNo || "",
      });
      if (paidByData.relatedFile) {
        setInvoicePreview(paidByData.relatedFile);
      }
    }
  }, [paidByData]);

  const isLoading =
    createMutation.isPending ||
    updateMutation.isPending ||
    deleteMutation.isPending;

  if (edit && isLoadingPaidBy) {
    return <div>Loading payment data...</div>;
  }

  return (
    <>
      <PageTitle title={edit ? "Edit Payment" : title} />
      <div className="flex flex-col gap-8">
        <div>
          <div className="mb-4 flex justify-between items-center">
            <div className="typo-b1">Payment Details</div>
            <Back>
              <Icon name="close" />
            </Back>
          </div>
          <div className="bg-surface1 rounded-xl">
            <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <FormField label="Project" required>
                {!edit ? (
                  <Dropdown
                    options={
                      Array.isArray(projects) && projects.length > 0
                        ? projects.map((service) => ({
                            value: service._id,
                            label: service.projectName,
                          }))
                        : []
                    }
                    value={formData.project || ""}
                    onChange={(val) => handleChange("project", val)}
                    // disabled={location.state.projectId}
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
                value={edit ? formData.client?._id : projectData?.client?._id}
                clients={
                  edit
                    ? [
                        {
                          id: formData?.client?._id,
                          name: formData?.client?.name,
                          email: formData?.client?.user?.email,
                          profilePicture: formData?.client?.profilePicture,
                        },
                      ]
                    : [
                        {
                          id: projectData?.client?._id,
                          name: projectData?.client?.name,
                          email: projectData?.client?.user?.email,
                          profilePicture: projectData?.client?.profilePicture,
                        },
                      ]
                }
                onChange={(client) => handleChange("client", client)}
                label="Paid By"
                disabled
              />

              <FormField label="Project Price" required>
                <InputMoney
                  value={
                    edit
                      ? formData.haveToPay
                      : projectData?.finalAmountForClient
                  }
                  // onChange={(val) => handleChange("toBePaid", val)}
                  disabled
                />
              </FormField>

              <FormField label="Amount Owed By Client" required>
                <InputMoney
                  value={
                    edit
                      ? formData.amountOwedByClient
                      : projectData?.amountOwedByClient
                  }
                  // onChange={(val) => handleChange("toBePaid", val)}
                  disabled
                />
              </FormField>

              {/* <FormField label="Discount">
                <Input
                  type="text"
                  value={formData.discount}
                  onChange={(e) => handleChange("discount", e.target.value)}
                />
              </FormField> */}

              {!edit && (
                <>
                  <FormField label="Team Payment (Auto)">
                    <InputMoney
                      value={projectData?.amountPayableToMembers}
                      disabled
                    />
                  </FormField>

                  <FormField label="Revenue (Auto)">
                    <InputMoney
                      value={projectData?.finalAmountEarned}
                      disabled
                    />
                  </FormField>
                </>
              )}

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
                <InputMoney
                  value={
                    projectData?.amountOwedByClient != null &&
                    formData.amountPaid !== ""
                      ? projectData.amountOwedByClient -
                        Number(formData.amountPaid)
                      : ""
                  }
                  onChange={(val) => handleChange("amountOwed", val)}
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
                  onChange={(val) => handleChange("invoiceNo", val)}
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
              onClick={handleSubmit}
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
                  handleSubmit();
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

export default PaidByForm;
