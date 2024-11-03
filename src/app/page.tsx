// app/page.tsx
"use client";
import { Button, VStack } from "@chakra-ui/react";
import Header from "./components/Header";

import {
  Box,
  Grid,
  Tab,
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
  Text,
  Stack,
} from "@chakra-ui/react";
import NetworkCard from "./components/NetworkCard";
import Footer from "./components/Footer";
import TopView from "./components/TopView";
import { FaGithub, FaTelegramPlane, FaTwitter } from "react-icons/fa";
import HorizontalCardList from "./components/HorizontalCardList";

// Define the interface for a network object
interface Network {
  name: string;
  apy: string;
  logo: string;
}
const networks: Network[] = [
  {
    name: "Warden",
    apy: "soon",
    logo: "https://itrocket.net/_next/image/?url=%2Ftestnet%2Fwarden.png&w=96&q=75",
  },
  {
    name: "Crossfi",
    apy: "soon",
    logo: "https://itrocket.net/_next/image/?url=%2Fmainnet%2Fcrossfi.jpg&w=256&q=75",
  },
  {
    name: "Doravota",
    apy: "~10%",
    logo: "https://itrocket.net/_next/image/?url=%2Fmainnet%2Fdoravota.jpg&w=256&q=75",
  },
  {
    name: "Empower",
    apy: "~70%",
    logo: "https://itrocket.net/_next/image/?url=%2Fmainnet%2Fempower.png&w=256&q=75",
  },
  {
    name: "Forta",
    apy: "soon",
    logo: "https://itrocket.net/_next/image/?url=%2Fmainnet%2Fforta.jpg&w=256&q=75",
  },
  {
    name: "Humans",
    apy: "~41%",
    logo: "https://itrocket.net/_next/image/?url=%2Fmainnet%2Fhumans.jpg&w=256&q=75",
  },
  {
    name: "Lava",
    apy: "soon",
    logo: "https://itrocket.net/_next/image/?url=%2Fmainnet%2Flava.jpg&w=256&q=75",
  },
];
export default function Page() {
  // const router = useRouter()

  // const handleSelect = (network: string) => {
  //   if (network === 'Kopi') {
  //     router.push('/kopi');
  //   } else {
  //     router.push('/warden');
  //   }
  // };
  return (
    <div>
      <Header />
      <VStack
        paddingTop={100}
        alignItems="center"
        textAlign="center"
        align="center"
        justify="center"
      >
        <Box className="flex flex-col items-center justify-center h-screen bg-white">
          <Text fontSize="8xl" fontWeight="extrabold">
            NodesVault
          </Text>

          <Box>
            <Text fontSize="5xl" fontWeight="bold">
              Professional{" "}
              <Box
                as="span"
                bgGradient="linear(to-l, #7928CA, #FF0080)"
                bgClip="text"
                fontSize="6xl"
                fontWeight="extrabold"
              >
                validators
              </Box>
              , optimized for maximum{" "}
              <Box
                as="span"
                bgGradient="linear(to-l, #7928CA, #FF0080)"
                bgClip="text"
                fontSize="6xl"
                fontWeight="extrabold"
              >
                security
              </Box>
            </Text>
          </Box>

          <Text fontSize="lg" mt={4} textAlign="center" w="100%" px={300}>
            At NodesVault, we pride ourselves on being a professional validator
            with an experienced and passionate team. Looking ahead, we aim to
            establish NodesVault as a key player in blockchain projects. Our
            commitment to high stability and 24/7 monitoring ensures that users
            can trust in the reliability and security we offer.
          </Text>

          <Box
            h="200px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            gap={4}
          >
            <Stack direction="row" spacing={4}>
              <Button
                leftIcon={<FaTwitter />}
                colorScheme="teal"
                variant="outline"
              >
                Twitter
              </Button>
              <Button
                leftIcon={<FaTelegramPlane />}
                colorScheme="teal"
                variant="outline"
              >
                Telegram
              </Button>
              <Button
                leftIcon={<FaGithub />}
                colorScheme="teal"
                variant="outline"
              >
                Github
              </Button>
            </Stack>
          </Box>
        </Box>

        <HorizontalCardList />

        <Box p={8} w="100%">
          <Text fontSize="4xl" fontWeight="bold" mb={4} textAlign="left">
            Networks
          </Text>
          <Tabs colorScheme="teal">
            <TabList>
              <Tab>All Active</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Grid
                  templateColumns="repeat(auto-fill, minmax(300px, 1fr))"
                  gap={6}
                >
                  {/* {networks.map((network, index) => (
                    // <NetworkCard key={index} network={network} />
                  ))} */}
                </Grid>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </VStack>
      <TopView />
      <Footer />
    </div>
  );
}
