
import React from 'react';
import { JobPost, InstitutionType } from '../types';

interface PostCardProps {
  post: JobPost;
  onSelect: (post: JobPost) => void;
}

const PostCard: React.FC<PostCardProps> = ({ post, onSelect }) => {
  const typeColor = post.type === InstitutionType.KINDERGARTEN ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700';

  return (
    <div 
      onClick={() => onSelect(post)}
      className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all cursor-pointer group"
    >
      <div className="flex justify-between items-start mb-4">
        <span className={`px-3 py-1 rounded-full text-xs font-bold ${typeColor}`}>
          {post.type}
        </span>
        <span className="text-xs text-gray-400">{post.createdAt}</span>
      </div>
      <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-yellow-500 transition-colors">
        {post.title}
      </h3>
      <p className="text-sm text-gray-600 mb-4">{post.institutionName} • {post.location}</p>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {post.tags.map((tag, idx) => (
          <span key={idx} className="bg-gray-50 text-gray-500 text-[10px] px-2 py-1 rounded-md border border-gray-100">
            #{tag}
          </span>
        ))}
      </div>
      
      <div className="flex items-center justify-between mt-auto pt-4 border-t border-dashed border-gray-100">
        <span className="text-sm font-semibold text-gray-700">{post.salary}</span>
        <button className="text-xs font-bold text-yellow-500 hover:underline">상세보기</button>
      </div>
    </div>
  );
};

export default PostCard;
