import React from "react";
import Icon from "./Icon";
import { RedBorderButton, RedButton } from "./Component";

function VerifyPassword({ onClose }) {
  return (
    <div className="w-[800px] p-4 bg-surface rounded-lg border typo-b2 border-divider flex flex-col gap-4">
      <div className="flex justify-between">
        <h2>Verify Password</h2>
        <div onClick={() => onClose()}>
          <Icon name="close" className="cursor-pointer" />
        </div>
      </div>
      <di className="h-0.5 bg-divider" />
      <div className="flex flex-col gap-2">
        <label className="typo-b2 text-text2">
          Password <span className="text-brand">*</span>
        </label>
        <input
          type="password"
          placeholder="Enter Your Password"
          className="w-full h-12 bg-surface2 border border-divider rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-brand typo-b3"
        />
      </div>
      <div className="flex justify-between"><RedButton>Verify</RedButton><RedBorderButton>Cancel</RedBorderButton></div>
    </div>
  );
}

export default VerifyPassword;
