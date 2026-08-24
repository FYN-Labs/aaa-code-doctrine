# FYN Assurance Architecture

## Status

Diese Architektur ist ein überprüfbares Zielbild und heute nicht als laufender
Dienst verfügbar. AAA Code bleibt no-runtime und führt keine Prüfarme aus.

## Owner-Schnitt

```text
Codex / IDE / CI
       |
       | MCP oder CI API
       v
Customer-hosted policy gateway
identity · allowlist · data class · scrub · route
       |
       v
Assurance runtime in the customer environment
frozen subject · blind arms · identity · receipt
       |
       v
Existing Git / CI / GRC / HumanGate
```

MCP ist dabei nur Transport und Tool-Surface. Die Runtime müsste unabhängige
Arme, tatsächlich aufgelöste Modellidentität, Blindheit, Datenpolitik,
Fehlermodi und Receipts selbst kontrollieren. Git, CI und die benannte
Unternehmensrolle bleiben Release Authority.

Die aktuelle [MCP-Spezifikation](https://modelcontextprotocol.io/specification/2026-07-28)
führt Model Sampling nur noch als deprecated capability. Eine neue
Assurance-Runtime darf daher nicht darauf vertrauen, dass der aufrufende Client
bestimmte Reviewer-Modelle korrekt auswählt. OpenAI dokumentiert MCP als
Tool-Schnittstelle für Codex getrennt in der
[Codex-MCP-Dokumentation](https://developers.openai.com/codex/mcp/).

## Minimale Tool-Surface

- `assurance_submit`: Frozen Subject, Prüffrage, Acceptance, Datenklasse,
  Policy-Version und Authority Limits einreichen; idempotenten Handle erhalten.
- `assurance_get`: Status, Einzelberichte, Widersprüche und Receipt abrufen.
- optional `assurance_cancel`: den eigenen laufenden Auftrag abbrechen.

Kein eigener Chat, kein eigenes SCM, kein eigener User Store und kein eigener
Release-Workflow.

## Request Contract

```text
subject_ref / subject_hash:
scope:
question:
acceptance_criteria:
data_class:
allowed_evidence:
review_mode: blind | challenge
required_distinct_families:
policy_version:
human_gate:
expires_at:
```

Der Contract erteilt keine zusätzliche Berechtigung. Nicht freigegebene Daten,
Provider, Kosten oder Aktionen bleiben blockiert.

## Receipt Contract

```text
review_id:
subject_hash:
policy_version:
arm_status:
requested_model / resolved_model / provider_family:
provider_request_reference:
prompt_hash / response_hash:
individual_verdicts:
disagreements:
integrator_resolution:
assurance_status:
residual_gaps:
signature_reference:
```

Ein Receipt belegt, was angefordert, beobachtet und integriert wurde. Es kann
nicht kryptografisch beweisen, welche internen Modellgewichte ein Provider
geladen hat, und erteilt keine Freigabe.

## Blind cross-family arms

Ein materielles Gate ist nur dann `SATISFIED`, wenn:

1. Primary und zwei zusätzliche Arme auf denselben Frozen Subject zeigen;
2. beide Reviewer in frischen, getrennten Kontexten laufen;
3. kein Arm vor Abschluss den Bericht des anderen sieht;
4. drei unterschiedliche, qualifizierte Modellfamilien und Entwickler
   tatsächlich aufgelöst und dokumentiert sind;
5. fehlgeschlagene, leere, gleiche oder still geroutete Arme nicht zählen;
6. Widersprüche erhalten bleiben und evidenzbasiert aufgelöst oder geparkt
   werden.

Fehlt ein gültiger Arm, lautet der Status `BLOCKED_ASSURANCE` oder
`UNVERIFIED`, nie ein synthetischer PASS.

## EU- und Frankfurt-Wortlaut

Ein Frankfurt-Endpunkt beweist nicht automatisch Frankfurt-Inferenz. AWS
unterscheidet In-Region-, geografische und globale Inference Profiles. Bei
einem EU-Profil kann eine Anfrage innerhalb der freigegebenen europäischen
Zielregionen verarbeitet werden. Die dokumentierte Route muss daher je Modell,
Version und Profil geprüft werden.

Zulässige Zielaussage für eine spätere Managed-Variante:

> Service und Evidenzspeicher laufen in Frankfurt. Modellinferenz und
> Promptverarbeitung sind auf freigegebene AWS-EU-Regionen begrenzt. Globale
> Profile und stille Fallbacks sind gesperrt.

Eine Aussage „alle Inferenz läuft in Frankfurt“ ist erst zulässig, wenn jeder
benannte Modellpfad nachweislich In-Region in `eu-central-1` läuft oder die
Modelle im Kundensystem in Frankfurt selbst gehostet werden.

Primärquellen:

- [AWS: regional model availability](https://docs.aws.amazon.com/bedrock/latest/userguide/models-region-compatibility.html)
- [AWS: geographic cross-Region inference](https://docs.aws.amazon.com/bedrock/latest/userguide/geographic-cross-region-inference.html)
- [AWS: inference profile routing](https://docs.aws.amazon.com/bedrock/latest/userguide/inference-profiles-support.html)
- [AWS: data protection](https://docs.aws.amazon.com/bedrock/latest/userguide/data-protection.html)
- [AWS: data retention](https://docs.aws.amazon.com/bedrock/latest/userguide/data-retention.html)
- [AWS: PrivateLink](https://docs.aws.amazon.com/bedrock/latest/userguide/usingVPC.html)

## Build Cutline

Vor einem bezahlten Pilot werden nur Request-/Receipt-Vertrag und ein dünner
Referenzadapter spezifiziert. Ein produktiver Broker, Queue, Dashboard,
Telemetry Store oder Multi-Tenant-SaaS entsteht erst, wenn reale Piloten
denselben fehlenden Owner wiederholt belegen.
