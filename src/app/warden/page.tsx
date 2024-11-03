"use client";
import { useState } from "react";
import { Box, Flex, VStack, Text, Heading, Code, IconButton,  useClipboard,
} from "@chakra-ui/react";
import Header from "../components/Header";
import { CopyIcon } from "@chakra-ui/icons";

const menuItems = [
  { id: 0, title: "Dashboard", icon: "💻" },
  { id: 1, title: "Installation", icon: "⚙️" },
  { id: 2, title: "Sync", icon: "🚀" },
  { id: 3, title: "Upgrade", icon: "⬆️" },
  { id: 4, title: "Command", icon: "💻" },
  { id: 5, title: "Slinky", icon: "🔧" },
];

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
export default function Menu() {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const handleSelect = (id: number) => {
    setSelectedId(id);
  };

  const SlinkyContent = () => {
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
  };


  const Command = () => {
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

  return (
    <div>
      <Header />
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

          {selectedId === 2 && (
            <p className="mt-4 text-center text-xl font-semibold text-gray-800">
              Test
            </p>
          )}

          {selectedId === 3 && (
            <p className="mt-4 text-center text-xl font-semibold text-gray-800">
              Test
            </p>
          )}

          {selectedId === 4 && (
            <Command />
          )}

          {selectedId === 5 && (
             <SlinkyContent />
          )}
        </Box>
      </Flex>
    </div>
  );


  // const WardenContent = () => {
  //   return (
  //     <VStack alignItems={"center"} maxW="100%" width={"100%"}>
  //       <Box maxW="1200px" mx="auto" mt="10">
  //         {/* Status Indicator and Title */}
  //         <Stack direction="row" align="center">
  //           <Icon as={CheckCircleIcon} boxSize={6} color="green.400" />
  //           <Heading size="lg">Warden Protocol</Heading>
  //         </Stack>
  
  //         {/* Subtitle */}
  //         <Text mt="2" fontSize="lg">
  //           Next-gen Modular L1 Blockchain Infrastructure for Omnichain
  //           Applications.
  //         </Text>
  //         {/* <Box mt="4">
  //           <Image
  //             src="/cosmos_bg.png"
  //             alt="Warden Protocol Banner"
  //             style={{ borderRadius: "8px" }}
  //           />
  //         </Box> */}
  
  //         {/* Hardware Minimum */}
  //         <Heading size="md" mt="8">
  //           Hardware minimum:
  //         </Heading>
  //         <List spacing={2} mt="2">
  //           <ListItem>• 4 core</ListItem>
  //           <ListItem>• 8 GB RAM</ListItem>
  //           <ListItem>• 80 GB SSD NVMe</ListItem>
  //           <ListItem>• Ubuntu 22 - x86 or arm</ListItem>
  //         </List>
  
  //         {/* Links */}
  //         <Heading size="md" mt="8">
  //           Links:
  //         </Heading>
  //         <List spacing={2} mt="2">
  //           <ListItem>
  //             Website:{" "}
  //             <Link href="https://wardenprotocol.org" color="blue.500" isExternal>
  //               https://wardenprotocol.org
  //             </Link>
  //           </ListItem>
  //           <ListItem>
  //             Telegram:{" "}
  //             <Link
  //               href="https://t.me/wardenprotocol"
  //               color="blue.500"
  //               isExternal
  //             >
  //               https://t.me/wardenprotocol
  //             </Link>
  //           </ListItem>
  //           <ListItem>
  //             Discord:{" "}
  //             <Link
  //               href="https://discord.gg/wardenprotocol"
  //               color="blue.500"
  //               isExternal
  //             >
  //               https://discord.gg/wardenprotocol
  //             </Link>
  //           </ListItem>
  //           <ListItem>
  //             X:{" "}
  //             <Link
  //               href="https://x.com/wardenprotocol"
  //               color="blue.500"
  //               isExternal
  //             >
  //               https://x.com/wardenprotocol
  //             </Link>
  //           </ListItem>
  //         </List>
  
  //         <Heading size="md" mt="8">
  //           NodesVault Support:
  //         </Heading>
  //         <List spacing={2} mt="2">
  //           <ListItem>
  //             RPC:{" "}
  //             <Link
  //               href="https://warden-testnet-rpc.nodesvault.com"
  //               color="blue.500"
  //               isExternal
  //             >
  //               https://warden-testnet-rpc.nodesvault.com
  //             </Link>
  //           </ListItem>
  //           <ListItem>
  //             API:{" "}
  //             <Link
  //               href="https://warden-testnet-rpc.nodesvault.com"
  //               color="blue.500"
  //               isExternal
  //             >
  //               https://warden-testnet-rpc.nodesvault.com
  //             </Link>
  //           </ListItem>
  //           <ListItem>
  //             gRPC:{" "}
  //             <Link
  //               href="https://warden.testnet.grpc.nodesvault.com"
  //               color="blue.500"
  //               isExternal
  //             >
  //               https://warden.testnet.grpc.nodesvault.com
  //             </Link>
  //           </ListItem>
  //           <ListItem>Snapshort: Daily</ListItem>
  //           <ListItem>State sync:</ListItem>
  //           <ListItem>
  //             Dashboard:{" "}
  //             <Link
  //               href="https://explorer.nodesvault.com/warden-testnet/"
  //               color="blue.500"
  //             >
  //               https://explorer.nodesvault.com/warden-testnet/
  //             </Link>
  //           </ListItem>
  //         </List>
  //       </Box>
  //       <Box boxSize={100} />
  //     </VStack>
  //   );
  // };
}
