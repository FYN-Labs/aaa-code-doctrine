# Privacy and Regulated Controls

## PII Scrubbing ist keine DPIA

Zwei Begriffe müssen getrennt bleiben:

- **PII-, Secret- und Sensitive-Data-Scrubbing** ist eine technische Kontrolle,
  die definierte Datenklassen erkennen, blockieren, redigieren oder
  pseudonymisieren kann. Sie hat False Positives und False Negatives.
- **DPIA / Datenschutz-Folgenabschätzung** ist eine organisations- und
  verarbeitungsspezifische Bewertung von Notwendigkeit, Verhältnismäßigkeit,
  Risiken und Maßnahmen. Sie kann nicht durch einen Scanner ersetzt werden.

Der [European Data Protection Board](https://www.edpb.europa.eu/topics/accountability-and-compliance-tools/data-protection-impact-assessment_en)
verlangt eine DPIA vor Verarbeitungen, die voraussichtlich ein hohes Risiko für
Rechte und Freiheiten natürlicher Personen verursachen. Bleibt ein hohes
Restrisiko, ist vor Beginn die zuständige Aufsicht zu konsultieren.

## Kleinste Privacy Firewall

```text
IDE / Codex
    |
identity + approved use case
    |
repository / path / data-class allowlist
    |
secret + PII + health + claim + employee-data classification
    |
block | redact | pseudonymize inside customer boundary
    |
approved local or external model route
    |
patch / finding -> tests -> human and CI gate
    |
metadata receipt + short-lived encrypted evidence vault
```

Mindestkontrollen:

- Default deny für Repositories, Pfade, Nutzer, Zwecke und externe Tools.
- Diff oder Symbolpaket statt unbeschränktem Repository-Upload.
- Block statt stiller Redaction, wenn Bedeutung oder Sicherheit verloren geht.
- Pseudonym-Mapping bleibt im Kundensystem; pseudonymisierte Daten können
  weiterhin personenbezogen sein.
- Consumer Accounts, unfreigegebene Provider und globale Endpunkte sind
  technisch gesperrt.
- Langfristige Logs enthalten standardmäßig Metadaten und Hashes, nicht den
  vollständigen Quelltext oder Prompt.
- Keine individuellen Produktivitäts-Scores, Keystroke-Analyse oder Rankings
  aus Agententelemetrie.
- Human Merge und Release Authority bleiben beim Unternehmen.

## DSGVO- und Beschäftigtendaten

Je Datenfluss sind mindestens Verantwortlicher, Auftragsverarbeiter und
Unterauftragsverarbeiter; Zweck und Rechtsgrundlage; Datenkategorien;
Empfänger und Transfers; Löschfristen; Betroffenenrechte; technische und
organisatorische Maßnahmen sowie DPIA-Entscheid zu dokumentieren.

Bei Beschäftigtendaten muss zusätzlich geprüft werden, ob technische
Ausgestaltung oder Telemetrie Verhalten oder Leistung auswerten kann. Eine
Marketingaussage „wir überwachen niemanden“ ersetzt weder die technische
Prüfung noch die Beteiligung der zuständigen Arbeitnehmervertretung.

## EU AI Act

Ein Coding- oder Reviewassistent wird nicht allein durch den Einsatz in einem
Versicherungsunternehmen zum Hochrisiko-System. Entscheidend ist der konkrete
intended purpose. Sobald das System Beschäftigungsentscheidungen, Zugang,
Underwriting, Pricing, Claims oder vergleichbar erhebliche Entscheidungen
unterstützt, ist neu zu klassifizieren.

[Artikel 4 des EU AI Act](https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng)
verlangt kontextbezogene AI Literacy für Personen, die im Namen von Anbieter
oder Betreiber mit KI-Systemen arbeiten. FYN Academy kann dafür Lern- und
Praxisnachweise liefern; sie ist keine AI-Act-Zertifizierung.

## DORA und Drittparteien

[DORA](https://eur-lex.europa.eu/eli/reg/2022/2554/oj) gilt für erfasste
Finanzunternehmen und lässt ihre Verantwortung auch bei Nutzung von
ICT-Drittanbietern bestehen. Vor Scale müssen insbesondere Kritikalität,
Due Diligence, Informationsregister, Konzentrationsrisiko, präzise SLAs,
Audit- und Behördenrechte, Incident-Unterstützung, Exit, Datenrückgabe und
Wiederanlauf geprüft werden.

Es gibt keine pauschale DORA-Regel, jeden Prompt langfristig zu speichern.
Logging und Retention werden nach Zweck, Kritikalität, Beweisbedarf,
Datenschutz und weiterem Fachrecht festgelegt.

## Due-Diligence-Paket vor Scale

1. Use-Case- und Datenflussinventar.
2. DSGVO-, AI-Act- und DORA-Rollenmatrix.
3. DPIA-Screening und dokumentierter Entscheid.
4. DPA, Subprocessor-, Transfer-, Retention- und Löschprüfung.
5. Provider- und Modellroute je Endpoint, Feature und Region.
6. SSO, Least Privilege, Egress Allowlist, Verschlüsselung und Kill Switch.
7. SBOM, Signaturen, Provenance, SAST/SCA, Secret Scan und reproduzierbarer Build.
8. Betriebsrat-/Arbeitnehmervertretungsprüfung vor Pilot-Telemetrie.
9. Provider-Ausfall-, Kontosperr-, Export-, Lösch- und Exit-Test.
10. Schulungsnachweise, Incident-Prozess und periodische Neubewertung.

Diese Unterlagen sind eine Kontroll- und Schulungsgrundlage. Rechtsabteilung,
Datenschutzbeauftragter, Informationssicherheit, Auslagerungsmanagement,
Arbeitnehmervertretung und zuständige Unternehmensorgane behalten ihre
jeweiligen Entscheidungen.
