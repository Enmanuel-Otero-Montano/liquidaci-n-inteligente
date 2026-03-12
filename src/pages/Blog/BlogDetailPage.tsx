import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import ReactMarkdown from 'react-markdown';
import { Calendar, Clock, ChevronRight, ArrowLeft } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useBlogPost, estimateReadingTime } from '@/hooks/useBlogPosts';
import { BlogArticleCTA } from './components/BlogArticleCTA';

const SITE = 'https://liquioff.com.uy';

function BlogDetailSkeleton() {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <Skeleton className="h-4 w-48" />
      <Skeleton className="h-10 w-full" />
      <div className="flex gap-4">
        <Skeleton className="h-4 w-28" />
        <Skeleton className="h-4 w-28" />
      </div>
      <Skeleton className="h-64 w-full rounded-lg" />
      <div className="space-y-3">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </div>
    </div>
  );
}

function BlogNotFound() {
  return (
    <div className="text-center py-16 px-4">
      <h2 className="text-2xl font-semibold mb-2">Artículo no encontrado</h2>
      <p className="text-muted-foreground mb-6">
        El artículo que buscás no existe o fue removido.
      </p>
      <Button asChild variant="outline">
        <Link to="/blog">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver al blog
        </Link>
      </Button>
    </div>
  );
}

export function BlogDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { data: post, isLoading } = useBlogPost(slug || '');

  const readingTime = post ? estimateReadingTime(post.content) : 0;
  const publishedDate = post?.published_at
    ? new Date(post.published_at).toLocaleDateString('es-UY', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : null;
  const isoDate = post?.published_at
    ? new Date(post.published_at).toISOString()
    : undefined;
  const isoUpdated = post?.updated_at
    ? new Date(post.updated_at).toISOString()
    : undefined;

  const articleSchema = post
    ? JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: post.title,
        description: post.excerpt,
        image: post.cover_image_url || undefined,
        datePublished: isoDate,
        dateModified: isoUpdated || isoDate,
        author: { '@type': 'Person', name: post.author },
        publisher: {
          '@type': 'Organization',
          name: 'LiquiOff',
          url: SITE,
        },
      })
    : null;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {post && (
        <Helmet>
          <title>{`${post.title} | LiquiOff`}</title>
          <meta name="description" content={post.excerpt} />
          <link rel="canonical" href={`${SITE}/blog/${post.slug}`} />
          <meta property="og:type" content="article" />
          <meta property="og:title" content={`${post.title} | LiquiOff`} />
          <meta property="og:description" content={post.excerpt} />
          <meta
            property="og:image"
            content={
              post.cover_image_url || `${SITE}/liquioff-logo-og-1200x630.png`
            }
          />
          <meta property="og:url" content={`${SITE}/blog/${post.slug}`} />
          <meta property="og:locale" content="es_UY" />
          <meta property="og:site_name" content="LiquiOff" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={`${post.title} | LiquiOff`} />
          <meta name="twitter:description" content={post.excerpt} />
          <meta
            name="twitter:image"
            content={
              post.cover_image_url || `${SITE}/liquioff-logo-og-1200x630.png`
            }
          />
          {articleSchema && (
            <script type="application/ld+json">{articleSchema}</script>
          )}
        </Helmet>
      )}

      <Header />

      <main className="container mx-auto px-4 py-8 md:py-12 flex-1">
        {isLoading ? (
          <BlogDetailSkeleton />
        ) : !post ? (
          <BlogNotFound />
        ) : (
          <article className="max-w-3xl mx-auto">
            {/* Breadcrumb */}
            <nav
              className="flex items-center gap-1 text-sm text-muted-foreground mb-6"
              aria-label="Breadcrumb"
            >
              <Link to="/" className="hover:text-foreground transition-colors">
                Inicio
              </Link>
              <ChevronRight className="h-3.5 w-3.5" />
              <Link
                to="/blog"
                className="hover:text-foreground transition-colors"
              >
                Blog
              </Link>
              <ChevronRight className="h-3.5 w-3.5" />
              <span className="text-foreground truncate max-w-[200px] sm:max-w-none">
                {post.title}
              </span>
            </nav>

            {/* Header */}
            <div className="mb-8">
              <Badge variant="secondary" className="mb-3 text-xs font-normal">
                {post.category}
              </Badge>
              <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-4">
                {post.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                {publishedDate && (
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-4 w-4" />
                    {publishedDate}
                  </span>
                )}
                <span className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4" />
                  {readingTime} min de lectura
                </span>
                <span>Por {post.author}</span>
              </div>
            </div>

            {/* Cover image */}
            {post.cover_image_url && (
              <img
                src={post.cover_image_url}
                alt={post.title}
                className="w-full rounded-lg mb-8 object-cover max-h-[480px]"
              />
            )}

            {/* Markdown content */}
            <div className="prose prose-slate dark:prose-invert max-w-none prose-headings:font-semibold prose-a:text-primary prose-img:rounded-lg">
              <ReactMarkdown>{post.content}</ReactMarkdown>
            </div>

            {/* CTA */}
            <BlogArticleCTA />
          </article>
        )}
      </main>

      <Footer />
    </div>
  );
}
