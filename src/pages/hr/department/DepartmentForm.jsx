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
import {
  useCreateDepartment,
  useDeleteDepartment,
  useDepartment,
  useUpdateDepartment,
} from "../../../hooks/hr/useDepartments";
import { useNavigate, useParams } from "react-router";

function DepartmentForm({ title, edit }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [more, setMore] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
  });

  const { data: departmentData, isloadingDepartment } = useDepartment(id);
  const createDepartment = useCreateDepartment();
  const updateDepartment = useUpdateDepartment(id);
  const deleteDepartment = useDeleteDepartment();
  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (formData.title)
      if (edit) {
        updateDepartment.mutate(formData);
      } else {
        createDepartment.mutate(formData);
      }
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this client?")) {
      deleteDepartment.mutate(id);
    }
  };

  useEffect(() => {
    const iscreated = createDepartment.isSuccess;
    if (iscreated && more) {
      setFormData({
        title: "",
      });
      setMore(false);
    } else {
      if (iscreated) navigate("admin/hr/departments");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [createDepartment.isSuccess]);

  useEffect(() => {
    if (departmentData) {
      setFormData({
        title: departmentData.title || "",
      });
    }
  }, [departmentData]);

  const isLoading =
    createDepartment.isLoading ||
    updateDepartment.isLoading ||
    deleteDepartment.isLoading;
  if (edit && isloadingDepartment) {
    return <div>Loading client data...</div>;
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
              {isLoading ? "Saving..." : edit ? "Update" : "Save"}
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
                {isLoading ? "Saving..." : "Save & Add More"}
              </RedBorderButton>
            )}
          </div>

          {edit ? (
            <RedButton
              type="button"
              onClick={handleDelete}
              disabled={isLoading}
            >
              {isLoading ? "Deleting..." : "Delete Client"}
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
