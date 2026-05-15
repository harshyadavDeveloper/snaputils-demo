import { useState } from "react";
import { debounce, throttle, memoize } from "@dungeonmaster/snaputils";

const Card = ({ title, children }) => (
    <div style={{
        background: "#1e293b", borderRadius: "12px", padding: "20px",
        marginBottom: "16px", border: "1px solid #334155",
    }}>
        <h3 style={{ color: "#6366f1", marginBottom: "16px", fontSize: "14px", fontWeight: "600" }}>{title}</h3>
        {children}
    </div>
);

const Log = ({ entries }) => (
    <div style={{ background: "#0f172a", borderRadius: "8px", padding: "12px", marginTop: "12px", maxHeight: "150px", overflowY: "auto" }}>
        {entries.length === 0
            ? <p style={{ color: "#475569", fontSize: "13px" }}>No logs yet — interact above!</p>
            : entries.map((entry, i) => (
                <p key={i} style={{ color: "#34d399", fontSize: "13px", fontFamily: "monospace", marginBottom: "4px" }}>
                    {entry}
                </p>
            ))}
    </div>
);

export default function PerformanceSection() {
    const [debounceLogs, setDebounceLogs] = useState([]);
    const [throttleLogs, setThrottleLogs] = useState([]);
    const [memoLogs, setMemoLogs] = useState([]);
    const [memoInput, setMemoInput] = useState("5");
    const [memoCache, setMemoCache] = useState({});

    const debouncedFn = debounce((val) => {
        setDebounceLogs((prev) => [...prev, `[${new Date().toLocaleTimeString()}] fired with: "${val}"`]);
    }, 500);

    const throttledFn = throttle(() => {
        setThrottleLogs((prev) => [...prev, `[${new Date().toLocaleTimeString()}] fired!`]);
    }, 1000);

    const memoizedFn = memoize((n) => {
        const result = Number(n) * Number(n);
        return result;
    });

    const handleMemoCall = () => {
        const n = Number(memoInput);
        const cached = memoCache[n] !== undefined;
        const result = memoizedFn(n);
        setMemoCache((prev) => ({ ...prev, [n]: result }));
        setMemoLogs((prev) => [
            ...prev,
            `[${new Date().toLocaleTimeString()}] memoize(${n}) → ${result} ${cached ? "⚡ from cache" : "🔄 computed"}`,
        ]);
    };

    return (
        <div>
            <h2 style={{ fontSize: "24px", fontWeight: "700", marginBottom: "8px" }}>⏱️ Performance Utilities</h2>
            <p style={{ color: "#64748b", marginBottom: "24px", fontSize: "14px" }}>Functions for optimizing performance</p>

            <Card title="debounce() — fires only after you stop typing (500ms)">
                <p style={{ color: "#64748b", fontSize: "12px", marginBottom: "8px" }}>
                    Type quickly — the function only fires 500ms after you stop!
                </p>
                <input
                    onChange={(e) => debouncedFn(e.target.value)}
                    placeholder="Type here rapidly..."
                    style={{ background: "#0f172a", border: "1px solid #334155", borderRadius: "8px", padding: "10px 14px", color: "#e2e8f0", fontSize: "14px", width: "100%", outline: "none" }}
                />
                <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "8px" }}>
                    <button onClick={() => setDebounceLogs([])} style={{ background: "transparent", color: "#64748b", border: "none", cursor: "pointer", fontSize: "12px" }}>
                        Clear logs
                    </button>
                </div>
                <Log entries={debounceLogs} />
            </Card>

            <Card title="throttle() — fires at most once per second">
                <p style={{ color: "#64748b", fontSize: "12px", marginBottom: "8px" }}>
                    Click rapidly — the function only fires once every 1000ms!
                </p>
                <button onClick={throttledFn} style={{
                    background: "#6366f1", color: "#fff", border: "none", borderRadius: "8px",
                    padding: "10px 20px", cursor: "pointer", fontSize: "14px", fontWeight: "600",
                }}>
                    Click me rapidly!
                </button>
                <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "8px" }}>
                    <button onClick={() => setThrottleLogs([])} style={{ background: "transparent", color: "#64748b", border: "none", cursor: "pointer", fontSize: "12px" }}>
                        Clear logs
                    </button>
                </div>
                <Log entries={throttleLogs} />
            </Card>

            <Card title="memoize() — caches results of expensive computations">
                <p style={{ color: "#64748b", fontSize: "12px", marginBottom: "8px" }}>
                    Call with the same number twice — second call uses cache! (n²)
                </p>
                <div style={{ display: "flex", gap: "8px", marginBottom: "12px" }}>
                    <input
                        type="number" value={memoInput} onChange={(e) => setMemoInput(e.target.value)}
                        style={{ background: "#0f172a", border: "1px solid #334155", borderRadius: "8px", padding: "10px 14px", color: "#e2e8f0", fontSize: "14px", flex: 1, outline: "none" }}
                    />
                    <button onClick={handleMemoCall} style={{
                        background: "#6366f1", color: "#fff", border: "none", borderRadius: "8px",
                        padding: "10px 20px", cursor: "pointer", fontSize: "14px", fontWeight: "600",
                    }}>
                        Compute
                    </button>
                </div>
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <button onClick={() => { setMemoLogs([]); setMemoCache({}); }} style={{ background: "transparent", color: "#64748b", border: "none", cursor: "pointer", fontSize: "12px" }}>
                        Clear cache & logs
                    </button>
                </div>
                <Log entries={memoLogs} />
            </Card>
        </div>
    );
}