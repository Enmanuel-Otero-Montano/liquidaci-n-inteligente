import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import LiquiOffLogo from "@/assets/LiquiOff_logo.svg";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2" aria-label="Ir al inicio">
            <img src={LiquiOffLogo} alt="LiquiMarket" className="h-9 w-auto" />
            <span className="text-xl font-bold text-foreground">LiquiMarket</span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-3" aria-label="Navegación principal">
            <a href="/vendedor/registro" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Crear cuenta vendedor
            </a>
            <a href="/vendedor/login">
              <Button variant="outline" size="sm">
                Soy vendedor
              </Button>
            </a>
            <a href="/liquidaciones">
              <Button variant="hero" size="sm">
                Ver liquidaciones
              </Button>
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-secondary transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-border animate-fade-in" aria-label="Navegación móvil">
            <div className="flex flex-col gap-3">
              <a href="/liquidaciones">
                <Button variant="hero" className="w-full" size="lg">
                  Ver liquidaciones
                </Button>
              </a>
              <a href="/vendedor/login">
                <Button variant="outline" className="w-full" size="lg">
                  Soy vendedor
                </Button>
              </a>
              <a 
                href="/vendedor/registro" 
                className="text-center py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Crear cuenta vendedor
              </a>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
