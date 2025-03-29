import React from 'react';
import { useState, useRef } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default function BigMap() {
  const inputLocation = useRef(null);
  const [location, setLocation] = useState('');
  const [showMap, setShowMap] = useState(false);

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      searchLocation();
    }
  };

  function searchLocation() {
    setLocation(inputLocation.current.value);
    console.log(inputLocation);
    console.log(location);
    setShowMap(true);
  }
  const getMap = `https://www.google.com/maps/embed/v1/place?key=${
    import.meta.env.VITE_MAP_API_KEY
  }&q=${location}`;

  function SearchBar() {
    return (
      <Form className='d-flex'>
        <Form.Control
          ref={inputLocation}
          type='search'
          placeholder='Enter city or location'
          className='ms-0 mt-2'
          aria-label='Search'
          onKeyDown={handleKeyDown}
        />
         <Button
           className='ms-2 mt-2 myFont bold'
           gap={1}
           variant='dark'
           onClick={() => searchLocation()}
        >
           Search
         </Button>
       </Form>
                  );
   }

   function Map() {
     return (
       <iframe
         className='interactive--map'
         title='interactive map'
         style={{ border: 0 }}
         loading='lazy'
         allowFullScreen
         referrerPolicy='no-referrer-when-downgrade'
         src={getMap}
       ></iframe>
     );
   }

   return (
     <div className='bg--div'>
       <h1 className='bold'>Map</h1>
       {/* <img src={map} width='100' alt='map icon'/> */}
       <SearchBar />
       {showMap && <Map />}
     </div>
   );
 }



{/* import React, { useState, useRef } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default function BigMap() {
  const inputLocation = useRef(null);
  const [location, setLocation] = useState("");
  const [showMap, setShowMap] = useState(false);

  // Get Google Maps API Key from environment variables
  const MAP_API_KEY = "AIzaSyChhHwMHZg9C8oyxO1EcWzPdjFFNplV9TU"; // ⚠️ This is NOT a valid Google Maps API key

  // Handle Enter key press for search
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      searchLocation();
    }
  };

  // Search function
  function searchLocation() {
    const searchValue = inputLocation.current.value.trim();
    if (searchValue) {
      setLocation(searchValue);
      setShowMap(true);
    }
  }

  // Google Maps Embed URL
  const getMap = MAP_API_KEY
    ? `https://www.google.com/maps/embed/v1/place?key=${MAP_API_KEY}&q=${location}`
    : null;

  function SearchBar() {
    return (
      <Form className="d-flex">
        <Form.Control
          ref={inputLocation}
          type="search"
          placeholder="Enter city or location"
          className="ms-0 mt-2"
          aria-label="Search"
          onKeyDown={handleKeyDown}
        />
        <Button
          className="ms-2 mt-2 myFont bold"
          variant="dark"
          onClick={searchLocation}
        >
          Search
        </Button>
      </Form>
    );
  }

  function Map() {
    if (!MAP_API_KEY) {
      return <p className="error-message">⚠️ API Key is missing or invalid!</p>;
    }

    return (
      <iframe
        className="interactive--map"
        title="interactive map"
        style={{ border: 0 }}
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
        src={getMap}
      ></iframe>
    );
  }

  return (
    <div className="bg--div">
      <h1 className="bold">Map</h1>
      <SearchBar />
      {showMap && <Map />}
    </div>
  );
}

 */}
