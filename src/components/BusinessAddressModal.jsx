import { FormField, Input, RedBorderButton, RedButton } from "./Component";
import Icon from "./Icon";

function ServiceDetailsModal({ onClose }) {
  return (
    <div className="w-[800px] max-h-[900px] overflow-auto p-4 bg-surface rounded-lg border typo-b2 border-divider">
      {/* Header */}
      <div className="pb-4 flex justify-between">
        <h2>Business Address</h2>
        <div onClick={onClose}>
          <Icon name="close" className="cursor-pointer" />
        </div>
      </div>
      <form className="grid grid-cols-2 gap-4">
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
        <FormField label="Company Email" required>
          <Input placeholder="Enter Email" />
        </FormField>
        <FormField label="Company Phone">
          <Input placeholder="Enter Phone" />
        </FormField>
        <FormField label="Company Phone">
          <Input placeholder="Enter Phone" />
        </FormField>
        <FormField label="Address" className="col-span-2">
          <textarea
            placeholder="Enter Address"
            className="h-20 p-4 typo-b3 bg-surface2 border-2 border-divider rounded-sm"
          ></textarea>{" "}
        </FormField>
        <FormField label="Latitude">
          <Input placeholder="Enter Latitude" />
        </FormField>
        <FormField label="Longitude">
          <Input placeholder="Enter Longitude" />
        </FormField>
      </form>
      <div className="flex justify-end gap-4 mt-8">
        <RedBorderButton>Cancel</RedBorderButton>
        <RedButton>Save</RedButton>
      </div>
    </div>
  );
}

export default ServiceDetailsModal;
