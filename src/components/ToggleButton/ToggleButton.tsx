import React, { useState } from "react";


export interface ToggleButtonProps {
  labelOn: string;
  labelOff:string;
  isToggled?: boolean;
  onToggle?: (toggled: boolean) => void;
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
    labelOn,
    labelOff,
    isToggled: controlledToggled,
    onToggle,
    type = "primary",
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

  // Configuration des tailles
  const sizes = {
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

  const currentSize = sizes[size] || sizes.medium;

  const handleToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (onClick) {onClick(e)};
    
    const newState = !isToggled;
    if (!isControlled) {
      setInternalToggled(newState);
    }
    
    if (onToggle) {onToggle(newState)};
  };

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
        className={`${props.color_classOff || "bg-gray-200"} ${currentSize.track} relative inline-flex shrink-0 cursor-pointer rounded-full p-[2px] transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-lameduse-primary focus-visible:ring-offset-2 overflow-hidden`}
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
            isToggled ? currentSize.translate : "translate-x-0"
          } pointer-events-none relative z-10 inline-block ${currentSize.thumb} transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
        />
      </span>
      {/* Label */}
      <span className={`font-medium text-gray-900 ${currentSize.text}`}>
        {isToggled ? labelOn : labelOff}
      </span>
    </button>
  )
};

export default ToggleButton;