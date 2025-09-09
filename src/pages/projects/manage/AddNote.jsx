import Icon from "@/components/Icon";
import { RedBorderButton, RedButton } from "@/components/Component";
import { Back } from "../../../components/Component";
function page() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <div className="mb-4 flex justify-between items-center">
          <div className="typo-b1">Note Details</div>
          <Back>
            <Icon name="close" />
          </Back>
        </div>
        <div className="bg-surface1 rounded-xl">
          <form className="grid grid-cols-3 gap-4">
            <div className="flex flex-col gap-2">
              <label className="typo-b2 text-text2">Invoice</label>
              <input
                type="text"
                placeholder="Invoice No."
                className="w-full h-12 bg-surface2 border border-divider rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-brand typo-b3"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="typo-b2 text-text2">
                Receive email notifications?
              </label>
              <div className="flex typo-cta">
                <label className="flex-1 h-12 flex items-center justify-center bg-brand text-white rounded-l-lg cursor-pointer">
                  <input
                    type="radio"
                    name="notifications"
                    className="hidden"
                    defaultChecked
                  />
                  <span>Yes</span>
                </label>
                <label className="flex-1 h-12 flex items-center justify-center bg-surface2 text-text rounded-r-lg cursor-pointer">
                  <input type="radio" name="notifications" className="hidden" />
                  <span>No</span>
                </label>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className="typo-b2 text-text2">
                Enter password
                <span className="text-brand">* {"(if selected private)"}</span>
              </label>
              <input
                type="text"
                placeholder="Invoice No."
                className="w-full h-12 bg-surface2 border border-divider rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-brand typo-b3"
              />
            </div>

            <div className="col-span-3 flex flex-col gap-2">
              <label className="typo-b2 text-text2">Note Details</label>
              <textarea
                type="text"
                placeholder="Ener Note Details Here.."
                className="w-full h-50 p-4 bg-surface2 border border-divider rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-brand typo-b3"
              />
            </div>
          </form>
        </div>
      </div>

      <div className="flex gap-4">
        <RedButton>Save</RedButton>
        <RedBorderButton>Cancel</RedBorderButton>
      </div>
    </div>
  );
}

export default page;
