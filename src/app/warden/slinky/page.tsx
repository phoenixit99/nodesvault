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

interface MenuItem {
  id: number; // Unique identifier
  title: string; // Title of the menu item
  icon: string; // Icon representation (could also be a React element if needed)
  href: string;
}
const menuItems: MenuItem[] = [
  { id: 0, title: "Daskboard", icon: "💻", href: "/wardenprotocol"  },
  { id: 1, title: "Installation", icon: "⚙️" , href: "/wardenprotocol/install" },
  { id: 2, title: "Sync", icon: "🚀" , href: "/wardenprotocol/sync" },
  { id: 3, title: "Upgrade", icon: "⬆️", href: "/wardenprotocol/upgrade"  },
  { id: 4, title: "Command", icon: "💻", href: "/wardenprotocol/command"  },
  { id: 5, title: "Slinky", icon: "🔧" , href: "/wardenprotocol/slinky" },
];

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
  export default function Wardenpage() {
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
          <SlinkyContent />
        </Box>
      </Flex>
    </div>
  );
}


function SlinkyContent() {
  const codeSnippets = [
    {
      title: "Download Binary Slinky:",
      code: `
          cd $HOME
          rm -rf connect
          git clone https://github.com/skip-mev/connect.git
          cd connect
          git checkout v1.0.5
          make install
          slinky version
        `,
    },
    {
      title: "Create a Service for Slinky:",
      code: `
          SLINKY_PORT=$(grep 'address = ' "$HOME/.warden/config/app.toml" | awk -F: '{print $NF}' | grep '90"$' | tr -d '"')
          echo $SLINKY_PORT

          tee /etc/systemd/system/slinky.service > /dev/null <<EOF
          [Unit]
          Description=Slinky Oracle Warden
          After=network-online.target

          [Service]
          User=$USER
          ExecStart=$(which slinky) --market-map-endpoint="127.0.0.1:$SLINKY_PORT"
          Restart=on-failure
          RestartSec=3
          LimitNOFILE=65535

          [Install]
          WantedBy=multi-user.target
          EOF
        `,
    },
    {
      title: "Manage Slinky Service:",
      code: `
          systemctl daemon-reload
          systemctl enable slinky
          systemctl restart slinky && journalctl -u slinky -f -o cat
        `,
    },
  ];

  return (
    <Flex direction="column" align="start" maxW="1200px" p={4} gap={6}>
       <Heading size="lg">Slinky</Heading>
      {codeSnippets.map(({ title, code }, index) => {
        const { hasCopied, onCopy } = useClipboard(code);
        return (
          <div key={index}>
            <Text fontSize="1xl" fontWeight="bold">
              {title}
            </Text>
            <CodeBox code={code} onCopy={onCopy} hasCopied={hasCopied} />
          </div>
        );
      })}
    </Flex>
  );
}