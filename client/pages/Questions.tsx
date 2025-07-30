import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchQuestionsByCategoryAndLayer } from "@/lib/questionsService";
import {
  QuestionCard,
  CategoryType,
  LayerType,
  LAYER_NAMES,
} from "@shared/sheety";

const CATEGORY_COLORS = {
  friends: "soul-friends",
  partner: "soul-partner",
  family: "soul-family",
} as const;

export default function Questions() {
  const { category, layer } = useParams<{ category: string; layer: string }>();
  const [questions, setQuestions] = useState<QuestionCard[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const categoryType = category as CategoryType;
  const layerType = parseInt(layer || "1") as LayerType;
  const categoryColor = CATEGORY_COLORS[categoryType] || "soul-friends";
  const layerName = LAYER_NAMES[layerType] || "Break the Ice";

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        setLoading(true);
        const categoryQuestions = await fetchQuestionsByCategoryAndLayer(
          categoryType,
          layerType,
        );
        setQuestions(categoryQuestions);
        setError(null);
      } catch (err) {
        setError("Failed to load questions. Please try again.");
        console.error("Error loading questions:", err);
      } finally {
        setLoading(false);
      }
    };

    if (categoryType && layerType) {
      loadQuestions();
    }
  }, [categoryType, layerType]);

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
          to={`/${category}`}
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
          <span className="text-soul-text font-lora text-sm sm:text-lg font-medium">
            back
          </span>
        </Link>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col justify-center items-center px-4 pb-20">
        <div className="flex flex-col items-center w-full max-w-sm gap-8">
          {/* Title */}
          <div className="text-center">
            <div className="text-soul-text font-lato text-xs font-normal mb-1">
              {layerType}st Layer
            </div>
            <h1 className="text-soul-text font-lora text-2xl font-bold tracking-tight capitalize">
              {categoryType}
            </h1>
          </div>

          {/* Loading State */}
          {loading && (
            <div
              className={`w-full h-56 rounded-3xl bg-${categoryColor} shadow-lg p-6 flex items-center justify-center`}
            >
              <p className="text-soul-text font-lora text-lg font-medium text-center">
                Loading questions...
              </p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div
              className={`w-full h-56 rounded-3xl bg-${categoryColor} shadow-lg p-6 flex items-center justify-center`}
            >
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
                    className={`absolute inset-x-0 top-4 mx-2 h-52 rounded-3xl bg-${categoryColor} shadow-md transform scale-95`}
                    style={{ zIndex: 1 }}
                  />
                )}

                {currentIndex < questions.length - 1 && (
                  <div
                    className={`absolute inset-x-0 top-2 mx-1 h-52 rounded-3xl bg-${categoryColor} shadow-md transform scale-97`}
                    style={{ zIndex: 2 }}
                  />
                )}

                {/* Main Card */}
                <div
                  className={`relative h-56 rounded-3xl bg-${categoryColor} shadow-lg p-6 flex flex-col justify-between`}
                  style={{ zIndex: 3 }}
                >
                  <div className="flex-1 flex items-center justify-center">
                    <p className="text-soul-text font-lora text-lg font-medium text-center leading-relaxed">
                      {currentQuestion?.question}
                    </p>
                  </div>

                  {/* Soul Stack Attribution */}
                  <div className="text-center">
                    <p className="text-soul-text/50 font-lato text-xs font-medium">
                      Soul Stack
                    </p>
                  </div>
                </div>
              </div>

              {/* Navigation Controls */}
              <div className="flex items-center justify-between w-full px-4 gap-4">
                <button
                  onClick={prevCard}
                  disabled={currentIndex === 0}
                  className="flex-1 px-6 py-3 rounded-full border border-soul-text disabled:opacity-50 disabled:cursor-not-allowed hover:bg-soul-text/5 transition-colors"
                >
                  <span className="text-soul-text font-lora text-sm">
                    Previous
                  </span>
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
            <div
              className={`w-full h-56 rounded-3xl bg-${categoryColor} shadow-lg p-6 flex items-center justify-center`}
            >
              <p className="text-soul-text font-lora text-lg font-medium text-center">
                No questions found for {categoryType} - {layerName}.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Logo */}
      <div className="flex justify-center items-center gap-2 pb-8">
        <svg
          width="42"
          height="28"
          viewBox="0 0 43 30"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-11 h-auto"
        >
          <path
            d="M42.5517 8.05566C42.5517 13.6547 40.3275 19.0244 36.3684 22.9835C32.4093 26.9426 27.0396 29.1668 21.4406 29.1668C15.8416 29.1668 10.4719 26.9426 6.51277 22.9835C2.55367 19.0244 0.329469 13.6547 0.329468 8.05566L6.22472 8.05566C6.22472 12.0912 7.82782 15.9614 10.6813 18.8149C13.5349 21.6684 17.4051 23.2715 21.4406 23.2715C25.4761 23.2715 29.3463 21.6684 32.1998 18.8149C35.0533 15.9614 36.6564 12.0912 36.6564 8.05566H42.5517Z"
            fill="#FAB183"
          />
          <path
            d="M33.3457 15.209C32.4063 16.7724 31.1682 18.1354 29.702 19.2203C28.2358 20.3052 26.5703 21.0907 24.8006 21.532C23.0309 21.9732 21.1916 22.0616 19.3877 21.792C17.5838 21.5224 15.8507 20.9001 14.2873 19.9608C12.7239 19.0214 11.3608 17.7833 10.2759 16.3171C9.19099 14.8509 8.40549 13.1854 7.96425 11.4157C7.523 9.64595 7.43466 7.80663 7.70425 6.00275C7.97384 4.19887 8.59609 2.46575 9.53548 0.902348L14.1735 3.68916C13.6001 4.64349 13.2203 5.70141 13.0557 6.80253C12.8911 7.90365 12.9451 9.0264 13.2144 10.1067C13.4838 11.1869 13.9632 12.2036 14.6255 13.0986C15.2877 13.9935 16.1198 14.7493 17.0741 15.3227C18.0284 15.8961 19.0863 16.276 20.1874 16.4405C21.2886 16.6051 22.4113 16.5512 23.4916 16.2818C24.5719 16.0125 25.5885 15.533 26.4835 14.8708C27.3785 14.2085 28.1342 13.3765 28.7076 12.4221L33.3457 15.209Z"
            fill="#A7CBF0"
          />
          <path
            d="M28.6628 8.05566C28.6628 4.06693 25.4293 0.833435 21.4406 0.833435C17.4519 0.833435 14.2184 4.06693 14.2184 8.05566C14.2184 12.0444 17.4519 15.2779 21.4406 15.2779C25.4293 15.2779 28.6628 12.0444 28.6628 8.05566Z"
            fill="#FAE683"
          />
        </svg>
        <span className="text-soul-text-subtle font-lora text-xl font-medium tracking-tight">
          Unlayer
        </span>
      </div>
    </div>
  );
}
