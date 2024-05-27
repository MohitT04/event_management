import React, { useEffect, useState } from "react";
import FrmSidebar from "../FrmSidebar";
import { Button, Form, Modal, Table } from "react-bootstrap";
import { GetDataFromApiServerAsync, apiServerUrl } from "../Common/Common";
import {
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  FormControl,
  MenuItem,
  InputLabel,
  Select,
} from "@mui/material";

function FrmFood() {
  const [ListData, setListData] = useState([]);

  const [show, setShow] = useState(false);
  const [FoodName, setFoodName] = useState("");
  const [FoodCost, setFoodCost] = useState("");
  const [Foodtype, setFoodtype] = useState("");
  const [Mealtype, setMealtype] = useState("");
  const [Dishtype, setDishtype] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const GetDataFromApi = async () => {
    try {
      const responseJson = await GetDataFromApiServerAsync("GetFoodData");
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

    // console.log(myData.username);
    try {
      const Post_responseData = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lineID: "",
          foodUUID: "",
          food_Type: Foodtype,
          meal_Type: Mealtype,
          dish_Type: Dishtype,
          food_Name: FoodName,
          food_FilePath: "",
          food_Cost: FoodCost,
          createdBy: myData.username,
          postedDateTime: "",
        }),
      };
      console.log(Post_responseData);

      var response = await fetch(
        apiServerUrl + "PostFoodRecord",
        Post_responseData
      );

      console.log(response);
      if (response.ok === true) {
        // Trigger refresh by updating the refreshKey
        setShow(false);
        setFoodName("");
        setFoodCost("");
        setFoodtype("");
        setMealtype("");
        setDishtype("");

        await GetDataFromApi();
      }
    } catch (error) {}
  };

  const handleAction = async (id) => {
    try {
      var responseJson = await GetDataFromApiServerAsync("DeleteFood/" + id);
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
          Add Food
        </Button>
      </div>
      <div style={{ margin: 10, boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)" }}>
        <Table responsive="lg" striped bordered hover size="lg">
          <thead>
            <tr>
              <th>Food Type</th>
              <th>Meal Type</th>
              <th>Dish Type</th>
              <th>Food Name</th>
              <th>Food Cost</th>
              <th>Postedby</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {ListData.map((item) => (
              <tr key={item.lineID}>
                <td>{item.food_Type}</td>
                <td>{item.meal_Type}</td>
                <td>{item.dish_Type}</td>
                <td>{item.food_Name}</td>
                <td>{item.food_Cost}</td>
                <td>{item.createdBy}</td>
                <td>
                  {/* Add any action buttons or links here */}
                  <Button
                    style={{
                      backgroundColor: "#f7dd7c",
                      border: 0,
                      color: "#420a06",
                    }}
                    onClick={() => handleAction(item.foodUUID)}
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
          <Modal.Title>Add Food</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormLabel id="demo-controlled-radio-buttons-group">
            Food type
          </FormLabel>

          <RadioGroup
            row
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={Foodtype}
            onChange={(e) => setFoodtype(e.target.value)}
          >
            <FormControlLabel value="Veg" control={<Radio />} label="Veg" />
            <FormControlLabel
              value="Non Veg"
              control={<Radio />}
              label="Non Veg"
            />
          </RadioGroup>

          <FormLabel id="demo-controlled-radio-buttons-group">
            Meal type
          </FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={Mealtype}
            onChange={(e) => setMealtype(e.target.value)}
          >
            <FormControlLabel value="Lunch" control={<Radio />} label="Lunch" />
            <FormControlLabel
              value="Dinner"
              control={<Radio />}
              label="Dinner"
            />
          </RadioGroup>

          <FormLabel id="demo-controlled-radio-buttons-group">
            Dish type
          </FormLabel>
          <FormControl variant="standard" sx={{ minWidth: 120 }}>
            <InputLabel id="demo-simple-select-standard-label">
              Dish type
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={Dishtype}
              onChange={(e) => setDishtype(e.target.value)}
              label="dishtype"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={"North Indian"}>North Indian</MenuItem>
              <MenuItem value={"South Indian"}>South Indian</MenuItem>
            </Select>
          </FormControl>
          <div>
            <Form.Label htmlFor="inputPassword5">Food Name</Form.Label>
            <Form.Control
              placeholder="Food Name"
              aria-label="Username"
              aria-describedby="basic-addon1"
              value={FoodName}
              onChange={(e) => setFoodName(e.target.value)}
            />
          </div>

          <div>
            <Form.Label htmlFor="inputPassword5" style={{ marginTop: 10 }}>
              Food Cost
            </Form.Label>

            <Form.Control
              placeholder="Food Cost"
              aria-label="Username"
              aria-describedby="basic-addon1"
              value={FoodCost}
              onChange={(e) => setFoodCost(e.target.value)}
            />
          </div>
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

export default FrmFood;
