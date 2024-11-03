"use client";

import { Box, Flex, Link, VStack,Text } from "@chakra-ui/react";
import Header from "../components/Header";
interface MenuItem {
    id: number; // Unique identifier
    title: string; // Title of the menu item
    icon: string; // Icon representation (could also be a React element if needed)
    href: string;
  }
  const menuItems: MenuItem[] = [
    { id: 0, title: "Daskboard", icon: "💻", href: "/warden"  },
    { id: 1, title: "Installation", icon: "⚙️" , href: "/warden/install" },
    { id: 2, title: "Sync", icon: "🚀" , href: "/warden/sync" },
    { id: 3, title: "Upgrade", icon: "⬆️", href: "/warden/upgrade"  },
    { id: 4, title: "Command", icon: "💻", href: "/warden/command"  },
    { id: 5, title: "Slinky", icon: "🔧" , href: "/warden/slinky" },
  ];
export default function AboutUsPage() {
  return (
    <div>
      <Header />
      <Flex width="100%">
        <Box width="250px" padding="20px">
          <VStack align="start" spacing={6}>
            {menuItems.map((item) => (
              <Link key={item.id}
              style={{ textDecoration: "none" }}
             href={item.href}
              >
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
     
        </Box>
      </Flex>
    </div>
  );
}
