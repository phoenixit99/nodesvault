'use client'
import { useState } from "react";
import { Box, Flex, VStack, Text } from "@chakra-ui/react";

const menuItems = [
  { id: 0, title: "Dashboard", icon: "💻" },
  { id: 1, title: "Installation", icon: "⚙️" },
  { id: 2, title: "Sync", icon: "🚀" },
  { id: 3, title: "Upgrade", icon: "⬆️" },
  { id: 4, title: "Command", icon: "💻" },
  { id: 5, title: "Slinky", icon: "🔧" },
];

export default function Menu() {
  const [selectedId, setSelectedId] = useState(null);

  const handleSelect = (id) => {
    setSelectedId(id);
  };

  return (
    <div>
      <Flex width="100%">
        <Box width="250px" padding="20px">
          <VStack align="start" spacing={6}>
            {menuItems.map((item) => (
              <Box
                key={item.id}
                onClick={() => handleSelect(item.id)}
                cursor="pointer"
                p={2}
                borderRadius="md"
                _hover={{ bg: "blue.200", color: "white" }}
                bg={selectedId === item.id ? "blue.500" : "transparent"} // Show selected background color
                color={selectedId === item.id ? "white" : "black"} // Show selected text color
              >
                <Flex align="center">
                  <Text fontSize="lg">{item.icon}</Text>
                  <Text ml={3} fontSize="md">
                    {item.title}
                  </Text>
                </Flex>
              </Box>
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
          {/* Add more conditional content here based on selectedId */}
        </Box>
      </Flex>
    </div>
  );
}