const controlStages = [
  ["0.5", "Contract Gate", "Ist der Auftrag vollständig, begrenzt und prüfbar?"],
  ["0.65", "Runtime Readiness", "Sind Umgebung, Datenklasse, Fähigkeiten und Stop-Grenzen geklärt?"],
  ["01", "Worker", "Bearbeitet der Agent nur den freigegebenen Scope und berichtet Evidenz?"],
  ["02", "CAO", "Prüft eine unabhängige Rolle Nachweise, Scope und offene Befunde?"],
  ["03", "Controller", "Werden Widersprüche, Restlücken und Eskalationen korrekt integriert?"],
  ["HG", "Human Gate", "Trifft die benannte Unternehmensrolle die wirksame Entscheidung?"],
];

const academyTracks = [
  {
    duration: "1 Tag",
    title: "Executive & Governance",
    audience: "Engineering Leadership · Risk · Produkt",
    topics: ["Native-first Doctrine", "Rollen und HumanGates", "Evidenz statt Green-Check"],
  },
  {
    duration: "2 Tage",
    title: "Practitioner",
    audience: "Entwickler · Reviewer · Plattformteams",
    topics: ["Codex-Arbeitsmodell", "Stage 0.5 und 0.65", "CAO- und Review-Praxis"],
  },
  {
    duration: "5 Tage",
    title: "Trainer & Assurance Lead",
    audience: "Multiplikatoren · Audit · Enablement",
    topics: ["Train-the-Trainer", "Eval- und Receipt-Design", "Kalibrierte Praxisprüfung"],
  },
];

const pilotWeeks = [
  ["01", "Rahmen", "Scope, Rollen, Datenklassen, Erfolg und Stop-Kriterien."],
  ["02", "Arbeitsmodell", "Geeignete Aufgaben, Codex-Konfiguration und Teamregeln."],
  ["03", "Enablement", "Praxisnahe Academy-Sessions am freigegebenen Workflow."],
  ["04", "Pilotbetrieb", "Begleitete Anwendung mit dokumentierten Ausnahmen."],
  ["05", "Evidenz", "Nutzung, Reibung, Risiken und offene Entscheidungen."],
  ["06", "Übergabe", "Betriebsmodell und priorisierter 90-Tage-Plan."],
];

