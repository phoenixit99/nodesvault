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
import { useRouter } from "next/navigation";

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
    const router = useRouter();

  return (
    <>
      <Header />
      <Flex width="100%">
        <Box width="250px" padding="20px" borderRight="1px solid teal">
          <VStack align="start" spacing={6}>
            {menuItems.map((item) => (
              <Link key={item.id} style={{ textDecoration: "none" }}
              
              onClick={() => {

                if (item.id == 0) {
                  router.push('/warden')
                }
                else if (item.id == 1) {
                  router.push('/warden/install')
                }
                else if (item.id == 2) {
                  router.push('/warden/sync')
                }
                else if (item.id == 3) {
                  router.push('/warden/upgrade')
                } else if ( item.id == 4) {
                  router.push('/warden/command')
                } else {
                  router.push('/warden/slinky')
                }
               }}
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

// function Command() {
//   const codeSnippets = [
//     {
//       title: "Wallet Commands:",
//       code: `
//           // Add New Wallet
//           wardend keys add wallet

//           // Restore executing wallet
//           wardend keys add wallet --recover

//           // List All Wallets
//           wardend keys list

//           // Delete wallet
//           wardend keys delete wallet

//           // Check Balance
//           wardend q bank balances $(wardend keys show wallet -a)

//           // Show validator
//           wardend tendermint show-validator

//           // Show EVM address
//           wardend keys unsafe-export-eth-key

//           // Backup
//           Seed + priv_validator_key.json
//         `,
//     },
//     {
//       title: "Validator Commands:",
//       code: `
//           // Create Validator
//           wardend comet show-validator

//           # Example validator info
//           {
//               "pubkey": {"@type":"/cosmos.crypto.secp256k1.PubKey","key":"A7JSLhhRRXl3/Cfyi1kDQXBsp8yA5Z2BOIPQQ6JzXy7K"},
//               "amount": "1000000uward",
//               "moniker": "Validator name",
//               "identity": "123123123-KEYBASE",
//               "website": "Link Website",
//               "security": "Contact(Email;X;Telegram)",
//               "details": "details validator",
//               "commission-rate": "0.1",
//               "commission-max-rate": "0.2",
//               "commission-max-change-rate": "0.01",
//               "min-self-delegation": "1"
//           }

//           # Create the validator transaction
//           wardend tx staking create-validator $HOME/validator.json \
//           --from=wallet \
//           --chain-id=chiado_10010-1 \
//           --fees=500uward

//           // Delegate your Validator
//           wardend tx staking delegate $(wardend keys show wallet --bech val -a) 1000000uward \
//               --from=wallet \
//               --chain-id=chiado_10010-1 \
//               --fees=500uward

//           // Withdraw rewards and commission
//           wardend tx distribution withdraw-rewards $(wardend keys show wallet --bech val -a) \
//           --from wallet \
//           --commission \
//           --chain-id=chiado_10010-1 \
//           --fees=500uward

//           // Unjail
//           wardend tx slashing unjail --from wallet --chain-id chiado_10010-1 --fees=500uward -y
//         `,
//     },
//     {
//       title: "Service Management Commands:",
//       code: `
//           # Reload Service
//           sudo systemctl daemon-reload

//           # Enable Service
//           sudo systemctl enable wardend

//           # Disable Service
//           sudo systemctl disable wardend

//           # Start Service
//           sudo systemctl start wardend

//           # Stop Service
//           sudo systemctl stop wardend

//           # Restart Service
//           sudo systemctl restart wardend

//           # Check Service Status
//           sudo systemctl status wardend

//           # Check Service Logs
//           sudo journalctl -u wardend -f --no-hostname -o cat
//         `,
//     },
//   ];

//   return (
//     <Flex direction="column" align="start" maxW="1200px" p={4} gap={6}>
//       {codeSnippets.map(({ title, code }, index) => {
//         const { hasCopied, onCopy } = useClipboard(code);
//         return (
//           <>
//             <Text fontSize="1xl" fontWeight="bold">
//               {title}
//             </Text>
//             <CodeBox code={code} onCopy={onCopy} hasCopied={hasCopied} />
//           </>
//         );
//       })}
//     </Flex>
//   );
// }
// function TwoCopyableBoxesSlind() {
//   const codeSnippets = [
//     {
//       title: "Download Binary Slinky:",
//       code: `
//           cd $HOME
//           rm -rf connect
//           git clone https://github.com/skip-mev/connect.git
//           cd connect
//           git checkout v1.0.5
//           make install
//           slinky version
//         `,
//     },
//     {
//       title: "Create a Service for Slinky:",
//       code: `
//           SLINKY_PORT=$(grep 'address = ' "$HOME/.warden/config/app.toml" | awk -F: '{print $NF}' | grep '90"$' | tr -d '"')
//           echo $SLINKY_PORT

//           tee /etc/systemd/system/slinky.service > /dev/null <<EOF
//           [Unit]
//           Description=Slinky Oracle Warden
//           After=network-online.target

//           [Service]
//           User=$USER
//           ExecStart=$(which slinky) --market-map-endpoint="127.0.0.1:$SLINKY_PORT"
//           Restart=on-failure
//           RestartSec=3
//           LimitNOFILE=65535

//           [Install]
//           WantedBy=multi-user.target
//           EOF
//         `,
//     },
//     {
//       title: "Manage Slinky Service:",
//       code: `
//           systemctl daemon-reload
//           systemctl enable slinky
//           systemctl restart slinky && journalctl -u slinky -f -o cat
//         `,
//     },
//   ];

//   return (
//     <Flex direction="column" align="start" maxW="1200px" p={4} gap={6}>
//       {codeSnippets.map(({ title, code }, index) => {
//         const { hasCopied, onCopy } = useClipboard(code);
//         return (
//           <>
//             <Text fontSize="1xl" fontWeight="bold">
//               {title}
//             </Text>
//             <CodeBox code={code} onCopy={onCopy} hasCopied={hasCopied} />
//           </>
//         );
//       })}
//     </Flex>
//   );
// }
