// src/components/authorizedDashboard/ReportDetailModal.jsx
import { useState } from "react";
import { API_BASE } from "./dashboardConstants";

const FONT = `@import url('https://fonts.googleapis.com/css2?family=Source+Sans+3:wght@400;500;600;700;900&display=swap');`;

const T = {
  navy: "#0d1f3c",
  blue: "#1d4ed8",
  slate: "#334155",
  slateM: "#475569",
  muted: "#64748b",
  border: "#d8e2f0",
  font: "'Source Sans 3', 'Segoe UI', system-ui, sans-serif",
};

const Icon = ({ d, size = 16, sw = 1.8, color }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color || "currentColor"}
    strokeWidth={sw}
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ display: "block", flexShrink: 0 }}
  >
    <path d={d} />
  </svg>
);

const IC = {
  x: "M18 6L6 18M6 6l12 12",
  pin: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z",
  cal: "M8 2v3M16 2v3M3 8h18M5 4h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2z",
  clock: "M12 2a10 10 0 100 20A10 10 0 0012 2zm0 5v5l3 3",
  user: "M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z",
  map: "M1 6v16l7-4 8 4 7-4V2l-7 4-8-4-7 4zM8 2v16M16 6v16",
  image: "M21 15l-5-5L5 21M21 15v6H3V3h18v12zM8.5 10a1.5 1.5 0 100-3 1.5 1.5 0 000 3z",
  video: "M15 10l4.553-2.069A1 1 0 0121 8.82v6.362a1 1 0 01-1.447.894L15 14M3 8a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z",
  doc: "M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8zM14 2v6h6",
  alert: "M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z",
  expand: "M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7",
  download: "M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3",
};

const Badge = ({ bg, color, children }) => (
  <span
    style={{
      display: "inline-flex",
      alignItems: "center",
      padding: "4px 12px",
      borderRadius: "6px",
      fontSize: "11px",
      fontWeight: "700",
      letterSpacing: "0.06em",
      textTransform: "uppercase",
      background: bg,
      color,
      border: `1.5px solid ${color}40`,
      fontFamily: T.font,
      whiteSpace: "nowrap",
    }}
  >
    {children}
  </span>
);

const MetaRow = ({ icon, iconColor, label, value }) => (
  <div
    style={{
      display: "flex",
      alignItems: "flex-start",
      gap: "10px",
      padding: "10px 0",
      borderBottom: `1px solid ${T.border}`,
    }}
  >
    <span
      style={{
        width: "32px",
        height: "32px",
        borderRadius: "8px",
        background: "#f0f5ff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        color: iconColor || T.blue,
      }}
    >
      <Icon d={icon} size={14} sw={2} color={iconColor || T.blue} />
    </span>
    <div>
      <div
        style={{
          fontSize: "10.5px",
          fontWeight: "700",
          color: T.muted,
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          marginBottom: "3px",
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontSize: "14px",
          fontWeight: "600",
          color: T.slate,
          lineHeight: 1.4,
        }}
      >
        {value || "—"}
      </div>
    </div>
  </div>
);

// Detect file type from path
const getFileType = (filePath) => {
  const ext = filePath?.split(".").pop()?.toLowerCase() || "";
  if (["jpg", "jpeg", "png", "gif", "webp", "bmp", "svg"].includes(ext))
    return "image";
  if (["mp4", "mov", "avi", "mkv", "webm", "ogv"].includes(ext))
    return "video";
  return "other";
};

