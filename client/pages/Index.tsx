import { Link } from "react-router-dom";

export default function Index() {
  return (
    <div className="min-h-screen bg-soul-background flex flex-col justify-center items-center px-4 py-20 gap-20 md:gap-28">
      {/* Welcome Container */}
      <div className="flex flex-col items-center w-full max-w-xs">
        <div className="text-soul-text-subtle text-center font-lato text-lg md:text-xl font-light mb-2">
          Welcome to
        </div>
        <div className="text-soul-text text-center font-lora text-4xl md:text-5xl font-bold leading-tight tracking-tight">
          Soul Stack
        </div>
      </div>

      {/* Question Container */}
      <div className="flex flex-col items-center w-full max-w-sm gap-5">
        <div className="text-soul-text-subtle text-center font-lato text-lg font-light">
          Who's your deep talk today?
        </div>
        
        {/* Button Container */}
        <div className="flex flex-col w-full gap-2">
          <Link 
            to="/friends"
            className="flex h-16 justify-center items-center rounded-full border border-soul-text bg-soul-friends hover:opacity-90 transition-opacity"
          >
            <span className="text-soul-text font-lora text-lg font-medium">
              Friends
            </span>
          </Link>
          
          <Link 
            to="/partner"
            className="flex h-16 justify-center items-center rounded-full border border-soul-text bg-soul-partner hover:opacity-90 transition-opacity"
          >
            <span className="text-soul-text font-lora text-lg font-medium">
              Partner
            </span>
          </Link>
          
          <Link 
            to="/family"
            className="flex h-16 justify-center items-center rounded-full border border-soul-text bg-soul-family hover:opacity-90 transition-opacity"
          >
            <span className="text-soul-text font-lora text-lg font-medium">
              Family
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
