import { useState } from "react";
import { unique, groupBy, chunk } from "@dungeonmaster/snaputils";

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

export default function ArraySection() {
  const [uniqueInput, setUniqueInput] = useState("1,2,2,3,3,4,4,5");
  const [chunkInput, setChunkInput] = useState("1,2,3,4,5,6,7");
  const [chunkSize, setChunkSize] = useState("3");

  const parseArr = (str) => str.split(",").map((s) => s.trim()).filter(Boolean);

  const people = [
    { name: "Alice", department: "Engineering" },
    { name: "Bob", department: "Design" },
    { name: "Charlie", department: "Engineering" },
    { name: "Diana", department: "Design" },
    { name: "Eve", department: "Marketing" },
  ];

  return (
    <div>
      <h2 style={{ fontSize: "24px", fontWeight: "700", marginBottom: "8px" }}>🔗 Array Utilities</h2>
      <p style={{ color: "#64748b", marginBottom: "24px", fontSize: "14px" }}>
        Functions for working with arrays
      </p>

      <Card title="unique() — Remove duplicates">
        <p style={{ color: "#64748b", fontSize: "12px", marginBottom: "8px" }}>
          Enter comma separated values:
        </p>
        <input
          value={uniqueInput}
          onChange={(e) => setUniqueInput(e.target.value)}
          placeholder="e.g. 1,2,2,3,3,4"
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
        <Output label="Input array:" value={parseArr(uniqueInput)} />
        <Output label="unique():" value={unique(parseArr(uniqueInput))} />
      </Card>

      <Card title="chunk() — Split into chunks">
        <p style={{ color: "#64748b", fontSize: "12px", marginBottom: "8px" }}>
          Enter comma separated values:
        </p>
        <input
          value={chunkInput}
          onChange={(e) => setChunkInput(e.target.value)}
          placeholder="e.g. 1,2,3,4,5"
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
        <p style={{ color: "#64748b", fontSize: "12px", marginBottom: "8px" }}>Chunk size:</p>
        <input
          type="number"
          value={chunkSize}
          onChange={(e) => setChunkSize(e.target.value)}
          min="1"
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
        <Output label={`chunk(arr, ${chunkSize}):`} value={chunk(parseArr(chunkInput), Number(chunkSize))} />
      </Card>

      <Card title="groupBy() — Group objects by key">
        <p style={{ color: "#64748b", fontSize: "12px", marginBottom: "12px" }}>
          Grouping this array by <code style={{ color: "#6366f1" }}>department</code>:
        </p>
        <Output label="Input array:" value={people} />
        <Output label='groupBy(arr, "department"):' value={groupBy(people, "department")} />
      </Card>
    </div>
  );
}