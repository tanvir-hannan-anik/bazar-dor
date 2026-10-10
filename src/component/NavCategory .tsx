import Link from 'next/link';
import React from 'react';
interface NavCategory{
    id:number
    icon: string
    nameBn: string
}
const NavCategoryPage = async() => {
    const res = await fetch("https://openapi.programming-hero.com/api/bazardor/categories")
    const data: NavCategory[] = await res.json()
    return (
        <div className='flex items-center gap-6 p-5 border-b border-gray-200'>
            {
                data.map(n=><Link href={'/'} key={n.id}>
                    <span>{n.icon}</span>
                    <span>{n.nameBn}</span>
                </Link>)
            }
        </div>
    );
};

export default NavCategoryPage ;