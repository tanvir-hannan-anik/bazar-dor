import Image from 'next/image';
import React from 'react';
const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
})

const HeroSectionPage = () => {
    return (
        <section className="container mx-auto px-4 py-10 sm:py-14 lg:py-20">
  <div className="relative overflow-hidden rounded-3xl bg-green-50 px-6 py-10 sm:px-10 lg:px-14 lg:py-14">
    <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-8">
      <div className="relative z-10">
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-green-200 bg-white px-4 py-2 text-sm font-medium text-green-800 shadow-sm">
          <span className="h-2 w-2 rounded-full bg-green-600"></span>
          {date}
        </div>

        <h1 className="max-w-xl text-3xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
          আজকের বাজারের দাম
          <span className="mt-2 block text-green-700">
            এক নজরে
          </span>
        </h1>

        <p className="mt-5 max-w-xl text-sm leading-7 text-gray-600 sm:text-base sm:leading-8">
          চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
          বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <a
            href="#products"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-700 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-green-700/20 transition duration-300 hover:-translate-y-0.5 hover:bg-green-800"
          >
            সব পণ্য দেখুন
            <span aria-hidden="true">→</span>
          </a>

          
        </div>

        <div className="mt-8 flex flex-wrap gap-x-5 gap-y-3 text-xs font-medium text-gray-500 sm:text-sm">
          <span className="flex items-center gap-2">
            <span className="text-green-700">✓</span>
            বাজারভিত্তিক দাম
          </span>
          <span className="flex items-center gap-2">
            <span className="text-green-700">✓</span>
            দামের পরিবর্তন
          </span>
          <span className="flex items-center gap-2">
            <span className="text-green-700">✓</span>
            সহজ তুলনা
          </span>
        </div>
      </div>

      <div className="relative mx-auto w-full max-w-lg">
        <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-green-200/60 blur-2xl"></div>
        <div className="absolute -bottom-4 -left-4 h-28 w-28 rounded-full bg-lime-200/70 blur-2xl"></div>

        <div className="relative overflow-hidden rounded-2xl border border-white bg-white p-2 shadow-xl shadow-green-900/10">
          <Image
            src="/bazar-hero.png"
            alt="নিত্যপ্রয়োজনীয় পণ্যের বাজার"
            height={600}
            width={600}
            priority
            className="h-auto w-full rounded-xl object-cover"
          />
        </div>

        
      </div>
    </div>
  </div>
</section>
    );
};

export default HeroSectionPage;