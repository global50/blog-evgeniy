import React from "react";
import { X, Clock, Eye, Calendar, Tag } from "lucide-react";
import { Post } from "../types";
import { formatDate } from "../utils/dateUtils";

interface PostDetailModalProps {
  post: Post;
  onClose: () => void;
}

export const PostDetailModal: React.FC<PostDetailModalProps> = ({
  post,
  onClose,
}) => {
  React.useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div
          className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
          onClick={onClose}
        />

        <div className="relative w-full max-w-4xl bg-white rounded-xl shadow-2xl max-h-[90vh] overflow-hidden">
          <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center z-10">
            <h1 className="text-lg font-semibold text-slate-800 line-clamp-1">
              {post.title}
            </h1>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-600 rounded-lg transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
            {post.image_url && (
              <div className="h-64 bg-gray-200 overflow-hidden">
                <img
                  src={post.image_url}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="p-8">
              <div className="mb-6">
                <h1 className="text-4xl font-bold text-slate-800 mb-4 leading-tight">
                  {post.title}
                </h1>

                <div className="flex flex-wrap items-center gap-6 text-sm text-slate-500">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    {formatDate(post.created_at)}
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2" />
                    {post.reading_time} min read
                  </div>
                  <div className="flex items-center">
                    <Eye className="h-4 w-4 mr-2" />
                    {post.views} views
                  </div>
                </div>
              </div>

              <div className="prose prose-slate max-w-none">
                {post.content?.split("\n\n").map((paragraph, index) => {
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

              {post.tag_name && post.tag_color && (
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-2 items-center">
                      <Tag className="h-4 w-4 text-slate-400 mr-2" />
                      <div>
                        <span
                          className="px-3 py-1 rounded-full text-sm font-medium"
                          style={{
                            backgroundColor: `${post.tag_color}20`,
                            color: post.tag_color,
                          }}
                        >
                          {post.tag_name}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
