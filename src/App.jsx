import { useState } from "react";
import "./index.css";
import StringSection from "./sections/StringSection";
import NumberSection from "./sections/NumberSection";
import DateSection from "./sections/DateSection";
import ValidationSection from "./sections/ValidationSection";
import ArraySection from "./sections/ArraySection";
import ObjectSection from "./sections/ObjectSection";
import ColorSection from "./sections/ColorSection";

const categories = [
  { id: "string", label: "String", emoji: "🧵" },
  { id: "number", label: "Number", emoji: "🔢" },
  { id: "date", label: "Date", emoji: "📅" },
  { id: "validation", label: "Validation", emoji: "✅" },
  { id: "array", label: "Array", emoji: "🔗" },
  { id: "object", label: "Object", emoji: "🔧" },
  { id: "color", label: "Color", emoji: "🎨" },
];

export default function App() {
  const [active, setActive] = useState("string");

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <aside style={{
        width: "220px",
        background: "#1e293b",
        padding: "24px 16px",
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        borderRight: "1px solid #334155",
        position: "fixed",
        height: "100vh",
        overflowY: "auto",
      }}>
        <div style={{ marginBottom: "24px" }}>
          <h1 style={{ fontSize: "18px", fontWeight: "700", color: "#6366f1" }}>snaputils</h1>
          <p style={{ fontSize: "12px", color: "#64748b", marginTop: "4px" }}>Interactive Playground</p>
        </div>
        {categories.map((cat) => (
          <button key={cat.id} onClick={() => setActive(cat.id)} style={{
            background: active === cat.id ? "#6366f1" : "transparent",
            color: active === cat.id ? "#fff" : "#94a3b8",
            border: "none",
            borderRadius: "8px",
            padding: "10px 14px",
            cursor: "pointer",
            textAlign: "left",
            fontSize: "14px",
            fontWeight: active === cat.id ? "600" : "400",
            transition: "all 0.2s",
          }}>
            {cat.emoji} {cat.label}
          </button>
        ))}
        <div style={{ marginTop: "auto", paddingTop: "24px", display: "flex", flexDirection: "column", gap: "8px" }}>
          <a href="https://www.npmjs.com/package/@dungeonmaster/snaputils"
            target="_blank" rel="noreferrer"
            style={{ color: "#64748b", fontSize: "12px", textDecoration: "none" }}>
            📦 npm package
          </a>
          <a href="https://github.com/harshyadavDeveloper/snaputils"
            target="_blank" rel="noreferrer"
            style={{ color: "#64748b", fontSize: "12px", textDecoration: "none" }}>
            🐙 GitHub
          </a>
        </div>
      </aside>

      {/* Main content */}
      <main style={{ marginLeft: "220px", padding: "40px", flex: 1 }}>
        {active === "string" && <StringSection />}
        {active === "number" && <NumberSection />}
        {active === "date" && <DateSection />}
        {active === "validation" && <ValidationSection />}
        {active === "array" && <ArraySection />}
        {active === "object" && <ObjectSection />}
        {active === "color" && <ColorSection />}
      </main>
    </div>
  );
}