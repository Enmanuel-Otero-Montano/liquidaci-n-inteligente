import { Link } from 'react-router-dom';
import { Calendar, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { BlogPost } from '@/types/blog';
import { estimateReadingTime } from '@/hooks/useBlogPosts';

interface BlogCardProps {
  post: BlogPost;
}

export function BlogCard({ post }: BlogCardProps) {
  const readingTime = estimateReadingTime(post.content);
  const publishedDate = post.published_at
    ? new Date(post.published_at).toLocaleDateString('es-UY', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : null;

  return (
    <Link
      to={`/blog/${post.slug}`}
      className="group rounded-lg border border-border overflow-hidden bg-card hover:shadow-md transition-shadow"
    >
      {post.cover_image_url ? (
        <div className="aspect-video overflow-hidden bg-muted">
          <img
            src={post.cover_image_url}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        </div>
      ) : (
        <div className="aspect-video bg-muted flex items-center justify-center">
          <span className="text-muted-foreground text-sm">Sin imagen</span>
        </div>
      )}
      <div className="p-5 space-y-3">
        <Badge variant="secondary" className="text-xs font-normal">
          {post.category}
        </Badge>
        <h2 className="text-lg font-semibold leading-snug group-hover:text-primary transition-colors line-clamp-2">
          {post.title}
        </h2>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {post.excerpt}
        </p>
        <div className="flex items-center gap-4 text-xs text-muted-foreground pt-1">
          {publishedDate && (
            <span className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" />
              {publishedDate}
            </span>
          )}
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {readingTime} min de lectura
          </span>
        </div>
      </div>
    </Link>
  );
}
