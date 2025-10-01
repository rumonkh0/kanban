import React, { useState, useEffect, useRef } from "react";
import Icon from "./Icon";
import { FormField, Input } from "./Component";

// Pre-generated list of countries (call this once outside the component)
import { COUNTRY_DROPDOWN_DATA } from "./Constants";

// --- Assume COUNTRY_DROPDOWN_DATA is imported from a utility file ---

function PhoneNumberInput({ formData, setFormData }) {
  // State for controlling the visibility of the dropdown menu
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const countryCodeRef = useRef(null);

  // Find the currently selected country data based on the state code
  // Use a sensible default like the US or the first item if no match
  const selectedCountry =
    COUNTRY_DROPDOWN_DATA.find((c) => c.code === formData.mobile.countryCode) ||
    COUNTRY_DROPDOWN_DATA.find((c) => c.iso === "US") ||
    COUNTRY_DROPDOWN_DATA[0];

  // Handle clicking outside the dropdown to close it
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        countryCodeRef.current &&
        !countryCodeRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handler for selecting a new country code
  const handleCountrySelect = (country) => {
    setFormData((prev) => ({
      ...prev,
      mobile: {
        ...prev.mobile,
        countryCode: country.code,
      },
    }));
    setIsDropdownOpen(false);
  };

  // Handler for the number input
  const handleNumberChange = (val) => {
    setFormData((prev) => ({
      ...prev,
      mobile: {
        ...prev.mobile,
        number: val,
      },
    }));
  };

  return (
    <FormField label="Mobile">
      <div className="relative" ref={countryCodeRef}>
        {/* === 1. Country Code and Flag Display/Toggle === */}
        <div
          className="absolute w-19 left-4 top-1/2 -translate-y-1/2 flex items-center gap-1 border-r border-text2  cursor-pointer z-20"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          {/* Flag Icon (Using flag-icons with square format) */}
          <span
            className={`fi fi-${selectedCountry.iso.toLowerCase()} fi-sq `}
            style={{ width: "18px", height: "18px", borderRadius: "4px" }}
          ></span>
          {/* Country Code */}
          <span className="text-text2 typo-b3">{selectedCountry.code}</span>
          {/* Dropdown Arrow - Rotates when open */}
          <Icon
            name="arrow"
            size={18}
            className={`mr-1 transition-transform absolute left-13 top-1/2 -translate-y-1/2 ${
              isDropdownOpen ? "rotate-180" : "rotate-0"
            }`}
          />
        </div>

        {/* === 2. Dropdown Menu (List of Countries) === */}
        {isDropdownOpen && (
          <div className="absolute top-full left-0 mt-1 w-64 max-h-64 overflow-y-auto bg-surface border border-divider rounded shadow-lg z-50">
            {COUNTRY_DROPDOWN_DATA.map((country, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 p-2 cursor-pointer hover:bg-brand/80 group"
                onClick={() => handleCountrySelect(country)}
              >
                <span
                  className={`fi fi-${country.iso.toLowerCase()} fi-sq`}
                  style={{ width: "18px", height: "18px", borderRadius: "4px" }}
                ></span>
                <span className="typo-b3 group-hover:text-text">
                  {country.name}
                </span>
                <span className="text-text2 typo-b3 ml-auto group-hover:text-text">
                  {country.code}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* === 3. Number Input Field === */}
        <Input
          value={formData.mobile.number}
          onChange={handleNumberChange}
          type="tel"
          placeholder="Enter Mobile Number"
          // Ensure padding is wide enough to clear the flag/code/arrow
          className="pl-25"
        />
      </div>
    </FormField>
  );
}

export default PhoneNumberInput;
