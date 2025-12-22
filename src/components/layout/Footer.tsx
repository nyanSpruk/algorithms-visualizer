export function Footer() {
  return (
    <footer className="bg-background/95 text-muted-foreground fixed right-0 bottom-0 left-0 border-t py-2 text-center text-sm backdrop-blur sm:py-4">
      Created by{" "}
      <a
        href="https://github.com/nyanspruk"
        target="_blank"
        rel="noopener noreferrer"
        className="text-foreground hover:text-primary font-semibold underline-offset-4 transition-colors hover:underline"
      >
        Nik Jan Špruk
      </a>{" "}
      — {new Date().getFullYear()}
    </footer>
  );
}
