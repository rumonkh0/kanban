import Icon from "@/components/Icon";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import ClientSelect from "@/components/ClientSelect";
import {
  Dropdown,
  FormField,
  Input,
  MultiSelect,
} from "@/components/Component";
import { Back, RedBorderButton, RedButton } from "../../components/Component";
import PageTitle from "@/components/PageTitle";
import { useDepartments } from "../../hooks/hr/useDepartments";
import { useServices } from "../../hooks/useService";
import {
  useCreateProject,
  useDeleteProject,
  useProject,
  useUpdateProject,
} from "../../hooks/useProjects";
import { useTeamMembers } from "../../hooks/useTeam";
import { useClients } from "../../hooks/useClients";
import { toast } from "react-toastify";

const baseURL = import.meta.env.VITE_FILE_API_URL || "http://localhost:5000";

function ProjectForm({ edit, title = "Add Project" }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const [more, setMore] = useState(false);
  const [formData, setFormData] = useState({
    shortCode: "",
    projectName: "",
    startDate: new Date().toISOString().split("T")[0],
    dueDate: "",
    noDeadline: true,
    service: null,
    departments: [],
    client: null,
    members: [],
    summary: "",
    ganttChart: true,
    taskBoard: true,
    taskApproval: false,
    progress: 0,
    calculateProgress: false,
    projectPrice: "",
    discount: "",
    amountPayableToMembers: "",
    amountPaidByClient: "",
    amountOwedByClient: "",
    amountPaidToTeam: "",
    amountOwedToTeam: "",
    notifyClients: true,
  });
  const [relatedFile, setRelatedFile] = useState(null);

  //fetch projects
  const { data: projectData, isLoading: isLoadingProject } = useProject(id);
  const { data: services = [] } = useServices();
  const { data: departments = [] } = useDepartments();
  const createMutation = useCreateProject();
  const updateMutation = useUpdateProject(id);
  const deleteMutation = useDeleteProject();
  const { data: freelancers = [] } = useTeamMembers();
  const { data: clients = [] } = useClients();

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (file) => {
    setRelatedFile(file);
  };

  const handleSubmit = () => {
    console.log(formData);
    // Basic validation
    if (
      !formData.projectName ||
      !formData.startDate ||
      (!formData.noDeadline && !formData.dueDate)
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    // Create FormData for file upload
    const submitData = new FormData();

    // Append all form fields
    // Object.keys(formData).forEach((key) => {
    //   if (formData[key] !== null && formData[key] !== undefined) {
    //     if (Array.isArray(formData[key])) {
    //       submitData.append(key, JSON.stringify(formData[key]));
    //     } else if (typeof formData[key] === "object") {
    //       submitData.append(key, JSON.stringify(formData[key]));
    //     } else {
    //       submitData.append(key, formData[key]);
    //     }
    //   }
    // });

    // Append all form fields
    Object.keys(formData).forEach((key) => {
      const value = formData[key];
      if (
        value !== undefined &&
        value !== null &&
        key !== "members" &&
        key !== "departments"
      ) {
        submitData.append(key, value);
      }
    });

    formData.members.forEach((method) =>
      submitData.append("members[]", method)
    );
    formData.departments.forEach((method) =>
      submitData.append("departments[]", method)
    );

    // Append file if selected
    if (relatedFile) {
      submitData.append("relatedFile", relatedFile);
    }
    console.log(submitData);
    if (edit) {
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
    } else {
      toast.promise(
        createMutation.mutateAsync(submitData),
        {
          pending: "Creating Project",
          success: "Project Created",
          error: {
            render({ data }) {
              const errorMessage =
                data.response?.data?.message ||
                data.response?.data?.error ||
                data.message ||
                "Failed to Create Project.";
              return errorMessage;
            },
          },
        },
        { autoClose: 5000 }
      );
    }
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      toast.promise(
        deleteMutation.mutateAsync(id),
        {
          pending: "Deleting Project",
          success: "Project Deleted",
          error: {
            render({ data }) {
              const errorMessage =
                data.response?.data?.message ||
                data.response?.data?.error ||
                data.message ||
                "Failed to Delete Project.";
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
      setFormData({
        shortCode: projectData.shortCode || "",
        projectName: projectData.projectName || "",
        startDate: projectData.startDate.split("T")[0] || "",
        dueDate: projectData.dueDate?.split("T")[0] || "",
        noDeadline: projectData.noDeadline ?? false,
        service: projectData.service || null,
        departments: projectData.departments || [],
        client: projectData.client?._id || null,
        members: projectData.members
          ? projectData.members?.map((m) => m._id)
          : [],
        summary: projectData.summary || "",
        ganttChart: projectData.ganttChart || true,
        taskBoard: projectData.taskBoard || true,
        taskApproval: projectData.taskApproval || false,
        status: projectData.status,
        progress: projectData.progress ?? 0,
        calculateProgress: projectData.calculateProgress ?? false,
        projectPrice: projectData.projectPrice ?? null,
        discount: projectData.discount ?? null,
        amountPayableToMembers: projectData.amountPayableToMembers ?? null,
        amountPaidByClient: projectData.amountPaidByClient ?? null,
        amountOwedByClient: projectData.amountOwedByClient ?? null,
        amountPaidToTeam: projectData.amountPaidToTeam ?? null,
        amountOwedToTeam: projectData.amountOwedToTeam ?? null,
        notifyClients: projectData.notifyClients ?? false,
      });
      setRelatedFile(
        projectData.profilePicture?.filePath &&
          `${baseURL}/${projectData.profilePicture.filePath}`
      ) || null;
    }
  }, [projectData]);

  useEffect(() => {
    const iscreated = createMutation.isSuccess;
    if (iscreated && more) {
      setFormData({
        shortCode: "",
        projectName: "",
        startDate: new Date().toISOString().split("T")[0],
        dueDate: "",
        noDeadline: true,
        service: null,
        departments: [],
        client: null,
        members: [],
        summary: "",
        ganttChart: true,
        taskBoard: true,
        taskApproval: false,
        progress: 0,
        calculateProgress: false,
        projectPrice: "",
        discount: "",
        amountPayableToMembers: "",
        amountPaidByClient: "",
        amountOwedByClient: "",
        amountPaidToTeam: "",
        amountOwedToTeam: "",
        notifyClients: true,
      });
      setRelatedFile(null);
    } else {
      if (iscreated) navigate(-1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [createMutation.isSuccess]);

  useEffect(() => {
    if (formData.service && services?.length > 0) {
      const selectedService = services.find((s) => s._id === formData.service);

      if (selectedService) {
        const memberIds = selectedService.freelancers?.map((m) => m._id) || [];

        setFormData((prev) => ({
          ...prev,
          members: memberIds,
        }));
      }
    }
  }, [formData.service, services]);

  const isLoading =
    createMutation.isPending ||
    updateMutation.isPending ||
    deleteMutation.isPending;

  if (edit && isLoadingProject) {
    return <div>Loading project data...</div>;
  }

  return (
    <>
      <PageTitle title={edit ? "Edit Project" : title} />
      <div className="flex flex-col gap-8">
        <div>
          <div className="mb-4 flex justify-between items-center">
            <div className="typo-b1">Account Details</div>
            <Back>
              <Icon name="close" />
            </Back>
          </div>
          <div className="bg-surface1 rounded-xl">
            <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <FormField label="Short code">
                <Input
                  placeholder="Enter Short Code"
                  value={formData.shortCode}
                  onChange={(val) => handleChange("shortCode", val)}
                />
              </FormField>

              <FormField label="Project Name" required>
                <Input
                  placeholder="Enter Name"
                  value={formData.projectName}
                  onChange={(val) => handleChange("projectName", val)}
                />
              </FormField>

              <FormField label="Start Date" required>
                <div className="relative">
                  <Input
                    type="date"
                    value={formData.startDate}
                    onChange={(val) => handleChange("startDate", val)}
                    className="w-full h-12 bg-surface2 border border-divider rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-brand typo-b3"
                  />
                  <Icon
                    name="calendar"
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4"
                  />
                </div>
              </FormField>

              <FormField label="Due Date" required>
                <div className="relative">
                  <Input
                    type="date"
                    value={formData.dueDate}
                    onChange={(val) => handleChange("dueDate", val)}
                    className="w-full h-12 bg-surface2 border border-divider rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-brand typo-b3"
                  />
                  <Icon
                    name="calendar"
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4"
                  />
                </div>
              </FormField>

              <FormField label="There Is no Project Deadline">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.noDeadline}
                    onChange={(e) =>
                      handleChange("noDeadline", e.target.checked)
                    }
                    className="form-checkbox h-5 w-5 rounded border-divider bg-surface focus:ring-brand focus:ring-offset-0"
                  />
                  <label className="typo-b3 text-text2">Without Due Date</label>
                </div>
              </FormField>

              <FormField label="Service">
                <Dropdown
                  options={
                    Array.isArray(services) && services.length > 0
                      ? services.map((service) => ({
                          value: service._id,
                          label: service.serviceName,
                        }))
                      : ["Service 2", "Service 3"]
                  }
                  value={formData.service}
                  onChange={(val) => handleChange("service", val)}
                  allowClear
                />
              </FormField>

              <MultiSelect
                label="Department"
                options={
                  Array.isArray(departments) && departments.length > 0
                    ? departments.map((dept) => ({
                        value: dept._id,
                        label: dept.title,
                      }))
                    : ["Design", "Development", "Marketing", "UI/UX"]
                }
                value={formData.departments}
                onChange={(vals) => handleChange("departments", vals)}
              />

              <ClientSelect
                value={formData.client}
                clients={clients.map((f) => ({
                  id: f._id,
                  name: f.name,
                  email: f.user.email,
                  profilePicture: f.profilePicture,
                }))}
                onChange={(client) => handleChange("client", client)}
                label="Clients"
              />

              <ClientSelect
                value={formData.members}
                clients={freelancers.map((f) => ({
                  id: f._id,
                  name: f.name,
                  email: f.user.email,
                  profilePicture: f.profilePicture,
                }))}
                onChange={(members) => handleChange("members", members)}
                mode="multi"
                label="Add Project Members"
                addingTitle="Add new member"
                placeHolder="Select Members...."
                disabled={!!formData.service}
              />

              <FormField
                label=" Project Summary and Notes"
                className="md:col-span-2 lg:col-span-3"
              >
                <textarea
                  placeholder="Enter Message"
                  value={formData.summary}
                  onChange={(e) => handleChange("summary", e.target.value)}
                  className="w-full h-50 p-4 bg-surface2 border border-divider rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-brand typo-b3"
                />
              </FormField>

              {/* Public Gantt Chart */}
              <div className="flex flex-col gap-2">
                <label className="typo-b2 text-text2">Public Gantt Chart</label>
                <div className="flex typo-cta">
                  {[true, false].map((val, idx) => (
                    <label
                      key={idx}
                      className={`flex-1 h-12 flex items-center justify-center cursor-pointer ${
                        formData.ganttChart === val
                          ? "bg-brand text-white"
                          : "bg-surface2 text-text"
                      } ${idx === 0 ? "rounded-l-lg" : "rounded-r-lg"}`}
                    >
                      <input
                        type="radio"
                        name="ganttChart"
                        value={val}
                        checked={formData.ganttChart === val}
                        onChange={() => handleChange("ganttChart", val)}
                        className="hidden"
                      />
                      <span>{val ? "Enable" : "Disable"}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Public Task Board */}
              <div className="flex flex-col gap-2">
                <label className="typo-b2 text-text2">Public Task Board</label>
                <div className="flex typo-cta">
                  {[true, false].map((val, idx) => (
                    <label
                      key={idx}
                      className={`flex-1 h-12 flex items-center justify-center cursor-pointer ${
                        formData.taskBoard === val
                          ? "bg-brand text-white"
                          : "bg-surface2 text-text"
                      } ${idx === 0 ? "rounded-l-lg" : "rounded-r-lg"}`}
                    >
                      <input
                        type="radio"
                        name="taskBoard"
                        value={val}
                        checked={formData.taskBoard === val}
                        onChange={() => handleChange("taskBoard", val)}
                        className="hidden"
                      />
                      <span>{val ? "Enable" : "Disable"}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Task Approval */}
              <div className="flex flex-col gap-2">
                <label className="typo-b2 text-text2">
                  Task needs approval by Admin/Project Admin
                </label>
                <div className="flex typo-cta">
                  {[true, false].map((val, idx) => (
                    <label
                      key={idx}
                      className={`flex-1 h-12 flex items-center justify-center cursor-pointer ${
                        formData.taskApproval === val
                          ? "bg-brand text-white"
                          : "bg-surface2 text-text"
                      } ${idx === 0 ? "rounded-l-lg" : "rounded-r-lg"}`}
                    >
                      <input
                        type="radio"
                        name="taskApproval"
                        value={val}
                        checked={formData.taskApproval === val}
                        onChange={() => handleChange("taskApproval", val)}
                        className="hidden"
                      />
                      <span>{val ? "Enable" : "Disable"}</span>
                    </label>
                  ))}
                </div>
              </div>
              {edit && (
                <>
                  <FormField label="Status" required>
                    <div className="relative">
                      <div
                        className={`w-2 h-2 rounded-full absolute left-4 top-1/2 -translate-y-1/2 z-50 ${
                          formData.status === "Completed"
                            ? "bg-success"
                            : formData.status === "On Hold"
                            ? "bg-brand"
                            : formData.status === "Active"
                            ? "bg-[#5EB7E0]"
                            : ""
                        }`}
                      />
                      <Dropdown
                        options={["Active", "Completed", "On Hold"]}
                        value={formData.status}
                        onChange={(val) => handleChange("status", val)}
                        className="pl-8 w-full h-12 bg-surface2 rounded-lg border-divider"
                      />
                    </div>
                  </FormField>

                  {/* Progress */}
                  <div className="flex flex-col gap-2">
                    <label className="typo-b2 text-text2">Progress</label>
                    <div className="flex flex-col gap-2">
                      <div className="relative">
                        <input
                          type="range"
                          min="0"
                          max="100"
                          className="w-full h-2 bg-surface2 rounded-lg appearance-none cursor-pointer progress-slider"
                          value={formData.progress}
                          onChange={(e) =>
                            handleChange("progress", e.target.value)
                          }
                          style={{
                            background: `linear-gradient(to right, #5EB7E0 0%, #5EB7E0 ${formData.progress}%, #E5E7EB ${formData.progress}%, #E5E7EB 100%)`,
                          }}
                        />
                        <style jsx>{`
                          .progress-slider::-webkit-slider-thumb {
                            appearance: none;
                            height: 20px;
                            width: 20px;
                            border-radius: 50%;
                            background: #5eb7e0;
                            cursor: pointer;
                          }
                          .progress-slider::-moz-range-thumb {
                            height: 20px;
                            width: 20px;
                            border-radius: 50%;
                            background: #5eb7e0;
                            cursor: pointer;
                          }
                        `}</style>
                      </div>
                    </div>
                  </div>

                  {/* Notify Clients */}
                  <div className="flex flex-col gap-2">
                    <div className="typo-b2 text-text2 invisible">
                      Calculate Progress Through Task
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={formData.calculateProgress}
                        onChange={(e) =>
                          handleChange("calculateProgress", e.target.checked)
                        }
                        className="form-checkbox h-5 w-5 rounded border-divider bg-surface focus:ring-brand focus:ring-offset-0"
                      />
                      <label className="typo-b3 text-text2">
                        Calculate Progress Through Task
                      </label>
                    </div>
                  </div>
                </>
              )}
            </form>
          </div>
        </div>

        <div>
          <div className="typo-b1 mb-4">Other Details</div>

          <div className="bg-surface1 rounded-xl">
            <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="md:col-span-2 lg:col-span-3 flex flex-col gap-2">
                <label className="typo-b2 text-text2">
                  Add Project Related File
                </label>
                <div className="flex items-center justify-center h-16 bg-surface2 border border-dashed border-divider rounded-lg">
                  <label className="flex items-center gap-2 text-text2 cursor-pointer">
                    <Icon name="upload" size={16} />
                    <span className="typo-b3">
                      {relatedFile
                        ? relatedFile.name || "Change File"
                        : "Upload Project File"}
                    </span>
                    <input
                      type="file"
                      className="hidden"
                      onChange={(e) => handleFileChange(e.target.files[0])}
                    />
                  </label>
                </div>
              </div>

              {/* ["Amount Paid By Client", "amountPaidByClient"],
                ["Amount Owed By Client", "amountOwedByClient"],
                ["Amount Paid To Team Members", "amountPaidToTeam"],
                ["Amount Owed To Team Members", "amountOwedToTeam"], */}
              {/* Money fields */}
              {[
                ["Project Price", "projectPrice"],
                ["Discount", "discount"],
                ["Team Members Pay", "amountPayableToMembers"],
              ].map(([label, field]) => (
                <div key={field} className="col-span-1 flex flex-col gap-2">
                  <label className="typo-b2 text-text2">{label}</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text2 typo-b3">
                      $
                    </span>
                    <Input
                      type="text"
                      placeholder="0.00"
                      value={formData[field]}
                      onChange={(val) => handleChange(field, val)}
                      className="w-full h-12 bg-surface2 border border-divider rounded-lg pl-6 pr-4 focus:outline-none focus:ring-2 focus:ring-brand typo-b3"
                    />
                  </div>
                </div>
              ))}
              <div className="flex flex-col gap-2 col-[1]">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.notifyClients}
                    onChange={(e) =>
                      handleChange("notifyClients", e.target.checked)
                    }
                    className="form-checkbox h-5 w-5 rounded border-divider bg-surface focus:ring-brand focus:ring-offset-0"
                  />
                  <label className="typo-b3 text-text2">
                    Send Task Notification To Clients
                  </label>
                </div>
              </div>
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
                  handleSubmit(true);
                  setMore(true);
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
              {deleteMutation.isPending ? "Deleting..." : "Delete Client"}
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

export default ProjectForm;
