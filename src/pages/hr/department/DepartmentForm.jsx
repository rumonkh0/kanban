import {
  FormField,
  Input,
  RedButton,
  RedBorderButton,
  Back,
  Icon,
} from "@/components/Component";
import PageTitle from "@/components/PageTitle";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  useCreateDepartment,
  useDeleteDepartment,
  useDepartment,
  useUpdateDepartment,
} from "../../../hooks/hr/useDepartments";
import { useBack } from "../../../hooks/useBack";
import { useParams } from "react-router";

function DepartmentForm({ title, edit }) {
  const { id } = useParams();
  const [more, setMore] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
  });
  const back = useBack("/admin/hr/departments");

  const { data: departmentData, isloadingDepartment } = useDepartment(id);
  const createDepartment = useCreateDepartment();
  const updateDepartment = useUpdateDepartment(id);
  const deleteDepartment = useDeleteDepartment();
  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (!formData.title) {
      toast.error("Department name is required.");
      return;
    }
    if (edit) {
      toast.promise(updateDepartment.mutateAsync(formData), {
        pending: "Updating Department...",
        success: {
          render() {
            // back(); // Removed from here
            return "Department updated successfully!";
          },
        },
        error: {
          render: ({ data }) =>
            data?.response?.data?.message || "Failed to update department.",
        },
      });
    } else {
      toast.promise(createDepartment.mutateAsync(formData), {
        pending: "Creating Department...",
        success: {
          render() {
            if (more) {
              return "Department created! You can add another.";
            }
            return "Department created successfully!";
          },
        },
        error: {
          render: ({ data }) =>
            data?.response?.data?.message || "Failed to create department.",
        },
      });
    }
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this department?")) {
      toast.promise(deleteDepartment.mutateAsync(id), {
        pending: "Deleting Department...",
        success: {
          render() {
            // back(); // Removed from here
            return "Department deleted successfully!";
          },
        },
        error: {
          render: ({ data }) =>
            data?.response?.data?.message || "Failed to delete department.",
        },
      });
    }
  };

  useEffect(() => {
    if (createDepartment.isSuccess && more) {
      setFormData({
        title: "",
      });
      setMore(false);
    } else if (createDepartment.isSuccess) {
      back();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [createDepartment.isSuccess]);

  useEffect(() => {
    if (updateDepartment.isSuccess) back();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateDepartment.isSuccess]);

  useEffect(() => {
    if (deleteDepartment.isSuccess) back();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deleteDepartment.isSuccess]);

  useEffect(() => {
    if (departmentData) {
      setFormData({
        title: departmentData.title || "",
      });
    }
  }, [departmentData]);

  const isLoading =
    createDepartment.isPending ||
    updateDepartment.isPending ||
    deleteDepartment.isPending;
  if (edit && isloadingDepartment) {
    return <div>Loading department data...</div>;
  }

  return (
    <>
      <PageTitle title={title || "Add Department"} />
      <div className="flex flex-col gap-8">
        <div className="mb-4 flex justify-between items-center">
          <div className="typo-b1">Add Department</div>
          <Back>
            <Icon name="close" />
          </Back>
        </div>
        <div className="bg-surface1 rounded-xl">
          <form
            onSubmit={(e) => e.preventDefault()}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            <FormField label="Department Name" required>
              <Input
                placeholder="Project Manager"
                value={formData.title}
                onChange={(val) => handleChange("title", val)}
              />
            </FormField>
            {/* <ClientSelect label="Select Members" /> */}
            {/* <FormField label="Designation">
              <Dropdown
                options={["Design", "Developer", "Manager"]}
                value={formData.department}
                onChange={(val) => handleChange("department", val)}
              />
            </FormField> */}
          </form>
        </div>
        <div className="flex justify-between">
          <div className="flex gap-4">
            <RedButton
              type="button"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {(createDepartment.isPending || updateDepartment.isPending) &&
              !more
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
                  setMore(true);
                  handleSubmit();
                }}
                disabled={isLoading}
              >
                {createDepartment.isPending && more
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
              {deleteDepartment.isPending ? "Deleting..." : "Delete Department"}
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

export default DepartmentForm;
