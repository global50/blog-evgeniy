import React, { useState } from "react";
import { X, Save, Eye, Image, Tag } from "lucide-react";
import { Post, Tag as TagType } from "../types";
import { mockTags } from "../data/mockData";

interface PostEditorProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (post: Partial<Post>) => void;
  post?: Post;
}

export const PostEditor: React.FC<PostEditorProps> = ({
  isOpen,
  onClose,
  onSave,
  post,
}) => {
  const [title, setTitle] = useState(post?.title || "");
  const [content, setContent] = useState(post?.content || "");
  const [featuredImage, setFeaturedImage] = useState(post?.image_url || "");
  const [selectedTags, setSelectedTags] = useState<TagType[]>([]);
  const [featured, setFeatured] = useState(post?.featured || false);
  const [isPreview, setIsPreview] = useState(false);

  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const generateSlug = (title: string): string => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
  };

  const calculateReadingTime = (content: string): number => {
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    return Math.ceil(wordCount / wordsPerMinute);
  };

  const handleSave = () => {
    if (!title.trim() || !content.trim()) {
      alert("Please fill in both title and content");
      return;
    }

    const postData: Partial<Post> = {
      title: title.trim(),
      slug: generateSlug(title),
      content: content.trim(),
      image_url: featuredImage.trim(),
      featured,
      reading_time: calculateReadingTime(content),
      tag_name: selectedTags[0]?.name ?? "No tag",
      tag_color: selectedTags[0]?.color ?? undefined,
    };

    onSave(postData);
    onClose();

    // Reset form
    setTitle("");
    setContent("");
    setFeaturedImage("");
    setSelectedTags([]);
    setFeatured(false);
  };

  const toggleTag = (tag: TagType) => {
    const newTag = [tag];
    setSelectedTags(newTag);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen">
        <div
          className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
          onClick={onClose}
        />

        <div className="relative w-full bg-white shadow-2xl">
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center z-10">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-semibold text-slate-800">
                {post ? "Edit Post" : "Create New Post"}
              </h1>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setIsPreview(!isPreview)}
                  className={`flex items-center px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                    isPreview
                      ? "bg-slate-200 text-slate-800"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  <Eye className="h-4 w-4 mr-1" />
                  Preview
                </button>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={handleSave}
                className="flex items-center px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium"
              >
                <Save className="h-4 w-4 mr-2" />
                Publish Post
              </button>

              <button
                onClick={onClose}
                className="p-2 text-slate-400 hover:text-slate-600 rounded-lg transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="flex h-[calc(100vh-80px)]">
            {/* Editor Panel */}
            <div
              className={`${
                isPreview ? "w-1/2" : "w-full"
              } p-6 overflow-y-auto border-r border-gray-200`}
            >
              <div className="max-w-4xl mx-auto space-y-6">
                {/* Title */}
                <div>
                  <input
                    type="text"
                    placeholder="Post title..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full text-3xl font-bold text-slate-800 placeholder-slate-400 border-none outline-none resize-none"
                  />
                </div>

                {/* Featured Image */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    <Image className="h-4 w-4 inline mr-1" />
                    Featured Image URL
                  </label>
                  <input
                    type="url"
                    placeholder="https://example.com/image.jpg"
                    value={featuredImage}
                    onChange={(e) => setFeaturedImage(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                  {featuredImage && (
                    <div className="mt-2">
                      <img
                        src={featuredImage}
                        alt="Featured"
                        className="w-full h-48 object-cover rounded-lg"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                      />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Content
                  </label>
                  <textarea
                    placeholder="Write your post content here... You can use markdown-style formatting like ## for headings."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows={20}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 resize-none font-mono text-sm"
                  />
                </div>

                {/* Tags */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    <Tag className="h-4 w-4 inline mr-1" />
                    Tags
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {mockTags.map((tag) => (
                      <button
                        key={tag.id}
                        onClick={() => toggleTag(tag)}
                        className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                          selectedTags.find((t) => t.id === tag.id)
                            ? "text-white"
                            : "text-slate-600 hover:text-white"
                        }`}
                        style={{
                          backgroundColor: selectedTags.find(
                            (t) => t.id === tag.id
                          )
                            ? tag.color
                            : `${tag.color}20`,
                          borderColor: tag.color,
                          borderWidth: "1px",
                        }}
                      >
                        {tag.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Options */}
                <div className="flex items-center space-x-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={featured}
                      onChange={(e) => setFeatured(e.target.checked)}
                      className="mr-2 h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                    />
                    <span className="text-sm text-slate-700">
                      Featured Post
                    </span>
                  </label>
                </div>
              </div>
            </div>

            {/* Preview Panel */}
            {isPreview && (
              <div className="w-1/2 p-6 overflow-y-auto bg-gray-50">
                <div className="max-w-4xl mx-auto">
                  <article className="bg-white rounded-xl shadow-sm overflow-hidden">
                    {featuredImage && (
                      <div className="h-64 bg-gray-200 overflow-hidden">
                        <img
                          src={featuredImage}
                          alt={title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}

                    <div className="p-8">
                      <h1 className="text-4xl font-bold text-slate-800 mb-4">
                        {title || "Untitled Post"}
                      </h1>

                      <div className="prose prose-slate max-w-none">
                        {content.split("\n\n").map((paragraph, index) => {
                          if (paragraph.startsWith("## ")) {
                            return (
                              <h2
                                key={index}
                                className="text-2xl font-bold text-slate-800 mt-8 mb-4"
                              >
                                {paragraph.replace("## ", "")}
                              </h2>
                            );
                          }
                          if (paragraph.startsWith("# ")) {
                            return (
                              <h1
                                key={index}
                                className="text-3xl font-bold text-slate-800 mt-8 mb-4"
                              >
                                {paragraph.replace("# ", "")}
                              </h1>
                            );
                          }
                          return (
                            <p
                              key={index}
                              className="text-slate-700 leading-relaxed mb-4"
                            >
                              {paragraph}
                            </p>
                          );
                        })}
                      </div>
                    </div>
                  </article>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
