import type { ReactNode } from 'react';
import '../memory-art-directions/_group.css';
import { MemoryBoard, type PreviewSubject } from '../memory-art-directions/_shared/MemoryBoard';

const svgProps = {
  width: 74,
  height: 74,
  viewBox: '0 0 74 74',
  fill: 'none',
  xmlns: 'http://www.w3.org/2000/svg',
  'aria-hidden': true,
};

function CatArtwork() {
  return (
    <svg {...svgProps}>
      <path
        d="M17 29.7C14.7 25.9 14.6 18.5 15.7 12.4C15.9 11.2 17.3 10.7 18.2 11.5L27.1 18.4C30.1 17.1 34.8 16.5 37.6 16.8C40.8 16.5 44.5 17.1 47 18.2L56.1 11.4C57 10.7 58.3 11.2 58.5 12.4C59.5 18.9 59.2 25.2 57 29.5L58.8 42.9C60.5 52.5 55.7 63.8 46.4 64.5H27.6C18.1 63.8 13.7 53.1 15.3 43.2L17 29.7Z"
        fill="#E98618"
      />
      <path d="M17 13.8L26.5 21.1L18.8 25.8C17.5 22.4 17.1 18.2 17 13.8Z" fill="#F7B36C" />
      <path d="M57.2 13.8L47.7 21.1L55.6 25.8C56.7 22.1 57.2 18 57.2 13.8Z" fill="#F7B36C" />
      <path d="M21.5 47.1C18.1 53.2 21.5 61.4 28 63.4C31.7 64.6 36 62.3 36.5 56.8C37 51.3 31 47.5 21.5 47.1Z" fill="#D86B10" />
      <path d="M52.1 46.8C56.5 52.8 53 61.5 46.1 63.5C42.8 64.5 39.1 62.6 38.4 57.1C37.6 51.8 43 47.2 52.1 46.8Z" fill="#D86B10" />
      <path d="M27 40.6C27.4 48.6 31.1 57.7 37.1 58.2C43.2 57.7 46.7 48.6 47.1 40.6C44.3 37 30 37 27 40.6Z" fill="#FFF0C9" />
      <path d="M21.2 31.7C22.3 28.1 25.1 26.3 28.5 27.7" stroke="#934A12" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M45.5 27.7C48.9 26.3 51.7 28.1 52.8 31.7" stroke="#934A12" strokeWidth="1.8" strokeLinecap="round" />
      <ellipse cx="26.4" cy="34.7" rx="4.9" ry="6.4" fill="#FFFDF7" />
      <ellipse cx="47.6" cy="34.7" rx="4.9" ry="6.4" fill="#FFFDF7" />
      <ellipse cx="27.1" cy="35.5" rx="2.25" ry="3.3" fill="#25323A" />
      <ellipse cx="46.9" cy="35.5" rx="2.25" ry="3.3" fill="#25323A" />
      <circle cx="27.8" cy="34.1" r="0.75" fill="#FFFDF7" />
      <circle cx="47.6" cy="34.1" r="0.75" fill="#FFFDF7" />
      <path d="M35.1 41.7C36.3 40.7 37.7 40.7 38.9 41.7C38.5 43.4 35.5 43.4 35.1 41.7Z" fill="#C95C38" />
      <path d="M37 43.1C37 46.2 33.8 47.1 32 45.5M37 43.1C37 46.2 40.2 47.1 42 45.5" stroke="#7C431D" strokeWidth="1.25" strokeLinecap="round" />
      <path d="M23.5 42.3L13 40.9M23.5 45.3L13.7 46.2M50.5 42.3L61 40.9M50.5 45.3L60.3 46.2" stroke="#8D4B18" strokeWidth="1.1" strokeLinecap="round" />
      <path d="M29.7 18.3C30.1 21.1 30.5 23 31.2 24.2M37.3 17.3V24.2M44.7 18.3C44.2 21.1 43.7 23 43 24.2" stroke="#C85D0B" strokeWidth="2" strokeLinecap="round" />
      <path d="M17.5 55.8C14.6 58 14 61.9 17.5 63.5C20.2 64.8 23.7 63.1 23.7 60.2C23.7 57.7 20.5 55.3 17.5 55.8Z" fill="#E98618" />
      <path d="M54.3 47.4C61.6 43.8 64 36 60.8 32.9C58.1 30.3 54.8 33.3 54.7 36.7" stroke="#D86B10" strokeWidth="6" strokeLinecap="round" />
    </svg>
  );
}

