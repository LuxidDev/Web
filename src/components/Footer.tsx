import React, { useState, useEffect } from 'react';
import { Github, Twitter, MessageCircle, Youtube, Heart, ArrowUp } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

const footerLinks = {
  Framework: ['Features', 'Documentation', 'API Reference', 'Changelog', 'Roadmap', 'Security'],
  Resources: ['Getting Started', 'Tutorials', 'Examples', 'Best Practices', 'FAQ', 'Video Courses'],
  Community: ['Discord', 'GitHub Discussions', 'Stack Overflow', 'Twitter', 'YouTube', 'Newsletter'],
  Company: ['About', 'Blog', 'Careers', 'Press Kit', 'Contact', 'Sponsors'],
};

export default function Footer() {
  const { darkMode } = useTheme();
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Show/hide scroll to top button based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      <footer className={`border-t relative ${
        darkMode
          ? 'bg-zinc-950 border-zinc-900'
          : 'bg-zinc-900 border-zinc-800'
      }`}>
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-12">
            <div className="col-span-2">
              <a href="#" className="flex items-center gap-2.5 mb-4 group">
                <span className="text-xl font-bold text-white">Luxid</span>
                <img
                  src={"/lion7.svg"}
                  alt="Luxid"
                  className="w-8 h-8 group-hover:scale-110 transition-transform"
                />
              </a>
              <p className="text-zinc-400 text-sm mb-6 leading-relaxed">The PHP Framework for Modern Web. Build elegant applications with the SEA architecture.</p>
              <div className="flex items-center gap-3">
                {[Github, Twitter, MessageCircle, Youtube].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className={`p-2 rounded-lg transition-all ${
                      darkMode
                        ? 'bg-zinc-900 hover:bg-zinc-800 text-zinc-500 hover:text-white'
                        : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <h4 className="text-white font-semibold mb-4 text-sm">{category}</h4>
                <ul className="space-y-2.5">
                  {links.map(link => (
                    <li key={link}>
                      <a href="#" className={`text-sm transition-colors ${
                        darkMode
                          ? 'text-zinc-500 hover:text-white'
                          : 'text-zinc-400 hover:text-white'
                      }`}>
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className={`pt-8 border-t flex flex-col md:flex-row items-center justify-between gap-4 ${
            darkMode ? 'border-zinc-900' : 'border-zinc-800'
          }`}>
            <p className={`text-sm flex items-center gap-1 ${
              darkMode ? 'text-zinc-600' : 'text-zinc-500'
            }`}>
              Creator and CEO of Luxid ~
              <a
                href="https://jhayonline.dev"
                className={`underline font-semibold transition-colors duration-200 ${
                  darkMode ? 'text-white hover:text-zinc-300' : 'text-blue-600 hover:text-blue-800'
                }`}
              >
                jhayonline.dev
              </a>
            </p>
            <p className={`text-sm ${
              darkMode ? 'text-zinc-600' : 'text-zinc-500'
            }`}>
              &copy; 2025 Luxid. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm">
              <a href="#" className={`transition-colors ${
                darkMode
                  ? 'text-zinc-500 hover:text-white'
                  : 'text-zinc-400 hover:text-white'
              }`}>
                Privacy
              </a>
              <a href="#" className={`transition-colors ${
                darkMode
                  ? 'text-zinc-500 hover:text-white'
                  : 'text-zinc-400 hover:text-white'
              }`}>
                Terms
              </a>
              <a href="#" className={`transition-colors ${
                darkMode
                  ? 'text-zinc-500 hover:text-white'
                  : 'text-zinc-400 hover:text-white'
              }`}>
                Cookies
              </a>
            </div>
          </div>
        </div>

        {/* Scroll to Top Button */}
        <button
          onClick={scrollToTop}
          className={`absolute -top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full border transition-all duration-300 hover:scale-110 ${
            showScrollTop
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-4 pointer-events-none'
          } ${
            darkMode
              ? 'bg-zinc-900 border-zinc-700 hover:bg-zinc-800 hover:border-zinc-600 text-white'
              : 'bg-zinc-800 border-zinc-700 hover:bg-zinc-700 hover:border-zinc-600 text-white'
          }`}
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-5 h-5 mx-auto" />
        </button>
      </footer>
    </>
  );
}
