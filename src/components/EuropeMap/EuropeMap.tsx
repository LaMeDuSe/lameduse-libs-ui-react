import React, { useState } from "react";

export interface EuropeMapCountryInfo {
  name: string;
  population: string;
  capital: string;
}

export interface EuropeMapProps {
  /** Additional CSS classes for the container */
  className?: string;
  /** Width of the map (CSS value or number in px). Defaults to "100%". */
  width?: number | string;
  /** Height of the map (CSS value or number in px). Omit to preserve aspect ratio. */
  height?: number | string;
}

interface TooltipState {
  visible: boolean;
  x: number;
  y: number;
  info: (EuropeMapCountryInfo & { color: string }) | null;
}

type HighlightedCountry = "france" | "switzerland" | "germany";

const COUNTRY_DATA: Record<
  HighlightedCountry,
  EuropeMapCountryInfo & { color: string; hoverColor: string }
> = {
  france: {
    name: "France",
    population: "68,0 millions",
    capital: "Paris",
    color: "#2563EB",
    hoverColor: "#1D4ED8",
  },
  switzerland: {
    name: "Suisse",
    population: "8,8 millions",
    capital: "Berne",
    color: "#DC2626",
    hoverColor: "#B91C1C",
  },
  germany: {
    name: "Allemagne",
    population: "84,3 millions",
    capital: "Berlin",
    color: "#16A34A",
    hoverColor: "#15803D",
  },
};

/**
 * Approximate equirectangular projection used for all SVG paths.
 * ViewBox: 0 0 880 660
 * Longitude range: −8° to 24°  →  x = (lon + 8) × 27.5
 * Latitude  range: 42° to 57°  →  y = (57 − lat) × 44
 */
const CONTEXT_PATHS: Record<string, string> = {
  unitedKingdom:
    "M 100,100 L 175,88 L 215,160 L 185,235 L 145,265 L 105,245 L 88,168 Z",
  spain:
    "M 171,598 L 220,629 L 303,616 L 260,680 L 165,700 L 55,680 L 40,635 Z",
  netherlands: "M 316,242 L 332,195 L 357,168 L 413,163 L 391,255 L 385,242 Z",
  belgium: "M 285,264 L 303,272 L 391,255 L 385,242 L 316,242 Z",
  austria:
    "M 488,418 L 578,409 L 688,396 L 688,462 L 501,462 L 501,444 Z",
  czechRepublic:
    "M 564,299 L 633,277 L 715,308 L 715,374 L 590,374 L 578,409 L 564,299 Z",
  northItaly:
    "M 408,491 L 454,484 L 468,493 L 501,462 L 452,560 L 390,590 Z",
  poland: "M 622,264 L 720,230 L 732,350 L 682,380 L 633,277 Z",
};

/**
 * Shared border coordinates between the three highlighted countries
 * ensure clean, gap-free rendering at country edges.
 *
 * France–Germany border : (426,374) → (435,396) → (432,414)
 * France–Switzerland border: (432,414) → (399,440) → (388,466) → (408,491)
 * Germany–Switzerland border: (432,414) → (488,418)
 */
const HIGHLIGHTED_PATHS: Record<HighlightedCountry, string> = {
  france:
    "M 275,264 L 303,272 L 391,330 L 426,374 L 435,396 L 432,414 " +
    "L 399,440 L 388,466 L 408,491 L 426,581 L 303,616 L 220,629 " +
    "L 171,598 L 179,541 L 187,484 L 160,427 L 96,378 " +
    "L 165,374 L 168,326 L 226,321 Z",
  germany:
    "M 391,255 L 385,220 L 413,163 L 437,145 L 479,97 L 624,132 " +
    "L 622,264 L 633,277 L 590,361 L 578,409 L 511,418 L 488,418 " +
    "L 432,414 L 435,396 L 426,374 L 396,330 L 388,299 Z",
  switzerland:
    "M 432,414 L 488,418 L 501,444 L 468,493 L 454,484 L 408,491 L 388,466 L 399,440 Z",
};

const COUNTRY_LABELS: Record<
  HighlightedCountry,
  { x: number; y: number; fontSize: number; label: string }
> = {
  france: { x: 290, y: 450, fontSize: 15, label: "France" },
  germany: { x: 495, y: 265, fontSize: 15, label: "Allemagne" },
  switzerland: { x: 445, y: 455, fontSize: 11, label: "CH" },
};

