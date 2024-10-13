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
  Image,
  VStack,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { FaGithub, FaTelegramPlane, FaTwitter } from "react-icons/fa";
const Footer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <VStack
      bg={useColorModeValue("white", "gray.800")}
      px={4}
      zIndex="1" // Ensures the header stays above content when scrolling
      width={"100%"}
      paddingTop={50}
    >
      <Text
        fontSize="3xl"
        fontWeight="bold"
        mb={4}
        width={"100%"}
        paddingLeft={5}
      >
        Frequently Asked Questions{" "}
      </Text>
      <Box
        bg={useColorModeValue("white", "gray.800")}
        px={4}
        shadow="md" // This adds a large shadow
        zIndex="1" // Ensures the header stays above content when scrolling
        width={"100%"}
      >
        <Text fontWeight="bold" fontSize="lg" padding={5}>
          About us
        </Text>
      </Box>

      <Box
        px={4}
        shadow="md" // This adds a large shadow
        zIndex="1" // Ensures the header stays above content when scrolling
        width={"100%"}
      >
        <Text fontWeight="bold" fontSize="lg" padding={5}>
          What is your security?
        </Text>
      </Box>

      <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
        <HStack>
          <Text fontWeight="bold" fontSize="lg" paddingRight={10}>
            © NodesVault Team. All rights reserved
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
          {/* <HStack as={"nav"} spacing={4} display={{ base: "none", md: "flex" }}>
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
          </HStack> */}

          {/* Social Icons */}
          <HStack spacing={4}>
            <IconButton
              as="a"
              //   href="https://twitter.com"
              aria-label="Twitter"
              icon={<FaTwitter />}
              size="md"
            />
            <IconButton
              as="a"
              //   href="https://telegram.org"
              aria-label="Telegram"
              icon={<FaTelegramPlane />}
              size="md"
            />
            <IconButton
              as="a"
              //   href="https://github.com"
              aria-label="Github"
              icon={<FaGithub />}
              size="md"
            />
          </HStack>
        </HStack>
      </Flex>

      {/* Mobile Menu */}
      {/* {isOpen ? (
        <Box pb={4} display={{ md: "none" }}>
          <Stack as={"nav"} spacing={4}>
            <Link href="#networks">Networks</Link>
            <Link href="#services">Services</Link>
            <Link href="#explorer">Explorer</Link>
            <Link href="#faq">FAQ</Link>
          </Stack>
        </Box>
      ) : null} */}
    </VStack>
  );
};

export default Footer;
