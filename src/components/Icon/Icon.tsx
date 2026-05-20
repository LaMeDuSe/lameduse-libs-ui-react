import React from "react";
import { LinkedInIcon, TwitterIcon, DiscordIcon, GitHubIcon, MailboxIcon, CheckIcon, OutboxIcon, InboxIcon, WarningIcon, CrossmarkIcon, BoxIcon, IdentityCardIcon, LameduseIcon } from "./icons";
import NextLinkImport from "next/link";
import { LameduseIconColor, isLameduseGradientColor, lameduseGradientStops, lameduseIconColorClasses } from "../../theme";

// Handle ESM/CJS interop for Next.js components
const NextLink = (NextLinkImport as any).default || NextLinkImport;


export interface IconProps {
  icon: string | React.ComponentType<any>; // restricts icon to keys of IconMap
  href?: string;
  size?: "small" | "medium" | "large";
  color?: LameduseIconColor;
  onClick?: () => void;
}

const IconMap = {
  "LINKEDIN": LinkedInIcon,
  "TWITTER": TwitterIcon,
  "DISCORD": DiscordIcon,
  "GITHUB": GitHubIcon,
  "MAILBOX": MailboxIcon,
  "CHECK": CheckIcon,
  "OUTBOX": OutboxIcon,
  "INBOX": InboxIcon,
  "WARNING": WarningIcon,
  "CROSSMARK": CrossmarkIcon,
  "BOX": BoxIcon,
  "IDENTITY CARD": IdentityCardIcon,
  "LAMEDUSE": LameduseIcon
};

const Icon = (props: IconProps) => {
  // default values
  props = { ...props }; // copy to avoid modifying the original object

  // default size
  props.size = props.size || "small";
  // default color
  props.color = props.color || "primary";

  let IconObj: React.ComponentType<any>;
  if (typeof props.icon === "string") {
    if (props.icon in IconMap){
      IconObj = IconMap[props.icon as keyof typeof IconMap];
    } else {
      let url = props.icon;
      IconObj = () => <img src={url} alt="" className="w-full h-full object-contain"/>
    }
  } else {
    IconObj = props.icon;
  };

  const sizeClass = {
    "small": "w-6 h-6",
    "medium": "w-8 h-8",
    "large": "w-10 h-10",
  }[props.size];

  const colorClass = lameduseIconColorClasses[props.color];

  const gradientId = React.useId().replace(/:/g, "");
  const gradientStops = isLameduseGradientColor(props.color) ? lameduseGradientStops[props.color] : undefined;
  const iconStyle = gradientStops ? ({
    "--lameduse-icon-paint": `url(#${gradientId})`,
  } as React.CSSProperties) : undefined;

  return (
    <div className={`${sizeClass} ${colorClass} text-nowrap`} style={iconStyle}>
      {gradientStops && (
        <svg aria-hidden="true" focusable="false" width="0" height="0" className="absolute h-0 w-0 overflow-hidden">
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={gradientStops.from} />
              <stop offset="100%" stopColor={gradientStops.to} />
            </linearGradient>
          </defs>
        </svg>
      )}
      <NextLink href={props.href || "#"} onClick={props.onClick}>
        <IconObj />
      </NextLink>
    </div>
  )
};

export default Icon;