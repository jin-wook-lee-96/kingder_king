
import React, { useState } from 'react';
import { JobPost, AISummaryResponse } from '../types';

interface JobDetailModalProps {
  post: JobPost;
  aiAnalysis: AISummaryResponse | null;
  isAnalyzing: boolean;
  onClose: () => void;
}

const JobDetailModal: React.FC<JobDetailModalProps> = ({ post, aiAnalysis, isAnalyzing, onClose }) => {
  const [isFullScreen, setIsFullScreen] = useState(false);

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-8 animate-fade-in">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm" 
        onClick={onClose}
      />
      
      {/* Modal Card */}
      <div className={`
        relative bg-white shadow-2xl overflow-hidden flex flex-col transition-all duration-500 ease-in-out
        ${isFullScreen ? 'w-full h-full rounded-none' : 'w-full max-w-4xl max-h-[90vh] rounded-[2.5rem]'}
      `}>
        {/* Header Section */}
        <div className="flex justify-between items-start p-6 md:p-8 border-b border-gray-100 bg-white sticky top-0 z-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-bold border border-yellow-100">
                {post.type}
              </span>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-gray-400">
                {post.id.padStart(4, '0')}
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-gray-800 leading-tight">
              {post.institutionName}
            </h2>
            <p className="text-gray-500 mt-1 font-medium">{post.title}</p>
          </div>
          
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setIsFullScreen(!isFullScreen)}
              className="p-3 hover:bg-gray-50 rounded-full transition-colors text-gray-400 hover:text-yellow-500"
              title={isFullScreen ? "축소하기" : "전체 화면"}
            >
              {isFullScreen ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                </svg>
              )}
            </button>
            <button 
              onClick={onClose}
              className="p-3 hover:bg-gray-50 rounded-full transition-colors text-gray-400 hover:text-red-500"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-10 custom-scrollbar">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left: Info Grid */}
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 p-5 rounded-3xl border border-slate-100 group transition-all hover:bg-white hover:shadow-md">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-tighter mb-1">지역</p>
                  <p className="text-sm font-bold text-gray-700">{post.location}</p>
                </div>
                <div className="bg-slate-50 p-5 rounded-3xl border border-slate-100 group transition-all hover:bg-white hover:shadow-md">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-tighter mb-1">구인직종</p>
                  <p className="text-sm font-bold text-gray-700">{post.category}</p>
                </div>
                <div className="bg-slate-50 p-5 rounded-3xl border border-slate-100 group transition-all hover:bg-white hover:shadow-md">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-tighter mb-1">경력조건</p>
                  <p className="text-sm font-bold text-gray-700">{post.experience}</p>
                </div>
                <div className="bg-slate-50 p-5 rounded-3xl border border-slate-100 group transition-all hover:bg-white hover:shadow-md">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-tighter mb-1">희망급여</p>
                  <p className="text-sm font-bold text-gray-700">{post.salary}</p>
                </div>
              </div>

              <div className="p-6 bg-red-50/30 border border-red-100 rounded-3xl">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-red-500 uppercase tracking-widest">채용 마감일</span>
                  <span className="text-lg font-black text-red-600">{post.deadline}</span>
                </div>
              </div>
            </div>

            {/* Right: AI Summary Section */}
            <div className="p-8 bg-yellow-50/50 rounded-[2rem] border border-yellow-100 relative shadow-sm">
              <h4 className="text-xs font-black text-yellow-600 uppercase mb-4 flex items-center gap-1.5">
                <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></span>
                AI 분석 및 추천 레포트
              </h4>
              
              {isAnalyzing ? (
                <div className="flex flex-col items-center justify-center py-10 space-y-4">
                  <div className="flex gap-2">
                    <div className="h-3 w-3 bg-yellow-300 rounded-full animate-bounce"></div>
                    <div className="h-3 w-3 bg-yellow-300 rounded-full animate-bounce delay-75"></div>
                    <div className="h-3 w-3 bg-yellow-300 rounded-full animate-bounce delay-150"></div>
                  </div>
                  <p className="text-xs text-yellow-600 font-bold">공고문을 정밀 분석하는 중...</p>
                </div>
              ) : aiAnalysis ? (
                <div className="space-y-6">
                  <div className="bg-white/60 p-5 rounded-2xl border border-white/80 shadow-inner">
                    <p className="text-sm font-bold text-gray-800 leading-relaxed italic">"{aiAnalysis.summary}"</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">선생님들께 추천하는 이유</p>
                      <ul className="text-xs text-gray-600 space-y-2">
                        {aiAnalysis.pros.map((pro, i) => (
                          <li key={i} className="flex gap-2 bg-white/40 p-2 rounded-lg">
                            <span className="text-yellow-500">✨</span>
                            {pro}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="space-y-3">
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">지원 합격 꿀팁</p>
                      <ul className="text-xs text-gray-600 space-y-2">
                        {aiAnalysis.tips.map((tip, i) => (
                          <li key={i} className="flex gap-2 bg-white/40 p-2 rounded-lg">
                            <span className="text-blue-500">💡</span>
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-10 text-gray-400 text-xs">AI 정보를 불러올 수 없습니다.</div>
              )}
            </div>
          </div>

          {/* Job Content Detail */}
          <div className="space-y-4 pb-10">
            <h4 className="text-xl font-black text-gray-800 border-l-4 border-yellow-400 pl-4">상세 채용 요강</h4>
            <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm leading-loose text-gray-600 text-justify whitespace-pre-wrap text-base">
              {post.content}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 md:p-8 border-t border-gray-100 bg-white/80 backdrop-blur-md flex gap-4 sticky bottom-0 z-10">
          <button className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-white font-black py-5 rounded-2xl shadow-xl transition-all transform active:scale-95 text-lg">
            즉시 지원하기
          </button>
          <button className="px-8 border border-gray-100 rounded-2xl hover:bg-gray-50 transition-colors group">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400 group-hover:text-red-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobDetailModal;
