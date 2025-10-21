import React from 'react';
import { PenTool, Search, Plus } from 'lucide-react';

interface HeaderProps {
  onSearchToggle: () => void;
  onCreatePost: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onSearchToggle, onCreatePost }) => {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <PenTool className="h-8 w-8 text-slate-700" />
            <span className="ml-2 text-xl font-bold text-slate-800">BlogCraft</span>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={onCreatePost}
              className="flex items-center px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Post
            </button>
            <button
              onClick={onSearchToggle}
              className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors"
            >
              <Search className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};