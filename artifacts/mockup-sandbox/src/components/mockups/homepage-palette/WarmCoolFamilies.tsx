import { useState, type ComponentType } from "react";
import { BookOpen, Calculator, Grid2X2, Music2, Palette } from "lucide-react";
import type { LucideProps } from "lucide-react";
import "./_group.css";

type Game = {
  title: string;
  description: string;
  icon: ComponentType<LucideProps>;
  surface: string;
  family: "warm" | "cool";
  ink: string;
};

const games: Game[] = [
  { title: "Color studio", description: "Draw anything you can imagine", icon: Palette, surface: "#F7D37A", family: "warm", ink: "#205D67" },
  { title: "Little piano", description: "Make a song with your fingers", icon: Music2, surface: "#F3B19E", family: "warm", ink: "#205D67" },
  { title: "Find the pairs", description: "Can you remember where they are?", icon: Grid2X2, surface: "#98D8D0", family: "cool", ink: "#205D67" },
  { title: "Math mix", description: "More, less, and little sums", icon: Calculator, surface: "#5A9EA4", family: "cool", ink: "#FCFAF6" },
  { title: "Reading mix", description: "Listen, sort, and build words", icon: BookOpen, surface: "#EBC1B8", family: "warm", ink: "#205D67" },
];

export default function WarmCoolFamilies() {
  const [selected, setSelected] = useState("");

  return (
    <main className="lp-palette-preview">
      <section className="lp-phone" aria-label="Little Playroom warm cool families home">
        <header className="lp-header">
          <h1 className="lp-heading">Little Playroom</h1>
          <span className="lp-sun" aria-hidden="true"><span className="lp-sun-core" /></span>
        </header>

        <div className="lp-card-list">
          {games.map(({ title, description, icon: Icon, surface, family, ink }) => (
            <button
              key={title}
              className="lp-card lp-card--family"
              data-family={family}
              data-selected={selected === title}
              type="button"
              style={{ backgroundColor: surface, color: ink }}
              aria-label={`${title}. ${description}`}
              aria-pressed={selected === title}
              onClick={() => setSelected(title)}
            >
              <span className="lp-icon-well">
                <Icon size={31} strokeWidth={1.9} color="#205D67" aria-hidden="true" />
              </span>
              <span className="lp-card-copy">
                <span className="lp-card-title">{title}</span>
                <span className="lp-card-description">{description}</span>
              </span>
            </button>
          ))}
        </div>
        <p className="lp-status" aria-live="polite">{selected ? `${selected} is ready to play` : "Choose a little game to begin"}</p>
      </section>
    </main>
  );
}