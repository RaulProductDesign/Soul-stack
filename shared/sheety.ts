export interface QuestionCard {
  id: number;
  question: string;
  category: string;
}

export interface SheetyResponse {
  sheet1: QuestionCard[];
}

export type CategoryType = 'friends' | 'partner' | 'family';
