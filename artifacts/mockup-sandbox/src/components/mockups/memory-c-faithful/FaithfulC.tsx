import type { ReactNode } from 'react';
import { MemoryBoard, type PreviewSubject } from '../memory-art-directions/_shared/MemoryBoard';
import '../memory-art-directions/_group.css';

type ArtworkProps = {
  children: ReactNode;
  label: string;
};

function Artwork({ children, label }: ArtworkProps) {
  return (
    <svg
      aria-label={label}
      height="74"
      role="img"
      viewBox="0 0 74 74"
      width="74"
      xmlns="http://www.w3.org/2000/svg"
    >
      {children}
    </svg>
  );
}

function CatArtwork() {
  return (
    <Artwork label="A seated orange cat">
      <path
        d="M19.8 31.2c-1.6-5.5-1.5-13.5-.4-18.7.3-1.4 1.8-2 2.9-1.1l9.1 7.4c3.3-1.1 6.3-1.1 9.8 0l9-7.4c1.1-.9 2.6-.3 2.9 1.1 1.2 5.3 1.2 13.3-.5 18.7 2.2 3.2 3.2 7 3.2 11.3 0 11.6-7.9 20.1-18.6 20.1-10.8 0-18.8-8.5-18.8-20.1 0-4.2 1.1-8.1 3.4-11.3Z"
        fill="#E98218"
      />
      <path d="m22.6 15.8 7.2 5.8-6.4-1.6Z" fill="#FFB259" />
      <path d="m51.4 15.8-7.2 5.8 6.4-1.6Z" fill="#FFB259" />
      <path
        d="M36.9 25.3c-7.4 0-13.1 5-13.1 12.5 0 6.7 4.9 11.7 13.1 11.7s13.2-5 13.2-11.7c0-7.5-5.8-12.5-13.2-12.5Z"
        fill="#F7E2B8"
      />
      <path d="M29.2 20.2c.9-2.8 1.9-4.7 3.2-6.1l1.3 7.2Z" fill="#C96213" />
      <path d="M42.8 20.2c-.8-2.8-1.9-4.7-3.2-6.1l-1.3 7.2Z" fill="#C96213" />
      <ellipse cx="29.2" cy="32.7" fill="#27313A" rx="3.15" ry="4.25" />
      <ellipse cx="44.6" cy="32.7" fill="#27313A" rx="3.15" ry="4.25" />
      <circle cx="30.1" cy="31.1" fill="#FFF8EA" r="1.15" />
      <circle cx="45.5" cy="31.1" fill="#FFF8EA" r="1.15" />
      <path d="M35.1 38.3c1.2-1.1 2.4-1.1 3.6 0l-1.8 1.5Z" fill="#D9664D" />
      <path d="M36.9 39.5v2.1m0 0c-2.2 2.3-4.3 2.3-5.6.2m5.6-.2c2.2 2.3 4.4 2.3 5.7.2" fill="none" stroke="#7C4A2B" strokeLinecap="round" strokeWidth="1.3" />
      <path d="M25.8 39.1c-4-.6-6.8-.4-9.4.3m9.6 3.4c-4.4.2-7.2 1.1-9.3 2.3m22.7-6c4-.6 6.8-.4 9.4.3m-9.6 3.4c4.4.2 7.2 1.1 9.3 2.3" fill="none" stroke="#A64E16" strokeLinecap="round" strokeWidth="1.15" />
      <path d="M25.9 48.6c-2.8 4.5-2.8 9.1-.8 12.9 2 2.3 6.4 2.1 8.2-.1 1-1.6 1.4-4.2 1.3-7.5Z" fill="#F9E5B7" />
      <path d="M28.2 47.7c-1 3.5-.8 7.9.1 10.5m17-10.5c1 3.5.8 7.9-.1 10.5" fill="none" stroke="#D66D14" strokeLinecap="round" strokeWidth="2.4" />
      <path d="M22.4 54.8c-2.8 5.4-1.2 9.6 3.4 9.6 2.2 0 3.8-1 4.3-2.7-1.5 1.5-3.7 1.4-5 .2-1.4-1.4-1.5-3.9-.5-6.4Z" fill="#E98218" />
      <path d="M51.6 54.8c2.8 5.4 1.2 9.6-3.4 9.6-2.2 0-3.8-1-4.3-2.7 1.5 1.5 3.7 1.4 5-.2 1.4-1.4 1.5-3.9.5-6.4Z" fill="#E98218" />
      <path d="M53.3 45.8c7.6 2.7 9.6 9.4 6.3 13.4-1.7 2-4.1 2.7-6.5 2.2 2.4-1.9 3.2-4.1 2.2-6.4-.8-1.8-2.6-3-5.1-3.7Z" fill="#E98218" />
      <path d="M55.4 49.3c2.8 1.6 3.6 3.8 2.7 5.6m-5.2-1c2.5 1.2 3.2 3.1 2.6 4.8" fill="none" stroke="#C96213" strokeLinecap="round" strokeWidth="2.2" />
      <path d="M28.4 25.4c1.7-1 3.2-1.2 4.5-.7m8.3 0c1.3-.5 2.8-.3 4.5.7" fill="none" stroke="#AE5214" strokeLinecap="round" strokeWidth="1.2" />
    </Artwork>
  );
}

