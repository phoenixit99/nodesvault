"use client";

import { Box, Text, Heading, Flex, Image, VStack } from "@chakra-ui/react";
import Header from "../components/Header";

export default function AboutUsPage() {
  return (
    <>
      <Header />

      <Flex
        direction={["column", "column", "row"]}
        p={10}
        gap={10}
        align="center"
      >
        {/* Left Side: Text Content */}
        <Box flex="1">
          <Heading as="h1" size="xl" mb={6}>
            NodesVault
          </Heading>
          <Text fontSize="lg" mb={4}>
            NodesVault, headquartered in Singapore, was founded with a vision
            that cryptocurrency will drive the next financial revolution. Our
            mission is to contribute to this evolution by delivering expert
            validator services.
          </Text>
          <Text fontSize="lg" mb={4}>
            Our diverse team of developers, validator operators,
            network/security specialists, and marketing experts bring extensive
            experience to ensure secure and reliable support for blockchain
            projects.
          </Text>
          <Text fontSize="lg">
            We provide core services such as State sync, Snapshots, live peers,
            public RPC, API, gRPC, IBC Relaying, and automated BOT solutions for
            enhanced validator management and alerts. NodesVault is your trusted
            partner for secure, innovative, and high-performance validator
            services.
          </Text>
        </Box>

        {/* Right Side: Image and Overlay */}
        <Box flex="1" position="relative">
          <Image
            src="./about-us.jpg" // Add your image here in the public folder
            alt="Sleeknote office"
            borderRadius="md"
          />

          {/* Overlay Box */}
          <VStack
            position="absolute"
            top="20%"
            bg="blue.600"
            color="white"
            p={5}
            borderRadius="md"
            spacing={2}
            align="start"
            left="0%"
          >
            <Heading as="h3" size="md">
              Headquarters
            </Heading>
            <Text>
              Level 24, CapitaGreen
              <br />
              138 Market Street
              <br />
              Singapore
            </Text>
          </VStack>
        </Box>
      </Flex>
    </>
  );
}
