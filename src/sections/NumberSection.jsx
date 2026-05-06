import { useState } from "react";
import {
  formatCurrency,
  formatNumber,
  formatPercent,
  abbreviateNumber,
  roundTo,
  isEven,
  isOdd,
  randomBetween,
  formatFileSize,
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

const Input = ({ value, onChange, placeholder, type = "text" }) => (
  <input
    type={type}
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

export default function NumberSection() {
  const [amount, setAmount] = useState("1999.99");
  const [num, setNum] = useState("1500000");
  const [percent, setPercent] = useState("0.75");
  const [bytes, setBytes] = useState("1048576");
  const [random, setRandom] = useState(null);

  return (
    <div>
      <h2 style={{ fontSize: "24px", fontWeight: "700", marginBottom: "8px" }}>🔢 Number Utilities</h2>
      <p style={{ color: "#64748b", marginBottom: "24px", fontSize: "14px" }}>
        Functions for formatting and working with numbers
      </p>

      <Card title="formatCurrency()">
        <Input type="number" value={amount} onChange={setAmount} placeholder="Enter amount..." />
        <Output label="USD" value={formatCurrency(Number(amount), "USD", "en-US")} />
        <Output label="INR" value={formatCurrency(Number(amount), "INR", "en-IN")} />
        <Output label="EUR" value={formatCurrency(Number(amount), "EUR", "de-DE")} />
        <Output label="GBP" value={formatCurrency(Number(amount), "GBP", "en-GB")} />
      </Card>

      <Card title="formatNumber / abbreviateNumber / isEven / isOdd">
        <Input type="number" value={num} onChange={setNum} placeholder="Enter a number..." />
        <Output label="formatNumber()" value={formatNumber(Number(num))} />
        <Output label="abbreviateNumber()" value={abbreviateNumber(Number(num))} />
        <Output label="roundTo(num, 2)" value={roundTo(Number(num), 2)} />
        <Output label="isEven()" value={isEven(Number(num))} />
        <Output label="isOdd()" value={isOdd(Number(num))} />
      </Card>

      <Card title="formatPercent()">
        <Input type="number" value={percent} onChange={setPercent} placeholder="e.g. 0.75" />
        <Output label="formatPercent(1 decimal)" value={formatPercent(Number(percent), 1)} />
        <Output label="formatPercent(2 decimals)" value={formatPercent(Number(percent), 2)} />
      </Card>

      <Card title="formatFileSize()">
        <Input type="number" value={bytes} onChange={setBytes} placeholder="Enter bytes..." />
        <Output label="formatFileSize()" value={formatFileSize(Number(bytes))} />
      </Card>

      <Card title="randomBetween()">
        <button
          onClick={() => setRandom(randomBetween(1, 100))}
          style={{
            background: "#6366f1",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            padding: "10px 20px",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: "600",
          }}>
          Generate random number (1-100)
        </button>
        {random !== null && <Output label="randomBetween(1, 100)" value={random} />}
      </Card>
    </div>
  );
}