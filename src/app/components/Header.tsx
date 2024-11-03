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
import { useRouter } from 'next/navigation';
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === "dark";
  const router = useRouter()

  const handleSelect = (network: string) => {

  };

  return (
    <Box
      bg={useColorModeValue("white", "gray.800")}
      px={4}
      shadow="md"
      zIndex="1"
    >
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <HStack paddingLeft={20} spacing={3}>
          <Link href="/">
            <Image src="./logo.jpg" alt="NodesVault Logo" boxSize={8} />
          </Link>
          <Text fontWeight="bold" fontSize="lg" color="#009688">
            NodesVault
          </Text>
        </HStack>

        {/* Mobile Menu Button */}
        <IconButton
          size="md"
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label={isOpen ? "Close Menu" : "Open Menu"}
          display={{ md: "none" }}
          onClick={isOpen ? onClose : onOpen}
        />

        {/* Desktop Menu and Color Mode Toggle */}
        <HStack spacing={8} alignItems="center">
          <HStack as="nav" spacing={4} display={{ base: "none", md: "flex" }}>
            {["Networks", "Services", "Explorer", "FAQ"].map((item) => (
              <div key={item} onClick={() => handleSelect(item)}>
              <Link key={item}  fontWeight="medium">
                {item}
              </Link>
              </div>
            ))}
          </HStack>
          <IconButton
            icon={isDark ? <SunIcon /> : <MoonIcon />}
            onClick={toggleColorMode}
            aria-label="Toggle Color Mode"
          />
        </HStack>
      </Flex>

      {/* Mobile Menu */}
      {isOpen && (
        <Box pb={4} display={{ md: "none" }}>
          <Stack as="nav" spacing={4}>
            {["Networks", "Services", "Explorer", "FAQ"].map((item) => (
            <div key={item} onClick={() => handleSelect(item)}>
              <Link key={item}>
                {item}
              </Link>
              </div>
            ))}
          </Stack>
        </Box>
      )}
    </Box>
  );
};

export default Header