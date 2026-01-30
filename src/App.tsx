import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { AdminAuthProvider } from "@/contexts/AdminAuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { AdminProtectedRoute } from "@/components/AdminProtectedRoute";
import Index from "./pages/Index";
import { CatalogPage } from "./pages/Catalog";
import { ProductDetailPage } from "./pages/ProductDetail";
import { ReservationConfirmationPage } from "./pages/ReservationConfirmation";
import { SuscripcionPage } from "./pages/Suscripcion";
import { SuscripcionOkPage } from "./pages/SuscripcionOk";
import { SellerLoginPage } from "./pages/vendedor/Login";
import { SellerRegisterPage } from "./pages/vendedor/Register";
import { SellerDashboardPage } from "./pages/vendedor/Dashboard";
import { SellerProductsPage } from "./pages/vendedor/Products";
import { ProductFormPage } from "./pages/vendedor/ProductForm";
import { ReservationsPage } from "./pages/vendedor/Reservations";
import { ProfilePage } from "./pages/vendedor/Profile";
import { AdminLoginPage } from "./pages/admin/Login";
import { ModerationPage } from "./pages/admin/Moderation";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <AdminAuthProvider>
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
              
              {/* Rutas protegidas vendedor */}
              <Route 
                path="/vendedor" 
                element={
                  <ProtectedRoute>
                    <SellerDashboardPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/vendedor/productos" 
                element={
                  <ProtectedRoute>
                    <SellerProductsPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/vendedor/productos/nuevo" 
                element={
                  <ProtectedRoute>
                    <ProductFormPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/vendedor/productos/:id/editar" 
                element={
                  <ProtectedRoute>
                    <ProductFormPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/vendedor/reservas" 
                element={
                  <ProtectedRoute>
                    <ReservationsPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/vendedor/perfil" 
                element={
                  <ProtectedRoute>
                    <ProfilePage />
                  </ProtectedRoute>
                } 
              />
              
              {/* Auth admin */}
              <Route path="/admin/login" element={<AdminLoginPage />} />
              <Route 
                path="/admin/moderacion" 
                element={
                  <AdminProtectedRoute>
                    <ModerationPage />
                  </AdminProtectedRoute>
                } 
              />
              
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AdminAuthProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
