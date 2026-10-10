import React from 'react';
import ProductPriceCard from './ProductPriceCard';
interface Product {
    id: number
    change: {
        dir: string
        pct: number
    }
    image: string
    categoryIcon: string
    nameBn: string
    today: number
    yesterday: number
    unit: string
}
const ProductList = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/bazardor/products');
    const data: Product[] = await res.json();
    return (
        <div>
            <div>
                <div className="flex items-center my-5 p-5">
                    <span className="text-red-500 pr-1">▲</span>
                    <h1 className="font-bold"> আজ দাম বেড়েছে</h1>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
                    {
                        data.filter(p => p.change?.dir === "up").sort((a, b) => b.change.pct - a.change.pct).slice(0, 6).map(p => <ProductPriceCard key={p.id} p={p}></ProductPriceCard>)
                    }
                </div>
            </div>
            <div>
                <div className="flex items-center my-5 p-5">
                    <span className="text-green-500 pr-1">▼ </span>
                    <h1 className="font-bold"> আজ দাম কমেছে</h1>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
                    {
                        data.filter(p => p.change?.dir === "down").sort((a, b) => a.change.pct - b.change.pct).slice(0, 6).map(p => <ProductPriceCard key={p.id} p={p}></ProductPriceCard>)
                    }
                </div>
            </div>
            <div>
                <h1 className="my-5 p-5 font-bold">সব পণ্য</h1>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
                    {
                        data.map(p => <ProductPriceCard key={p.id} p={p}></ProductPriceCard>)
                    }
                </div>
            </div>
        </div>
    );
};

export default ProductList;