import { useState, useMemo } from 'react';
import { Search, ShoppingBag, Store, HelpCircle, MessageCircle, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { FaqSection } from './components/FaqSection';
import { faqData, faqCategories } from './data/faqData';

export function AyudaPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'comprador' | 'vendedor'>('all');

  const filteredFaqs = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    
    let items = faqData;
    
    // Filter by tab
    if (activeTab !== 'all') {
      items = items.filter(item => item.category === activeTab || item.category === 'general');
    }
    
    // Filter by search query
    if (query) {
      items = items.filter(item => 
        item.question.toLowerCase().includes(query) ||
        item.answer.toLowerCase().includes(query) ||
        item.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    return items;
  }, [searchQuery, activeTab]);

  const compradorFaqs = filteredFaqs.filter(f => f.category === 'comprador');
  const vendedorFaqs = filteredFaqs.filter(f => f.category === 'vendedor');
  const generalFaqs = filteredFaqs.filter(f => f.category === 'general');

  const hasResults = filteredFaqs.length > 0;
  const isSearching = searchQuery.trim().length > 0;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-muted/30 border-b border-border py-12 md:py-16">
          <div className="container max-w-4xl mx-auto px-4">
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
            >
              <ArrowLeft className="h-4 w-4" />
              Volver al inicio
            </Link>
            
            <div className="text-center">
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
                Centro de Ayuda
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Encontrá respuestas a las preguntas más frecuentes sobre cómo comprar 
                y vender en LiquiOff.
              </p>
            </div>

            {/* Search Bar */}
            <div className="mt-8 max-w-xl mx-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Buscar en ayuda..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12 text-base bg-background"
                />
              </div>
              {isSearching && (
                <p className="text-sm text-muted-foreground mt-2 text-center">
                  {filteredFaqs.length} resultado{filteredFaqs.length !== 1 ? 's' : ''} encontrado{filteredFaqs.length !== 1 ? 's' : ''}
                </p>
              )}
            </div>
          </div>
        </section>

        {/* FAQ Content */}
        <section className="py-8 md:py-12">
          <div className="container max-w-4xl mx-auto px-4">
            <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as typeof activeTab)}>
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="all" className="gap-2">
                  <HelpCircle className="h-4 w-4 hidden sm:inline" />
                  Todos
                </TabsTrigger>
                <TabsTrigger value="comprador" className="gap-2">
                  <ShoppingBag className="h-4 w-4 hidden sm:inline" />
                  Compradores
                </TabsTrigger>
                <TabsTrigger value="vendedor" className="gap-2">
                  <Store className="h-4 w-4 hidden sm:inline" />
                  Vendedores
                </TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="mt-0">
                {hasResults ? (
                  <>
                    <FaqSection
                      title={faqCategories.comprador.label}
                      description={faqCategories.comprador.description}
                      icon={<ShoppingBag className="h-5 w-5 text-primary" />}
                      items={compradorFaqs}
                      searchQuery={searchQuery}
                    />
                    <FaqSection
                      title={faqCategories.vendedor.label}
                      description={faqCategories.vendedor.description}
                      icon={<Store className="h-5 w-5 text-primary" />}
                      items={vendedorFaqs}
                      searchQuery={searchQuery}
                    />
                    <FaqSection
                      title={faqCategories.general.label}
                      description={faqCategories.general.description}
                      icon={<HelpCircle className="h-5 w-5 text-primary" />}
                      items={generalFaqs}
                      searchQuery={searchQuery}
                    />
                  </>
                ) : (
                  <EmptySearchState query={searchQuery} onClear={() => setSearchQuery('')} />
                )}
              </TabsContent>

              <TabsContent value="comprador" className="mt-0">
                {hasResults ? (
                  <>
                    <FaqSection
                      title={faqCategories.comprador.label}
                      description={faqCategories.comprador.description}
                      icon={<ShoppingBag className="h-5 w-5 text-primary" />}
                      items={compradorFaqs}
                      searchQuery={searchQuery}
                    />
                    {generalFaqs.length > 0 && (
                      <FaqSection
                        title={faqCategories.general.label}
                        icon={<HelpCircle className="h-5 w-5 text-primary" />}
                        items={generalFaqs}
                        searchQuery={searchQuery}
                      />
                    )}
                  </>
                ) : (
                  <EmptySearchState query={searchQuery} onClear={() => setSearchQuery('')} />
                )}
              </TabsContent>

              <TabsContent value="vendedor" className="mt-0">
                {hasResults ? (
                  <>
                    <FaqSection
                      title={faqCategories.vendedor.label}
                      description={faqCategories.vendedor.description}
                      icon={<Store className="h-5 w-5 text-primary" />}
                      items={vendedorFaqs}
                      searchQuery={searchQuery}
                    />
                    {generalFaqs.length > 0 && (
                      <FaqSection
                        title={faqCategories.general.label}
                        icon={<HelpCircle className="h-5 w-5 text-primary" />}
                        items={generalFaqs}
                        searchQuery={searchQuery}
                      />
                    )}
                  </>
                ) : (
                  <EmptySearchState query={searchQuery} onClear={() => setSearchQuery('')} />
                )}
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-12 bg-muted/30 border-t border-border">
          <div className="container max-w-2xl mx-auto px-4 text-center">
            <h2 className="text-xl font-semibold text-foreground mb-2">
              ¿No encontraste lo que buscabas?
            </h2>
            <p className="text-muted-foreground mb-6">
              Escribinos y te responderemos en 24-48 horas hábiles.
            </p>
            <Button asChild size="lg" className="gap-2">
              <a href="mailto:contacto@liquioff.com">
                <MessageCircle className="h-5 w-5" />
                Contactanos
              </a>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function EmptySearchState({ query, onClear }: { query: string; onClear: () => void }) {
  return (
    <div className="text-center py-12">
      <Search className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
      <h3 className="text-lg font-medium text-foreground mb-2">
        No encontramos resultados para "{query}"
      </h3>
      <p className="text-muted-foreground mb-4">
        Intentá con otros términos o explorá las categorías.
      </p>
      <Button variant="outline" onClick={onClear}>
        Limpiar búsqueda
      </Button>
    </div>
  );
}
