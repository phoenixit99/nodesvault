import {
  Box,
  Flex,
  Text,
  VStack,
  useColorModeValue,
  Image,
} from "@chakra-ui/react";
import { useState } from "react";

const cardData = [
  {
    id: 0,
    title: "Networks",
    description:
      "https://raw.githubusercontent.com/Loopple/loopple-public-assets/main/logos/supabase-logo.png",
  },
  {
    id: 1,
    title: "Services",
    description:
      "https://itrocket.net/_next/image/?url=%2Ftestnet%2Ftaiko.jpg&w=256&q=75",
  },
  {
    id: 2,
    title: "Explorer",
    description:
      "https://itrocket.net/_next/image/?url=%2Ftestnet%2Fzenrock.png&w=256&q=75",
  },
  {
    id: 3,
    title: "IBC",
    description:
      "https://itrocket.net/_next/image/?url=%2Ftestnet%2Fswisstronic.jpg&w=256&q=75",
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
            description={card.description}
            isSelected={card.id === selectedCard}
            onSelect={() => handleCardSelect(card.id)}
          />
        ))}
      </Flex>
    </>
  );
};

const Card = ({ title, description, isSelected, onSelect }) => {
  const bgColor = isSelected
    ? "teal.500"
    : useColorModeValue("white.100", "white.700");
  const textColor = isSelected ? "white" : useColorModeValue("black", "white");

  return (
    <>
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
          <Image
            src={description}
            alt={"network.name"}
            borderRadius="full"
            boxSize="80px"
          />

          <Text fontSize="lg" textAlign={"center"} fontWeight="bold">
            {title}
          </Text>
        </VStack>
      </Box>
    </>
  );
};

export default HorizontalCardList;
