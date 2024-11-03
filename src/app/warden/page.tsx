"use client";
import { useEffect, useState } from "react";
import {
  Box,
  Flex,
  VStack,
  Text,
  Heading,
  Code,
  IconButton,
  useClipboard,
  Stack,
  Icon,
  List,
  ListItem,
  Link,
} from "@chakra-ui/react";
import Header from "../components/Header";
import { CheckCircleIcon, CopyIcon } from "@chakra-ui/icons";

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
  // Function to be called after a delay
  const handleInitialSelect = () => {
    setSelectedId(0); // For example, set the default selected item to ID 0
  };

  // useEffect to call the function after a delay when the component loads
  useEffect(() => {
    const timer = setTimeout(() => {
      handleInitialSelect();
    }, 1000); // Delay of 1 second

    return () => clearTimeout(timer); // Cleanup on component unmount
  }, []);

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
  };

  const Upgrade = () => {
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
            <div key={index}>
              <Text fontSize="lg" fontWeight="bold">
                {title}
              </Text>
              <CodeBox code={code} onCopy={onCopy} hasCopied={hasCopied} />
            </div>
          );
        })}
      </Flex>
    );
  };

  const Sync = () => {
    const codeSnippets = [
      {
        title: "Download Genesis & addressbook:",
        code: `
            wget -O $HOME/.warden/config/genesis.json https://file.node39.top/testnet/warden/genesis.json
            wget -O $HOME/.warden/config/addrbook.json https://file.node39.top/testnet/warden/addrbook.json
          `,
      },
      {
        title: "Download Wasm:",
        code: `
            rm -rf $HOME/.warden/data $HOME/.warden/wasm
            curl https://file.node39.top/testnet/warden/wasm-warden.tar.lz4 | lz4 -dc - | tar -xf - -C $HOME/.warden
          `,
      },
      {
        title: "Download snapshot: Height 6915",
        code: `
            sudo systemctl stop wardend
            mv $HOME/.warden/data/priv_validator_state.json $HOME/.warden/priv_validator_state.json.backup
            rm -rf $HOME/.warden/data $HOME/.warden/wasm
            curl https://file.node39.top/testnet/warden/snapshot-warden-6915.tar.lz4 | lz4 -dc - | tar -xf - -C $HOME/.warden
            mv $HOME/.warden/priv_validator_state.json.backup $HOME/.warden/data/priv_validator_state.json
            sudo systemctl restart wardend && sudo journalctl -u wardend -f --no-hostname -o cat
          `,
      },
      {
        title: "State sync:",
        code: `
            sudo systemctl stop wardend
            cp $HOME/.warden/data/priv_validator_state.json $HOME/.warden/priv_validator_state.json
            wardend tendermint unsafe-reset-all --home $HOME/.warden
            SNAP_RPC="https://warden-testnet-rpc.node39.top:443"
            LATEST_HEIGHT=$(curl -s $SNAP_RPC/block | jq -r .result.block.header.height);
            BLOCK_HEIGHT=$((LATEST_HEIGHT - 2000));
            TRUST_HASH=$(curl -s "$SNAP_RPC/block?height=$BLOCK_HEIGHT" | jq -r .result.block_id.hash)
            echo $LATEST_HEIGHT $BLOCK_HEIGHT $TRUST_HASH && sleep 2
            sed -i.bak -E "s|^(enable[[:space:]]+=[[:space:]]+).*$|\x01true| ;
            s|^(rpc_servers[[:space:]]+=[[:space:]]+).*$|\x01\"$SNAP_RPC,$SNAP_RPC\"| ;
            s|^(trust_height[[:space:]]+=[[:space:]]+).*$|\x01$BLOCK_HEIGHT| ;
            s|^(trust_hash[[:space:]]+=[[:space:]]+).*$|\x01\"$TRUST_HASH\"| ;
            s|^(seeds[[:space:]]+=[[:space:]]+).*$|\x01\"\"|" $HOME/.warden/config/config.toml
            mv $HOME/.warden/priv_validator_state.json $HOME/.warden/data/priv_validator_state.json
            sudo systemctl restart wardend && sudo journalctl -u wardend -f --no-hostname -o cat
          `,
      },
    ];

    return (
      <Flex direction="column" align="start" maxW="1200px" p={4} gap={6}>
        <Heading size="lg">Sync</Heading>

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

  const Install = () => {
    const codeSnippets = [
      {
        title: "Install dependencies:",
        code: `
      sudo apt update && sudo apt upgrade -y
      sudo apt install curl git wget htop tmux build-essential jq make lz4 gcc unzip -y
            `,
      },
      {
        title: "Install GO: (amd64 - x86)",
        code: `
      rm -rf $HOME/go
      sudo rm -rf /usr/local/go
      cd $HOME
      curl https://dl.google.com/go/go1.23.1.linux-amd64.tar.gz | sudo tar -C/usr/local -zxvf -
      cat <<'EOF' >>$HOME/.profile
      export GOROOT=/usr/local/go
      export GOPATH=$HOME/go
      export GO111MODULE=on
      export PATH=$PATH:/usr/local/go/bin:$HOME/go/bin
      EOF
      source $HOME/.profile
      go version
  
            `,
      },
      {
        title: "Install GO: (arm64)",
        code: `
      rm -rf $HOME/go
      sudo rm -rf /usr/local/go
      cd $HOME
      curl https://dl.google.com/go/go1.23.1.linux-arm64.tar.gz | sudo tar -C/usr/local -zxvf -
      cat <<'EOF' >>$HOME/.profile
      export GOROOT=/usr/local/go
      export GOPATH=$HOME/go
      export GO111MODULE=on
      export PATH=$PATH:/usr/local/go/bin:$HOME/go/bin
      EOF
      source $HOME/.profile
      go version
  
            `,
      },
      {
        title: "Download Binary Warden Protocol:",
        code: `
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
  
            `,
      },

      {
        title: "Set chain: (Change <Change-Name> )",
        code: `
      wardend init <Change-Name> --chain-id chiado_10010-1
            `,
      },

      {
        title: "Set min gas: ",
        code: `
      sed -i 's/minimum-gas-prices = ""/minimum-gas-prices = "250000000000000award"/' $HOME/.warden/config/app.toml
            `,
      },

      {
        title: "Set indexing: (Option) ",
        code: `
      sed -i -e "s/^indexer *=.*/indexer = \"null\"/" $HOME/.warden/config/config.toml
            `,
      },

      {
        title: "Download Genesis & addressbook:",
        code: `
      wget -O $HOME/.warden/config/genesis.json https://file.node39.top/testnet/warden/genesis.json
      wget -O $HOME/.warden/config/addrbook.json https://file.node39.top/testnet/warden/addrbook.json
            `,
      },

      {
        title: "Peers:",
        code: `
      PEERS="fd6cf9438cfafe4a1fc35bb20456a856328febaa@37.27.47.29:39656,35c8779026ceb17659b722b6a768e5a7f070c770@84.247.161.158:31656,86fe149f801ac75213179be5b56fbd1a1e545c43@202.61.225.157:20656"
      sed -i -e "s/^seeds *=.*/seeds = \"$SEEDS\"/; s/^persistent_peers *=.*/persistent_peers = \"$PEERS\"/" $HOME/.cardchaind/config/config.toml
  
            `,
      },

      {
        title: "Create Service:",
        code: `
      sudo tee /etc/systemd/system/wardend.service > /dev/null <<EOF
  
      [Unit]
      Description=Warden Protocol
      After=network-online.target
  
      [Service]
      User=root
      ExecStart=$(which wardend) start
      Restart=always
      RestartSec=3
      LimitNOFILE=65535
  
      [Install]
      WantedBy=multi-user.target
      EOF
  
      sudo systemctl daemon-reload
      sudo systemctl enable wardend
  
            `,
      },

      {
        title: "Wallet:",
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
        title: "Check sync: (False -> Done)",
        code: `
      wardend status 2>&1 | jq .SyncInfo.catching_up
            `,
      },
    ];

    return (
      <Flex direction="column" align="start" maxW="1200px" p={4} gap={6}>
        <Heading size="lg">Install</Heading>

        {codeSnippets.map(({ title, code }) => {
          const { hasCopied, onCopy } = useClipboard(code);
          return (
            <div key={title}>
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

  const WardenContent = () => {
    return (
      <VStack alignItems={"center"} maxW="100%" width={"100%"}>
        <Box maxW="1200px" mx="auto" mt="10">
          {/* Status Indicator and Title */}
          <Stack direction="row" align="center">
            <Icon as={CheckCircleIcon} boxSize={6} color="green.400" />
            <Heading size="lg">Warden Protocol</Heading>
          </Stack>

          {/* Subtitle */}
          <Text mt="2" fontSize="lg">
            Next-gen Modular L1 Blockchain Infrastructure for Omnichain
            Applications.
          </Text>
          {/* <Box mt="4">
          <Image
            src="/cosmos_bg.png"
            alt="Warden Protocol Banner"
            style={{ borderRadius: "8px" }}
          />
        </Box> */}

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
      </VStack>
    );
  };

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
          {selectedId === 0 && <WardenContent />}
          {selectedId === 1 && <Install />}

          {selectedId === 2 && <Sync />}

          {selectedId === 3 && <Upgrade />}

          {selectedId === 4 && <Command />}

          {selectedId === 5 && <SlinkyContent />}
          {selectedId !== 0 &&
            selectedId !== 1 &&
            selectedId !== 2 &&
            selectedId !== 3 &&
            selectedId !== 4 &&
            selectedId !== 5 && <WardenContent />}
        </Box>
      </Flex>
    </div>
  );
}
