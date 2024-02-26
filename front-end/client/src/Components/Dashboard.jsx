import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDisclosure } from "@chakra-ui/react";
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
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import "./Place.css";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [isDark, setIsDark] = useState(false); // Corrected initialization
  const [inputValue, setValue] = useState({
    rating: "",
    img: "",
    review: "",
    infrastructure: "",
  });

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedItemId, setSelectedItemId] = useState(null);

  useEffect(() => {
    axios
      .get("https://s54-travel-advisory2.onrender.com/Travel")
      .then((res) => setData(res.data))
      .catch((err) => console.log("error"));
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`https://s54-travel-advisory2.onrender.com/Travel/${id}`)
      .then(() => {
        location.reload();
      })
      .catch((err) => console.log("error"));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleUpdate = () => {
    axios
      .put(
        `https://s54-travel-advisory2.onrender.com/Travel/${selectedItemId}`,
        {
          rating: inputValue.rating,
          img: inputValue.img,
          review: inputValue.review,
          infrastructure: inputValue.infrastructure,
        }
      )
      .then(() => {
        onClose();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div style={{ backgroundColor: isDark ? "black" : "white" }}>
      {data.map((item) => (
        <div key={item._id}>
          <Card
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
                <Text py="2">state -{item.state}</Text>
                <Text py="2">infrastructure - {item.infrastructure}</Text>

                <Text py="2">rating - {item.rating}</Text>
                <Text py="2">review -{item.review}</Text>
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

              <CardFooter>
                <HStack>
                  <Button
                    onClick={() => {
                      setSelectedItemId(item._id);
                      onOpen();
                    }}
                    variant="solid"
                    colorScheme="green"
                  >
                    update
                  </Button>
                  <Button
                    onClick={() => {
                      handleDelete(item._id);
                    }}
                    variant="solid"
                    colorScheme="red"
                  >
                    Delete
                  </Button>
                </HStack>
              </CardFooter>
            </Stack>
          </Card>
        </div>
      ))}

      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay backgroundColor="rgba(0, 0, 0, 0.1)" />
        <ModalContent>
          <ModalHeader>Update Places</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl mt={4}>
              <FormLabel>updated review</FormLabel>
              <Input
                onChange={handleChange}
                name="review"
                placeholder="place review"
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>img</FormLabel>
              <Input
                onChange={handleChange}
                name="img"
                placeholder="img"
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>rating</FormLabel>
              <Input
                onChange={handleChange}
                name="rating"
                placeholder="rating"
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>infrastructure</FormLabel>
              <Input
                onChange={handleChange}
                name="infrastructure"
                placeholder="infrastructure"
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button onClick={handleUpdate} colorScheme="green" mr={3}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Dashboard;
