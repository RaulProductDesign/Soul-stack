import { Link, useNavigate } from "react-router-dom";
import mixpanel from "mixpanel-browser";

export default function Index() {
  const navigate = useNavigate();

  const handleCategoryClick = (category: string) => {
    mixpanel.track("Category Selected", {
      category,
    });
    navigate(`/${category}`);
  };

  return (
    <div className="min-h-screen bg-soul-background flex flex-col">
      {/* Main Content */}
      <div className="flex-1 flex flex-col justify-center items-center px-6 pb-20">
        <div className="flex flex-col items-center w-full max-w-sm gap-12">
          {/* Question */}
          <div className="text-soul-text text-center font-lato text-2xl font-light tracking-tight">
            Who's your deep talk today?
          </div>

          {/* Button Container */}
          <div className="flex flex-col w-full gap-2">
            <button
              onClick={() => handleCategoryClick("friends")}
              className="flex h-16 justify-center items-center rounded-full border border-soul-text bg-soul-friends hover:opacity-90 transition-opacity"
            >
              <span className="text-soul-text font-lora text-lg font-medium">
                Friends
              </span>
            </button>

            <button
              onClick={() => handleCategoryClick("partner")}
              className="flex h-16 justify-center items-center rounded-full border border-soul-text bg-soul-partner hover:opacity-90 transition-opacity"
            >
              <span className="text-soul-text font-lora text-lg font-medium">
                Partner
              </span>
            </button>

            <button
              onClick={() => handleCategoryClick("family")}
              className="flex h-16 justify-center items-center rounded-full border border-soul-text bg-soul-family hover:opacity-90 transition-opacity"
            >
              <span className="text-soul-text font-lora text-lg font-medium">
                Family
              </span>
            </button>
          </div>
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
          {/* SVG content stays the same */}
        </svg>
        <span className="text-soul-text-subtle font-lora text-xl font-medium tracking-tight">
          Unlayer
        </span>
      </div>
    </div>
  );
}
