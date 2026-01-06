
import React, { useState } from 'react';
import { generateJobDescription, generateSelfIntro } from '../services/geminiService';

const AIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'recruiter' | 'applicant'>('recruiter');
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async () => {
    if (!prompt) return;
    setIsLoading(true);
    setResult('');
    try {
      const content = activeTab === 'recruiter' 
        ? await generateJobDescription(prompt) 
        : await generateSelfIntro(prompt);
      setResult(content);
    } catch (err) {
      setResult("생성 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  const reset = (tab: 'recruiter' | 'applicant') => {
    setActiveTab(tab);
    setPrompt('');
    setResult('');
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-yellow-400 hover:bg-yellow-500 text-white p-4 rounded-full shadow-2xl z-40 flex items-center gap-2 animate-pulse hover:animate-none transition-all"
      >
        <div className="bg-white/20 p-1 rounded-full">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <span className="font-bold">AI 센터</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[2rem] w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
            <div className="p-8 bg-yellow-400 text-white">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold">아이들림 AI 센터</h2>
                  <p className="text-sm opacity-90 mt-1">유아교육 전문가 수준의 텍스트 생성을 도와드립니다.</p>
                </div>
                <button onClick={() => setIsOpen(false)} className="bg-white/20 p-2 hover:bg-white/30 rounded-full transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="flex bg-yellow-500/50 p-1 rounded-xl">
                <button 
                  onClick={() => reset('recruiter')}
                  className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${activeTab === 'recruiter' ? 'bg-white text-yellow-500 shadow-sm' : 'text-white/80 hover:text-white'}`}
                >
                  기관용 (공고 작성)
                </button>
                <button 
                  onClick={() => reset('applicant')}
                  className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${activeTab === 'applicant' ? 'bg-white text-yellow-500 shadow-sm' : 'text-white/80 hover:text-white'}`}
                >
                  지원자용 (자소서/팁)
                </button>
              </div>
            </div>
            
            <div className="p-8 overflow-y-auto space-y-6">
              <div className="space-y-3">
                <label className="text-sm font-bold text-gray-700">
                  {activeTab === 'recruiter' ? '공고에 포함될 주요 조건' : '나의 경력과 강점 키워드'}
                </label>
                <textarea 
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder={activeTab === 'recruiter' 
                    ? "예: 서초구 정교사, 연봉 3500, 영아반 유경험자 우대..." 
                    : "예: 보육교사 지원, 경력 5년, 아이들의 감성 교육과 숲 체험 활동에 강점이 있음..."}
                  className="w-full h-32 p-4 border border-gray-100 bg-gray-50 rounded-2xl focus:ring-2 focus:ring-yellow-400 focus:bg-white outline-none resize-none text-sm transition-all"
                />
              </div>

              <button 
                onClick={handleGenerate}
                disabled={isLoading || !prompt}
                className="w-full bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-4 rounded-2xl shadow-lg transition-all disabled:opacity-50 flex justify-center items-center gap-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    작성 중...
                  </>
                ) : (
                  activeTab === 'recruiter' ? '전문가 공고문 생성' : '자소서 핵심문장 생성'
                )}
              </button>

              {result && (
                <div className="mt-8 animate-fade-in">
                  <div className="flex justify-between items-center mb-3">
                    <label className="text-sm font-bold text-gray-700">AI가 제안하는 내용</label>
                    <button 
                      onClick={() => {
                        navigator.clipboard.writeText(result);
                        alert('클립보드에 복사되었습니다!');
                      }}
                      className="text-xs text-yellow-600 font-bold bg-yellow-50 px-3 py-1.5 rounded-full hover:bg-yellow-100 transition-colors"
                    >
                      복사하기
                    </button>
                  </div>
                  <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 text-sm leading-relaxed whitespace-pre-wrap text-gray-700 shadow-inner">
                    {result}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AIAssistant;
