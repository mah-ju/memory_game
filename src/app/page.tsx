"use client";
import { Card } from "@/components/Card";
import { allCards } from "@/data/allCards";
import { useEffect, useState } from "react";

type Card = {
  id: number;
  image: string;
  isFlipped: boolean;
  alt: string;
};
const shuffleArray = (array: Card[]) => {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }

  return shuffledArray;
};

export default function Home() {
  const [cards, setCards] = useState(allCards);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedCards, setMatchedCards] = useState<number[]>([]);

  useEffect(() => {
    setCards(shuffleArray(allCards));
  }, []);

  const handleFlip = (id: number) => {
    if (flippedCards.length === 2 || matchedCards.includes(id)) return;

    setCards((prevCards) =>
      prevCards.map((card) =>
        card.id === id ? { ...card, isFlipped: true } : card
      )
    );

    setFlippedCards((prev) => [...prev, id]);

    if (flippedCards.length === 1) {
      const [firstCardId] = flippedCards;
      const firstCard = cards.find((card) => card.id === firstCardId);
      const secondCard = cards.find((card) => card.id === id);

      if (firstCard && secondCard && firstCard.image === secondCard.image) {
        setMatchedCards((prev) => [...prev, firstCardId, id]);

        if (matchedCards.length + 2 === cards.length) {
          setTimeout(() => {
            alert("Você ganhou!");
            setCards(shuffleArray(allCards));
            setFlippedCards([]);
            setMatchedCards([]);
          }, 500);
        }
      } else {
        setTimeout(() => {
          setCards((prevCards) =>
            prevCards.map((card) =>
              card.id === firstCardId || card.id === id
                ? { ...card, isFlipped: false }
                : card
            )
          );
        }, 1000);
      }

      setFlippedCards([]);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen px-5 md:px-3">
      <h1 className="text-white text-4xl md:text-5xl lg:text-6xl pb-5 font-extralight text-center">
        Jogo da memória
      </h1>
      <p className="text-white pb-2 text-sm">mahju.dev</p>
      <div className="bg grid grid-cols-4 gap-6 p-6 rounded-3xl">
        {cards.map((card) => (
          <Card
            key={card.id}
            id={card.id}
            image={card.image}
            isFlipped={card.isFlipped || matchedCards.includes(card.id)}
            handleFlip={handleFlip}
            alt={card.alt}
          />
        ))}
      </div>
    </div>
  );
}
