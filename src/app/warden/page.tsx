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
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";
import Header from "../components/Header";
import { useState } from "react";
interface MenuItem {
    id: number; // Unique identifier
    title: string; // Title of the menu item
    icon: string; // Icon representation (could also be a React element if needed)
  }
  interface CodeBoxProps {
      code: string;
      onCopy: () => void;
      hasCopied: boolean;
    }
  const menuItems: MenuItem[] = [
    { id: 0, title: "Daskboard", icon: "💻" },
    { id: 1, title: "Installation", icon: "⚙️" },
    { id: 2, title: "Sync", icon: "🚀" },
    { id: 3, title: "Upgrade", icon: "⬆️" },
    { id: 4, title: "Command", icon: "💻" },
    { id: 5, title: "Slinky", icon: "🔧" },
  ];
    interface ContentPanelProps {
      selectedItem: MenuItem;
    }
export default function Home() {
  const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(
    null
  );
const handleCardSelect = (id: number) => {
    setSelectedItemIndex(id);
};
  return (
    <>
      <Header />
       <Flex width="100%">
        <Tabs
          variant="enclosed"
          onChange={(index) => handleCardSelect(index)}
        >
          <TabList>
            {menuItems.map((item, ) => (
              <Tab key={item.id}>
                <Text>
                  {item.icon} {item.title}
                </Text>
              </Tab>
            ))}
          </TabList>
          {/* <TabPanels>
            {menuItems.map((item, index) => (
              <TabPanel key={item.id}>
                {selectedItemIndex === index && (
                  <ContentPanel selectedItem={item} />
                )}
              </TabPanel>
            ))}
          </TabPanels> */}
        </Tabs>
      </Flex> 
    </>
  );
}
const ContentPanel: React.FC<ContentPanelProps> = ({ selectedItem }) => {
    return (
    <Box p="20px">
      <Text fontSize="3xl" fontWeight="bold">
        {selectedItem.title}
      </Text>
      {/* {selectedItem.id === 0 && <WardenContent />}
      {selectedItem.id === 1 && <WardenContent />}
      {selectedItem.id === 2 && <WardenContent />}
      {selectedItem.id === 3 && <WardenContent />}
      {selectedItem.id === 4 && <WardenContent />} */}
      {/* {selectedItem.id === 5 && <WardenContent />} */}
      <WardenContent />
    </Box>
  );
}
const WardenContent = () => {
  return (
    <>
      <Box maxW="800px" mx="auto" mt="10">
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

        {/* Banner Image */}
        <Box mt="4">
          <img
            src="/cosmos_bg.png"
            alt="Warden Protocol Banner"
            style={{ borderRadius: "8px" }}
          />
        </Box>

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
    </>
  );
};
