import { useState } from "react";
import Link from "next/link";
import { Box, Flex, VStack, Text } from "@chakra-ui/react";

const menuItems = [
  { id: 0, title: "Dashboard", icon: "💻", href: "/wardenprotocol" },
  { id: 1, title: "Installation", icon: "⚙️", href: "/wardenprotocol/install" },
  { id: 2, title: "Sync", icon: "🚀", href: "/wardenprotocol/sync" },
  { id: 3, title: "Upgrade", icon: "⬆️", href: "/wardenprotocol/upgrade" },
  { id: 4, title: "Command", icon: "💻", href: "/wardenprotocol/command" },
  { id: 5, title: "Slinky", icon: "🔧", href: "/wardenprotocol/slinky" },
];

export default function Menu() {
  const [selectedId, setSelectedId] = useState(null); // Initialize selectedId state

  const handleSelect = (id) => {
    setSelectedId(id);
  };

  return (
    <div>
      <Flex width="100%">
        <Box width="250px" padding="20px">
          <VStack align="start" spacing={6}>
            {menuItems.map((item) => (
              <Link href={item.href} key={item.id} passHref>
                <Box
                  as="div" // Use div instead of a tag
                  onClick={() => handleSelect(item.id)}
                  cursor="pointer"
                  p={2}
                  borderRadius="md"
                  _hover={{ bg: "blue.200", color: "white" }}
                  bg={selectedId === item.id ? "blue.500" : "transparent"} // Show selected background color
                  color={selectedId === item.id ? "white" : "black"} // Show selected text color
                  style={{ textDecoration: "none" }}
                >
                  <Flex align="center">
                    <Text fontSize="lg">{item.icon}</Text>
                    <Text ml={3} fontSize="md">
                      {item.title}
                    </Text>
                  </Flex>
                </Box>
              </Link>
            ))}
          </VStack>
        </Box>
        
        {/* Content Area */}
        <Box flex="1" p="20px">
          {selectedId === 0 && (
            <p className="mt-4 text-center text-xl font-semibold text-gray-800">
              Hello
            </p>
          )}
          {selectedId === 1 && (
            <p className="mt-4 text-center text-xl font-semibold text-gray-800">
              Test
            </p>
          )}
        </Box>
      </Flex>
    </div>
  );
}