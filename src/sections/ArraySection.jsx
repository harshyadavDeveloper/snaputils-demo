import { useState } from "react";
import { unique, groupBy, chunk, flatten, shuffle, difference, intersection } from "@dungeonmaster/snaputils";

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
  const [flatInput, setFlatInput] = useState([1, [2, [3, [4]]]]);
  const [shuffleInput, setShuffleInput] = useState("1, 2, 3, 4, 5");
  const [shuffled, setShuffled] = useState([]);
  const [arr1Input, setArr1Input] = useState("1, 2, 3, 4");
  const [arr2Input, setArr2Input] = useState("2, 3, 5, 6");

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

      <Card title="groupBy() — Group objects by key or function">
        <p style={{ color: "#64748b", fontSize: "12px", marginBottom: "12px" }}>
          Grouping by <code style={{ color: "#6366f1" }}>department</code> string key:
        </p>
        <Output label="Input array:" value={people} />
        <Output label='groupBy(arr, "department"):' value={groupBy(people, "department")} />
        <p style={{ color: "#64748b", fontSize: "12px", marginBottom: "12px", marginTop: "16px" }}>
          Grouping numbers by <code style={{ color: "#6366f1" }}>even/odd</code> function:
        </p>
        <Output label="groupBy([1..6], fn):" value={groupBy([1, 2, 3, 4, 5, 6], n => n % 2 === 0 ? "even" : "odd")} />
      </Card>

      <Card title="flatten() — Flatten nested arrays">
        <p style={{ color: "#64748b", fontSize: "12px", marginBottom: "8px" }}>
          Enter a nested array as JSON:
        </p>
        <input
          defaultValue="[1, [2, [3, [4]]]]"
          onChange={(e) => {
            try { setFlatInput(JSON.parse(e.target.value)); } catch (err) { console.log(err) }
          }}
          style={{ background: "#0f172a", border: "1px solid #334155", borderRadius: "8px", padding: "10px 14px", color: "#e2e8f0", fontSize: "14px", width: "100%", outline: "none", marginBottom: "12px", fontFamily: "monospace" }}
        />
        <Output label="flatten(arr):" value={flatten(flatInput)} />
        <Output label="flatten(arr, 1):" value={flatten(flatInput, 1)} />
        <Output label="flatten(arr, 2):" value={flatten(flatInput, 2)} />
      </Card>

      <Card title="shuffle() — Shuffle an array randomly">
        <p style={{ color: "#64748b", fontSize: "12px", marginBottom: "8px" }}>
          Enter comma separated values:
        </p>
        <input
          value={shuffleInput}
          onChange={(e) => setShuffleInput(e.target.value)}
          style={{ background: "#0f172a", border: "1px solid #334155", borderRadius: "8px", padding: "10px 14px", color: "#e2e8f0", fontSize: "14px", width: "100%", outline: "none", marginBottom: "12px" }}
        />
        <button onClick={() => setShuffled(shuffle(shuffleInput.split(",").map(s => s.trim())))}
          style={{ background: "#6366f1", color: "#fff", border: "none", borderRadius: "8px", padding: "10px 20px", cursor: "pointer", fontSize: "14px", fontWeight: "600" }}>
          Shuffle!
        </button>
        {shuffled.length > 0 && <Output label="shuffle():" value={shuffled} />}
      </Card>

      <Card title="difference() / intersection()">
        <p style={{ color: "#64748b", fontSize: "12px", marginBottom: "8px" }}>Array 1:</p>
        <input value={arr1Input} onChange={(e) => setArr1Input(e.target.value)}
          style={{ background: "#0f172a", border: "1px solid #334155", borderRadius: "8px", padding: "10px 14px", color: "#e2e8f0", fontSize: "14px", width: "100%", outline: "none", marginBottom: "12px" }} />
        <p style={{ color: "#64748b", fontSize: "12px", marginBottom: "8px" }}>Array 2:</p>
        <input value={arr2Input} onChange={(e) => setArr2Input(e.target.value)}
          style={{ background: "#0f172a", border: "1px solid #334155", borderRadius: "8px", padding: "10px 14px", color: "#e2e8f0", fontSize: "14px", width: "100%", outline: "none", marginBottom: "12px" }} />
        <Output label="difference():" value={difference(arr1Input.split(",").map(s => s.trim()), arr2Input.split(",").map(s => s.trim()))} />
        <Output label="intersection():" value={intersection(arr1Input.split(",").map(s => s.trim()), arr2Input.split(",").map(s => s.trim()))} />
      </Card>
    </div>
  );
}