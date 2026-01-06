
import { JobPost, InstitutionType } from './types';

export const LOCATIONS: string[] = ['서울', '경기', '인천', '부산', '대구', '대전', '광주', '기타'];
export const CATEGORIES: string[] = ['정교사', '보육교사', '연장반교사', '보조교사', '미술교사', '음악교사', '체육교사', '학습지교사', '특기교사'];
export const EXPERIENCES: string[] = ['신입', '1-3년', '3-5년', '5년 이상', '경력무관'];

export const MOCK_POSTS: JobPost[] = [
  {
    id: '1',
    title: '햇살유치원 정교사 및 부담임 교사 채용 공고',
    institutionName: '햇살유치원',
    type: InstitutionType.KINDERGARTEN,
    category: '정교사',
    location: '서울시 서초구',
    area: '서울',
    salary: '연봉 3,200만원 이상',
    experience: '1-3년',
    deadline: '2024-05-30',
    content: '저희 햇살유치원에서는 아이들을 사랑하는 마음으로 함께 성장해 나갈 정교사를 모집합니다. 유아교육 전공자 및 정교사 2급 자격증 소지자를 대상으로 하며, 다양한 연수 기회를 제공합니다.',
    tags: ['정규직', '교통비지원', '연차제도'],
    createdAt: '2024-05-01'
  },
  {
    id: '2',
    title: '꿈나무 어린이집 영아반 보조교사 급구',
    institutionName: '꿈나무 어린이집',
    type: InstitutionType.DAYCARE,
    category: '보조교사',
    location: '경기도 성남시 분당구',
    area: '경기',
    salary: '시급 11,000원',
    experience: '신입',
    deadline: '채용시까지',
    content: '영아반 아이들을 따뜻하게 돌봐주실 보조교사 선생님을 모십니다. 오후 파트타임 근무이며, 보육교사 자격증 필수입니다.',
    tags: ['단기알바', '파트타임', '초보환영'],
    createdAt: '2024-05-03'
  },
  {
    id: '3',
    title: '아트팡 미술학원 창의미술 전임교사 채용',
    institutionName: '아트팡 미술센터',
    type: InstitutionType.OTHER,
    category: '미술교사',
    location: '인천시 연수구',
    area: '인천',
    salary: '월 280만원',
    experience: '3-5년',
    deadline: '2024-06-10',
    content: '아이들의 창의력을 함께 키워나갈 열정적인 미술 선생님을 모십니다. 아동미술 경력자를 우대합니다.',
    tags: ['미술교육', '인센티브', '쾌적한환경'],
    createdAt: '2024-05-05'
  },
  {
    id: '4',
    title: '서울시립 푸른숲 어린이집 연장반 교사 채용',
    institutionName: '푸른숲 어린이집',
    type: InstitutionType.DAYCARE,
    category: '연장반교사',
    location: '서울시 강남구',
    area: '서울',
    salary: '월 250만원선',
    experience: '경력무관',
    deadline: '2024-06-15',
    content: '국공립 어린이집에서 함께하실 열정적인 선생님을 기다립니다. 연장반 전담 교사로서 안정적인 근무 환경을 보장합니다.',
    tags: ['국공립', '복리후생우수', '4대보험'],
    createdAt: '2024-05-02'
  },
  {
    id: '5',
    title: '방문 학습지 교사 (한글/수학) 파트타임 모집',
    institutionName: '아이똑똑 교육',
    type: InstitutionType.OTHER,
    category: '학습지교사',
    location: '부산시 해운대구',
    area: '부산',
    salary: '건당 수수료제',
    experience: '신입',
    deadline: '상시모집',
    content: '가정 방문을 통해 아이들의 기초 학습을 도와주실 선생님을 모십니다. 유아 교육에 열정이 있는 분이라면 누구나 환영합니다.',
    tags: ['유연한근무', '자차필수', '인센티브'],
    createdAt: '2024-05-06'
  }
];
