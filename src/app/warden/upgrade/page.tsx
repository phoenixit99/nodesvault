// pages/index.tsx
"use client";
import {
  Box,
  Text,
  Link,
  Flex,
  VStack,
  Code,
  IconButton,
  useClipboard,
  Heading,
} from "@chakra-ui/react";
import { CopyIcon } from "@chakra-ui/icons";
import Header from "../../components/Header";


interface CodeBoxProps {
  code: string;
  onCopy: () => void;
  hasCopied: boolean;
}
const CodeBox: React.FC<CodeBoxProps> = ({ code, onCopy, hasCopied }) => (
  <Box
    position="relative"
    width="100%"
    p={4}
    border="1px solid"
    borderColor="gray.200"
    borderRadius="md"
  >
    <Code display="block" whiteSpace="pre-wrap">
      {code}
    </Code>
    <IconButton
      aria-label="Copy code"
      icon={<CopyIcon />}
      size="sm"
      onClick={onCopy}
      position="absolute"
      top="8px"
      right="8px"
      variant="outline"
      borderRadius="full"
    />
    {hasCopied && <Text color="green.500">Copied to clipboard!</Text>}
  </Box>
);
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
  export default function Wardenpage() {
    return (
      <>
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
          <Upgrade />
        </Box>
      </Flex>
    </>
  );
}
function Upgrade() {
  const codeSnippets = [
    {
      title: "Upgrade for amd64:",
      code: `
          cd $HOME
          wget https://github.com/warden-protocol/wardenprotocol/releases/download/v0.5.2/wardend_Linux_x86_64.zip
          unzip wardend_Linux_x86_64.zip
          rm wardend_Linux_x86_64.zip
          chmod +x ~/wardend
          sudo mv ~/wardend /usr/local/bin
          sudo systemctl restart wardend && sudo journalctl -u wardend -f -o cat
        `,
    },
    {
      title: "Upgrade for arm64:",
      code: `
          cd $HOME
          wget https://github.com/warden-protocol/wardenprotocol/releases/download/v0.5.2/wardend_Linux_arm64.zip
          unzip wardend_Linux_arm64.zip
          rm wardend_Linux_arm64.zip
          chmod +x ~/wardend
          sudo mv ~/wardend /usr/local/bin
          sudo systemctl restart wardend && sudo journalctl -u wardend -f -o cat
        `,
    },
  ];

  return (
    <Flex direction="column" align="start" maxW="1200px" p={4} gap={6}>
              <Heading size="lg">Upgrade</Heading>

      <Text fontSize="1xl">Chain: chiado_10010-1</Text>
      <Text fontSize="1xl">Version: 0.5.2</Text>
      <Text fontSize="1xl">Download Binary Warden Protocol:</Text>

      {codeSnippets.map(({ title, code }, index) => {
        const { hasCopied, onCopy } = useClipboard(code);
        return (
          <>
            <Text fontSize="lg" fontWeight="bold">
              {title}
            </Text>
            <CodeBox code={code} onCopy={onCopy} hasCopied={hasCopied} />
          </>
        );
      })}
    </Flex>
  );
}
