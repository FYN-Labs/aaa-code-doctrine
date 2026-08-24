# Public Claims Ledger

Stand: 24. August 2026. Jede öffentliche Aussage bleibt beim angegebenen
Status, bis ein neuer Nachweis sie verändert.

| Status | Aussage | Grundlage oder fehlender Nachweis |
| --- | --- | --- |
| `FACT` | AAA Code ist ein MIT-lizenziertes FYN-Labs-Paket mit zwei Skills und ohne eigene Runtime. | [Produktvertrag](../product-contract.md) und [README](../../README.md). |
| `FACT` | Die Doctrine verlangt an materiellen Gates Primary plus zwei zusätzliche blinde, modellfamiliengetrennte Prüfarme. | [Adversarial Assurance Contract](../product-contract.md#adversarial-assurance-contract). |
| `FACT` | Die veröffentlichte v0.3.0-Evidenz behauptet keinen ausgeführten Multi-Model-Assurance-PASS. | [Release Receipt](../../evidence/releases/v0.3.0.json). |
| `FACT` | OpenAI dokumentiert getrennte Enterprise-Rollout-Flächen und MCP für Codex. | [Admin rollout guide](https://developers.openai.com/codex/enterprise/admin-setup/) und [Codex MCP](https://developers.openai.com/codex/mcp/). |
| `FACT` | Der EDPB beschreibt DPIA als Pflicht vor wahrscheinlich hochriskanter Verarbeitung. | [EDPB DPIA](https://www.edpb.europa.eu/topics/accountability-and-compliance-tools/data-protection-impact-assessment_en). |
| `FACT` | EU AI Act und DORA sind amtlich veröffentlicht. | [AI Act](https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng) und [DORA](https://eur-lex.europa.eu/eli/reg/2022/2554/oj). |
| `FACT` | AWS unterscheidet In-Region-, geografische und globale Bedrock-Inference-Routen. | [Regional availability](https://docs.aws.amazon.com/bedrock/latest/userguide/models-region-compatibility.html) und [Geographic inference](https://docs.aws.amazon.com/bedrock/latest/userguide/geographic-cross-region-inference.html). |
| `PLANNED` | FYN Assurance ist der Arbeitsname für Doctrine, geführten Rollout und eine mögliche spätere Assurance-Produktlinie. | Vor Marktfreigabe ist eine professionelle markenrechtliche Ähnlichkeitssuche ausstehend. |
| `FACT` | Ein geführtes Sechs-Wochen-Pilotformat und FYN-Academy-Curricula sind als FYN-Labs-Angebotsformate dokumentiert. | [Pilot](governed-codex-rollout.md) und [Academy](academy.md); Annahme, Termin und Kapazität entstehen erst durch einen konkreten Auftrag. |
| `PLANNED` | Ein customer-hosted MCP-/CI-Adapter mit Review Arms und Receipts ist ein Zielbild. | [Assurance Architecture](assurance-architecture.md); kein produktiver Dienst. |
| `UNVERIFIED` | Wirksamkeit, ROI, Scale-Fähigkeit und konkrete Kundenresultate. | Kein Kundenpilot und keine freigegebene Fallstudie in diesem Paket. |
| `UNVERIFIED` | Konkrete regionale Modellverfügbarkeit, Datenresidenz, Retention oder Zero-Data-Retention. | Muss je Vertrag, Modell, Version, Endpoint, Feature und Tenant geprüft werden. |
| `PROHIBITED` | „FYN Assurance ist rechtlich freigegeben.“ | Keine professionelle Ähnlichkeitssuche oder Markenfreigabe. |
| `PROHIBITED` | „GDPR-, DORA-, EU-AI-Act-konform“, „BaFin-zertifiziert“ oder gleichwertig. | Keine Rechtsberatung, Zertifizierung oder Aufsichtsfreigabe. |
| `PROHIBITED` | „Alle Daten bleiben in Frankfurt/Deutschland/EU.“ | Ohne route-, feature- und vertragsgenauen Nachweis unzulässig. |
| `PROHIBITED` | „Unabhängige Second Opinion verfügbar“ oder „Assurance-PASS“. | Keine ausgeführte Produkt-Runtime und keine gültigen Reviewer-Receipts. |
| `PROHIBITED` | Benannter Versicherer, Logo, Testimonial, Rollout oder Ergebnis. | Keine veröffentlichte Kundenfreigabe. |

## Claim-Gate

Vor Veröffentlichung wird jeder neue Claim als `FACT`, `INFERENCE`,
`HYPOTHESIS`, `PLANNED`, `UNVERIFIED` oder `PROHIBITED` klassifiziert. Ein
technisches Design wird nicht als laufende Fähigkeit dargestellt; eine
Konfiguration nicht als ausgeführter Nachweis; ein Training nicht als
regulatorische Zertifizierung.
