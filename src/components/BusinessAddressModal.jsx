import { useState, useEffect } from "react";
import { FormField, Input, RedBorderButton, RedButton } from "./Component";
import Icon from "./Icon";

// 1. IMPORT CUSTOM HOOKS
import {
  useBusinessAddress,
  useEditBusinessAddress,
} from "../hooks/useSettings";
import { toast } from "react-toastify";

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

  // 2. FETCH EXISTING BUSINESS ADDRESS SETTINGS
  const { data: addressData, isLoading: isLoadingAddress } =
    useBusinessAddress();

  // 3. HANDLE DATA POPULATION
  useEffect(() => {
    if (addressData) {
      // Ensure numerical fields are converted to strings for input components
      setFormData({
        country: addressData.country || "USA",
        location: addressData.location || "",
        taxName: addressData.taxName || "",
        taxNumber: addressData.taxNumber || "",
        address: addressData.address || "",
        latitude: addressData.latitude?.toString() || "",
        longitude: addressData.longitude?.toString() || "",
      });
    }
  }, [addressData]);

  // 4. SETUP UPDATE MUTATION HOOK
  const updateMutation = useEditBusinessAddress();
  const isLoading = updateMutation.isPending || isLoadingAddress;

  // handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.location || !formData.address) {
      toast.warn("Location and Address are required fields.");
      return;
    }

    // Prepare payload, ensuring latitude/longitude are converted back to Numbers
    const payload = {
      ...formData,
      latitude: formData.latitude ? Number(formData.latitude) : undefined,
      longitude: formData.longitude ? Number(formData.longitude) : undefined,
    };

    // 5. CALL MUTATION
    updateMutation.mutate(payload, {
      onSuccess: () => {
        toast.success("Business address saved successfully!");
        onClose(); // Close the modal on success
      },
      onError: (error) => {
        console.error("Error saving business address:", error);
        toast.error("Failed to save address. Please try again.");
      },
    });
  };

  // Show a loading state while fetching initial data

  return (
    <div className="w-full max-w-[800px] max-h-[90vh]  bg-surface rounded-lg border typo-b2 border-divider flex flex-col">
      {/* Header */}
      <div className="pb-4 p-4 flex justify-between items-center flex-shrink-0">
        <h2 className="text-lg md:text-xl">Business Address</h2>
        <div onClick={onClose}>
          <Icon name="close" className="cursor-pointer" />
        </div>
      </div>

      {/* Scrollable Form */}
      {isLoadingAddress ? (
        <div className="text-center typo-">
          Loading business address settings...
        </div>
      ) : (
        <div className="overflow-y-auto flex-1 p-4">
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
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
            <FormField label="Address" className="md:col-span-2">
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
                type="number" // Use number type for better input validation
              />
            </FormField>
            {/* Longitude */}
            <FormField label="Longitude">
              <Input
                name="longitude"
                value={formData.longitude}
                onChange={(val) => handleChange("longitude", val)}
                placeholder="Enter Longitude"
                type="number" // Use number type for better input validation
              />
            </FormField>
            {/* Buttons */}
            <div className="md:col-span-2 flex flex-col-reverse md:flex-row justify-end gap-4 mt-8">
              <RedBorderButton
                type="button"
                onClick={onClose}
                disabled={isLoading}
              >
                Cancel
              </RedBorderButton>
              <RedButton type="submit" disabled={isLoading}>
                {isLoading ? "Saving..." : "Save"}
              </RedButton>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default ServiceDetailsModal;
