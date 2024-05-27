import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, InputGroup } from "react-bootstrap";
import { GetDataFromApiServerAsync } from "./Common/Common";
import { useNavigate } from "react-router-dom";

function Login() {
  const [UserName, setUserName] = useState("");
  const [Password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleUserNameChange = (event) => {
    const newValue = event.target.value;
    setUserName(newValue);
  };
  const handlePasswordChange = (event) => {
    const newValue = event.target.value;
    setPassword(newValue);
  };

  const GetAuthFromApi = async (event) => {
    event.preventDefault();
    try {
      var requestJson = await GetDataFromApiServerAsync(
        "AuthUser/" + UserName + "/" + Password
      );

      var myData = JSON.stringify(requestJson);
      if (myData !== "") {
        var jsonData = JSON.parse(myData);

        if (jsonData.username === "Admin") {
          window.sessionStorage.setItem("Auth", JSON.stringify(jsonData));

          navigate("/Admin/Dashboard");
        }
      }
    } catch (error) {
      console.error("Error during login:", error);
      // setError("An error occurred during login");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f1f1f1",
      }}
    >
      <form onSubmit={GetAuthFromApi}>
        <Card
          style={{
            width: "19rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Card.Img
            variant="top"
            style={{ height: "90%", width: "90%", marginTop: 10 }}
            src="https://dynamic.brandcrowd.com/asset/logo/547e6711-66db-4562-bd79-408ef9528e8c/logo-search-grid-1x?logoTemplateVersion=1&v=638446843985570000"
          />
          <Card.Body
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
              <Form.Control
                placeholder="Username"
                aria-label="Username"
                aria-describedby="basic-addon1"
                value={UserName}
                onChange={handleUserNameChange}
              />
            </InputGroup>

            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon2">@</InputGroup.Text>
              <Form.Control
                type="password"
                placeholder="Password"
                aria-label="Password"
                aria-describedby="basic-addon2"
                value={Password}
                onChange={handlePasswordChange}
              />
            </InputGroup>

            <Button
              type="submit"
              style={{
                width: "80%",
                borderRadius: 20,
                backgroundColor: "#000",
              }}
            >
              Login
            </Button>
          </Card.Body>
        </Card>
      </form>
    </div>
  );
}

export default Login;
