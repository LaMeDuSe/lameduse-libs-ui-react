export const lameduseGradientStops = {
  "gradiant-1": { from: "#1B1464", to: "#0080E2" },
  "gradiant-2": { from: "#0080E2", to: "#01B4B6" },
  "gradient1": { from: "#1B1464", to: "#0080E2" },
  "gradient2": { from: "#0080E2", to: "#01B4B6" },
} as const;

export type LameduseGradientColor = keyof typeof lameduseGradientStops;
export type LameduseColor = "primary" | "secondary" | "tertiary" | LameduseGradientColor | "danger" | "white";
export type LameduseIconColor = Exclude<LameduseColor, "danger" | "white"> | "darkgrey";
export type LameduseHeadingTheme = "gradient" | Exclude<LameduseColor, "danger" | "white"> | "none";
export type LameduseButtonStyle = "solid" | "outline";
export type LameduseLinkStyle = LameduseButtonStyle | "text";

export const isLameduseGradientColor = (color?: string): color is LameduseGradientColor => (
  !!color && Object.prototype.hasOwnProperty.call(lameduseGradientStops, color)
);

export const lameduseSolidColorClasses: Record<LameduseColor, string> = {
  "primary": "bg-lameduse-primary text-white",
  "secondary": "bg-lameduse-secondary text-white",
  "tertiary": "bg-lameduse-tertiary text-white",
  "gradiant-1": "gradiant-lameduse-1 text-white",
  "gradiant-2": "gradiant-lameduse-2 text-white",
  "gradient1": "gradiant-lameduse-1 text-white",
  "gradient2": "gradiant-lameduse-2 text-white",
  "danger": "bg-lameduse-red text-white",
  "white": "bg-white text-lameduse-primary",
};

export const lameduseOutlineColorClasses: Record<LameduseColor, string> = {
  "primary": "text-lameduse-primary border border-lameduse-primary",
  "secondary": "text-lameduse-secondary border border-lameduse-secondary",
  "tertiary": "text-lameduse-tertiary border border-lameduse-tertiary",
  "gradiant-1": "text-gradiant-lameduse-1 border border-lameduse-secondary",
  "gradiant-2": "text-gradiant-lameduse-2 border border-lameduse-tertiary",
  "gradient1": "text-gradiant-lameduse-1 border border-lameduse-secondary",
  "gradient2": "text-gradiant-lameduse-2 border border-lameduse-tertiary",
  "danger": "text-lameduse-red border border-lameduse-red",
  "white": "text-white border border-white",
};

export const lameduseTextColorClasses: Record<LameduseColor, string> = {
  "primary": "text-lameduse-primary",
  "secondary": "text-lameduse-secondary",
  "tertiary": "text-lameduse-tertiary",
  "gradiant-1": "text-gradiant-lameduse-1",
  "gradiant-2": "text-gradiant-lameduse-2",
  "gradient1": "text-gradiant-lameduse-1",
  "gradient2": "text-gradiant-lameduse-2",
  "danger": "text-lameduse-red",
  "white": "text-white",
};

export const lameduseBackgroundColorClasses: Record<LameduseHeadingTheme, string> = {
  "gradient": "gradiant-lameduse",
  "primary": "bg-lameduse-primary",
  "secondary": "bg-lameduse-secondary",
  "tertiary": "bg-lameduse-tertiary",
  "gradiant-1": "gradiant-lameduse-1",
  "gradiant-2": "gradiant-lameduse-2",
  "gradient1": "gradiant-lameduse-1",
  "gradient2": "gradiant-lameduse-2",
  "none": "",
};

export const lameduseIconColorClasses: Record<LameduseIconColor, string> = {
  "primary": "text-lameduse-primary/80 hover:text-lameduse-primary",
  "secondary": "text-lameduse-secondary/80 hover:text-lameduse-secondary",
  "tertiary": "text-lameduse-tertiary/80 hover:text-lameduse-tertiary",
  "gradiant-1": "lameduse-icon-gradient",
  "gradiant-2": "lameduse-icon-gradient",
  "gradient1": "lameduse-icon-gradient",
  "gradient2": "lameduse-icon-gradient",
  "darkgrey": "text-gray-500/80 hover:text-gray-500",
};

