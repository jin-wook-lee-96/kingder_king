
import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import PostCard from './components/PostCard';
import AIAssistant from './components/AIAssistant';
import { MOCK_POSTS, LOCATIONS, CATEGORIES, EXPERIENCES } from './constants';
import { JobPost, AISummaryResponse } from './types';
import { summarizePost } from './services/geminiService';

const App: React.FC = () => {
  const [posts] = useState<JobPost[]>(MOCK_POSTS);
  const [selectedPost, setSelectedPost] = useState<JobPost | null>(null);
  const [aiAnalysis, setAiAnalysis] = useState<AISummaryResponse | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  
  // Filter States
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedArea, setSelectedArea] = useState<string>('전체');
  const [selectedCategory, setSelectedCategory] = useState<string>('전체');
  const [selectedExp, setSelectedExp] = useState<string>('전체');

  const handleSelectPost = async (post: JobPost) => {
    setSelectedPost(post);
    setAiAnalysis(null);
    setIsAnalyzing(true);
    try {
      const summary = await summarizePost(post.content);
      setAiAnalysis(summary);
    } catch (err) {
      console.error(err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const filteredPosts = useMemo(() => {
    return posts.filter(p => {
      const matchSearch = searchTerm === '' || 
        p.title.includes(searchTerm) || 
        p.institutionName.includes(searchTerm);
      const matchArea = selectedArea === '전체' || p.area === selectedArea;
      const matchCategory = selectedCategory === '전체' || p.category === selectedCategory;
      const matchExp = selectedExp === '전체' || p.experience === selectedExp;
      return matchSearch && matchArea && matchCategory && matchExp;
    });
  }, [posts, searchTerm, selectedArea, selectedCategory, selectedExp]);

  return (
    <div className="min-h-screen pb-20 bg-slate-50/50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-12 text-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
            내일의 교육을 이끌어갈<br/> 
            <span className="text-yellow-500">따뜻한 교사</span>를 연결합니다.
          </h1>
          
          <div className="max-w-4xl mx-auto space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <input 
                type="text" 
                placeholder="기관명이나 키워드를 검색해보세요" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-8 py-5 rounded-3xl border-2 border-gray-100 focus:border-yellow-400 outline-none shadow-xl transition-all text-lg pr-16 bg-white"
              />
              <div className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* Filter Group */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-2xl border border-gray-100 shadow-sm">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">지역</span>
                <select 
                  className="bg-transparent text-sm font-semibold outline-none cursor-pointer text-gray-700"
                  value={selectedArea}
                  onChange={(e) => setSelectedArea(e.target.value)}
                >
                  <option value="전체">전국</option>
                  {LOCATIONS.map(loc => <option key={loc} value={loc}>{loc}</option>)}
                </select>
              </div>

              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-2xl border border-gray-100 shadow-sm">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">구인직종</span>
                <select 
                  className="bg-transparent text-sm font-semibold outline-none cursor-pointer text-gray-700"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="전체">모든직종</option>
                  {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
              </div>

              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-2xl border border-gray-100 shadow-sm">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">경력</span>
                <select 
                  className="bg-transparent text-sm font-semibold outline-none cursor-pointer text-gray-700"
                  value={selectedExp}
                  onChange={(e) => setSelectedExp(e.target.value)}
                >
                  <option value="전체">경력무관</option>
                  {EXPERIENCES.map(exp => <option key={exp} value={exp}>{exp}</option>)}
                </select>
              </div>
              
              {(selectedArea !== '전체' || selectedCategory !== '전체' || selectedExp !== '전체' || searchTerm !== '') && (
                <button 
                  onClick={() => { setSelectedArea('전체'); setSelectedCategory('전체'); setSelectedExp('전체'); setSearchTerm(''); }}
                  className="text-xs font-bold text-red-400 hover:text-red-500 underline ml-2"
                >
                  필터 초기화
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <div className="flex justify-between items-center px-2">
              <h3 className="text-sm font-bold text-gray-500">전체 <span className="text-yellow-500">{filteredPosts.length}</span>건의 공고</h3>
              <div className="flex gap-4">
                <button className="text-xs font-bold text-gray-400 hover:text-gray-600">최신순</button>
                <button className="text-xs font-bold text-gray-400 hover:text-gray-600">마감임박순</button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredPosts.length > 0 ? (
                filteredPosts.map(post => (
                  <PostCard key={post.id} post={post} onSelect={handleSelectPost} />
                ))
              ) : (
                <div className="col-span-full py-32 flex flex-col items-center justify-center bg-white rounded-3xl border border-dashed border-gray-200">
                  <div className="bg-gray-50 p-4 rounded-full mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 9.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p className="text-gray-400 font-medium">선택한 조건에 맞는 공고가 없어요.</p>
                  <button onClick={() => { setSelectedArea('전체'); setSelectedCategory('전체'); setSelectedExp('전체'); setSearchTerm(''); }} className="mt-2 text-sm text-yellow-500 font-bold">전체 공고 보기</button>
                </div>
              )}
            </div>
          </div>

          <aside className="lg:col-span-1">
            {selectedPost ? (
              <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-2xl sticky top-24 overflow-hidden animate-slide-up">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-yellow-500 mb-1 block">Detail View</span>
                    <h2 className="text-2xl font-bold text-gray-800 leading-tight">{selectedPost.institutionName}</h2>
                  </div>
                  <button onClick={() => setSelectedPost(null)} className="p-2 hover:bg-gray-50 rounded-full transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                {/* AI Summary Section */}
                <div className="mb-8 p-6 bg-yellow-50/50 rounded-3xl border border-yellow-100 relative group transition-all hover:bg-yellow-50">
                  <h4 className="text-xs font-black text-yellow-600 uppercase mb-3 flex items-center gap-1.5">
                    <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></span>
                    AI 분석 Report
                  </h4>
                  {isAnalyzing ? (
                    <div className="flex items-center gap-2 py-4">
                      <div className="h-3 w-3 bg-yellow-300 rounded-full animate-bounce"></div>
                      <div className="h-3 w-3 bg-yellow-300 rounded-full animate-bounce delay-75"></div>
                      <div className="h-3 w-3 bg-yellow-300 rounded-full animate-bounce delay-150"></div>
                    </div>
                  ) : aiAnalysis ? (
                    <div className="space-y-5">
                      <p className="text-sm font-semibold text-gray-800 leading-relaxed italic">"{aiAnalysis.summary}"</p>
                      <div className="grid grid-cols-1 gap-4">
                        <div className="space-y-1.5">
                          <p className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">이런 점이 좋아요</p>
                          <ul className="text-xs text-gray-600 space-y-1">
                            {aiAnalysis.pros.map((pro, i) => <li key={i} className="flex gap-2"><span>✨</span>{pro}</li>)}
                          </ul>
                        </div>
                        <div className="space-y-1.5">
                          <p className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">지원 꿀팁</p>
                          <ul className="text-xs text-gray-600 space-y-1">
                            {aiAnalysis.tips.map((tip, i) => <li key={i} className="flex gap-2"><span>💡</span>{tip}</li>)}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <p className="text-xs text-gray-400">데이터를 불러오는 중...</p>
                  )}
                </div>

                <div className="space-y-6">
                  <div className="bg-gray-50/50 p-5 rounded-2xl space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-400">모집분야</span>
                      <span className="text-xs font-bold text-gray-700 bg-white px-2 py-1 rounded-lg border border-gray-100">{selectedPost.category}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-400">경력조건</span>
                      <span className="text-xs font-bold text-gray-700">{selectedPost.experience}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-400">희망급여</span>
                      <span className="text-xs font-bold text-gray-700">{selectedPost.salary}</span>
                    </div>
                  </div>
                  
                  <div className="px-1 max-h-48 overflow-y-auto custom-scrollbar">
                    <h4 className="text-sm font-bold text-gray-800 mb-2">상세 요강</h4>
                    <p className="text-sm text-gray-600 leading-loose text-justify whitespace-pre-wrap">{selectedPost.content}</p>
                  </div>

                  <div className="flex gap-2 pt-4">
                    <button className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-4 rounded-2xl shadow-xl transition-all transform active:scale-95">
                      즉시 지원
                    </button>
                    <button className="p-4 border border-gray-100 rounded-2xl hover:bg-gray-50 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-sm flex flex-col items-center justify-center text-center space-y-6 h-[600px] sticky top-24">
                <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-400">공고를 선택해주세요</h3>
                  <p className="text-sm text-gray-300 mt-2 px-6">공고를 선택하시면 AI가 지원에 필요한 핵심 정보와 성공 전략을 분석해 드립니다.</p>
                </div>
              </div>
            )}
          </aside>
        </div>
      </main>

      <AIAssistant />
      
      <footer className="mt-32 border-t border-gray-100 bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="text-left">
            <h4 className="text-lg font-bold text-gray-800 mb-2">아이들림 (Ai-Deul-Rim)</h4>
            <p className="text-sm text-gray-400">대한민국 모든 유아교육 교사들의 성장을 응원합니다.</p>
          </div>
          <p className="text-sm text-gray-400 md:text-right">© 2024 아이들림. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
