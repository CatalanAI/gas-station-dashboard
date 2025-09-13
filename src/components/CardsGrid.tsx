'use client';

import { useEffect, useState } from 'react';
import AppleFitnessCard from './AppleFitnessCard';
import { CardData } from '@/types/card';

interface CardsGridProps {
  cards: CardData[];
}

export default function CardsGrid({ cards }: CardsGridProps) {
  return (
    <div className="flex-1 flex items-center justify-center p-10 bg-gray-50">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl">
        {cards.map((card) => (
          <AppleFitnessCard
            key={card.id}
            data={card}
          />
        ))}
      </div>
    </div>
  );
}