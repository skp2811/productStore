import { Button, Container, Flex,HStack, Text } from "@chakra-ui/react"
import { Link } from "react-router-dom";
//import { PlusSquareIcon } from "@chakra-ui/icons"; // in new v3 version need to import from lucide react
import { PlusSquare } from "lucide-react";

const Navbar = () => {
  return (
    <Container maxW={"1140px"} px={4}>
        <Flex
          h={16}
          alignItems={"center"}
          justifyContent={"space-between"}
          flexDir={{
            base:"column",
            sm:"row"
          }}
        >
        
        <Text
          fontSize={{ base: "22px", sm: "28px" }}
          fontWeight={"bold"}
          textTransform={"uppercase"}
          textAlign={"center"}
          //bgGradient={"linear(to-r, cyan.400, blue.500)"}
          //bgClip={"text"}
          style={{
          background: "linear-gradient(to right, #22d3ee, #3b82f6)", // cyan.400 → blue.500
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
  }}
        >
          
          <Link to={"/"}>Product Store 🛒</Link>
        </Text>

        <HStack spacing={2} alignItems={"center"}>
            <Link to={"/create"}>
            <Button>
                <PlusSquare fontSize={20}/>
            </Button>
            </Link>
        </HStack>
        </Flex>
    </Container>
  )
};

export default Navbar;