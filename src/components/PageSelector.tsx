'use client';

import { useState } from 'react';

interface PageSelectorProps {
  onPageChange?: (page: string) => void;
}

export default function PageSelector({ onPageChange }: PageSelectorProps) {
  const [activePage, setActivePage] = useState('Overall');

  const pages = ['Overall', 'Station', 'Region'];

  const handlePageClick = (page: string) => {
    setActivePage(page);
    onPageChange?.(page);
  };

  return (
    <div className="flex items-center justify-center">
      <div className="flex bg-gray-100 rounded-lg p-1 gap-1">
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => handlePageClick(page)}
            style={{
              padding: '12px 48px',
              fontSize: '16px',
              fontWeight: '500',
              borderRadius: '6px',
              transition: 'all 0.2s',
              backgroundColor: activePage === page ? '#000000' : 'transparent',
              color: activePage === page ? '#ffffff' : '#6b7280',
              border: 'none',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              if (activePage !== page) {
                e.currentTarget.style.color = '#111827';
              }
            }}
            onMouseLeave={(e) => {
              if (activePage !== page) {
                e.currentTarget.style.color = '#6b7280';
              }
            }}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
}