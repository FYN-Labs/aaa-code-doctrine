# Governed Codex Rollout

## Einstiegsangebot

Ein geführter Sechs-Wochen-Pilot bringt Codex in einen klar abgegrenzten
Engineering-Workflow, ohne aus der Freischaltung bereits eine Scale- oder
Compliance-Zusage abzuleiten. Die Organisation besitzt Workspace, Accounts,
Repos, Policies und Freigaben; FYN Labs liefert Doctrine, Arbeitsmodell,
Academy, Kalibrierung und das Entscheidungsset für den nächsten Schritt.

Die offizielle [OpenAI Admin Rollout Guidance](https://developers.openai.com/codex/enterprise/admin-setup/)
trennt Workspace Access, lokale Runtime-Policy, Codex Cloud, Platform API,
Plugins/Connectoren und Berechtigungen verbundener Systeme. Der Pilot ordnet
diese Flächen, ersetzt aber nicht die kundeneigene Administration.

## Empfohlener Pilotumfang

- zwei Teams, ungefähr 24 Teilnehmer und bis zu drei repräsentative Repositories;
- eine klar definierte Taskklasse, etwa kleine Features und Bugfixes;
- synthetische oder redigierte Baseline-Fälle vor freigegebener Live-Arbeit;
- benannte Owner aus Engineering, Plattform, Security/Privacy und Management;
- bestehende menschliche PR-, Merge- und Release-Freigaben bleiben bestehen.

Ausgeschlossen sind Produktionseingriffe, Secrets, besondere Kategorien
personenbezogener Daten, autonome Veröffentlichung, individueller
Produktivitätsvergleich und ein sofortiger konzernweiter Rollout.

## Sechs Wochen

| Woche | Ergebnis |
| --- | --- |
| 1 — Rahmen | Pilot Charter, Verantwortungen, Datenklassen, Use Cases, Baseline, Success- und Stop-Kriterien. |
| 2 — Arbeitsmodell | Managed-Configuration-Plan, AAA-Code-Ladder, Contracts, Review-Routinen und HumanGates. |
| 3 — Enablement | Rollenbasierte Academy-Labs und erster synthetischer End-to-End-Fall. |
| 4 — Pilotbetrieb | Begrenzte reale Anwendung mit Exception-, Support- und Incident-Prozess. |
| 5 — Evidenz | Nutzung, Hard Fails, Rework, Review-Loops, Kontrollabweichungen und Restlücken. |
| 6 — Entscheidung | `SCALE`, `REVISE` oder `STOP` plus priorisierter 90-Tage-Plan. |

## Deliverables

- Pilot Charter und Responsibility Map.
- Repository-, Daten-, Tool- und Provider-Allowlist als Entscheidungsvorlage.
- Codex-Setup- und Arbeitsmodell ohne Zugangsdaten.
- Worker Contract, Stage-0.5-/0.65-Receipts und HumanGate-Matrix.
- Academy-Unterlagen, Praxisfälle, Rubriken und Teilnahme-/Kompetenznachweise.
- Evidence Scorecard, Exception Register und 90-Tage-Scale-Plan.

## Messung

Messung startet ohne vorgegebene Erfolgszahlen. Im Charter werden Population,
Event, Zähler/Nenner, Baseline, Zeitfenster und Scale-/Stop-Regel festgelegt.

Geeignete Dimensionen:

- Aktivierung: erster gültiger Workflow- und Evidence-Receipt;
- Kompetenz: praktische Rubrik, Hard-Fail- und Retention-Rate;
- Mechanismus: unnötige neue Owner, Stores, Queues, States und Repair Loops;
- Guardrails: Defects, Security-, Privacy-, Rollback- und Release-Befunde;
- Betrieb: Supportfälle, Policy-Version, Konfigurationsdrift und Exit-Test.

Keine individuelle Entwickler-Rangliste.

## Scale-Leiter

```text
24-person evidence pilot
        -> 100-150 person operating pilot
        -> 400-500 person material-gate rollout
        -> controlled waves to 2,000
```

Jede Stufe benötigt eine neue Entscheidung. Ein großer Rollout beginnt erst,
wenn Datenpfad, Offboarding, Support, Academy, Provider-Ausfall, Receipt-
Vollständigkeit und interne Trainerstruktur nachweislich funktionieren.

## Angebotsgrenze

Der Pilot ist keine Rechtsberatung, DPIA, Sicherheitszertifizierung,
Produktivitätsgarantie oder Produktionsfreigabe. Ein customer-hosted
Assurance Gateway ist eine spätere Produktstufe und nicht Bestandteil des
dokumentierten Rollout-Angebots. Annahme, Termin, Kapazität und Lieferumfang
entstehen erst durch ein schriftliches Pilot Charter und einen konkreten
Auftrag.
