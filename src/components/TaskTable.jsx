import React from "react";
import { Link } from "react-router";
import Icon from "@/components/Icon";
import { ImageName, Table, Td, Th, Thead } from "./Component";

function ClientTable() {
  const tasks = [
    {
      id: "TK1414",
      milestone: "Milestone 1",
      project: "Sample Project 1",
      priority: "Medium",
      startDate: "Aug 3, 2025",
      endDate: "Aug 23, 2025",
      performance: "High Performance",
      estimatedTime: "7d23hr",
      actualTime: "74.93hr",
      status: ["Complete", "Review", "Achievement"],
    },
    {
      id: "TK1414",
      milestone: "Milestone 2",
      project: "Sample Project 1",
      priority: "Medium",
      startDate: "Aug 3, 2025",
      endDate: "Aug 23, 2025",
      performance: "High Performance",
      estimatedTime: "7d23hr",
      actualTime: "74.93hr",
      status: ["Complete", "Review", "Achievement"],
    },
    {
      id: "TK1415",
      milestone: "Milestone 1",
      project: "Sample Project 2",
      priority: "High",
      startDate: "Aug 5, 2025",
      endDate: "Aug 25, 2025",
      performance: "Medium Performance",
      estimatedTime: "5d12hr",
      actualTime: "62.50hr",
      status: ["In Progress", "Review"],
    },
    {
      id: "TK1416",
      milestone: "Milestone 3",
      project: "Sample Project 1",
      priority: "Low",
      startDate: "Aug 10, 2025",
      endDate: "Aug 30, 2025",
      performance: "High Performance",
      estimatedTime: "10d00hr",
      actualTime: "95.25hr",
      status: ["Planning", "Approval"],
    },
    {
      id: "TK1417",
      milestone: "Milestone 1",
      project: "Sample Project 3",
      priority: "Medium",
      startDate: "Aug 15, 2025",
      endDate: "Sep 4, 2025",
      performance: "Low Performance",
      estimatedTime: "8d06hr",
      actualTime: "102.75hr",
      status: ["Delayed", "Review"],
    },
    {
      id: "TK1418",
      milestone: "Milestone 2",
      project: "Sample Project 2",
      priority: "High",
      startDate: "Aug 18, 2025",
      endDate: "Sep 7, 2025",
      performance: "High Performance",
      estimatedTime: "6d18hr",
      actualTime: "68.40hr",
      status: ["Complete", "Achievement"],
    },
    {
      id: "TK1419",
      milestone: "Milestone 4",
      project: "Sample Project 1",
      priority: "Medium",
      startDate: "Aug 22, 2025",
      endDate: "Sep 11, 2025",
      performance: "Medium Performance",
      estimatedTime: "9d12hr",
      actualTime: "88.30hr",
      status: ["In Progress", "On Track"],
    },
    {
      id: "TK1420",
      milestone: "Milestone 1",
      project: "Sample Project 4",
      priority: "Low",
      startDate: "Aug 25, 2025",
      endDate: "Sep 14, 2025",
      performance: "High Performance",
      estimatedTime: "7d00hr",
      actualTime: "71.50hr",
      status: ["Complete", "Approval"],
    },
    {
      id: "TK1421",
      milestone: "Milestone 3",
      project: "Sample Project 2",
      priority: "High",
      startDate: "Aug 28, 2025",
      endDate: "Sep 17, 2025",
      performance: "Low Performance",
      estimatedTime: "11d06hr",
      actualTime: "125.20hr",
      status: ["Delayed", "Revision Needed"],
    },
    {
      id: "TK1422",
      milestone: "Milestone 2",
      project: "Sample Project 3",
      priority: "Medium",
      startDate: "Sep 1, 2025",
      endDate: "Sep 21, 2025",
      performance: "High Performance",
      estimatedTime: "8d18hr",
      actualTime: "82.75hr",
      status: ["In Progress", "On Track"],
    },
  ];

  return (
    <Table>
      <Thead>
        <tr className="text-left">
          <Th title="Project ID" />
          <Th title="Task" />
          <Th title="Start Date" />
          <Th title="Due Date" />
          <Th title="Assigned To" />
          <Th title="Hours Logged" />
          <Th title="Status" />
          <Th title="Action" />
        </tr>
      </Thead>
      <tbody>
        {tasks.map((task, index) => (
          <tr
            key={index}
            className="h-16 hover:[&_td]:bg-divider/80 transition-colors"
          >
            {/* Client Name with Avatar */}
            <Td className="first:rounded-l-[4px]" data={task.id} />
            <Td>
              <div>
                <div className="flex gap-4 w-fit">
                  <div>Milestone 2</div>
                  <div className="typo-b3 border border-text2 rounded-sm flex items-center gap-2 px-2.5">
                    <p className="w-2 h-2 rounded-full bg-[#5EB7E0]"></p>medium
                  </div>
                </div>
                <div className="typo-b3">sample project 2</div>
              </div>
            </Td>
            <Td data={task.startDate} />
            <Td data={task.endDate} className="text-brand" />
            <Td>
              <ImageName image="/images/profile.png" username="Hakim Ali" />
            </Td>
            <Td data={task.estimatedTime} />
            <Td>
              <div className="w-31 h-10 flex items-center justify-center gap-2 border border-text2 rounded-sm">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                <div className="typo-b3">complete</div>
                <div>
                  <Icon name="arrow" />
                </div>
              </div>
            </Td>
            <Td className="text-left last:rounded-r-[4px]">
              <Link to="/clients/client-details">
                <button className="p-2 cursor-pointer hover:bg-surface2/60 border border-text2 rounded-sm">
                  <Icon name="menu" size={20} />
                </button>
              </Link>
            </Td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default ClientTable;
