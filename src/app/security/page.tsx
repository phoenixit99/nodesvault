"use client";

import {
  Box,
  Heading,
  Text,
  VStack,
  Image,
  SimpleGrid,
} from "@chakra-ui/react";
import Header from "../components/Header";

export default function CoreValuesSection() {
  return (
    <>
          <Header />
          <Box as="section" py={10} px={[4, 6, 10]}>
      {/* Section Heading */}

      <VStack spacing={2} textAlign="center" mb={8}  >
        <Text
          color="teal.500"
          fontWeight="bold"
          letterSpacing="wider"
          textTransform="uppercase"
        >
          Core Values
        </Text>
        <Heading as="h2" size="xl">
          Introduction to Our Security Capabilities
        </Heading>
        <Text maxW="600px">
          Our team specializes in implementing strong security for blockchain
          systems, with a focus on server and wallet protection.
        </Text>
      </VStack>

      {/* Grid for Core Values */}
      <SimpleGrid columns={[1, 2, 4]} spacing={8}>
        {/* First Value */}
        <VStack spacing={3} textAlign="center">
          <Image
            src="./iteration-1.svg"
            alt="Iterate to Success Icon"
            boxSize="50px"
          />
          <Heading as="h3" size="md">
            Wallet Security{" "}
          </Heading>
          <Text>
            Advanced encryption and cold storage solutions safeguard seed
            phrases and private keys, minimizing remote attack risks.
          </Text>
        </VStack>

        {/* Second Value */}
        <VStack spacing={3} textAlign="center">
          <Image
            src="./iteration-2.svg"
            alt="Encourage Growth Icon"
            boxSize="50px"
          />
          <Heading as="h3" size="md">
            Access Control{" "}
          </Heading>
          <Text>
            Strict controls, including multi-factor authentication (MFA) and
            user permissions, limit access to critical systems.
          </Text>
        </VStack>

        {/* Third Value */}
        <VStack spacing={3} textAlign="center">
          <Image
            src="./iteration-2.svg"
            alt="Go Extra Mile Icon"
            boxSize="50px"
          />
          <Heading as="h3" size="md">
            Unauthorized Access Prevention{" "}
          </Heading>
          <Text>
            Firewalls, IPS/IDS, and regular vulnerability assessments detect and
            prevent threats.
          </Text>
        </VStack>

        {/* Fourth Value */}
        <VStack spacing={3} textAlign="center">
          <Image src="./iteration-4.svg" alt="Having Fun Icon" boxSize="50px" />
          <Heading as="h3" size="md">
            Port & Login Security{" "}
          </Heading>
          <Text>
            Unnecessary ports are reconfigured, VPNs secure data traffic, and
            login policies enforce regular password updates with monitored
            access logs.
          </Text>
        </VStack>
      </SimpleGrid>
    </Box>
    </>
  );
}
