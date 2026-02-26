import type { Meta, StoryObj } from "@storybook/nextjs";
import React from "react";

// Importation dynamique de toutes les images (png, jpg, jpeg, svg, webp) du dossier courant
const requireContext = (require as any).context("./", false, /\.(png|jpe?g|svg|webp)$/);
const imageFiles = requireContext.keys().map((key: string) => key.replace("./", ""));

function ImageBank() {
  const [search, setSearch] = React.useState("");
  const [copied, setCopied] = React.useState<string | null>(null);

  const filtered = imageFiles.filter((f: string) =>
    f.toLowerCase().includes(search.toLowerCase())
  );

  const getKey = (filename: string) => filename.replace(/\.(png|jpe?g|svg|webp)$/, "");

  const handleCopy = (filename: string) => {
    const code = `LameduseUI.images['${getKey(filename)}']`;
    navigator.clipboard.writeText(code);
    setCopied(filename);
    setTimeout(() => setCopied(null), 1500);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <input
        type="text"
        placeholder="Rechercher une image..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "100%",
          padding: "12px 16px",
          fontSize: "16px",
          border: "2px solid #e2e8f0",
          borderRadius: "8px",
          marginBottom: "24px",
          outline: "none",
        }}
      />
      <p style={{ color: "#64748b", marginBottom: "16px" }}>
        {filtered.length} image{filtered.length > 1 ? "s" : ""} — Cliquez pour
        copier le code d'import
      </p>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: "16px",
        }}
      >
        {filtered.map((filename: string) => (
          <div
            key={filename}
            onClick={() => handleCopy(filename)}
            style={{
              border:
                copied === filename
                  ? "2px solid #22c55e"
                  : "2px solid #e2e8f0",
              borderRadius: "8px",
              padding: "12px",
              cursor: "pointer",
              transition: "all 0.2s",
              background: copied === filename ? "#f0fdf4" : "#fff",
              textAlign: "center",
            }}
          >
            <div
              style={{
                height: "140px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "8px",
              }}
            >
              <img
                src={`/images/${filename}`}
                alt={filename}
                style={{
                  maxWidth: "100%",
                  maxHeight: "140px",
                  objectFit: "contain",
                }}
              />
            </div>
            <div
              style={{
                fontSize: "12px",
                color: copied === filename ? "#16a34a" : "#475569",
                wordBreak: "break-all",
                fontWeight: 500,
              }}
            >
              {copied === filename ? "Copié !" : filename}
            </div>
            <div
              style={{
                fontSize: "10px",
                color: "#94a3b8",
                marginTop: "4px",
              }}
            >
              LameduseUI.images['{getKey(filename)}']
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const meta: Meta = {
  title: "Assets/Banque d'images",
  component: ImageBank,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Banque d'images disponibles dans la librairie. Cliquez sur une image pour copier son chemin.",
      },
    },
  },
};

export default meta;

type Story = StoryObj;

export const Galerie: Story = {};
