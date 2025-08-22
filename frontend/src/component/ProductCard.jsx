import { Box, Heading, Image, Text, HStack, IconButton } from "@chakra-ui/react";
import { useColorModeValue } from "../components/ui/color-mode";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Toaster, toaster } from "../components/ui/toaster" // v3 version format
import { useProductStore } from "../store/product";

const ProductCard = ({product}) => {
    const textColor = useColorModeValue("gray.600","gray.200");
    const bg=useColorModeValue("white","gray.800");
    
    // for delete product
    const { deleteProduct } = useProductStore();

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
    <Toaster />
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
              <IconButton
                aria-label="Edit"
                //icon={<FaEdit color="white" size="18" />}   // set icon color directly
                bg="blue.300"                               // button background
                _hover={{ bg: "blue.600" }}                 // hover color
              >
                <FaEdit color="black" size="18" />
              </IconButton>  
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
    )
};
export default ProductCard;