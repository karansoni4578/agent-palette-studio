import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Categories from "@/components/Categories";
import AgentGrid from "@/components/AgentGrid";
import Footer from "@/components/Footer";
import FloatingActionButton from "@/components/FloatingActionButton";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <Categories />
      <AgentGrid />
      <Footer />
      <FloatingActionButton />
    </div>
  );
};

export default Index;
