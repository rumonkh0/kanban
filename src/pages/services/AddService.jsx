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
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate, useParams } from "react-router";

// API Functions
const serviceAPI = {
  // Get single service
  getById: async (id) => {
    const response = await axios.get(`/api/services/${id}`);
    return response.data;
  },

  // Create new service
  create: async (data) => {
    const response = await axios.post("/api/services", data);
    return response.data;
  },

  // Update service
  update: async ({ id, data }) => {
    const response = await axios.put(`/api/services/${id}`, data);
    return response.data;
  },

  // Delete service
  delete: async (id) => {
    const response = await axios.delete(`/api/services/${id}`);
    return response.data;
  },
};

function AddService({ edit = false, title = "Add Service" }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    serviceName: "",
    clientsPay: "",
    teamsPayment: "",
    client: null,
    description: "",
    addons: "",
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Fetch service data for editing
  // eslint-disable-next-line no-unused-vars
  const { data: serviceData, isLoading: isLoadingService } = useQuery({
    queryKey: ["service", id],
    queryFn: () => serviceAPI.getById(id),
    enabled: edit && !!id,
    onSuccess: (data) => {
      setFormData({
        serviceName: data.serviceName || "",
        clientsPay: data.clientsPay || "",
        teamsPayment: data.teamsPayment || "",
        client: data.client || null,
        description: data.description || "",
        addons: data.addons || "",
      });
    },
  });

  // Create service mutation
  const createMutation = useMutation({
    mutationFn: serviceAPI.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["services"] });
      navigate("/services");
    },
    onError: (error) => {
      console.error("Error creating service:", error);
      alert("Failed to create service. Please try again.");
    },
  });

  // Update service mutation
  const updateMutation = useMutation({
    mutationFn: serviceAPI.update,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["services"] });
      queryClient.invalidateQueries({ queryKey: ["service", id] });
      navigate("/services");
    },
    onError: (error) => {
      console.error("Error updating service:", error);
      alert("Failed to update service. Please try again.");
    },
  });

  // Delete service mutation
  const deleteMutation = useMutation({
    mutationFn: serviceAPI.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["services"] });
      navigate("/services");
    },
    onError: (error) => {
      console.error("Error deleting service:", error);
      alert("Failed to delete service. Please try again.");
    },
  });

  const isLoading = createMutation.isPending || updateMutation.isPending || deleteMutation.isPending;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData)
    // Basic validation
    if (!formData.serviceName || !formData.description) {
      alert("Please fill in the required fields.");
      return;
    }

    if (edit) {
      updateMutation.mutate({ id, data: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  const handleSaveAndAddMore = (e) => {
    e.preventDefault();
    
    if (!formData.serviceName || !formData.description) {
      alert("Please fill in the required fields.");
      return;
    }

    createMutation.mutate(formData, {
      onSuccess: () => {
        // Reset form for adding more
        setFormData({
          serviceName: "",
          clientsPay: "",
          teamsPayment: "",
          client: null,
          description: "",
          addons: "",
        });
      }
    });
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this service?")) {
      deleteMutation.mutate(id);
    }
  };

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
            <form className="grid grid-cols-3 gap-4">
              <FormField label="Service Name">
                <Input 
                  placeholder="Enter Service Name" 
                  value={formData.serviceName}
                  onChange={(val) => handleChange("serviceName", val)}
                />
              </FormField>
              <FormField label="Clients Pay">
                <Input 
                  placeholder="Enter Amount" 
                  value={formData.clientsPay}
                  onChange={(val) => handleChange("clientsPay", val)}
                />
              </FormField>
              <FormField label="Team's Payment">
                <Input 
                  placeholder="Enter Amount" 
                  value={formData.teamsPayment}
                  onChange={(val) => handleChange("teamsPayment", val)}
                />
              </FormField>
              <ClientSelect 
                label="client" 
                onSelect={(client) => handleChange("client", client)}
              />
              <FormField label="Description" className="col-span-3">
                <textarea
                  placeholder="Enter Message"
                  value={formData.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                  className="w-full h-50 p-4 bg-surface2 border border-divider rounded-lg focus:outline-none focus:ring-2 focus:ring-brand typo-b3"
                />
              </FormField>
              <FormField label="Addons" className="col-span-3">
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

        {edit ? (
          <div className="flex justify-between">
            <div className="flex gap-4">
              <RedButton type="button" onClick={handleSubmit} disabled={isLoading}>
                {isLoading ? "Saving..." : "Save"}
              </RedButton>
              <Back>
                <RedBorderButton disabled={isLoading}>Cancel</RedBorderButton>
              </Back>
            </div>

            <RedButton type="button" onClick={handleDelete} disabled={isLoading}>
              {isLoading ? "Deleting..." : "Delete"}
            </RedButton>
          </div>
        ) : (
          <div className="flex justify-between">
            <div className="flex gap-4">
              <RedButton type="button" onClick={handleSubmit} disabled={isLoading}>
                {isLoading ? "Saving..." : "Save"}
              </RedButton>
              <RedBorderButton type="button" onClick={handleSaveAndAddMore} disabled={isLoading}>
                {isLoading ? "Saving..." : "Save & Add More"}
              </RedBorderButton>
            </div>

            <Back>
              <RedButton disabled={isLoading}>Cancel</RedButton>
            </Back>
          </div>
        )}
      </div>
    </>
  );
}

export default AddService;
