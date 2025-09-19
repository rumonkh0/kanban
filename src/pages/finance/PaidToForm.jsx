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
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate, useParams } from "react-router";
import PageTitle from "@/components/PageTitle";

// API Functions
const paidToAPI = {
  // Get single paid to record
  getById: async (id) => {
    const response = await axios.get(`/api/paidto/${id}`);
    return response.data;
  },

  // Create new paid to record
  create: async (data) => {
    const response = await axios.post("/api/paidto", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },

  // Update paid to record
  update: async ({ id, data }) => {
    const response = await axios.put(`/api/paidto/${id}`, data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },

  // Delete paid to record
  delete: async (id) => {
    const response = await axios.delete(`/api/paidto/${id}`);
    return response.data;
  },
};

// Get projects for dropdown
const getProjects = async () => {
  const response = await axios.get("/api/projects");
  return response.data;
};

// Get clients for dropdown
const getClients = async () => {
  const response = await axios.get("/api/clients");
  return response.data;
};

function PaidToForm({ edit = false, title = "Add Payment" }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    project: "",
    client: null,
    toBePaid: "",
    discount: "",
    paymentDate: "",
    amountPaid: "",
    amountOwed: "",
    paidMethod: "",
    paymentStatus: "Owed",
    invoiceNo: "",
  });
  const [invoiceFile, setInvoiceFile] = useState(null);
  const [, setInvoicePreview] = useState(null);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (file) => {
    if (!file) return;
    
    setInvoiceFile(file);
    
    // Create preview for certain file types
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setInvoicePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setInvoicePreview(file.name);
    }
  };

  // Fetch paid to data for editing
  // eslint-disable-next-line no-unused-vars
  const { data: paidData, isLoading: isLoadingPaid } = useQuery({
    queryKey: ["paidTo", id],
    queryFn: () => paidToAPI.getById(id),
    enabled: edit && !!id,
    onSuccess: (data) => {
      setFormData({
        project: data.project || "",
        client: data.client || null,
        toBePaid: data.toBePaid || "",
        discount: data.discount || "",
        paymentDate: data.paymentDate || "",
        amountPaid: data.amountPaid || "",
        amountOwed: data.amountOwed || "",
        paidMethod: data.paidMethod || "",
        paymentStatus: data.paymentStatus || "Owed",
        invoiceNo: data.invoiceNo || "",
      });
      if (data.invoiceFile) {
        setInvoicePreview(data.invoiceFile);
      }
    },
  });

  // Fetch projects
  const { data: projects = [] } = useQuery({
    queryKey: ["projects"],
    queryFn: getProjects,
  });

  // Fetch clients
  // eslint-disable-next-line no-unused-vars
  const { data: clients = [] } = useQuery({
    queryKey: ["clients"],
    queryFn: getClients,
  });

  // Create payment mutation
  const createMutation = useMutation({
    mutationFn: paidToAPI.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["paidToList"] });
      queryClient.invalidateQueries({ queryKey: ["paidTo"] });
      navigate("/finance/paid-to");
    },
    onError: (error) => {
      console.error("Error creating payment:", error);
      alert("Failed to create payment. Please try again.");
    },
  });

  // Update payment mutation
  const updateMutation = useMutation({
    mutationFn: paidToAPI.update,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["paidToList"] });
      queryClient.invalidateQueries({ queryKey: ["paidTo", id] });
      navigate("/finance/paid-to");
    },
    onError: (error) => {
      console.error("Error updating payment:", error);
      alert("Failed to update payment. Please try again.");
    },
  });

  // Delete payment mutation
  const deleteMutation = useMutation({
    mutationFn: paidToAPI.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["paidToList"] });
      navigate("/finance/paid-to");
    },
    onError: (error) => {
      console.error("Error deleting payment:", error);
      alert("Failed to delete payment. Please try again.");
    },
  });

  const isLoading = createMutation.isPending || updateMutation.isPending || deleteMutation.isPending;

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.project || !formData.paymentDate || !formData.amountPaid || !formData.paidMethod || !formData.paymentStatus) {
      alert("Please fill in all required fields.");
      return;
    }

    // Create FormData for file upload
    const submitData = new FormData();
    
    // Append all form fields
    Object.keys(formData).forEach((key) => {
      if (formData[key] !== null && formData[key] !== undefined) {
        if (typeof formData[key] === "object") {
          submitData.append(key, JSON.stringify(formData[key]));
        } else {
          submitData.append(key, formData[key]);
        }
      }
    });

    // Append file if selected
    if (invoiceFile) {
      submitData.append("invoiceFile", invoiceFile);
    }

    if (edit) {
      updateMutation.mutate({ id, data: submitData });
    } else {
      createMutation.mutate(submitData);
    }
  };

  const handleSaveAndAddMore = (e) => {
    e.preventDefault();
    
    if (!formData.project || !formData.paymentDate || !formData.amountPaid || !formData.paidMethod || !formData.paymentStatus) {
      alert("Please fill in all required fields.");
      return;
    }

    const submitData = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key] !== null && formData[key] !== undefined) {
        if (typeof formData[key] === "object") {
          submitData.append(key, JSON.stringify(formData[key]));
        } else {
          submitData.append(key, formData[key]);
        }
      }
    });

    if (invoiceFile) {
      submitData.append("invoiceFile", invoiceFile);
    }

    createMutation.mutate(submitData, {
      onSuccess: () => {
        // Reset form for adding more
        setFormData({
          project: "",
          client: null,
          toBePaid: "",
          discount: "",
          paymentDate: "",
          amountPaid: "",
          amountOwed: "",
          paidMethod: "",
          paymentStatus: "Owed",
          invoiceNo: "",
        });
        setInvoiceFile(null);
        setInvoicePreview(null);
      }
    });
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this payment?")) {
      deleteMutation.mutate(id);
    }
  };

  if (edit && isLoadingPaid) {
    return <div>Loading payment data...</div>;
  }

  return (
    <>
      <PageTitle title={edit ? "Edit Payment" : title} />
      <div className="flex flex-col gap-8">
        <div>
          <div className="mb-4 flex justify-between items-center">
            <div className="typo-b1">Payment Details</div>
            <Back>
              <Icon name="close" />
            </Back>
          </div>
        <div className="bg-surface1 rounded-xl">
          <form className="grid grid-cols-3 gap-4">
            <FormField label="Project" required>
              <Dropdown
                options={
                  Array.isArray(projects) && projects.length > 0
                    ? projects.map((p) => p.name)
                    : ["project one"]
                }
                value={formData.project || ""}
                onChange={(val) => handleChange("project", val)}
              />
            </FormField>

            <ClientSelect
              onSelect={(client) => handleChange("client", client)}
              label="Paid To"
            />

            <FormField label="To Be Paid">
              <InputMoney
                value={formData.toBePaid}
                onChange={(val) => handleChange("toBePaid", val)}
              />
            </FormField>

            <FormField label="Discount">
              <Input
                value={formData.discount}
                onChange={(e) => handleChange("discount", e.target.value)}
              />
            </FormField>

            <FormField label="Payment Date" required>
              <div className="relative">
                <input
                  type="date"
                  value={formData.paymentDate}
                  onChange={(e) => handleChange("paymentDate", e.target.value)}
                  className="w-full h-12 bg-surface2 border border-divider rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-brand typo-b3"
                />
                <Icon
                  name="calendar"
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4"
                />
              </div>
            </FormField>

            <FormField label="Amount Paid" required>
              <InputMoney
                value={formData.amountPaid}
                onChange={(val) => handleChange("amountPaid", val)}
              />
            </FormField>

            <FormField label="Amount Owed">
              <InputMoney
                value={formData.amountOwed}
                onChange={(val) => handleChange("amountOwed", val)}
              />
            </FormField>

            <FormField label="Payment Method" required>
              <Dropdown
                options={["Cash", "Bank Transfer", "Cheque", "Other"]}
                value={formData.paidMethod}
                onChange={(val) => handleChange("paidMethod", val)}
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
                  className="pl-8 w-full h-12 bg-surface2 rounded-lg border-divider"
                />
              </div>
            </FormField>

            <FormField label="Invoice No.">
              <Input
                value={formData.invoiceNo}
                onChange={(e) => handleChange("invoiceNo", e.target.value)}
              />
            </FormField>

            <FormField label="Upload Invoice" className="col-span-3">
              <div className="flex items-center justify-center h-16 bg-surface2 border-2 border-divider rounded-lg">
                <label className="flex items-center gap-2 text-text2 cursor-pointer">
                  <Icon name="upload" size={24} />
                  <span className="typo-b3">
                    {invoiceFile ? invoiceFile.name : "Upload Invoice Here"}
                  </span>
                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) => handleFileChange(e.target.files[0])}
                  />
                </label>
              </div>
            </FormField>
          </form>
        </div>
      </div>

      {/* Action buttons */}
        <div className="flex justify-between">
          <div className="flex gap-4">
            <RedButton
              type="button"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Save"}
            </RedButton>
            {edit ? (
              <Back>
                <RedBorderButton disabled={isLoading}>Cancel</RedBorderButton>
              </Back>
            ) : (
              <RedBorderButton
                type="button"
                onClick={handleSaveAndAddMore}
                disabled={isLoading}
              >
                {isLoading ? "Saving..." : "Save & Add More"}
              </RedBorderButton>
            )}
          </div>

          {edit ? (
            <RedButton type="button" onClick={handleDelete} disabled={isLoading}>
              {isLoading ? "Deleting..." : "Delete Payment"}
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

export default PaidToForm;
