import { useState, useCallback, useEffect } from "react";
import { Post, BlogStats } from "../types";
import { mockStats } from "../data/mockData";
import { supabase } from "../client/supabaseClient";

export const useBlogData = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [stats, setStats] = useState<BlogStats>(mockStats);

  const queryPosts = async () => {
    const loadedPosts = (await supabase.from("test_posts").select("*")).data;
    setPosts(loadedPosts as Post[]);
  };

  const addPost = useCallback(async (newPost: Partial<Post>) => {
    const post: Post = {
      slug:
        newPost.slug ||
        newPost.title
          ?.toLowerCase()
          .replace(/[^a-z0-9 -]/g, "")
          .replace(/\s+/g, "-") ||
        "",
      views: 0,
      ...newPost,
    } as Post;

    const { error } = await supabase.from("test_posts").insert(post);

    if (error) {
      console.error("ERROR INSERT", error);
      return;
    }

    setPosts((prev) => [post, ...prev]);
    setStats((prev) => ({
      ...prev,
      total_posts: prev.total_posts + 1,
    }));
  }, []);

  const updatePost = useCallback((id: string, updatedPost: Partial<Post>) => {
    setPosts((prev) =>
      prev.map((post) => {
        if (post.id === id) {
          const updated = {
            ...post,
            ...updatedPost,
            updated_at: new Date().toISOString(),
          };
          return updated;
        }
        return post;
      })
    );
  }, []);

  const deletePost = useCallback((id: string) => {
    setPosts((prev) => {
      const postToDelete = prev.find((p) => p.id === id);
      const newPosts = prev.filter((post) => post.id !== id);

      if (postToDelete) {
        setStats((prevStats) => ({
          ...prevStats,
          total_posts: prevStats.total_posts - 1,
          total_views: prevStats.total_views - postToDelete.views,
        }));
      }

      return newPosts;
    });
  }, []);

  const incrementViews = useCallback(async (id: string) => {
    const postToIncrement = (
      await supabase.from("test_posts").select("*").eq("id", id)
    )?.data?.[0] as Post | null;

    if (!postToIncrement) {
      console.error("POST NOT FOUND");
      return;
    }

    const { error } = await supabase
      .from("test_posts")
      .update({ views: postToIncrement.views + 1 })
      .eq("id", postToIncrement.id);

    if (error) {
      console.error("ERROR WHILE UPDATE POST", error);
      return;
    }

    setPosts((prev) =>
      prev.map((post) =>
        post.id === id ? { ...post, views: post.views + 1 } : post
      )
    );
    setStats((prev) => ({ ...prev, total_views: prev.total_views + 1 }));
  }, []);

  useEffect(() => {
    queryPosts();
  }, []);

  return {
    posts,
    stats,
    addPost,
    updatePost,
    deletePost,
    incrementViews,
  };
};
