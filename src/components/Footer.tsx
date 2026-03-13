import { Github, Twitter } from "lucide-react";

const GITHUB_URL = "https://github.com/Vladimirr124";
const TWITTER_URL = "https://x.com/Vladimir5307761";

export function Footer() {
  return (
    <footer className="mt-auto pt-8 pb-6 border-t border-[var(--border)]">
      <p className="text-sm text-[var(--muted-foreground)] mb-3">
        Built by Vladimir Chagay during Hack with YO
      </p>
      <div className="flex items-center gap-4">
        <a
          href={GITHUB_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm text-[var(--muted-foreground)] hover:text-[var(--yo-accent)] transition-colors"
          aria-label="GitHub"
        >
          <Github className="h-4 w-4" />
          GitHub
        </a>
        <a
          href={TWITTER_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm text-[var(--muted-foreground)] hover:text-[var(--yo-accent)] transition-colors"
          aria-label="Twitter"
        >
          <Twitter className="h-4 w-4" />
          Twitter
        </a>
      </div>
    </footer>
  );
}
