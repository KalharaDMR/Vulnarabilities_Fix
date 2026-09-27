import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
//import axios from "axios";
import instance from "../api/axios";

const finishLogin = (data, navigate) => {
  localStorage.setItem("token", data.token);
  localStorage.setItem("role", data.user.role);
  localStorage.setItem("user", JSON.stringify(data.user));

  switch (data.user.role) {
    case "ADMIN":
      navigate("/admin");
      break;
    case "PUBLIC_USER":
      navigate("/public");
      break;
    case "ZOOLOGIST":
      navigate("/zoologist");
      break;
    case "AUTHORIZED_PERSON":
      navigate("/authorized");
      break;
    default:
      navigate("/login");
  }
};

const inputStyle = {
  width: "100%",
  padding: "11px 14px",
  fontSize: "14px",
  border: "1px solid #dde3ec",
  borderRadius: "8px",
  outline: "none",
  color: "#1a2640",
  background: "#fff",
  boxSizing: "border-box",
  transition: "border-color 0.15s ease, box-shadow 0.15s ease",
  fontFamily: "inherit",
};

const EyeIcon = ({ show }) => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ display: "block" }}
  >
    {show ? (
      <>
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </>
    ) : (
      <>
        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
        <line x1="1" y1="1" x2="23" y2="23" />
      </>
    )}
  </svg>
);

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [focusedField, setFocusedField] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [googleError, setGoogleError] = useState("");
  const googleButtonRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
    if (!clientId) {
      setGoogleError("Google sign-in is not configured.");
      return undefined;
    }

    const renderGoogleButton = () => {
      if (!window.google?.accounts?.id || !googleButtonRef.current) return;

      window.google.accounts.id.initialize({
        client_id: clientId,
        callback: async ({ credential }) => {
          try {
            const response = await instance.post("/auth/google", {
              idToken: credential,
            });
            finishLogin(response.data, navigate);
          } catch (error) {
            setGoogleError(error.response?.data?.message || "Google sign-in failed");
          }
        },
      });
      window.google.accounts.id.renderButton(googleButtonRef.current, {
        theme: "outline",
        size: "large",
        text: "continue_with",
        shape: "rect",
        width: String(googleButtonRef.current.offsetWidth),
      });
    };

    const scriptUrl = "https://accounts.google.com/gsi/client";
    let script = document.querySelector(`script[src="${scriptUrl}"]`);
    let addedScript = false;

    if (window.google?.accounts?.id) {
      renderGoogleButton();
    } else if (script) {
      script.addEventListener("load", renderGoogleButton, { once: true });
    } else {
      script = document.createElement("script");
      script.src = scriptUrl;
      script.async = true;
      script.defer = true;
      script.addEventListener("load", renderGoogleButton, { once: true });
      document.head.appendChild(script);
      addedScript = true;
    }

    return () => {
      script?.removeEventListener("load", renderGoogleButton);
      if (addedScript) script?.remove();
    };
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await instance.post("/auth/login", { email, password });

      finishLogin(res.data, navigate);
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background:
          "linear-gradient(135deg, #0a1628 0%, #0d2a45 50%, #0a1628 100%)",
        fontFamily: "'DM Sans', 'Segoe UI', system-ui, sans-serif",
        padding: "20px",
      }}
    >
      {/* Subtle background pattern */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.03,
          backgroundImage:
            "radial-gradient(circle, #22d3b0 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div
        style={{
          background: "#fff",
          borderRadius: "16px",
          padding: "40px 36px",
          width: "100%",
          maxWidth: "400px",
          boxShadow: "0 20px 60px rgba(0,0,0,0.35)",
          position: "relative",
        }}
      >
        {/* Brand mark */}
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <div
            style={{
              width: "48px",
              height: "48px",
              background: "linear-gradient(135deg, #22d3b0, #0ea5e9)",
              borderRadius: "12px",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "22px",
              fontWeight: "700",
              color: "#fff",
              marginBottom: "16px",
            }}
          >
            F
          </div>
          <h1
            style={{
              margin: 0,
              fontSize: "22px",
              fontWeight: "600",
              color: "#0a1628",
              letterSpacing: "-0.01em",
            }}
          >
            Welcome back
          </h1>
          <p style={{ margin: "6px 0 0", fontSize: "14px", color: "#6b7a99" }}>
            Sign in to FishWatch
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "14px" }}
        >
          <div>
            <label
              style={{
                display: "block",
                fontSize: "13px",
                fontWeight: "500",
                color: "#374263",
                marginBottom: "6px",
              }}
            >
              Email address
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              style={{
                ...inputStyle,
                borderColor: focusedField === "email" ? "#22d3b0" : "#dde3ec",
                boxShadow:
                  focusedField === "email"
                    ? "0 0 0 3px rgba(34,211,176,0.12)"
                    : "none",
              }}
              onFocus={() => setFocusedField("email")}
              onBlur={() => setFocusedField(null)}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label
              style={{
                display: "block",
                fontSize: "13px",
                fontWeight: "500",
                color: "#374263",
                marginBottom: "6px",
              }}
            >
              Password
            </label>
            <div style={{ position: "relative" }}>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                style={{
                  ...inputStyle,
                  paddingRight: "40px",
                  borderColor:
                    focusedField === "password" ? "#22d3b0" : "#dde3ec",
                  boxShadow:
                    focusedField === "password"
                      ? "0 0 0 3px rgba(34,211,176,0.12)"
                      : "none",
                }}
                onFocus={() => setFocusedField("password")}
                onBlur={() => setFocusedField(null)}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#8a96b0",
                  transition: "color 0.15s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#22d3b0";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "#8a96b0";
                }}
              >
                <EyeIcon show={showPassword} />
              </button>
            </div>
          </div>

          <button
            type="submit"
            style={{
              marginTop: "6px",
              width: "100%",
              padding: "12px",
              background: "linear-gradient(135deg, #22d3b0, #0ea5e9)",
              border: "none",
              borderRadius: "8px",
              color: "#fff",
              fontSize: "15px",
              fontWeight: "600",
              cursor: "pointer",
              letterSpacing: "0.01em",
              transition: "opacity 0.15s ease, transform 0.1s ease",
              fontFamily: "inherit",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = "0.92";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = "1";
            }}
            onMouseDown={(e) => {
              e.currentTarget.style.transform = "scale(0.99)";
            }}
            onMouseUp={(e) => {
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            Sign in
          </button>
        </form>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            margin: "20px 0 12px",
            color: "#8a96b0",
            fontSize: "12px",
          }}
        >
          <span style={{ height: "1px", flex: 1, background: "#e5e9f0" }} />
          <span>OR</span>
          <span style={{ height: "1px", flex: 1, background: "#e5e9f0" }} />
        </div>
        <div
          ref={googleButtonRef}
          style={{ width: "100%", minHeight: "40px", display: "flex", justifyContent: "center" }}
        />
        {googleError && (
          <p role="status" style={{ margin: "8px 0 0", color: "#b42318", fontSize: "13px", textAlign: "center" }}>
            {googleError}
          </p>
        )}

        <p
          style={{
            textAlign: "center",
            fontSize: "13px",
            color: "#6b7a99",
            marginTop: "24px",
            marginBottom: 0,
          }}
        >
          Don't have an account?{" "}
          <button
            type="button"
            onClick={() => navigate("/signup")}
            style={{
              background: "none",
              border: "none",
              padding: 0,
              color: "#0ea5e9",
              fontWeight: "500",
              fontSize: "13px",
              cursor: "pointer",
              fontFamily: "inherit",
              textDecoration: "none",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.textDecoration = "underline";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.textDecoration = "none";
            }}
          >
            Create account
          </button>
        </p>
      </div>
    </div>
  );
}