export const lameduseButtonColorHoverClasses: Record<LameduseColor, Record<LameduseButtonStyle, string>> = {
  "primary": {
    "solid": "transition duration-100 hover:bg-opacity-80",
    "outline": "transition duration-100 hover:border-opacity-70 hover:text-opacity-70",
  },
  "secondary": {
    "solid": "transition duration-100 hover:bg-opacity-80",
    "outline": "transition duration-100 hover:border-opacity-70 hover:text-opacity-70",
  },
  "tertiary": {
    "solid": "transition duration-100 hover:bg-opacity-80",
    "outline": "transition duration-100 hover:border-opacity-70 hover:text-opacity-70",
  },
  "gradiant-1": {
    "solid": "transition duration-100 hover:opacity-80",
    "outline": "transition duration-100 hover:opacity-80",
  },
  "gradiant-2": {
    "solid": "transition duration-100 hover:opacity-80",
    "outline": "transition duration-100 hover:opacity-80",
  },
  "gradient1": {
    "solid": "transition duration-100 hover:opacity-80",
    "outline": "transition duration-100 hover:opacity-80",
  },
  "gradient2": {
    "solid": "transition duration-100 hover:opacity-80",
    "outline": "transition duration-100 hover:opacity-80",
  },
  "danger": {
    "solid": "transition duration-100 hover:bg-red-600",
    "outline": "transition duration-100 hover:border-red-600 hover:text-red-600",
  },
  "white": {
    "solid": "transition duration-100 hover:bg-gray-100",
    "outline": "transition duration-100 hover:border-gray-300",
  },
};

export const lameduseLinkColorHoverClasses: Record<LameduseColor, Record<LameduseLinkStyle, string>> = {
  "primary": {
    "solid": "transition duration-100 hover:bg-opacity-80",
    "outline": "transition duration-100 hover:border-opacity-70 hover:text-opacity-70",
    "text": "transition duration-100 hover:text-opacity-70",
  },
  "secondary": {
    "solid": "transition duration-100 hover:bg-opacity-80",
    "outline": "transition duration-100 hover:border-opacity-70 hover:text-opacity-70",
    "text": "transition duration-100 hover:text-opacity-70",
  },
  "tertiary": {
    "solid": "transition duration-100 hover:bg-opacity-80",
    "outline": "transition duration-100 hover:border-opacity-70 hover:text-opacity-70",
    "text": "transition duration-100 hover:text-opacity-70",
  },
  "gradiant-1": {
    "solid": "transition duration-100 hover:opacity-80",
    "outline": "transition duration-100 hover:opacity-80",
    "text": "transition duration-100 hover:opacity-80",
  },
  "gradiant-2": {
    "solid": "transition duration-100 hover:opacity-80",
    "outline": "transition duration-100 hover:opacity-80",
    "text": "transition duration-100 hover:opacity-80",
  },
  "gradient1": {
    "solid": "transition duration-100 hover:opacity-80",
    "outline": "transition duration-100 hover:opacity-80",
    "text": "transition duration-100 hover:opacity-80",
  },
  "gradient2": {
    "solid": "transition duration-100 hover:opacity-80",
    "outline": "transition duration-100 hover:opacity-80",
    "text": "transition duration-100 hover:opacity-80",
  },
  "danger": {
    "solid": "transition duration-100 hover:bg-red-600",
    "outline": "transition duration-100 hover:border-red-600 hover:text-red-600",
    "text": "transition duration-100 hover:text-red-600",
  },
  "white": {
    "solid": "transition duration-100 hover:bg-gray-100",
    "outline": "transition duration-100 hover:border-gray-300",
    "text": "transition duration-100 hover:text-gray-300",
  },
};