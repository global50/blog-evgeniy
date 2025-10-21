import { useState } from "react";
import { Header } from "./components/Header";
import { BlogView } from "./components/BlogView";
import { SearchModal } from "./components/SearchModal";
import { PostEditor } from "./components/PostEditor";
import { useBlogData } from "./hooks/useBlogData";
import { Post } from "./types";

function App() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const { posts, incrementViews, addPost } = useBlogData();

  const handlePostSelect = (post: Post) => {
    incrementViews(post.id);
  };

  const handleCreatePost = (postData: Partial<Post>) => {
    addPost(postData);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        onSearchToggle={() => setIsSearchOpen(true)}
        onCreatePost={() => setIsEditorOpen(true)}
      />

      <BlogView posts={posts} onPostClick={handlePostSelect} />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        posts={posts}
        onPostSelect={handlePostSelect}
      />

      <PostEditor
        isOpen={isEditorOpen}
        onClose={() => setIsEditorOpen(false)}
        onSave={handleCreatePost}
      />
    </div>
  );
}

export default App;
