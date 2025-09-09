import React from "react";
import Icon from "@/components/Icon";

function Files() {
  return (
    <div className="bg-surface2 border-2 border-divider rounded-lg p-4">
      <div className="typo-b2 border-b-2 border-divider pb-4 mb-8">Files</div>
      <div className="flex flex-col gap-2 mb-4">
        <label className="typo-b2 text-text2 hidden">Company Logo</label>
        <div className="flex items-center justify-center h-16 bg-surface2 border border-divider rounded-lg">
          <button type="button" className="flex items-center gap-2 text-text2">
            <Icon name="upload" size={24} />
            <span className="typo-b3">Upload Company Logo</span>
          </button>
        </div>
      </div>
      <div className="w-[184px] h-10 bg-divider flex justify-between items-center gap-1 p-1.5 rounded-sm">
        <Icon name="file" size={35} />
        <div className="typo-b3 text-text flex flex-col">
          <h2>Project</h2>
          <p>Requirements.pdf</p>
        </div>
        <Icon name="cross-red" size={16} />
      </div>
    </div>
  );
}

export default Files;
