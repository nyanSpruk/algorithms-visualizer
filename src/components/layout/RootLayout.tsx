import { Outlet, useLocation } from "react-router-dom";
import { Header } from "./Header";
import { TooSmallScreen } from "./TooSmallScreen";
import { useScreenSize } from "hooks/useScreenSize";

export function RootLayout() {
  const location = useLocation();
  const width = useScreenSize();
  // TODO: Optimize so that smaller screens will be able to use visualiser in future (up to 900px in size). Second step after that is for mobile.
  const TOO_SMALL = 1400;
  const isSmallScreen = width < TOO_SMALL;

  const isAlwaysAllowed = location.pathname === "/about";

  return (
    <div className="bg-background text-foreground flex h-screen w-screen flex-col overflow-hidden">
      <Header isSmallScreen={isSmallScreen} />

      <main className="flex-1 overflow-y-auto pt-16 pb-12">
        {!isAlwaysAllowed && isSmallScreen ? <TooSmallScreen /> : <Outlet />}
      </main>
    </div>
  );
}
