import { Icon, ImageName, Td, Th } from "@/components/Component";
import DropdownMenu from "@/components/DropdownMenu";
import PageTitle from "@/components/PageTitle";
import { useState } from "react";
import { Link } from "react-router";
import {
  useAppreciations,
  useDeleteAppreciation,
} from "../../../hooks/hr/useAppreciations";
import Loading from "@/components/Loading";
import { getProfileImageUrl } from "../../../utils/utils";

function AppreciationTable() {
  const [activeMenu, setActiveMenu] = useState(null);
  const { data: appreciations, isLoading, isError } = useAppreciations();
  const deleteAppreciationMutation = useDeleteAppreciation();

  const handleMenuClick = (index, e) => {
    e.preventDefault();
    setActiveMenu(activeMenu === index ? null : index);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this appreciation?")) {
      deleteAppreciationMutation.mutate(id, {
        onError: (err) => {
          alert(err.message || "Failed to delete appreciation");
        },
      });
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <div>Error loading appreciations</div>;
  }

  return (
    <>
      <PageTitle title="Appreciation" />
      <div className=" h-10 flex justify-between mb-4">
        <div className="flex gap-4">
          <Link
            to="/admin/hr/add-appreciation"
            className="px-4 typo-cta bg-brand rounded-sm flex items-center gap-1"
          >
            <div className="w-6 h-6 flex justify-center items-center">
              <Icon name="plus" size={15} />
            </div>
            Add Appreciation
          </Link>
        </div>
        <div className="flex py-1 gap-4">
          <div className="h-full min-w-35.5 px-2 py-1 border-1 border-divider flex justify-between items-center rounded-sm">
            <div className="flex-1 text-center">status</div>
            <Icon name="arrow" />
          </div>
        </div>
      </div>
      {!appreciations || appreciations.length === 0 ? (
        <div className="text-center typo-h1">No Appreciation Found</div>
      ) : (
        <div className="overflow-x-auto p-2 pb-1.5 border-2 border-divider rounded-lg bg-surface2 shadow-sm">
          <table className="min-w-full border-separate border-spacing-y-1 border-spacing-x-0">
            <thead className="table-header-group after:content-[''] after:block after:h-1">
              <tr className="text-left">
                <Th title="Award Name" />
                <Th title="Giving To" />
                {/* <Th title="Giving By" /> */}
                <Th title="Action" />
              </tr>
            </thead>
            <tbody>
              {appreciations.map((appreciation, index) => (
                <tr
                  key={index}
                  className="h-17 px-4 shadow-sm hover:[&_td]:bg-divider/80 transition-colors"
                >
                  <Td className="irst:rounded-l-[4px]">{appreciation.awardName}</Td>
                  <Td>
                    <ImageName
                      image={getProfileImageUrl(appreciation.givingTo?.profilePicture)}
                      username={appreciation.givingTo?.name}
                      // designation={appreciation.givingTo}
                    />
                  </Td>
                  {/* <Td>
                    <ImageName
                      image="/images/profile.png"
                      username={appreciation.awardBy.name}
                      designation={appreciation.awardBy.role}
                    />
                  </Td> */}
                  <Td className="last:rounded-r-[4px]">
                    <button
                      onClick={(e) => handleMenuClick(index, e)}
                      className="relative p-2 cursor-pointer hover:bg-surface2/60 border border-text2 rounded-sm"
                    >
                      <Icon name="menu" size={20} />
                      <DropdownMenu
                        isOpen={activeMenu === index}
                        onClose={() => setActiveMenu(null)}
                        menuItems={[
                          {
                            label: "Delete",
                            onClick: () => handleDelete(appreciation.id),
                          },
                        ]}
                      />
                    </button>
                  </Td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

export default AppreciationTable;
