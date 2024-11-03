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
    width="1020px"
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
    console.log("Setting selectedId to 0"); // Debugging statement
    setSelectedId(0); // For example, set the default selected item to ID 0
  };

  // useEffect to call the function after a delay when the component loads
  useEffect(() => {
    console.log("Component mounted"); // Debugging statement
    const timer = setTimeout(() => {
      handleInitialSelect();
    }, 2000); // Delay of 1 second

    return () => clearTimeout(timer); // Cleanup on component unmount
  }, []);

  const Install = () => {
    const codeSnippets = [
      {
        title: "Set environment variables",
        code: `
        NODE_NAME="my_node"
        GO_VERSION=1.23.1
        IP=$(curl -s -4 icanhazip.com)
        HEIGHT=$(curl -s https://api.test.kopi.money/snapshots/height?chain=kopi-test-4)
        SEED_NODE="985c12efafd3f1b36b4e827799022e55bf0dfa07@135.181.149.122:26656"
            `,
      },
      {
        title: "Install requirements",
        code: `
        rm -rf /usr/local/go
        wget -q https://go.dev/dl/go\${GO_VERSION}.linux-amd64.tar.gz
        tar -C /usr/local -xzf go\${GO_VERSION}.linux-amd64.tar.gz >/dev/null
        export PATH=$PATH:/usr/local/go/bin:/root/go/bin
        apt-get -qq update >/dev/null
        NEEDRESTART_MODE=a apt-get -qq install make gcc lz4 snapd -y
            `,
      },
      {
        title: "Cloning Kopi repository and installing it locally",
        code: `
        git clone --quiet --depth 1 --branch v0.5.1\"
            https://github.com/kopi-money/kopi.git \${HOME}/kopi
        cd \${HOME}/kopi
        make install
            `,
      },

      {
        title: "Downloading genesis and adjusting config files",
        code: `
        IP=$(curl -4 icanhazip.com)
        \${HOME}/go/bin/kopid init "\${NODE_NAME}" --chain-id kopi-test-4
        wget -q https://data.kopi.money/genesis-test-4.json \
            -O ~/.kopid/config/genesis.json
        sed -i -e "s/external_address = \"\"/external_address = \"\${IP}:26656\"/g" \
            ~/.kopid/config/config.toml
        sed -i -e "s/seeds = \"\"/seeds = \"\${SEED_NODE}\"/g" \
            ~/.kopid/config/config.toml
        sed -i -e 's/timeout_propose = "3s"/timeout_propose = "1s"/g' \
            ~/.kopid/config/config.toml
        sed -i -e 's/timeout_commit = "5s"/timeout_commit = "1s"/g' \
            ~/.kopid/config/config.toml
        sed -i -e 's/minimum-gas-prices = ""/minimum-gas-prices = "0ukopi"/g' \
            ~/.kopid/config/app.toml
            `,
      },

      {
        title:
          "Installing system service - create a file called kopid.service with the below input:",
        code: `
        echo "[Unit]
        Description=Kopi Daemon
        After=network.target
        [Service]
        Type=simple
        User=root
        ExecStart=\${HOME}/go/bin/kopid start --home=\${HOME}/.kopid
        Restart=always
        RestartSec=3s
        LimitNOFILE=65535
        [Install]
        WantedBy=multi-user.target" >> kopid.service

        sudo mv kopid.service /etc/systemd/system/kopid.service

        sudo systemctl daemon-reload
        sudo systemctl enable kopid
        sudo systemctl start kopid

            `,
      },

      {
        title:
          "You can now monitor your node by using the following command command:",
        code: `
        journalctl -f -u kopid.service --output cat
            `,
      },

      {
        title: "The following command executes all the shown commands at once:",
        code: `
        curl -s https://data.kopi.money/install-test.sh | sh
            `,
      },

      {
        title:
          "If you need to restart the Node for whatever reason you can run the following command:",
        code: `
        sudo systemctl restart kopid && journalctl -f -u kopid.service --output cat  
            `,
      },

      {
        title: "To stop your Node, simply run:",
        code: `
        sudo systemctl stop kopid
            `,
      },

      {
        title: "Run your own validator:",
        code: `
            {
        "pubkey": {
            "@type":"/cosmos.crypto.ed25519.PubKey",
            "key":"<replace with value from:priv_validator_key.json>"
        },
        "amount": "1000000ukopi",
        "moniker": "Wiv-Sugar",
        "details": "Wiv-Sugar",
        "commission-rate": "0.1",
        "commission-max-rate": "0.2",
        "commission-max-change-rate": "0.01",
        "min-self-delegation": "1"
        }
            `,
      },

      {
        title: "Then create your validator by passing the created text file:",
        code: `
kopid tx staking create-validator validator.json \
  --from key \
  --keyring-backend file \
  --chain-id kopi-test-4
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
              <CodeBox  code={code} onCopy={onCopy} hasCopied={hasCopied} />
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
            <Heading size="lg">Kopi Protocol</Heading>
          </Stack>

          {/* Subtitle */}
          <Text mt="2" fontSize="lg">
            Kopi is the latest project in DeFi and offers a decentralized
            exchange as well as its own supply managed coins (kCoins)
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
        </Box>
      </VStack>
    );
  };

  return (
    <div>
      <Header />
      <Flex width="100%">
        {/* Content Area */}
        <Box flex="1" p="20px">
          <WardenContent />
          <Install />
        </Box>
      </Flex>
    </div>
  );
}
