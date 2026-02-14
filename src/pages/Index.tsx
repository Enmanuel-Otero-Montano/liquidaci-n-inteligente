import { Helmet } from 'react-helmet-async';
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import CategoriesSection from "@/components/CategoriesSection";
import SellerSection from "@/components/SellerSection";
import Footer from "@/components/Footer";

const Index = () => {
  // Configurable props - these would come from backend in Jinja2
  const minDiscount = 20;

  // Schema.org structured data for Organization
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "LiquiOff",
    "description": "Marketplace de liquidaciones y ofertas verificadas en Uruguay",
    "url": "https://liquioff.com.uy",
    "logo": "https://liquioff.com.uy/liquioff-logo.svg",
    "contactPoint": {
      "@type": "ContactPoint",
      "email": "contacto@liquioff.com.uy",
      "contactType": "customer service",
      "areaServed": "UY",
      "availableLanguage": "Spanish"
    },
    "sameAs": [
      "https://www.instagram.com/liquioffuy"
    ]
  };

  return (
    <>
      <Helmet>
        {/* Primary Meta Tags */}
        <title>LiquiOff - Liquidaciones y Ofertas Verificadas Uruguay</title>
        <meta 
          name="description" 
          content="Descubre liquidaciones y ofertas reales verificadas de al menos 20% en Uruguay. Productos nuevos de marcas reconocidas en stock limitado. ¡Aprovecha ahora!" 
        />
        <meta 
          name="keywords" 
          content="liquidaciones uruguay, descuentos verificados, ofertas montevideo, outlet online, rebajas uruguay, liquidaciones reales" 
        />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://liquioff.com.uy/" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://liquioff.com.uy/" />
        <meta property="og:title" content="LiquiOff - Liquidaciones y ofertas verificadas ≥20% OFF en Uruguay" />
        <meta 
          property="og:description" 
          content="Descubre liquidaciones y ofertas reales verificadas de al menos 20% en Uruguay." 
        />
        <meta property="og:image" content="https://liquioff.com.uy/og-image.png" />
        <meta property="og:locale" content="es_UY" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://liquioff.com.uy/" />
        <meta name="twitter:title" content="LiquiOff - Liquidaciones y ofertas verificadas ≥20% OFF en Uruguay" />
        <meta 
          name="twitter:description" 
          content="Descubre liquidaciones y ofertas reales verificadas de al menos 20% en Uruguay." 
        />
        <meta name="twitter:image" content="https://liquioff.com.uy/og-image.png" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(organizationSchema)}
        </script>
      </Helmet>

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
    </>
  );
};

export default Index;