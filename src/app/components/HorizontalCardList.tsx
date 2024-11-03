import { Box, Flex, Text, Icon, VStack, useColorMode } from "@chakra-ui/react";
import { ElementType, useState } from "react";
import {
  FaNetworkWired,
  FaSearch,
  FaServicestack,
  FaSitemap,
} from "react-icons/fa";

// Define the types for the props
interface CardProps {
  title: string;
  icon: unknown;
  isSelected: boolean;
  onSelect: () => void; // Function type for onSelect, no arguments and no return value
}

const cardData = [
  {
    id: 0,
    title: "Networks",
    icon: FaNetworkWired,
  },
  {
    id: 1,
    title: "Services",
    icon: FaServicestack,
  },
  {
    id: 2,
    title: "Explorer",
    icon: FaSearch,
  },
  {
    id: 3,
    title: "IBC",
    icon: FaSitemap,
  },
];

const HorizontalCardList = () => {
  const [selectedCard, setSelectedCard] = useState<number | null>(null);

  return (
    <div>
      <Text fontSize="4xl" fontWeight="bold" mb={4} textAlign="left">
        Key Features
      </Text>
      <Flex justify="center" gap={6} p={8}>
        {cardData.map((card) => (
          <Card
            key={card.id}
            title={card.title}
            icon={card.icon}
            isSelected={card.id === selectedCard}
            onSelect={() => setSelectedCard(card.id)}
          />
        ))}
      </Flex>
    </div>
  );
};

const Card = ({ title, icon, isSelected, onSelect }: CardProps) => {
  const { colorMode } = useColorMode();
  const isDark = colorMode === "dark";

  const bgColor = isSelected ? "teal.500" : isDark ? "gray.700" : "white";
  const textColor = isSelected ? "white" : isDark ? "white" : "black";
  const iconColor = isSelected ? "white" : "teal.500";

  return (
    <Box
      onClick={onSelect}
      bg={bgColor}
      color={textColor}
      borderRadius="md"
      p={4}
      width="200px"
      height="150px"
      cursor="pointer"
      boxShadow="lg"
      _hover={{ boxShadow: "xl" }}
      transition="background-color 0.3s"
    >
      <VStack align="center">
        <Icon as={icon as ElementType} boxSize={12} color={iconColor} />
        <Text fontSize="lg" fontWeight="bold" textAlign="center">
          {title}
        </Text>
      </VStack>
    </Box>
  );
};

export default HorizontalCardList;
