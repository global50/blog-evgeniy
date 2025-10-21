import React from "react";
import { Clock, Eye, Star } from "lucide-react";
import { Post } from "../types";
import { getRelativeTime } from "../utils/dateUtils";

interface PostCardProps {
  post: Post;
  compact?: boolean;
  onClick?: () => void;
}

export const PostCard: React.FC<PostCardProps> = ({
  post,
  compact = false,
  onClick,
}) => {
  const cardClasses = compact
    ? "bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow cursor-pointer"
    : "bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer transform hover:scale-[1.02]";

  return (
    <article className={cardClasses} onClick={onClick}>
      {!compact && post.image_url && (
        <div className="relative h-48 bg-gray-200 rounded-t-xl overflow-hidden">
          <img
            src={post.image_url}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          {post.featured && (
            <div className="absolute top-3 left-3">
              <span className="bg-emerald-600 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center">
                <Star className="h-3 w-3 mr-1" />
                Featured
              </span>
            </div>
          )}
        </div>
      )}

      <div className={compact ? "" : "p-6"}>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-3">
            <div>
              <p className="text-xs text-slate-500">
                {getRelativeTime(post.created_at)}
              </p>
            </div>
          </div>
        </div>

        <h2
          className={`font-bold text-slate-800 mb-2 line-clamp-2 ${
            compact ? "text-lg" : "text-xl"
          }`}
        >
          {post.title}
        </h2>

        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {/* {post.tags.slice(0, compact ? 2 : 3).map((tag) => (
              <span
                key={tag.id}
                className="px-2 py-1 bg-slate-100 text-slate-700 rounded-full text-xs font-medium"
                style={{ backgroundColor: `${tag.color}20`, color: tag.color }}
              >
                {tag.name}
              </span>
            ))} */}
          </div>

          <div className="flex items-center space-x-4 text-sm text-slate-500">
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              {post.reading_time} min
            </div>
            <div className="flex items-center">
              <Eye className="h-4 w-4 mr-1" />
              {post.views}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};
