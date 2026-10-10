import React from 'react';
interface ProductCard{
    id:number
    change:{
        dir: string
        pct: number
    }
    image: string
    categoryIcon: string
    nameBn: string
    today:number
    yesterday:number
    unit: string
}
const ProductPriceCard = ({ p }:{p:ProductCard}) => {
  const difference = p.today - p.yesterday;
  const isUp = difference > 0;
  const isDown = difference < 0;

  return (
    <div className="rounded-xl border border-[#DCE8DE] bg-[#F8FBF8] p-3 transition hover:border-green-300 hover:shadow-sm">
      <div className="flex items-center gap-2.5">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EDF3ED] text-xl">
          {p.image || p.categoryIcon}
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="truncate text-sm font-semibold text-gray-800">
            {p.nameBn}
          </h3>

          <p className="mt-0.5 text-[11px] text-gray-500">
            প্রতি {p.unit === 'kg' ? 'কেজি' : p.unit}
          </p>
        </div>
      </div>

      <div className="mt-2.5 flex items-end justify-between gap-2">
        <div>
          <p className="text-[10px] text-gray-500">
            আজকের দাম
          </p>

          <p className="mt-0.5 text-sm font-extrabold leading-none text-gray-900">
            ৳{p.today}
            <span className="ml-1 text-[10px] font-medium text-gray-500">
              টাকা
            </span>
          </p>
        </div>

        <div
          className={`rounded-full px-2 py-1 text-[10px] font-bold ${
            isUp
              ? 'bg-red-50 text-red-600'
              : isDown
                ? 'bg-green-50 text-green-700'
                : 'bg-gray-100 text-gray-500'
          }`}
        >
          {isUp ? '▲' : isDown ? '▼' : '—'}{' '}
          {Math.abs(p.change?.pct ?? 0).toFixed(1)}%
        </div>
      </div>
    </div>
  );
};

export default ProductPriceCard;