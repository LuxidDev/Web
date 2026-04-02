import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { SearchProvider } from "@/contexts/SearchContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AboutPage from '@/pages/About';
import Docs from '@/docs/Docs';
import BlogPage from '@/pages/Blog';

const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider>
    <SearchProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/docs/:chapter?" element={<Docs />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </SearchProvider>
  </ThemeProvider>
);

export default App;
