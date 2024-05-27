import React, { useEffect, useState } from "react";
import FrmSidebar from "../FrmSidebar";
import { Button, Form, Modal, Table } from "react-bootstrap";
import { GetDataFromApiServerAsync, apiServerUrl } from "../Common/Common";

function FrmVenue() {
  const [ListData, setListData] = useState([]);

  const [show, setShow] = useState(false);
  const [VenueName, setVenueName] = useState("");
  const [VenueCost, setVenueCost] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const GetVenueDataFromApi = async () => {
    try {
      const responseJson = await GetDataFromApiServerAsync("GetVenueData");
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
          venueUUID: "",
          venue_Name: VenueName,
          venue_FileName: "",
          venue_Path: "",
          venue_Cost: VenueCost,
          createdBy: myData.username,
          postedDateTime: "string",
        }),
      };

      var response = await fetch(
        apiServerUrl + "PostVenueData",
        Post_responseData
      );
      if (response.ok === true) {
        // Trigger refresh by updating the refreshKey
        setShow(false);
        setVenueName("");
        setVenueCost("");
        await GetVenueDataFromApi();
      }
    } catch (error) {}
  };

  const handleAction = async (id) => {
    try {
      var responseJson = await GetDataFromApiServerAsync(
        "deleteVenueData/" + id
      );
      if (responseJson.status === "success") {
        await GetVenueDataFromApi();
      }
      console.log(responseJson.status);
    } catch (error) {}
  };

  useEffect(() => {
    GetVenueDataFromApi();
  }, []);
  return (
    <div style={{ backgroundColor: "#f5f5f5" }}>
      <FrmSidebar />
      <div style={{ marginTop: 10, direction: "rtl", marginRight: 10 }}>
        <Button
          style={{ backgroundColor: "#f7dd7c", border: 0, color: "#420a06" }}
          onClick={handleShow}
        >
          Add Venue
        </Button>
      </div>
      <div style={{ margin: 10, boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)" }}>
        <Table responsive="lg" striped bordered hover size="lg">
          <thead>
            <tr>
              <th>Venue Name</th>
              <th>Venue Cost</th>
              <th>Postedby</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {ListData.map((item) => (
              <tr key={item.lineID}>
                <td>{item.venue_Name}</td>
                <td>{item.venue_Cost}</td>
                <td>{item.createdBy}</td>
                <td>
                  {/* Add any action buttons or links here */}
                  <Button
                    style={{
                      backgroundColor: "#f7dd7c",
                      border: 0,
                      color: "#420a06",
                    }}
                    onClick={() => handleAction(item.venueUUID)}
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
          <Form.Label htmlFor="inputPassword5">Venue Name</Form.Label>
          <Form.Control
            placeholder="Venue Name"
            aria-label="Username"
            aria-describedby="basic-addon1"
            value={VenueName}
            onChange={(e) => setVenueName(e.target.value)}
          />
          <Form.Label htmlFor="inputPassword5" style={{ marginTop: 10 }}>
            Venue Cost
          </Form.Label>
          <Form.Control
            placeholder="Venue Cost"
            aria-label="Username"
            aria-describedby="basic-addon1"
            value={VenueCost}
            onChange={(e) => setVenueCost(e.target.value)}
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

export default FrmVenue;
