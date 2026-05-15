import { useState } from "react";
import { parseURL, buildQueryString, parseQueryString } from "@dungeonmaster/snaputils";

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
    <div style={{ marginTop: "12px" }}>
        <span style={{ color: "#64748b", fontSize: "13px" }}>{label}</span>
        <pre style={{ background: "#0f172a", padding: "12px", borderRadius: "8px", fontSize: "13px", color: "#34d399", fontFamily: "monospace", marginTop: "8px", overflowX: "auto", whiteSpace: "pre-wrap" }}>
            {JSON.stringify(value, null, 2)}
        </pre>
    </div>
);

const SimpleOutput = ({ label, value }) => (
    <div style={{ display: "flex", alignItems: "center", gap: "12px", marginTop: "8px" }}>
        <span style={{ color: "#64748b", fontSize: "13px", minWidth: "160px" }}>{label}</span>
        <span style={{ background: "#0f172a", padding: "6px 12px", borderRadius: "6px", fontSize: "13px", color: "#34d399", fontFamily: "monospace" }}>{String(value)}</span>
    </div>
);

const Input = ({ value, onChange, placeholder }) => (
    <input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder}
        style={{ background: "#0f172a", border: "1px solid #334155", borderRadius: "8px", padding: "10px 14px", color: "#e2e8f0", fontSize: "14px", width: "100%", outline: "none", marginBottom: "12px" }} />
);

export default function UrlSection() {
    const [urlInput, setUrlInput] = useState("https://example.com/path?name=harsh&age=25&city=goa");
    const [queryObj, setQueryObj] = useState('{"name": "harsh", "age": "25", "city": "goa"}');
    const [queryStr, setQueryStr] = useState("name=harsh&age=25&city=goa");

    const parsed = parseURL(urlInput);

    let parsedObj = {};
    try { parsedObj = JSON.parse(queryObj); } catch (e) {
        console.warn("Invalid JSON input for query object:", e);
    }

    return (
        <div>
            <h2 style={{ fontSize: "24px", fontWeight: "700", marginBottom: "8px" }}>🌍 URL Utilities</h2>
            <p style={{ color: "#64748b", marginBottom: "24px", fontSize: "14px" }}>Functions for working with URLs and query strings</p>

            <Card title="parseURL()">
                <Input value={urlInput} onChange={setUrlInput} placeholder="Enter a URL..." />
                <div style={{ marginTop: "8px" }}>
                    <p style={{ color: "#64748b", fontSize: "12px", marginBottom: "8px" }}>Try these:</p>
                    {[
                        "https://example.com/path?name=harsh&age=25",
                        "https://github.com/harshyadavDeveloper/snaputils",
                        "notaurl",
                    ].map((ex) => (
                        <button key={ex} onClick={() => setUrlInput(ex)} style={{
                            background: "#0f172a", color: "#94a3b8", border: "1px solid #334155",
                            borderRadius: "6px", padding: "4px 10px", cursor: "pointer", fontSize: "12px",
                            marginRight: "8px", marginBottom: "8px",
                        }}>{ex.length > 40 ? ex.slice(0, 40) + "..." : ex}</button>
                    ))}
                </div>
                {parsed ? <Output label="parseURL():" value={parsed} /> :
                    <SimpleOutput label="parseURL()" value="null — invalid URL" />}
            </Card>

            <Card title="buildQueryString()">
                <p style={{ color: "#64748b", fontSize: "12px", marginBottom: "8px" }}>Enter a JSON object:</p>
                <input value={queryObj} onChange={(e) => setQueryObj(e.target.value)}
                    style={{ background: "#0f172a", border: "1px solid #334155", borderRadius: "8px", padding: "10px 14px", color: "#e2e8f0", fontSize: "14px", width: "100%", outline: "none", marginBottom: "12px", fontFamily: "monospace" }} />
                <SimpleOutput label="buildQueryString()" value={buildQueryString(parsedObj)} />
            </Card>

            <Card title="parseQueryString()">
                <Input value={queryStr} onChange={setQueryStr} placeholder="e.g. name=harsh&age=25" />
                <div style={{ marginTop: "8px" }}>
                    <p style={{ color: "#64748b", fontSize: "12px", marginBottom: "8px" }}>Try these:</p>
                    {["name=harsh&age=25&city=goa", "?foo=bar&baz=qux", "single=value"].map((ex) => (
                        <button key={ex} onClick={() => setQueryStr(ex)} style={{
                            background: "#0f172a", color: "#94a3b8", border: "1px solid #334155",
                            borderRadius: "6px", padding: "4px 10px", cursor: "pointer", fontSize: "12px",
                            marginRight: "8px", marginBottom: "8px",
                        }}>{ex}</button>
                    ))}
                </div>
                <Output label="parseQueryString():" value={parseQueryString(queryStr)} />
            </Card>
        </div>
    );
}