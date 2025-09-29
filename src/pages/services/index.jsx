import React from "react";
import { Outlet } from "react-router";

function index() {
  return (
    <>
      <PageTitle title="Service" />
      <Outlet />
    </>
  );
}

export default index;
