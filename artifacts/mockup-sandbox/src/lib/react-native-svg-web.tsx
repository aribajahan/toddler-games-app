import type { SVGProps } from 'react';

type SvgProps = SVGProps<SVGSVGElement> & {
  accessibilityLabel?: string;
  focusable?: boolean;
};

export default function Svg({
  accessibilityLabel,
  children,
  ...props
}: SvgProps) {
  return (
    <svg aria-label={accessibilityLabel} {...props}>
      {children}
    </svg>
  );
}

export function G(props: SVGProps<SVGGElement>) {
  return <g {...props} />;
}

export function Circle(props: SVGProps<SVGCircleElement>) {
  return <circle {...props} />;
}

export function Ellipse(props: SVGProps<SVGEllipseElement>) {
  return <ellipse {...props} />;
}

export function Path(props: SVGProps<SVGPathElement>) {
  return <path {...props} />;
}

export function Rect(props: SVGProps<SVGRectElement>) {
  return <rect {...props} />;
}

export function Polygon(props: SVGProps<SVGPolygonElement>) {
  return <polygon {...props} />;
}

export function Line(props: SVGProps<SVGLineElement>) {
  return <line {...props} />;
}