function DuckArtwork() {
  return (
    <svg {...svgProps}>
      <path d="M21 49.2C17.9 44.1 18.5 35.4 22.2 30.2C24.7 26.7 28.1 24.8 32.3 24.4C32.7 18.7 37.3 14.1 43.5 14.1C50.8 14.1 55.9 19.4 55.9 26.4C55.9 31.8 53.4 35.1 50 37.3C53.7 40.1 55.3 44.2 54.1 49.2C52.2 57.3 44.9 61.5 36.5 61.5C29 61.5 23.4 57.6 21 49.2Z" fill="#E4B536" />
      <path d="M32.7 25.1C34.1 18.8 38.1 14.6 43.6 14.3C47.8 14.1 51.2 16.1 53.1 18.8C45.6 18.6 38.3 21 32.7 25.1Z" fill="#F1C94D" />
      <path d="M26.2 38.5C29.2 33.6 35.9 32.1 41.6 35C45.8 37.2 46.5 43.5 42.5 46.1C37.7 49.1 29.5 46.8 26.2 38.5Z" fill="#D3A32A" />
      <path d="M21.4 31.5C17 29.5 13.2 30.7 12.3 33.5C11.4 36.3 14.3 38.6 18.4 38.1L25 36.3C26.3 35.5 25.4 33.3 21.4 31.5Z" fill="#E98F32" />
      <path d="M28.4 51.3C31.3 56.4 36 58.5 41.2 57.3C45.7 56.3 48.5 53.2 49.8 49.4C46.4 52.2 40.2 52.8 34.5 50.7C32.5 49.9 30.2 49.8 28.4 51.3Z" fill="#D09D26" />
      <circle cx="47" cy="25.8" r="3.2" fill="#FFF9E7" />
      <circle cx="47.4" cy="26.1" r="1.55" fill="#2B3435" />
      <circle cx="47.8" cy="25.7" r="0.45" fill="#FFFDF7" />
      <path d="M41.7 31.7C43.7 30.7 45.9 30.8 47.2 32" stroke="#A97920" strokeWidth="1.15" strokeLinecap="round" />
      <path d="M18 56.3C19.7 58.6 22.7 59.4 25.3 58.8M41.5 58.7C45 59.4 48.2 58.1 50 56" stroke="#D7862D" strokeWidth="2.3" strokeLinecap="round" />
    </svg>
  );
}

