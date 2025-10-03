import { useState } from "react";
import {
  Dropdown,
  FormField,
  Icon,
  Input,
  RedButton,
} from "../../components/Component";

function Setting() {
  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => setShowPassword(!showPassword);
  const [formData, setFormData] = useState({
    salulation: "",
    category: "",
    gender: "",
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        <div>
          <img
            src="/images/profile.png"
            alt=""
            className="w-40 h-43 rounded-sm"
          />
        </div>
        <div className="flex-1 flex flex-wrap border border-divider rounded-lg bg-surface2 p-4">
          <div className="flex-[4] border-r-2 border-divider flex flex-col gap-2 pr-8">
            <div className="typo-b2">Emergency Contact</div>
            <Input placeholder="Enter Email" />
            <Input placeholder="Enter Phone" />
          </div>
          <div className="flex-[6] flex flex-col gap-2 pl-4">
            <div className="typo-b2">Documents</div>
            <div className="flex items-center justify-center h-12 bg-surface2 border-2 border-divider rounded-lg">
              <button
                type="button"
                className="flex items-center gap-2 text-text2"
              >
                <Icon name="upload" size={24} />
                <span className="typo-b3">Upload File Here</span>
              </button>
            </div>
            <div className="w-[184px] h-12 bg-divider flex justify-between items-center gap-1 p-1.5 rounded-sm">
              <Icon name="file" size={35} />
              <div className="typo-b3 text-text flex flex-col">
                <h2>Project</h2>
                <p>Requirements.pdf</p>
              </div>
              <Icon name="cross-red" size={16} />
            </div>
          </div>
        </div>
      </div>
      <form className="grid grid-cols-3 gap-4">
        <FormField label="Your Name">
          <Input placeholder="Enter Name" />
        </FormField>
        <FormField label="Your Email" required>
          <Input placeholder="Enter Email" />
        </FormField>
        <div className="flex flex-col gap-2">
          {/* Label */}
          <label className="flex justify-between items-center w-full typo-b2 text-text2">
            <span>Password</span>
            <span className="text-[10px] text-text2">
              Must have at least 8 characters
            </span>
          </label>

          <div className="relative w-full">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder={`Enter Password`}
            />
            <button
              type="button"
              onClick={togglePassword}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center text-text2 cursor-pointer"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              <Icon name={showPassword ? "eye" : "eye"} className="w-5 h-5" />
            </button>
          </div>
        </div>
        <FormField label="Receive email notifications?">
          <div className="flex typo-cta">
            <label className="flex-1 h-12 flex items-center justify-center bg-brand text-white rounded-l-lg cursor-pointer">
              <Input type="radio" name="notifications" className="hidden" />
              <span>Yes</span>
            </label>
            <label className="flex-1 h-12 flex items-center justify-center bg-surface2 text-text rounded-r-lg cursor-pointer">
              <Input type="radio" name="notifications" className="hidden" />
              <span>No</span>
            </label>
          </div>
        </FormField>
        <FormField label="Enable Google Calender">
          <div className="flex typo-cta">
            <label className="flex-1 h-12 flex items-center justify-center bg-brand text-white rounded-l-lg cursor-pointer">
              <Input type="radio" name="notifications" className="hidden" />
              <span>Yes</span>
            </label>
            <label className="flex-1 h-12 flex items-center justify-center bg-surface2 text-text rounded-r-lg cursor-pointer">
              <Input type="radio" name="notifications" className="hidden" />
              <span>No</span>
            </label>
          </div>
        </FormField>
        <FormField label="Country">
          <div className="relative">
            <select className="w-full h-12 bg-surface2 border border-divider rounded-lg px-4  appearance-none focus:outline-none focus:ring-2 focus:ring-brand pl-12 typo-b3">
              <option>USA</option>
              <option>Canada</option>
              <option>UK</option>
            </select>
            <div className="absolute left-4 top-1/2 -translate-y-1/2">
              <Icon name="flag" />
            </div>
            <Icon
              name="arrow"
              size={24}
              className="absolute right-4 top-1/2 -translate-y-1/2"
            />
          </div>
        </FormField>
        <FormField label="Mobile">
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-1 border-r border-text2">
              <Icon name="flag" />
              <span className="text-text2 typo-b3">+1</span>
              <Icon name="arrow" size={24} className="mr-1" />
            </div>
            <Input
              type="tel"
              placeholder="Enter Mobile Number"
              className="pl-23"
            />
          </div>
        </FormField>
        <FormField label="Change Language">
          <div className="relative">
            <select className="w-full h-12 bg-surface2 border border-divider rounded-lg px-4 appearance-none focus:outline-none focus:ring-2 focus:ring-brand pl-12 typo-b3">
              <option>English</option>
              <option>Spanish</option>
              <option>French</option>
            </select>
            <div className="absolute left-4 top-1/2 -translate-y-1/2">
              <Icon name="flag" />
            </div>
            <Icon
              name="arrow"
              size={24}
              className="absolute right-4 top-1/2 -translate-y-1/2"
            />
          </div>
        </FormField>
        <FormField label="Gender">
          <Dropdown
            options={["Male", "female", "Others"]}
            value={formData.gender}
            onChange={(val) => handleChange("gender", val)}
          />
        </FormField>
        <FormField label="Date of Birth">
          <div className="relative">
            <Input type="date" placeholder="Select Date" />
            <Icon
              name="calendar"
              className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4"
            />
          </div>
        </FormField>
        <FormField label="Slack Member ID">
          <Input placeholder="eg.@admin" />
        </FormField>
        <FormField label="Marital Status">
          <Dropdown
            options={[
              "Single",
              "Married",
              "Unmarried",
              "Divorced",
              "Widowed",
              "Separated",
              "In a relationship",
              "It's complicated",
              "Prefer not to say",
            ]}
            value={formData.gender}
            onChange={(val) => handleChange("gender", val)}
          />
        </FormField>
        <FormField label="Address" className="col-span-3">
          <Input placeholder="Enter Address" className="h-16" />
        </FormField>
        <FormField label="Address" className="col-span-3">
          <textarea
            placeholder="Enter Address"
            className="h-40 p-4 typo-b3 bg-surface2 border-2 border-divider rounded-sm"
          ></textarea>
        </FormField>
      </form>
      <div>
        <RedButton>Save</RedButton>
      </div>
    </div>
  );
}

export default Setting;
