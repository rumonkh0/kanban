"use client";
import React, { useState } from "react";
import Icon from "@/components/Icon";
import { Link } from "react-router";
import Modal from "@/components/Modal";
import PaymentDetailsModal from "@/components/PaymentDetailsModal";
import { Td, Th } from "@/components/Component";
import DropdownMenu from "@/components/DropdownMenu";

function page({ toHref }) {
  const [PaymentsModal, setPaymentModal] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const handleMenuClick = (index, e) => {
    e.preventDefault();
    setActiveMenu(activeMenu === index ? null : index);
  };
  const projects = [
    {
      projectId: "#21E7DR",
      client: "Gustave Koelpin",
      projectName: "Corporate Website Revamp",
      members: "Celia Jast",
      startDate: "Aug 13, 2025",
      deadline: null,
      status: "On Hold",
      progress: "60%",
    },
    {
      projectId: "#21E7DR",
      client: "Gustave Koelpin",
      projectName: "Corporate Website Revamp",
      members: "Celia Jast",
      startDate: "Aug 3, 2025",
      deadline: "Aug 23, 2025",
      status: "Review",
      progress: "100%",
    },
    {
      projectId: "#21E7DR",
      client: "Gustave Koelpin",
      projectName: "Corporate Website Revamp",
      members: null,
      startDate: "Aug 3, 2025",
      deadline: "Aug 23, 2025",
      status: "In Progress",
      progress: "80%",
    },
    {
      projectId: "#21E7DR",
      client: "Gustave Koelpin",
      projectName: "Corporate Website Revamp",
      members: "Celia Jast",
      startDate: "Aug 3, 2025",
      deadline: "Aug 23, 2025",
      status: "In Progress",
      progress: "80%",
    },
    {
      projectId: "#21E7DR",
      client: "Gustave Koelpin",
      projectName: "Corporate Website Revamp",
      members: "Celia Jast",
      startDate: "Aug 3, 2025",
      deadline: "Aug 23, 2025",
      status: "In Progress",
      progress: "80%",
    },
    {
      projectId: "#21E7DR",
      client: "Gustave Koelpin",
      projectName: "Corporate Website Revamp",
      members: null,
      startDate: "Aug 13, 2025",
      deadline: "Aug 23, 2025",
      status: "Not Started",
      progress: "0%",
    },
    {
      projectId: "#9F3KDL",
      client: "Lydia Marks",
      projectName: "Mobile Banking App",
      members: "Darius Green",
      startDate: "Jul 20, 2025",
      deadline: "Sep 15, 2025",
      status: "In Progress",
      progress: "45%",
    },
    {
      projectId: "#4X9TQP",
      client: "Orlando Bailey",
      projectName: "E-commerce Platform",
      members: "Sophia Patel",
      startDate: "Jun 1, 2025",
      deadline: "Oct 10, 2025",
      status: "Delayed",
      progress: "30%",
    },
    {
      projectId: "#7M2PLD",
      client: "Clara Fischer",
      projectName: "Marketing Analytics Dashboard",
      members: "Michael Johnson",
      startDate: "Aug 5, 2025",
      deadline: "Sep 30, 2025",
      status: "Review",
      progress: "90%",
    },
    {
      projectId: "#6A1KDE",
      client: "Samuel Harris",
      projectName: "Internal HR Portal",
      members: "Alice Wong",
      startDate: "Jul 10, 2025",
      deadline: "Aug 25, 2025",
      status: "Completed",
      progress: "100%",
    },
  ];
  function toTwoDecimal(num) {
    const n = parseFloat(num);
    if (isNaN(n)) return "0.00";
    return n.toFixed(2);
  }
  return (
    <>
      <div className=" h-10 flex justify-between mb-4">
        <div className="flex gap-4">
          <Link
            href={toHref}
            className="px-4 typo-cta bg-brand rounded-sm flex items-center gap-1"
          >
            <div className="w-6 h-6 flex justify-center items-center">
              <Icon name="plus" size={15} />
            </div>
            Paid From
          </Link>
        </div>
        <div className="flex py-1 gap-4">
          <div className="h-full min-w-35.5 px-2 py-1 border-1 border-divider flex justify-between items-center rounded-sm">
            <div className="flex-1 text-center">status</div>
            <Icon name="arrow" />
          </div>
          <div className="h-full min-w-35.5 px-2 py-1 border-1 border-divider flex justify-between items-center rounded-sm">
            <div className="flex-1 text-center">Select match</div>
            <Icon name="arrow" />
          </div>
          <div className="h-full min-w-35.5 px-2 py-1 border-1 border-divider flex justify-between items-center rounded-sm">
            <div className="flex-1 text-center">Select Client</div>
            <Icon name="arrow" />
          </div>
        </div>
      </div>
      <div className="overflow-x-auto p-2 pb-1.5 border-2 border-divider rounded-lg bg-surface2 shadow-sm">
        <table className="min-w-full border-separate border-spacing-y-1 border-spacing-x-0">
          <thead className="table-header-group after:content-[''] after:block after:h-1">
            <tr className="text-left">
              <Th title="Project" />
              <Th title="Paid From" />
              <Th title="Have To Paid" />
              <Th title="Payment Date" />
              <Th title="Amount Paid" />
              <Th title="Amount Owed" />
              <Th title="Payment Method" />
              <Th title="Status" />
              <Th title="Action" />
            </tr>
          </thead>
          <tbody>
            {projects.map((project, index) => (
              <tr
                key={index}
                className="h-17 px-4 shadow-sm hover:[&_td]:bg-divider/80 transition-colors"
              >
                <Td className="first:rounded-l-[4px]">
                  Social Media Page Setup Basic Package
                </Td>

                <Td>
                  <div className="flex items-center gap-2">
                    <img
                      src="/images/profile.png"
                      alt="client"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div>
                      <h2 className="typo-b2">{project.client}</h2>
                      <p className="typo-b3 text-text2">{project.client}</p>
                    </div>
                  </div>
                </Td>

                <Td>${toTwoDecimal("50")}</Td>

                <Td>{project.startDate}</Td>

                <Td className=" text-success ">${toTwoDecimal("40")}</Td>

                <Td className=" text-brand r">${toTwoDecimal("40")}</Td>

                <Td>Stripe</Td>

                <Td>
                  <div className="w-31 h-10 flex items-center justify-center gap-2 border border-text2 rounded-sm">
                    <div className="w-2 h-2 bg-success rounded-full"></div>
                    <div className="typo-b3">owed</div>
                    <div>
                      <Icon name="arrow" />
                    </div>
                  </div>
                </Td>

                <Td className="last:rounded-r-[4px] ">
                  <button
                    onClick={(e) => handleMenuClick(index, e)}
                    className="p-2 rounded-sm border-2 border-text2 cursor-pointer hover:bg-surface2/60 relative"
                  >
                    <Icon name="menu" size={20} />
                    <DropdownMenu
                      isOpen={activeMenu === index}
                      onClose={() => setActiveMenu(null)}
                      menuItems={[
                        { label: "View", onClick: () => setPaymentModal(true) },
                        {
                          label: "Edit",
                          onClick: () => console.log("Edit clicked"),
                        },
                        {
                          label: "Delete",
                          onClick: () => console.log("Delete clicked"),
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
      <Modal isOpen={PaymentsModal} onClose={() => setPaymentModal(false)}>
        <PaymentDetailsModal onClose={() => setPaymentModal(false)} />
      </Modal>
    </>
  );
}

export default page;
