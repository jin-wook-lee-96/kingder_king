
import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import PostCard from './components/PostCard';
import AIAssistant from './components/AIAssistant';
import JobDetailModal from './components/JobDetailModal';
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

        {/* Main Feed - Now takes more space since side-detail is gone */}
        <div className="max-w-5xl mx-auto space-y-6">
          <div className="flex justify-between items-center px-4">
            <h3 className="text-base font-bold text-gray-500">
              전체 <span className="text-yellow-500">{filteredPosts.length}</span>건의 맞춤 공고가 있습니다
            </h3>
            <div className="flex gap-4">
              <button className="text-xs font-bold text-gray-400 hover:text-gray-600 transition-colors">최신순</button>
              <button className="text-xs font-bold text-gray-400 hover:text-gray-600 transition-colors">마감임박순</button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {filteredPosts.length > 0 ? (
              filteredPosts.map(post => (
                <PostCard key={post.id} post={post} onSelect={handleSelectPost} />
              ))
            ) : (
              <div className="col-span-full py-32 flex flex-col items-center justify-center bg-white rounded-[3rem] border border-dashed border-gray-200">
                <div className="bg-slate-50 p-6 rounded-full mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 9.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-gray-400 font-bold text-lg">검색 조건에 맞는 공고가 없어요.</p>
                <p className="text-sm text-gray-300 mt-1">필터를 조정하거나 다른 키워드로 검색해보세요.</p>
                <button 
                  onClick={() => { setSelectedArea('전체'); setSelectedCategory('전체'); setSelectedExp('전체'); setSearchTerm(''); }} 
                  className="mt-6 px-6 py-2 bg-yellow-400 text-white rounded-full font-bold text-sm shadow-md transition-all hover:bg-yellow-500"
                >
                  필터 초기화하기
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* AI Floating Assistant */}
      <AIAssistant />

      {/* Detail Modal - Replaces the aside element */}
      {selectedPost && (
        <JobDetailModal 
          post={selectedPost}
          aiAnalysis={aiAnalysis}
          isAnalyzing={isAnalyzing}
          onClose={() => setSelectedPost(null)}
        />
      )}
      
      <footer className="mt-32 border-t border-gray-100 bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-center text-center space-y-6">
          <div className="bg-yellow-50 p-4 rounded-3xl inline-block">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <div>
            <h4 className="text-2xl font-black text-gray-800 mb-2">아이들림 (Ai-Deul-Rim)</h4>
            <p className="text-gray-400 text-sm max-w-sm">대한민국 모든 유아교육 교사들과 기관의 성장을 연결하는 가장 스마트한 방법.</p>
          </div>
          <div className="flex gap-6 text-sm font-bold text-gray-500">
            <a href="#" className="hover:text-yellow-500">이용약관</a>
            <a href="#" className="hover:text-yellow-500">개인정보처리방침</a>
            <a href="#" className="hover:text-yellow-500">고객센터</a>
          </div>
          <p className="text-xs text-gray-300 pt-6">© 2024 아이들림. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