function DuckArtwork() {
  return (
    <Artwork label="A friendly yellow duck">
      <path d="M17.4 45.2c0-8.7 6.3-15.1 14.7-16.1-.4-1.5-.4-3.1.1-4.6 1.2-3.9 5.2-6.3 9.3-5.5 4.7.9 7.2 5.7 5.7 10.1 7.4 1.9 11.8 7.9 11.8 15.8 0 10.2-8 16-20.6 16-12.8 0-21-5.5-21-15.7Z" fill="#E8B62C" />
      <path d="M40.8 26.8c1.7 1.4 3.8 2 6.4 2.2-1.6-4.5-4.2-7.1-7.5-6.8-1.2.1-2.2.6-3 1.5 1.4.7 2.8 1.7 4.1 3.1Z" fill="#F1CA48" />
      <path d="M46.6 38.2c3.4 1.1 5.9 4 5.9 7.9 0 4.7-3.7 8.2-9.4 8.2-5.1 0-8.8-2.7-9.8-7.1 4.8 1.3 9.7-1.7 13.3-9Z" fill="#F2C93C" />
      <path d="M25.5 39.3c1.3 6.9 6.8 10.8 14 10.8 3.8 0 6.5-.8 8.6-2.1-1.6 4.3-5.7 6.3-11.4 6.3-8.8 0-14.4-4.2-14.4-10.9 0-1.5.4-2.9 1-4.1Z" fill="#F4CB44" />
      <ellipse cx="39.4" cy="32.4" fill="#28343B" rx="2.3" ry="2.8" />
      <circle cx="40.1" cy="31.5" fill="#FFF8EA" r=".75" />
      <path d="M31.6 35.1c-4.9-.2-9-.1-12.7 1.2-2 .7-2.4 3.1-.7 4.1 3.7 2.1 9.3 2.8 15.2 1.1Z" fill="#E88627" />
      <path d="M27.8 38.7c-2.7 1.2-5.2 1.5-7.7.8" fill="none" stroke="#F5B63A" strokeLinecap="round" strokeWidth="1.2" />
      <path d="M31.3 58.6c-2.5 2.1-4.4 2.1-7.1 0m19.3 0c2.5 2.1 4.4 2.1 7.1 0" fill="none" stroke="#DF8628" strokeLinecap="round" strokeWidth="2.2" />
      <path d="M26.8 25.1c2.7-2.1 5.4-2.8 8.1-2.1" fill="none" stroke="#CE9225" strokeLinecap="round" strokeWidth="1.3" />
    </Artwork>
  );
}

