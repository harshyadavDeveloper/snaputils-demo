import { useState } from "react";
import { omit, pick, deepClone } from "@dungeonmaster/snaputils";

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
  <div style={{ marginTop: "12px" }}>
    <span style={{ color: "#64748b", fontSize: "13px" }}>{label}</span>
    <pre style={{
      background: "#0f172a",
      padding: "12px",
      borderRadius: "8px",
      fontSize: "13px",
      color: "#34d399",
      fontFamily: "monospace",
      marginTop: "8px",
      overflowX: "auto",
      whiteSpace: "pre-wrap",
    }}>{JSON.stringify(value, null, 2)}</pre>
  </div>
);

const user = {
  id: 1,
  name: "Harsh",
  email: "harsh@gmail.com",
  password: "secret123",
  age: 25,
  role: "admin",
};

const allKeys = Object.keys(user);

export default function ObjectSection() {
  const [omitKeys, setOmitKeys] = useState(["password"]);
  const [pickKeys, setPickKeys] = useState(["id", "name", "email"]);
  const [cloneOriginal, setCloneOriginal] = useState({ a: 1, b: { c: 2 }, d: [1, 2, 3] });
  const [cloneModified, setCloneModified] = useState(null);

  const toggleOmitKey = (key) => {
    setOmitKeys((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  const togglePickKey = (key) => {
    setPickKeys((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  const handleDeepClone = () => {
    const cloned = deepClone(cloneOriginal);
    cloned.b.c = 999;
    cloned.d.push(99);
    setCloneModified(cloned);
  };

  return (
    <div>
      <h2 style={{ fontSize: "24px", fontWeight: "700", marginBottom: "8px" }}>🔧 Object Utilities</h2>
      <p style={{ color: "#64748b", marginBottom: "24px", fontSize: "14px" }}>
        Functions for working with objects
      </p>

      <Card title="omit() — Remove keys from object">
        <p style={{ color: "#64748b", fontSize: "12px", marginBottom: "12px" }}>
          Toggle keys to omit:
        </p>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "12px" }}>
          {allKeys.map((key) => (
            <button key={key} onClick={() => toggleOmitKey(key)} style={{
              background: omitKeys.includes(key) ? "#450a0a" : "#0f172a",
              color: omitKeys.includes(key) ? "#f87171" : "#94a3b8",
              border: `1px solid ${omitKeys.includes(key) ? "#f87171" : "#334155"}`,
              borderRadius: "6px",
              padding: "4px 12px",
              cursor: "pointer",
              fontSize: "13px",
            }}>{key}</button>
          ))}
        </div>
        <Output label="Original object:" value={user} />
        <Output label={`omit(user, [${omitKeys.map(k => `"${k}"`).join(", ")}]):`} value={omit(user, omitKeys)} />
      </Card>

      <Card title="pick() — Pick keys from object">
        <p style={{ color: "#64748b", fontSize: "12px", marginBottom: "12px" }}>
          Toggle keys to pick:
        </p>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "12px" }}>
          {allKeys.map((key) => (
            <button key={key} onClick={() => togglePickKey(key)} style={{
              background: pickKeys.includes(key) ? "#064e3b" : "#0f172a",
              color: pickKeys.includes(key) ? "#34d399" : "#94a3b8",
              border: `1px solid ${pickKeys.includes(key) ? "#34d399" : "#334155"}`,
              borderRadius: "6px",
              padding: "4px 12px",
              cursor: "pointer",
              fontSize: "13px",
            }}>{key}</button>
          ))}
        </div>
        <Output label={`pick(user, [${pickKeys.map(k => `"${k}"`).join(", ")}]):`} value={pick(user, pickKeys)} />
      </Card>

      <Card title="deepClone() — Deep clone an object">
        <p style={{ color: "#64748b", fontSize: "12px", marginBottom: "12px" }}>
          Click the button to deep clone the object and modify the clone.
          Notice the original stays unchanged!
        </p>
        <Output label="Original object:" value={cloneOriginal} />
        <button onClick={handleDeepClone} style={{
          background: "#6366f1",
          color: "#fff",
          border: "none",
          borderRadius: "8px",
          padding: "10px 20px",
          cursor: "pointer",
          fontSize: "14px",
          fontWeight: "600",
          marginTop: "12px",
        }}>
          Deep clone & modify clone
        </button>
        {cloneModified && (
          <>
            <Output label="Modified clone (b.c = 999, d.push(99)):" value={cloneModified} />
            <Output label="Original (unchanged ✅):" value={cloneOriginal} />
          </>
        )}
      </Card>
    </div>
  );
}