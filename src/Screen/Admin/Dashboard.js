import React, { useEffect } from "react";
import FrmSidebar from "../FrmSidebar";

function Dashboard() {
  useEffect(() => {
    var myData = JSON.parse(window.sessionStorage.getItem("Auth"));

    console.log(myData);
  }, []);

  return (
    <div>
      <FrmSidebar />
      <div>ksdhjfklhslb</div>
    </div>
  );
}

export default Dashboard;
