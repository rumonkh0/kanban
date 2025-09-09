import React from "react";
import { RedButton } from "./Component";

function AddCardModal() {
  return (
    <div className="w-200 p-2 bg-surface2 border-2 border-divider rounded-lg flex flex-col gap-2 typo-b3 text-text2">
      <div>Add Another Card</div>
      <input
        type="text"
        className="h-10 border-2 border-divider rounded-sm flex items-center px-4 typo-b2 text-text"
        placeholder="Not Started"
      />
      <div>Add card identity color</div>
      <div className="flex gap-2">
        <ColorBox color="bg-red-400" />
        <ColorBox color="bg-blue-400" />
        <ColorBox color="bg-green-400" />
        <ColorBox color="bg-yellow-400" />
        <ColorBox color="bg-purple-400" />
        <ColorBox color="bg-pink-400" />
        <ColorBox color="bg-indigo-400" />
      </div>
      <RedButton className="w-fit mt-2">Create</RedButton>
    </div>
  );
}
const ColorBox = ({ color }) => (
  <div
    className={`w-10 h-10 ${color} hover:border-2 hover:border-white rounded-sm cursor-pointer`}
  ></div>
);

export default AddCardModal;
