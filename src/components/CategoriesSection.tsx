import { Shirt, Footprints, Home, Sparkles, Dumbbell, Smartphone, Baby, Watch } from "lucide-react";

interface Category {
  label: string;
  slug: string;
  icon: React.ComponentType<{ className?: string }>;
  subtitle?: string;
}

interface CategoriesSectionProps {
  minDiscount?: number;
  categories?: Category[];
}

const defaultCategories: Category[] = [
  { label: "Moda", slug: "moda", icon: Shirt, subtitle: "Ropa y accesorios" },
  { label: "Calzado", slug: "calzado", icon: Footprints, subtitle: "Zapatillas y más" },
  { label: "Hogar", slug: "hogar", icon: Home, subtitle: "Deco y muebles" },
  { label: "Belleza", slug: "belleza", icon: Sparkles, subtitle: "Cuidado personal" },
  { label: "Deportes", slug: "deportes", icon: Dumbbell, subtitle: "Fitness y outdoor" },
  { label: "Tecnología", slug: "tecnologia", icon: Smartphone, subtitle: "Electrónica" },
  { label: "Bebés", slug: "bebes", icon: Baby, subtitle: "Todo para los más chicos" },
  { label: "Accesorios", slug: "accesorios", icon: Watch, subtitle: "Relojes y más" },
];

const CategoriesSection = ({ minDiscount = 25, categories = defaultCategories }: CategoriesSectionProps) => {
  return (
    <section className="py-16 md:py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Categorías
          </h2>
          <p className="text-lg text-muted-foreground">
            Encontrá liquidaciones en todas estas categorías
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {categories.map((category, index) => (
            <a
              key={category.slug}
              href={`/liquidaciones?cat=${category.slug}`}
              className="category-card group animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
              aria-label={`Ver liquidaciones de ${category.label}`}
            >
              <div className="flex items-start justify-between mb-4">
                <category.icon className="h-8 w-8 text-primary transition-transform group-hover:scale-110" />
                <span className="discount-badge text-xs">
                  desde {minDiscount}% OFF
                </span>
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-1">
                {category.label}
              </h3>
              {category.subtitle && (
                <p className="text-sm text-muted-foreground">{category.subtitle}</p>
              )}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
