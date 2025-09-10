import {
  Back,
  FormField,
  Icon,
  Input,
  RedButton,
} from "../../components/Component";

function CompanySetting() {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <div className="mb-4 flex justify-between items-center">
          <div className="typo-b1">Company Settings</div>
          
        </div>
        <div className="bg-surface1 rounded-xl">
          <form className="grid grid-cols-3 gap-4">
            <FormField label="Company Name" required>
              <Input placeholder="Enter Name" />
            </FormField>
            <FormField label="Company Email" required>
              <Input placeholder="Enter Email" />
            </FormField>
            <FormField label="Company Phone" required>
              <Input placeholder="Enter Phone" />
            </FormField>
            <FormField label="Company Website" className="col-span-3">
              <Input placeholder="Enter website" />
            </FormField>
          </form>
        </div>
      </div>
      <div>
        <RedButton>Save</RedButton>
      </div>
    </div>
  );
}

export default CompanySetting;
