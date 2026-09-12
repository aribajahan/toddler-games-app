import { useState, type ComponentType } from "react";
import { BookOpen, Calculator, Grid2X2, Music2, Palette } from "lucide-react";
import type { LucideProps } from "lucide-react";
import "./_group.css";

type Game = {
  title: string;
  description: string;
  icon: ComponentType<LucideProps>;
  surface: string;
  ink: string;
  iconInk: string;
};

const games: Game[] = [
  { title: "Color studio", description: "Draw anything you can imagine", icon: Palette, surface: "#FFE471", ink: "#205D67", iconInk: "#205D67" },
  { title: "Little piano", description: "Make a song with your fingers", icon: Music2, surface: "#FF6871", ink: "#FCFAF6", iconInk: "#205D67" },
  { title: "Find the pairs", description: "Can you remember where they are?", icon: Grid2X2, surface: "#53C7C1", ink: "#205D67", iconInk: "#205D67" },
  { title: "Math mix", description: "More, less, and little sums", icon: Calculator, surface: "#205D67", ink: "#FCFAF6", iconInk: "#205D67" },
  { title: "Reading mix", description: "Listen, sort, and build words", icon: BookOpen, surface: "#F3B2AA", ink: "#205D67", iconInk: "#205D67" },
];

export default function SoftPaired() {
  const [selected, setSelected] = useState("");

  return (
    <main className="lp-palette-preview">
      <section className="lp-phone" aria-label="Little Playroom soft paired home">
        <header className="lp-header">
          <h1 className="lp-heading">Little Playroom</h1>
        </header>

        <div className="lp-card-list">
          {games.map(({ title, description, icon: Icon, surface, ink, iconInk }) => (
            <button
              key={title}
              className="lp-card"
              data-selected={selected === title}
              type="button"
              style={{ backgroundColor: surface, color: ink }}
              aria-label={`${title}. ${description}`}
              aria-pressed={selected === title}
              onClick={() => setSelected(title)}
            >
              <span className="lp-icon-well">
                <Icon size={31} strokeWidth={1.9} color={iconInk} aria-hidden="true" />
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