export interface Author {
  id: string;
  name: string;
  email: string;
  avatar: string;
  bio: string;
  location: string;
  website: string;
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
  color: string;
}

export interface Post {
  id: string;
  created_at: string;
  title: string;
  slug: string;
  content?: string;
  featured: boolean;
  reading_time: number;
  views: number;
  tag_name: string;
  tag_color?: string;
  image_url?: string;
}

export interface BlogStats {
  total_posts: number;
  total_views: number;
  total_authors: number;
}
