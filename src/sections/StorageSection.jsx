import { useState, useEffect } from "react";
import { setItem, getItem, removeItem, clearAll, getKeys } from "@dungeonmaster/snaputils";

const Card = ({ title, children }) => (
  <div style={{
    background: "#1e293b", borderRadius: "12px", padding: "20px",
    marginBottom: "16px", border: "1px solid #334155",
  }}>
    <h3 style={{ color: "#6366f1", marginBottom: "16px", fontSize: "14px", fontWeight: "600" }}>{title}</h3>
    {children}
  </div>
);

const Badge = ({ success }) => (
  <span style={{
    background: success ? "#064e3b" : "#450a0a",
    border: `1px solid ${success ? "#34d399" : "#f87171"}`,
    padding: "4px 10px", borderRadius: "6px", fontSize: "13px",
    color: success ? "#34d399" : "#f87171", fontWeight: "600",
  }}>
    {success ? "✅ Success" : "❌ Failed"}
  </span>
);

export default function StorageSection() {
  const [key, setKey] = useState("snaputils_demo");
  const [value, setValue] = useState("Hello from snaputils!");
  const [getKey, setGetKey] = useState("snaputils_demo");
  const [removeKey, setRemoveKey] = useState("snaputils_demo");
  const [keys, setKeys] = useState([]);
  const [setResult, setSetResult] = useState(null);
  const [getResult, setGetResult] = useState(null);
  const [removeResult, setRemoveResult] = useState(null);
  const [clearResult, setClearResult] = useState(null);

  const refreshKeys = () => setKeys(getKeys().filter(k => k.startsWith("snaputils")));

  useEffect(() => { refreshKeys(); }, []);

  return (
    <div>
      <h2 style={{ fontSize: "24px", fontWeight: "700", marginBottom: "8px" }}>💾 Storage Utilities</h2>
      <p style={{ color: "#64748b", marginBottom: "24px", fontSize: "14px" }}>Functions for working with localStorage</p>

      <Card title="setItem() — Save to localStorage">
        <p style={{ color: "#64748b", fontSize: "12px", marginBottom: "8px" }}>Key:</p>
        <input value={key} onChange={(e) => setKey(e.target.value)}
          style={{ background: "#0f172a", border: "1px solid #334155", borderRadius: "8px", padding: "10px 14px", color: "#e2e8f0", fontSize: "14px", width: "100%", outline: "none", marginBottom: "12px" }} />
        <p style={{ color: "#64748b", fontSize: "12px", marginBottom: "8px" }}>Value:</p>
        <input value={value} onChange={(e) => setValue(e.target.value)}
          style={{ background: "#0f172a", border: "1px solid #334155", borderRadius: "8px", padding: "10px 14px", color: "#e2e8f0", fontSize: "14px", width: "100%", outline: "none", marginBottom: "12px" }} />
        <button onClick={() => { setSetResult(setItem(key, value)); refreshKeys(); }}
          style={{ background: "#6366f1", color: "#fff", border: "none", borderRadius: "8px", padding: "10px 20px", cursor: "pointer", fontSize: "14px", fontWeight: "600" }}>
          Save to localStorage
        </button>
        {setResult !== null && <div style={{ marginTop: "12px" }}><Badge success={setResult} /></div>}
      </Card>

      <Card title="getItem() — Get from localStorage">
        <p style={{ color: "#64748b", fontSize: "12px", marginBottom: "8px" }}>Key:</p>
        <input value={getKey} onChange={(e) => setGetKey(e.target.value)}
          style={{ background: "#0f172a", border: "1px solid #334155", borderRadius: "8px", padding: "10px 14px", color: "#e2e8f0", fontSize: "14px", width: "100%", outline: "none", marginBottom: "12px" }} />
        <button onClick={() => setGetResult(getItem(getKey))}
          style={{ background: "#6366f1", color: "#fff", border: "none", borderRadius: "8px", padding: "10px 20px", cursor: "pointer", fontSize: "14px", fontWeight: "600" }}>
          Get from localStorage
        </button>
        {getResult !== null && (
          <div style={{ background: "#0f172a", borderRadius: "8px", padding: "12px", marginTop: "12px" }}>
            <p style={{ color: "#34d399", fontSize: "13px", fontFamily: "monospace" }}>
              {JSON.stringify(getResult)}
            </p>
          </div>
        )}
      </Card>

      <Card title="removeItem() — Remove from localStorage">
        <p style={{ color: "#64748b", fontSize: "12px", marginBottom: "8px" }}>Key:</p>
        <input value={removeKey} onChange={(e) => setRemoveKey(e.target.value)}
          style={{ background: "#0f172a", border: "1px solid #334155", borderRadius: "8px", padding: "10px 14px", color: "#e2e8f0", fontSize: "14px", width: "100%", outline: "none", marginBottom: "12px" }} />
        <button onClick={() => { setRemoveResult(removeItem(removeKey)); refreshKeys(); }}
          style={{ background: "#f87171", color: "#fff", border: "none", borderRadius: "8px", padding: "10px 20px", cursor: "pointer", fontSize: "14px", fontWeight: "600" }}>
          Remove from localStorage
        </button>
        {removeResult !== null && <div style={{ marginTop: "12px" }}><Badge success={removeResult} /></div>}
      </Card>

      <Card title="getKeys() — All keys in localStorage">
        <button onClick={refreshKeys}
          style={{ background: "#6366f1", color: "#fff", border: "none", borderRadius: "8px", padding: "10px 20px", cursor: "pointer", fontSize: "14px", fontWeight: "600", marginBottom: "12px" }}>
          Refresh Keys
        </button>
        <div style={{ background: "#0f172a", borderRadius: "8px", padding: "12px" }}>
          {keys.length === 0
            ? <p style={{ color: "#475569", fontSize: "13px" }}>No snaputils keys found — save something first!</p>
            : keys.map((k) => (
              <p key={k} style={{ color: "#34d399", fontSize: "13px", fontFamily: "monospace", marginBottom: "4px" }}>
                {k}
              </p>
            ))}
        </div>
      </Card>

      <Card title="clearAll() — Clear all localStorage">
        <p style={{ color: "#f87171", fontSize: "12px", marginBottom: "12px" }}>
          ⚠️ This will clear ALL keys from localStorage!
        </p>
        <button onClick={() => { setClearResult(clearAll()); refreshKeys(); }}
          style={{ background: "#450a0a", color: "#f87171", border: "1px solid #f87171", borderRadius: "8px", padding: "10px 20px", cursor: "pointer", fontSize: "14px", fontWeight: "600" }}>
          Clear All localStorage
        </button>
        {clearResult !== null && <div style={{ marginTop: "12px" }}><Badge success={clearResult} /></div>}
      </Card>
    </div>
  );
}