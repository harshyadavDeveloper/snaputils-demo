import { useState } from "react";
import {
    formatDate,
    formatShortDate,
    timeAgo,
    isToday,
    daysBetween,
    addDays,
    isWeekend,
    isLeapYear,
    getDayName,
    getMonthName,
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

const Input = ({ value, onChange, type = "date" }) => (
    <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
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
            colorScheme: "dark",
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

export default function DateSection() {
    const today = new Date().toISOString().split("T")[0];
    const [date1, setDate1] = useState("2024-01-15");
    const [date2, setDate2] = useState(today);
    const [date3, setDate3] = useState(today);
    const [year, setYear] = useState("2024");
    const [daysToAdd, setDaysToAdd] = useState("5");

    return (
        <div>
            <h2 style={{ fontSize: "24px", fontWeight: "700", marginBottom: "8px" }}>📅 Date Utilities</h2>
            <p style={{ color: "#64748b", marginBottom: "24px", fontSize: "14px" }}>
                Functions for formatting and working with dates
            </p>

            <Card title="formatDate / formatShortDate / getDayName / getMonthName">
                <Input value={date1} onChange={setDate1} />
                <Output label='formatDate("short")' value={formatDate(date1, "en-US", "short")} />
                <Output label='formatDate("long")' value={formatDate(date1, "en-US", "long")} />
                <Output label='formatDate("full")' value={formatDate(date1, "en-US", "full")} />
                <Output label='formatDate("numeric")' value={formatDate(date1, "en-US", "numeric")} />
                <Output label="formatShortDate()" value={formatShortDate(date1)} />
                <Output label="getDayName()" value={getDayName(date1)} />
                <Output label="getMonthName()" value={getMonthName(date1)} />
                <Output label="isWeekend()" value={isWeekend(date1)} />
            </Card>

            <Card title="isToday / timeAgo">
                <Input value={date2} onChange={setDate2} />
                <Output label="isToday()" value={isToday(date2)} />
                <Output label="timeAgo()" value={timeAgo(date2)} />
            </Card>

            <Card title="daysBetween()">
                <p style={{ color: "#64748b", fontSize: "12px", marginBottom: "8px" }}>From:</p>
                <Input value={date3} onChange={setDate3} />
                <p style={{ color: "#64748b", fontSize: "12px", marginBottom: "8px" }}>To:</p>
                <Input value={date1} onChange={setDate1} />
                <Output label="daysBetween()" value={daysBetween(date3, date1)} />
            </Card>

            <Card title="addDays()">
                <Input value={date1} onChange={setDate1} />
                <input
                    type="number"
                    value={daysToAdd}
                    onChange={(e) => setDaysToAdd(e.target.value)}
                    placeholder="Days to add..."
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
                <Output label="addDays()" value={formatDate(addDays(date1, Number(daysToAdd)))} />
            </Card>

            <Card title="isLeapYear()">
                <input
                    type="number"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    placeholder="Enter a year..."
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
                <Output label="isLeapYear()" value={isLeapYear(Number(year))} />
            </Card>
        </div>
    );
}