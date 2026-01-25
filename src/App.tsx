import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import { CatalogPage } from "./pages/Catalog";
import { ProductDetailPage } from "./pages/ProductDetail";
import { ReservationConfirmationPage } from "./pages/ReservationConfirmation";
import { SuscripcionPage } from "./pages/Suscripcion";
import { SuscripcionOkPage } from "./pages/SuscripcionOk";
import { SellerLoginPage } from "./pages/vendedor/Login";
import { SellerRegisterPage } from "./pages/vendedor/Register";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Rutas públicas */}
            <Route path="/" element={<Index />} />
            <Route path="/liquidaciones" element={<CatalogPage />} />
            <Route path="/p/:slug" element={<ProductDetailPage />} />
            <Route path="/reserva-ok" element={<ReservationConfirmationPage />} />
            <Route path="/suscribirme" element={<SuscripcionPage />} />
            <Route path="/suscripcion-ok" element={<SuscripcionOkPage />} />
            
            {/* Auth vendedor */}
            <Route path="/vendedor/login" element={<SellerLoginPage />} />
            <Route path="/vendedor/registro" element={<SellerRegisterPage />} />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