/**
 * An interactive SVG map of Europe highlighting France, Switzerland and
 * Germany. Hovering over a country changes its colour and shows a tooltip
 * with its name, capital and population.
 *
 * The map is fully scalable (vector) and can be resized without quality loss.
 */
const EuropeMap = ({
  className = "",
  width = "100%",
  height,
}: EuropeMapProps) => {
  const [hovered, setHovered] = useState<HighlightedCountry | null>(null);
  const [tooltip, setTooltip] = useState<TooltipState>({
    visible: false,
    x: 0,
    y: 0,
    info: null,
  });

  const handleMouseEnter = (
    key: HighlightedCountry,
    event: React.MouseEvent<SVGPathElement>
  ) => {
    const svg = event.currentTarget.ownerSVGElement as SVGSVGElement;
    const rect = svg.getBoundingClientRect();
    setHovered(key);
    setTooltip({
      visible: true,
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
      info: COUNTRY_DATA[key],
    });
  };

  const handleMouseMove = (event: React.MouseEvent<SVGPathElement>) => {
    const svg = event.currentTarget.ownerSVGElement as SVGSVGElement;
    const rect = svg.getBoundingClientRect();
    setTooltip((prev) => ({
      ...prev,
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    }));
  };

  const handleMouseLeave = () => {
    setHovered(null);
    setTooltip({ visible: false, x: 0, y: 0, info: null });
  };

  const getCountryFill = (key: HighlightedCountry): string => {
    const data = COUNTRY_DATA[key];
    return hovered === key ? data.hoverColor : data.color;
  };

  const containerStyle: React.CSSProperties = {
    position: "relative",
    width,
    ...(height !== undefined ? { height } : {}),
  };

  return (
    <div className={`relative ${className}`} style={containerStyle}>
      <svg
        viewBox="0 0 880 660"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: "100%", height: "100%", display: "block" }}
        role="img"
        aria-label="Carte interactive de l'Europe"
      >
        {/* Sea / background */}
        <rect width="880" height="660" fill="#d4e8f5" rx="8" />

        {/* Context countries (gray) rendered below the highlighted ones */}
        {Object.entries(CONTEXT_PATHS).map(([key, d]) => (
          <path
            key={key}
            d={d}
            fill="#b8c4cc"
            stroke="#ffffff"
            strokeWidth="1"
          />
        ))}

        {/* Highlighted countries: France, Germany, Switzerland */}
        {(["france", "germany", "switzerland"] as HighlightedCountry[]).map(
          (key) => (
            <path
              key={key}
              d={HIGHLIGHTED_PATHS[key]}
              fill={getCountryFill(key)}
              stroke="#ffffff"
              strokeWidth="1.5"
              style={{
                cursor: "pointer",
                transition: "fill 0.2s ease-in-out",
              }}
              onMouseEnter={(e) => handleMouseEnter(key, e)}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            />
          )
        )}

        {/* Country name labels */}
        {(
          Object.entries(COUNTRY_LABELS) as [
            HighlightedCountry,
            { x: number; y: number; fontSize: number; label: string }
          ][]
        ).map(([key, { x, y, fontSize, label }]) => (
          <text
            key={key}
            x={x}
            y={y}
            textAnchor="middle"
            fontSize={fontSize}
            fontWeight="bold"
            fill="white"
            pointerEvents="none"
            style={{ userSelect: "none" }}
          >
            {label}
          </text>
        ))}
      </svg>

      {/* Tooltip */}
      {tooltip.visible && tooltip.info && (
        <div
          data-testid="euromap-tooltip"
          style={{
            position: "absolute",
            left: tooltip.x + 14,
            top: tooltip.y - 14,
            pointerEvents: "none",
            zIndex: 20,
          }}
          className="bg-white border border-gray-200 rounded-lg shadow-lg p-3 text-sm min-w-[150px]"
        >
          <div
            className="font-bold text-base mb-1"
            style={{ color: tooltip.info.color }}
          >
            {tooltip.info.name}
          </div>
          <div className="text-gray-600">
            <span className="font-medium">Capitale :</span>{" "}
            {tooltip.info.capital}
          </div>
          <div className="text-gray-600">
            <span className="font-medium">Population :</span>{" "}
            {tooltip.info.population}
          </div>
        </div>
      )}
    </div>
  );
};

export default EuropeMap;
