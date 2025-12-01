import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';

const sponsors = [
  { name: 'Vercel', tier: 'platinum' },
  { name: 'Cloudflare', tier: 'platinum' },
  { name: 'DigitalOcean', tier: 'gold' },
  { name: 'AWS', tier: 'gold' },
  { name: 'Laravel', tier: 'silver' },
  { name: 'JetBrains', tier: 'silver' },
  { name: 'GitHub', tier: 'silver' },
  { name: 'Stripe', tier: 'silver' },
];

export default function Sponsors() {
  const { darkMode } = useTheme();

  return (
    <section className={`py-20 border-y ${
      darkMode
        ? 'bg-black border-zinc-900'
        : 'bg-white border-zinc-200'
    }`}>
      <div className="max-w-7xl mx-auto px-6">
        <p className={`text-center text-sm uppercase tracking-wider mb-10 ${
          darkMode ? 'text-zinc-500' : 'text-zinc-600'
        }`}>
          Trusted by developers at
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
          {sponsors.map((s, i) => (
            <div
              key={i}
              className={`transition-colors cursor-pointer ${
                darkMode
                  ? 'text-zinc-600 hover:text-zinc-400'
                  : 'text-zinc-500 hover:text-zinc-700'
              }`}
            >
              <span className="text-xl font-semibold">{s.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
