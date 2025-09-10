import React from "react";
import { FormField, Input, RedButton } from "../../components/Component";

function SecuritySetting() {
  return (
    <div className="flex flex-col gap-4">
      <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(570px,1fr))]">
        <div className="p-4 bg-surface2 border border-divider rounded-lg flex flex-col gap-4">
          <div className="flex gap-6">
            <div className="flex-shrink-0">
              <img src="/images/gmail.png" alt="" className="h-20 w-20" />
            </div>
            <div className="flex flex-col justify-between">
              <div className="typo-h4">Setup Using Email</div>
              <div className="typo-b2 text-text2">
                Enabling this feature will send code on your email account
                admin@gmail.com for log in.
              </div>
            </div>
          </div>
          <div>
            <RedButton>Enable</RedButton>
          </div>
        </div>
        <div className="p-4 bg-surface2 border border-divider rounded-lg flex flex-col gap-4">
          <div className="flex gap-6">
            <div className="flex-shrink-0">
              <img src="/images/gmail.png" alt="" className="h-20 w-20" />
            </div>
            <div className="flex flex-col justify-between">
              <div className="typo-h4">Setup Using Email</div>
              <div className="typo-b2 text-text2">
                Enabling this feature will send code on your email account
                admin@gmail.com for log in.
              </div>
            </div>
          </div>
          <div>
            <RedButton>Enable</RedButton>
          </div>
        </div>
        <div></div>
      </div>
      <div className="border border-divider"></div>
      <div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="noDeadline"
            className="form-checkbox h-5 w-5 rounded border-divider bg-surface focus:ring-brand focus:ring-offset-0"
          />
          <label htmlFor="noDeadline" className="typo-b3 text-text">
            Google Recaptcha
          </label>
        </div>
      </div>
      <form className="grid grid-cols-3 gap-4">
        <FormField label="Choose Google Recaptcha Version">
          <div className="flex typo-cta">
            <label className="flex-1 h-12 flex items-center justify-center bg-brand text-white rounded-l-lg cursor-pointer">
              <Input type="radio" name="notifications" className="hidden" />
              <span>V2</span>
            </label>
            <label className="flex-1 h-12 flex items-center justify-center bg-surface2 text-text rounded-r-lg cursor-pointer">
              <Input type="radio" name="notifications" className="hidden" />
              <span>V3</span>
            </label>
          </div>
        </FormField>
        <FormField label="Google Recaptcha V2 Key" required>
          <Input placeholder="Type key" />
        </FormField>
        <FormField label="Google Recaptcha V2 Secret" required>
          <Input placeholder="Type key" />
        </FormField>
      </form>
      <div>
        <RedButton>Save</RedButton>
      </div>
    </div>
  );
}

export default SecuritySetting;
