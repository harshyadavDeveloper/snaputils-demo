import { useState } from "react";
import {
  hexToRgb,
  rgbToHex,
  isValidHex,
  lightenColor,
  darkenColor,
} from "@dungeonmaster/snaputils";

const Card = ({ title, children }) => (
  <div style={{
    background: "#1e293b",
    borderRadius: "12px",
    padding: "20px",
    marginBottom: "16px",
    border: "1px solid #334155",
  }}>
    <h3 style={{ color: "#6366f1", marginBottom: "16px", fontSize: "14px", fontWeight: "600" }}>{title}</h3>
    {children}
  </div>
);

const Output = ({ label, value }) => (
  <div style={{ display: "flex", alignItems: "center", gap: "12px", marginTop: "8px" }}>
    <span style={{ color: "#64748b", fontSize: "13px", minWidth: "160px" }}>{label}</span>
    <span style={{
      background: "#0f172a",
      padding: "6px 12px",
      borderRadius: "6px",
      fontSize: "13px",
      color: "#34d399",
      fontFamily: "monospace",
    }}>{String(value)}</span>
  </div>
);

const ColorSwatch = ({ hex, label }) => (
  <div style={{ display: "flex", alignItems: "center", gap: "12px", marginTop: "8px" }}>
    <span style={{ color: "#64748b", fontSize: "13px", minWidth: "160px" }}>{label}</span>
    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      <div style={{
        width: "36px",
        height: "36px",
        borderRadius: "6px",
        background: hex,
        border: "1px solid #334155",
      }} />
      <span style={{
        background: "#0f172a",
        padding: "6px 12px",
        borderRadius: "6px",
        fontSize: "13px",
        color: "#34d399",
        fontFamily: "monospace",
      }}>{hex}</span>
    </div>
  </div>
);

export default function ColorSection() {
  const [hex, setHex] = useState("#6366f1");
  const [hexInput, setHexInput] = useState("#6366f1");
  const [r, setR] = useState("99");
  const [g, setG] = useState("102");
  const [b, setB] = useState("241");

  const rgb = hexToRgb(hex);
  const valid = isValidHex(hexInput);

  return (
    <div>
      <h2 style={{ fontSize: "24px", fontWeight: "700", marginBottom: "8px" }}>🎨 Color Utilities</h2>
      <p style={{ color: "#64748b", marginBottom: "24px", fontSize: "14px" }}>
        Functions for working with colors
      </p>

      <Card title="hexToRgb() / lightenColor() / darkenColor()">
        <p style={{ color: "#64748b", fontSize: "12px", marginBottom: "8px" }}>Pick a color:</p>
        <div style={{ display: "flex", gap: "12px", alignItems: "center", marginBottom: "12px" }}>
          <input
            type="color"
            value={hex}
            onChange={(e) => setHex(e.target.value)}
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "8px",
              border: "1px solid #334155",
              background: "none",
              cursor: "pointer",
            }}
          />
          <span style={{ color: "#e2e8f0", fontFamily: "monospace" }}>{hex}</span>
        </div>

        {rgb && (
          <Output label="hexToRgb()" value={`r: ${rgb.r}, g: ${rgb.g}, b: ${rgb.b}`} />
        )}

        <div style={{ marginTop: "16px" }}>
          <p style={{ color: "#64748b", fontSize: "12px", marginBottom: "8px" }}>Color scale:</p>
          {[
            { label: "darkenColor(50%)", color: darkenColor(hex, 50) },
            { label: "darkenColor(25%)", color: darkenColor(hex, 25) },
            { label: "Original", color: hex },
            { label: "lightenColor(25%)", color: lightenColor(hex, 25) },
            { label: "lightenColor(50%)", color: lightenColor(hex, 50) },
          ].map(({ label, color }) => (
            <ColorSwatch key={label} hex={color} label={label} />
          ))}
        </div>
      </Card>

      <Card title="rgbToHex()">
        <p style={{ color: "#64748b", fontSize: "12px", marginBottom: "8px" }}>Enter RGB values (0-255):</p>
        <div style={{ display: "flex", gap: "8px", marginBottom: "12px" }}>
          {[["R", r, setR], ["G", g, setG], ["B", b, setB]].map(([label, val, setter]) => (
            <div key={label} style={{ flex: 1 }}>
              <p style={{ color: "#64748b", fontSize: "12px", marginBottom: "4px" }}>{label}</p>
              <input
                type="number"
                min="0"
                max="255"
                value={val}
                onChange={(e) => setter(e.target.value)}
                style={{
                  background: "#0f172a",
                  border: "1px solid #334155",
                  borderRadius: "8px",
                  padding: "10px 14px",
                  color: "#e2e8f0",
                  fontSize: "14px",
                  width: "100%",
                  outline: "none",
                }}
              />
            </div>
          ))}
        </div>
        <ColorSwatch
          hex={rgbToHex(Number(r), Number(g), Number(b))}
          label="rgbToHex()"
        />
      </Card>

      <Card title="isValidHex()">
        <input
          value={hexInput}
          onChange={(e) => setHexInput(e.target.value)}
          placeholder="Enter a hex color e.g. #ff5733"
          style={{
            background: "#0f172a",
            border: "1px solid #334155",
            borderRadius: "8px",
            padding: "10px 14px",
            color: "#e2e8f0",
            fontSize: "14px",
            width: "100%",
            outline: "none",
            marginBottom: "12px",
          }}
        />
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginTop: "8px" }}>
          <span style={{ color: "#64748b", fontSize: "13px", minWidth: "160px" }}>isValidHex()</span>
          <span style={{
            background: valid ? "#064e3b" : "#450a0a",
            border: `1px solid ${valid ? "#34d399" : "#f87171"}`,
            padding: "6px 12px",
            borderRadius: "6px",
            fontSize: "13px",
            color: valid ? "#34d399" : "#f87171",
            fontWeight: "600",
          }}>
            {valid ? "✅ Valid" : "❌ Invalid"}
          </span>
          {valid && (
            <div style={{
              width: "28px",
              height: "28px",
              borderRadius: "4px",
              background: hexInput,
              border: "1px solid #334155",
            }} />
          )}
        </div>
        <div style={{ marginTop: "16px" }}>
          <p style={{ color: "#64748b", fontSize: "12px", marginBottom: "8px" }}>Try these:</p>
          {["#ff5733", "#fff", "#6366f1", "notacolor", "#gg0000"].map((ex) => (
            <button key={ex} onClick={() => setHexInput(ex)} style={{
              background: "#0f172a",
              color: "#94a3b8",
              border: "1px solid #334155",
              borderRadius: "6px",
              padding: "4px 10px",
              cursor: "pointer",
              fontSize: "12px",
              marginRight: "8px",
              marginBottom: "8px",
            }}>{ex}</button>
          ))}
        </div>
      </Card>
    </div>
  );
}