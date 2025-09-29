import React from "react";
import { Outlet } from "react-router";
import PageTitle from "../../components/PageTitle";

function index() {
  return (
    <>
      <PageTitle title="Clients" />
      <Outlet />
    </>
  );
}

export default index;
