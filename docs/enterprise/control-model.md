# FYN Control Model

## Zweck und Grenze

Das Control Model ordnet Aufträge, Laufzeitfähigkeit, unabhängige Prüfung und
menschliche Entscheidungen. Es ist ledgerneutral: Ein Unternehmen nutzt sein
bestehendes Ticket-, Git-, CI- und GRC-System. FYN Assurance führt dafür kein
zweites Execution Ledger und keine automatische Freigabeinstanz ein.

## Kontrollkette

| Stufe | Verantwortungsfrage | Zulässiger Output |
| --- | --- | --- |
| Stage 0.5 — Contract Gate | Ist der Auftrag vollständig, begrenzt, ausführbar und prüfbar? | `CONTRACT_PASS`, `REVISE` oder `REJECT`. |
| Stage 0.65 — Runtime Readiness | Sind Umgebung, Identität, Datenklasse, Fähigkeiten, Budget, Rückfall und HumanGate für genau diesen Lauf geklärt? | `RUNTIME_READY_PASS` oder ein benannter Blocker wie `BLOCKED_AUTH`, `BLOCKED_BUDGET`, `BLOCKED_DEPENDENCY` oder `NEEDS_HUMAN`. |
| Worker | Bearbeitet der Agent nur den freigegebenen Scope? | Arbeitsartefakt plus evidenzmarkierter Bericht; kein eigener PASS über die Gesamtarbeit. |
| CAO | Sind Scope, Nachweise, Abweichungen und offene Risiken unabhängig geprüft? | `PASS`, `REJECT` oder `PARK`; keine Umsetzung und kein `Done`. |
| Controller | Sind CAO-Befund, Restlücken, Reversibilität und Autoritätsgrenze korrekt integriert? | Entscheidungskarte und HumanGate-Routing. |
| Unternehmensverantwortung | Wer trägt die wirksame Entscheidung? | Freigabe, Rückgabe, Stopp oder Eskalation innerhalb der eigenen Governance. |

## Minimaler Contract

Ein delegierbarer Auftrag enthält mindestens:

- Ziel, zuständige Rolle und Source of Truth;
- zulässigen Scope und ausdrücklich ausgeschlossene Aktionen;
- Akzeptanzkriterien und die tatsächlich erforderlichen Prüfschritte;
- Datenklasse, Fähigkeiten, Identität, Kosten- und Providergrenzen;
- Abhängigkeiten, Rückfall, Kill Switch und Rückbaupfad;
- HumanGate, Reporting und erwartete Evidence Receipts.

Unvollständige Verträge werden nicht während der Ausführung improvisiert. Sie
gehen an die zuständige Rolle zurück.

## HumanGate-Leiter

| Gate | Typische Entscheidung | Autoritätsgrenze |
| --- | --- | --- |
| HG-0 | Lesen, orientieren, entwerfen, simulieren. | Keine externe oder produktive Wirkung. |
| HG-1 | Reversible interne Arbeit im bestätigten Scope. | Benannter Owner und einfacher Rückfall. |
| HG-2 | Begrenzter Change mit fachlicher oder technischer Freigabe. | Risiko- und evidenzabhängige Owner-Freigabe. |
| HG-2.5 | Reversible Release- oder Integrationsentscheidung mit vollständiger CAO-/Controller-Evidenz. | Benannte CEO-/Release-Authority; kein Worker- oder Modellentscheid. |
| HG-3 | Kritische, aber wiederherstellbare Entscheidung mit erhöhtem Blast Radius. | Benannte Unternehmensleitung entscheidet anhand einer Critical-Decision-Card. |
| HG-3.5 | Zeitversetzte Eskalation, wenn eine kritische Entscheidung nicht autonom getroffen werden darf. | Chief-of-Staff- oder Founder-Proxy bereitet vor; die eigentliche Autorität bleibt benannt. |
| HG-4 | Strategische, irreversible oder rechtlich besonders relevante Entscheidung. | Founder, Vorstand oder ausdrücklich zuständiges Organ. |

Die Einstufung erteilt keine Berechtigung. Sie benennt, welche menschliche
Entscheidung vor der Wirkung nachweisbar sein muss.

## CAO, Reviewer und Zange

Der Chief Audit Officer ist eine unabhängige Rolle, kein besonders strenger
Worker. Er baut nicht, repariert nicht und setzt keinen Abschlussstatus. Für
wesentliche Architektur-, Inferenz-, Eval- oder Auditentscheidungen kann die
CAO-Prüfung zusätzlich einen blinden, modellfamiliengetrennten Gegencheck
verlangen. Ohne nachgewiesene Identität, Trennung, Vollständigkeit und gleichen
Frozen Subject bleibt das Ergebnis `UNVERIFIED` oder `BLOCKED_ASSURANCE`.

## SessionEndSync

Jeder relevante Lauf endet mit einem kurzen Classifier:

```text
Workspace / Repository:
Branch / Frozen Subject:
Outcome:
Verification actually run:
Durable architecture or policy update: none | proposed | required
Execution ledger: none | update | follow-up
Assurance status: NOT_REQUIRED | SATISFIED | REVISE | BLOCKED_ASSURANCE | UNVERIFIED
HumanGate:
Next owner:
```

Ein Chatverlauf ist kein Auditbeleg. Ein Ticket ist kein Memory. Ein grüner
statischer Test ist kein Runtime- oder Release-Nachweis.
