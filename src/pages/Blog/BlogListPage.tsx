import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useBlogPosts } from '@/hooks/useBlogPosts';
import { BlogCard } from './components/BlogCard';
import { BlogListSkeleton } from './components/BlogCardSkeleton';
import { BlogEmptyState } from './components/BlogEmptyState';

const SITE = 'https://liquioff.com.uy';

export function BlogListPage() {
  const { data: posts, isLoading } = useBlogPosts();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Helmet>
        <title>Blog para vendedores | LiquiOff</title>
        <meta
          name="description"
          content="Consejos, guías y novedades para vendedores y emprendedores en Uruguay. Aprende a liquidar stock de forma inteligente."
        />
        <link rel="canonical" href={`${SITE}/blog`} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Blog para vendedores | LiquiOff" />
        <meta
          property="og:description"
          content="Consejos, guías y novedades para vendedores y emprendedores en Uruguay."
        />
        <meta property="og:url" content={`${SITE}/blog`} />
        <meta
          property="og:image"
          content={`${SITE}/liquioff-logo-og-1200x630.png`}
        />
        <meta property="og:locale" content="es_UY" />
        <meta property="og:site_name" content="LiquiOff" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Blog para vendedores | LiquiOff" />
        <meta
          name="twitter:description"
          content="Consejos, guías y novedades para vendedores y emprendedores en Uruguay."
        />
        <meta
          name="twitter:image"
          content={`${SITE}/liquioff-logo-og-1200x630.png`}
        />
      </Helmet>

      <Header />

      <main className="container mx-auto px-4 py-8 md:py-12 flex-1">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Blog</h1>
        <p className="text-muted-foreground mb-8 max-w-2xl">
          Consejos, guías y novedades para vendedores y emprendedores en
          Uruguay.
        </p>

        {isLoading ? (
          <BlogListSkeleton />
        ) : posts && posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <BlogEmptyState />
        )}
      </main>

      <Footer />
    </div>
  );
}
