import { HEADER_TITLE } from "../lib/Language";
import { cn } from "../utils";

export default function Header({ language }: { language: 'chinese' | 'english' | 'japanese' }) {
  const showBrand = import.meta.env.VITE_APP_SHOW_BRAND === "true";
  return (
    <div className="relative flex justify-center items-center my-8 gap-1">
      {showBrand &&
        <img
          src="https://file.302.ai/gpt/imgs/5b36b96aaa052387fb3ccec2a063fe1e.png"
          className={cn(
            "app-icon object-contain"
          )}
          alt="302"
          height={60}
          width={60}
        />
      }
      <div className={cn("app-title")}>{HEADER_TITLE[language]}</div>
    </div>
  );
}
