import React, { useState, useEffect } from 'react';
import {
  Heart, Users, Globe, Code, BookOpen, Zap,
  Github, ExternalLink,
  Star, ChevronRight, Building
} from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

interface TeamMember {
  name: string;
  role: string;
  avatar: string;
  company: string;
  github?: string;
  twitter?: string;
  website?: string;
}

interface Contributor {
  name: string;
  avatar: string;
  contributions: number;
  github: string;
}

interface Sponsor {
  name: string;
  tier: 'gold' | 'silver' | 'bronze' | 'individual';
  duration: string;
  website?: string;
}

export default function About() {
  const [scrollY, setScrollY] = useState(0);
  const { darkMode } = useTheme();

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const coreTeam: TeamMember[] = [
    {
      name: "Samuel Tagoe",
      role: "Creator & Lead Maintainer",
      avatar: "/images/profiles/jhay-profile.jpeg",
      company: "SWE at SLINT-Tech and BlueFoodsFactory",
      github: "https://github.com/jhayonline",
      twitter: "https://twitter.com/jhayonline",
      website: "https://jhayonline.dev",
    },
    {
      name: "Alex Johnson",
      role: "Core Team Member",
      avatar: "/profile-alex.jpg",
      company: "TechCorp Inc",
      github: "https://github.com",
      twitter: "https://twitter.com",
    },
    {
      name: "Maria Chen",
      role: "Core Team Member",
      avatar: "/profile-maria.jpg",
      company: "DesignSystems Co",
      github: "https://github.com",
      twitter: "https://twitter.com",
    },
    {
      name: "David Okafor",
      role: "Core Team Member",
      avatar: "/profile-david.jpg",
      company: "SecureNet Ltd",
      github: "https://github.com",
      twitter: "https://twitter.com",
    }
  ];

  const topContributors: Contributor[] = [
    { name: "Sarah Kim", avatar: "SK", contributions: 42, github: "https://github.com" },
    { name: "Marcus Lee", avatar: "ML", contributions: 38, github: "https://github.com" },
    { name: "Elena Rossi", avatar: "ER", contributions: 35, github: "https://github.com" },
    { name: "James Wilson", avatar: "JW", contributions: 31, github: "https://github.com" },
    { name: "Lisa Zhang", avatar: "LZ", contributions: 28, github: "https://github.com" },
    { name: "Ryan Park", avatar: "RP", contributions: 25, github: "https://github.com" },
    { name: "Sophie Martin", avatar: "SM", contributions: 22, github: "https://github.com" },
    { name: "Chris Brown", avatar: "CB", contributions: 19, github: "https://github.com" },
  ];

  const sponsors: Sponsor[] = [
    { name: "TechCorp Inc", tier: "gold", duration: "2 years", website: "https://example.com" },
    { name: "DevTools LLC", tier: "gold", duration: "1 year", website: "https://example.com" },
    { name: "CodeCraft", tier: "silver", duration: "1 year", website: "https://example.com" },
    { name: "PixelPioneer", tier: "silver", duration: "9 months", website: "https://example.com" },
    { name: "Alex Rivera", tier: "individual", duration: "2 years" },
    { name: "Maya Chen", tier: "individual", duration: "1 year" },
    { name: "David Kim", tier: "individual", duration: "1 year" },
  ];

  return (
    <section id="about" className={`relative py-32 overflow-hidden ${darkMode ? 'bg-black' : 'bg-white'
      }`}>
      {/* Background decoration */}
      <div className={`absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px] ${darkMode ? '' : 'invert opacity-20'
        }`} />
      <div className={`absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full blur-[150px] ${darkMode ? 'bg-zinc-900/20' : 'bg-zinc-300/10'
        }`} style={{ transform: `translate(${scrollY * 0.02}px, ${scrollY * 0.03}px)` }} />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Hero Section - Your Story */}
        <div className="text-center mb-24">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-8 mx-auto" style={{
            background: darkMode
              ? 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)'
              : 'linear-gradient(135deg, rgba(0,0,0,0.02) 0%, rgba(0,0,0,0.01) 100%)',
            borderColor: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'
          }}>
            {/* <Sparkles className={`w-4 h-4 ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`} /> */}
            <span className={`text-sm ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>The Story Behind Luxid</span>
          </div>

          <h1 className={`text-5xl md:text-7xl font-bold mb-6 leading-tight ${darkMode ? 'text-white' : 'text-black'
            }`}>
            Built with Purpose,<br />
            <span className={`${darkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
              Crafted for Developers
            </span>
          </h1>

          <p className={`text-xl max-w-3xl mx-auto mb-12 leading-relaxed ${darkMode ? 'text-zinc-400' : 'text-zinc-600'
            }`}>
            Luxid was created as a lightweight and simpler micro-version of an MVC framework for PHP,
            designed to offer a clean, modern, and easy-to-use foundation for building web applications.
          </p>

          {/* Creator Card */}
          <div className={`max-w-2xl mx-auto p-8 rounded-2xl border backdrop-blur-xl mb-12 ${darkMode
              ? 'bg-gradient-to-br from-zinc-900/50 to-zinc-800/30 border-zinc-800'
              : 'bg-gradient-to-br from-white/80 to-zinc-50/80 border-zinc-200'
            }`}>
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="relative">
                <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-zinc-700">
                  {/* Replace with actual profile image */}
                  <div
                    className={`w-full h-full flex items-center justify-center text-2xl font-bold ${darkMode ? 'bg-zinc-800 text-white' : 'bg-zinc-200 text-zinc-800'
                      }`}
                  >
                    <img
                      src="/images/profiles/jhay-profile.jpeg"
                      alt="Creator"
                      className="w-32 h-32 rounded-full object-contain bg-zinc-300 p-1 shadow-md"
                    />
                  </div>
                </div>
                <div className={`absolute -bottom-1 -right-1 w-8 h-8 rounded-full border-2 ${darkMode ? 'bg-black border-zinc-700' : 'bg-white border-zinc-300'
                  }`}>
                  <img
                    src={darkMode ? "/lion7.svg" : "/lion5.svg"}
                    alt="Creator"
                    className="w-full h-full p-1"
                  />
                </div>
              </div>
              <div className="flex-1 text-center md:text-left">
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-3">
                  <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-black'}`}>
                    Samuel Tagoe (Jhay)
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 text-xs rounded-full ${darkMode ? 'bg-zinc-800 text-zinc-300' : 'bg-zinc-200 text-zinc-700'
                      }`}>
                      Creator & Lead
                    </span>
                    {/* <span className={`px-2 py-1 text-xs rounded-full ${
                      darkMode ? 'bg-zinc-800 text-zinc-300' : 'bg-zinc-200 text-zinc-700'
                    }`}>
                      21 y/o
                    </span> */}
                    <span className={`px-2 py-1 text-xs rounded-full ${darkMode ? 'bg-zinc-800 text-zinc-300' : 'bg-zinc-200 text-zinc-700'
                      }`}>
                      Ghana 🇬🇭
                    </span>
                  </div>
                </div>
                <p className={`mb-6 ${darkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
                  "I built Luxid because I wanted PHP to have a framework that feels modern,
                  is a joy to work with, and empowers developers to build amazing things without complexity."
                </p>
                <div className="flex items-center justify-center md:justify-start gap-3">
                  <a
                    href="https://github.com/SinofPride-999"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-2 rounded-lg transition-all ${darkMode
                        ? 'bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white'
                        : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-700 hover:text-zinc-900'
                      }`}
                    title="GitHub"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                  <a
                    href="https://x.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-2 rounded-lg transition-all ${darkMode
                        ? 'bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white'
                        : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-700 hover:text-zinc-900'
                      }`}
                    title="X"
                  >
                    <img
                      src={darkMode ? '/x-white.png' : '/x-black.png'}
                      alt="X"
                      className="w-5 h-5"
                    />
                  </a>
                  <a
                    href="https://jhayonline.dev"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-2 rounded-lg transition-all ${darkMode
                        ? 'bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white'
                        : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-700 hover:text-zinc-900'
                      }`}
                    title="Website"
                  >
                    <ExternalLink className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Why Luxid Section */}
        <div className="mb-24">
          <h2 className={`text-4xl font-bold text-center mb-4 ${darkMode ? 'text-white' : 'text-black'
            }`}>Why Choose Luxid?</h2>
          <p className={`text-xl text-center mb-12 max-w-3xl mx-auto ${darkMode ? 'text-zinc-400' : 'text-zinc-600'
            }`}>
            Built with the developer experience at its core, Luxid offers everything you need
            to build modern PHP applications.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Code,
                title: "Modern PHP, Done Right",
                desc: "Leverage PHP 8.3+ features with beautiful, expressive syntax that feels contemporary."
              },
              {
                icon: Heart,
                title: "Community First",
                desc: "Built for developers, by developers. Every decision prioritizes the community's needs."
              },
              {
                icon: Zap,
                title: "Blazing Performance",
                desc: "Optimized for speed with minimal overhead. Build fast applications that scale."
              }
            ].map((item, i) => (
              <div key={i} className={`p-6 border rounded-xl transition-all duration-300 hover:-translate-y-1 ${darkMode
                  ? 'bg-zinc-900/50 border-zinc-800 hover:border-zinc-600'
                  : 'bg-zinc-50/50 border-zinc-200 hover:border-zinc-400'
                }`}>
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${darkMode
                    ? 'bg-zinc-800 text-zinc-300'
                    : 'bg-zinc-200 text-zinc-700'
                  }`}>
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className={`text-xl font-semibold mb-3 ${darkMode ? 'text-white' : 'text-black'
                  }`}>{item.title}</h3>
                <p className={`${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Core Team Section */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <h2 className={`text-4xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-black'
              }`}>Meet the Core Team</h2>
            <p className={`text-xl max-w-3xl mx-auto ${darkMode ? 'text-zinc-400' : 'text-zinc-600'
              }`}>
              The passionate individuals shaping the future of Luxid.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreTeam.map((member, i) => (
              <div key={i} className={`p-6 border rounded-xl transition-all duration-300 hover:-translate-y-1 ${darkMode
                  ? 'bg-zinc-900/50 border-zinc-800 hover:border-zinc-600'
                  : 'bg-zinc-50/50 border-zinc-200 hover:border-zinc-400'
                }`}>
                {/* Profile Picture */}
                <div className="relative mb-4">
                  <div className="w-20 h-20 rounded-full overflow-hidden border border-zinc-700 mb-3">
                    <div
                      className={`w-full h-full flex items-center justify-center rounded-full overflow-hidden ${darkMode ? "bg-zinc-800" : "bg-zinc-200"
                        }`}
                    >
                      {member.avatar ? (
                        <img
                          src={member.avatar}
                          alt={member.name}
                          className="w-full h-full object-cover scale-95 rounded-full shadow-md"
                        />
                      ) : (
                        <span className="text-lg font-bold text-zinc-700">
                          {member.name.split(" ").map((n) => n[0]).join("")}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className={`font-bold ${darkMode ? 'text-white' : 'text-black'}`}>
                      {member.name}
                    </h3>
                    {i === 0 && (
                      <div className={`px-2 py-0.5 text-xs rounded ${darkMode ? 'bg-zinc-800 text-zinc-300' : 'bg-zinc-200 text-zinc-700'
                        }`}>
                        Creator
                      </div>
                    )}
                  </div>
                  <p className={`text-sm mb-2 ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                    {member.role}
                  </p>
                  <div className="flex items-center gap-2">
                    <Building className={`w-3 h-3 ${darkMode ? 'text-zinc-500' : 'text-zinc-600'}`} />
                    <span className={`text-sm ${darkMode ? 'text-zinc-400' : 'text-zinc-500'}`}>
                      {member.company}
                    </span>
                  </div>
                </div>

                {/* Social Links */}
                <div className="flex items-center gap-2">
                  {member.github && (
                    <a
                      href={member.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-1.5 rounded transition-all ${darkMode
                          ? 'hover:bg-zinc-800 text-zinc-400 hover:text-white'
                          : 'hover:bg-zinc-200 text-zinc-500 hover:text-zinc-900'
                        }`}
                      title="GitHub"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                  {member.twitter && (
                    <a
                      href={member.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-1.5 rounded transition-all ${darkMode
                          ? 'hover:bg-zinc-800 text-zinc-400 hover:text-white'
                          : 'hover:bg-zinc-200 text-zinc-500 hover:text-zinc-900'
                        }`}
                      title="X"
                    >
                      <img
                        src={darkMode ? '/x-white.png' : '/x-black.png'}
                        alt="X"
                        className="w-4 h-4"
                      />
                    </a>
                  )}
                  {member.website && (
                    <a
                      href={member.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-1.5 rounded transition-all ${darkMode
                          ? 'hover:bg-zinc-800 text-zinc-400 hover:text-white'
                          : 'hover:bg-zinc-200 text-zinc-500 hover:text-zinc-900'
                        }`}
                      title="Website"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Community Stats & Contributors */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-24">
          {/* Stats */}
          <div>
            <h3 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-black'
              }`}>Our Growing Community</h3>
            <div className={`p-6 border rounded-xl ${darkMode
                ? 'bg-zinc-900/50 border-zinc-800'
                : 'bg-zinc-50/50 border-zinc-200'
              }`}>
              {[
                { icon: Github, label: "GitHub Stars", value: "12,000+" },
                { icon: Users, label: "Contributors", value: "500+" },
                { icon: Globe, label: "Countries", value: "85+" },
                { icon: BookOpen, label: "Projects Built", value: "2,500+" }
              ].map((stat, i) => (
                <div key={i} className={`flex items-center justify-between py-4 ${i !== 3 ? 'border-b' : ''
                  } ${darkMode ? 'border-zinc-800' : 'border-zinc-200'}`}>
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${darkMode ? 'bg-zinc-800' : 'bg-zinc-100'
                      }`}>
                      <stat.icon className={`w-4 h-4 ${darkMode ? 'text-zinc-400' : 'text-zinc-600'
                        }`} />
                    </div>
                    <span className={darkMode ? 'text-zinc-300' : 'text-zinc-700'}>
                      {stat.label}
                    </span>
                  </div>
                  <span className={`font-bold ${darkMode ? 'text-white' : 'text-black'
                    }`}>{stat.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Top Contributors */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-black'
                }`}>Top Contributors</h3>
              <a
                href="#"
                className={`flex items-center gap-1 text-sm ${darkMode ? 'text-zinc-400 hover:text-white' : 'text-zinc-600 hover:text-black'
                  }`}
              >
                View all <ChevronRight className="w-4 h-4" />
              </a>
            </div>
            <div className={`p-6 border rounded-xl ${darkMode
                ? 'bg-zinc-900/50 border-zinc-800'
                : 'bg-zinc-50/50 border-zinc-200'
              }`}>
              {topContributors.map((contributor, i) => (
                <a
                  key={i}
                  href={contributor.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center justify-between py-3 transition-colors ${i !== topContributors.length - 1 ? 'border-b' : ''
                    } ${darkMode ? 'border-zinc-800 hover:bg-zinc-800/50' : 'border-zinc-200 hover:bg-zinc-100/50'}`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full overflow-hidden border ${darkMode ? 'border-zinc-700' : 'border-zinc-300'
                      }`}>
                      <div className={`w-full h-full flex items-center justify-center text-sm font-bold ${darkMode
                          ? 'bg-zinc-800 text-zinc-300'
                          : 'bg-zinc-200 text-zinc-700'
                        }`}>
                        {contributor.avatar}
                      </div>
                    </div>
                    <div>
                      <div className={darkMode ? 'text-white' : 'text-black'}>
                        {contributor.name}
                      </div>
                      <div className={`text-xs flex items-center gap-1 ${darkMode ? 'text-zinc-500' : 'text-zinc-600'
                        }`}>
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-700" /> {contributor.contributions} contributions
                      </div>
                    </div>
                  </div>
                  <ChevronRight className={`w-4 h-4 ${darkMode ? 'text-zinc-600' : 'text-zinc-400'
                    }`} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Sponsors Section */}
        <div>
          <div className="text-center mb-12">
            <h2 className={`text-4xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-black'
              }`}>Our Supporters</h2>
            <p className={`text-xl max-w-3xl mx-auto ${darkMode ? 'text-zinc-400' : 'text-zinc-600'
              }`}>
              Luxid is made possible by the generous support of these amazing sponsors.
            </p>
          </div>

          {/* Gold Sponsors */}
          <div className="mb-12">
            <h3 className={`text-xl font-semibold mb-6 ${darkMode ? 'text-zinc-300' : 'text-zinc-700'
              }`}>
              Gold Sponsors
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {sponsors.filter(s => s.tier === 'gold').map((sponsor, i) => (
                <a
                  key={i}
                  href={sponsor.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-6 border rounded-xl transition-all hover:-translate-y-1 ${darkMode
                      ? 'bg-zinc-900/30 border-zinc-800 hover:border-zinc-600'
                      : 'bg-zinc-50/50 border-zinc-200 hover:border-zinc-400'
                    }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className={`text-lg font-semibold mb-1 ${darkMode ? 'text-white' : 'text-black'
                        }`}>
                        {sponsor.name}
                      </div>
                      <div className={`text-sm ${darkMode ? 'text-zinc-400' : 'text-zinc-600'
                        }`}>
                        {sponsor.duration}
                      </div>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-medium ${darkMode ? 'bg-zinc-800 text-zinc-300' : 'bg-zinc-200 text-zinc-700'
                      }`}>
                      Gold
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Other Sponsors */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Silver */}
            <div>
              <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-zinc-300' : 'text-zinc-700'
                }`}>
                Silver Sponsors
              </h3>
              <div className={`p-6 border rounded-xl space-y-3 ${darkMode
                  ? 'bg-zinc-900/30 border-zinc-800'
                  : 'bg-zinc-50/50 border-zinc-200'
                }`}>
                {sponsors.filter(s => s.tier === 'silver').map((sponsor, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <span className={darkMode ? 'text-zinc-300' : 'text-zinc-700'}>
                      {sponsor.name}
                    </span>
                    <span className={`text-sm ${darkMode ? 'text-zinc-500' : 'text-zinc-600'}`}>
                      {sponsor.duration}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Individual Sponsors */}
            <div>
              <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-zinc-300' : 'text-zinc-700'
                }`}>
                Generous Individuals
              </h3>
              <div className={`p-6 border rounded-xl space-y-3 ${darkMode
                  ? 'bg-zinc-900/30 border-zinc-800'
                  : 'bg-zinc-50/50 border-zinc-200'
                }`}>
                {sponsors.filter(s => s.tier === 'individual').map((sponsor, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <span className={darkMode ? 'text-zinc-300' : 'text-zinc-700'}>
                      {sponsor.name}
                    </span>
                    <span className={`text-sm ${darkMode ? 'text-zinc-500' : 'text-zinc-600'}`}>
                      {sponsor.duration}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CTA to Sponsor */}
          <div className={`mt-12 p-8 border rounded-2xl text-center ${darkMode
              ? 'bg-gradient-to-br from-zinc-900/50 to-zinc-800/30 border-zinc-800'
              : 'bg-gradient-to-br from-zinc-50 to-white/80 border-zinc-200'
            }`}>
            {/* <Heart
                className={`w-12 h-12 mx-auto mb-4 fill-red-500 stroke-none ${
                  darkMode ? 'text-red-400' : 'text-red-600'
                }`}
              /> */}
            <h3 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-black'
              }`}>
              Support Luxid's Development
            </h3>
            <p className={`mb-6 max-w-2xl mx-auto ${darkMode ? 'text-zinc-400' : 'text-zinc-600'
              }`}>
              Your sponsorship helps ensure Luxid remains free, open-source, and actively maintained.
            </p>
            <a
              href="#"
              className={`inline-flex items-center gap-2 px-8 py-3 rounded-xl font-semibold transition-all hover:scale-105 ${darkMode
                  ? 'bg-white text-black hover:bg-zinc-200'
                  : 'bg-black text-white hover:bg-zinc-800'
                }`}
            >
              <Heart className="w-5 h-5 fill-red-500 stroke-none" /> Become a Sponsor
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
