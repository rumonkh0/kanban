import React from "react";
import Icon from "./Icon";
import { RedBorderButton, RedButton } from "./Component";

function AddProjectMemberModal({ onClose }) {
  return (
    <div className="w-[800px] p-4 bg-surface rounded-lg border typo-b2 border-divider">
      <div className="pb-4 border-b-2 border-divider flex justify-between">
        <h2>Add Project Member</h2>{" "}
        <div onClick={() => onClose()}>
          <Icon name="close" className="cursor-pointer" />
        </div>
      </div>
      <div className="flex py-4">
        <div className="flex-1 flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="noDeadline"
              className="form-checkbox h-5 w-5 rounded border-divider bg-surface focus:ring-brand focus:ring-offset-0"
            />
            <label htmlFor="noDeadline" className="typo-b3 text-text2">
              Choose Member
            </label>
          </div>
        </div>
        <div className="flex-1 flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="noDeadline"
              className="form-checkbox h-5 w-5 rounded border-divider bg-surface focus:ring-brand focus:ring-offset-0"
            />
            <label htmlFor="noDeadline" className="typo-b3 text-text2">
              Choose Department
            </label>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2 py-4">
        <label className="typo-b2 text-text2">
          Service<span className="text-brand">*</span>
        </label>
        <div className="relative">
          <select className="w-full h-12 bg-surface2 border border-divider rounded-lg px-4 appearance-none focus:outline-none focus:ring-2 focus:ring-brand typo-b3">
            <option>Mr.</option>
            <option>Mrs.</option>
            <option>Ms.</option>
            <option>Dr.</option>
          </select>
          <Icon
            name="arrow"
            className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4"
          />
        </div>
      </div>
      <div className="flex justify-between pt-4">
        <RedButton>Save</RedButton> <RedBorderButton>Cancel</RedBorderButton>
      </div>
    </div>
  );
}

export default AddProjectMemberModal;
