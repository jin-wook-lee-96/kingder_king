
import { GoogleGenAI, Type } from "@google/genai";
import { AISummaryResponse } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const summarizePost = async (content: string): Promise<AISummaryResponse> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `다음 유아교육 기관의 채용 공고 내용을 분석해서 요약해줘: \n\n ${content}`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: { type: Type.STRING, description: "공고의 핵심 내용을 한 문장으로 요약" },
            pros: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING },
              description: "해당 공고의 장점이나 혜택 3가지"
            },
            tips: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING },
              description: "지원자를 위한 면접이나 자소서 팁 2가지"
            }
          },
          required: ["summary", "pros", "tips"]
        }
      }
    });

    return JSON.parse(response.text);
  } catch (error) {
    console.error("Gemini API Error:", error);
    return {
      summary: "AI 요약에 실패했습니다.",
      pros: ["직접 내용을 확인해주세요."],
      tips: ["문의처로 직접 연락해보는 것이 가장 정확합니다."]
    };
  }
};

export const generateJobDescription = async (requirements: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `다음 조건을 바탕으로 유치원/어린이집 채용 공고문을 전문가스럽고 따뜻하게 작성해줘: \n\n ${requirements}`,
      config: {
        systemInstruction: "당신은 유아교육 채용 전문 컨설턴트입니다. 구인자(원장님/부장님)의 입장에서 신뢰감 있고 따뜻한 어조를 사용하세요."
      }
    });
    return response.text;
  } catch (error) {
    return "공고문 생성 중 오류가 발생했습니다.";
  }
};

export const generateSelfIntro = async (info: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `다음 정보를 바탕으로 유치원/어린이집 지원을 위한 자기소개서 핵심 단락을 작성해줘: \n\n ${info}`,
      config: {
        systemInstruction: "당신은 유아교육 취업 컨설턴트입니다. 구직자(교사)의 입장에서 자신의 역량과 아이들에 대한 사랑이 잘 드러나도록 전문적이고 진정성 있게 작성하세요."
      }
    });
    return response.text;
  } catch (error) {
    return "자기소개서 생성 중 오류가 발생했습니다.";
  }
};
