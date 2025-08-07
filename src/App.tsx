import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Index from "./pages/Index";
import SubmitAgent from "./pages/SubmitAgent";
import Blogs from "./pages/Blogs";
import BlogPost from "./pages/BlogPost";
import ExploreCategories from "./pages/ExploreCategories";
import NotFound from "./pages/NotFound";
import ChatCategory from "./pages/ChatCategory";
import WritingCategory from "./pages/WritingCategory";
import ImageDesignCategory from "./pages/ImageDesignCategory";
import CodingCategory from "./pages/CodingCategory";
import ProductivityCategory from "./pages/ProductivityCategory";
import VoiceAudioCategory from "./pages/VoiceAudioCategory";
import VideoAnimationCategory from "./pages/VideoAnimationCategory";
import DataAnalyticsCategory from "./pages/DataAnalyticsCategory";
import FinanceCryptoCategory from "./pages/FinanceCryptoCategory";
import EducationLearningCategory from "./pages/EducationLearningCategory";
import MarketingSEOCategory from "./pages/MarketingSEOCategory";
import HealthcareWellnessCategory from "./pages/HealthcareWellnessCategory";
import DeveloperAPIsCategory from "./pages/DeveloperAPIsCategory";
import SecurityLegalCategory from "./pages/SecurityLegalCategory";
import ExperimentalResearchCategory from "./pages/ExperimentalResearchCategory";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/submit" element={<SubmitAgent />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/categories" element={<ExploreCategories />} />
          <Route path="/category/chat" element={<ChatCategory />} />
          <Route path="/category/writing" element={<WritingCategory />} />
          <Route path="/category/image-design" element={<ImageDesignCategory />} />
          <Route path="/category/coding" element={<CodingCategory />} />
          <Route path="/category/productivity" element={<ProductivityCategory />} />
          <Route path="/category/voice-audio" element={<VoiceAudioCategory />} />
          <Route path="/category/video-animation" element={<VideoAnimationCategory />} />
          <Route path="/category/data-analytics" element={<DataAnalyticsCategory />} />
          <Route path="/category/finance-crypto" element={<FinanceCryptoCategory />} />
          <Route path="/category/education-learning" element={<EducationLearningCategory />} />
          <Route path="/category/marketing-seo" element={<MarketingSEOCategory />} />
          <Route path="/category/healthcare-wellness" element={<HealthcareWellnessCategory />} />
          <Route path="/category/developer-apis" element={<DeveloperAPIsCategory />} />
          <Route path="/category/security-legal" element={<SecurityLegalCategory />} />
          <Route path="/category/experimental-research" element={<ExperimentalResearchCategory />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
