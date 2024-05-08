import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import {
  Card,
  Image,
  Stack,
  Heading,
  Text,
  HStack,
  VStack,
  Select,
} from "@chakra-ui/react";
import "./Place.css";
import { AppContext } from "../Context/Parentcontext";

const Place = () => {
  const [data, setData] = useState([]);
  const { value } = useContext(AppContext);
  const [selectedState, setSelectedState] = useState(""); // State for selected state

  const fetchData = () => {
    axios
      .get("https://s54-travel-advisory2.onrender.com/Travel")
      .then((res) => {
        // Update state with fetched data
        setData(res.data);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      });
  };

  useEffect(() => {
    // Fetch data from the API
    fetchData();
  }, []); // Empty dependency array means this effect runs only once on component mount

  // Filter data based on selected state
  const filteredData = selectedState
    ? data.filter((item) => item.state === selectedState)
    : data;

  return (
    <div>
      {/* Dropdown to select state */}
      <Select
        value={selectedState}
        onChange={(e) => setSelectedState(e.target.value)}
        placeholder="Select state"
        mb={4}
      >
        {/* Get unique states from data */}
        {[...new Set(data.map((item) => item.state))].map((state) => (
          <option key={state} value={state}>
            {state}
          </option>
        ))}
      </Select>

      {/* Display filtered places */}
      {filteredData.map((item) => (
        <Card
          key={item._id}
          className="card"
          direction={{ base: "column", sm: "row" }}
          overflow="hidden"
          variant="outline"
        >
          <HStack className="image-class">
            <Image className="image" src={item.img} alt="" />
          </HStack>
          <Stack className="cardbody">
            <Heading size="md">{item.name}</Heading>
            <Text py="2">state - {item.state}</Text>
            <Text py="2">infrastructure -{item.infrastructure}</Text>
            <Text py="2">rating - {item.rating}</Text>
            <Text py="2">weather -{item.weather}</Text>
            <Text py="2">Review - {item.review}</Text>
            <Text className="blue">
              Location -{" "}
              <a
                href={item.google_map_location}
                target="_blank"
                rel="noopener noreferrer"
              >
                {item.name}
              </a>
            </Text>
          </Stack>
        </Card>
      ))}
    </div>
  );
};

export default Place;