function ElephantArtwork() {
  return (
    <svg {...svgProps}>
      <path d="M16 48.8C13.9 43.6 14.4 36 17.2 30.7C20.6 24.2 27.3 20.5 35.3 20.5C45.7 20.5 53.8 27.2 55.7 37.1C56.5 41.5 55.4 47.2 52.3 50.9L53.6 59.2C53.8 61 52.4 62.3 50.7 62.1L45.7 61.4L44.8 54.9H29.5L28.7 61.4L23.5 62.1C21.8 62.3 20.5 60.9 20.7 59.3L21.8 51.7C19.3 51.3 17.3 50.4 16 48.8Z" fill="#89AAB9" />
      <path d="M27.6 24.1C22.8 26.2 20 30.2 19.4 35.9C18.9 40.4 21.3 43.5 24.8 43.3C29.8 43.1 31.1 37.8 30.7 32.9C30.3 28.9 29.3 26 27.6 24.1Z" fill="#7195A4" />
      <path d="M46 24.4C50.4 26.5 53.3 30.9 54 35.5C54.6 39.5 52.7 42.5 49.4 42.8C45.2 43.2 42.9 38.5 43.3 33.6C43.6 29.2 44.6 26.3 46 24.4Z" fill="#A7C3CC" />
      <path d="M39.9 36.1C41.1 40.8 41 46.8 39.1 50.7C37.9 53.2 34.6 53.3 33.5 50.7C31.9 46.7 32.3 41.5 33.2 36.1C34 31.8 38.8 31.8 39.9 36.1Z" fill="#789EAD" />
      <path d="M36.6 43.9C35.5 48.7 35.9 55.3 39.1 58.1C40.3 59.2 42.4 58.3 42.7 56.7C43.4 52.8 41.5 48.4 40 44.2C39.3 42.1 37.1 41.9 36.6 43.9Z" fill="#6B8E9D" />
      <circle cx="31.4" cy="33.2" r="3.25" fill="#F4F2E7" />
      <circle cx="32" cy="33.4" r="1.45" fill="#2D434B" />
      <circle cx="47" cy="33.2" r="3.25" fill="#F4F2E7" />
      <circle cx="47.5" cy="33.4" r="1.45" fill="#2D434B" />
      <path d="M32 27.3C34.1 25.9 36.2 25.5 38.1 26.1M42 26.1C44 25.5 46 25.9 48 27.3" stroke="#648A99" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M35.7 38.8C37 40 39 40 40.3 38.8" stroke="#557C8B" strokeWidth="1.25" strokeLinecap="round" />
      <path d="M23.8 57.9L26.4 58.2M46.8 58.2L49.5 57.9" stroke="#638896" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function AppleArtwork() {
  return (
    <svg {...svgProps}>
      <path d="M37.1 23.9C31.6 19.7 23 20.1 18.1 26.6C12.3 34.4 15.4 48.2 21.7 55.7C25.7 60.5 30.7 62.1 36.9 59.9C43.2 62.2 48.3 60.3 52.2 55.7C58.7 48.1 61.6 34.5 55.7 26.6C50.9 20.1 42.3 19.7 37.1 23.9Z" fill="#D9463E" />
      <path d="M36.7 25.3C31.9 21.2 23.9 21.7 19.8 28.1C16.6 33.1 16.6 40.8 19.5 47.1C20.2 37.5 25.3 29.1 36.7 25.3Z" fill="#EE6654" />
      <path d="M24.3 35.2C22.4 37.9 21.3 41.5 21.6 44.7C21.9 47.4 23.9 47.7 25.1 45.4C26.4 42.8 28.4 38.4 27.4 36C26.8 34.6 25.4 33.7 24.3 35.2Z" fill="#F18A68" />
      <path d="M37 25C37.1 20.8 38.4 17.2 41.4 14.7" stroke="#76502A" strokeWidth="2.8" strokeLinecap="round" />
      <path d="M40.8 18.4C45.6 13.1 53 12.6 58.9 13.8C58.1 20.2 53 25.9 45.4 26.4C42.9 26.6 40.8 23.2 40.8 18.4Z" fill="#5D914D" />
      <path d="M43 22.7C47.1 18.9 51.3 16.9 56.2 15.2" stroke="#4A793F" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M28.6 58.9C32 60.9 35.4 60.8 38.2 59.7" stroke="#C33A37" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function CarArtwork() {
  return (
    <svg {...svgProps}>
      <path d="M13.7 48.6L16.3 38.9C17.3 35.2 20.2 32.6 23.8 31.9L28.2 31.1L34.1 23.8C35.2 22.4 36.8 21.5 38.6 21.5H49.5C53.7 21.5 57.6 24 59.4 27.8L63.6 36.7C65 37.5 66.2 39.1 66.2 41V49C66.2 51.8 64 54 61.2 54H15.4C12.9 54 11.4 51.7 11.9 49.5C12.2 48.9 12.9 48.6 13.7 48.6Z" fill="#3785AE" />
      <path d="M29.8 31.6L35 25.4C35.9 24.3 37.2 23.6 38.6 23.6H47.3V32.2H30.1C29.7 32.2 29.6 31.9 29.8 31.6Z" fill="#C9E3E5" />
      <path d="M49.4 23.8H50.1C53.2 24.1 56.1 26.1 57.4 28.9L58.8 32.1H49.4V23.8Z" fill="#B5D8DE" />
      <path d="M32.9 24.8L28.2 31.1L37.1 31.1V24.8H32.9Z" fill="#E0EFF0" />
      <path d="M48.4 23.9V39" stroke="#26759D" strokeWidth="1.7" />
      <path d="M17.1 39.3H60.9" stroke="#2E759A" strokeWidth="1.3" />
      <path d="M12.7 41.2C12.2 38.7 13.7 36.7 16.2 36.3L18.5 36L17.2 42.4C15.7 43.4 13.2 43.3 12.7 41.2Z" fill="#F4C43B" />
      <path d="M62 39.4C64.4 39.4 66 40.9 65.4 43.4C65 45.2 63.2 46 61.2 45.8L61 39.5C61.3 39.5 61.6 39.4 62 39.4Z" fill="#E66A42" />
      <circle cx="25" cy="52.3" r="8.1" fill="#274452" />
      <circle cx="25" cy="52.3" r="4.55" fill="#B9C9C5" />
      <circle cx="25" cy="52.3" r="2" fill="#E7E6D9" />
      <circle cx="53.5" cy="52.3" r="8.1" fill="#274452" />
      <circle cx="53.5" cy="52.3" r="4.55" fill="#B9C9C5" />
      <circle cx="53.5" cy="52.3" r="2" fill="#E7E6D9" />
      <path d="M34.6 39.4H41.8" stroke="#205E7D" strokeWidth="2.1" strokeLinecap="round" />
      <path d="M15.3 47.4C16.1 45.9 17.7 45.1 19.4 45.1H21.4" stroke="#64AAC4" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function BearArtwork() {
  return (
    <svg {...svgProps}>
      <path d="M24.1 25.4C20.5 23.2 20.4 17.5 23.8 15.2C26.4 13.5 30 14.8 31.3 17.7C35.2 16.1 40.2 16.1 44 17.7C45.5 14.8 49.1 13.5 51.7 15.3C55.1 17.6 55 23.2 51.3 25.4C55.2 30.2 56.5 37.1 54.7 44.1C53.7 47.9 51.4 51 48.5 53C49.6 57.6 47.2 62.1 42.9 63.2C40.7 63.8 38.3 62.4 37 60.6C35.5 62.4 33.2 63.8 31 63.2C26.7 62.1 24.3 57.6 25.4 53C22.5 51 20.2 47.9 19.2 44.1C17.4 37.1 18.7 30.2 24.1 25.4Z" fill="#9A6A4E" />
      <path d="M23.6 17.7C21.7 20.1 23.2 23 26 23.8C28.6 24.5 30.7 22.4 30.4 20C30.1 17.6 25.5 15.3 23.6 17.7Z" fill="#B9825A" />
      <path d="M51.6 17.7C53.5 20.1 52 23 49.2 23.8C46.6 24.5 44.5 22.4 44.8 20C45.1 17.6 49.7 15.3 51.6 17.7Z" fill="#B9825A" />
      <path d="M23.8 40.5C24.1 48.8 28.9 56.3 37 56.6C45.1 56.3 49.9 48.8 50.2 40.5C50.5 32.5 44.5 26.3 37 26.3C29.5 26.3 23.5 32.5 23.8 40.5Z" fill="#A97452" />
      <path d="M30.9 44.3C31.7 48.7 34 51.2 37 51.2C40 51.2 42.3 48.7 43.1 44.3C41.2 42.8 32.8 42.8 30.9 44.3Z" fill="#D7A67B" />
      <ellipse cx="30.9" cy="37.4" rx="3.1" ry="3.8" fill="#3D3030" />
      <ellipse cx="43.1" cy="37.4" rx="3.1" ry="3.8" fill="#3D3030" />
      <circle cx="31.8" cy="36.4" r="0.75" fill="#F8F1DF" />
      <circle cx="44" cy="36.4" r="0.75" fill="#F8F1DF" />
      <path d="M34.7 44.5C35.8 43.5 38.2 43.5 39.3 44.5C38.7 46.6 35.3 46.6 34.7 44.5Z" fill="#573B33" />
      <path d="M37 46C37 48.2 34.6 49.2 33.1 47.9M37 46C37 48.2 39.4 49.2 40.9 47.9" stroke="#71483A" strokeWidth="1.1" strokeLinecap="round" />
      <path d="M25.5 55.5C23.3 58.8 25.2 62.1 28.4 62.7C30.5 63.1 32.1 61.4 31.8 59.5M48.5 55.5C50.7 58.8 48.8 62.1 45.6 62.7C43.5 63.1 41.9 61.4 42.2 59.5" fill="#8D5E46" />
    </svg>
  );
}

function renderArtwork(subject: PreviewSubject): ReactNode {
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
    default:
      return null;
  }
}

export default function ElevatedDepth() {
  return (
    <MemoryBoard
      direction="Soft Depth C"
      note="Look closely · the pairs are waiting"
      renderArtwork={renderArtwork}
    />
  );
}