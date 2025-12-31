import React from "react";
import { LinkedInIcon, TwitterIcon, DiscordIcon, GitHubIcon, MailboxIcon, CheckIcon, OutboxIcon, InboxIcon, WarningIcon, CrossmarkIcon, BoxIcon, IdentityCardIcon, LameduseIcon } from "./icons";
import NextLinkImport from "next/link";

// Handle ESM/CJS interop for Next.js components
const NextLink = (NextLinkImport as any).default || NextLinkImport;


export interface IconProps {
  icon: keyof typeof IconMap; // restricts icon to keys of IconMap
  href?: string;
  size?: "small" | "medium" | "large";
  color?: "primary" | "secondary" | "tertiary" | "darkgrey";
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

  const IconObj = IconMap[props.icon];

  const sizeClass = {
    "small": "w-6 h-6",
    "medium": "w-8 h-8",
    "large": "w-10 h-10",
  }[props.size];

  const colorClass = {
    "primary": "text-lameduse-primary/80 hover:text-lameduse-primary",
    "secondary": "text-lameduse-secondary/80 hover:text-lameduse-secondary",
    "tertiary": "text-lameduse-tertiary/80 hover:text-lameduse-tertiary",
    "darkgrey": "text-gray-500/80 hover:text-gray-500",
  }[props.color];
  return (
    <div className={`${sizeClass} ${colorClass} text-nowrap`}>
      <NextLink href={props.href || "#"} onClick={props.onClick}>
        <IconObj />
      </NextLink>
    </div>
  )
};

export default Icon;