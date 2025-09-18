import Icon from "@/components/Icon";
import { useState } from "react";
import { RedBorderButton, RedButton } from "@/components/Component";
import { Back } from "../../../components/Component";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate, useParams } from "react-router";

// API Functions
const noteAPI = {
  // Get single note
  getById: async (id) => {
    const response = await axios.get(`/api/notes/${id}`);
    return response.data;
  },

  // Create new note
  create: async (data) => {
    const response = await axios.post("/api/notes", data);
    return response.data;
  },

  // Update note
  update: async ({ id, data }) => {
    const response = await axios.put(`/api/notes/${id}`, data);
    return response.data;
  },

  // Delete note
  delete: async (id) => {
    const response = await axios.delete(`/api/notes/${id}`);
    return response.data;
  },
};

function AddNote({ edit = false }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    invoice: "",
    notifications: "Yes",
    password: "",
    noteDetails: "",
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Fetch note data for editing
  // eslint-disable-next-line no-unused-vars
  const { data: noteData, isLoading: isLoadingNote } = useQuery({
    queryKey: ["note", id],
    queryFn: () => noteAPI.getById(id),
    enabled: edit && !!id,
    onSuccess: (data) => {
      setFormData({
        invoice: data.invoice || "",
        notifications: data.notifications || "Yes",
        password: data.password || "",
        noteDetails: data.noteDetails || "",
      });
    },
  });

  // Create note mutation
  const createMutation = useMutation({
    mutationFn: noteAPI.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      navigate("/projects/manage/notes");
    },
    onError: (error) => {
      console.error("Error creating note:", error);
      alert("Failed to create note. Please try again.");
    },
  });

  // Update note mutation
  const updateMutation = useMutation({
    mutationFn: noteAPI.update,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      queryClient.invalidateQueries({ queryKey: ["note", id] });
      navigate("/projects/manage/notes");
    },
    onError: (error) => {
      console.error("Error updating note:", error);
      alert("Failed to update note. Please try again.");
    },
  });

  // Delete note mutation
  const deleteMutation = useMutation({
    mutationFn: noteAPI.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      navigate("/projects/manage/notes");
    },
    onError: (error) => {
      console.error("Error deleting note:", error);
      alert("Failed to delete note. Please try again.");
    },
  });

  const isLoading = createMutation.isPending || updateMutation.isPending || deleteMutation.isPending;

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.noteDetails) {
      alert("Please fill in the note details.");
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
    
    if (!formData.noteDetails) {
      alert("Please fill in the note details.");
      return;
    }

    createMutation.mutate(formData, {
      onSuccess: () => {
        // Reset form for adding more
        setFormData({
          invoice: "",
          notifications: "Yes",
          password: "",
          noteDetails: "",
        });
      }
    });
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this note?")) {
      deleteMutation.mutate(id);
    }
  };

  if (edit && isLoadingNote) {
    return <div>Loading note data...</div>;
  }

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
                value={formData.invoice}
                onChange={(e) => handleChange("invoice", e.target.value)}
                className="w-full h-12 bg-surface2 border border-divider rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-brand typo-b3"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="typo-b2 text-text2">
                Receive email notifications?
              </label>
              <div className="flex typo-cta">
                <label className={`flex-1 h-12 flex items-center justify-center cursor-pointer ${
                  formData.notifications === "Yes" ? "bg-brand text-white" : "bg-surface2 text-text"
                } rounded-l-lg`}>
                  <input
                    type="radio"
                    name="notifications"
                    value="Yes"
                    checked={formData.notifications === "Yes"}
                    onChange={() => handleChange("notifications", "Yes")}
                    className="hidden"
                  />
                  <span>Yes</span>
                </label>
                <label className={`flex-1 h-12 flex items-center justify-center cursor-pointer ${
                  formData.notifications === "No" ? "bg-brand text-white" : "bg-surface2 text-text"
                } rounded-r-lg`}>
                  <input
                    type="radio"
                    name="notifications"
                    value="No"
                    checked={formData.notifications === "No"}
                    onChange={() => handleChange("notifications", "No")}
                    className="hidden"
                  />
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
                type="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={(e) => handleChange("password", e.target.value)}
                className="w-full h-12 bg-surface2 border border-divider rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-brand typo-b3"
              />
            </div>

            <div className="col-span-3 flex flex-col gap-2">
              <label className="typo-b2 text-text2">Note Details</label>
              <textarea
                placeholder="Enter Note Details Here.."
                value={formData.noteDetails}
                onChange={(e) => handleChange("noteDetails", e.target.value)}
                className="w-full h-50 p-4 bg-surface2 border border-divider rounded-lg focus:outline-none focus:ring-2 focus:ring-brand typo-b3"
              />
            </div>
          </form>
        </div>
      </div>

      <div className="flex justify-between">
        <div className="flex gap-4">
          <RedButton type="button" onClick={handleSubmit} disabled={isLoading}>
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
            {isLoading ? "Deleting..." : "Delete Note"}
          </RedButton>
        ) : (
          <Back>
            <RedButton disabled={isLoading}>Cancel</RedButton>
          </Back>
        )}
      </div>
    </div>
  );
}

export default AddNote;
