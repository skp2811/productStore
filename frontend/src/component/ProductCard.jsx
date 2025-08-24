import { Box, Heading, Image, Text, HStack, IconButton, Dialog, Input, VStack, Button, Portal } from "@chakra-ui/react";
import { useColorModeValue } from "../components/ui/color-mode";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Toaster, toaster } from "../components/ui/toaster" // v3 version format
import { useProductStore } from "../store/product";
import { useState } from "react";

const ProductCard = ({product}) => {
    const [updatedProduct, setUpdatedProduct] = useState(product);
    const textColor = useColorModeValue("gray.600","gray.200");
    const bg=useColorModeValue("white","gray.800");
    
    // for delete product
    const { deleteProduct, updateProduct } = useProductStore();
    const handleDeleteProduct = async (pid) => {
        const { success, message } = await deleteProduct(pid);
              if(!success) {
                toaster.create({
                  title: "Error",
                  description: message,
                  status: "error",
                  closable: true,
                });
              } else {
                toaster.create({
                  title:"Success",
                  description: message,
                  status: "success",
                  closable: true
                });
              }
    }
    
    const handleUpdateProduct = async (pid, updatedProduct) => {
        await updateProduct(pid, updatedProduct);
        onclose();
    }
    return (
       
        <Box
        shadow='lg'
        rounded='lg'
        overflow='hidden'
        transition='all 0.3s'
        _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
        bg={bg}
        >
          <Image src={product.image} alt={product.name} h={40} w='full' objectFit="cover" />

          <Box p={2}>
            <Heading as='h3' size='md' mb={2}>
                {product.name}
            </Heading>

            <Text fontWeight='bold' fontSize='xl'  color={textColor} mb={4}>
                ₹{product.price}
            </Text>

            <HStack spacing={2}>

          {/* Dialog Root replaces Modal in v3 version */}
            <Dialog.Root>
             <Dialog.Trigger asChild>
              <IconButton
                aria-label="Edit"
                bg="blue.300"
                _hover={{ bg: "blue.600" }}
              >
                <FaEdit color="black" size="18" />
              </IconButton>
             </Dialog.Trigger>

             <Portal>
              <Dialog.Backdrop />
              <Dialog.Positioner>
                <Dialog.Content>
                  <Dialog.CloseTrigger />
                  <Dialog.Header>
                    <Dialog.Title>Update Product</Dialog.Title>
                  </Dialog.Header>

                  <Dialog.Body>
                    <VStack spacing={4}>
                      <Input placeholder="Product Name" name="name" value={updatedProduct.name} 
                        onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value })}
                      />
                      <Input placeholder="Price" name="price" type="number" value={updatedProduct.price} 
                         onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: e.target.value })}
                      />
                      <Input placeholder="Image URL" name="image" value={updatedProduct.image} 
                         onChange={(e) => setUpdatedProduct({ ...updatedProduct, image: e.target.value })}
                      />
                    </VStack>
                  </Dialog.Body>

                  <Dialog.Footer>
                    <Dialog.ActionTrigger asChild>
                      <Button variant="outline" bg="gray.400">Cancel</Button>
                    </Dialog.ActionTrigger>
                    <Button bg="blue.400"
                      onClick={() => handleUpdateProduct(product._id, updatedProduct)}
                    >Update</Button>
                  </Dialog.Footer>
                </Dialog.Content>
              </Dialog.Positioner>
             </Portal>
            </Dialog.Root> 
              
               <Toaster />
              <IconButton 
                aria-label="Delete" 
                bg="red.300"
                _hover={{ bg: "red.600" }} 
                onClick={() => handleDeleteProduct(product._id)}
              >
               <FaTrash size="18" color="black" />
              </IconButton>
              </HStack>
          </Box>

        </Box>
    );
};
export default ProductCard;