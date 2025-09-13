'use client';

import { CardData } from '@/types/card';

interface AppleFitnessCardProps {
  data: CardData;
}

export default function AppleFitnessCard({ data }: AppleFitnessCardProps) {

  return (
    <div
      className="relative w-52 h-60 rounded-3xl overflow-hidden border border-white/30"
      style={{ backgroundColor: data.backgroundColor }}
    >
      {/* Icon Container */}
      <div
        className="absolute top-5 left-5 w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-sm"
        style={{ backgroundColor: data.iconBackgroundColor }}
      >
        <span className="text-base opacity-90">{data.icon}</span>
      </div>

      {/* Card Content */}
      <div className="absolute inset-5 text-black">
        {/* Value - Top Right */}
        <div
          className="absolute top-2 right-0 text-[52px] font-extrabold leading-[0.85]"
          style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif' }}
        >
          {data.value}
        </div>

        {/* Label - Bottom Left */}
        <div
          className="absolute bottom-12 left-0 text-base font-bold leading-tight"
          style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif' }}
          dangerouslySetInnerHTML={{ __html: data.label }}
        />

        {/* Progress Container */}
        <div className="absolute bottom-8 left-0 right-0">
          <div className="relative w-full h-1 bg-black/20 rounded-sm overflow-hidden">
            <div
              className="h-full rounded-sm"
              style={{
                background: data.progressGradient,
                width: `${data.percentage}%`
              }}
            />
          </div>
        </div>

        {/* Percentage - Bottom Right */}
        <div
          className="absolute bottom-4 right-0 text-sm font-bold"
          style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif' }}
        >
          {data.percentage}%
        </div>
      </div>
    </div>
  );
}