import Icon from "@/components/Icon";
import ClientSelect from "@/components/ClientSelect";
import { useState } from "react";
import {
  Dropdown,
  FormField,
  Input,
  MultiSelect,
} from "@/components/Component";
import { Back, RedBorderButton, RedButton } from "../../components/Component";

function ProjectForm({ edit }) {
  const [progressValue, setProgressValue] = useState(50);
  const [methods, setMethods] = useState([]);
  const [formData, setFormData] = useState({
    service: "",
    category: "",
    status: "",
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
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
              <Input placeholder="Enter Short Code" />
            </FormField>
            <FormField label="Project Name" required>
              <Input placeholder="Enter Name" />
            </FormField>
            <FormField label="Start Date" required>
              <div className="relative">
                <input
                  type="date"
                  placeholder="Select Date"
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
                  placeholder="Select Date"
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
                  id="noDeadline"
                  className="form-checkbox h-5 w-5 rounded border-divider bg-surface focus:ring-brand focus:ring-offset-0"
                />
                <label htmlFor="noDeadline" className="typo-b3 text-text2">
                  Without Due Date
                </label>
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
              value={methods}
              onChange={setMethods}
            />
            {/* client */}
            <ClientSelect
              onSelect={(client) => console.log("Client selected:", client)}
              label="Clients"
            />
            {/* Add Project Members */}
            <ClientSelect
              onSelect={(member) => console.log("Member selected:", member)}
              label="Add Project Members"
            />
            <FormField
              label=" Project Summary and Notes"
              className="col-span-3"
            >
              <textarea
                type="text"
                placeholder="Ener Message"
                className="w-full h-50 p-4 bg-surface2 border border-divider rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-brand typo-b3"
              />
            </FormField>
            {/* public gantt chart */}
            <div className="flex flex-col gap-2">
              <label className="typo-b2 text-text2">Public Gantt Chart</label>
              <div className="flex typo-cta">
                <label className="flex-1 h-12 flex items-center justify-center bg-brand text-white rounded-l-lg cursor-pointer">
                  <input
                    type="radio"
                    name="login"
                    className="hidden"
                    defaultChecked
                  />
                  <span>Enable</span>
                </label>
                <label className="flex-1 h-12 flex items-center justify-center bg-surface2 text-text rounded-r-lg cursor-pointer">
                  <input type="radio" name="login" className="hidden" />
                  <span>Disable</span>
                </label>
              </div>
            </div>
            {/* Public Task Board */}
            <div className="flex flex-col gap-2">
              <label className="typo-b2 text-text2">Public Task Board</label>
              <div className="flex typo-cta">
                <label className="flex-1 h-12 flex items-center justify-center bg-brand text-white rounded-l-lg cursor-pointer">
                  <input type="radio" name="login" className="hidden" />
                  <span>Enable</span>
                </label>
                <label className="flex-1 h-12 flex items-center justify-center bg-surface2 text-text rounded-r-lg cursor-pointer">
                  <input type="radio" name="login" className="hidden" />
                  <span>Disable</span>
                </label>
              </div>
            </div>
            {/* Task needs approval by Admin/Project Admin */}
            <div className="flex flex-col gap-2">
              <label className="typo-b2 text-text2">
                Task needs approval by Admin/Project Admin
              </label>
              <div className="flex typo-cta">
                <label className="flex-1 h-12 flex items-center justify-center bg-brand text-white rounded-l-lg cursor-pointer">
                  <input type="radio" name="login" className="hidden" />
                  <span>Enable</span>
                </label>
                <label className="flex-1 h-12 flex items-center justify-center bg-surface2 text-text rounded-r-lg cursor-pointer">
                  <input type="radio" name="login" className="hidden" />
                  <span>Disable</span>
                </label>
              </div>
            </div>
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
                ></div>
                <Dropdown
                  options={["Done", "Cancelled", "In Progress"]}
                  value={formData.status}
                  onChange={(val) => handleChange("status", val)}
                  className="pl-8"
                />
              </div>
            </FormField>
            {/* Progress Bar */}
            <div className="flex flex-col gap-2">
              <label className="typo-b2 text-text2">Public Task Board</label>
              <div className="flex flex-col gap-2">
                <div className="relative">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={progressValue}
                    onChange={(e) => setProgressValue(e.target.value)}
                    className="w-full h-2 bg-surface2 rounded-lg appearance-none cursor-pointer progress-slider"
                    style={{
                      background: `linear-gradient(to right, #5EB7E0 0%, #5EB7E0 ${progressValue}%, #E5E7EB ${progressValue}%, #E5E7EB 100%)`,
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
                      border: 0px solid #5eb7e0;
                      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                    }
                    .progress-slider::-moz-range-thumb {
                      height: 20px;
                      width: 20px;
                      border-radius: 50%;
                      background: #5eb7e0;
                      cursor: pointer;
                      border: 0px solid #5eb7e0;
                      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                    }
                  `}</style>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="typo-b2 text-text2 invisible">Status</div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="noDeadline"
                  className="form-checkbox h-5 w-5 rounded border-divider bg-surface focus:ring-brand focus:ring-offset-0"
                />
                <label htmlFor="noDeadline" className="typo-b3 text-text2">
                  Send Task Notification To Clints
                </label>
              </div>
            </div>
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
                <button
                  type="button"
                  className="flex items-center gap-2 text-text2"
                >
                  <Icon name="upload" size={24} />
                  <span className="typo-b3">Upload file here</span>
                </button>
              </div>
            </div>
            {/* Project Price */}
            <div className="col-span-1 flex flex-col gap-2">
              <label className="typo-b2 text-text2">Project Price</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text2 typo-b3">
                  $
                </span>
                <input
                  type="text"
                  placeholder="0.00"
                  className="w-full h-12 bg-surface2 border border-divider rounded-lg pl-6 pr-4 focus:outline-none focus:ring-2 focus:ring-brand typo-b3"
                />
              </div>
            </div>
            <div className="col-span-1 flex flex-col gap-2">
              <label className="typo-b2 text-text2">Project Price</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text2 typo-b3">
                  $
                </span>
                <input
                  type="text"
                  placeholder="0.00"
                  className="w-full h-12 bg-surface2 border border-divider rounded-lg pl-6 pr-4 focus:outline-none focus:ring-2 focus:ring-brand typo-b3"
                />
              </div>
            </div>
            <div className="col-span-1 flex flex-col gap-2">
              <label className="typo-b2 text-text2">Project Price</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text2 typo-b3">
                  $
                </span>
                <input
                  type="text"
                  placeholder="0.00"
                  className="w-full h-12 bg-surface2 border border-divider rounded-lg pl-6 pr-4 focus:outline-none focus:ring-2 focus:ring-brand typo-b3"
                />
              </div>
            </div>
            <div className="col-span-1 flex flex-col gap-2">
              <label className="typo-b2 text-text2">Project Price</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text2 typo-b3">
                  $
                </span>
                <input
                  type="text"
                  placeholder="0.00"
                  className="w-full h-12 bg-surface2 border border-divider rounded-lg pl-6 pr-4 focus:outline-none focus:ring-2 focus:ring-brand typo-b3"
                />
              </div>
            </div>
            <div className="col-span-1 flex flex-col gap-2">
              <label className="typo-b2 text-text2">Project Price</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text2 typo-b3">
                  $
                </span>
                <input
                  type="text"
                  placeholder="0.00"
                  className="w-full h-12 bg-surface2 border border-divider rounded-lg pl-6 pr-4 focus:outline-none focus:ring-2 focus:ring-brand typo-b3"
                />
              </div>
            </div>
            <div className="col-span-1 flex flex-col gap-2">
              <label className="typo-b2 text-text2">Project Price</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text2 typo-b3">
                  $
                </span>
                <input
                  type="text"
                  placeholder="0.00"
                  className="w-full h-12 bg-surface2 border border-divider rounded-lg pl-6 pr-4 focus:outline-none focus:ring-2 focus:ring-brand typo-b3"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="noDeadline"
                  className="form-checkbox h-5 w-5 rounded border-divider bg-surface focus:ring-brand focus:ring-offset-0"
                />
                <label htmlFor="noDeadline" className="typo-b3 text-text2">
                  Send Task Notification To Clints
                </label>
              </div>
            </div>
          </form>
        </div>
      </div>

      {edit ? (
        <div className="flex justify-between">
          <div className="flex gap-4">
            <RedButton>Save</RedButton>
            <RedBorderButton>Cancel</RedBorderButton>
          </div>

          <RedButton>Delete Client</RedButton>
        </div>
      ) : (
        <div className="flex justify-between">
          <div className="flex gap-4">
            <RedButton>Save</RedButton>

            <RedButton>Cancel</RedButton>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProjectForm;
