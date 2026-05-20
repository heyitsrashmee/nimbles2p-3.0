/** Inline icons for WhyNimblePage (avoids lucide-react vendor chunk issues in dev). */

function Icon({ size = 18, color = "currentColor", children }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {children}
    </svg>
  );
}

export function ShieldCheckIcon(props) {
  return (
    <Icon {...props}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
      <path d="m9 12 2 2 4-4" />
    </Icon>
  );
}

export function ActivityIcon(props) {
  return (
    <Icon {...props}>
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </Icon>
  );
}

export function LayersIcon(props) {
  return (
    <Icon {...props}>
      <path d="m12.83 2.18 8 3.33a1 1 0 0 1 0 1.86l-8 3.33a2 2 0 0 1-1.66 0l-8-3.33a1 1 0 0 1 0-1.86l8-3.33a2 2 0 0 1 1.66 0Z" />
      <path d="m22 12.65-8 3.33a2 2 0 0 1-1.66 0l-8-3.33" />
      <path d="m22 17.65-8 3.33a2 2 0 0 1-1.66 0l-8-3.33" />
    </Icon>
  );
}

export function ZapIcon(props) {
  return (
    <Icon {...props}>
      <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8Z" />
    </Icon>
  );
}

export function UsersIcon(props) {
  return (
    <Icon {...props}>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </Icon>
  );
}
