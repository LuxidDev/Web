import React, { useState, useEffect } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { useSearch } from '@/contexts/SearchContext';
import Header from '@/components/Header';
import SpotlightSearch from '@/components/SpotlightSearch';

const testimonials = [
  {
    name: "Clarence Ahiabor",
    handle: "@clarnx",
    company: "Netlify",
    text: "Luxid just makes sense. The AVE architecture is so intuitive that I stopped fighting my code and started enjoying PHP again.",
    avatar: "https://media.licdn.com/dms/image/v2/C4E03AQFYu0adToD67w/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1655724499319?e=1776902400&v=beta&t=inMD2AGRYWHpeAL41EOpsL8rIadAlft4wv_kr1XZ1Xw",
  },
  {
    name: "Lawson Buabassah",
    handle: "@eyarko",
    company: "AmaliTech",
    text: "Rocket ORM is exactly what I wanted. PHP 8 attributes make my entities clean and readable. No more array-based mapping that I always forget.",
    avatar: "https://media.licdn.com/dms/image/v2/D4D03AQHc4je_3GQkdw/profile-displayphoto-shrink_200_200/B4DZiDB1ASGgAc-/0/1754544953171?e=1776902400&v=beta&t=kN-MuxDItmRFwtdt4ewyXH08vSpVFerIFKtMEhQK1Ts",
  },
  {
    name: "Illona Addae",
    handle: "@illona",
    company: "AmaliTech",
    text: "Nova templates blew my mind. I can build reactive components without touching JavaScript. Everything stays on the server and just works.",
    avatar: "https://media.licdn.com/dms/image/v2/D4D03AQHAzKlBQPHbxw/profile-displayphoto-scale_200_200/B4DZrj7rwtJAAY-/0/1764760666649?e=1776902400&v=beta&t=XzdF_bL6Awv2KKKdJz232VA-1yFrEDKLNXtlDD1nKTk",
  },
  {
    name: "Nelson Saake",
    handle: "@nelson",
    company: "Digiplan",
    text: "Juice CLI is a game changer. One command and I have a complete API ready to go. It handles everything, I just write business logic.",
    avatar: "https://media.licdn.com/dms/image/v2/D5603AQGV8RBjLNm29g/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1695335018157?e=1776902400&v=beta&t=-Ky2tTz2QkwkbjrHSI4_U678d2t03WtMD6SZkUz_aiA",
  },
  {
    name: "Rahim Coolman",
    handle: "@rahim",
    text: "Finally a PHP framework that feels modern. The query builder is so fluent I actually enjoy writing complex database queries now.",
    avatar: "https://media.licdn.com/dms/image/v2/D5603AQGsZvuLReSm7w/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1719437248936?e=1776902400&v=beta&t=4vvbrESXjhUk6Yd3T181DUXbzdflPNtG0m_Nbe9sMAQ",
  },
  {
    name: "Sampson Quarmy Sokpoli",
    handle: "@sampson",
    company: "Industria Creativa",
    text: "The documentation is excellent. Coming from Laravel, I felt right at home. Luxid gives you exactly what you need, nothing more.",
    avatar: "https://media.licdn.com/dms/image/v2/D4D03AQFzw3CjMUdIDA/profile-displayphoto-scale_200_200/B4DZvClvDwKkAY-/0/1768496239197?e=1776902400&v=beta&t=gObau65HPCK9dMKTreJyBCuOvMDetCsaknM7kEdt4PE",
  },
  {
    name: "Robert Antwi",
    handle: "@robert",
    company: "digitalit.it",
    text: "I built my first API in less than 30 minutes. Luxid does the heavy lifting.",
    avatar: "https://media.licdn.com/dms/image/v2/D4E03AQHum9yd5S59uw/profile-displayphoto-scale_100_100/B4EZrQR8b.IUAc-/0/1764430957184?e=1776902400&v=beta&t=mvJZNt6J6IXWb2n0g1oB7TyJwQ8RSGLxclk3qWnxNLk",
  },
  {
    name: "Benedict Gbogr",
    handle: "@dejaguarkyng",
    company: "tokenated",
    text: "The architecture in Luxid is solid. It enforces good patterns without getting in your way, which is rare in PHP frameworks.",
    avatar: "https://avatars.githubusercontent.com/u/154946539?v=4"
  },
  {
    name: "Daniel Olasupo",
    handle: "@danny",
    text: "Luxid removes a lot of the guesswork. The conventions are smart, and the developer experience feels intentional from start to finish.",
    avatar: "https://media.licdn.com/dms/image/v2/D4E03AQEF_JrjS0D7fA/profile-displayphoto-scale_200_200/B4EZnsbRjpHEAY-/0/1760608198714?e=1776902400&v=beta&t=9bPAQ2rkPZBJ62B2eNxx4y8UUbbSutohUFiDmmGkDQQ"
  },
  {
    name: "Osborn Nkansah",
    handle: "@kwaku",
    company: "darkarmy",
    text: "I love how opinionated Luxid is. It gives clear patterns and conventions, so I spend less time debating structure and more time building features.",
    avatar: "https://media.licdn.com/dms/image/v2/D4E03AQEi3e4Al4HNLg/profile-displayphoto-shrink_200_200/B4EZS3hzgGHgAY-/0/1738245886175?e=1776902400&v=beta&t=QflOdYkBBlBFyNcQbMoWQHgsybigp_kf4G9U6nFDTHM"
  },
];