const sources = [
  ["OpenAI", "Admin rollout guide", "https://developers.openai.com/codex/enterprise/admin-setup/"],
  ["OpenAI", "Codex MCP", "https://developers.openai.com/codex/mcp/"],
  ["EDPB", "Data Protection Impact Assessment", "https://www.edpb.europa.eu/topics/accountability-and-compliance-tools/data-protection-impact-assessment_en"],
  ["EU", "AI Act", "https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/eng"],
  ["EU", "DORA", "https://eur-lex.europa.eu/eli/reg/2022/2554/oj"],
  ["AWS", "Bedrock geographic inference", "https://docs.aws.amazon.com/bedrock/latest/userguide/geographic-cross-region-inference.html"],
];

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main-content">Zum Inhalt springen</a>
      <header>
      <nav className="nav-shell" aria-label="Hauptnavigation">
        <a className="brand" href="#top" aria-label="FYN Assurance Startseite">
          <span className="brand-mark" aria-hidden="true">F</span>
          <span>
            <strong>FYN Assurance</strong>
            <small>by FYN Labs · Arbeitstitel</small>
          </span>
        </a>
        <div className="nav-links">
          <a href="#angebot">Angebot</a>
          <a href="#kontrollmodell">Kontrollmodell</a>
          <a href="#academy">Academy</a>
          <a className="nav-cta" href="#pilot">Pilot prüfen</a>
        </div>
      </nav>
      </header>

      <main id="main-content" tabIndex={-1}>
      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow">Governed Codex Rollout · Deutschland &amp; EU</p>
          <h1>Codex einführen, ohne die Kontrolle aus der Hand zu geben.</h1>
          <p className="lede">
            FYN Labs begleitet ausgewählte Engineering-Teams in sechs Wochen
            vom ersten Rahmen bis zu einem nachvollziehbaren Pilotbetrieb —
            mit klaren Arbeitsregeln, begrenzten Anwendungsfällen und
            menschlichen Entscheidungsgrenzen.
          </p>
          <div className="hero-actions">
            <a className="button-primary" href="#pilot">6-Wochen-Pilot prüfen</a>
            <a className="button-secondary" href="https://github.com/FYN-Labs/aaa-code-doctrine">
              Open Doctrine ansehen
            </a>
          </div>
          <ul className="trust-row" aria-label="Pilotprinzipien">
            <li>Abgegrenzter Scope</li>
            <li>Keine pauschale Compliance-Zusage</li>
            <li>Human Gates bleiben bestehen</li>
          </ul>
        </div>

        <aside className="pilot-card" aria-label="Ablauf des Pilotprogramms">
          <div className="card-kicker">
            <span>Codex Engineering Rollout</span>
            <span>6 Wochen</span>
          </div>
          <ol>
            {pilotWeeks.map(([number, title]) => (
              <li key={number}>
                <span>{number}</span>
                <p>{title}</p>
              </li>
            ))}
          </ol>
          <div className="card-status">
            <span className="status-dot" aria-hidden="true" />
            Pilotformat auf Anfrage
          </div>
        </aside>
      </section>

      <section className="fact-strip" aria-label="Produktstatus">
        <p><strong>Open Doctrine</strong><span>öffentlich verfügbar</span></p>
        <p><strong>Governed Rollout</strong><span>Pilotformat auf Anfrage</span></p>
        <p><strong>Assurance Gateway</strong><span>geplante Produktstufe</span></p>
        <p><strong>Release Authority</strong><span>bleibt bei Mensch und CI</span></p>
      </section>

      <section className="section-shell problem-section">
        <div>
          <p className="section-label">Die eigentliche Einführungsfrage</p>
          <h2>Codex freischalten ist noch kein Betriebsmodell.</h2>
        </div>
        <div className="question-list">
          <p><span>01</span>Welche Aufgaben und Daten dürfen in welchen Lauf?</p>
          <p><span>02</span>Wer prüft das Ergebnis unabhängig vom erzeugenden Agenten?</p>
          <p><span>03</span>Welche Evidenz trägt eine Entscheidung — und wer darf sie treffen?</p>
        </div>
      </section>

      <section className="section-shell" id="angebot">
        <header className="section-heading">
          <div>
            <p className="section-label">Ein Portfolio, drei klare Grenzen</p>
            <h2>Doctrine. Rollout. Assurance.</h2>
          </div>
          <p>
            Wir trennen Open Source, angefragte Leistung und geplante Software. Das macht
            Beschaffung, Prüfung und Skalierung nachvollziehbar.
          </p>
        </header>
        <div className="portfolio-grid">
          <article className="portfolio-card">
            <span className="state state-live">Verfügbar</span>
            <p className="card-number">01 / Open Source</p>
            <h3>AAA Code Doctrine</h3>
            <p>Der offene, no-runtime Kern für den kleinsten vollständigen Weg am nativen Owner.</p>
            <a href="https://github.com/FYN-Labs/aaa-code-doctrine">Repository öffnen <span>↗</span></a>
          </article>
          <article className="portfolio-card featured">
            <span className="state state-live">Auf Anfrage</span>
            <p className="card-number">02 / Services</p>
            <h3>Governed Codex Rollout</h3>
            <p>Sechs Wochen für Scope, Arbeitsmodell, Academy, begleiteten Pilot und belastbare nächste Entscheidungen.</p>
            <a href="#pilot">Pilotstruktur ansehen <span>↓</span></a>
          </article>
          <article className="portfolio-card">
            <span className="state state-planned">Geplant</span>
            <p className="card-number">03 / Product</p>
            <h3>Customer-hosted Assurance</h3>
            <p>Eine mögliche MCP- und CI-Schnittstelle für getrennte Prüfarme und signierte Evidence Receipts.</p>
            <a href="#assurance">Zielarchitektur prüfen <span>↓</span></a>
          </article>
        </div>
      </section>

      <section className="control-section" id="kontrollmodell">
        <div className="section-shell">
          <header className="section-heading inverted">
            <div>
              <p className="section-label">Ledgerneutral. Rollenbasiert. Evidenzgebunden.</p>
              <h2>Ein Kontrollpfad statt einer zweiten Plattform.</h2>
            </div>
            <p>
              Bestehende Ticket-, Git-, CI- und GRC-Systeme bleiben Owner. Das
              Modell definiert nur die fehlenden Entscheidungsgrenzen.
            </p>
          </header>
          <div className="control-grid">
            {controlStages.map(([number, title, body]) => (
              <article key={number}>
                <span>{number}</span>
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
          <p className="control-note">
            CAO und Reviewer bauen nicht. Worker und Modelle geben sich nicht selbst frei.
            Ein vollständiger Bericht ist Evidenz — keine Release Authority.
          </p>
        </div>
      </section>

      <section className="section-shell assurance-section" id="assurance">
        <header className="section-heading">
          <div>
            <p className="section-label">Geplante Produktstufe</p>
            <h2>Eine zweite Meinung, die als zweite Meinung nachweisbar ist.</h2>
          </div>
          <p>
            Der MCP-Endpunkt wäre nur die Tür. Die Assurance Runtime müsste
            Blindheit, Modelltrennung, Datenpolitik und Receipts selbst beweisen.
          </p>
        </header>
        <div className="architecture-grid">
          <div className="architecture-diagram" aria-label="Geplante Assurance-Architektur">
            <div className="diagram-node wide"><small>01</small><strong>Codex · IDE · CI</strong><span>frozen subject</span></div>
            <div className="diagram-line" aria-hidden="true" />
            <div className="diagram-node wide accent"><small>02</small><strong>Customer Gateway</strong><span>identity · policy · scrub · route</span></div>
            <div className="diagram-split" aria-hidden="true"><span /><span /></div>
            <div className="diagram-arms">
              <div className="diagram-node"><small>A</small><strong>Blind Arm</strong><span>family one</span></div>
              <div className="diagram-node"><small>B</small><strong>Blind Arm</strong><span>family two</span></div>
            </div>
            <div className="diagram-join" aria-hidden="true" />
            <div className="diagram-node wide"><small>03</small><strong>Evidence Receipt</strong><span>identities · findings · disagreement · status</span></div>
            <div className="diagram-line" aria-hidden="true" />
            <div className="diagram-node wide dark"><small>HG</small><strong>Human &amp; CI Gate</strong><span>decision stays outside the model</span></div>
          </div>
          <div className="assurance-copy">
            <p className="status-banner"><span /> Noch keine verfügbare Runtime</p>
            <h3>Was ein belastbarer Arm beweisen müsste</h3>
            <ul className="check-list">
              <li>identischer Hash und gefrorener Gegenstand für beide Arme;</li>
              <li>getrennte Kontexte ohne gegenseitige Ergebnissicht;</li>
              <li>aufgelöste Modell- und Providerfamilie statt Alias;</li>
              <li>kein stiller Fallback und kein gemitteltes Urteil;</li>
              <li>signiertes Receipt mit Befunden und Restlücken.</li>
            </ul>
            <p className="quiet-copy">
              Die aktuelle Open-Source-Doctrine beschreibt diesen Vertrag. Sie
              führt noch keine Prüfarme aus und behauptet keinen Assurance-PASS.
            </p>
          </div>
        </div>
      </section>

      <section className="region-section">
        <div className="section-shell region-grid">
          <div>
            <p className="section-label">EU-Region ist nicht gleich Frankfurt</p>
            <h2>Regionalität wird pro Modellroute bewiesen, nicht behauptet.</h2>
          </div>
          <div className="region-copy">
            <blockquote>
              Zielaussage für eine spätere Managed-Variante: Service und
              Evidenzspeicher in Frankfurt; Modellinferenz nur über freigegebene
              EU-Regionen; globale Profile und stille Fallbacks gesperrt.
            </blockquote>
            <div className="region-options">
              <article><span>01</span><strong>EU-pinned managed</strong><p>Präziser Datenpfad über freigegebene geografische Inference Profiles.</p></article>
              <article><span>02</span><strong>Strict in-region</strong><p>Nur mit je Modell nachgewiesenem In-Region-Endpunkt und gepinnter Version.</p></article>
              <article><span>03</span><strong>Self-hosted</strong><p>Frankfurt-only ist am klarsten, erzeugt aber eigenes Model-Ops und Lizenzrisiko.</p></article>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell privacy-section" id="privacy">
        <header className="section-heading">
          <div>
            <p className="section-label">Privacy Firewall</p>
            <h2>Scrubbing reduziert Risiko. Es ersetzt keine DPIA.</h2>
          </div>
          <p>
            PII- und Secret-Scrubbing ist eine technische Kontrolle.
            Datenschutz-Folgenabschätzung, Rechtsgrundlage und Mitbestimmung
            bleiben organisationsspezifische Entscheidungen.
          </p>
        </header>
        <div className="privacy-grid">
          <article><span>01</span><h3>Allowlist</h3><p>Freigegebene Repositories, Pfade, Nutzer, Datenklassen und Zwecke.</p></article>
          <article><span>02</span><h3>Minimize</h3><p>Diff oder Symbolpaket statt unbeschränktem Repository-Kontext.</p></article>
          <article><span>03</span><h3>Detect</h3><p>Secrets, PII, Gesundheits-, Schaden- und Beschäftigtendaten klassifizieren.</p></article>
          <article><span>04</span><h3>Block or redact</h3><p>Bei Bedeutungs- oder Sicherheitsverlust blocken statt still zu schwärzen.</p></article>
          <article><span>05</span><h3>Record metadata</h3><p>Policy, Hash, Route, Entscheidung und Teststatus — nicht automatisch Payloads.</p></article>
          <article><span>06</span><h3>Human control</h3><p>Keine individuelle Produktivitätsbewertung; Merge und Release bleiben menschlich.</p></article>
        </div>
        <p className="legal-boundary">
          Designed for GDPR-, DORA- and EU-AI-Act-aware deployment planning.
          Keine Rechtsberatung, Zertifizierung oder regulatorische Freigabe.
        </p>
      </section>

      <section className="academy-section" id="academy">
        <div className="section-shell">
          <header className="section-heading inverted">
            <div>
              <p className="section-label">FYN Academy</p>
              <h2>Vom sicheren Anwenden zum internen Multiplikator.</h2>
            </div>
            <p>
              Rollenbasierte Praxis statt Teilnahme-Badge. Credentials gelten
              für eine benannte Doctrine-, Policy- und Szenarioversion.
            </p>
          </header>
          <div className="academy-grid">
            {academyTracks.map((track) => (
              <article key={track.duration}>
                <p className="academy-duration">{track.duration}</p>
                <h3>{track.title}</h3>
                <p className="academy-audience">{track.audience}</p>
                <ul>{track.topics.map((topic) => <li key={topic}>{topic}</li>)}</ul>
              </article>
            ))}
          </div>
          <div className="credential-strip">
            <span>Practical credential</span>
            <p>Frozen scenario · evidence layers · rubric version · hard-fail status · residual gaps</p>
          </div>
        </div>
      </section>

      <section className="section-shell pilot-section" id="pilot">
        <header className="section-heading">
          <div>
            <p className="section-label">Einstiegsformat auf Anfrage</p>
            <h2>Sechs Wochen bis zu einer belegbaren Scale-, Revise- oder Stop-Entscheidung.</h2>
          </div>
          <p>
            Kein konzernweiter Big Bang. Der Pilot beginnt mit einem klaren
            Team, einem Workflow und einer vorab vereinbarten Nachweisfrage.
          </p>
        </header>
        <div className="week-grid">
          {pilotWeeks.map(([number, title, body]) => (
            <article key={number}>
              <span>{number}</span>
              <div><h3>{title}</h3><p>{body}</p></div>
            </article>
          ))}
        </div>
        <div className="pilot-output">
          <div>
            <p className="section-label">Output</p>
            <h3>Pilot Charter, Arbeitsmodell, Academy-Nachweise, Risikoregister und 90-Tage-Plan.</h3>
          </div>
          <a className="button-primary" href="#kontakt">Pilot-Charter besprechen</a>
        </div>
      </section>

      <section className="truth-section">
        <div className="section-shell truth-grid">
          <div>
            <p className="section-label">Claim Discipline</p>
            <h2>Was diese Website bewusst nicht behauptet.</h2>
          </div>
          <ul>
            <li>keine GDPR-, DORA-, AI-Act- oder BaFin-Zertifizierung;</li>
            <li>keine aktuelle customer-hosted MCP Runtime;</li>
            <li>keine Garantie, dass Daten an einem bestimmten Ort verbleiben;</li>
            <li>keine gemessene Produktivitäts- oder Qualitätssteigerung;</li>
            <li>keinen benannten Kunden, Rollout oder Versicherungsreferenz.</li>
          </ul>
        </div>
      </section>

      <section className="contact-section" id="kontakt">
        <div className="section-shell contact-grid">
          <div>
            <p className="section-label">Nächster kleiner Schritt</p>
            <h2>Ist ein Pilot charterfähig?</h2>
          </div>
          <div>
            <p>
              In einem ersten Scope-Gespräch klären wir genau fünf Punkte:
              Workflow, Team, Datenklasse, Nachweisfrage und Stop-Kriterium.
            </p>
            <div className="hero-actions">
              <a
                className="button-light"
                href="mailto:support@fyn-labs.com?subject=FYN%20Assurance%20Pilot"
              >
                Pilotgespräch anfragen
              </a>
              <a className="button-outline-light" href="https://fyn-labs.com/en">FYN Labs ansehen</a>
            </div>
          </div>
        </div>
      </section>

      <section className="sources-section" id="quellen">
        <div className="section-shell">
          <p className="section-label">Primärquellen · geprüft am 24. August 2026</p>
          <div className="sources-grid">
            {sources.map(([publisher, title, url]) => (
              <a href={url} key={url}><span>{publisher}</span><strong>{title}</strong><small>↗</small></a>
            ))}
          </div>
        </div>
      </section>
      </main>

      <footer>
        <div className="footer-inner">
          <p><strong>FYN Assurance</strong><span>by FYN Labs</span></p>
          <p>FYN Assurance ist ein Arbeitsname. Professionelle markenrechtliche Ähnlichkeitsrecherche ausstehend.</p>
          <p>
            <a href="https://fyn-labs.com/en/legal">Impressum</a> ·{" "}
            <a href="https://fyn-labs.com/en/privacy">Datenschutz</a><br />
            <a href="mailto:support@fyn-labs.com">support@fyn-labs.com</a> · © 2026 FYN Labs LLC
          </p>
        </div>
      </footer>
    </>
  );
}
