import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '@/contexts/ThemeContext';

const stats = [
  { value: 50000, suffix: '+', label: 'Downloads' },
  { value: 12000, suffix: '+', label: 'GitHub Stars' },
  { value: 500, suffix: '+', label: 'Contributors' },
  { value: 99, suffix: '%', label: 'Satisfaction' },
];

function AnimatedNumber({ value, suffix, darkMode }: { value: number; suffix: string; darkMode: boolean }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [isVisible, value]);

  return (
    <div ref={ref} className={`text-4xl md:text-5xl font-bold ${
      darkMode ? 'text-white' : 'text-black'
    }`}>
      {count.toLocaleString()}{suffix}
    </div>
  );
}

export default function Stats() {
  const { darkMode } = useTheme();

  return (
    <section className={`py-20 border-y ${
      darkMode
        ? 'bg-zinc-900/50 border-zinc-800'
        : 'bg-zinc-100/50 border-zinc-300'
    }`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <AnimatedNumber value={stat.value} suffix={stat.suffix} darkMode={darkMode} />
              <div className={`mt-2 ${
                darkMode ? 'text-zinc-500' : 'text-zinc-600'
              }`}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
