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

function AddService({ edit, title = "Add Service" }) {

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
              <FormField label="Service Name">
                <Input placeholder="Enter Company Name" />
              </FormField>
              <FormField label="Clients Pay">
                <Input placeholder="Enter Company Name" />
              </FormField>
              <FormField label="Team's Payment">
                <Input placeholder="Enter Company Name" />
              </FormField>
              <ClientSelect label="client" />
              <FormField label="Description" className="col-span-3">
                <textarea
                  type="text"
                  placeholder="Enter Message"
                  className="w-full h-50 p-4 bg-surface2 border border-divider rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-brand typo-b3"
                />
              </FormField>
              <FormField label="Addons" className="col-span-3">
                <textarea
                  type="text"
                  placeholder="Enter Message"
                  className="w-full h-50 p-4 bg-surface2 border border-divider rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-brand typo-b3"
                />
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

export default AddService;
