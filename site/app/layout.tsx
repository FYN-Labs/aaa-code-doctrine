import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FYN Assurance — Governed Codex Rollout",
  description:
    "Geführte Codex-Einführung für deutsche und europäische Engineering-Organisationen — mit klaren Arbeitsregeln, Academy und menschlichen Entscheidungsgrenzen.",
  openGraph: {
    type: "website",
    locale: "de_DE",
    siteName: "FYN Assurance",
    title: "FYN Assurance — Governed Codex Rollout",
    description:
      "Codex einführen, ohne die Kontrolle aus der Hand zu geben. Doctrine, Academy und ein klar begrenzter Sechs-Wochen-Pilot von FYN Labs.",
  },
  twitter: {
    card: "summary",
    title: "FYN Assurance — Governed Codex Rollout",
    description:
      "Doctrine, Academy und ein klar begrenzter Sechs-Wochen-Pilot für deutsche und europäische Engineering-Organisationen.",
  },
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de">
      <body>{children}</body>
    </html>
  );
}
