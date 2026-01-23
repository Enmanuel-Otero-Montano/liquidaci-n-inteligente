import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import { CatalogPage } from "./pages/Catalog";
import { ProductDetailPage } from "./pages/ProductDetail";
import { ReservationConfirmationPage } from "./pages/ReservationConfirmation";
import { SuscripcionPage } from "./pages/Suscripcion";
import { SuscripcionOkPage } from "./pages/SuscripcionOk";
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
          <Route path="/liquidaciones" element={<CatalogPage />} />
          <Route path="/p/:slug" element={<ProductDetailPage />} />
          <Route path="/reserva-ok" element={<ReservationConfirmationPage />} />
          <Route path="/suscribirme" element={<SuscripcionPage />} />
          <Route path="/suscripcion-ok" element={<SuscripcionOkPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
