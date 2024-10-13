import {
  Box,
  Flex,
  Text,
  IconButton,
  Stack,
  HStack,
  Link,
  useDisclosure,
  useColorModeValue,
  useColorMode,
  Image,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { FaGithub, FaTelegramPlane, FaTwitter } from "react-icons/fa";
const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === "dark";
  return (
    <Box
      bg={useColorModeValue("white", "gray.800")}
      px={4}
      shadow="md" // This adds a large shadow
      zIndex="1" // Ensures the header stays above content when scrolling
    >
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
        <HStack paddingLeft={20}>
          <Image
            src={
              "https://itrocket.net/_next/image/?url=%2Fmainnet%2Fzetachain.jpg&w=256&q=75"
            }
            alt="user profile picture"
            width={35}
            height={35}
          />
          <Text fontWeight="bold" fontSize="lg" color="#009688">
            NodesVault
          </Text>
        </HStack>

        {/* Hamburger menu for mobile */}
        <IconButton
          size={"md"}
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label={"Open Menu"}
          display={{ md: "none" }}
          onClick={isOpen ? onClose : onOpen}
        />

        {/* Desktop Menu */}
        <HStack spacing={8} alignItems={"center"}>
          <HStack as={"nav"} spacing={4} display={{ base: "none", md: "flex" }}>
            <Link href="#networks" fontWeight="medium">
              Networks
            </Link>
            <Link href="#services" fontWeight="medium">
              Services
            </Link>
            <Link href="#explorer" fontWeight="medium">
              Explorer
            </Link>
            <Link href="#faq" fontWeight="medium">
              FAQ
            </Link>
          </HStack>

          {/* Social Icons */}
          <HStack spacing={4}>
            <IconButton
              icon={isDark ? <SunIcon /> : <MoonIcon />}
              onClick={toggleColorMode}
              aria-label={""}
            />
          </HStack>
        </HStack>
      </Flex>

      {/* Mobile Menu */}
      {isOpen ? (
        <Box pb={4} display={{ md: "none" }}>
          <Stack as={"nav"} spacing={4}>
            <Link href="#networks">Networks</Link>
            <Link href="#services">Services</Link>
            <Link href="#explorer">Explorer</Link>
            <Link href="#faq">FAQ</Link>
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
};

export default Header;
