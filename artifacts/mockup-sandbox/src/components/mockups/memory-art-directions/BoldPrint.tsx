import './_group.css';
import type { ReactNode } from 'react';
import { MemoryBoard, type PreviewSubject } from './_shared/MemoryBoard';

const INK = '#24313D';

function Art({ children }: { children: ReactNode }) {
  return (
    <svg aria-hidden="true" focusable="false" height="74" viewBox="0 0 74 74" width="74">
      {children}
    </svg>
  );
}

function Cat() {
  return (
    <Art>
      <path d="M18 31 16 13l14 9c3-2 7-3 10-3s7 1 10 3l14-9-2 19c1 3 1 6 0 9-2 12-12 18-22 18S20 52 18 40c-1-3-1-6 0-9Z" fill="#E59B56" stroke={INK} strokeLinejoin="round" strokeWidth="3" />
      <path d="m21 19 7 5-7 2Zm32 5 7-5v7Z" fill="#F8CAA0" />
      <circle cx="30" cy="36" fill={INK} r="2.5" />
      <circle cx="50" cy="36" fill={INK} r="2.5" />
      <path d="m37 43 3 2 3-2c0 5-6 5-6 0Zm3 2v5m0 0c-3 3-6 2-8 0m8 0c3 3 6 2 8 0M25 43l-9-2m9 6-9 2m33-6 9-2m-9 6 9 2" fill="none" stroke={INK} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.4" />
    </Art>
  );
}

function Duck() {
  return (
    <Art>
      <path d="M19 51c3-10 12-14 23-14 12 0 18 7 17 14-1 9-10 14-22 14-11 0-20-4-18-14Z" fill="#E4B536" stroke={INK} strokeLinejoin="round" strokeWidth="3" />
      <circle cx="45" cy="27" fill="#E4B536" r="15" stroke={INK} strokeWidth="3" />
      <path d="M34 26c-7-1-11-5-12-11 7 0 12 2 16 8Z" fill="#E4B536" stroke={INK} strokeLinejoin="round" strokeWidth="3" />
      <path d="M57 28c8-2 13 1 14 6-5 5-11 4-16 1Z" fill="#E58B45" stroke={INK} strokeLinejoin="round" strokeWidth="3" />
      <circle cx="49" cy="25" fill={INK} r="2.2" />
      <path d="M29 51c7-5 15-4 20 2-5 5-13 6-20 2ZM32 66v5m17-5v5m-3 0h7m-18 0h-7" fill="none" stroke={INK} strokeLinecap="round" strokeWidth="2.5" />
    </Art>
  );
}

function Elephant() {
  return (
    <Art>
      <circle cx="22" cy="34" fill="#89AAB9" r="14" stroke={INK} strokeWidth="3" />
      <circle cx="52" cy="34" fill="#89AAB9" r="14" stroke={INK} strokeWidth="3" />
      <path d="M18 42c0-14 8-23 19-23s20 9 20 23c0 14-9 23-20 23S18 56 18 42Z" fill="#89AAB9" stroke={INK} strokeLinejoin="round" strokeWidth="3" />
      <path d="M36 38c0 10-1 19 5 22 6 1 8-3 5-7-3 2-5 0-5-5V38Z" fill="#7899A8" stroke={INK} strokeLinejoin="round" strokeWidth="3" />
      <circle cx="31" cy="36" fill={INK} r="2.2" />
      <circle cx="49" cy="36" fill={INK} r="2.2" />
      <path d="M33 48c4 3 8 3 12 0M22 62v7m10-4v5m20-8v7m10-7v7m-44 0h8m22 0h8" fill="none" stroke={INK} strokeLinecap="round" strokeWidth="2.5" />
    </Art>
  );
}

function Apple() {
  return (
    <Art>
      <path d="M37 25c-11-7-22 0-22 15 0 14 9 25 18 25 4 0 6-3 8-3s5 3 9 3c8 0 15-10 17-21 1-8-3-17-11-19-7-2-11 3-19 0Z" fill="#DD615B" stroke={INK} strokeLinejoin="round" strokeWidth="3" />
      <path d="M38 25c0-8 3-12 8-16m-5 7c7-4 13-3 17 0-4 7-10 9-17 7Z" fill="#6D9B63" stroke={INK} strokeLinejoin="round" strokeWidth="3" />
      <path d="M25 38c2-4 5-6 8-7" fill="none" stroke="#F49D87" strokeLinecap="round" strokeWidth="3" />
    </Art>
  );
}

function Car() {
  return (
    <Art>
      <path d="M11 47h5l6-13c1-3 4-5 8-5h15c4 0 7 2 9 5l6 13h3c2 0 3 2 3 4v10H8V51c0-2 1-4 3-4Z" fill="#5B9EB8" stroke={INK} strokeLinejoin="round" strokeWidth="3" />
      <path d="m25 34-4 12h17V34Zm17 0v12h17l-6-10c-1-1-3-2-5-2Z" fill="#DDECF0" stroke={INK} strokeLinejoin="round" strokeWidth="2.5" />
      <circle cx="21" cy="61" fill="#F7EBDD" r="8" stroke={INK} strokeWidth="3" />
      <circle cx="57" cy="61" fill="#F7EBDD" r="8" stroke={INK} strokeWidth="3" />
      <circle cx="21" cy="61" fill={INK} r="2.5" />
      <circle cx="57" cy="61" fill={INK} r="2.5" />
      <path d="M12 49h5m43 0h4" stroke="#F4C958" strokeLinecap="round" strokeWidth="3" />
    </Art>
  );
}

function Bear() {
  return (
    <Art>
      <circle cx="24" cy="22" fill="#9A6A4E" r="10" stroke={INK} strokeWidth="3" />
      <circle cx="56" cy="22" fill="#9A6A4E" r="10" stroke={INK} strokeWidth="3" />
      <path d="M18 37c0-12 9-20 19-20s19 8 19 20v13c0 11-8 18-19 18s-19-7-19-18Z" fill="#9A6A4E" stroke={INK} strokeLinejoin="round" strokeWidth="3" />
      <ellipse cx="37" cy="43" fill="#E1B997" rx="11" ry="9" />
      <circle cx="30" cy="35" fill={INK} r="2.3" />
      <circle cx="48" cy="35" fill={INK} r="2.3" />
      <path d="m34 42 3 2 3-2c0 4-6 4-6 0Zm3 2v5m0 0c-3 3-6 2-7 0m7 0c3 3 6 2 7 0M24 57c-3 0-5 3-5 6m37-6c3 0 5 3 5 6" fill="none" stroke={INK} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.4" />
    </Art>
  );
}

export function BoldPrint() {
  const renderArtwork = (subject: PreviewSubject) => {
    switch (subject) {
      case 'cat':
        return <Cat />;
      case 'duck':
        return <Duck />;
      case 'elephant':
        return <Elephant />;
      case 'apple':
        return <Apple />;
      case 'car':
        return <Car />;
      case 'bear':
        return <Bear />;
    }
  };

  return (
    <MemoryBoard
      direction="BOLD PRINT"
      note="Chunky shapes, simple clues — look closely, then remember."
      renderArtwork={renderArtwork}
    />
  );
}