// One stroke family for every icon: 1.5px, round caps, 24px grid.
const Icon = ({ children, size = 22, ...rest }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...rest}>
    {children}
  </svg>
)

// a test tile: glazed top, raw foot
export const TileIcon = (p) => (
  <Icon {...p}><rect x="5" y="3" width="14" height="18" rx="1" /><path d="M5 13c2.5 1.5 4.5-.8 7 .4s4.5.8 7-.6" /></Icon>
)
// a brush, for commissions
export const BrushIcon = (p) => (
  <Icon {...p}><path d="M14.5 4.5 19.5 9.5 11 18l-5 1 1-5z" /><path d="m12.5 6.5 5 5" /></Icon>
)
export const HeartIcon = ({ filled, ...p }) => (
  <Icon {...p}><path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z" fill={filled ? 'currentColor' : 'none'} /></Icon>
)
// a kiln with an arched door, for the atelier
export const KilnIcon = (p) => (
  <Icon {...p}><path d="M4 21V9l8-5 8 5v12z" /><path d="M9 21v-5a3 3 0 0 1 6 0v5" /></Icon>
)
export const ArrowIcon = (p) => (
  <Icon {...p}><path d="M5 12h14M13 6l6 6-6 6" /></Icon>
)
export const BackIcon = (p) => (
  <Icon {...p}><path d="M19 12H5M11 6l-6 6 6 6" /></Icon>
)
export const ChatIcon = (p) => (
  <Icon {...p}><path d="M4 19.5 5.3 16A8 8 0 1 1 8 18.7z" /></Icon>
)
export const MailIcon = (p) => (
  <Icon {...p}><rect x="3.5" y="5.5" width="17" height="13" rx="1" /><path d="m4 6.5 8 6 8-6" /></Icon>
)
