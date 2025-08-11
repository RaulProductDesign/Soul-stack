import { Link } from "react-router-dom";
import mixpanel from "mixpanel-browser";

export default function FamilyLevels() {
  const CATEGORY = "family";
  const DECK_VERSION = import.meta?.env?.VITE_DECK_VERSION ?? "2025-08";

  function trackLevel(level_id: string, level_label: string, level_order: number) {
    try {
      mixpanel.track("Level Selected", {
        category: CATEGORY,
        level_id,
        level_label,
        level_order,
        deck_version: DECK_VERSION,
      });
    } catch {
      // don't block navigation if analytics fails
    }
  }

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
          <span className="text-soul-text font-lora text-sm sm:text-lg font-medium">
            back
          </span>
        </Link>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col justify-center items-center px-6 pb-20">
        <div className="flex flex-col w-full max-w-sm gap-2">
          {/* Level 1: Break the Ice */}
          <Link
            to="/family/questions/1"
            onClick={() => trackLevel("icebreaker", "Break the Ice", 1)}
            cl
