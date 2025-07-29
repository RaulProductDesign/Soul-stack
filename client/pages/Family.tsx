import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchQuestionsByCategory } from "@/lib/questionsService";
import { QuestionCard } from "@shared/sheety";

export default function Family() {
  const [questions, setQuestions] = useState<QuestionCard[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        setLoading(true);
        const familyQuestions = await fetchQuestionsByCategory('family');
        setQuestions(familyQuestions);
        setError(null);
      } catch (err) {
        setError('Failed to load questions. Please try again.');
        console.error('Error loading questions:', err);
      } finally {
        setLoading(false);
      }
    };

    loadQuestions();
  }, []);

  const nextCard = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevCard = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const currentQuestion = questions[currentIndex];

  return (
    <div className="min-h-screen bg-soul-background flex flex-col">
      {/* Back Button */}
      <div className="p-4 pt-16">
        <Link 
          to="/"
          className="inline-flex h-10 px-4 items-center gap-2 rounded-full border border-soul-text hover:bg-soul-text/5 transition-colors"
        >
          <svg 
            className="w-6 h-6" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path 
              fillRule="evenodd" 
              clipRule="evenodd" 
              d="M8.61092 11.293L14.2679 5.63601L15.6819 7.05001L10.7319 12L15.6819 16.95L14.2679 18.364L8.61092 12.707C8.42344 12.5195 8.31813 12.2652 8.31813 12C8.31813 11.7348 8.42344 11.4805 8.61092 11.293Z" 
              fill="#4D4845"
            />
          </svg>
          <span className="text-soul-text font-lora text-lg font-medium">
            back
          </span>
        </Link>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col justify-center items-center px-4 pb-20">
        <div className="flex flex-col items-center w-full max-w-sm gap-8">
          {/* Title */}
          <h1 className="text-soul-text-subtle text-center font-lora text-2xl font-bold tracking-tight">
            Family
          </h1>
          
          {/* Loading State */}
          {loading && (
            <div className="w-full h-56 rounded-3xl bg-soul-family shadow-lg p-6 flex items-center justify-center">
              <p className="text-soul-text font-lora text-lg font-medium text-center">
                Loading questions...
              </p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="w-full h-56 rounded-3xl bg-soul-family shadow-lg p-6 flex items-center justify-center">
              <p className="text-soul-text font-lora text-lg font-medium text-center">
                {error}
              </p>
            </div>
          )}

          {/* Questions Card Stack */}
          {!loading && !error && questions.length > 0 && (
            <>
              <div className="relative w-full">
                {/* Card Stack Background Cards */}
                {currentIndex < questions.length - 2 && (
                  <div 
                    className="absolute inset-x-0 top-4 mx-2 h-52 rounded-3xl bg-soul-family shadow-md transform scale-95"
                    style={{ zIndex: 1 }}
                  />
                )}
                
                {currentIndex < questions.length - 1 && (
                  <div 
                    className="absolute inset-x-0 top-2 mx-1 h-52 rounded-3xl bg-soul-family shadow-md transform scale-97"
                    style={{ zIndex: 2 }}
                  />
                )}
                
                {/* Main Card */}
                <div 
                  className="relative h-56 rounded-3xl bg-soul-family shadow-lg p-6 flex items-center justify-center"
                  style={{ zIndex: 3 }}
                >
                  <p className="text-soul-text font-lora text-lg font-medium text-center leading-relaxed">
                    {currentQuestion?.question}
                  </p>
                </div>
              </div>

              {/* Navigation Controls */}
              <div className="flex items-center justify-between w-full px-4 gap-4">
                <button
                  onClick={prevCard}
                  disabled={currentIndex === 0}
                  className="flex-1 px-6 py-3 rounded-full border border-soul-text disabled:opacity-50 disabled:cursor-not-allowed hover:bg-soul-text/5 transition-colors"
                >
                  <span className="text-soul-text font-lora text-sm">Previous</span>
                </button>
                
                <button
                  onClick={nextCard}
                  disabled={currentIndex === questions.length - 1}
                  className="flex-1 px-6 py-3 rounded-full border border-soul-text disabled:opacity-50 disabled:cursor-not-allowed hover:bg-soul-text/5 transition-colors"
                >
                  <span className="text-soul-text font-lora text-sm">Next</span>
                </button>
              </div>
            </>
          )}

          {/* No Questions State */}
          {!loading && !error && questions.length === 0 && (
            <div className="w-full h-56 rounded-3xl bg-soul-family shadow-lg p-6 flex items-center justify-center">
              <p className="text-soul-text font-lora text-lg font-medium text-center">
                No questions found for family category.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
