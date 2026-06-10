import { useState } from "react";
import {
  isStrongPassword,
  isUsername,
  isCreditCard,
  isPostalCode,
  isIPAddress,
} from "@dungeonmaster/snaputils";

const Card = ({ title, children }) => (
  <div style={{
    background: "#1e293b", borderRadius: "12px", padding: "20px",
    marginBottom: "16px", border: "1px solid #334155",
  }}>
    <h3 style={{ color: "#6366f1", marginBottom: "16px", fontSize: "14px", fontWeight: "600" }}>{title}</h3>
    {children}
  </div>
);

const Input = ({ value, onChange, placeholder, type = "text" }) => (
  <input type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder}
    style={{ background: "#0f172a", border: "1px solid #334155", borderRadius: "8px", padding: "10px 14px", color: "#e2e8f0", fontSize: "14px", width: "100%", outline: "none", marginBottom: "12px" }} />
);

const ValidOutput = ({ label, value }) => (
  <div style={{ display: "flex", alignItems: "center", gap: "12px", marginTop: "8px" }}>
    <span style={{ color: "#64748b", fontSize: "13px", minWidth: "160px" }}>{label}</span>
    <span style={{
      background: value ? "#064e3b" : "#450a0a",
      border: `1px solid ${value ? "#34d399" : "#f87171"}`,
      padding: "6px 12px", borderRadius: "6px", fontSize: "13px",
      color: value ? "#34d399" : "#f87171", fontWeight: "600",
    }}>
      {value ? "✅ Valid" : "❌ Invalid"}
    </span>
  </div>
);

const Examples = ({ examples, onClick }) => (
  <div style={{ marginTop: "12px" }}>
    <p style={{ color: "#64748b", fontSize: "12px", marginBottom: "8px" }}>Try these:</p>
    {examples.map((ex) => (
      <button key={ex} onClick={() => onClick(ex)} style={{
        background: "#0f172a", color: "#94a3b8", border: "1px solid #334155",
        borderRadius: "6px", padding: "4px 10px", cursor: "pointer", fontSize: "12px",
        marginRight: "8px", marginBottom: "8px",
      }}>{ex}</button>
    ))}
  </div>
);

export default function FormValidationSection() {
  const [password, setPassword] = useState("Hello@123");
  const [username, setUsername] = useState("harsh_dev");
  const [card, setCard] = useState("4111111111111111");
  const [postal, setPostal] = useState("400001");
  const [locale, setLocale] = useState("IN");
  const [ip, setIp] = useState("192.168.1.1");

  return (
    <div>
      <h2 style={{ fontSize: "24px", fontWeight: "700", marginBottom: "8px" }}>📝 Form Validation</h2>
      <p style={{ color: "#64748b", marginBottom: "24px", fontSize: "14px" }}>Functions for validating form inputs</p>

      <Card title="isStrongPassword()">
        <Input value={password} onChange={setPassword} placeholder="Enter a password..." type="text" />
        <ValidOutput label="isStrongPassword()" value={isStrongPassword(password)} />
        <p style={{ color: "#64748b", fontSize: "12px", marginTop: "8px" }}>
          Rules: min 8 chars, uppercase, lowercase, number, special char (@$!%*?&)
        </p>
        <Examples examples={["Hello@123", "weakpass", "NoSpecial1", "Str0ng@Pass"]} onClick={setPassword} />
      </Card>

      <Card title="isUsername()">
        <Input value={username} onChange={setUsername} placeholder="Enter a username..." />
        <ValidOutput label="isUsername()" value={isUsername(username)} />
        <p style={{ color: "#64748b", fontSize: "12px", marginTop: "8px" }}>
          Rules: alphanumeric + underscore, 3-20 chars
        </p>
        <Examples examples={["harsh_dev", "ab", "valid_user123", "has space"]} onClick={setUsername} />
      </Card>

      <Card title="isCreditCard()">
        <Input value={card} onChange={setCard} placeholder="Enter a credit card number..." />
        <ValidOutput label="isCreditCard()" value={isCreditCard(card)} />
        <Examples examples={["4111111111111111", "5500005555555559", "1234567890123456"]} onClick={setCard} />
      </Card>

      <Card title="isPostalCode()">
        <Input value={postal} onChange={setPostal} placeholder="Enter a postal code..." />
        <p style={{ color: "#64748b", fontSize: "12px", marginBottom: "8px" }}>Select locale:</p>
        <div style={{ display: "flex", gap: "8px", marginBottom: "12px", flexWrap: "wrap" }}>
          {["US", "IN", "UK", "CA", "AU"].map((l) => (
            <button key={l} onClick={() => setLocale(l)} style={{
              background: locale === l ? "#6366f1" : "#0f172a",
              color: locale === l ? "#fff" : "#94a3b8",
              border: `1px solid ${locale === l ? "#6366f1" : "#334155"}`,
              borderRadius: "6px", padding: "4px 12px", cursor: "pointer", fontSize: "13px",
            }}>{l}</button>
          ))}
        </div>
        <ValidOutput label={`isPostalCode("${postal}", "${locale}")`} value={isPostalCode(postal, locale)} />
        <Examples
          examples={locale === "US" ? ["90210", "10001", "12345"] :
            locale === "IN" ? ["400001", "110001", "12345"] :
              locale === "UK" ? ["SW1A 1AA", "EC1A 1BB", "12345"] :
                locale === "CA" ? ["K1A 0B1", "M5V 2T6", "12345"] :
                  ["2000", "3000", "12345"]}
          onClick={setPostal}
        />
      </Card>

      <Card title="isIPAddress()">
        <Input value={ip} onChange={setIp} placeholder="Enter an IP address..." />
        <ValidOutput label="isIPAddress()" value={isIPAddress(ip)} />
        <Examples examples={["192.168.1.1", "256.0.0.1", "10.0.0.1", "not an ip"]} onClick={setIp} />
      </Card>
    </div>
  );
}