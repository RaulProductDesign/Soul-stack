import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { fetchQuestionsByCategory } from "@/lib/questionsService";
import { QuestionCard } from "@shared/sheety";

export default function Friends() {
  const [questions, setQuestions] = useState<QuestionCard[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        setLoading(true);
        const friendsQuestions = await fetchQuestionsByCategory('friends');
        setQuestions(friendsQuestions);
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

  // Touch event handlers for swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    if (questions.length <= 1) return;
    const touch = e.touches[0];
    setDragStart({ x: touch.clientX, y: touch.clientY });
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || questions.length <= 1) return;
    const touch = e.touches[0];
    const deltaX = touch.clientX - dragStart.x;
    const deltaY = touch.clientY - dragStart.y;
    
    // Only track horizontal swipes
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      setDragOffset({ x: deltaX, y: 0 });
    }
  };

  const handleTouchEnd = () => {
    if (!isDragging || questions.length <= 1) return;

    const threshold = 40; // Much lower threshold for easier swiping

    if (Math.abs(dragOffset.x) > threshold) {
      if (dragOffset.x > 0) {
        // Swipe right - go to previous card
        prevCard();
      } else {
        // Swipe left - go to next card
        nextCard();
      }
    }

    // Reset drag state
    setIsDragging(false);
    setDragOffset({ x: 0, y: 0 });
  };

  // Mouse event handlers for desktop
  const handleMouseDown = (e: React.MouseEvent) => {
    if (questions.length <= 1) return;
    setDragStart({ x: e.clientX, y: e.clientY });
    setIsDragging(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || questions.length <= 1) return;
    const deltaX = e.clientX - dragStart.x;
    const deltaY = e.clientY - dragStart.y;
    
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      setDragOffset({ x: deltaX, y: 0 });
    }
  };

  const handleMouseUp = () => {
    if (!isDragging || questions.length <= 1) return;
    
    const threshold = 100;
    
    if (Math.abs(dragOffset.x) > threshold) {
      if (dragOffset.x > 0) {
        prevCard();
      } else {
        nextCard();
      }
    }
    
    setIsDragging(false);
    setDragOffset({ x: 0, y: 0 });
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
            Friends
          </h1>
          
          {/* Loading State */}
          {loading && (
            <div className="w-full h-56 rounded-3xl bg-soul-friends shadow-lg p-6 flex items-center justify-center">
              <p className="text-soul-text font-lora text-lg font-medium text-center">
                Loading questions...
              </p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="w-full h-56 rounded-3xl bg-soul-friends shadow-lg p-6 flex items-center justify-center">
              <p className="text-soul-text font-lora text-lg font-medium text-center">
                {error}
              </p>
            </div>
          )}

          {/* Questions Card Stack */}
          {!loading && !error && questions.length > 0 && (
            <>
              <div className="relative w-full touch-none">
                {/* Card Stack Background Cards */}
                {currentIndex < questions.length - 2 && (
                  <div 
                    className="absolute inset-x-0 top-4 mx-2 h-52 rounded-3xl bg-soul-friends shadow-md transform scale-95"
                    style={{ zIndex: 1 }}
                  />
                )}
                
                {currentIndex < questions.length - 1 && (
                  <div 
                    className="absolute inset-x-0 top-2 mx-1 h-52 rounded-3xl bg-soul-friends shadow-md transform scale-97"
                    style={{ zIndex: 2 }}
                  />
                )}
                
                {/* Main Card */}
                <div 
                  ref={cardRef}
                  className="relative h-56 rounded-3xl bg-soul-friends shadow-lg p-6 flex items-center justify-center cursor-grab active:cursor-grabbing select-none transition-transform duration-200"
                  style={{ 
                    zIndex: 3,
                    transform: `translateX(${dragOffset.x}px) ${isDragging ? 'rotate(' + (dragOffset.x * 0.1) + 'deg)' : ''}`,
                    opacity: isDragging ? Math.max(0.7, 1 - Math.abs(dragOffset.x) / 300) : 1
                  }}
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseUp}
                >
                  <p className="text-soul-text font-lora text-lg font-medium text-center leading-relaxed">
                    {currentQuestion?.question}
                  </p>
                </div>
              </div>

              {/* Swipe Instructions */}
              <div className="flex flex-col items-center gap-2">
                <p className="text-soul-text-subtle font-lato text-sm text-center opacity-75">
                  Swipe left for next • Swipe right for previous
                </p>
                {currentIndex > 0 && (
                  <button
                    onClick={prevCard}
                    className="px-4 py-1 rounded-full text-soul-text-subtle font-lato text-xs hover:bg-soul-text/5 transition-colors"
                  >
                    See previous
                  </button>
                )}
              </div>
            </>
          )}

          {/* No Questions State */}
          {!loading && !error && questions.length === 0 && (
            <div className="w-full h-56 rounded-3xl bg-soul-friends shadow-lg p-6 flex items-center justify-center">
              <p className="text-soul-text font-lora text-lg font-medium text-center">
                No questions found for friends category.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
