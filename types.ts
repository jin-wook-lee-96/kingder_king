
export enum InstitutionType {
  KINDERGARTEN = '유치원',
  DAYCARE = '어린이집',
  OTHER = '기타'
}

export type JobCategory = '정교사' | '보육교사' | '연장반교사' | '보조교사' | '미술교사' | '음악교사' | '체육교사' | '학습지교사' | '특기교사';
export type ExperienceLevel = '신입' | '1-3년' | '3-5년' | '5년 이상' | '경력무관';
export type LocationArea = '서울' | '경기' | '인천' | '부산' | '대구' | '대전' | '광주' | '기타';

export interface JobPost {
  id: string;
  title: string;
  institutionName: string;
  type: InstitutionType;
  category: JobCategory;
  location: string;
  area: LocationArea;
  salary: string;
  experience: ExperienceLevel;
  deadline: string;
  content: string;
  tags: string[];
  createdAt: string;
}

export interface AISummaryResponse {
  summary: string;
  pros: string[];
  tips: string[];
}
