import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import CategoriesSection from "@/components/CategoriesSection";
import SellerSection from "@/components/SellerSection";
import Footer from "@/components/Footer";

const Index = () => {
  // Configurable props - these would come from backend in Jinja2
  const minDiscount = 20;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection minDiscount={minDiscount} />
        <HowItWorksSection />
        <CategoriesSection minDiscount={minDiscount} />
        <SellerSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
