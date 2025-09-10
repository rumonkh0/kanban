import Icon from "@/components/Icon";
import ClientSelect from "@/components/ClientSelect";
import { useState } from "react";
import {
  Back,
  Dropdown,
  FormField,
  Input,
  InputMoney,
  RedBorderButton,
  RedButton,
} from "@/components/Component";

function PaidByForm() {
  const [formData, setFormData] = useState({
    salulation: "",
    category: "",
    gender: "",
    paidMethod: "",
    paymentStatus: "",
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };


  return (
    <div className="flex flex-col gap-8">
      <div>
        <div className="mb-4 flex justify-between items-center">
          <div className="typo-b1">Paid By</div>
          <Back>
            <Icon name="close" />
          </Back>
        </div>
        <div className="bg-surface1 rounded-xl">
          <form className="grid grid-cols-3 gap-4">
            <FormField label="Project" required>
              <Dropdown
                options={["Mr.", "Mrs.", "Ms.", "Dr."]}
                value={formData.salulation}
                onChange={(val) => handleChange("salulation", val)}
              />
            </FormField>

            <ClientSelect
              onSelect={(client) => console.log("Client selected:", client)}
              label="Paid By"
            />

            <FormField label="To Be Paid" required>
              <InputMoney type="text" placeholder="0.00" />
            </FormField>
            <FormField label="Discount">
              <Input type="text" placeholder="e.g: 10%" />
            </FormField>
            <FormField label="Team Payment (Auto as per previous info)">
              <InputMoney type="text" placeholder="0.00" />
            </FormField>
            <FormField label="Revenue (Auto as per previous info)">
              <InputMoney type="text" placeholder="0.00" />
            </FormField>

            <FormField label="Payment Date" required>
              <div className="relative">
                <input
                  type="date"
                  placeholder="Select Date"
                  className="w-full h-12 bg-surface2 border border-divider rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-brand typo-b3"
                />
                <Icon
                  name="calendar"
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4"
                />
              </div>
            </FormField>

            <FormField label="Amount Paid" required>
              <InputMoney type="text" placeholder="0.00" />
            </FormField>
            <FormField label="Amount Owed">
              <InputMoney type="text" placeholder="0.00" />
            </FormField>
            <FormField label="Payment Method " required>
              <Dropdown
                options={["Mr.", "Mrs.", "Ms.", "Dr."]}
                value={formData.salulation}
                onChange={(val) => handleChange("salulation", val)}
              />
            </FormField>
            <FormField label="Status" required>
              <div className="relative">
                <div
                  className={`w-2 h-2 rounded-full absolute left-4 top-1/2 -translate-y-1/2 z-50 ${
                    formData.paymentStatus === "Paid"
                      ? "bg-success"
                      : formData.paymentStatus === "Unpaid"
                      ? "bg-brand"
                      : formData.paymentStatus === "Owed"
                      ? "bg-[#A88AED]"
                      : ""
                  }`}
                ></div>
                <Dropdown
                  options={["Owed", "Paid", "Unpaid"]}
                  value={formData.paymentStatus}
                  onChange={(val) => handleChange("paymentStatus", val)}
                  className="pl-8"
                />
              </div>
            </FormField>

            <FormField label="Invoice No.">
              <input
                type="text"
                placeholder="Invoice No."
                className="w-full h-12 bg-surface2 border border-divider rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-brand typo-b3"
              />
            </FormField>
            <FormField label="Upload Invoice" className="col-span-3">
              <div className="flex items-center justify-center h-16 bg-surface2 border-2 border-divider rounded-lg">
                <button
                  type="button"
                  className="flex items-center gap-2 text-text2"
                >
                  <Icon name="upload" size={24} />
                  <span className="typo-b3">Upload Invoice Here</span>
                </button>
              </div>
            </FormField>
          </form>
        </div>
      </div>

      <div className="flex justify-between">
        <div className="flex gap-4">
          <RedButton>Save</RedButton>
          <RedBorderButton>Save & Add More</RedBorderButton>
        </div>
        <RedButton>Cancel</RedButton>
      </div>
    </div>
  );
}

export default PaidByForm;
