export type NavLink = {
  href: string;
  label: string;
};

export const primaryLinks: NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/ethos", label: "Ethos" },
  { href: "/technology", label: "Technology" },
  { href: "/drivers", label: "Drivers" },
  { href: "/sustainability", label: "Sustainability" },
];

export const deckLink: NavLink = { href: "/pitch-deck", label: "Pitch Deck" };

// The footer splits the same routes into two readable columns.
export const footerColumns: { heading: string; links: NavLink[] }[] = [
  {
    heading: "Explore",
    links: [
      { href: "/", label: "Home" },
      { href: "/about", label: "About" },
      { href: "/ethos", label: "Ethos" },
      { href: "/sustainability", label: "Sustainability" },
    ],
  },
  {
    heading: "Get involved",
    links: [
      { href: "/drivers", label: "Drive with us" },
      { href: "/technology", label: "Technology" },
      { href: "/pitch-deck", label: "Pitch Deck" },
    ],
  },
];
