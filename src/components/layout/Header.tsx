import { Link, useLocation } from "react-router-dom";
import { Button } from "ui/button";
import { cn } from "lib/utils";
import logo from "/logo.png";
import type { HeaderProps } from "interfaces/layout";

export function Header({ isSmallScreen }: HeaderProps = {}) {
  const location = useLocation();
  const current = location.pathname;

  const navItems = isSmallScreen
    ? [{ label: "About", path: "/about" }]
    : [
        { label: "Visualizer", path: "/visualizer" },
        { label: "About", path: "/about" },
      ];

  return (
    <header className="supports-backdrop-filter:bg-background/80 bg-accent/20 fixed top-0 right-0 left-0 z-20 flex items-center justify-between border-b px-4 py-4 backdrop-blur lg:px-8">
      <Link
        to="/"
        className="flex items-center gap-2 transition hover:opacity-80"
      >
        <img
          src={logo}
          alt="Logo"
          className="h-6 w-6 rounded-sm object-contain"
        />
        <span className="text-primary text-left text-xl leading-tight font-bold lg:text-2xl">
          <span className="block sm:hidden">
            Algorithm
            <br />
            Visualizer
          </span>
          <span className="hidden sm:inline">Algorithm Visualizer</span>
        </span>
      </Link>

      <div className="flex items-center gap-3">
        {navItems.map((item) => {
          const isActive =
            current === item.path ||
            (item.path !== "/" && current.startsWith(item.path));

          return (
            <Button
              key={item.path}
              asChild
              variant={isActive ? "default" : "outline"}
              className={cn(
                "transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground hover:bg-primary/90"
                  : "hover:bg-muted",
              )}
            >
              <Link to={item.path}>{item.label}</Link>
            </Button>
          );
        })}
      </div>
    </header>
  );
}
