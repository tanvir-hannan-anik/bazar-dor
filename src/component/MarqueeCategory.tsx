import React from 'react';
import MarqueeText from 'react-marquee-text';

interface MarqueeCategory{
    id:number
    change:{
        dir: string
        pct: number
    }
    image: string
    categoryIcon: string
    nameBn: string
    today:number
    unit: string


}

const MarqueeCategoryPage = async () => {
  const res = await fetch('https://openapi.programming-hero.com/api/bazardor/products');

  if (!res.ok) {
    throw new Error('Failed to fetch product prices');
  }

  const data:MarqueeCategory[] = await res.json();

  return (
    <div className="container mx-auto overflow-hidden border-y border-green-100 bg-white shadow-sm">
      <div className="flex items-center">
        <div className="z-10 flex shrink-0 items-center gap-2 bg-green-800 px-4 py-3 text-sm font-bold text-white shadow-md sm:px-5">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-300 opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-green-300"></span>
          </span>
          বাজার দর
        </div>

        <div className="min-w-0 flex-1 py-3">
          <MarqueeText
          direction='right'
          duration={10}>
            {data.map((n) => {
              const isUp = n.change?.dir === 'up';
              const isDown = n.change?.dir === 'down';

              return (
                <div
                  key={n.id}
                  className="mx-4 inline-flex items-center gap-2 whitespace-nowrap border-r border-gray-200 pr-6 text-sm"
                >
                  <span className="text-lg">{n.image || n.categoryIcon}</span>

                  <span className="font-medium text-gray-700">
                    {n.nameBn}
                  </span>

                  <span className="font-bold text-gray-900">
                    ৳{n.today}
                  </span>

                  <span className="text-xs text-gray-500">
                    / {n.unit === 'kg' ? 'কেজি' : n.unit}
                  </span>

                  <span
                    className={`inline-flex items-center gap-1 rounded-md px-1.5 py-1 text-xs font-bold ${
                      isUp
                        ? 'bg-red-50 text-red-600'
                        : isDown
                          ? 'bg-green-50 text-green-700'
                          : 'bg-gray-100 text-gray-500'
                    }`}
                  >
                    {isUp ? '▲' : isDown ? '▼' : '—'}
                    {n.change?.pct ?? 0}%
                  </span>
                </div>
              );
            })}
          </MarqueeText>
        </div>
      </div>
    </div>
  );
};

export default MarqueeCategoryPage;