import { useState, useRef } from "react";
import {
  useDebounce,
  useLocalStorage,
  useMediaQuery,
  useCopyToClipboard,
} from "@dungeonmaster/snaputils";

const Card = ({ title, description, children }) => (
  <div style={{
    background: "#1e293b", borderRadius: "12px", padding: "20px",
    marginBottom: "16px", border: "1px solid #334155",
  }}>
    <h3 style={{ color: "#6366f1", marginBottom: "4px", fontSize: "14px", fontWeight: "600" }}>{title}</h3>
    {description && <p style={{ color: "#64748b", fontSize: "12px", marginBottom: "16px" }}>{description}</p>}
    {children}
  </div>
);

const Output = ({ label, value }) => (
  <div style={{ display: "flex", alignItems: "center", gap: "12px", marginTop: "8px" }}>
    <span style={{ color: "#64748b", fontSize: "13px", minWidth: "180px" }}>{label}</span>
    <span style={{ background: "#0f172a", padding: "6px 12px", borderRadius: "6px", fontSize: "13px", color: "#34d399", fontFamily: "monospace" }}>{String(value)}</span>
  </div>
);

// useDebounce demo
function DebounceDemo() {
  const [input, setInput] = useState("");
  const [callCount, setCallCount] = useState(0);
  const debounced = useDebounce(input, 500);

  useState(() => {
    if (debounced) setCallCount((c) => c + 1);
  }, [debounced]);

  return (
    <>
      <input value={input} onChange={(e) => setInput(e.target.value)}
        placeholder="Type rapidly here..."
        style={{ background: "#0f172a", border: "1px solid #334155", borderRadius: "8px", padding: "10px 14px", color: "#e2e8f0", fontSize: "14px", width: "100%", outline: "none", marginBottom: "12px" }} />
      <Output label="Current value:" value={input || "—"} />
      <Output label="Debounced value:" value={debounced || "—"} />
      <p style={{ color: "#64748b", fontSize: "12px", marginTop: "8px" }}>
        The debounced value only updates 500ms after you stop typing!
      </p>
    </>
  );
}

// useLocalStorage demo
function LocalStorageDemo() {
  const [name, setName] = useLocalStorage("demo_name", "");
  const [theme, setTheme] = useLocalStorage("demo_theme", "dark");

  return (
    <>
      <p style={{ color: "#64748b", fontSize: "12px", marginBottom: "8px" }}>
        Your name (persists across page refreshes!):
      </p>
      <input value={name} onChange={(e) => setName(e.target.value)}
        placeholder="Enter your name..."
        style={{ background: "#0f172a", border: "1px solid #334155", borderRadius: "8px", padding: "10px 14px", color: "#e2e8f0", fontSize: "14px", width: "100%", outline: "none", marginBottom: "12px" }} />
      <p style={{ color: "#64748b", fontSize: "12px", marginBottom: "8px" }}>Theme preference:</p>
      <div style={{ display: "flex", gap: "8px", marginBottom: "12px" }}>
        {["dark", "light", "system"].map((t) => (
          <button key={t} onClick={() => setTheme(t)} style={{
            background: theme === t ? "#6366f1" : "#0f172a",
            color: theme === t ? "#fff" : "#94a3b8",
            border: `1px solid ${theme === t ? "#6366f1" : "#334155"}`,
            borderRadius: "6px", padding: "6px 16px", cursor: "pointer", fontSize: "13px",
          }}>{t}</button>
        ))}
      </div>
      <Output label="Saved name:" value={name || "—"} />
      <Output label="Saved theme:" value={theme} />
      <p style={{ color: "#64748b", fontSize: "12px", marginTop: "8px" }}>
        Try refreshing the page — your values will still be there! 🎉
      </p>
    </>
  );
}

// useMediaQuery demo
function MediaQueryDemo() {
  const isSmall = useMediaQuery("(max-width: 640px)");
  const isMedium = useMediaQuery("(max-width: 1024px)");
  const prefersDark = useMediaQuery("(prefers-color-scheme: dark)");

  return (
    <>
      <Output label='max-width: 640px' value={isSmall ? "✅ matches" : "❌ no match"} />
      <Output label='max-width: 1024px' value={isMedium ? "✅ matches" : "❌ no match"} />
      <Output label='prefers-color-scheme: dark' value={prefersDark ? "✅ matches" : "❌ no match"} />
      <p style={{ color: "#64748b", fontSize: "12px", marginTop: "8px" }}>
        Try resizing your browser window to see the values change in real time!
      </p>
    </>
  );
}

// useCopyToClipboard demo
function CopyToClipboardDemo() {
  const [copied, copy] = useCopyToClipboard();
  const [text, setText] = useState("npm i @dungeonmaster/snaputils");

  return (
    <>
      <input value={text} onChange={(e) => setText(e.target.value)}
        style={{ background: "#0f172a", border: "1px solid #334155", borderRadius: "8px", padding: "10px 14px", color: "#e2e8f0", fontSize: "14px", width: "100%", outline: "none", marginBottom: "12px" }} />
      <button onClick={() => copy(text)} style={{
        background: copied ? "#064e3b" : "#6366f1",
        color: copied ? "#34d399" : "#fff",
        border: `1px solid ${copied ? "#34d399" : "transparent"}`,
        borderRadius: "8px", padding: "10px 20px", cursor: "pointer", fontSize: "14px", fontWeight: "600",
        transition: "all 0.2s",
      }}>
        {copied ? "✅ Copied!" : "📋 Copy to clipboard"}
      </button>
      <p style={{ color: "#64748b", fontSize: "12px", marginTop: "8px" }}>
        The button resets automatically after 2 seconds!
      </p>
    </>
  );
}

export default function HooksSection() {
  return (
    <div>
      <h2 style={{ fontSize: "24px", fontWeight: "700", marginBottom: "8px" }}>🪝 React Hooks</h2>
      <p style={{ color: "#64748b", marginBottom: "24px", fontSize: "14px" }}>
        Custom React hooks for common UI patterns
      </p>

      <Card title="useDebounce()" description="Delays updating a value until the user stops typing">
        <DebounceDemo />
      </Card>

      <Card title="useLocalStorage()" description="Persist state to localStorage — survives page refreshes">
        <LocalStorageDemo />
      </Card>

      <Card title="useMediaQuery()" description="Reactively match CSS media queries">
        <MediaQueryDemo />
      </Card>

      <Card title="useCopyToClipboard()" description="Copy text to clipboard with visual feedback">
        <CopyToClipboardDemo />
      </Card>
    </div>
  );
}