import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  Image,
  CardBody,
  CardFooter,
  Stack,
  Heading,
  Button,
  Text,
  HStack,
  VStack,
  Divider,
  ButtonGroup,
} from "@chakra-ui/react";
import "./Place.css";
import { AppContext } from "../Context/Parentcontext";

const Place = () => {
  const [data, setData] = useState([]);
  const { value } = useContext(AppContext);
const FetchData=()=>{
  axios
      .get("https://s54-travel-advisory2.onrender.com/Travel")
      .then((res) => {
        // Update state with fetched data
        setData(res.data);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      });
}
  useEffect(() => {
    // Fetch data from the API
    FetchData()
  }, []); // Empty dependency array means this effect runs only once on component mount

  return (
    <div>
      {data.map((item) => (
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
            <CardBody>
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
            </CardBody>
          </Stack>
        </Card>
      ))}
    </div>
  );
};

export default Place;