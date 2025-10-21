import ClientSelect from "@/components/ClientSelect";
import {
  FormField,
  Input,
  RedButton,
  RedBorderButton,
  Dropdown,
  Back,
  InputMoney,
} from "@/components/Component";
import Icon from "@/components/Icon";
import PageTitle from "@/components/PageTitle";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import {
  useProject,
  useProjects,
  useUpdateProject,
} from "../../hooks/useProjects";
import { toast } from "react-toastify";
import Loading from "../../components/Loading";
import { useBack } from "../../hooks/useBack";

function AddTracker({ edit = false, title = "Add Tracker" }) {
  const back = useBack("/admin/services/trackers");
  const { id } = useParams();
  const [more, setMore] = useState(false);
  const [formData, setFormData] = useState({
    project: null,
    projectName: "",
    client: null,
    companyName: "",
    teamMember: null,
    startDate: "",
    dueDate: "",
    description: "",
    status: "Active",
    price: "",
    customPrice: "",
    discount: "",
    finalAmountForClient: "",
    modeOfPayment: "",
    datePaidByClient: "",
    amountPaidByClient: "",
    amountOwedByClient: "",
    amountPayableToMembers: "",
    datePaidToMembers: "",
    amountPaidToMembers: "",
    amountOwedToMembers: "",
    finalAmountEarned: "",
    comments: "",
  });

  // const { data: projectData, isLoading: isLoadingProject } = useProject(id);
  const { data: projectData, isPendingProject } = useProject(
    id || formData.project
  );
  const { data: projectsData, isProjectDataPending } = useProjects(
    { tracker: false, archive: false },
    {
      enabled: !id,
    }
  );
  const updateMutation = useUpdateProject(id || formData.project);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const isLoading = updateMutation.isPending;

  const handleSubmit = () => {
    // console.log(formData);

    // Create FormData for file upload
    const submitData = new FormData();

    // Append all form fields

    // Append all form fields
    Object.keys(formData).forEach((key) => {
      const value = formData[key];
      if (
        value !== undefined &&
        value !== null &&
        key !== "members" &&
        key !== "departments" &&
        key !== "client" &&
        key !== "finalAmountForClient" &&
        key !== "amountPaidByClient" &&
        key !== "amountOwedByClient" &&
        key !== "amountPaidToMembers" &&
        key !== "amountOwedToMembers"
      ) {
        submitData.append(key, value);
      }
    });
    submitData.append("tracker", true);

    console.log(submitData);
    toast.promise(
      updateMutation.mutateAsync(submitData),
      {
        pending: "Updating Project",
        success: "Project Updated",
        error: {
          render({ data }) {
            const errorMessage =
              data.response?.data?.message ||
              data.response?.data?.error ||
              data.message ||
              "Failed to Update Project.";
            return errorMessage;
          },
        },
      },
      { autoClose: 5000 }
    );
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this tracker?")) {
      toast.promise(
        updateMutation.mutateAsync({ tracker: false }, { onSuccess: back }),
        {
          pending: "Deleting Tracker",
          success: "Tracker Deleted",
          error: {
            render({ data }) {
              const errorMessage =
                data.response?.data?.message ||
                data.response?.data?.error ||
                data.message ||
                "Failed to Delete Tracker.";
              return errorMessage;
            },
          },
        },
        { autoClose: 5000 }
      );
    }
  };

  useEffect(() => {
    if (projectData) {
      setFormData((prev) => ({
        ...prev,
        shortCode: projectData.shortCode || "",
        projectName: projectData.projectName || "",
        startDate: projectData.startDate.split("T")[0] || "",
        dueDate: projectData.dueDate?.split("T")[0] || "",
        noDeadline: projectData.noDeadline ?? false,
        service: projectData.service || null,
        departments: projectData.department || [],
        client: projectData.client || null,
        members: projectData.members,
        summary: projectData.summary || "",
        ganttChart: projectData.ganttChart || true,
        taskBoard: projectData.taskBoard || true,
        taskApproval: projectData.taskApproval || false,
        status: projectData.status,
        progress: projectData.progress ?? 0,
        calculateProgress: projectData.calculateProgress ?? false,
        projectPrice: projectData.projectPrice ?? null,
        customPrice: projectData.customPrice ?? null,
        discount: projectData.discount ?? null,
        finalAmountForClient: projectData.finalAmountForClient ?? null,
        amountPayableToMembers: projectData.amountPayableToMembers ?? null,
        amountPaidByClient: projectData.amountPaidByClient ?? null,
        amountOwedByClient: projectData.amountOwedByClient ?? null,
        amountPaidToMembers: projectData.amountPaidToMembers ?? null,
        amountOwedToMembers: projectData.amountOwedToMembers ?? null,
        finalAmountEarned: projectData.finalAmountEarned ?? null,
        notifyClients: projectData.notifyClients ?? false,
      }));
    }
  }, [projectData]);

  useEffect(() => {
    const iscreated = updateMutation.isSuccess;
    if (iscreated && more) {
      setFormData(() => ({
        project: null,
        projectName: "",
        client: null,
        companyName: "",
        teamMember: null,
        startDate: "",
        dueDate: "",
        description: "",
        status: "Active",
        price: "",
        customPrice: "",
        discount: "",
        finalAmountForClient: "",
        modeOfPayment: "",
        datePaidByClient: "",
        amountPaidByClient: "",
        amountOwedByClient: "",
        amountPayableToMembers: "",
        datePaidToMembers: "",
        amountPaidToMembers: "",
        amountOwedToMembers: "",
        finalAmountEarned: "",
        comments: "",
      }));
      setMore(false);
      toast.success("You can add another Tracker now.");
    } else {
      if (iscreated) back();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateMutation.isSuccess]);

  if (edit && isPendingProject) {
    return <Loading />;
  }
  return (
    <>
      <PageTitle title={title} />
      <div className="flex flex-col gap-8">
        <div>
          <div className="mb-4 flex justify-between items-center">
            <div className="typo-b1">{title}</div>
            <Back>
              <Icon name="close" />
            </Back>
          </div>
          <div className="bg-surface1 rounded-xl">
            <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <FormField label="Project" required>
                {edit ? (
                  <Dropdown
                    options={[`${formData?.projectName}`]}
                    value={formData?.projectName}
                    onChange={(val) => handleChange("project", val)}
                  />
                ) : (
                  <Dropdown
                    options={
                      Array.isArray(projectsData) && projectsData.length > 0
                        ? projectsData.map((service) => ({
                            value: service._id,
                            label: service.projectName,
                          }))
                        : []
                    }
                    value={formData?.project || ""}
                    onChange={(val) => handleChange("project", val)}
                    disabled={isProjectDataPending}
                  />
                )}
              </FormField>
              <ClientSelect
                value={formData.client?._id}
                clients={[
                  {
                    id: formData?.client?._id,
                    name: formData?.client?.name,
                    email: formData?.client?.user?.email,
                    profilePicture: formData?.client?.profilePicture,
                  },
                ]}
                onChange={(client) => handleChange("client", client)}
                label="Client"
                disabled
              />
              <FormField label="Company Name (auto take)">
                <Input
                  placeholder="Enter Company Name"
                  value={formData.companyName}
                  onChange={(val) => handleChange("companyName", val)}
                />
              </FormField>
              <ClientSelect
                value={formData?.members?.map((m) => m._id)}
                clients={formData?.members?.map((f) => ({
                  id: f._id,
                  name: f.name,
                  // email: f.user.email,
                  profilePicture: f.profilePicture,
                }))}
                onChange={(members) => handleChange("members", members)}
                mode="multi"
                label="Team Members"
                addingTitle="Add new member"
                placeHolder="Select Members...."
                disabled
              />
              <FormField label="Start Date (auto take after projec or clint select)">
                <div className="relative">
                  <Input
                    type="date"
                    placeholder="Select Date"
                    value={formData?.startDate}
                    onChange={(val) => handleChange("startDate", val)}
                    disabled
                  />
                  <Icon
                    name="calendar"
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4"
                  />
                </div>
              </FormField>
              <FormField label="Due Date (auto take Same)">
                <div className="relative">
                  <Input
                    type="date"
                    placeholder="Select Date"
                    value={formData?.dueDate}
                    onChange={(val) => handleChange("dueDate", val)}
                    disabled
                  />
                  <Icon
                    name="calendar"
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4"
                  />
                </div>
              </FormField>
              <FormField
                label="Description (auto or Type)"
                className="md:col-span-2 lg:col-span-3"
              >
                <textarea
                  placeholder="Enter Message"
                  value={formData?.summary}
                  onChange={(e) => handleChange("description", e.target.value)}
                  className="w-full h-50 p-4 bg-surface2 border border-divider rounded-lg focus:outline-none focus:ring-2 focus:ring-brand typo-b3"
                />
              </FormField>
              <FormField label="Project Status">
                <div className="relative">
                  <div
                    className={`w-2 h-2 rounded-full absolute left-4 top-1/2 -translate-y-1/2 ${
                      formData?.status === "Completed"
                        ? "bg-success"
                        : formData?.status === "On Hold"
                        ? "bg-brand"
                        : formData?.status === "Active"
                        ? "bg-[#5EB7E0]"
                        : ""
                    }`}
                  ></div>
                  <select
                    value={formData?.status}
                    onChange={(e) => handleChange("status", e.target.value)}
                    className="w-full h-12 bg-surface2 border border-divider rounded-lg px-4 appearance-none focus:outline-none focus:ring-2 focus:ring-brand pl-8 typo-b3"
                  >
                    <option value="Active">Active</option>
                    <option value="On Hold">On Hold</option>
                    <option value="Completed">Completed</option>
                  </select>
                  <Icon
                    name="arrow"
                    size={24}
                    className="absolute right-4 top-1/2 -translate-y-1/2"
                  />
                </div>
              </FormField>
              <FormField label="Price">
                <InputMoney
                  placeholder="USD"
                  value={formData?.projectPrice}
                  onChange={(val) => handleChange("projectPrice", val)}
                />
              </FormField>
              <FormField label="Custom Price">
                <InputMoney
                  placeholder="USD"
                  value={formData?.customPrice}
                  onChange={(val) => handleChange("customPrice", val)}
                />
              </FormField>
              <FormField label="Discount">
                <InputMoney
                  placeholder="USD"
                  value={formData?.discount}
                  onChange={(val) => handleChange("discount", val)}
                />
              </FormField>
              <FormField label="Final Amount For Client">
                <InputMoney
                  placeholder="USD"
                  value={formData?.finalAmountForClient}
                  onChange={(val) => handleChange("finalAmountForClient", val)}
                  disabled
                />
              </FormField>
              <FormField label="Mode of Payment">
                <Dropdown
                  options={["Cash", "Bank Transfer", "Cheque", "Online"]}
                  value={formData?.modeOfPayment}
                  onChange={(val) => handleChange("modeOfPayment", val)}
                />
              </FormField>
              {/* <FormField label="Date Paid By the Client">
                <div className="relative">
                  <Input
                    type="date"
                    placeholder="Select Date"
                    value={formData.datePaidByClient}
                    onChange={(val) => handleChange("datePaidByClient", val)}
                  />
                  <Icon
                    name="calendar"
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4"
                  />
                </div>
              </FormField> */}
              <FormField label="Amount Paid By Client">
                <InputMoney
                  placeholder="USD"
                  value={formData?.amountPaidByClient}
                  onChange={(val) => handleChange("amountPaidByClient", val)}
                  disabled
                />
              </FormField>
              <FormField label="Amount Owed By Client">
                <InputMoney
                  placeholder="USD"
                  value={formData?.amountOwedByClient}
                  onChange={(val) => handleChange("amountOwedByClient", val)}
                  disabled
                />
              </FormField>
              <FormField label="Amount Payable To Members">
                <InputMoney
                  placeholder="USD"
                  value={formData?.amountPayableToMembers}
                  onChange={(val) =>
                    handleChange("amountPayableToMembers", val)
                  }
                />
              </FormField>
              {/* <FormField label="Date Paid To The Members">
                <div className="relative">
                  <Input
                    type="date"
                    placeholder="Select Date"
                    value={formData.datePaidToMembers}
                    onChange={(val) => handleChange("datePaidToMembers", val)}
                  />
                  <Icon
                    name="calendar"
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4"
                  />
                </div>
              </FormField> */}
              <FormField label="Amount Paid To Members">
                <InputMoney
                  placeholder="USD"
                  value={formData?.amountPaidToMembers}
                  onChange={(val) => handleChange("amountPaidToMembers", val)}
                  disabled
                />
              </FormField>
              <FormField label="Amount Owed To Members">
                <InputMoney
                  placeholder="USD"
                  value={formData?.amountOwedToMembers}
                  onChange={(val) => handleChange("amountOwedToMembers", val)}
                  disabled
                />
              </FormField>
              <FormField label="Final Amount Earned">
                <InputMoney
                  placeholder="USD"
                  value={formData?.finalAmountEarned}
                  onChange={(val) => handleChange("finalAmountEarned", val)}
                  disabled
                />
              </FormField>
              <FormField label="Comments">
                <Input
                  placeholder="Add Comments"
                  value={formData.comments}
                  onChange={(val) => handleChange("comments", val)}
                />
              </FormField>
            </form>
          </div>
        </div>

        {edit ? (
          <div className="flex justify-between">
            <div className="flex gap-4">
              <RedButton
                type="button"
                onClick={handleSubmit}
                disabled={isLoading}
              >
                {isLoading ? "Saving..." : "Save"}
              </RedButton>
              <Back>
                <RedBorderButton disabled={isLoading}>Cancel</RedBorderButton>
              </Back>
            </div>

            <RedButton
              type="button"
              onClick={handleDelete}
              disabled={isLoading}
            >
              {isLoading ? "Deleting..." : "Delete"}
            </RedButton>
          </div>
        ) : (
          <div className="flex justify-between">
            <div className="flex gap-4">
              <RedButton
                type="button"
                onClick={handleSubmit}
                disabled={isLoading}
              >
                {isLoading ? "Saving..." : "Save"}
              </RedButton>
              <RedBorderButton
                type="button"
                onClick={() => {
                  handleSubmit(true);
                  setMore(true);
                }}
                disabled={isLoading}
              >
                {isLoading ? "Saving..." : "Save & Add More"}
              </RedBorderButton>
            </div>

            <Back>
              <RedButton disabled={isLoading}>Cancel</RedButton>
            </Back>
          </div>
        )}
      </div>
    </>
  );
}

export default AddTracker;
