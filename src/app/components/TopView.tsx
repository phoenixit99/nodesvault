// components/Statistics.tsx
import {
  SimpleGrid,
  Text,
  VStack,
  Image,
  useColorMode,
} from "@chakra-ui/react";

const stats = [
  { label: "$107B+", description: "All network" },
  { label: "72K+", description: "Mainnet" },
  { label: "33M+", description: "Testnet" },
  { label: "200+", description: "Defi Integrations" },
];

const TopView = () => {
  const { colorMode } = useColorMode();
  const isDark = colorMode === "dark";
  return (
    <VStack spacing={4}>
      <SimpleGrid
        columns={{ base: 1, md: 4 }}
        spacing={8}
        py={10}
        bg="white.50"
        textAlign="center"
      >
        {stats.map((stat, index) => (
          <VStack key={index}>
            <Text fontSize="2xl" fontWeight="bold">
              {stat.label}
            </Text>
            <Text color="gray.500">{stat.description}</Text>
          </VStack>
        ))}
      </SimpleGrid>
      <Image
        src={
          isDark
            ? "https://makerkit.dev/_next/image?url=%2Fassets%2Fimages%2Fdashboard-dark.webp&w=3840&q=75"
            : "https://makerkit.dev/_next/image?url=%2Fassets%2Fimages%2Fdashboard-light.webp&w=1920&q=75"
        }
        alt={"network.name"}
        maxWidth={"100%"}
        paddingLeft={200}
        paddingRight={200}
      />
    </VStack>
  );
};

export default TopView;
