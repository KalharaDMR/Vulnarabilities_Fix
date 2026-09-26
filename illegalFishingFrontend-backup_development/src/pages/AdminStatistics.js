// src/pages/AdminStatistics.js
import Layout from "../components/Layout";

export default function AdminStatistics() {
  return (
    <Layout>
      <div style={{ fontFamily: "'DM Sans', 'Segoe UI', system-ui, sans-serif" }}>
        {/* Header */}
        <div style={{ marginBottom: "32px" }}>
          <div style={{ fontSize: "11px", color: "#8a96b0", letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: "500", marginBottom: "4px" }}>
            Admin
          </div>
          <h1 style={{ fontSize: "24px", fontWeight: "600", color: "#0a1628", letterSpacing: "-0.01em", margin: 0 }}>
            Statistics & Insights
          </h1>
          <p style={{ fontSize: "13px", color: "#6b7a99", marginTop: "6px" }}>
            Overview of system activity and report analytics
          </p>
        </div>

        {/* Coming Soon Banner */}
        <div style={{
          background: "linear-gradient(135deg, #f0f9ff 0%, #e6f7f5 100%)",
          borderRadius: "20px",
          padding: "48px 32px",
          textAlign: "center",
          border: "1px solid rgba(34,211,176,0.2)",
          marginBottom: "32px",
        }}>
          <div style={{
            width: "64px",
            height: "64px",
            background: "rgba(34,211,176,0.15)",
            borderRadius: "32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 20px",
            fontSize: "32px",
          }}>
            📊
          </div>
          <h2 style={{ fontSize: "20px", fontWeight: "600", color: "#0a1628", margin: "0 0 8px" }}>
            Statistics Dashboard
          </h2>
          <p style={{ fontSize: "14px", color: "#5a6e8a", maxWidth: "450px", margin: "0 auto" }}>
            Comprehensive analytics will appear here once the backend integration is complete. 
            This includes report trends, user activity, and enforcement metrics.
          </p>
        </div>

        {/* Placeholder Cards - Clean UI without fake numbers */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "20px",
          marginBottom: "32px",
        }}>
          {[
            { title: "Total Reports", icon: "📋", color: "#22d3b0", bg: "rgba(34,211,176,0.1)" },
            { title: "Active Investigations", icon: "🔍", color: "#0ea5e9", bg: "rgba(14,165,233,0.1)" },
            { title: "Resolved Cases", icon: "✅", color: "#10b981", bg: "rgba(16,185,129,0.1)" },
            { title: "Registered Users", icon: "👥", color: "#8b5cf6", bg: "rgba(139,92,246,0.1)" },
          ].map((card) => (
            <div
              key={card.title}
              style={{
                background: "#fff",
                borderRadius: "16px",
                border: "1px solid #e4eaf3",
                padding: "20px",
                transition: "transform 0.15s ease, box-shadow 0.15s ease",
                boxShadow: "0 1px 2px rgba(0,0,0,0.02)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.08)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 1px 2px rgba(0,0,0,0.02)";
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
                <div style={{
                  width: "44px",
                  height: "44px",
                  background: card.bg,
                  borderRadius: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "24px",
                }}>
                  {card.icon}
                </div>
                <h3 style={{ fontSize: "14px", fontWeight: "600", color: "#4a5a7a", margin: 0 }}>
                  {card.title}
                </h3>
              </div>
              <div style={{
                fontSize: "28px",
                fontWeight: "700",
                color: "#0a1628",
                letterSpacing: "-0.02em",
              }}>
                —
              </div>
              <div style={{ fontSize: "12px", color: "#8a96b0", marginTop: "8px" }}>
                Awaiting data
              </div>
            </div>
          ))}
        </div>

        {/* Chart Placeholders - Modern empty states */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "20px",
        }}>
          {/* Reports Trend Placeholder */}
          <div style={{
            background: "#fff",
            borderRadius: "16px",
            border: "1px solid #e4eaf3",
            padding: "20px",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <h3 style={{ fontSize: "15px", fontWeight: "600", color: "#0a1628", margin: 0 }}>
                Reports Trend (Last 6 Months)
              </h3>
              <span style={{ fontSize: "11px", color: "#8a96b0", background: "#f0f4f8", padding: "4px 8px", borderRadius: "6px" }}>
                Monthly
              </span>
            </div>
            <div style={{
              height: "200px",
              background: "linear-gradient(135deg, #fafbfd 0%, #f5f8fc 100%)",
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              gap: "12px",
              border: "1px dashed #dde3ec",
            }}>
              <span style={{ fontSize: "32px", opacity: 0.4 }}>📈</span>
              <span style={{ fontSize: "13px", color: "#8a96b0" }}>Chart will appear here</span>
            </div>
          </div>

          {/* Reports by Status Placeholder */}
          <div style={{
            background: "#fff",
            borderRadius: "16px",
            border: "1px solid #e4eaf3",
            padding: "20px",
          }}>
            <h3 style={{ fontSize: "15px", fontWeight: "600", color: "#0a1628", margin: "0 0 20px 0" }}>
              Reports by Status
            </h3>
            <div style={{
              height: "200px",
              background: "linear-gradient(135deg, #fafbfd 0%, #f5f8fc 100%)",
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              gap: "12px",
              border: "1px dashed #dde3ec",
            }}>
              <span style={{ fontSize: "32px", opacity: 0.4 }}>🥧</span>
              <span style={{ fontSize: "13px", color: "#8a96b0" }}>Distribution chart placeholder</span>
            </div>
          </div>

          {/* Top Districts Placeholder */}
          <div style={{
            background: "#fff",
            borderRadius: "16px",
            border: "1px solid #e4eaf3",
            padding: "20px",
          }}>
            <h3 style={{ fontSize: "15px", fontWeight: "600", color: "#0a1628", margin: "0 0 20px 0" }}>
              Top Districts by Reports
            </h3>
            <div style={{
              height: "200px",
              background: "linear-gradient(135deg, #fafbfd 0%, #f5f8fc 100%)",
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              gap: "12px",
              border: "1px dashed #dde3ec",
            }}>
              <span style={{ fontSize: "32px", opacity: 0.4 }}>🗺️</span>
              <span style={{ fontSize: "13px", color: "#8a96b0" }}>Geographic data placeholder</span>
            </div>
          </div>
        </div>

        {/* Footer note */}
        <div style={{
          marginTop: "32px",
          textAlign: "center",
          fontSize: "12px",
          color: "#8a96b0",
          borderTop: "1px solid #eef2f7",
          paddingTop: "20px",
        }}>
          Statistics will be populated once the backend integration is complete.
        </div>
      </div>
    </Layout>
  );
}