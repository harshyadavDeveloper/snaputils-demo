import { useState } from "react";
import { capitalize, truncate, toCamelCase, maskString, wordCount, toTitleCase, isPalindrome, countOccurrences, reverseString, slugify, stripHTML, extractEmails, extractURLs } from "@dungeonmaster/snaputils";

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

export default function StringSection() {
    const [str1, setStr1] = useState("hello world");
    const [str2, setStr2] = useState("hello world everyone");
    const [str3, setStr3] = useState("1234567890");
    const [str4, setStr4] = useState("racecar");
    const [str5, setStr5] = useState("hello world hello");
    const [substr, setSubstr] = useState("hello");
    const [emailText, setEmailText] = useState("contact a@b.com or support@example.com");
    const [urlText, setUrlText] = useState("visit https://google.com or https://github.com");

    return (
        <div>
            <h2 style={{ fontSize: "24px", fontWeight: "700", marginBottom: "8px" }}>🧵 String Utilities</h2>
            <p style={{ color: "#64748b", marginBottom: "24px", fontSize: "14px" }}>
                Functions for transforming and analyzing strings
            </p>

            <Card title="capitalize / toCamelCase / toTitleCase / reverseString">
                <Input value={str1} onChange={setStr1} placeholder="Type something..." />
                <Output label="capitalize()" value={capitalize(str1)} />
                <Output label="toCamelCase()" value={toCamelCase(str1)} />
                <Output label="toTitleCase()" value={toTitleCase(str1)} />
                <Output label="reverseString()" value={reverseString(str1)} />
                <Output label="wordCount()" value={wordCount(str1)} />
            </Card>

            <Card title="truncate()">
                <Input value={str2} onChange={setStr2} placeholder="Type a long string..." />
                <Output label="truncate(str, 10)" value={truncate(str2, 10)} />
                <Output label="truncate(str, 15)" value={truncate(str2, 15)} />
                <Output label="truncate(str, 20)" value={truncate(str2, 20)} />
            </Card>

            <Card title="maskString()">
                <Input value={str3} onChange={setStr3} placeholder="e.g. credit card number" />
                <Output label="maskString(str, 2, 2)" value={maskString(str3, 2, 2)} />
                <Output label="maskString(str, 4, 4)" value={maskString(str3, 4, 4)} />
            </Card>

            <Card title="isPalindrome()">
                <Input value={str4} onChange={setStr4} placeholder="e.g. racecar" />
                <Output label="isPalindrome()" value={isPalindrome(str4)} />
            </Card>

            <Card title="countOccurrences()">
                <Input value={str5} onChange={setStr5} placeholder="Main string..." />
                <Input value={substr} onChange={setSubstr} placeholder="Substring to count..." />
                <Output label="countOccurrences()" value={countOccurrences(str5, substr)} />
            </Card>

            <Card title="slugify()">
                <Input value={str1} onChange={setStr1} placeholder="Type something..." />
                <Output label="slugify()" value={slugify(str1)} />
            </Card>

            <Card title="stripHTML()">
                <Input value={str2} onChange={setStr2} placeholder="Type HTML string..." />
                <Output label="stripHTML()" value={stripHTML(str2)} />
            </Card>

            <Card title="extractEmails()">
                <Input value={emailText} onChange={setEmailText} placeholder="Type text with emails..." />
                <Output label="extractEmails()" value={extractEmails(emailText).join(", ") || "none found"} />
            </Card>

            <Card title="extractURLs()">
                <Input value={urlText} onChange={setUrlText} placeholder="Type text with URLs..." />
                <Output label="extractURLs()" value={extractURLs(urlText).join(", ") || "none found"} />
            </Card>
        </div>
    );
}