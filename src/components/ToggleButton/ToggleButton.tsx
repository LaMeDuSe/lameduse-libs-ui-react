import React, { useState } from "react";


export interface ToggleButtonProps {
  children?: React.ReactNode | ((isToggled: boolean) => React.ReactNode);
  isToggled?: boolean;
  onToggle?: (toggled: boolean) => void;
  variant?: "switch" | "block";
  type?: "primary" | "secondary" | "tertiary" | "danger" | "white" | "gradient" | "free";
  form?: "rounded" | "pill";
  size?: "small" | "medium" | "large";
  color_classOff?: string;
  color_classOn?: string;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const ToggleButton = (props: ToggleButtonProps) => {
  const {
    isToggled: controlledToggled,
    onToggle,
    variant = "switch",
    type = "primary",
    form = "rounded",
    size = "medium",
    className = "",
    onClick,
  } = props;

  const [internalToggled, setInternalToggled] = useState(false);
  const isControlled = controlledToggled !== undefined;
  const isToggled = isControlled ? controlledToggled : internalToggled;

  // Configuration des couleurs de la piste (track) quand activé
  const activeTrackColors: Record<string, string> = {
    primary: "bg-lameduse-primary",
    secondary: "bg-lameduse-secondary",
    tertiary: "bg-lameduse-tertiary",
    danger: "bg-lameduse-red",
    white: "bg-gray-300",
    gradient: "bg-gradient-to-r from-lameduse-primary to-lameduse-secondary",
    free: props.color_classOn || ""
  };

  // Configuration des tailles pour le mode switch
  const switchSizes = {
    small: {
      track: "w-8 h-4",
      thumb: "w-3 h-3",
      translate: "translate-x-4",
      text: "text-sm",
    },
    medium: {
      track: "w-11 h-6",
      thumb: "w-5 h-5",
      translate: "translate-x-5",
      text: "text-base",
    },
    large: {
      track: "w-14 h-8",
      thumb: "w-7 h-7",
      translate: "translate-x-6",
      text: "text-lg",
    },
  };

  // Configuration des tailles pour le mode block
  const blockSizes = {
    small: "px-3 py-1.5 text-sm",
    medium: "px-5 py-2.5 text-base",
    large: "px-7 py-3.5 text-lg",
  };

  // Configuration de la forme pour le mode block
  const blockForms = {
    rounded: "rounded-lg",
    pill: "rounded-full",
  };

  const currentSwitchSize = switchSizes[size] || switchSizes.medium;

  const handleToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (onClick) { onClick(e) };

    const newState = !isToggled;
    if (!isControlled) {
      setInternalToggled(newState);
    }

    if (onToggle) { onToggle(newState) };
  };

  // ── Mode Block ──────────────────────────────────────────────────────
  if (variant === "block") {
    const blockOnColors: Record<string, string> = {
      primary: "bg-lameduse-primary text-white",
      secondary: "bg-lameduse-secondary text-white",
      tertiary: "bg-lameduse-tertiary text-white",
      danger: "bg-lameduse-red text-white",
      white: "bg-white text-gray-900 border border-gray-300",
      gradient: "bg-gradient-to-r from-lameduse-primary to-lameduse-secondary text-white",
      free: props.color_classOn || "",
    };

    const blockOffColors = props.color_classOff || "bg-gray-200 text-lameduse-primary";
    const blockOnColor = blockOnColors[type] || blockOnColors.gradient;

    return (
      <button
        type="button"
        role="switch"
        aria-checked={isToggled}
        onClick={handleToggle}
        className={`
          inline-flex items-center justify-center font-semibold
          transition-all duration-300 ease-in-out
          cursor-pointer select-none
          focus:outline-none focus-visible:ring-2 focus-visible:ring-lameduse-primary focus-visible:ring-offset-2
          ${blockSizes[size] || blockSizes.medium}
          ${blockForms[form] || blockForms.rounded}
          ${isToggled ? blockOnColor : blockOffColors}
          ${className}
        `}
      >
        {typeof props.children === "function" ? props.children(isToggled) : props.children}
      </button>
    );
  }

  // ── Mode Switch (défaut) ────────────────────────────────────────────
  return (
    <button
      type="button"
      role="switch"
      aria-checked={isToggled}
      onClick={handleToggle}
      className={`group inline-flex items-center gap-3 focus:outline-none ${className}`}
    >
      {/* Track */}
      <span
        className={`${props.color_classOff || "bg-gray-200"} ${currentSwitchSize.track} relative inline-flex shrink-0 cursor-pointer rounded-full p-[2px] transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-lameduse-primary focus-visible:ring-offset-2 overflow-hidden`}
      >
        {/* Active Background Layer */}
        <span
          aria-hidden="true"
          className={`absolute inset-0 ${activeTrackColors[type]} transition-opacity duration-200 ease-in-out ${isToggled ? 'opacity-100' : 'opacity-0'}`}
        />
        {/* Thumb */}
        <span
          aria-hidden="true"
          className={`${
            isToggled ? currentSwitchSize.translate : "translate-x-0"
          } pointer-events-none relative z-10 inline-block ${currentSwitchSize.thumb} transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
        />
      </span>
      {/* Label */}
      <span className={`font-medium text-gray-900 ${currentSwitchSize.text}`}>
        {typeof props.children === "function" ? props.children(isToggled) : props.children}
      </span>
    </button>
  );
};

export default ToggleButton;