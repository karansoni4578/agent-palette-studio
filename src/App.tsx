import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import SubmitAgent from "./pages/SubmitAgent";
import CategoryListing from "./pages/CategoryListing";
import WritingListing from "./pages/WritingListing";
import CodingListing from "./pages/CodingListing";
import AutomationListing from "./pages/AutomationListing";
import ExploreCategories from "./pages/ExploreCategories";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/submit" element={<SubmitAgent />} />
          <Route path="/categories" element={<ExploreCategories />} />
          <Route path="/category/chat" element={<CategoryListing />} />
          <Route path="/category/writing" element={<WritingListing />} />
          <Route path="/category/coding" element={<CodingListing />} />
          <Route path="/category/automation" element={<AutomationListing />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
