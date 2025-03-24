import questions from '../../assets/questions.json';

interface Question {
  question: string;
  options: string[];
  correctAnswer: string;
}

export const loadQuestions = (): Question[] => {
  return questions as Question[];
};