import { useState } from "react";
import { generateUID, hashString, base64Encode, base64Decode } from "@dungeonmaster/snaputils";

const Card = ({ title, children }) => (
    <div style={{
        background: "#1e293b", borderRadius: "12px", padding: "20px",
        marginBottom: "16px", border: "1px solid #334155",
    }}>
        <h3 style={{ color: "#6366f1", marginBottom: "16px", fontSize: "14px", fontWeight: "600" }}>{title}</h3>
        {children}
    </div>
);

const Output = ({ label, value }) => (
    <div style={{ display: "flex", alignItems: "center", gap: "12px", marginTop: "8px" }}>
        <span style={{ color: "#64748b", fontSize: "13px", minWidth: "160px" }}>{label}</span>
        <span style={{ background: "#0f172a", padding: "6px 12px", borderRadius: "6px", fontSize: "13px", color: "#34d399", fontFamily: "monospace" }}>{String(value)}</span>
    </div>
);

const Input = ({ value, onChange, placeholder }) => (
    <input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder}
        style={{ background: "#0f172a", border: "1px solid #334155", borderRadius: "8px", padding: "10px 14px", color: "#e2e8f0", fontSize: "14px", width: "100%", outline: "none", marginBottom: "12px" }} />
);

export default function SecuritySection() {
    const [uid, setUid] = useState(generateUID());
    const [uidLength, setUidLength] = useState("10");
    const [hashInput, setHashInput] = useState("hello world");
    const [encodeInput, setEncodeInput] = useState("hello");
    const [decodeInput, setDecodeInput] = useState("aGVsbG8=");

    return (
        <div>
            <h2 style={{ fontSize: "24px", fontWeight: "700", marginBottom: "8px" }}>🔐 Security Utilities</h2>
            <p style={{ color: "#64748b", marginBottom: "24px", fontSize: "14px" }}>Functions for security and encoding</p>

            <Card title="generateUID()">
                <p style={{ color: "#64748b", fontSize: "12px", marginBottom: "8px" }}>UID Length:</p>
                <input type="number" value={uidLength} onChange={(e) => setUidLength(e.target.value)} min="4" max="32"
                    style={{ background: "#0f172a", border: "1px solid #334155", borderRadius: "8px", padding: "10px 14px", color: "#e2e8f0", fontSize: "14px", width: "100%", outline: "none", marginBottom: "12px" }} />
                <button onClick={() => setUid(generateUID(Number(uidLength)))} style={{ background: "#6366f1", color: "#fff", border: "none", borderRadius: "8px", padding: "10px 20px", cursor: "pointer", fontSize: "14px", fontWeight: "600" }}>
                    Generate UID
                </button>
                <Output label="generateUID()" value={uid} />
            </Card>

            <Card title="hashString()">
                <Input value={hashInput} onChange={setHashInput} placeholder="Type something to hash..." />
                <Output label="hashString()" value={hashString(hashInput)} />
            </Card>

            <Card title="base64Encode()">
                <Input value={encodeInput} onChange={setEncodeInput} placeholder="Text to encode..." />
                <Output label="base64Encode()" value={base64Encode(encodeInput)} />
            </Card>

            <Card title="base64Decode()">
                <Input value={decodeInput} onChange={setDecodeInput} placeholder="Base64 to decode..." />
                <Output label="base64Decode()" value={base64Decode(decodeInput)} />
            </Card>
        </div>
    );
}