import React, { useState } from "react";
import { Post } from "../types";
import { PostCard } from "./PostCard";
import { PostDetailModal } from "./PostDetailModal";

interface BlogViewProps {
  posts: Post[];
  onPostClick: (post: Post) => void;
}

export const BlogView: React.FC<BlogViewProps> = ({ posts, onPostClick }) => {
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const sortedPosts = posts.sort(
    (a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );

  const handleSelectPost = (post: Post) => {
    setSelectedPost(post);
    onPostClick(post);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-slate-800 to-slate-900 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Welcome to BlogCraft</h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Discover insights, tutorials, and stories from our community of
            developers and designers.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* All Posts */}
        {sortedPosts.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedPosts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                onClick={() => handleSelectPost(post)}
              />
            ))}
          </div>
        )}

        {sortedPosts.length === 0 && (
          <div className="text-center py-20">
            <h3 className="text-2xl font-semibold text-slate-600 mb-4">
              No posts yet
            </h3>
            <p className="text-slate-500">Check back soon for new content!</p>
          </div>
        )}
      </div>

      {selectedPost && (
        <PostDetailModal
          post={selectedPost}
          onClose={() => setSelectedPost(null)}
        />
      )}
    </div>
  );
};
