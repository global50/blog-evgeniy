import { Author, Tag, Post, BlogStats } from "../types";

export const mockAuthors: Author[] = [
  {
    id: "1",
    name: "Sarah Chen",
    email: "sarah@example.com",
    avatar:
      "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
    bio: "Tech enthusiast and digital nomad sharing insights about modern web development.",
    location: "San Francisco, CA",
    website: "https://sarahchen.dev",
  },
  {
    id: "2",
    name: "Marcus Johnson",
    email: "marcus@example.com",
    avatar:
      "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
    bio: "Frontend architect passionate about creating exceptional user experiences.",
    location: "New York, NY",
    website: "https://marcusj.com",
  },
];

export const mockTags: Tag[] = [
  { id: "1", name: "Technology", slug: "technology", color: "#3B82F6" },
  { id: "2", name: "Design", slug: "design", color: "#8B5CF6" },
  { id: "3", name: "Development", slug: "development", color: "#10B981" },
  { id: "4", name: "Tutorial", slug: "tutorial", color: "#F59E0B" },
  { id: "5", name: "Opinion", slug: "opinion", color: "#EF4444" },
];

export const mockPosts: Post[] = [
  {
    id: "1",
    title: "The Future of Web Development: Trends to Watch in 2025",
    slug: "future-web-development-2025",
    content: `The web development landscape is evolving at an unprecedented pace. As we move through 2025, several key trends are shaping how we build and interact with web applications.

## AI-Powered Development Tools

Artificial Intelligence is revolutionizing the development process. From code generation to automated testing, AI tools are becoming indispensable for modern developers. These tools don't replace developers but augment their capabilities, allowing for faster prototyping and more efficient debugging.

## The Rise of Edge Computing

Edge computing is bringing computation closer to users, reducing latency and improving performance. Modern frameworks are embracing edge-first architectures, enabling developers to deploy functions globally with minimal configuration.

## Component-Driven Architecture

The future belongs to composable, reusable components. Frameworks are moving towards better component isolation, improved tree-shaking, and more efficient bundle splitting strategies.

## Enhanced Developer Experience

Developer experience continues to be a primary focus, with hot reloading, instant feedback loops, and better debugging tools becoming standard across all major frameworks.`,
    image_url:
      "https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop",
    featured: true,
    created_at: "2025-01-15T10:00:00Z",
    reading_time: 5,
    tag_name: "Tag",
    views: 1250,
  },
  {
    id: "2",
    title: "Mastering Modern CSS: Grid, Flexbox, and Beyond",
    slug: "mastering-modern-css",
    content: `CSS has evolved tremendously over the past few years. Modern CSS provides powerful layout tools that make creating responsive, beautiful interfaces easier than ever.

## CSS Grid: The Layout Revolution

CSS Grid revolutionized how we approach layout design. Unlike flexbox, which is one-dimensional, Grid allows for true two-dimensional layouts with precise control over both rows and columns.

## Flexbox: Still Essential

While Grid handles complex layouts, Flexbox remains crucial for component-level alignment and distribution. The combination of both creates incredibly flexible design systems.

## Custom Properties and CSS Variables

CSS custom properties enable dynamic theming and responsive design patterns that were previously impossible without JavaScript.

## Modern Selectors and Pseudo-classes

New selectors like :has(), :where(), and :is() provide more powerful ways to target elements without cluttering HTML with excessive classes.`,
    image_url:
      "https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop",
    featured: false,
    created_at: "2025-01-12T14:30:00Z",
    reading_time: 7,
    views: 890,
    tag_name: "Tag",
  },
  {
    id: "3",
    title: "Building Scalable React Applications",
    slug: "building-scalable-react-applications",
    content: `Creating maintainable and scalable React applications requires careful planning and adherence to best practices. Here's what you need to know.

## Component Architecture

Start with a clear component hierarchy. Keep components small, focused, and reusable. Each component should have a single responsibility.

## State Management

Choose the right state management solution for your application size. Context API works well for small to medium apps, while larger applications benefit from dedicated state management libraries.

## Performance Optimization

Modern React provides excellent performance out of the box, but understanding concepts like memoization, code splitting, and lazy loading can significantly improve user experience.

## Testing Strategy

Implement a comprehensive testing strategy that includes unit tests, integration tests, and end-to-end testing to ensure reliability as your application grows.`,
    image_url:
      "https://images.pexels.com/photos/177598/pexels-photo-177598.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop",
    featured: false,
    created_at: "2025-01-10T09:15:00Z",
    reading_time: 6,
    tag_name: "Tag",
    views: 1100,
  },
  {
    id: "4",
    title: "The Art of Minimalist Design",
    slug: "art-of-minimalist-design",
    content: `Minimalist design isn't about removing everything—it's about removing everything unnecessary. This principle creates interfaces that are both beautiful and functional.

## Less is More

Every element should serve a purpose. Remove decorative elements that don't contribute to the user experience or communication goals.

## White Space as a Design Element

White space isn't empty space—it's a powerful design tool that improves readability, creates visual hierarchy, and guides user attention.

## Typography and Hierarchy

Strong typography can carry a minimalist design. Use font weights, sizes, and spacing to create clear information hierarchy without relying on color or decorative elements.

## Color and Contrast

A limited color palette forces focus on what matters most. Use color strategically to highlight important actions and information.`,
    image_url:
      "https://images.pexels.com/photos/262508/pexels-photo-262508.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop",
    featured: false,
    created_at: "2025-01-08T16:45:00Z",
    reading_time: 4,
    views: 245,
    tag_name: "Tag",
  },
];

export const mockStats: BlogStats = {
  total_posts: 4,
  total_views: 3485,
  total_authors: 2,
};
