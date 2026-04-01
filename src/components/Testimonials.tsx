import React, { useState, useEffect } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { useSearch } from '@/contexts/SearchContext';
import Header from '@/components/Header';
import SpotlightSearch from '@/components/SpotlightSearch';

const testimonials = [
  {
    name: "Clarence Ahiabor",
    handle: "@lucianosanchez",
    company: "Emplag",
    text: "We use NativePHP Mobile at Emplag and it's been incredibly fast to work with. The community is amazing, the developer experience feels natural, and it made building much easier for us.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
  },
  {
    name: "Anzar Syahid",
    handle: "@anzarsyahid",
    text: "NativePHP extends what I can do with Laravel beyond the web in a way that just feels right.",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&h=100&fit=crop",
  },
  {
    name: "Martin Blagoev",
    handle: "@martinblagoev",
    company: "MBSoft",
    text: "I've lived in Laravel for over a decade now. NativePHP means I never have to leave. Same tools, same flow, infinite new canvas.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
  },
  {
    name: "Mark Nuijens",
    handle: "@marknuijens",
    company: "Digiplan",
    text: "PHP can now run on mobile phones. Take that, Apple and Google! There's no stopping it now.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
  },
  {
    name: "Abishek R Srikanth",
    handle: "@abisheksrikanth",
    text: "Moving beyond the web felt intimidating due to the learning curve. NativePHP changed that completely.",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&h=100&fit=crop",
  },
  {
    name: "Jose Espinal",
    handle: "@joseespinal",
    company: "Industria Creativa",
    text: "I code for a hobby and love how with NativePHP I am implementing mobile apps internally to solve everyday problems at my business",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop",
  },
  {
    name: "Giancarlo Di Massa",
    handle: "@giancarlodimassa",
    company: "digitalit.it",
    text: "After years of working in the Laravel ecosystem, I always felt limited by the gap between web and native environments. NativePHP removes that barrier... with no need to rewrite everything in another language",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
  },
  {
    name: "Michael Guimaraes",
    handle: "@michaelguimaraes",
    company: "FlowBridge AI, Inc.",
    text: "NativePHP is allowing us to create amazing AI driven mobile applications",
    avatar: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=100&h=100&fit=crop",
  },
  {
    name: "Nick Poulos",
    handle: "@nickpoulos",
    company: "Beneath The Surface LLC",
    text: "We always appreciate projects that continue to push the boundaries and provide best in class developer experiences. It is these types of efforts that will keep PHP alive",
    avatar: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=100&h=100&fit=crop",
  },
  {
    name: "Ed Grosvenor",
    handle: "@edgrosvenor",
    company: "Artisan Build",
    text: "As a Laravel-only agency, we've turned down projects for years because we didn't want to have to learn and manage a different tech stack. NativePHP has let us add a whole new category to our offering with almost no effort on our part.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
  },
  {
    name: "Muhamad Zidane Arfani",
    handle: "@zidanearfani",
    text: "Excited to see how it transforms the way we build apps with PHP.",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&h=100&fit=crop",
  },
  {
    name: "Michael Biljleven",
    handle: "@michaelbiljleven",
    company: "Coding Monkeys",
    text: "Building apps is just such a breeze using NativePHP. We've worked with Swift and Flutter before, but this makes our lives just so much easier.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
  },
  {
    name: "Robert Kas",
    handle: "@robertkas",
    company: "Improvo Software",
    text: "I used to build desktop applications with Visual Studio and C#. When I first heard about NativePHP, I didn't hesitate to try it out. I really like how simple it makes building desktop apps in a language I'm already familiar with",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop",
  },
  {
    name: "Okoye Divine Chideibere",
    handle: "@okoyedivine",
    company: "Divplanet Technologies",
    text: "Being able to create mobile and desktop apps using the language I love the most is like a super power",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&h=100&fit=crop",
  },
  {
    name: "Jagdeep Singh",
    handle: "@jagdeepsingh",
    text: "I've been writing web apps for over two decades, and couldn't create a mobile app - now I can.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
  },
  {
    name: "Martin Gauthier",
    handle: "@martingauthier",
    company: "Pixel Trail | Codemoutain",
    text: "We ported everything we had in Flutter back into our battle tested Laravel app and this is sooooo much better to manage and iterate with. Awesome work Simon and Shane.",
    avatar: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=100&h=100&fit=crop",
  },
  {
    name: "Nick Dillon",
    handle: "@nickdillon",
    text: "I never thought I'd be able to build a mobile app without diving into Flutter or React Native. NativePHP changed that - now I'm building native apps in Laravel, and it feels like magic",
    avatar: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=100&h=100&fit=crop",
  },
  {
    name: "Yves Engetschwiler",
    handle: "@yvesengetschwiler",
    company: "Prolifictech",
    text: "I developed Popcorn Movies with NativePHP, which is available on the App Store, Play Store, and as a desktop application. Many more apps to come!",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
  },
];

export default function Testimonials() {
  const { darkMode } = useTheme();
  const { searchOpen, setSearchOpen } = useSearch();

  return (
    <div className={darkMode ? "min-h-screen bg-black text-white" : "min-h-screen bg-white text-zinc-900"}>
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
              We're here to help you make your dreams a reality.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