function ElephantArtwork() {
  return (
    <Artwork label="A friendly blue-gray elephant">
      <path d="M17.1 47.9c0-10.6 6.2-19 16.7-19 8.8 0 16.1 5.7 16.7 14.9l.2 7.3c.1 5.6-4.3 10.2-9.9 10.2H28.9c-6.5 0-11.8-5.4-11.8-13.4Z" fill="#8BAEBC" />
      <path d="M29.2 34.5c-7.7 3.2-12.5-.4-12.5-7.6 0-4.2 2.3-7.3 5.5-8.6 2.9-1.2 6 .1 7.2 2.8 1.4 3.1 1.4 8.9-.2 13.4Z" fill="#789EAD" />
      <path d="M45.2 34.5c7.7 3.2 12.5-.4 12.5-7.6 0-4.2-2.3-7.3-5.5-8.6-2.9-1.2-6 .1-7.2 2.8-1.4 3.1-1.4 8.9.2 13.4Z" fill="#789EAD" />
      <path d="M33.6 39.4c-1.1 6.6-.8 12.5 2.7 15.5 2.1 1.8 4.5.3 4.6-2.4.1-3.5-1-8.5.8-12.5 1.1-2.3 1.1-4.9-.2-6.9-2.4-3.5-7.1-2.8-7.9 6.3Z" fill="#8BAEBC" />
      <path d="M35.9 53.5c.3 2.9 2.7 4.5 4.8 2.8.7-.6 1.1-1.5 1.1-2.6" fill="none" stroke="#6F96A5" strokeLinecap="round" strokeWidth="1.4" />
      <circle cx="27.2" cy="34.6" fill="#27343A" r="2.2" />
      <circle cx="46.7" cy="34.6" fill="#27343A" r="2.2" />
      <circle cx="27.8" cy="34" fill="#FFF8EA" r=".7" />
      <circle cx="47.3" cy="34" fill="#FFF8EA" r=".7" />
      <path d="M22.7 46.7c2.1-1.3 3.8-1.4 5.4-.4m17.5.4c-2.1-1.3-3.8-1.4-5.4-.4" fill="none" stroke="#6F96A5" strokeLinecap="round" strokeWidth="1.25" />
      <path d="M28.2 57.3v5.1m16.8-5.1v5.1" stroke="#6F96A5" strokeLinecap="round" strokeWidth="2.5" />
      <path d="M21.3 25.8c1.1-2.7 3.2-4.3 5.5-4.5m26.1 4.5c-1.1-2.7-3.2-4.3-5.5-4.5" fill="none" stroke="#A9C3CA" strokeLinecap="round" strokeWidth="1.2" />
    </Artwork>
  );
}

function AppleArtwork() {
  return (
    <Artwork label="A red apple">
      <path d="M37.3 25.4c-2.7-4.1-2.8-7.8-.7-11.1" fill="none" stroke="#6E4323" strokeLinecap="round" strokeWidth="3.2" />
      <path d="M38.8 20.1c4.5-7.1 10.7-9.4 17.6-8.8-.4 6.3-3.7 11.4-10.2 13.3-2.8.8-5.2.7-7.4-.1Z" fill="#4E934D" />
      <path d="M36.8 24.1c-5.4-4.3-14.1-3.1-17.8 2.8-3.6 5.8-2.2 18.8 1.4 26.5 3.8 8 9.5 10.6 16.4 7.3 1.8-.9 3-1 4.8-.1 7 3.3 12.6.7 16.4-7.2 3.7-7.8 5-20.7 1.4-26.5-3.7-5.9-12.4-7.1-17.8-2.8-1.5 1.2-3.3 1.2-4.8 0Z" fill="#D93632" />
      <path d="M23.2 32.1c1-3.3 3.1-5.9 6.5-7.1 2.8-1 4.5-.2 5.3 1.4-4.3.9-7.9 3.2-10.2 7.8-1.1 2.2-2.8 1.8-1.6-2.1Z" fill="#F16A4B" />
      <path d="M47.6 22.2c-2.6-1.8-5.2-2.1-7.8-1.3" fill="none" stroke="#B7262A" strokeLinecap="round" strokeWidth="1.5" />
      <path d="M53.5 17c-3.4 1.4-6 2.3-8.2 2.2" fill="none" stroke="#377742" strokeLinecap="round" strokeWidth="1" />
    </Artwork>
  );
}

