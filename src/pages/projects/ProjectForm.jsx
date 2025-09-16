import Icon from "@/components/Icon";
import { useState } from "react";
// import { useMutation } from "@tanstack/react-query";
// import axios from "axios";
import ClientSelect from "@/components/ClientSelect";
import {
  Dropdown,
  FormField,
  Input,
  MultiSelect,
} from "@/components/Component";
import { Back, RedBorderButton, RedButton } from "../../components/Component";
// const saveProject = async (data) => {
//   const formData = new FormData();
//   Object.entries(data).forEach(([key, value]) => {
//     if (Array.isArray(value)) {
//       value.forEach((v) => formData.append(`${key}[]`, v));
//     } else if (value !== null && value !== undefined) {
//       formData.append(key, value);
//     }
//   });

//   const res = await axios.post("/api/projects", formData, {
//     headers: { "Content-Type": "multipart/form-data" },
//   });
//   return res.data;
// };
function ProjectForm({ edit, client = {} }) {
  const [formData, setFormData] = useState({
    shortCode: client.shortCode || "",
    projectName: client.projectName || "",
    startDate: client.startDate || "",
    dueDate: client.dueDate || "",
    noDeadline: client.noDeadline || false,
    service: client.service || "",
    category: client.category || "",
    department: client.department || [],
    client: client.client || null,
    members: client.members || [],
    summary: client.summary || "",
    ganttChart: client.ganttChart || "Enable",
    taskBoard: client.taskBoard || "Enable",
    taskApproval: client.taskApproval || "Enable",
    status: client.status || "",
    progress: client.progress || 50,
    calculateProgress: client.calculateProgress || false,
    projectPrice: client.projectPrice || "",
    discount: client.discount || "",
    teamMembersPay: client.teamMembersPay || "",
    amountPaidByClient: client.amountPaidByClient || "",
    amountOwedByClient: client.amountOwedByClient || "",
    amountPaidToTeam: client.amountPaidToTeam || "",
    amountOwedToTeam: client.amountOwedToTeam || "",
    notifyClients: client.notifyClients || false,
    relatedFile: null,
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // const mutation = useMutation({ mutationFn: saveProject });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // mutation.mutate(formData, {
    //   onSuccess: () => {
    //     alert("Project saved successfully!");
    //   },
    //   onError: (err) => {
    //     console.error(err);
    //     alert("Error saving project");
    //   },
    // });
  };

  return (
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
                  onChange={(e) => handleChange("noDeadline", e.target.checked)}
                  className="form-checkbox h-5 w-5 rounded border-divider bg-surface focus:ring-brand focus:ring-offset-0"
                />
                <label className="typo-b3 text-text2">Without Due Date</label>
              </div>
            </FormField>

            <FormField label="Service">
              <Dropdown
                options={["Service 2", "service 3"]}
                value={formData.service}
                onChange={(val) => handleChange("service", val)}
              />
            </FormField>

            <MultiSelect
              label="Department"
              options={["Design", "Development", "Marketing", "UI/UX"]}
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
            {edit && (<><FormField label="Status" required>
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
                  className="pl-8"
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
                    onChange={(e) => handleChange("progress", e.target.value)}
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
              <div className="typo-b2 text-text2 invisible">Calculate Progress Through Task</div>
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
            </div></>)}
            

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
                <input
                  type="file"
                  onChange={(e) =>
                    handleChange("relatedFile", e.target.files[0])
                  }
                />
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
          <RedButton type="button" onClick={handleSubmit}>
            Save
          </RedButton>
          {edit ? (
            <Back>
              <RedBorderButton>Cancel</RedBorderButton>
            </Back>
          ) : (
            <RedBorderButton>Save & Add More</RedBorderButton>
          )}
        </div>

        {edit ? (
          <RedButton>Delete Client</RedButton>
        ) : (
          <Back>
            <RedButton>Cancel</RedButton>
          </Back>
        )}
      </div>
    </div>
  );
}

export default ProjectForm;
