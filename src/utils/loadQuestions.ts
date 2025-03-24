import questionsData from '../../assets/questions.json';

export interface Question {
  id: number;
  jp: string;
  en: string;
}

export const loadQuestions = (): Question[] => {
  return questionsData.map(question => ({
    id: question.id,
    jp: question.jp,
    en: question.en
  }));
};