export default function Testimonials() {
  const { darkMode } = useTheme();
  const { searchOpen, setSearchOpen } = useSearch();

  return (
    <div className={darkMode ? "bg-black text-white" : "bg-white text-zinc-900"}>
      <Header onSearchClick={() => setSearchOpen(true)} />
      <SpotlightSearch isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
      <section
        id="community"
        className={`py-16 md:py-24 lg:py-32 overflow-hidden ${darkMode ? "bg-black" : "bg-white"}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 md:mb-16">
            <h2
              className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-4 flex flex-wrap items-center justify-center gap-2 sm:gap-4 ${darkMode ? "text-white" : "text-black"}`}
            >
              What people say about
              <span
                className={`text-transparent bg-clip-text bg-gradient-to-r ${darkMode ? "from-zinc-400 to-white" : "from-zinc-600 to-black"}`}
              >
                Luxid
              </span>
              <img
                src={darkMode ? "/lion7.svg" : "/lion5.svg"}
                alt="Luxid"
                className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 inline"
              />
            </h2>
            <p className={`text-base md:text-lg ${darkMode ? "text-zinc-400" : "text-zinc-600"}`}>
              Join thousands of developers building amazing applications with Luxid
            </p>
          </div>

          {/* Single column grid for mobile, 2 columns for tablet, 3 for desktop */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className={`p-5 md:p-6 border rounded-xl transition-all duration-300 hover:-translate-y-1 ${darkMode
                  ? "bg-zinc-900/50 border-zinc-800 hover:border-zinc-600"
                  : "bg-zinc-50/50 border-zinc-200 hover:border-zinc-400"
                  }`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-10 h-10 rounded-full object-cover border border-zinc-700"
                  />
                  <div className="min-w-0 flex-1">
                    <div
                      className={`font-medium truncate ${darkMode ? "text-white" : "text-black"}`}
                    >
                      {t.name}
                    </div>
                    <div
                      className={`text-xs md:text-sm truncate ${darkMode ? "text-zinc-500" : "text-zinc-600"}`}
                    >
                      {t.handle}
                      {t.company && (
                        <span className="hidden sm:inline ml-1">
                          • {t.company}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <p
                  className={`leading-relaxed text-sm md:text-base ${darkMode ? "text-zinc-300" : "text-zinc-700"}`}
                >
                  "{t.text}"
                </p>
                {t.company && (
                  <div className={`text-xs mt-2 sm:hidden ${darkMode ? "text-zinc-500" : "text-zinc-500"}`}>
                    {t.company}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="text-center mt-12 md:mt-16">
            <p className={`text-sm ${darkMode ? "text-zinc-500" : "text-zinc-600"}`}>
              Build your next dream app with confidence.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
