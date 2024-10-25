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
          <Command />
        </Box>
      </Flex>
    </>
  );
}

function Command() {
  const codeSnippets = [
    {
      title: "Wallet Commands:",
      code: `
          // Add New Wallet
          wardend keys add wallet

          // Restore executing wallet
          wardend keys add wallet --recover

          // List All Wallets
          wardend keys list

          // Delete wallet
          wardend keys delete wallet

          // Check Balance
          wardend q bank balances $(wardend keys show wallet -a)

          // Show validator
          wardend tendermint show-validator

          // Show EVM address
          wardend keys unsafe-export-eth-key

          // Backup
          Seed + priv_validator_key.json
        `,
    },
    {
      title: "Validator Commands:",
      code: `
          // Create Validator
          wardend comet show-validator

          # Example validator info
          {
              "pubkey": {"@type":"/cosmos.crypto.secp256k1.PubKey","key":"A7JSLhhRRXl3/Cfyi1kDQXBsp8yA5Z2BOIPQQ6JzXy7K"},
              "amount": "1000000uward",
              "moniker": "Validator name",
              "identity": "123123123-KEYBASE",
              "website": "Link Website",
              "security": "Contact(Email;X;Telegram)",
              "details": "details validator",
              "commission-rate": "0.1",
              "commission-max-rate": "0.2",
              "commission-max-change-rate": "0.01",
              "min-self-delegation": "1"
          }

          # Create the validator transaction
          wardend tx staking create-validator $HOME/validator.json \
          --from=wallet \
          --chain-id=chiado_10010-1 \
          --fees=500uward

          // Delegate your Validator
          wardend tx staking delegate $(wardend keys show wallet --bech val -a) 1000000uward \
              --from=wallet \
              --chain-id=chiado_10010-1 \
              --fees=500uward

          // Withdraw rewards and commission
          wardend tx distribution withdraw-rewards $(wardend keys show wallet --bech val -a) \
          --from wallet \
          --commission \
          --chain-id=chiado_10010-1 \
          --fees=500uward

          // Unjail
          wardend tx slashing unjail --from wallet --chain-id chiado_10010-1 --fees=500uward -y
        `,
    },
    {
      title: "Service Management Commands:",
      code: `
          # Reload Service
          sudo systemctl daemon-reload

          # Enable Service
          sudo systemctl enable wardend

          # Disable Service
          sudo systemctl disable wardend

          # Start Service
          sudo systemctl start wardend

          # Stop Service
          sudo systemctl stop wardend

          # Restart Service
          sudo systemctl restart wardend

          # Check Service Status
          sudo systemctl status wardend

          # Check Service Logs
          sudo journalctl -u wardend -f --no-hostname -o cat
        `,
    },
  ];

  return (
    <Flex direction="column" align="start" maxW="1200px" p={4} gap={6}>
      <Heading size="lg">Command</Heading>

      {codeSnippets.map(({ title, code }, index) => {
        const { hasCopied, onCopy } = useClipboard(code);
        return (
          <>
            <Text fontSize="1xl" fontWeight="bold">
              {title}
            </Text>
            <CodeBox code={code} onCopy={onCopy} hasCopied={hasCopied} />
          </>
        );
      })}
    </Flex>
  );
}
