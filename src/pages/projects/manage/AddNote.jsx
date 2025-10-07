import Icon from "@/components/Icon";
import { useEffect, useState } from "react";
import { RedBorderButton, RedButton } from "@/components/Component";
import {
  Back,
  BinaryToggle,
  FormField,
  Input,
} from "../../../components/Component";
import { useLocation, useNavigate, useParams } from "react-router";
import {
  useCreateNote,
  useDeleteNote,
  useNote,
  useUpdateNote,
} from "../../../hooks/useNotes";
import { toast } from "react-toastify";
import Loading from "../../../components/Loading";

function AddNote({ edit = false }) {
  const { noteId } = useParams();
  const location = useLocation();
  const projectId = location.state?.projectId;
  const [more, setMore] = useState(false);
  const [formData, setFormData] = useState({
    project: projectId,
    title: "",
    isPublic: true,
    password: "",
    description: "",
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const navigate = useNavigate();
  const { data: noteData, isPending } = useNote(noteId);
  const createMutation = useCreateNote();
  const updateMutation = useUpdateNote(noteId);
  const deleteMutation = useDeleteNote();

  const isLoading =
    createMutation.isPending ||
    updateMutation.isPending ||
    deleteMutation.isPending;

  const handleSubmit = () => {
    console.log(formData);
    // Basic validation
    if (!formData.description || !formData.title) {
      alert("Please fill all the fields.");
      return;
    }

    if (formData.isPublic) {
      delete formData.password;
    }

    if (edit) {
      updateMutation.mutate(formData, {
        onSuccess: navigate(-1),
      });
    } else {
      createMutation.mutate(formData);
    }
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this note?")) {
      deleteMutation.mutate(noteId);
    }
  };

  useEffect(() => {
    const iscreated = createMutation.isSuccess;
    if (iscreated) toast.success("Note Created");
    if (iscreated && more) {
      setFormData({
        title: "",
        isPublic: true,
        password: "",
        description: "",
      });
      setMore(false);
    } else {
      if (iscreated) navigate(-1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [createMutation.isSuccess]);

  useEffect(() => {
    if (noteData) {
      setFormData({
        project: noteData._id,
        title: noteData.title || "",
        isPublic: noteData.isPublic,
        // password: noteData.password || "",
        description: noteData.description || "",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [noteData]);

  if (edit && isPending) {
    return <Loading />;
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
          <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <FormField label="Note Title">
              <Input
                type="text"
                placeholder="Note Title"
                value={formData.title}
                onChange={(e) => handleChange("title", e)}
              />
            </FormField>

            <FormField label="Public?">
              <BinaryToggle
                value={formData.isPublic}
                onChange={(val) => handleChange("isPublic", val)}
                name="isUrgent"
                trueLabel="Public"
                falseLabel="Private"
              />
            </FormField>

            <FormField label="Enter password">
              <Input
                type="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={(e) => handleChange("password", e)}
                disabled={formData.isPublic}
              />
            </FormField>

            <div className="md:col-span-2 lg:col-span-3 flex flex-col gap-2">
              <label className="typo-b2 text-text2">Note Details</label>
              <textarea
                placeholder="Enter Note Details Here.."
                value={formData.description}
                onChange={(e) => handleChange("description", e.target.value)}
                className="w-full h-50 p-4 bg-surface2 border border-divider rounded-lg focus:outline-none focus:ring-2 focus:ring-brand typo-b3"
              />
            </div>
          </form>
        </div>
      </div>

      <div className="flex justify-between">
        <div className="flex gap-4">
          <RedButton type="button" onClick={handleSubmit} disabled={isLoading}>
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
                setMore(true);
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
          <RedButton type="button" onClick={handleDelete} disabled={isLoading}>
            {deleteMutation.isPending ? "Deleting..." : "Delete Note"}
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
