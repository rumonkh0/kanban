import {
  FormField,
  Input,
  RedBorderButton,
  RedButton,
} from "../../components/Component";

function ThemeSetting() {
  return (
    <div className="flex flex-col gap-4">
      <form class="grid grid-cols-3">
        <FormField label="App Name" required>
          <Input placeholder="Type Name" />
        </FormField>
      </form>
      <FormField label="Select Branding Style" required />
      <div className="flex gap-4">
        <div>
          <img src="/images/header1.png" alt="" className="h-38" />
        </div>
        <div>
          <img src="/images/header2.png" alt="" className="h-38" />
        </div>
      </div>
      <form className="grid grid-cols-3 gap-4">
        <FormField label="Light Mode Logo" gap={4} required>
          <div className="h-20 border border-divider bg-surface2 rounded-lg flex justify-center items-center underline typo-b3 text-text2">
            Upload Logo
          </div>
        </FormField>
        <FormField label="Dark Mode Logo" gap={4} required>
          <div className="h-20 border border-divider bg-surface2 rounded-lg flex justify-center items-center underline typo-b3 text-text2">
            Upload Logo
          </div>
        </FormField>
        <FormField label="Login Screen Background Image " gap={4} required>
          <div className="h-20 border border-divider bg-surface2 rounded-lg flex justify-center items-center underline typo-b3 text-text2">
            Upload Logo
          </div>
        </FormField>
        <FormField label="Favicon Image " gap={4} required>
          <div className="h-20 border border-divider bg-surface2 rounded-lg flex justify-center items-center underline typo-b3 text-text2">
            Upload Logo
          </div>
        </FormField>{" "}
        <FormField label="Login Screen Logo's background Color" required>
          <Input placeholder="Enter Name" />
        </FormField>
        <FormField label="Choose Google Recaptcha Version">
          <div className="flex typo-cta">
            <label className="flex-1 h-12 flex items-center justify-center bg-brand rounded-l-lg cursor-pointer">
              <Input type="radio" name="notifications" className="hidden" />
              <span>Dark</span>
            </label>
            <label className="flex-1 h-12 flex items-center justify-center bg-surface2 text-text2 rounded-r-lg cursor-pointer">
              <Input type="radio" name="notifications" className="hidden" />
              <span>Light</span>
            </label>
          </div>
        </FormField>
      </form>
      <div className="border-b border-divider"></div>
      <div className="flex flex-col gap-4">
        <div className="typo-b1">Public Pages Theme</div>
        <div className="grid grid-cols-3 gap-4">
          <FormField label="Primary Color" required>
            <Input type="color" placeholder="Enter Name" />
          </FormField>
          <FormField label="Public Pages Theme ">
            <div className="flex typo-cta">
              <label className="flex-1 h-12 flex items-center justify-center bg-brand rounded-l-lg cursor-pointer">
                <Input type="radio" name="notifications" className="hidden" />
                <span>Dark</span>
              </label>
              <label className="flex-1 h-12 flex items-center justify-center bg-surface2 text-text2 rounded-r-lg cursor-pointer">
                <Input type="radio" name="notifications" className="hidden" />
                <span>Light</span>
              </label>
            </div>
          </FormField>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="typo-b1">Admin Panel Theme</div>
        <div className="grid grid-cols-3 gap-4">
          <FormField label="Primary Color" required>
            <Input type="color" placeholder="Enter Name" />
          </FormField>
          <FormField label="Public Pages Theme ">
            <div className="flex typo-cta">
              <label className="flex-1 h-12 flex items-center justify-center bg-brand rounded-l-lg cursor-pointer">
                <Input type="radio" name="notifications" className="hidden" />
                <span>Dark</span>
              </label>
              <label className="flex-1 h-12 flex items-center justify-center bg-surface2 text-text2 rounded-r-lg cursor-pointer">
                <Input type="radio" name="notifications" className="hidden" />
                <span>Light</span>
              </label>
            </div>
          </FormField>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="typo-b1">Employee Panel Theme</div>
        <div className="grid grid-cols-3 gap-4">
          <FormField label="Primary Color" required>
            <Input type="color" placeholder="Enter Name" />
          </FormField>
          <FormField label="Public Pages Theme ">
            <div className="flex typo-cta">
              <label className="flex-1 h-12 flex items-center justify-center bg-brand rounded-l-lg cursor-pointer">
                <Input type="radio" name="notifications" className="hidden" />
                <span>Dark</span>
              </label>
              <label className="flex-1 h-12 flex items-center justify-center bg-surface2 text-text2 rounded-r-lg cursor-pointer">
                <Input type="radio" name="notifications" className="hidden" />
                <span>Light</span>
              </label>
            </div>
          </FormField>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="typo-b1">Client Panel Theme</div>
        <div className="grid grid-cols-3 gap-4">
          <FormField label="Primary Color" required>
            <Input type="color" placeholder="Enter Name" />
          </FormField>
          <FormField label="Public Pages Theme ">
            <div className="flex typo-cta">
              <label className="flex-1 h-12 flex items-center justify-center bg-brand rounded-l-lg cursor-pointer">
                <Input type="radio" name="notifications" className="hidden" />
                <span>Dark</span>
              </label>
              <label className="flex-1 h-12 flex items-center justify-center bg-surface2 text-text2 rounded-r-lg cursor-pointer">
                <Input type="radio" name="notifications" className="hidden" />
                <span>Light</span>
              </label>
            </div>
          </FormField>
        </div>
      </div>
      <div className="border-b border-divider"></div>
      <div className="flex gap-4">
        <RedButton>Save</RedButton>
        <RedBorderButton>Use Default Theme</RedBorderButton>
      </div>
    </div>
  );
}

export default ThemeSetting;
