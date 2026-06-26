"use client";

import { createContext, useContext, useState } from "react";
import Preloader from "./Preloader";

// Whether the intro curtain has lifted — components below the fold use this to
// stagger their entrance once the page is revealed.
const IntroContext = createContext(false);

export const useIntroComplete = () => useContext(IntroContext);

export default function IntroProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [complete, setComplete] = useState(false);

  return (
    <IntroContext.Provider value={complete}>
      {children}
      <Preloader onReveal={() => setComplete(true)} />
    </IntroContext.Provider>
  );
}
