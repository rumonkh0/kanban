import Icon from "@/components/Icon";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
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
  useUpdateProject,
} from "../../hooks/useProjects";

function ProjectForm({ edit, title = "Add Project" }) {
  const navigate = useNavigate();
  const { id } = useParams();

  const [relatedFile, setRelatedFile] = useState(null);

  const [formData, setFormData] = useState({
    shortCode: "",
    projectName: "",
    startDate: "",
    dueDate: "",
    noDeadline: false,
    service: "",
    department: [],
    client: null,
    members: [],
    summary: "",
    ganttChart: "Enable",
    taskBoard: "Enable",
    taskApproval: "Disable",
    status: "In Progress",
    progress: 0,
    calculateProgress: false,
    projectPrice: "",
    discount: "",
    teamMembersPay: "",
    amountPaidByClient: "",
    amountOwedByClient: "",
    amountPaidToTeam: "",
    amountOwedToTeam: "",
    notifyClients: false,
  });

  // Fetch project data for editing
  // eslint-disable-next-line no-unused-vars
  const { data: projectData, isLoading: isLoadingProject } = useQuery({
    queryKey: ["project", id],
    queryFn: () => projectAPI.getById(id),
    enabled: edit && !!id,
    onSuccess: (data) => {
      setFormData({
        shortCode: data.shortCode || "",
        projectName: data.projectName || "",
        startDate: data.startDate || "",
        dueDate: data.dueDate || "",
        noDeadline: data.noDeadline || false,
        service: data.service || "",
        department: data.department || [],
        client: data.client || null,
        members: data.members || [],
        summary: data.summary || "",
        ganttChart: data.ganttChart || "Enable",
        taskBoard: data.taskBoard || "Enable",
        taskApproval: data.taskApproval || "Disable",
        status: data.status || "In Progress",
        progress: data.progress || 0,
        calculateProgress: data.calculateProgress || false,
        projectPrice: data.projectPrice || "",
        discount: data.discount || "",
        teamMembersPay: data.teamMembersPay || "",
        amountPaidByClient: data.amountPaidByClient || "",
        amountOwedByClient: data.amountOwedByClient || "",
        amountPaidToTeam: data.amountPaidToTeam || "",
        amountOwedToTeam: data.amountOwedToTeam || "",
        notifyClients: data.notifyClients || false,
      });
      if (data.relatedFile) {
        setRelatedFile(data.relatedFile);
      }
    },
  });

  // Fetch services
  const { data: services = [] } = useServices();

  // Fetch departments
  const { data: departments = [] } = useDepartments();

  // Create project mutation
  const createMutation = useCreateProject();

  // Update project mutation
  const updateMutation = useUpdateProject();

  // Delete project mutation
  const deleteMutation = useDeleteProject();

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (file) => {
    setRelatedFile(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.projectName || !formData.startDate || !formData.dueDate) {
      alert("Please fill in all required fields.");
      return;
    }

    // Create FormData for file upload
    const submitData = new FormData();

    // Append all form fields
    Object.keys(formData).forEach((key) => {
      if (formData[key] !== null && formData[key] !== undefined) {
        if (Array.isArray(formData[key])) {
          submitData.append(key, JSON.stringify(formData[key]));
        } else if (typeof formData[key] === "object") {
          submitData.append(key, JSON.stringify(formData[key]));
        } else {
          submitData.append(key, formData[key]);
        }
      }
    });

    // Append file if selected
    if (relatedFile) {
      submitData.append("relatedFile", relatedFile);
    }

    if (edit) {
      updateMutation.mutate({ id, data: submitData });
    } else {
      createMutation.mutate(submitData);
    }
  };

  const handleSaveAndAddMore = (e) => {
    e.preventDefault();

    if (!formData.projectName || !formData.startDate || !formData.dueDate) {
      alert("Please fill in all required fields.");
      return;
    }

    const submitData = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key] !== null && formData[key] !== undefined) {
        if (Array.isArray(formData[key])) {
          submitData.append(key, JSON.stringify(formData[key]));
        } else if (typeof formData[key] === "object") {
          submitData.append(key, JSON.stringify(formData[key]));
        } else {
          submitData.append(key, formData[key]);
        }
      }
    });

    if (relatedFile) {
      submitData.append("relatedFile", relatedFile);
    }

    createMutation.mutate(submitData, {
      onSuccess: () => {
        // Reset form for adding more
        setFormData({
          shortCode: "",
          projectName: "",
          startDate: "",
          dueDate: "",
          noDeadline: false,
          service: "",
          department: [],
          client: null,
          members: [],
          summary: "",
          ganttChart: "Enable",
          taskBoard: "Enable",
          taskApproval: "Disable",
          status: "In Progress",
          progress: 0,
          calculateProgress: false,
          projectPrice: "",
          discount: "",
          teamMembersPay: "",
          amountPaidByClient: "",
          amountOwedByClient: "",
          amountPaidToTeam: "",
          amountOwedToTeam: "",
          notifyClients: false,
        });
        setRelatedFile(null);
      },
    });
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      deleteMutation.mutate(id);
    }
  };

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
            <form className="grid grid-cols-3 gap-4">
              <FormField label="Short code">
                <Input
                  placeholder="Enter Short Code"
                  value={formData.shortCode}
                  onChange={(e) => handleChange("shortCode", e.target.value)}
                />
              </FormField>

              <FormField label="Project Name" required>
                <Input
                  placeholder="Enter Name"
                  value={formData.projectName}
                  onChange={(e) => handleChange("projectName", e.target.value)}
                />
              </FormField>

              <FormField label="Start Date" required>
                <div className="relative">
                  <input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => handleChange("startDate", e.target.value)}
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
                  <input
                    type="date"
                    value={formData.dueDate}
                    onChange={(e) => handleChange("dueDate", e.target.value)}
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
                />
              </FormField>

              <MultiSelect
                label="Department"
                options={
                  Array.isArray(departments) && departments.length > 0
                    ? departments.map((dept) => dept.title)
                    : ["Design", "Development", "Marketing", "UI/UX"]
                }
                value={formData.department}
                onChange={(vals) => handleChange("department", vals)}
              />

              <ClientSelect
                onSelect={(client) => handleChange("client", client)}
                label="Clients"
              />

              <ClientSelect
                onSelect={(member) =>
                  handleChange("members", [...formData.members, member])
                }
                label="Add Project Members"
              />

              <FormField
                label=" Project Summary and Notes"
                className="col-span-3"
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
                  {["Enable", "Disable"].map((val, idx) => (
                    <label
                      key={val}
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
                      <span>{val}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Public Task Board */}
              <div className="flex flex-col gap-2">
                <label className="typo-b2 text-text2">Public Task Board</label>
                <div className="flex typo-cta">
                  {["Enable", "Disable"].map((val, idx) => (
                    <label
                      key={val}
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
                      <span>{val}</span>
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
                  {["Enable", "Disable"].map((val, idx) => (
                    <label
                      key={val}
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
                      <span>{val}</span>
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
                          formData.status === "Done"
                            ? "bg-success"
                            : formData.status === "Cancelled"
                            ? "bg-brand"
                            : formData.status === "In Progress"
                            ? "bg-[#5EB7E0]"
                            : ""
                        }`}
                      />
                      <Dropdown
                        options={["Done", "Cancelled", "In Progress"]}
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
            <form className="grid grid-cols-3 gap-4">
              <div className="col-span-3 flex flex-col gap-2">
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

              {/* Money fields */}
              {[
                ["Project Price", "projectPrice"],
                ["Discount", "discount"],
                ["Team Members Pay", "teamMembersPay"],
                ["Amount Paid By Client", "amountPaidByClient"],
                ["Amount Owed By Client", "amountOwedByClient"],
                ["Amount Paid To Team Members", "amountPaidToTeam"],
                ["Amount Owed To Team Members", "amountOwedToTeam"],
              ].map(([label, field]) => (
                <div key={field} className="col-span-1 flex flex-col gap-2">
                  <label className="typo-b2 text-text2">{label}</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text2 typo-b3">
                      $
                    </span>
                    <input
                      type="text"
                      placeholder="0.00"
                      value={formData[field]}
                      onChange={(e) => handleChange(field, e.target.value)}
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
              {isLoading ? "Saving..." : "Save"}
            </RedButton>
            {edit ? (
              <Back>
                <RedBorderButton disabled={isLoading}>Cancel</RedBorderButton>
              </Back>
            ) : (
              <RedBorderButton
                type="button"
                onClick={handleSaveAndAddMore}
                disabled={isLoading}
              >
                {isLoading ? "Saving..." : "Save & Add More"}
              </RedBorderButton>
            )}
          </div>

          {edit ? (
            <RedButton
              type="button"
              onClick={handleDelete}
              disabled={isLoading}
            >
              {isLoading ? "Deleting..." : "Delete Project"}
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
