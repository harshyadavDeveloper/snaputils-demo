import { useState } from "react";
import { isEmail, isURL, isPhoneNumber } from "@dungeonmaster/snaputils";

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

const Input = ({ value, onChange, placeholder }) => (
    <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
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
);

const ValidOutput = ({ label, value }) => (
    <div style={{ display: "flex", alignItems: "center", gap: "12px", marginTop: "8px" }}>
        <span style={{ color: "#64748b", fontSize: "13px", minWidth: "160px" }}>{label}</span>
        <span style={{
            background: value ? "#064e3b" : "#450a0a",
            border: `1px solid ${value ? "#34d399" : "#f87171"}`,
            padding: "6px 12px",
            borderRadius: "6px",
            fontSize: "13px",
            color: value ? "#34d399" : "#f87171",
            fontFamily: "monospace",
            fontWeight: "600",
        }}>
            {value ? "✅ Valid" : "❌ Invalid"}
        </span>
    </div>
);

export default function ValidationSection() {
    const [email, setEmail] = useState("test@gmail.com");
    const [url, setUrl] = useState("https://google.com");
    const [phone, setPhone] = useState("+1234567890");

    return (
        <div>
            <h2 style={{ fontSize: "24px", fontWeight: "700", marginBottom: "8px" }}>✅ Validation Utilities</h2>
            <p style={{ color: "#64748b", marginBottom: "24px", fontSize: "14px" }}>
                Functions for validating common formats
            </p>

            <Card title="isEmail()">
                <Input value={email} onChange={setEmail} placeholder="Enter an email address..." />
                <ValidOutput label="isEmail()" value={isEmail(email)} />
                <div style={{ marginTop: "16px" }}>
                    <p style={{ color: "#64748b", fontSize: "12px", marginBottom: "8px" }}>Try these examples:</p>
                    {["test@gmail.com", "notanemail", "missing@domain", "user@company.co.in"].map((ex) => (
                        <button key={ex} onClick={() => setEmail(ex)} style={{
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

            <Card title="isURL()">
                <Input value={url} onChange={setUrl} placeholder="Enter a URL..." />
                <ValidOutput label="isURL()" value={isURL(url)} />
                <div style={{ marginTop: "16px" }}>
                    <p style={{ color: "#64748b", fontSize: "12px", marginBottom: "8px" }}>Try these examples:</p>
                    {["https://google.com", "http://example.com", "notaurl", "ftp://files.com"].map((ex) => (
                        <button key={ex} onClick={() => setUrl(ex)} style={{
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

            <Card title="isPhoneNumber()">
                <Input value={phone} onChange={setPhone} placeholder="Enter a phone number..." />
                <ValidOutput label="isPhoneNumber()" value={isPhoneNumber(phone)} />
                <div style={{ marginTop: "16px" }}>
                    <p style={{ color: "#64748b", fontSize: "12px", marginBottom: "8px" }}>Try these examples:</p>
                    {["+1234567890", "123", "+91 98765 43210", "not-a-number"].map((ex) => (
                        <button key={ex} onClick={() => setPhone(ex)} style={{
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