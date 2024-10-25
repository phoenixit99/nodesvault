// pages/index.tsx
"use client";
import {
  Box,
  Heading,
  Text,
  List,
  ListItem,
  Link,
  Icon,
  Stack,
  Flex,
  VStack,
} from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";
import Header from "../components/Header";
import { useState } from "react";

interface MenuItem {
  id: number; // Unique identifier
  title: string; // Title of the menu item
  icon: string; // Icon representation (could also be a React element if needed)
}
const menuItems: MenuItem[] = [
  { id: 0, title: "Daskboard", icon: "💻" },
  { id: 1, title: "Installation", icon: "⚙️" },
  { id: 2, title: "Sync", icon: "🚀" },
  { id: 3, title: "Upgrade", icon: "⬆️" },
  { id: 4, title: "Command", icon: "💻" },
  { id: 5, title: "Slinky", icon: "🔧" },
];
export default function Wardenpage() {
  return (
    <>
      <Header />
      <Flex width="100%">
        <Box width="250px" padding="20px">
          <VStack align="start" spacing={6}>
            {menuItems.map((item) => (
              <Link key={item.id}
              onClick={() => { }}
              style={{ textDecoration: "none" }}>
                <Flex
                  align="center"
                  cursor="pointer"
                  p={2}
                  borderRadius="md"
                  _hover={{ bg: "blue.200", color: "white" }}
                >
                  <Text fontSize="lg">{item.icon}</Text>
                  <Text ml={3} fontSize="md">
                    {item.title}
                  </Text>
                </Flex>
              </Link>
            ))}
          </VStack>
        </Box>
        <Box flex="1" p="20px">
        {/* {selectedItem.id === 0 && <Text>Sync Instructions...</Text>}
        {selectedItem.id === 1 && <Text>Sync Instructions...</Text>}
        {selectedItem.id === 2 && <Text>Sync Instructions...</Text>}
        {selectedItem.id === 3 && <Text>Sync Instructions...</Text>} */}
          {/* < */}
          <WardenContent />
        </Box>
      </Flex>
    </>
  );
}

const WardenContent = () => {
  return (
    <VStack alignItems={"center"} maxW="100%" width={"100%"}>
      <Box maxW="1200px" mx="auto" mt="10">
        {/* Status Indicator and Title */}
        <Stack direction="row" align="center">
          <Icon as={CheckCircleIcon} boxSize={6} color="green.400" />
          <Heading size="lg">Warden Protocol</Heading>
        </Stack>

        {/* Subtitle */}
        <Text mt="2" fontSize="lg">
          Next-gen Modular L1 Blockchain Infrastructure for Omnichain
          Applications.
        </Text>
        <Box mt="4"></Box>

        {/* Hardware Minimum */}
        <Heading size="md" mt="8">
          Hardware minimum:
        </Heading>
        <List spacing={2} mt="2">
          <ListItem>• 4 core</ListItem>
          <ListItem>• 8 GB RAM</ListItem>
          <ListItem>• 80 GB SSD NVMe</ListItem>
          <ListItem>• Ubuntu 22 - x86 or arm</ListItem>
        </List>

        {/* Links */}
        <Heading size="md" mt="8">
          Links:
        </Heading>
        <List spacing={2} mt="2">
          <ListItem>
            Website:{" "}
            <Link href="https://wardenprotocol.org" color="blue.500" isExternal>
              https://wardenprotocol.org
            </Link>
          </ListItem>
          <ListItem>
            Telegram:{" "}
            <Link
              href="https://t.me/wardenprotocol"
              color="blue.500"
              isExternal
            >
              https://t.me/wardenprotocol
            </Link>
          </ListItem>
          <ListItem>
            Discord:{" "}
            <Link
              href="https://discord.gg/wardenprotocol"
              color="blue.500"
              isExternal
            >
              https://discord.gg/wardenprotocol
            </Link>
          </ListItem>
          <ListItem>
            X:{" "}
            <Link
              href="https://x.com/wardenprotocol"
              color="blue.500"
              isExternal
            >
              https://x.com/wardenprotocol
            </Link>
          </ListItem>
        </List>

        <Heading size="md" mt="8">
          NodesVault Support:
        </Heading>
        <List spacing={2} mt="2">
          <ListItem>
            RPC:{" "}
            <Link
              href="https://warden-testnet-rpc.nodesvault.com"
              color="blue.500"
              isExternal
            >
              https://warden-testnet-rpc.nodesvault.com
            </Link>
          </ListItem>
          <ListItem>
            API:{" "}
            <Link
              href="https://warden-testnet-rpc.nodesvault.com"
              color="blue.500"
              isExternal
            >
              https://warden-testnet-rpc.nodesvault.com
            </Link>
          </ListItem>
          <ListItem>
            gRPC:{" "}
            <Link
              href="https://warden.testnet.grpc.nodesvault.com"
              color="blue.500"
              isExternal
            >
              https://warden.testnet.grpc.nodesvault.com
            </Link>
          </ListItem>
          <ListItem>Snapshort: Daily</ListItem>
          <ListItem>State sync:</ListItem>
          <ListItem>
            Dashboard:{" "}
            <Link
              href="https://explorer.nodesvault.com/warden-testnet/"
              color="blue.500"
            >
              https://explorer.nodesvault.com/warden-testnet/
            </Link>
          </ListItem>
        </List>
      </Box>
      <Box boxSize={100} />
    </VStack>
  );
};
