import { QuestionCard, SheetyResponse, CategoryType, LayerType } from '@shared/sheety';

const SHEETY_API_URL = 'https://api.sheety.co/8066c7c9e5203e8d27825f3e41eebddb/questionsWithLevel/questionsWithLevel';

// Fisher-Yates shuffle algorithm for randomizing array
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export async function fetchQuestionsByCategory(category: CategoryType): Promise<QuestionCard[]> {
  try {
    const response = await fetch(SHEETY_API_URL);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch questions: ${response.status}`);
    }
    
    const data: SheetyResponse = await response.json();
    
    // Filter questions by category
    const filteredQuestions = data.questionsWithLevel.filter(
      question => question.category.toLowerCase() === category.toLowerCase()
    );
    
    // Randomize the order of questions
    const randomizedQuestions = shuffleArray(filteredQuestions);
    
    return randomizedQuestions;
  } catch (error) {
    console.error('Error fetching questions:', error);
    throw error;
  }
}

export async function fetchQuestionsByCategoryAndLayer(category: CategoryType, layer: LayerType): Promise<QuestionCard[]> {
  try {
    const response = await fetch(SHEETY_API_URL);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch questions: ${response.status}`);
    }
    
    const data: SheetyResponse = await response.json();
    
    // Filter questions by category and layer
    const filteredQuestions = data.questionsWithLevel.filter(
      question => question.category.toLowerCase() === category.toLowerCase() && question.layer === layer
    );
    
    // Randomize the order of questions
    const randomizedQuestions = shuffleArray(filteredQuestions);
    
    return randomizedQuestions;
  } catch (error) {
    console.error('Error fetching questions:', error);
    throw error;
  }
}

export async function fetchAllQuestions(): Promise<QuestionCard[]> {
  try {
    const response = await fetch(SHEETY_API_URL);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch questions: ${response.status}`);
    }
    
    const data: SheetyResponse = await response.json();
    return shuffleArray(data.questionsWithLevel);
  } catch (error) {
    console.error('Error fetching questions:', error);
    throw error;
  }
}
