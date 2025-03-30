import React, { useState, useRef } from "react";
import { Container, Form, Button } from "react-bootstrap";
import CityTiles from "./CityTiles"; // Ensure this is correctly imported

function Dashboard() {
  // State for location
  const [location, setLocation] = useState("");

  // Reference for input field
  const inputLocation = useRef(null);

  // Function to set location and trigger API call
  function GetLocation() {
    if (inputLocation.current) {
      const newLocation = inputLocation.current.value.trim();
      if (newLocation) {
        setLocation(newLocation);
        console.log("Searching for:", newLocation);
      } else {
        console.log("Please enter a valid city name.");
      }
    }
  }

  // Handle Enter key press inside input
  function handleKeyDown(event) {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent form submission
      GetLocation();
    }
  }

  // Search Bar Component
  function SearchBar() {
    return (
      <Form className="d-flex">
        <Form.Control
          type="search"
          ref={inputLocation}
          placeholder="Enter city"
          className="ms-0 mt-2"
          aria-label="Search"
          onKeyDown={handleKeyDown}
        />
        <Button
          className="ms-2 mt-2 myFont bold"
          variant="outline-dark"
          onClick={GetLocation}
        >
          Search
        </Button>
      </Form>
    );
  }

  return (
    <div>
      <h1 className="bold dashboard-title">Weather Dashboard</h1>

      <SearchBar />

      <Container className="mb-3" fluid={true}>
        <CityTiles location={location} />
      </Container>
    </div>
  );
}

export default Dashboard;
