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
  // copy the value to state here
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
          <Sync />
        </Box>
      </Flex>
    </>
  );
}
function Sync() {
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

