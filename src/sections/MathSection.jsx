import { useState } from "react";
import { sum, average, median, factorial, min, max, percentage, lerp, degreesToRadians, radiansToDegrees } from "@dungeonmaster/snaputils";

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

export default function MathSection() {
    const [arrInput, setArrInput] = useState("3, 1, 4, 1, 5, 9, 2, 6");
    const [factInput, setFactInput] = useState("5");
    const [percentValue, setPercentValue] = useState("25");
    const [percentTotal, setPercentTotal] = useState("200");
    const [lerpStart, setLerpStart] = useState("0");
    const [lerpEnd, setLerpEnd] = useState("100");
    const [lerpT, setLerpT] = useState("0.5");
    const [degrees, setDegrees] = useState("180");
    const [radians, setRadians] = useState("3.14159");

    const parseArr = (str) =>
        str.split(",").map((s) => Number(s.trim())).filter((n) => !isNaN(n));

    const arr = parseArr(arrInput);

    return (
        <div>
            <h2 style={{ fontSize: "24px", fontWeight: "700", marginBottom: "8px" }}>🧮 Math Utilities</h2>
            <p style={{ color: "#64748b", marginBottom: "24px", fontSize: "14px" }}>Functions for mathematical operations</p>

            <Card title="sum / average / median / min / max">
                <p style={{ color: "#64748b", fontSize: "12px", marginBottom: "8px" }}>Enter comma separated numbers:</p>
                <input value={arrInput} onChange={(e) => setArrInput(e.target.value)}
                    style={{ background: "#0f172a", border: "1px solid #334155", borderRadius: "8px", padding: "10px 14px", color: "#e2e8f0", fontSize: "14px", width: "100%", outline: "none", marginBottom: "12px" }} />
                <Output label="sum()" value={sum(arr)} />
                <Output label="average()" value={average(arr)} />
                <Output label="median()" value={median(arr)} />
                <Output label="min()" value={min(arr)} />
                <Output label="max()" value={max(arr)} />
            </Card>

            <Card title="factorial()">
                <p style={{ color: "#64748b", fontSize: "12px", marginBottom: "8px" }}>Enter a number:</p>
                <input
                    type="number" value={factInput} onChange={(e) => setFactInput(e.target.value)} min="0" max="20"
                    style={{ background: "#0f172a", border: "1px solid #334155", borderRadius: "8px", padding: "10px 14px", color: "#e2e8f0", fontSize: "14px", width: "100%", outline: "none", marginBottom: "12px" }} />
                <Output label="factorial()" value={factorial(Number(factInput))} />
                <div style={{ marginTop: "16px" }}>
                    <p style={{ color: "#64748b", fontSize: "12px", marginBottom: "8px" }}>Try these:</p>
                    {[0, 1, 5, 10, 12].map((n) => (
                        <button key={n} onClick={() => setFactInput(String(n))} style={{
                            background: "#0f172a", color: "#94a3b8", border: "1px solid #334155",
                            borderRadius: "6px", padding: "4px 10px", cursor: "pointer", fontSize: "12px",
                            marginRight: "8px", marginBottom: "8px",
                        }}>{n}!</button>
                    ))}
                </div>
            </Card>

            <Card title="percentage()">
                <p style={{ color: "#64748b", fontSize: "12px", marginBottom: "8px" }}>Value:</p>
                <input type="number" value={percentValue} onChange={(e) => setPercentValue(e.target.value)}
                    style={{ background: "#0f172a", border: "1px solid #334155", borderRadius: "8px", padding: "10px 14px", color: "#e2e8f0", fontSize: "14px", width: "100%", outline: "none", marginBottom: "12px" }} />
                <p style={{ color: "#64748b", fontSize: "12px", marginBottom: "8px" }}>Total:</p>
                <input type="number" value={percentTotal} onChange={(e) => setPercentTotal(e.target.value)}
                    style={{ background: "#0f172a", border: "1px solid #334155", borderRadius: "8px", padding: "10px 14px", color: "#e2e8f0", fontSize: "14px", width: "100%", outline: "none", marginBottom: "12px" }} />
                <Output label="percentage()" value={percentage(Number(percentValue), Number(percentTotal)) + "%"} />
                <div style={{ background: "#0f172a", borderRadius: "8px", padding: "8px", marginTop: "12px" }}>
                    <div style={{ background: "#6366f1", borderRadius: "4px", height: "8px", width: `${Math.min(percentage(Number(percentValue), Number(percentTotal)), 100)}%`, transition: "width 0.3s" }} />
                </div>
            </Card>

            <Card title="lerp() — Linear Interpolation">
                <p style={{ color: "#64748b", fontSize: "12px", marginBottom: "8px" }}>Start:</p>
                <input type="number" value={lerpStart} onChange={(e) => setLerpStart(e.target.value)}
                    style={{ background: "#0f172a", border: "1px solid #334155", borderRadius: "8px", padding: "10px 14px", color: "#e2e8f0", fontSize: "14px", width: "100%", outline: "none", marginBottom: "12px" }} />
                <p style={{ color: "#64748b", fontSize: "12px", marginBottom: "8px" }}>End:</p>
                <input type="number" value={lerpEnd} onChange={(e) => setLerpEnd(e.target.value)}
                    style={{ background: "#0f172a", border: "1px solid #334155", borderRadius: "8px", padding: "10px 14px", color: "#e2e8f0", fontSize: "14px", width: "100%", outline: "none", marginBottom: "12px" }} />
                <p style={{ color: "#64748b", fontSize: "12px", marginBottom: "8px" }}>T (0 to 1):</p>
                <input type="range" min="0" max="1" step="0.01" value={lerpT} onChange={(e) => setLerpT(e.target.value)}
                    style={{ width: "100%", marginBottom: "12px", accentColor: "#6366f1" }} />
                <Output label={`lerp(${lerpStart}, ${lerpEnd}, ${lerpT})`} value={lerp(Number(lerpStart), Number(lerpEnd), Number(lerpT))} />
            </Card>

            <Card title="degreesToRadians() / radiansToDegrees()">
                <p style={{ color: "#64748b", fontSize: "12px", marginBottom: "8px" }}>Degrees:</p>
                <input type="number" value={degrees} onChange={(e) => setDegrees(e.target.value)}
                    style={{ background: "#0f172a", border: "1px solid #334155", borderRadius: "8px", padding: "10px 14px", color: "#e2e8f0", fontSize: "14px", width: "100%", outline: "none", marginBottom: "12px" }} />
                <Output label="degreesToRadians()" value={degreesToRadians(Number(degrees)).toFixed(6)} />

                <p style={{ color: "#64748b", fontSize: "12px", marginBottom: "8px", marginTop: "16px" }}>Radians:</p>
                <input type="number" value={radians} onChange={(e) => setRadians(e.target.value)}
                    style={{ background: "#0f172a", border: "1px solid #334155", borderRadius: "8px", padding: "10px 14px", color: "#e2e8f0", fontSize: "14px", width: "100%", outline: "none", marginBottom: "12px" }} />
                <Output label="radiansToDegrees()" value={radiansToDegrees(Number(radians)).toFixed(6)} />
            </Card>
        </div>
    );
}