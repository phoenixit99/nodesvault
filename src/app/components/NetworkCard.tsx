// components/NetworkCard.tsx
import { Box, Button, Text, VStack, HStack, Image } from '@chakra-ui/react'
// Define the interface for a network object
interface Network {
  name: string;
  apy: string;
  logo: string;
}


const NetworkCard = (network: Network) => {
  return (
    <Box
      p={4}
      shadow="md"
      borderRadius="lg"
      border="1px solid"
      borderColor="gray.200"
      w="100%"
      maxW="400px"
    >
      <VStack spacing={4}>
        <Image src={network.logo} alt={network.name} boxSize="50px" />
        <Text fontSize="xl" fontWeight="bold">{network.name}</Text>
        <Text color="black.500">APY: {network.apy}</Text>

        <Text color="black.500" cursor="pointer">Delegate funds</Text>

        <HStack spacing={2}>
          <Button  size="sm" colorScheme="teal">Services</Button>
          <Button size="sm" colorScheme="teal">Explorer</Button>
        </HStack>
      </VStack>
    </Box>
  )
}

export default NetworkCard