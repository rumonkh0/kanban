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
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useTeamMembers } from "../../hooks/useTeam";
import {
  useCreateService,
  useDeleteService,
  useService,
  useUpdateService,
} from "../../hooks/useService";
import { useParams } from "react-router";
import { useBack } from "../../hooks/useBack";

function AddService({ edit = false, title = "Add Service" }) {
  const back = useBack("/admin/services/services");
  const { id } = useParams();

  const [more, setMore] = useState(false);
  const [formData, setFormData] = useState({
    serviceName: "",
    clientsPay: "",
    teamsPayment: "",
    description: "",
    addons: "",
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const { data: serviceData, isLoading: isLoadingService } = useService(id);
  const createMutation = useCreateService();
  const updateMutation = useUpdateService(id);
  const deleteMutation = useDeleteService();
  const { data: freelancers = [] } = useTeamMembers();

  const isLoading =
    createMutation.isPending ||
    updateMutation.isPending ||
    deleteMutation.isPending;

  const handleSubmit = (addMore = false) => {
    // console.log(formData);
    if (!formData.serviceName || !formData.description) {
      alert("Please fill in the required fields.");
      return;
    }
    if (edit) {
      toast.promise(updateMutation.mutateAsync(formData), {
        pending: "Updating Service...",
        success: {
          render() {
            back();
            return "Service updated successfully!";
          },
        },
        error: {
          render: ({ data }) =>
            data?.response?.data?.message || "Failed to update service.",
        },
      });
    } else {
      toast.promise(createMutation.mutateAsync(formData), {
        pending: "Creating Service...",
        success: {
          render() {
            if (addMore) {
              setMore(true);
              return "Service created! You can add another.";
            }
            back();
            return "Service created successfully!";
          },
        },
        error: {
          render: ({ data }) =>
            data?.response?.data?.message || "Failed to create service.",
        },
      });
    }
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this service?")) {
      toast.promise(deleteMutation.mutateAsync(id), {
        pending: "Deleting Service...",
        success: {
          render() {
            back();
            return "Service deleted successfully!";
          },
        },
        error: {
          render: ({ data }) =>
            data?.response?.data?.message || "Failed to delete service.",
        },
      });
    }
  };

  useEffect(() => {
    if (createMutation.isSuccess && more) {
      setFormData({
        serviceName: "",
        clientsPay: "",
        teamsPayment: "",
        description: "",
        addons: "",
        freelancers: null,
      });
      setMore(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [createMutation.isSuccess]);

  useEffect(() => {
    if (serviceData) {
      setFormData({
        serviceName: serviceData.serviceName || "",
        clientsPay: serviceData.clientsPay || "",
        teamsPayment: serviceData.teamsPayment || "",
        freelancers: serviceData.freelancers?.map((f) => f._id) || null,
        description: serviceData.description || "",
        addons: serviceData.addons || "",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [serviceData]);

  if (edit && isLoadingService) {
    return <div>Loading service data...</div>;
  }

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
            <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <FormField label="Service Name">
                <Input
                  placeholder="Enter Service Name"
                  value={formData.serviceName}
                  onChange={(val) => handleChange("serviceName", val)}
                />
              </FormField>
              <FormField label="Clients Pay">
                <InputMoney
                  placeholder="0"
                  value={formData.clientsPay}
                  onChange={(val) => handleChange("clientsPay", val)}
                />
              </FormField>
              <FormField label="Team's Payment">
                <InputMoney
                  placeholder="0"
                  value={formData.teamsPayment}
                  onChange={(val) => handleChange("teamsPayment", val)}
                />
              </FormField>
              <ClientSelect
                value={formData.freelancers}
                clients={freelancers.map((f) => ({
                  id: f._id,
                  name: f.name,
                  email: f.user.email,
                  profilePicture: f.profilePicture,
                }))}
                onChange={(freelancers) =>
                  handleChange("freelancers", freelancers)
                }
                mode="multi"
                label="Add Project Members"
                addingTitle="Add new member"
                placeHolder="Select Members...."
              />
              <FormField
                label="Description"
                className="md:col-span-2 lg:col-span-3"
              >
                <textarea
                  placeholder="Enter Message"
                  value={formData.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                  className="w-full h-50 p-4 bg-surface2 border border-divider rounded-lg focus:outline-none focus:ring-2 focus:ring-brand typo-b3"
                />
              </FormField>
              <FormField
                label="Addons"
                className="cmd:col-span-2 lg:col-span-3"
              >
                <textarea
                  placeholder="Enter Addons"
                  value={formData.addons}
                  onChange={(e) => handleChange("addons", e.target.value)}
                  className="w-full h-50 p-4 bg-surface2 border border-divider rounded-lg focus:outline-none focus:ring-2 focus:ring-brand typo-b3"
                />
              </FormField>
            </form>
          </div>
        </div>

        <div className="flex justify-between">
          <div className="flex gap-4">
            <RedButton
              type="button"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {(createMutation.isPending || updateMutation.isPending) && !more
                ? "Saving..."
                : edit
                ? "Update"
                : "Save"}
            </RedButton>
            {edit ? (
              <Back>
                <RedBorderButton disabled={isLoading}>Cancel</RedBorderButton>
              </Back>
            ) : (
              <RedBorderButton
                type="button"
                onClick={() => {
                  handleSubmit(true);
                }}
                disabled={isLoading}
              >
                {createMutation.isPending && more
                  ? "Saving..."
                  : "Save & Add More"}
              </RedBorderButton>
            )}
          </div>

          {edit ? (
            <RedButton
              type="button"
              onClick={handleDelete}
              disabled={isLoading}
            >
              {deleteMutation.isPending ? "Deleting..." : "Delete Client"}
            </RedButton>
          ) : (
            <Back>
              <RedButton disabled={isLoading}>Cancel</RedButton>
            </Back>
          )}
        </div>
      </div>
    </>
  );
}

export default AddService;
