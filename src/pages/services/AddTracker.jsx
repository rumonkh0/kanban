import ClientSelect from "@/components/ClientSelect";
import {
  FormField,
  Input,
  RedButton,
  RedBorderButton,
  Dropdown,
  Back,
  InputMoney,
} from "@/components/Component";
import Icon from "@/components/Icon";
import PageTitle from "@/components/PageTitle";
import React, { useState } from "react";

function AddTracker({ edit, title = "Add Tracker" }) {
  const [formData, setFormData] = useState({
    salulation: "",
    designation: "",
    gender: "",
    department: "",
    role: "",
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
  return (
    <>
      <PageTitle title={title} />
      <div className="flex flex-col gap-8">
        <div>
          <div className="mb-4 flex justify-between items-center">
            <div className="typo-b1">{title}</div>
            <Back>
              <Icon name="close" />
            </Back>
          </div>
          <div className="bg-surface1 rounded-xl">
            <form className="grid grid-cols-3 gap-4">
              <FormField label="Project Name">
                <Dropdown
                  options={["Mr.", "Mrs.", "Dr."]}
                  value={formData.salulation}
                  onChange={(val) => handleChange("salulation", val)}
                />
              </FormField>
              <ClientSelect label="client" />
              <FormField label="Company Name (auto take)">
                <Input placeholder="Enter Company Name" />
              </FormField>
              <ClientSelect label="Team Member Assigned (auto take)" />
              <FormField label="Start Date (auto take after projec or clint select)">
                <div className="relative">
                  <Input type="date" placeholder="Select Date" />
                  <Icon
                    name="calendar"
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4"
                  />
                </div>
              </FormField>

              <FormField label="Due Date (auto take Same)">
                <div className="relative">
                  <Input type="date" placeholder="Select Date" />
                  <Icon
                    name="calendar"
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4"
                  />
                </div>
              </FormField>
              <FormField
                label="Description (auto or Type)"
                className="col-span-3"
              >
                <textarea
                  type="text"
                  placeholder="Ener Message"
                  className="w-full h-50 p-4 bg-surface2 border border-divider rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-brand typo-b3"
                />
              </FormField>
              <FormField label="Account Status">
                <div className="relative">
                  <div className="w-2 h-2 rounded-full bg-success absolute left-4 top-1/2 -translate-y-1/2"></div>
                  <select className="w-full h-12 bg-surface2 border border-divider rounded-lg px-4 appearance-none focus:outline-none focus:ring-2 focus:ring-brand pl-8 typo-b3">
                    <option>Active</option>
                    <option>Inactive</option>
                    <option>Suspended</option>
                  </select>
                  {/* <div className="absolute left-4 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#8FC951]"></div> */}
                  <Icon
                    name="arrow"
                    size={24}
                    className="absolute right-4 top-1/2 -translate-y-1/2"
                  />
                </div>
              </FormField>
              <FormField label="Price">
                <InputMoney type="text" placeholder="USD" />
              </FormField>
              <FormField label="Custom Price">
                <InputMoney type="text" placeholder="USD" />
              </FormField>
              <FormField label="Discount">
                <InputMoney type="text" placeholder="USD" />
              </FormField>
              <FormField label="Final Amount For Client">
                <InputMoney type="text" placeholder="USD" />
              </FormField>
              <FormField label="Mode of Payment">
                <Dropdown
                  options={["Mr.", "Mrs.", "Dr."]}
                  value={formData.salulation}
                  onChange={(val) => handleChange("salulation", val)}
                />
              </FormField>
              <FormField label="Date Paid By the Client">
                <div className="relative">
                  <Input type="date" placeholder="Select Date" />
                  <Icon
                    name="calendar"
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4"
                  />
                </div>
              </FormField>
              <FormField label="Amount Paid By Client">
                <InputMoney type="text" placeholder="USD" />
              </FormField>
              <FormField label="Amount Owed By Client">
                <InputMoney type="text" placeholder="USD" />
              </FormField>
              <FormField label="Amount Payable To Members">
                <InputMoney type="text" placeholder="USD" />
              </FormField>
              <FormField label="Date Paid To The Members">
                <div className="relative">
                  <Input type="date" placeholder="Select Date" />
                  <Icon
                    name="calendar"
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4"
                  />
                </div>
              </FormField>
              <FormField label="Amount Paid To Members">
                <InputMoney type="text" placeholder="USD" />
              </FormField>
              <FormField label="Amount Owed To Members">
                <InputMoney type="text" placeholder="USD" />
              </FormField>
              <FormField label="Final Amount Earned">
                <InputMoney type="text" placeholder="USD" />
              </FormField>
              <FormField label="Comments">
                <Input placeholder="Add Comments" />
              </FormField>
            </form>
          </div>
        </div>

        {edit ? (
          <div className="flex justify-between">
            <div className="flex gap-4">
              <RedButton>Save</RedButton>
              <RedBorderButton>Cancel</RedBorderButton>
            </div>

            <RedButton>Delete</RedButton>
          </div>
        ) : (
          <div className="flex justify-between">
            <div className="flex gap-4">
              <RedButton>Save</RedButton>
              <RedBorderButton>Save & Add More</RedBorderButton>
            </div>

            <RedButton>Cancel</RedButton>
          </div>
        )}
      </div>
    </>
  );
}

export default AddTracker;
