import React, { useState } from "react";
import { RedButton } from "./Component";

function AddCardModal({ onCreate }) {
  const [title, setTitle] = useState("");
  const [color, setColor] = useState("#7B7B7B");

  const colors = ["#7B7B7B", "#FE4E4D", "#8FC951", "#5EB7E0", "#A88AED"];

  const handleCreate = () => {
    if (!title) return;
    onCreate({ title, color });
    setTitle("");
  };

  return (
    <div className="w-full  p-2 bg-surface2 border-2 border-divider rounded-lg flex flex-col gap-2 typo-b3 text-text2">
      <div>Add Another Card</div>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="h-10 border-2 border-divider rounded-sm flex items-center px-4 typo-b2 text-text w-full"
        placeholder="Card Title"
      />
      <div>Add card identity color</div>
      <div className="flex gap-2 flex-wrap">
        {colors.map((c) => (
          <ColorBox
            key={c}
            color={c}
            selected={color === c}
            onClick={() => setColor(c)}
          />
        ))}
      </div>
      <RedButton className="w-full sm:w-fit mt-2 px-2" onClick={handleCreate}>
        Create
      </RedButton>
    </div>
  );
}

const ColorBox = ({ color, selected, onClick }) => (
  <div
    onClick={onClick}
    className={`w-10 h-10 rounded-sm cursor-pointer border-2 ${
      selected ? "border-white" : "border-transparent"
    }`}
    style={{ backgroundColor: color }}
  ></div>
);

export default AddCardModal;
