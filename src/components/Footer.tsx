import LiquiOffLogo from "@/assets/LiquiOff_logo.svg";
import { Phone, Instagram, Mail } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-background py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-start justify-between gap-12">
          {/* Logo and Brand */}
          <div className="flex flex-col gap-4 max-w-xs">
            <a href="/" className="flex items-center gap-2" aria-label="Ir al inicio">
              <img src={LiquiOffLogo} alt="LiquiOff" className="h-9 w-auto" />
              <span className="text-xl font-bold">LiquiOff</span>
            </a>
            <p className="text-sm text-background/60 leading-relaxed">
              La plataforma de liquidaciones y ofertas en Uruguay. Los mejores descuentos verificados en un solo lugar.
            </p>
            <p className="text-xs text-background/40">
              © {currentYear} LiquiOff
            </p>
          </div>

          {/* Links Restructured into Columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 text-sm flex-1 md:ml-12" aria-label="Enlaces del pie de página">
            {/* Column 1: Info */}
            <div className="flex flex-col gap-4">
              <h4 className="font-bold text-background uppercase tracking-wider text-xs">Información</h4>
              <nav className="flex flex-col gap-3">
                <a
                  href="/ayuda"
                  className="text-background/70 hover:text-background transition-colors"
                >
                  Ayuda
                </a>
                <a
                  href="/vendedor/login"
                  className="text-background/70 hover:text-background transition-colors"
                >
                  Acceso vendedores
                </a>
              </nav>
            </div>

            {/* Column 2: Legal */}
            <div className="flex flex-col gap-4">
              <h4 className="font-bold text-background uppercase tracking-wider text-xs">Legal</h4>
              <nav className="flex flex-col gap-3">
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
              </nav>
            </div>

            {/* Column 3: Contact & Social */}
            <div className="flex flex-col gap-4">
              <h4 className="font-bold text-background uppercase tracking-wider text-xs">Contacto</h4>
              <div className="flex flex-col gap-3">
                <a
                  href="mailto:contacto@liquioff.com"
                  className="text-background/70 hover:text-background transition-colors flex items-center gap-2"
                >
                  <Mail className="h-4 w-4 shrink-0" />
                  contacto@liquioff.com
                </a>
                <a
                  href="tel:+59893857601"
                  className="text-background/70 hover:text-background transition-colors flex items-center gap-2"
                >
                  <Phone className="h-4 w-4 shrink-0" />
                  +598 93 857 601
                </a>
                <a
                  href="https://www.instagram.com/liquioffuy/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-background/70 hover:text-background transition-colors flex items-center gap-2"
                >
                  <Instagram className="h-4 w-4 shrink-0" />
                  Instagram
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
