export interface QuestionCard {
  id: number;
  question: string;
  category: string;
  layer: number;
}

export interface SheetyResponse {
  questionsWithLevel: QuestionCard[];
}

export type CategoryType = 'friends' | 'partner' | 'family';
export type LayerType = 1 | 2 | 3;

export const LAYER_NAMES = {
  1: 'Break the Ice',
  2: 'Getting Real', 
  3: 'Go Deep'
} as const;