function CarArtwork() {
  return (
    <Artwork label="A small blue car">
      <path d="M12.3 46.2c0-2 1.7-3.7 3.7-3.7h3.3l5.4-11.7c1.2-2.6 3.8-4.3 6.7-4.3h14.1c3.5 0 6.7 1.8 8.4 4.9l6.1 11.1h1.8c2.1 0 3.8 1.7 3.8 3.7v5.3c0 2.2-1.8 4-4 4H16.4c-2.3 0-4.1-1.8-4.1-4.1Z" fill="#297EB2" />
      <path d="m27 31.1-4.3 10.2h14.6V30.1h-6.2c-1.8 0-3.4.4-4.1 1Z" fill="#C7E2E6" />
      <path d="M40.2 30.1v11.2h14l-5-9c-1-1.4-2.6-2.2-4.3-2.2Z" fill="#C7E2E6" />
      <path d="M38.8 30.3v11.2" stroke="#25709D" strokeWidth="1.6" />
      <path d="M13.8 45.6h5.7m40.7 0h6.1" stroke="#1C618E" strokeLinecap="round" strokeWidth="2.2" />
      <circle cx="25.7" cy="54.4" fill="#243A48" r="7.1" />
      <circle cx="25.7" cy="54.4" fill="#B4C1BE" r="3.4" />
      <circle cx="25.7" cy="54.4" fill="#E8E8D8" r="1.8" />
      <circle cx="52.8" cy="54.4" fill="#243A48" r="7.1" />
      <circle cx="52.8" cy="54.4" fill="#B4C1BE" r="3.4" />
      <circle cx="52.8" cy="54.4" fill="#E8E8D8" r="1.8" />
      <path d="M14.2 44h4.9v5.2h-5.7c-.4-1.8-.2-3.6.8-5.2Z" fill="#F3C331" />
      <path d="M59.1 44h4.8c1 1.6 1.2 3.4.8 5.2h-5.6Z" fill="#E86D3F" />
      <rect fill="#175F8E" height="1.8" rx=".9" width="7.4" x="36.4" y="46.4" />
      <circle cx="20.7" cy="43.5" fill="#193F5D" r="1.9" />
    </Artwork>
  );
}

function BearArtwork() {
  return (
    <Artwork label="A seated brown bear">
      <circle cx="25.1" cy="21.6" fill="#8C6048" r="8.2" />
      <circle cx="49" cy="21.6" fill="#8C6048" r="8.2" />
      <path d="M17.2 39.7c0-11.2 7.9-18.3 19.3-18.3 11.5 0 20.4 7.1 20.4 18.8 0 10.3-5.2 21.2-20 21.2-14.5 0-19.7-10.3-19.7-21.7Z" fill="#A87350" />
      <circle cx="25.5" cy="21.4" fill="#C48B66" r="4" />
      <circle cx="48.6" cy="21.4" fill="#C48B66" r="4" />
      <path d="M25.8 40.1c1.8-5 5.4-7.6 10.8-7.6 5.4 0 9.1 2.6 10.9 7.6 1.4 4-.2 8.7-3.1 10.5-4.3 2.7-11.3 2.7-15.6 0-2.9-1.8-4.5-6.5-3-10.5Z" fill="#E4C18C" />
      <ellipse cx="29.6" cy="34.7" fill="#49362F" rx="2.15" ry="2.7" />
      <ellipse cx="46.8" cy="34.7" fill="#49362F" rx="2.15" ry="2.7" />
      <circle cx="30.2" cy="34" fill="#FFF8EA" r=".65" />
      <circle cx="47.4" cy="34" fill="#FFF8EA" r=".65" />
      <ellipse cx="36.7" cy="42" fill="#5A3C31" rx="3.4" ry="2.6" />
      <path d="M36.7 43.6v2c-2.1 2.3-4.1 2.2-5.5.2m5.5-.2c2.1 2.3 4.2 2.2 5.5.2" fill="none" stroke="#6C4736" strokeLinecap="round" strokeWidth="1.25" />
      <path d="M21.1 52.1c-2.1 2.8-1.7 7.2 1.1 8.3 3 1.2 6-.8 6.3-3.8m17-4.5c2.1 2.8 1.7 7.2-1.1 8.3-3 1.2-6-.8-6.3-3.8" fill="#A87350" />
      <path d="M28.6 58.7v3m16.2-3v3" stroke="#7F533F" strokeLinecap="round" strokeWidth="2.6" />
    </Artwork>
  );
}

function renderArtwork(subject: PreviewSubject) {
  switch (subject) {
    case 'cat':
      return <CatArtwork />;
    case 'duck':
      return <DuckArtwork />;
    case 'elephant':
      return <ElephantArtwork />;
    case 'apple':
      return <AppleArtwork />;
    case 'car':
      return <CarArtwork />;
    case 'bear':
      return <BearArtwork />;
  }
}

export default function FaithfulC() {
  return (
    <MemoryBoard
      direction="Faithful C"
      note="A bright little match for every pair."
      renderArtwork={renderArtwork}
    />
  );
}