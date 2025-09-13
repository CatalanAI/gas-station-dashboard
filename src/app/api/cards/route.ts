import { NextResponse } from 'next/server';
import { CardData } from '@/types/card';

const cardData: CardData[] = [
  {
    id: 'active-calories-card',
    type: 'active-calories',
    value: 494,
    label: 'Active<br>Calories',
    icon: '🔥',
    percentage: 73,
    backgroundColor: '#f2dbe1',
    iconBackgroundColor: 'rgba(255, 0, 0, 0.2)',
    progressGradient: 'linear-gradient(90deg, #cc0000, #ff6666)'
  },
  {
    id: 'exercise-minutes-card',
    type: 'exercise-minutes',
    value: '23m',
    label: 'Exercise<br>Minutes',
    icon: '⚡',
    percentage: 26,
    backgroundColor: '#d4f1d4',
    iconBackgroundColor: 'rgba(0, 255, 0, 0.2)',
    progressGradient: 'linear-gradient(90deg, #009900, #66ff66)'
  },
  {
    id: 'stand-hours-card',
    type: 'stand-hours',
    value: 17,
    label: 'Stand<br>Hours',
    icon: '🚶',
    percentage: 85,
    backgroundColor: '#d4e6f1',
    iconBackgroundColor: 'rgba(0, 0, 255, 0.2)',
    progressGradient: 'linear-gradient(90deg, #0066cc, #66b3ff)'
  }
];

export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      data: cardData,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch cards',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}