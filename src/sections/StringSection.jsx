import { useState } from "react";
import {
    capitalize, truncate, toCamelCase, maskString, wordCount,
    toTitleCase, isPalindrome, countOccurrences, reverseString,
    slugify, stripHTML, extractEmails, extractURLs,
    generatePassword, initials, pluralize,
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
    const [passwordLength, setPasswordLength] = useState("12");
    const [password, setPassword] = useState(generatePassword());
    const [initialsInput, setInitialsInput] = useState("Harsh Yadav");
    const [pluralWord, setPluralWord] = useState("item");
    const [pluralCount, setPluralCount] = useState("2");
    const [pluralCustom, setPluralCustom] = useState("");

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
                <Output label="truncate(str, 15, {position:'middle'})" value={truncate(str2, 15, { position: "middle" })} />
                <Output label="truncate(str, 15, {position:'start'})" value={truncate(str2, 15, { position: "start" })} />
                <Output label="truncate(str, 10, {suffix:'--'})" value={truncate(str2, 10, { suffix: "--" })} />
            </Card>

            <Card title="maskString()">
                <Input value={str3} onChange={setStr3} placeholder="e.g. credit card number" />
                <Output label="maskString(str, 2, 2)" value={maskString(str3, 2, 2)} />
                <Output label="maskString(str, 4, 0, {reveal:'start'})" value={maskString(str3, 4, 0, { reveal: "start" })} />
                <Output label="maskString(str, 0, 4, {reveal:'end'})" value={maskString(str3, 0, 4, { reveal: "end" })} />
                <Output label="maskString(str, 2, 2, {maskChar:'#'})" value={maskString(str3, 2, 2, { maskChar: "#" })} />
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

            <Card title="generatePassword()">
                <p style={{ color: "#64748b", fontSize: "12px", marginBottom: "8px" }}>Password Length:</p>
                <input type="number" value={passwordLength} onChange={(e) => setPasswordLength(e.target.value)} min="8" max="32"
                    style={{ background: "#0f172a", border: "1px solid #334155", borderRadius: "8px", padding: "10px 14px", color: "#e2e8f0", fontSize: "14px", width: "100%", outline: "none", marginBottom: "12px" }} />
                <button onClick={() => setPassword(generatePassword(Number(passwordLength)))} style={{
                    background: "#6366f1", color: "#fff", border: "none", borderRadius: "8px",
                    padding: "10px 20px", cursor: "pointer", fontSize: "14px", fontWeight: "600",
                }}>
                    Generate Password
                </button>
                <Output label="generatePassword()" value={password} />
            </Card>

            <Card title="initials()">
                <Input value={initialsInput} onChange={setInitialsInput} placeholder="Enter a full name..." />
                <Output label="initials()" value={initials(initialsInput)} />
                <div style={{ marginTop: "16px" }}>
                    <p style={{ color: "#64748b", fontSize: "12px", marginBottom: "8px" }}>Try these:</p>
                    {["Harsh Yadav", "John Doe Smith", "Elon Musk", "A B C D"].map((ex) => (
                        <button key={ex} onClick={() => setInitialsInput(ex)} style={{
                            background: "#0f172a", color: "#94a3b8", border: "1px solid #334155",
                            borderRadius: "6px", padding: "4px 10px", cursor: "pointer", fontSize: "12px",
                            marginRight: "8px", marginBottom: "8px",
                        }}>{ex}</button>
                    ))}
                </div>
            </Card>

            <Card title="pluralize()">
                <p style={{ color: "#64748b", fontSize: "12px", marginBottom: "8px" }}>Word:</p>
                <Input value={pluralWord} onChange={setPluralWord} placeholder="e.g. item" />
                <p style={{ color: "#64748b", fontSize: "12px", marginBottom: "8px" }}>Count:</p>
                <input type="number" value={pluralCount} onChange={(e) => setPluralCount(e.target.value)}
                    style={{ background: "#0f172a", border: "1px solid #334155", borderRadius: "8px", padding: "10px 14px", color: "#e2e8f0", fontSize: "14px", width: "100%", outline: "none", marginBottom: "12px" }} />
                <p style={{ color: "#64748b", fontSize: "12px", marginBottom: "8px" }}>Custom plural (optional):</p>
                <Input value={pluralCustom} onChange={setPluralCustom} placeholder="e.g. people, children" />
                <Output label="pluralize()" value={pluralize(pluralWord, Number(pluralCount), pluralCustom || undefined)} />
                <div style={{ marginTop: "16px" }}>
                    <p style={{ color: "#64748b", fontSize: "12px", marginBottom: "8px" }}>Try these:</p>
                    {[
                        { word: "item", count: 1 },
                        { word: "item", count: 5 },
                        { word: "person", count: 3, custom: "people" },
                        { word: "child", count: 2, custom: "children" },
                    ].map((ex) => (
                        <button key={`${ex.word}${ex.count}`} onClick={() => {
                            setPluralWord(ex.word);
                            setPluralCount(String(ex.count));
                            setPluralCustom(ex.custom || "");
                        }} style={{
                            background: "#0f172a", color: "#94a3b8", border: "1px solid #334155",
                            borderRadius: "6px", padding: "4px 10px", cursor: "pointer", fontSize: "12px",
                            marginRight: "8px", marginBottom: "8px",
                        }}>{ex.count} {ex.word}</button>
                    ))}
                </div>
            </Card>
        </div>
    );
}