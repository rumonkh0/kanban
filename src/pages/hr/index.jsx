import { Outlet } from "react-router";
import PageTitle from "../../components/PageTitle";

function index() {
  return (
    <>
      <PageTitle title="Team Members" />
      <Outlet />
    </>
  );
}

export default index;
