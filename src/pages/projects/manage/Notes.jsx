import { useState } from "react";
import Icon from "@/components/Icon";
import Modal from "@/components/Modal";
import VerifyPassword from "@/components/VerifyPassword";
import NoteDetails from "@/components/NoteDetails";
import { Link, useParams } from "react-router";
import DropdownMenu from "@/components/DropdownMenu";
import { FilterDropdown, Td, Th } from "../../../components/Component";
import { useDeleteNote, useNotes } from "../../../hooks/useNotes";
import { toast } from "react-toastify";
import { World } from "../../../components/Icon";

function Notes() {
  const { id } = useParams();
  const [PaymentsModal, setPaymentModal] = useState(false);
  const [filters, setFilters] = useState({
    isPublic: "",
  });
  const [activeMenu, setActiveMenu] = useState(null);
  const { data: NotesData = [], isPending } = useNotes({ project: id });
  const deleteMutation = useDeleteNote();
  const handleMenuClick = (index, e) => {
    e.preventDefault();
    setActiveMenu(activeMenu === index ? null : index);
  };
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this Note?")) {
      deleteMutation.mutate(id, {
        onError: () => {
          toast.error("Failed to delete note");
        },
        onSuccess: () => {
          toast.success("Note Deleted!");
        },
      });
    }
  };
  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };
  if (isPending) return <div className="tyo-h1">Notes Loading</div>;
  return (
    <>
      <div className=" h-10 flex justify-between mb-4">
        <div className="flex gap-4">
          <Link
            to="/projects/add-note"
            state={{ projectId: id }}
            className="px-4 typo-cta bg-brand rounded-sm flex items-center gap-1"
          >
            <div className="w-6 h-6 flex justify-center items-center">
              <Icon name="plus" size={15} />
            </div>
            Add Note
          </Link>
        </div>
        <FilterDropdown
          label="Status"
          options={["complete", "incomplete"]}
          value={filters.status}
          onSelect={(value) => handleFilterChange("status", value)}
          className="h-8"
        />
      </div>
      {NotesData && NotesData.length > 0 ? (
        <div className="overflow-x-auto p-2 pb-1.5 border-2 border-divider rounded-lg bg-surface2 shadow-sm">
          <table className="min-w-full border-separate border-spacing-y-1 border-spacing-x-0">
            <thead className="table-header-group after:content-[''] after:block after:h-1">
              <tr className="text-left">
                <Th title="Note title" />
                <Th title="Privacy" />
                <Th title="Action" />
              </tr>
            </thead>
            <tbody>
              {NotesData.map((note, index) => (
                <tr
                  key={index}
                  className="h-17 px-4 shadow-sm hover:[&_td]:bg-divider/80 transition-colors"
                >
                  <Td className="first:rounded-l-[4px]  truncate max-w-[400px]">
                    {note.title}
                  </Td>

                  <Td>
                    <div className="flex items-center w-full h-10 border border-text2 pl-4 rounded-sm typo-b3 text-text">
                      {note.isPublic ? (
                        <>
                          <World className={`w-5 h-5 text-text mr-2`}/> Public
                        </>
                      ) : (
                        <>
                          <Icon name="lock" className="mr-2" /> Private
                        </>
                      )}
                    </div>
                  </Td>

                  <Td className="text-left last:rounded-r-[4px] relative">
                    <button
                      onClick={(e) => handleMenuClick(index, e)}
                      // onClick={() => setPaymentModal(true)}
                      className="p-2 rounded-sm border-2 border-text2 cursor-pointer hover:bg-surface2/60"
                    >
                      <Icon name="menu" size={20} />
                    </button>
                    <DropdownMenu
                      isOpen={activeMenu === index}
                      onClose={() => setActiveMenu(null)}
                      menuItems={[
                        { label: "View", onClick: () => setPaymentModal(true) },
                        {
                          label: "Edit",
                          href: `/projects/notes/${note._id}/edit`,
                        },
                        {
                          label: "Delete",
                          onClick: () => handleDelete(note._id),
                        },
                      ]}
                    />
                  </Td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="typo-h1 text-center">
          No notes found for this project
        </div>
      )}
      <Modal isOpen={PaymentsModal} onClose={() => setPaymentModal(false)}>
        {/* <VerifyPassword onClose={() => setPaymentModal(false)} /> */}
        <NoteDetails onClose={() => setPaymentModal(false)} />
      </Modal>
    </>
  );
}

export default Notes;