const buildFileUrl = (filePath) => {
  if (!filePath) return "";
  // If already absolute URL return as-is
  if (filePath.startsWith("http")) return filePath;
  // Strip leading src/ if present, serve from backend static
  const clean = filePath.replace(/^src\//, "");
  return `${API_BASE}/${clean}`;
};

// Single evidence tile
const EvidenceTile = ({ file, index }) => {
  const [expanded, setExpanded] = useState(false);
  const type = getFileType(file);
  const url = buildFileUrl(file);
  const fileName = file.split("/").pop();

  return (
    <>
      <div
        style={{
          border: `1.5px solid ${T.border}`,
          borderRadius: "10px",
          overflow: "hidden",
          background: "#f8faff",
          cursor: type === "image" ? "pointer" : "default",
          transition: "border-color 0.15s",
        }}
        onClick={() => type === "image" && setExpanded(true)}
      >
        {type === "image" && (
          <div style={{ position: "relative" }}>
            <img
              src={url}
              alt={`Evidence ${index + 1}`}
              style={{
                width: "100%",
                height: "140px",
                objectFit: "cover",
                display: "block",
              }}
              onError={(e) => {
                e.target.style.display = "none";
                e.target.nextSibling.style.display = "flex";
              }}
            />
            <div
              style={{
                display: "none",
                width: "100%",
                height: "140px",
                alignItems: "center",
                justifyContent: "center",
                color: T.muted,
                flexDirection: "column",
                gap: "8px",
              }}
            >
              <Icon d={IC.image} size={32} sw={1.4} color="#94a3b8" />
              <span style={{ fontSize: "12px", color: T.muted }}>
                Image unavailable
              </span>
            </div>
            <div
              style={{
                position: "absolute",
                top: "8px",
                right: "8px",
                background: "rgba(0,0,0,0.55)",
                borderRadius: "6px",
                padding: "4px 6px",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                gap: "4px",
              }}
            >
              <Icon d={IC.expand} size={11} sw={2} color="#fff" />
            </div>
          </div>
        )}

        {type === "video" && (
          <video
            src={url}
            controls
            style={{ width: "100%", height: "140px", objectFit: "cover" }}
          />
        )}

        {type === "other" && (
          <div
            style={{
              height: "100px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              gap: "8px",
              color: T.muted,
            }}
          >
            <Icon d={IC.doc} size={28} sw={1.4} color="#94a3b8" />
            <span style={{ fontSize: "12px" }}>File</span>
          </div>
        )}

        <div
          style={{
            padding: "8px 10px",
            borderTop: `1px solid ${T.border}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "8px",
          }}
        >
          <span
            style={{
              fontSize: "11px",
              color: T.muted,
              fontWeight: "600",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              flex: 1,
            }}
          >
            {fileName}
          </span>
          <a
            href={url}
            download={fileName}
            target="_blank"
            rel="noreferrer"
            onClick={(e) => e.stopPropagation()}
            style={{
              display: "flex",
              alignItems: "center",
              color: T.blue,
              flexShrink: 0,
            }}
          >
            <Icon d={IC.download} size={13} sw={2} color={T.blue} />
          </a>
        </div>
      </div>

      {/* Lightbox */}
      {expanded && (
        <div
          onClick={() => setExpanded(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.82)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "24px",
          }}
        >
          <button
            onClick={() => setExpanded(false)}
            style={{
              position: "absolute",
              top: "20px",
              right: "20px",
              background: "rgba(255,255,255,0.15)",
              border: "none",
              borderRadius: "8px",
              padding: "8px",
              cursor: "pointer",
              color: "#fff",
              display: "flex",
            }}
          >
            <Icon d={IC.x} size={18} sw={2.2} color="#fff" />
          </button>
          <img
            src={url}
            alt="Evidence expanded"
            style={{
              maxWidth: "100%",
              maxHeight: "85vh",
              borderRadius: "12px",
              objectFit: "contain",
            }}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
};

const statusConfig = {
  PENDING: { bg: "#fff8e6", color: "#92400e", label: "Pending" },
  INVESTIGATING: { bg: "#eff6ff", color: "#1e3a8a", label: "Investigating" },
  RESOLVED: { bg: "#f0fdf4", color: "#14532d", label: "Resolved" },
};

export default function ReportDetailModal({ report, onClose, onStartInvestigation, starting }) {
  if (!report) return null;

  const sc = statusConfig[report.status] || statusConfig.PENDING;
  const evidenceFiles = report.evidenceFiles || [];
  const images = evidenceFiles.filter((f) => getFileType(f) === "image");
  const videos = evidenceFiles.filter((f) => getFileType(f) === "video");
  const others = evidenceFiles.filter((f) => getFileType(f) === "other");

  const reportDate = report.reportDate
    ? new Date(report.reportDate).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    : "—";

  const submittedAt = report.createdAt
    ? new Date(report.createdAt).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "—";

  return (
    <>
      <style>{FONT + `
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(24px) scale(0.98); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        .rdm-overlay {
          position: fixed; inset: 0;
          background: rgba(10,20,40,0.55);
          z-index: 1000;
          display: flex; align-items: center; justify-content: center;
          padding: 24px;
          backdrop-filter: blur(2px);
        }
        .rdm-modal {
          background: #fff;
          border-radius: 20px;
          border: 1.5px solid ${T.border};
          width: 100%; max-width: 680px;
          max-height: 90vh;
          display: flex; flex-direction: column;
          animation: slideUp 0.25s cubic-bezier(0.22,1,0.36,1) both;
          box-shadow: 0 24px 64px rgba(10,20,40,0.2);
          font-family: ${T.font};
        }
        .rdm-header {
          padding: 20px 24px 16px;
          border-bottom: 1.5px solid ${T.border};
          display: flex; align-items: flex-start; justify-content: space-between; gap: 16px;
          flex-shrink: 0;
        }
        .rdm-body {
          overflow-y: auto; padding: 0 24px 24px; flex: 1;
        }
        .rdm-section-title {
          font-size: 11px; font-weight: 700;
          color: ${T.muted};
          text-transform: uppercase; letter-spacing: 0.09em;
          margin: 22px 0 12px; display: flex; align-items: center; gap: 8px;
        }
        .rdm-section-title::after {
          content: ''; flex: 1; height: 1px; background: ${T.border};
        }
        .rdm-close-btn {
          width: 34px; height: 34px; border-radius: 9px;
          background: #f1f5f9; border: none; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          color: ${T.muted}; transition: all 0.15s ease; flex-shrink: 0;
        }
        .rdm-close-btn:hover {
          background: #fee2e2 !important; color: #dc2626 !important;
        }
        .rdm-start-btn {
          padding: 10px 22px; border-radius: 9px;
          font-size: 13.5px; font-weight: 700; cursor: pointer;
          font-family: ${T.font};
          background: linear-gradient(135deg, #f0fdf4, #dcfce7);
          color: #14532d; border: 1.5px solid #6ee7b7;
          box-shadow: 0 2px 8px rgba(20,83,45,0.12);
          transition: all 0.15s ease; display: flex; align-items: center; gap: 8px;
        }
        .rdm-start-btn:hover:not(:disabled) {
          background: linear-gradient(135deg, #dcfce7, #a7f3d0) !important;
          border-color: #34d399 !important;
          box-shadow: 0 4px 14px rgba(20,83,45,0.2) !important;
          transform: translateY(-1px) !important;
        }
        .rdm-start-btn:disabled { opacity: 0.55; cursor: not-allowed; }
        .rdm-evidence-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(170px, 1fr));
          gap: 12px;
        }
        .rdm-coords {
          display: inline-flex; align-items: center; gap: 6px;
          font-size: 12px; font-weight: 600; color: ${T.blue};
          background: #eff6ff; border: 1.5px solid #bfdbfe;
          padding: 5px 12px; border-radius: 7px; margin-top: 6px;
          text-decoration: none; transition: background 0.15s;
        }
        .rdm-coords:hover { background: #dbeafe !important; }
      `}</style>

      <div className="rdm-overlay" onClick={onClose}>
        <div className="rdm-modal" onClick={(e) => e.stopPropagation()}>

          {/* Header */}
          <div className="rdm-header">
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px", flexWrap: "wrap" }}>
                <h2 style={{ margin: 0, fontSize: "17px", fontWeight: "700", color: T.navy, letterSpacing: "-0.3px" }}>
                  Report Details
                </h2>
                <Badge bg={sc.bg} color={sc.color}>{sc.label}</Badge>
              </div>
              <p style={{ margin: 0, fontSize: "13px", color: T.muted, fontWeight: "500" }}>
                {report.location || "Location unavailable"} · {report.district || ""}
              </p>
            </div>
            <button className="rdm-close-btn" onClick={onClose}>
              <Icon d={IC.x} size={16} sw={2.2} />
            </button>
          </div>

          {/* Body */}
          <div className="rdm-body">

            {/* Core meta */}
            <div className="rdm-section-title">Incident information</div>
            <div style={{ borderRadius: "12px", border: `1.5px solid ${T.border}`, overflow: "hidden" }}>
              <MetaRow icon={IC.pin}   iconColor="#1d4ed8" label="Location"        value={report.location} />
              <MetaRow icon={IC.map}   iconColor="#6366f1" label="District"         value={report.district} />
              <MetaRow icon={IC.cal}   iconColor="#0891b2" label="Incident date"    value={reportDate} />
              <MetaRow icon={IC.clock} iconColor="#7c3aed" label="Incident time"    value={report.reportTime} />
              <MetaRow icon={IC.cal}   iconColor="#94a3b8" label="Submitted at"     value={submittedAt} />
              {report.reporter && (
                <MetaRow
                  icon={IC.user}
                  iconColor="#059669"
                  label="Reported by"
                  value={`${report.reporter.name || ""}${report.reporter.phone ? "  ·  " + report.reporter.phone : ""}`}
                />
              )}
              <div style={{ padding: "10px 0", display: "flex", alignItems: "flex-start", gap: "10px" }}>
                <span style={{ width: "32px", height: "32px", borderRadius: "8px", background: "#f0f5ff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginLeft: "0" }}>
                  <Icon d={IC.map} size={14} sw={2} color="#0891b2" />
                </span>
                <div>
                  <div style={{ fontSize: "10.5px", fontWeight: "700", color: T.muted, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "4px" }}>
                    GPS coordinates
                  </div>
                  {report.latitude && report.longitude ? (
                    <a
                      className="rdm-coords"
                      href={`https://maps.google.com/?q=${report.latitude},${report.longitude}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Icon d={IC.pin} size={12} sw={2} color="#1d4ed8" />
                      {report.latitude.toFixed(5)}, {report.longitude.toFixed(5)}
                      <Icon d={IC.expand} size={11} sw={2} color="#1d4ed8" />
                    </a>
                  ) : (
                    <span style={{ fontSize: "14px", fontWeight: "600", color: T.muted }}>—</span>
                  )}
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="rdm-section-title">Description</div>
            <div
              style={{
                background: "linear-gradient(135deg,#f8faff,#f3f7ff)",
                border: `1.5px solid #dce8f8`,
                borderLeft: `4px solid #93c5fd`,
                borderRadius: "10px",
                padding: "14px 16px",
                fontSize: "14px",
                fontWeight: "500",
                color: T.slateM,
                lineHeight: 1.7,
              }}
            >
              {report.description || "No description provided."}
            </div>

            {/* Evidence */}
            {evidenceFiles.length > 0 && (
              <>
                <div className="rdm-section-title">
                  Evidence files
                  <span style={{ fontSize: "11px", fontWeight: "600", color: T.muted, background: "#f0f5ff", padding: "2px 8px", borderRadius: "5px", border: `1px solid ${T.border}` }}>
                    {evidenceFiles.length} {evidenceFiles.length === 1 ? "file" : "files"}
                  </span>
                </div>

                {images.length > 0 && (
                  <>
                    <div style={{ display: "flex", alignItems: "center", gap: "7px", marginBottom: "10px" }}>
                      <Icon d={IC.image} size={13} sw={2} color="#1e3a8a" />
                      <span style={{ fontSize: "12px", fontWeight: "700", color: T.muted, textTransform: "uppercase", letterSpacing: "0.07em" }}>
                        Photos ({images.length})
                      </span>
                    </div>
                    <div className="rdm-evidence-grid" style={{ marginBottom: "16px" }}>
                      {images.map((f, i) => (
                        <EvidenceTile key={f} file={f} index={i} />
                      ))}
                    </div>
                  </>
                )}

                {videos.length > 0 && (
                  <>
                    <div style={{ display: "flex", alignItems: "center", gap: "7px", marginBottom: "10px" }}>
                      <Icon d={IC.video} size={13} sw={2} color="#6366f1" />
                      <span style={{ fontSize: "12px", fontWeight: "700", color: T.muted, textTransform: "uppercase", letterSpacing: "0.07em" }}>
                        Videos ({videos.length})
                      </span>
                    </div>
                    <div className="rdm-evidence-grid" style={{ marginBottom: "16px" }}>
                      {videos.map((f, i) => (
                        <EvidenceTile key={f} file={f} index={i} />
                      ))}
                    </div>
                  </>
                )}

                {others.length > 0 && (
                  <>
                    <div style={{ display: "flex", alignItems: "center", gap: "7px", marginBottom: "10px" }}>
                      <Icon d={IC.doc} size={13} sw={2} color="#64748b" />
                      <span style={{ fontSize: "12px", fontWeight: "700", color: T.muted, textTransform: "uppercase", letterSpacing: "0.07em" }}>
                        Other files ({others.length})
                      </span>
                    </div>
                    <div className="rdm-evidence-grid">
                      {others.map((f, i) => (
                        <EvidenceTile key={f} file={f} index={i} />
                      ))}
                    </div>
                  </>
                )}
              </>
            )}

            {evidenceFiles.length === 0 && (
              <>
                <div className="rdm-section-title">Evidence files</div>
                <div
                  style={{
                    padding: "28px",
                    textAlign: "center",
                    background: "#f8faff",
                    border: `1.5px dashed ${T.border}`,
                    borderRadius: "10px",
                  }}
                >
                  <Icon d={IC.image} size={28} sw={1.4} color="#cbd5e1" />
                  <p style={{ margin: "10px 0 0", fontSize: "13px", color: T.muted, fontWeight: "500" }}>
                    No evidence files submitted with this report.
                  </p>
                </div>
              </>
            )}

            {/* Action strip */}
            {report.investigationStatus === "NOT_STARTED" && (
              <div
                style={{
                  marginTop: "22px",
                  padding: "16px",
                  background: "linear-gradient(135deg,#f0fdf4,#dcfce7)",
                  border: "1.5px solid #6ee7b7",
                  borderRadius: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "16px",
                  flexWrap: "wrap",
                }}
              >
                <div>
                  <div style={{ fontSize: "13.5px", fontWeight: "700", color: "#14532d", marginBottom: "3px" }}>
                    Ready to investigate
                  </div>
                  <div style={{ fontSize: "12.5px", color: "#166534", fontWeight: "500" }}>
                    No investigation has been started for this report yet.
                  </div>
                </div>
                <button
                  className="rdm-start-btn"
                  onClick={() => onStartInvestigation(report._id)}
                  disabled={starting}
                >
                  {starting ? "Starting…" : "Start investigation"}
                </button>
              </div>
            )}

            {report.investigationStatus === "INVESTIGATING" && (
              <div
                style={{
                  marginTop: "22px",
                  padding: "14px 16px",
                  background: "#eff6ff",
                  border: "1.5px solid #93c5fd",
                  borderRadius: "12px",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <Icon d={IC.alert} size={16} sw={2} color="#1e3a8a" />
                <span style={{ fontSize: "13px", fontWeight: "600", color: "#1e3a8a" }}>
                  Investigation already in progress — continue from the Assigned tab.
                </span>
              </div>
            )}

          </div>
        </div>
      </div>
    </>
  );
}