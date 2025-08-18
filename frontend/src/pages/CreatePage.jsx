import { useState } from 'react';
import {
  Container,
  VStack,
  Heading,
  Box,
  Input,
  Button,
} from "@chakra-ui/react";
import { useColorModeValue } from "../components/ui/color-mode"

const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
  });

  const handleAddProduct = () => {
    console.log(newProduct);
  };
  
  // mt for top margin between container and navbar
  return <Container maxW={"container.sm"} mt={12}>
    <VStack
      spacing={8}
    >
      <Heading as={"h1"} size={{ base: "3xl", md: "4xl" }}  textAlign={"center"} mb={8}>
        Create New Product
      </Heading>

      <Box
         w={{ base: "90%", md: "60%", lg: "40%" }}
         maxW="900px"     // won’t grow beyond 900px if the screen size is so large
         mx="auto" 
         bg={useColorModeValue ("white", "gray.800")}
        p={6} rounded={"lg"} shadow={"md"}
      >
        <VStack spacing={4}>
        <Input 
          placeholder='Product Name'
          name='name'
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value})}
        />
        
        <Input 
          placeholder='Price'
          name='price'
          type='number'
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value})}
        />

         <Input 
          placeholder='Image URL'
          name='image'
          value={newProduct.image}
          onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value})}
        />
        
        <Button  bg="blue.400"  _hover={{ bg: "blue.500" }} _active={{ bg: "blue.600" }} onClick={handleAddProduct} w='full'>
          Add Product
        </Button>
        </VStack>
      </Box>
    </VStack>
   </Container>; 
};

export default CreatePage;