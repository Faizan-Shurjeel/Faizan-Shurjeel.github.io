export type Project = {
  id: string;
  index: string;
  title: string;
  tagline: string;
  stack: string[];
  problem: string;
  hardPart: string;
  repo: string;
  extraLabel?: string;
  extraHref?: string;
};

export const projects: Project[] = [
  {
    id: "verascope",
    index: "01",
    title: "Verascope",
    tagline: "Offline C2PA provenance verifier",
    stack: ["Rust", "c2pa-rs", "Tauri v2", "React 19", "TypeScript"],
    problem:
      "Sites that claim to detect AI-generated media ask you to upload your file, then answer with a confidence percentage that means nothing. C2PA solves this properly: cryptographically signed provenance embedded in the file itself. Verascope reads and validates those signatures entirely on your device — zero network calls.",
    hardPart:
      "Refusing to give a binary answer. Every file resolves to one of three states — verified, untrusted or broken, or no provenance — because the absence of a manifest is not evidence of anything. Most genuine photos carry no manifest at all. Collapsing that into real/fake would have made the app confidently wrong.",
    repo: "https://github.com/Faizan-Shurjeel/Verascope",
    extraLabel: "releases",
    extraHref: "https://github.com/Faizan-Shurjeel/Verascope/releases",
  },
  {
    id: "focus-totem",
    index: "02",
    title: "Focus Totem",
    tagline: "A physical object that puts your desktop in focus mode",
    stack: ["Rust", "ESP32", "Embedded C++", "Dual-core"],
    problem:
      "Software focus modes are too easy to dismiss — the off switch is the same click as the on switch. This one is a physical totem you place on your desk. Power it on and a Rust client detects it, swaps your wallpaper, and launches your work applications. Power it off and everything reverts.",
    hardPart:
      "Presence detection that fails safely. The client watches for the device and has to distinguish a deliberate power-off from a dropped Wi-Fi packet, or it would tear down your session mid-task. The firmware runs dual-core on the ESP32, serving a monitoring dashboard on one core while keeping the presence beacon responsive on the other.",
    repo: "https://github.com/Faizan-Shurjeel/focus_client_rust",
  },
  {
    id: "edge-auth",
    index: "03",
    title: "Two-Layer Edge Authentication",
    tagline: "Face and voice identity on constrained hardware — final year project",
    stack: ["Python", "Edge inference", "Raspberry Pi", "Signal processing"],
    problem:
      "Two-factor biometric authentication that runs entirely on a Raspberry Pi, with no cloud inference step. Combining face and voice raises the cost of spoofing either channel alone, but both models have to fit in the compute and memory budget of the device.",
    hardPart:
      "Choosing the speaker-recognition architecture. I surveyed the field across three tiers — transformer and ECAPA-TDNN class models for the accuracy ceiling, 2D-CNNs over spectrograms, and 1D models working closer to the raw waveform — then benchmarked inference time against accuracy. SincNet was the standout: parameterising the first layer as sinc band-pass filters makes it fast, interpretable, and quick to converge on limited data.",
    repo: "https://github.com/Faizan-Shurjeel/FYP",
  },
  {
    id: "r-vision",
    index: "04",
    title: "R-vision",
    tagline: "Async network scanner with a terminal dashboard",
    stack: ["Rust", "Tokio", "Ratatui"],
    problem:
      "A host and service scanner for auditing my own lab subnet. Expands a CIDR range, discovers live hosts across common TCP ports, then optionally sweeps the full 1–65535 range on hosts that actually answered. Results render live in a Ratatui dashboard and export to an HTML report.",
    hardPart:
      "Scanning fast without being unreliable. Probes are async, lazily evaluated, and concurrency-bounded with configurable timeouts and retries — flood the socket table and you get false negatives on hosts that are simply slow to answer, which is worse than scanning slowly.",
    repo: "https://github.com/Faizan-Shurjeel/R-vision",
  },
  {
    id: "auratrack",
    index: "05",
    title: "AuraTrack",
    tagline: "Full-stack tracking app, Go API and React client",
    stack: ["Go", "TypeScript", "React", "Vite", "Postgres", "Supabase"],
    problem:
      "A tracking application split into a Go JSON API and a React front end, organised as a monorepo with a Go workspace alongside the Bun-managed client. Schema lives in version control rather than in a dashboard.",
    hardPart:
      "Keeping one repository coherent across two toolchains. A go.work workspace handles the API side and Bun handles the client, with a single scripted entry point so the whole stack comes up in one command instead of a README full of terminal instructions.",
    repo: "https://github.com/Faizan-Shurjeel/AuraTrack",
  },
  {
    id: "lensar",
    index: "06",
    title: "LensAR: Arcade",
    tagline: "Marker-based AR game in the browser",
    stack: ["TypeScript", "three.js", "AR.js", "React Three Fiber"],
    problem:
      "Point a phone camera at a printed Hiro marker and a 3D arcade scene anchors to it — collect coins, keep score, all running in the browser with no app install.",
    hardPart:
      "Making AR.js and React coexist. AR.js expects THREE as a global and drives its own render loop, while React Three Fiber wants to own the canvas and reconcile the scene declaratively. Getting the marker transform to flow into R3F's scene graph without either side fighting for control was most of the work.",
    repo: "https://github.com/Faizan-Shurjeel/LensAR-Arcade",
  },
];
