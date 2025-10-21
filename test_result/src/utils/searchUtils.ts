import { Post } from '../types';

export const searchPosts = (posts: Post[], query: string): Post[] => {
  if (!query.trim()) return posts;
  
  const lowercaseQuery = query.toLowerCase();
  
  return posts.filter(post => 
    post.title.toLowerCase().includes(lowercaseQuery) ||
    post.content.toLowerCase().includes(lowercaseQuery) ||
    post.excerpt.toLowerCase().includes(lowercaseQuery) ||
    post.author.name.toLowerCase().includes(lowercaseQuery) ||
    post.tags.some(tag => tag.name.toLowerCase().includes(lowercaseQuery))
  );
};

export const highlightText = (text: string, query: string): string => {
  if (!query.trim()) return text;
  
  const regex = new RegExp(`(${query})`, 'gi');
  return text.replace(regex, '<mark class="bg-yellow-200 px-1 rounded">$1</mark>');
};