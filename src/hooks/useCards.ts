'use client';

import { useState, useEffect } from 'react';
import { CardData, ApiResponse } from '@/types/card';

export function useCards() {
  const [cards, setCards] = useState<CardData[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCards = async () => {
    setLoading(true);

    const response = await fetch('/api/cards');
    const result: ApiResponse<CardData[]> = await response.json();

    setCards(result.data);
    setLoading(false);
  };


  useEffect(() => {
    fetchCards();
  }, []);

  return {
    cards,
    loading
  };
}