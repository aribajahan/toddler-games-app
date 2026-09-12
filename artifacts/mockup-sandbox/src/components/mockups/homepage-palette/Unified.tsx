import { useState, type ComponentType } from "react";
import { BookOpen, Calculator, Grid2X2, Music2, Palette } from "lucide-react";
import type { LucideProps } from "lucide-react";
import "./_group.css";

type Game = {
  title: string;
  description: string;
  icon: ComponentType<LucideProps>;
  accent: string;
};

const games: Game[] = [
  { title: "Color studio", description: "Draw anything you can imagine", icon: Palette, accent: "#D6A900" },
  { title: "Little piano", description: "Make a song with your fingers", icon: Music2, accent: "#D85D66" },
  { title: "Find the pairs", description: "Can you remember where they are?", icon: Grid2X2, accent: "#359E99" },
  { title: "Math mix", description: "More, less, and little sums", icon: Calculator, accent: "#205D67" },
  { title: "Reading mix", description: "Listen, sort, and build words", icon: BookOpen, accent: "#B9566A" },
];

export default function Unified() {
  const [selected, setSelected] = useState("");

  return (
    <main className="lp-palette-preview">
      <section className="lp-phone" aria-label="Little Playroom unified home">
        <header className="lp-header">
          <h1 className="lp-heading">Little Playroom</h1>
        </header>

        <div className="lp-card-list">
          {games.map(({ title, description, icon: Icon, accent }) => (
            <button
              key={title}
              className="lp-card lp-card--unified"
              data-selected={selected === title}
              type="button"
              style={{ color: "#205D67" }}
              aria-label={`${title}. ${description}`}
              aria-pressed={selected === title}
              onClick={() => setSelected(title)}
            >
              <span className="lp-icon-well" style={{ color: accent, backgroundColor: `${accent}1A` }}>
                <Icon size={31} strokeWidth={1.9} aria-hidden="true" />
              </span>
              <span className="lp-card-copy">
                <span className="lp-card-title">{title}</span>
                <span className="lp-card-description">{description}</span>
              </span>
              <span className="lp-card-accent" style={{ color: accent }} aria-hidden="true" />
            </button>
          ))}
        </div>
        <p className="lp-status" aria-live="polite">{selected ? `${selected} is ready to play` : "Choose a little game to begin"}</p>
      </section>
    </main>
  );
}