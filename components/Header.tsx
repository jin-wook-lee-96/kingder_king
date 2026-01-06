
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <div className="bg-yellow-400 p-2 rounded-xl">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <span className="text-xl font-bold text-gray-800">아이들림</span>
          </div>
          <nav className="hidden md:flex space-x-8 text-sm font-medium text-gray-600">
            <a href="#" className="hover:text-yellow-500 transition-colors">채용 공고</a>
            <a href="#" className="hover:text-yellow-500 transition-colors">기관 홍보</a>
            <a href="#" className="hover:text-yellow-500 transition-colors">커뮤니티</a>
            <a href="#" className="hover:text-yellow-500 transition-colors text-yellow-500">AI 공고 도우미</a>
          </nav>
          <div className="flex items-center gap-4">
            <button className="text-sm font-medium text-gray-500 hover:text-gray-700">로그인</button>
            <button className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-md transition-all">
              공고 등록
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
