import ClientSelect from "@/components/ClientSelect";
import {
  FormField,
  Input,
  RedButton,
  RedBorderButton,
  Back,
  Icon,
} from "@/components/Component";
import PageTitle from "@/components/PageTitle";
import { useCreateAppreciation } from "../../../hooks/hr/useAppreciations";
import { useBack } from "../../../hooks/useBack";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useTeamMembers } from "../../../hooks/useTeam";

function AppreciationForm({ title, edit }) {
  const [formData, setFormData] = useState({
    awardName: "",
    givingTo: null,
    // awardBy: "",
  });
  const [more, setMore] = useState(false);

  const back = useBack("/admin/hr/appreciations");
  const createAppreciationMutation = useCreateAppreciation();
  const { data: teamMembers = [] } = useTeamMembers();

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (addMore) => {
    console.log(formData);
    if (!formData.awardName || !formData.givingTo) {
      alert("Please fill in all required fields.");
      return;
    }

    toast.promise(
      createAppreciationMutation.mutateAsync(formData),
      {
        pending: "Creating Appreciation",
        success: "Appreciation Created",
        error: {
          render({ data }) {
            const errorMessage =
              data.response?.data?.message ||
              data.response?.data?.error ||
              data.message ||
              "Failed to Create Appreciation.";
            return errorMessage;
          },
        },
      },
      { autoClose: 5000 }
    );
    if (addMore) {
      setMore(true);
    }
  };

  useEffect(() => {
    const iscreated = createAppreciationMutation.isSuccess;
    if (iscreated && more) {
      setFormData({
        awardName: "",
        givingTo: null,
        // awardBy: "",
      });
      setMore(false);
    } else {
      if (iscreated) back(-1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [createAppreciationMutation.isSuccess]);

  return (
    <>
      <PageTitle title={title || "Add Appreciation"} />
      <div className="flex flex-col gap-8">
        <div className="mb-4 flex justify-between items-center">
          <div className="typo-b1">Add Appreciation</div>
          <Back>
            <Icon name="close" />
          </Back>
        </div>
        <div className="bg-surface1 rounded-xl">
          <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <FormField label="Award Name" required>
              <Input
                placeholder="Award Name"
                value={formData.awardName}
                onChange={(value) => handleChange("awardName", value)}
              />
            </FormField>
            <ClientSelect
              label="Giving To"
              value={formData.givingTo}
              clients={teamMembers.map((f) => ({
                id: f._id,
                name: f.name,
                email: f.user.email,
                profilePicture: f.profilePicture,
              }))}
              onChange={(value) => handleChange("givingTo", value)}
              placeHolder="Select Members...."
            />
            {/* <ClientSelect
              label="Giving By"
              value={formData.awardBy}
              clients={teamMembers.map((f) => ({
                id: f._id,
                name: f.name,
                email: f.user.email,
                profilePicture: f.profilePicture,
              }))}
              onChange={(value) => handleChange("awardBy", value)}
            /> */}
          </form>
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
              <RedButton onClick={() => handleSubmit(false)}>Save</RedButton>
              <RedBorderButton onClick={() => handleSubmit(true)}>
                Save & Add More
              </RedBorderButton>
            </div>

            <RedButton onClick={() => back()}>Cancel</RedButton>
          </div>
        )}
      </div>
    </>
  );
}

export default AppreciationForm;
