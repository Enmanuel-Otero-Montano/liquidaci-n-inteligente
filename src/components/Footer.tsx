import LiquiOffLogo from "@/assets/LiquiOff_logo.svg";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-background py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2" aria-label="Ir al inicio">
            <img src={LiquiOffLogo} alt="LiquiMarket" className="h-8 w-auto" />
            <span className="text-lg font-bold">LiquiMarket</span>
          </a>

          {/* Links */}
          <nav className="flex flex-wrap items-center justify-center gap-6 text-sm" aria-label="Enlaces del pie de página">
            <a 
              href="/ayuda" 
              className="text-background/70 hover:text-background transition-colors"
            >
              Ayuda
            </a>
            <a 
              href="/terminos" 
              className="text-background/70 hover:text-background transition-colors"
            >
              Términos y condiciones
            </a>
            <a 
              href="/privacidad" 
              className="text-background/70 hover:text-background transition-colors"
            >
              Privacidad
            </a>
            <a 
              href="/vendedor/login" 
              className="text-background/70 hover:text-background transition-colors"
            >
              Acceso vendedores
            </a>
          </nav>

          {/* Copyright */}
          <p className="text-sm text-background/50">
            © {currentYear} LiquiMarket
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
