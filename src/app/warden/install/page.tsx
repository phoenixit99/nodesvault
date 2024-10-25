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
import { useRouter } from 'next/navigation';

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
          <Install />
        </Box>
      </Flex>
    </>
  );
}
function Install() {
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
