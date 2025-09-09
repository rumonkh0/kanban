import React from "react";
import Icon from "./Icon";

function NoteDetails({ onClose }) {
  const note = {
    noteTitle: "Note",
    noteType: "Public/Private",
    noteDetails:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris lobortis pulvinar ligula sed tincidunt. Nullam sed bibendum turpis.",
  };

  return (
    <div className="w-[800px] p-4 bg-surface rounded-lg border typo-b2 border-divider flex flex-col gap-4">
      <div className="flex justify-between">
        <h2>Project Note Details</h2>
        <div onClick={() => onClose()}>
          <Icon name="close" className="cursor-pointer" />
        </div>
      </div>
      <di className="h-0.5 bg-divider" />
      <div className="flex flex-col gap-4 border border-divider rounded-lg p-4 shadow-sm bg-surface2">
        <InfoItem label="Title" value={note.noteTitle} />
        <InfoItem label="Type" value={note.noteType} />
        <InfoItem label="Details" value={note.noteDetails} />
      </div>
    </div>
  );
}
const InfoItem = ({ label, value }) => (
  <div className="flex items-start gap-2">
    <div className="flex min-w-[200px] justify-between">
      <span className="typo-b2 text-text2">{label}</span>
      <span className="typo-b2 text-text2">:</span>
    </div>
    <span className="typo-b2">{value}</span>
  </div>
);

export default NoteDetails;
