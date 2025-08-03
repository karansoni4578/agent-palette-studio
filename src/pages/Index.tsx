import Header from "@/components/Header";
import Categories from "@/components/Categories";
import AgentGrid from "@/components/AgentGrid";
import Footer from "@/components/Footer";
import FloatingActionButton from "@/components/FloatingActionButton";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Categories />
      <AgentGrid />
      <Footer />
      <FloatingActionButton />
    </div>
  );
};

export default Index;
