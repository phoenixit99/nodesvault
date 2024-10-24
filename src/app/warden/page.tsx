// pages/index.tsx
"use client";
import {
  Box,
  Heading,
  Text,
  List,
  ListItem,
  Link,
  Icon,
  Stack,
  Flex,
  VStack,
  Code,
  IconButton,
  useClipboard,
} from "@chakra-ui/react";
import { CheckCircleIcon, CopyIcon } from "@chakra-ui/icons";
import Header from "../components/Header";
import { useState } from "react";

const menuItems = [
  { id: -1, title: "Daskboard", icon: "💻" },
  { id: 0, title: "Installation", icon: "⚙️" },
  { id: 1, title: "Sync", icon: "🚀" },
  { id: 2, title: "Upgrade", icon: "⬆️" },
  { id: 3, title: "Command", icon: "💻" },
  { id: 4, title: "Slinky", icon: "🔧" },
];

export default function Home() {
    const codeToCopy = `
    sudo apt update && sudo apt upgrade -y
    sudo apt install curl git wget htop tmux build-essential jq make lz4 gcc unzip -y
  `;

  const [selectedItem, setSelectedItem] = useState(menuItems[0]);
  const { hasCopied, onCopy } = useClipboard(codeToCopy);

  return (
    <>
      <Header />
      <Flex width="100%">
        <Box width="250px" padding="20px" borderRight="1px solid teal">
          <VStack align="start" spacing={6}>
            {menuItems.map((item) => (
              <Link
                key={item.id}
                onClick={() => setSelectedItem(item)}
                style={{ textDecoration: "none" }}
              >
                <Flex
                  align="center"
                  cursor="pointer"
                  bg={selectedItem.id === item.id ? "blue.500" : "transparent"}
                  color={selectedItem.id === item.id ? "white" : "black"}
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

        {/* Right Side Content */}
        <Box flex="1" p="20px">
          <Text fontSize="3xl" fontWeight="bold">
            {selectedItem.title}
          </Text>
          <Box mt="10">
            {selectedItem.id == -1 && (
              <>
                <Box maxW="800px" mx="auto" mt="10">
                  <Stack direction="row" align="center">
                    <Icon as={CheckCircleIcon} boxSize={6} color="green.400" />
                    <Heading size="lg">Warden Protocol</Heading>
                  </Stack>

                  {/* Subtitle */}
                  <Text mt="2" fontSize="lg">
                    Next-gen Modular L1 Blockchain Infrastructure for Omnichain
                    Applications.
                  </Text>

                  {/* Banner Image */}
                  <Box mt="4">
                    <img
                      src="/cosmos_bg.png"
                      alt="Warden Protocol Banner"
                      style={{ borderRadius: "8px" }}
                    />
                  </Box>

                  {/* Hardware Minimum */}
                  <Heading size="md" mt="8">
                    Hardware minimum:
                  </Heading>
                  <List spacing={2} mt="2">
                    <ListItem>• 4 core</ListItem>
                    <ListItem>• 8 GB RAM</ListItem>
                    <ListItem>• 80 GB SSD NVMe</ListItem>
                    <ListItem>• Ubuntu 22 - x86 or arm</ListItem>
                  </List>

                  {/* Links */}
                  <Heading size="md" mt="8">
                    Links:
                  </Heading>
                  <List spacing={2} mt="2">
                    <ListItem>
                      Website:{" "}
                      <Link
                        href="https://wardenprotocol.org"
                        color="blue.500"
                        isExternal
                      >
                        https://wardenprotocol.org
                      </Link>
                    </ListItem>
                    <ListItem>
                      Telegram:{" "}
                      <Link
                        href="https://t.me/wardenprotocol"
                        color="blue.500"
                        isExternal
                      >
                        https://t.me/wardenprotocol
                      </Link>
                    </ListItem>
                    <ListItem>
                      Discord:{" "}
                      <Link
                        href="https://discord.gg/wardenprotocol"
                        color="blue.500"
                        isExternal
                      >
                        https://discord.gg/wardenprotocol
                      </Link>
                    </ListItem>
                    <ListItem>
                      X:{" "}
                      <Link
                        href="https://x.com/wardenprotocol"
                        color="blue.500"
                        isExternal
                      >
                        https://x.com/wardenprotocol
                      </Link>
                    </ListItem>
                  </List>

                  <Heading size="md" mt="8">
                    NodesVault Support:
                  </Heading>
                  <List spacing={2} mt="2">
                    <ListItem>
                      RPC:{" "}
                      <Link
                        href="https://warden-testnet-rpc.nodesvault.com"
                        color="blue.500"
                        isExternal
                      >
                        https://warden-testnet-rpc.nodesvault.com
                      </Link>
                    </ListItem>
                    <ListItem>
                      API:{" "}
                      <Link
                        href="https://warden-testnet-rpc.nodesvault.com"
                        color="blue.500"
                        isExternal
                      >
                        https://warden-testnet-rpc.nodesvault.com
                      </Link>
                    </ListItem>
                    <ListItem>
                      gRPC:{" "}
                      <Link
                        href="https://warden.testnet.grpc.nodesvault.com"
                        color="blue.500"
                        isExternal
                      >
                        https://warden.testnet.grpc.nodesvault.com
                      </Link>
                    </ListItem>
                    <ListItem>Snapshort: Daily</ListItem>
                    <ListItem>State sync:</ListItem>
                    <ListItem>
                      Dashboard:{" "}
                      <Link
                        href="https://explorer.nodesvault.com/warden-testnet/"
                        color="blue.500"
                      >
                        https://explorer.nodesvault.com/warden-testnet/
                      </Link>
                    </ListItem>
                  </List>
                </Box>
                <Box boxSize={100} />
              </>
            )}
            {selectedItem.id === 0 && (
              <Text>
                Install dependencies:
                <pre>
                  sudo apt update && sudo apt upgrade -y sudo apt install curl
                  git wget htop tmux build-essential jq make lz4 gcc unzip -y
                </pre>
              </Text>
            )}
            {selectedItem.id === 1 && <Text>Sync Instructions...</Text>}
            {selectedItem.id === 2 && <Upgrade/>}
            {selectedItem.id === 3 && <Command/>}
            {selectedItem.id === 4 &&
              <TwoCopyableBoxesSlind/>}
          </Box>
        </Box>
      </Flex>
    </>
  );
}

export function Upgrade() {
    const codeBox1 = `
        // amd64
        cd $HOME
        wget https://github.com/warden-protocol/wardenprotocol/releases/download/v0.5.2/wardend_Linux_x86_64.zip
        unzip wardend_Linux_x86_64.zip
        rm wardend_Linux_x86_64.zip
        chmod +x ~/wardend
        sudo mv ~/wardend /usr/local/bin
        sudo systemctl restart wardend && sudo journalctl -u wardend -f -o cat

        //arm64
        cd $HOME
        wget https://github.com/warden-protocol/wardenprotocol/releases/download/v0.5.2/wardend_Linux_arm64.zip
        unzip wardend_Linux_arm64.zip
        rm wardend_Linux_arm64.zip
        chmod +x ~/wardend
        sudo mv ~/wardend /usr/local/bin
        sudo systemctl restart wardend && sudo journalctl -u wardend -f -o cat
    `;
    
    const { hasCopied: hasCopied1, onCopy: onCopy1 } = useClipboard(codeBox1);

    return (
      <Flex direction="column" align="start" maxW="1200px" p={4} gap={6}>
        <Text fontSize="1xl" mb={4}>Wallet</Text>
  
        {/* First Copyable Box */}
        <Box position="relative" width="100%" p={4} border="1px solid" borderColor="gray.200" borderRadius="md">
          <Code display="block" whiteSpace="pre-wrap">
            {codeBox1}
          </Code>
          <IconButton
            aria-label="Copy code 1"
            icon={<CopyIcon />}
            size="sm"
            onClick={onCopy1}
            position="absolute"
            top="8px"
            right="8px"
            variant="outline"
            borderRadius="full"
          />
        </Box>
        {hasCopied1 && <Text color="green.500">Copied to clipboard!</Text>}
  
      </Flex>
    );
  }

export function Command() {
    const codeBox1 = `
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
    `;
    
    const codeBox2 = `
        // Create Validator

        wardend comet show-validator

        # EX: pubkey: '{"@type":"/cosmos.crypto.secp256k1.PubKey","key":"A7JSLhhRRXl3/Cfyi1kDQXBsp8yA5Z2BOIPQQ6JzXy7K"}' type: local Change info
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

        #and

        wardend tx staking create-validator $HOME/validator.json \
        --from=wallet \
        --chain-id=chiado_10010-1 \
        --fees=500uward

        // Delegate you Validator (Change token 1ward = 1000000uward)

        wardend tx staking delegate $(wardend keys show wallet --bech val -a)  1000000uward \
            --from=wallet \
            --chain-id=chiado_10010-1 \
            --fees=500uward
        // Withdraw rewards and commission from your validator

        wardend tx distribution withdraw-rewards $(wardend keys show wallet --bech val -a) \
        --from wallet \
        --commission \
        --chain-id=chiado_10010-1 \
        --fees=500uward

        //Unjail

        wardend tx slashing unjail --from wallet --chain-id chiado_10010-1 --fees=500uward -y
    `;
  
    const codeBox3 = `
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
    `;
    // Hook to handle clipboard copying for both boxes
    const { hasCopied: hasCopied1, onCopy: onCopy1 } = useClipboard(codeBox1);
    const { hasCopied: hasCopied2, onCopy: onCopy2 } = useClipboard(codeBox2);
    const { hasCopied: hasCopied3, onCopy: onCopy3 } = useClipboard(codeBox3);

    return (
      <Flex direction="column" align="start" maxW="1200px" p={4} gap={6}>
        <Text fontSize="1xl" mb={4}>Wallet</Text>
  
        {/* First Copyable Box */}
        <Box position="relative" width="100%" p={4} border="1px solid" borderColor="gray.200" borderRadius="md">
          <Code display="block" whiteSpace="pre-wrap">
            {codeBox1}
          </Code>
          <IconButton
            aria-label="Copy code 1"
            icon={<CopyIcon />}
            size="sm"
            onClick={onCopy1}
            position="absolute"
            top="8px"
            right="8px"
            variant="outline"
            borderRadius="full"
          />
        </Box>
        {hasCopied1 && <Text color="green.500">Copied to clipboard!</Text>}
  
        {/* Second Copyable Box */}
        <Text fontSize="1xl" mb={4}>Validator:</Text>

        <Box position="relative" width="100%" p={4} border="1px solid" borderColor="gray.200" borderRadius="md">
          <Code display="block" whiteSpace="pre-wrap">
            {codeBox2}
          </Code>
          <IconButton
            aria-label="Copy code 2"
            icon={<CopyIcon />}
            size="sm"
            onClick={onCopy2}
            position="absolute"
            top="8px"
            right="8px"
            variant="outline"
            borderRadius="full"
          />
        </Box>
        {hasCopied2 && <Text color="green.500">Copied to clipboard!</Text>}

        <Text fontSize="1xl" mb={4}>Command:</Text>

        <Box position="relative" width="100%" p={4} border="1px solid" borderColor="gray.200" borderRadius="md">
          <Code display="block" whiteSpace="pre-wrap">
            {codeBox3}
          </Code>
          <IconButton
            aria-label="Copy code 2"
            icon={<CopyIcon />}
            size="sm"
            onClick={onCopy3}
            position="absolute"
            top="8px"
            right="8px"
            variant="outline"
            borderRadius="full"
          />
        </Box>
        {hasCopied3 && <Text color="green.500">Copied to clipboard!</Text>}
      </Flex>
    );
  }

export function TwoCopyableBoxesSlind() {
    const codeBox1 = `
    cd $HOME
    rm -rf connect
    git clone https://github.com/skip-mev/connect.git
    cd connect
    git checkout v1.0.5
    make install
    slinky version
    `;
    
    const codeBox2 = `
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
    `;
  
    const codeBox3 = `
        systemctl daemon-reload
        systemctl enable slinky
        systemctl restart slinky && journalctl -u slinky -f -o cat
    `;
    // Hook to handle clipboard copying for both boxes
    const { hasCopied: hasCopied1, onCopy: onCopy1 } = useClipboard(codeBox1);
    const { hasCopied: hasCopied2, onCopy: onCopy2 } = useClipboard(codeBox2);
    const { hasCopied: hasCopied3, onCopy: onCopy3 } = useClipboard(codeBox3);

    return (
      <Flex direction="column" align="start" maxW="1200px" p={4} gap={6}>
        <Text fontSize="1xl" mb={4}>Download Binary Slinky:</Text>
  
        {/* First Copyable Box */}
        <Box position="relative" width="100%" p={4} border="1px solid" borderColor="gray.200" borderRadius="md">
          <Code display="block" whiteSpace="pre-wrap">
            {codeBox1}
          </Code>
          <IconButton
            aria-label="Copy code 1"
            icon={<CopyIcon />}
            size="sm"
            onClick={onCopy1}
            position="absolute"
            top="8px"
            right="8px"
            variant="outline"
            borderRadius="full"
          />
        </Box>
        {hasCopied1 && <Text color="green.500">Copied to clipboard!</Text>}
  
        {/* Second Copyable Box */}
        <Text fontSize="1xl" mb={4}>Create a service Slinky:</Text>

        <Box position="relative" width="100%" p={4} border="1px solid" borderColor="gray.200" borderRadius="md">
          <Code display="block" whiteSpace="pre-wrap">
            {codeBox2}
          </Code>
          <IconButton
            aria-label="Copy code 2"
            icon={<CopyIcon />}
            size="sm"
            onClick={onCopy2}
            position="absolute"
            top="8px"
            right="8px"
            variant="outline"
            borderRadius="full"
          />
        </Box>
        {hasCopied2 && <Text color="green.500">Copied to clipboard!</Text>}

        <Box position="relative" width="100%" p={4} border="1px solid" borderColor="gray.200" borderRadius="md">
          <Code display="block" whiteSpace="pre-wrap">
            {codeBox3}
          </Code>
          <IconButton
            aria-label="Copy code 2"
            icon={<CopyIcon />}
            size="sm"
            onClick={onCopy3}
            position="absolute"
            top="8px"
            right="8px"
            variant="outline"
            borderRadius="full"
          />
        </Box>
        {hasCopied3 && <Text color="green.500">Copied to clipboard!</Text>}
      </Flex>
    );
  }