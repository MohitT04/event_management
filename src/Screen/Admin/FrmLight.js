import React, { useEffect, useState } from "react";
import FrmSidebar from "../FrmSidebar";
import { Button, Form, FormLabel, Modal, Table } from "react-bootstrap";
import { GetDataFromApiServerAsync, apiServerUrl } from "../Common/Common";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";

function FrmLight() {
  const [ListData, setListData] = useState([]);
  const [light_Type, setlight_Type] = useState("");
  const [light_Name, setlight_Name] = useState("");
  const [light_Cost, setlight_Cost] = useState("");

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const GetDataFromApi = async () => {
    try {
      const responseJson = await GetDataFromApiServerAsync("GetLightData");
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
          lineID: "string",
          lightUUID: "string",
          light_Type: light_Type,
          light_Name: light_Name,
          light_FilePath: "string",
          light_Cost: light_Cost,
          createdBy: myData.username,
          postedDateTime: "string",
        }),
      };

      var response = await fetch(
        apiServerUrl + "PostLightRecord",
        Post_responseData
      );
      if (response.ok === true) {
        // Trigger refresh by updating the refreshKey
        setShow(false);

        setlight_Cost("");
        setlight_Name("");
        setlight_Type("");

        await GetDataFromApi();
      }
    } catch (error) {}
  };

  const handleAction = async (id) => {
    try {
      var responseJson = await GetDataFromApiServerAsync("DeleteLight/" + id);
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
    <div style={{ backgroundColor: "#f5f5f5" }}>
      <FrmSidebar />
      <div style={{ marginTop: 10, direction: "rtl", marginRight: 10 }}>
        <Button
          style={{ backgroundColor: "#f7dd7c", border: 0, color: "#420a06" }}
          onClick={handleShow}
        >
          Add Light
        </Button>
      </div>
      <div style={{ margin: 10, boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)" }}>
        <Table responsive="lg" striped bordered hover size="lg">
          <thead>
            <tr>
              <th>Light Type</th>
              <th>Light Name</th>
              <th>Light Cost</th>
              <th>Postedby</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {ListData.map((item) => (
              <tr key={item.lineID}>
                <td>{item.light_Type}</td>
                <td>{item.light_Name}</td>
                <td>{item.light_Cost}</td>
                <td>{item.createdBy}</td>
                <td>
                  {/* Add any action buttons or links here */}
                  <Button
                    style={{
                      backgroundColor: "#f7dd7c",
                      border: 0,
                      color: "#420a06",
                    }}
                    onClick={() => handleAction(item.lightUUID)}
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
          <Modal.Title>Add Venue</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormLabel id="demo-controlled-radio-buttons-group">
            Light type
          </FormLabel>

          <RadioGroup
            row
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={light_Type}
            onChange={(e) => setlight_Type(e.target.value)}
          >
            <FormControlLabel
              value="Indoor"
              control={<Radio />}
              label="Indoor"
            />
            <FormControlLabel
              value="Outdoor"
              control={<Radio />}
              label="Outdoor"
            />
          </RadioGroup>

          <Form.Label htmlFor="inputPassword5">Light Name</Form.Label>
          <Form.Control
            placeholder="Light Name"
            // aria-label="Username"
            aria-describedby="basic-addon1"
            value={light_Name}
            onChange={(e) => setlight_Name(e.target.value)}
          />
          <Form.Label htmlFor="inputPassword5" style={{ marginTop: 10 }}>
            Light Cost
          </Form.Label>
          <Form.Control
            placeholder="Venue Cost"
            aria-label="Username"
            aria-describedby="basic-addon1"
            value={light_Cost}
            onChange={(e) => setlight_Cost(e.target.value)}
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

export default FrmLight;
