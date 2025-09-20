import { useState } from "react";
import { FormField, Input, RedBorderButton, RedButton } from "./Component";
import Icon from "./Icon";

function ServiceDetailsModal({ onClose }) {
  const [formData, setFormData] = useState({
    country: "USA",
    location: "",
    taxName: "",
    taxNumber: "",
    address: "",
    latitude: "",
    longitude: "",
  });


  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    // 👉 send to API here (e.g. clientsApi.create(formData))
  };

  return (
    <div className="w-[800px] max-h-[900px] overflow-auto p-4 bg-surface rounded-lg border typo-b2 border-divider">
      {/* Header */}
      <div className="pb-4 flex justify-between">
        <h2>Business Address</h2>
        <div onClick={onClose}>
          <Icon name="close" className="cursor-pointer" />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        {/* Country */}
        <FormField label="Country">
          <div className="relative">
            <select
              name="country"
              value={formData.country}
              onChange={(e) => handleChange("country", e.target.value)}
              className="w-full h-12 bg-surface2 border border-divider rounded-lg px-4 appearance-none focus:outline-none focus:ring-2 focus:ring-brand pl-12 typo-b3"
            >
              <option value="USA">USA</option>
              <option value="Canada">Canada</option>
              <option value="UK">UK</option>
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

        {/* Location */}
        <FormField label="Location" required>
          <Input
            name="location"
            value={formData.location}
            onChange={(val) => handleChange("location", val)}
            placeholder="Enter Location"
          />
        </FormField>

        {/* Tax Name */}
        <FormField label="Tax Name">
          <Input
            name="taxName"
            value={formData.taxName}
            onChange={(val) => handleChange("taxName", val)}
            placeholder="Enter Tax Name"
          />
        </FormField>

        {/* Tax Number */}
        <FormField label="Tax Number">
          <Input
            name="taxNumber"
            value={formData.taxNumber}
            onChange={(val) => handleChange("taxNumber", val)}
            placeholder="Enter Tax Number"
          />
        </FormField>

        {/* Address */}
        <FormField label="Address" className="col-span-2">
          <textarea
            name="address"
            value={formData.address}
            onChange={(e) => handleChange("address", e.target.value)}
            placeholder="Enter Address"
            className="h-20 p-4 typo-b3 bg-surface2 border-2 border-divider rounded-sm w-full"
          />
        </FormField>

        {/* Latitude */}
        <FormField label="Latitude">
          <Input
            name="latitude"
            value={formData.latitude}
            onChange={(val) => handleChange("latitude", val)}
            placeholder="Enter Latitude"
          />
        </FormField>

        {/* Longitude */}
        <FormField label="Longitude">
          <Input
            name="longitude"
            value={formData.longitude}
            onChange={(val) => handleChange("longitude", val)}
            placeholder="Enter Longitude"
          />
        </FormField>

        {/* Buttons */}
        <div className="col-span-2 flex justify-end gap-4 mt-8">
          <RedBorderButton type="button" onClick={onClose}>
            Cancel
          </RedBorderButton>
          <RedButton type="submit">Save</RedButton>
        </div>
      </form>
    </div>
  );
}

export default ServiceDetailsModal;
