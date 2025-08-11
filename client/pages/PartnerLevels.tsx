import { Link, useNavigate } from "react-router-dom";
import mixpanel from "mixpanel-browser";
import React from "react";

export default function PartnerLevels() {
  const navigate = useNavigate();
  const CATEGORY = "partner";
  const DECK_VERSION = import.meta?.env?.VITE_DECK_VERSION ?? "2025-08";

  function handleLevelClick(
    path: string,
    level_id: string,
    level_label: string,
    level_order: number
  ) {
    try {
      let didNav = false;
      const go = () => {
        if (!didNav) {
          didNav = true;
          navigate(path);
        }
      };
      mixpanel.track(
        "Level Selected",
        {
          category: CATEGORY,
          level_id,
          level_label,
          level_order,
          deck_version: DECK_VERSION,
        },
        go // navigate after Mixpanel flushes
      );
      // safety: navigate even if callback doesn't fire quickly
      setTimeout(go, 300);
    } catch {
      navigate(path);
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
            to="/partner/questions/1"
            onClick={(e) => {
              e.preventDefault();
              handleLevelClick("/partner/questions/1", "icebreaker", "Break the Ice", 1);
            }}
            className="flex flex-col p-6 rounded-2xl border border-soul-text bg-soul-partner hover:opacity-90 transition-opacity"
          >
            <div className="text-soul-text font-lato text-xs font-normal text-center mb-1">
              1st Layer
            </div>
            <div className="text-soul-text font-lora text-2xl font-bold text-center tracking-tight mb-1">
              Break the Ice
            </div>
            <div className="text-soul-text font-lato text-base font-light text-center tracking-tight leading-relaxed">
              Light, fun questions to loosen up and get the conversation going.
            </div>
          </Link>

          {/* Level 2: Getting Real */}
          <Link
            to="/partner/questions/2"
            onClick={(e) => {
              e.preventDefault();
              handleLevelClick("/partner/questions/2", "deep", "Getting Real", 2);
            }}
            className="flex flex-col p-6 rounded-2xl border border-soul-text bg-soul-partner hover:opacity-90 transition-opacity"
          >
            <div className="text-soul-text font-lato text-xs font-normal text-center mb-1">
              2nd Layer
            </div>
            <div className="text-soul-text font-lora text-2xl font-bold text-center tracking-tight mb-1">
              Getting Real
            </div>
            <div className="text-soul-text font-lato text-base font-light text-center tracking-tight leading-relaxed">
              Thoughtful questions that open the door to personal stories and
              honest sharing.
            </div>
          </Link>

          {/* Level 3: Go Deep */}
          <Link
            to="/partner/questions/3"
            onClick={(e) => {
              e.preventDefault();
              handleLevelClick("/partner/questions/3", "spicy", "Go Deep", 3);
            }}
            className="flex flex-col p-6 rounded-2xl border border-soul-text bg-soul-partner hover:opacity-90 transition-opacity"
          >
            <div className="text-soul-text font-lato text-xs font-normal text-center mb-1">
              3rd Layer
            </div>
            <div className="text-soul-text font-lora text-2xl font-bold text-center tracking-tight mb-1">
              Go Deep
            </div>
            <div className="text-soul-text font-lato text-base font-light text-center tracking-tight leading-relaxed">
              Raw, intimate questions for when trust is built and you're ready
              to get real.
            </div>
          </Link>
        </div>
      </div>

      {/* Logo */}
      {/* ... (rest same as before) */}
    </div>
  );
}
