import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Flex, Heading } from '@chakra-ui/react'; // Import Chakra UI components
import Login from './Login';
import { AppContext } from "../Context/Parentcontext";
import { deleteCookie } from './Cookie';

const Navbar = () => {
  const { setislogin, login } = useContext(AppContext);
  const navigate = useNavigate();

  const handleLogin = () => {
    if (login) {
      localStorage.setItem("isLoggedIn", "false");
      setislogin(false);
      navigate("/login");
      alert("You're logging out");
      deleteCookie("JWT");
      deleteCookie("User");
      deleteCookie("password");
    } else {
      navigate("Login");
    }
  };

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      paddingX="1rem" // Adjust horizontal padding
      paddingY="0.5rem" // Adjust vertical padding
      bg="#f0f8ff" // Light blue background color
      color="black"
      boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)" // Shadow effect
      maxWidth="800px" // Adjust the maximum width
      marginX="auto" // Center align the navbar
    >
      <Flex
        align="center"
        justify="space-around" // Center-align the navigation links
        width="auto"
        flexGrow={5}
        display={{ base: "none", md: "flex" }} // Hide navigation links on small screens
      >
        <Link to={"/"}>
          <Heading as="h5" textDecoration="none" color="black" fontSize="md" mr={4} _hover={{ color: "#007bff" }}>
            Home
          </Heading>
        </Link>
        <Link to={"about"}>
          <Heading as="h5" textDecoration="none" color="black" fontSize="md" mr={4} _hover={{ color: "#007bff" }}>
            About
          </Heading>
        </Link>
        {!login && (
          <Link to={"Signup"}>
            <Button
              colorScheme="teal" // Different color for signup button
              mr={4}
            >
              Signup
            </Button>
          </Link>
        )}
      </Flex>
      <Flex justify="flex-end" width="auto">
        <Button
          bg="#f0ffff" // Light cyan background color
          color="black"
          _hover={{ bg: "#e0f0ff" }} // Lighten background color on hover
          mr={2} // Reduce margin between buttons
          onClick={handleLogin}
          border="1px solid black" // Add border to the Login button
        >
          {login ? "Log Out" : "Log In"}
        </Button>
        <Link to={"add"}>
          <Button
            colorScheme="blue" // Use Chakra UI blue color for button
            mr={2} // Reduce margin between buttons
            _hover={{ bg: "blue.700" }} // Darken background color on hover
          >
            ADD PLACES
          </Button>
        </Link>
      </Flex>
    </Flex>
  );
};

export default Navbar;
