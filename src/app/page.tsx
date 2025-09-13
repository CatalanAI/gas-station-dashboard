'use client';

import { useCards } from '@/hooks/useCards';
import Header from '@/components/Header';
import CardsGrid from '@/components/CardsGrid';

export default function Dashboard() {
  const { cards, loading } = useCards();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex-1 flex items-center justify-center p-10">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading cards...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <CardsGrid cards={cards} />
    </div>
  );
}
