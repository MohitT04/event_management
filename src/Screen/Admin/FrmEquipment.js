import React, { useEffect, useState } from "react";
import FrmSidebar from "../FrmSidebar";
import { Button, Form, Modal, Table } from "react-bootstrap";
import { GetDataFromApiServerAsync, apiServerUrl } from "../Common/Common";

function FrmEquipment() {
  const [ListData, setListData] = useState([]);

  const [show, setShow] = useState(false);
  const [EquipmentName, setEquipmentName] = useState("");
  const [EquipmentCost, setEquipmentCost] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const GetDataFromApi = async () => {
    try {
      const responseJson = await GetDataFromApiServerAsync("GetEquipementData");
      if (responseJson !== null) {
        console.log(responseJson);
        setListData(responseJson);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const PostDataTOServer = async () => {
    var myData = JSON.parse(window.sessionStorage.getItem("Auth"));

    console.log(myData.username);
    try {
      const Post_responseData = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lineID: "",
          equipmentUUID: "",
          equipment_Name: EquipmentName,
          equipment_FileName: "",
          equipment_Path: "",
          equipment_Cost: EquipmentCost,
          createdBy: myData.username,
          postedDateTime: "",
        }),
      };
      console.log(Post_responseData);

      var response = await fetch(
        apiServerUrl + "PostEquipmentData",
        Post_responseData
      );

      console.log(response);
      if (response.ok === true) {
        // Trigger refresh by updating the refreshKey
        setShow(false);
        setEquipmentName("");
        setEquipmentCost("");
        await GetDataFromApi();
      }
    } catch (error) {}
  };

  const handleAction = async (id) => {
    try {
      var responseJson = await GetDataFromApiServerAsync(
        "deleteEquipmentData/" + id
      );
      if (responseJson.status === "success") {
        await GetDataFromApi();
      }
      console.log(responseJson.status);
    } catch (error) {}
  };

  useEffect(() => {
    GetDataFromApi();
  }, []);
  return (
    <div>
      <FrmSidebar />
      <div style={{ marginTop: 10, direction: "rtl", marginRight: 10 }}>
        <Button
          style={{ backgroundColor: "#f7dd7c", border: 0, color: "#420a06" }}
          onClick={handleShow}
        >
          Add Equipment
        </Button>
      </div>
      <div style={{ margin: 10, boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)" }}>
        <Table responsive="lg" striped bordered hover size="lg">
          <thead>
            <tr>
              <th>Equipment Name</th>
              <th>Equipment Cost</th>
              <th>Postedby</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {ListData.map((item) => (
              <tr key={item.lineID}>
                <td>{item.equipment_Name}</td>
                <td>{item.equipment_Cost}</td>
                <td>{item.createdBy}</td>
                <td>
                  {/* Add any action buttons or links here */}
                  <Button
                    style={{
                      backgroundColor: "#f7dd7c",
                      border: 0,
                      color: "#420a06",
                    }}
                    onClick={() => handleAction(item.equipmentUUID)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <Modal size="md" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Equipment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Label htmlFor="inputPassword5">Equipment Name</Form.Label>
          <Form.Control
            placeholder="Equipment Name"
            aria-label="Username"
            aria-describedby="basic-addon1"
            value={EquipmentName}
            onChange={(e) => setEquipmentName(e.target.value)}
          />
          <Form.Label htmlFor="inputPassword5" style={{ marginTop: 10 }}>
            Equipment Cost
          </Form.Label>
          <Form.Control
            placeholder="Equipment Cost"
            aria-label="Username"
            aria-describedby="basic-addon1"
            value={EquipmentCost}
            onChange={(e) => setEquipmentCost(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button
            style={{ backgroundColor: "#f7dd7c", border: 0, color: "#420a06" }}
            onClick={PostDataTOServer}
          >
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default FrmEquipment;
