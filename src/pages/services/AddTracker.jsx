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
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate, useParams } from "react-router";

// API Functions
const trackerAPI = {
  // Get single tracker
  getById: async (id) => {
    const response = await axios.get(`/api/trackers/${id}`);
    return response.data;
  },

  // Create new tracker
  create: async (data) => {
    const response = await axios.post("/api/trackers", data);
    return response.data;
  },

  // Update tracker
  update: async ({ id, data }) => {
    const response = await axios.put(`/api/trackers/${id}`, data);
    return response.data;
  },

  // Delete tracker
  delete: async (id) => {
    const response = await axios.delete(`/api/trackers/${id}`);
    return response.data;
  },
};

// Get projects for dropdown
const getProjects = async () => {
  const response = await axios.get("/api/projects");
  return response.data;
};

function AddTracker({ edit = false, title = "Add Tracker" }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    projectName: "",
    client: null,
    companyName: "",
    teamMember: null,
    startDate: "",
    dueDate: "",
    description: "",
    status: "Active",
    price: "",
    customPrice: "",
    discount: "",
    finalAmountForClient: "",
    modeOfPayment: "",
    datePaidByClient: "",
    amountPaidByClient: "",
    amountOwedByClient: "",
    amountPayableToMembers: "",
    datePaidToMembers: "",
    amountPaidToMembers: "",
    amountOwedToMembers: "",
    finalAmountEarned: "",
    comments: "",
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Fetch projects
  const { data: projects = [] } = useQuery({
    queryKey: ["projects"],
    queryFn: getProjects,
  });

  // Fetch tracker data for editing
  // eslint-disable-next-line no-unused-vars
  const { data: trackerData, isLoading: isLoadingTracker } = useQuery({
    queryKey: ["tracker", id],
    queryFn: () => trackerAPI.getById(id),
    enabled: edit && !!id,
    onSuccess: (data) => {
      setFormData({
        projectName: data.projectName || "",
        client: data.client || null,
        companyName: data.companyName || "",
        teamMember: data.teamMember || null,
        startDate: data.startDate || "",
        dueDate: data.dueDate || "",
        description: data.description || "",
        status: data.status || "Active",
        price: data.price || "",
        customPrice: data.customPrice || "",
        discount: data.discount || "",
        finalAmountForClient: data.finalAmountForClient || "",
        modeOfPayment: data.modeOfPayment || "",
        datePaidByClient: data.datePaidByClient || "",
        amountPaidByClient: data.amountPaidByClient || "",
        amountOwedByClient: data.amountOwedByClient || "",
        amountPayableToMembers: data.amountPayableToMembers || "",
        datePaidToMembers: data.datePaidToMembers || "",
        amountPaidToMembers: data.amountPaidToMembers || "",
        amountOwedToMembers: data.amountOwedToMembers || "",
        finalAmountEarned: data.finalAmountEarned || "",
        comments: data.comments || "",
      });
    },
  });

  // Create tracker mutation
  const createMutation = useMutation({
    mutationFn: trackerAPI.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["trackers"] });
      navigate("/services");
    },
    onError: (error) => {
      console.error("Error creating tracker:", error);
      alert("Failed to create tracker. Please try again.");
    },
  });

  // Update tracker mutation
  const updateMutation = useMutation({
    mutationFn: trackerAPI.update,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["trackers"] });
      queryClient.invalidateQueries({ queryKey: ["tracker", id] });
      navigate("/services");
    },
    onError: (error) => {
      console.error("Error updating tracker:", error);
      alert("Failed to update tracker. Please try again.");
    },
  });

  // Delete tracker mutation
  const deleteMutation = useMutation({
    mutationFn: trackerAPI.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["trackers"] });
      navigate("/services");
    },
    onError: (error) => {
      console.error("Error deleting tracker:", error);
      alert("Failed to delete tracker. Please try again.");
    },
  });

  const isLoading =
    createMutation.isPending ||
    updateMutation.isPending ||
    deleteMutation.isPending;

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(formData);

    // Basic validation
    if (!formData.projectName || !formData.description) {
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

    if (!formData.projectName || !formData.description) {
      alert("Please fill in the required fields.");
      return;
    }

    createMutation.mutate(formData, {
      onSuccess: () => {
        // Reset form for adding more
        setFormData({
          projectName: "",
          client: null,
          companyName: "",
          teamMember: null,
          startDate: "",
          dueDate: "",
          description: "",
          status: "Active",
          price: "",
          customPrice: "",
          discount: "",
          finalAmountForClient: "",
          modeOfPayment: "",
          datePaidByClient: "",
          amountPaidByClient: "",
          amountOwedByClient: "",
          amountPayableToMembers: "",
          datePaidToMembers: "",
          amountPaidToMembers: "",
          amountOwedToMembers: "",
          finalAmountEarned: "",
          comments: "",
        });
      },
    });
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this tracker?")) {
      deleteMutation.mutate(id);
    }
  };

  if (edit && isLoadingTracker) {
    return <div>Loading tracker data...</div>;
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
              <FormField label="Project" required>
                <Dropdown
                  options={
                    Array.isArray(projects) && projects.length > 0
                      ? projects.map((p) => p.name)
                      : ["project one"]
                  }
                  value={formData.project || ""}
                  onChange={(val) => handleChange("projectName", val)}
                />
              </FormField>
              <ClientSelect
                label="client"
                onSelect={(client) => handleChange("client", client)}
              />
              <FormField label="Company Name (auto take)">
                <Input
                  placeholder="Enter Company Name"
                  value={formData.companyName}
                  onChange={(val) => handleChange("companyName", val)}
                />
              </FormField>
              <ClientSelect
                label="Team Member Assigned (auto take)"
                onSelect={(member) => handleChange("teamMember", member)}
              />
              <FormField label="Start Date (auto take after projec or clint select)">
                <div className="relative">
                  <Input
                    type="date"
                    placeholder="Select Date"
                    value={formData.startDate}
                    onChange={(val) => handleChange("startDate", val)}
                  />
                  <Icon
                    name="calendar"
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4"
                  />
                </div>
              </FormField>
              <FormField label="Due Date (auto take Same)">
                <div className="relative">
                  <Input
                    type="date"
                    placeholder="Select Date"
                    value={formData.dueDate}
                    onChange={(val) => handleChange("dueDate", val)}
                  />
                  <Icon
                    name="calendar"
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4"
                  />
                </div>
              </FormField>
              <FormField
                label="Description (auto or Type)"
                className="md:col-span-2 lg:col-span-3"
              >
                <textarea
                  placeholder="Enter Message"
                  value={formData.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                  className="w-full h-50 p-4 bg-surface2 border border-divider rounded-lg focus:outline-none focus:ring-2 focus:ring-brand typo-b3"
                />
              </FormField>
              <FormField label="Account Status">
                <div className="relative">
                  <div
                    className={`w-2 h-2 rounded-full absolute left-4 top-1/2 -translate-y-1/2 ${
                      formData.status === "Active"
                        ? "bg-success"
                        : formData.status === "Inactive"
                        ? "bg-brand"
                        : "bg-gray-400"
                    }`}
                  ></div>
                  <select
                    value={formData.status}
                    onChange={(e) => handleChange("status", e.target.value)}
                    className="w-full h-12 bg-surface2 border border-divider rounded-lg px-4 appearance-none focus:outline-none focus:ring-2 focus:ring-brand pl-8 typo-b3"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="Suspended">Suspended</option>
                  </select>
                  <Icon
                    name="arrow"
                    size={24}
                    className="absolute right-4 top-1/2 -translate-y-1/2"
                  />
                </div>
              </FormField>
              <FormField label="Price">
                <InputMoney
                  placeholder="USD"
                  value={formData.price}
                  onChange={(val) => handleChange("price", val)}
                />
              </FormField>
              <FormField label="Custom Price">
                <InputMoney
                  placeholder="USD"
                  value={formData.customPrice}
                  onChange={(val) => handleChange("customPrice", val)}
                />
              </FormField>
              <FormField label="Discount">
                <InputMoney
                  placeholder="USD"
                  value={formData.discount}
                  onChange={(val) => handleChange("discount", val)}
                />
              </FormField>
              <FormField label="Final Amount For Client">
                <InputMoney
                  placeholder="USD"
                  value={formData.finalAmountForClient}
                  onChange={(val) => handleChange("finalAmountForClient", val)}
                />
              </FormField>
              <FormField label="Mode of Payment">
                <Dropdown
                  options={["Cash", "Bank Transfer", "Cheque", "Online"]}
                  value={formData.modeOfPayment}
                  onChange={(val) => handleChange("modeOfPayment", val)}
                />
              </FormField>
              <FormField label="Date Paid By the Client">
                <div className="relative">
                  <Input
                    type="date"
                    placeholder="Select Date"
                    value={formData.datePaidByClient}
                    onChange={(val) => handleChange("datePaidByClient", val)}
                  />
                  <Icon
                    name="calendar"
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4"
                  />
                </div>
              </FormField>
              <FormField label="Amount Paid By Client">
                <InputMoney
                  placeholder="USD"
                  value={formData.amountPaidByClient}
                  onChange={(val) => handleChange("amountPaidByClient", val)}
                />
              </FormField>
              <FormField label="Amount Owed By Client">
                <InputMoney
                  placeholder="USD"
                  value={formData.amountOwedByClient}
                  onChange={(val) => handleChange("amountOwedByClient", val)}
                />
              </FormField>
              <FormField label="Amount Payable To Members">
                <InputMoney
                  placeholder="USD"
                  value={formData.amountPayableToMembers}
                  onChange={(val) =>
                    handleChange("amountPayableToMembers", val)
                  }
                />
              </FormField>
              <FormField label="Date Paid To The Members">
                <div className="relative">
                  <Input
                    type="date"
                    placeholder="Select Date"
                    value={formData.datePaidToMembers}
                    onChange={(val) => handleChange("datePaidToMembers", val)}
                  />
                  <Icon
                    name="calendar"
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4"
                  />
                </div>
              </FormField>
              <FormField label="Amount Paid To Members">
                <InputMoney
                  placeholder="USD"
                  value={formData.amountPaidToMembers}
                  onChange={(val) => handleChange("amountPaidToMembers", val)}
                />
              </FormField>
              <FormField label="Amount Owed To Members">
                <InputMoney
                  placeholder="USD"
                  value={formData.amountOwedToMembers}
                  onChange={(val) => handleChange("amountOwedToMembers", val)}
                />
              </FormField>
              <FormField label="Final Amount Earned">
                <InputMoney
                  placeholder="USD"
                  value={formData.finalAmountEarned}
                  onChange={(val) => handleChange("finalAmountEarned", val)}
                />
              </FormField>
              <FormField label="Comments">
                <Input
                  placeholder="Add Comments"
                  value={formData.comments}
                  onChange={(val) => handleChange("comments", val)}
                />
              </FormField>
            </form>
          </div>
        </div>

        {edit ? (
          <div className="flex justify-between">
            <div className="flex gap-4">
              <RedButton
                type="button"
                onClick={handleSubmit}
                disabled={isLoading}
              >
                {isLoading ? "Saving..." : "Save"}
              </RedButton>
              <Back>
                <RedBorderButton disabled={isLoading}>Cancel</RedBorderButton>
              </Back>
            </div>

            <RedButton
              type="button"
              onClick={handleDelete}
              disabled={isLoading}
            >
              {isLoading ? "Deleting..." : "Delete"}
            </RedButton>
          </div>
        ) : (
          <div className="flex justify-between">
            <div className="flex gap-4">
              <RedButton
                type="button"
                onClick={handleSubmit}
                disabled={isLoading}
              >
                {isLoading ? "Saving..." : "Save"}
              </RedButton>
              <RedBorderButton
                type="button"
                onClick={handleSaveAndAddMore}
                disabled={isLoading}
              >
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

export default AddTracker;
