import {
  Box,
  Flex,
  Text,
  Icon,
} from "@chakra-ui/react";
import { ElementType, useState } from "react";
import { FaNetworkWired, FaSearch, FaServicestack, FaSitemap } from "react-icons/fa";

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

  const handleCardSelect = (id: number) => {
    setSelectedCard(id);
  };

  return (
    <>
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
            onSelect={() => handleCardSelect(card.id)}
          />
        ))}
      </Flex>
    </>
  );
};
const Card = ({ title, icon }: CardProps) => {
  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="lg"
      p="4"
      maxW="sm"
      textAlign="center"
    >
      <Icon as={icon as ElementType}  boxSize={12} color="teal.500" />
      <Text mt="4" fontSize="xl" fontWeight="bold">
        {title}
      </Text>
    </Box>
  );
};


export default HorizontalCardList;
