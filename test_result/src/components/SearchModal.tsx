import React, { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { Post } from '../types';
import { searchPosts } from '../utils/searchUtils';
import { PostCard } from './PostCard';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  posts: Post[];
  onPostSelect: (post: Post) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ 
  isOpen, 
  onClose, 
  posts, 
  onPostSelect 
}) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Post[]>([]);

  useEffect(() => {
    if (query.trim()) {
      const searchResults = searchPosts(posts, query);
      setResults(searchResults.slice(0, 5));
    } else {
      setResults([]);
    }
  }, [query, posts]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      setQuery('');
      setResults([]);
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-start justify-center p-4 pt-16">
        <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={onClose} />
        
        <div className="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-slate-800">Search Posts</h2>
              <button
                onClick={onClose}
                className="p-2 text-slate-400 hover:text-slate-600 rounded-lg transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search for posts, authors, or tags..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                autoFocus
              />
            </div>
          </div>

          <div className="max-h-96 overflow-y-auto">
            {results.length > 0 ? (
              <div className="p-6 space-y-4">
                {results.map((post) => (
                  <div
                    key={post.id}
                    onClick={() => {
                      onPostSelect(post);
                      onClose();
                    }}
                    className="cursor-pointer transform hover:scale-[1.02] transition-transform"
                  >
                    <PostCard post={post} compact />
                  </div>
                ))}
              </div>
            ) : query.trim() ? (
              <div className="p-12 text-center">
                <Search className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                <p className="text-slate-500">No posts found for "{query}"</p>
              </div>
            ) : (
              <div className="p-12 text-center">
                <Search className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                <p className="text-slate-500">Start typing to search posts...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};