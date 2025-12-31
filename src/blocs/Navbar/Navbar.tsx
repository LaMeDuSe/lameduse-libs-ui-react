import React, { useContext, useState } from "react";
import NextLinkImport from "next/link";
import ImageImport from "next/image";
import Link from "../../components/Link";

// Handle ESM/CJS interop for Next.js components    
const NextLink = (NextLinkImport as any).default || NextLinkImport;
const Image = (ImageImport as any).default || ImageImport;

export interface INavbarProps {
    type?: "primary" | "secondary" | "tertiary" | "danger" | "white";
    className?: string;
    NavItems: INavItemType[];
}

export interface INavItemBase {
    type: "link" | "dropdown" | "logo" | "custom";
    label: string; // Used as alt text for images
    position: "left" | "right" | "center";
}

export interface INavItemLink extends INavItemBase {
    type: "link";
    href: string;
}

export interface INavItemDropdown extends INavItemBase {
    type: "dropdown";
    items: INavItemLink[];
}

export interface INavItemLogo extends INavItemBase {
    type: "logo";
    src: string;
    href?: string;
    allowed_display: ("mobile" | "mobile-outside" | "desktop")[];
    // @default 100
    height?: number;
    // @default 300
    width?: number;
}

export interface INavItemCustom extends INavItemBase {
    type: "custom";
    component: React.FC;
}

export type INavItemType = INavItemLink | INavItemDropdown | INavItemLogo | INavItemCustom;

export interface INavLinkProps {
    config: INavItemLink;
    className?: string;
    wrapClassName?: string;
}

const NavLink = (props: INavLinkProps) => {
    return (
        <div className={`${(props.wrapClassName || "")} ${props.className || ""}`}>
            <Link nowrap style="text" text_style="bold" size="medium" form="underline-hover" href={props.config.href}> {props.config.label}</Link>
        </div>
    );
}

export interface INavDropdownProps {
    config: INavItemDropdown;
    className?: string;
    wrapClassName?: string;
}

const NavItemDropdown = (props: INavDropdownProps) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    return (
        <div className={`${(props.wrapClassName || "")}`}>
            <Link style="text" text_style="bold" size="medium" form="underline-hover" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>{props.config.label}</Link>
            <div className="relative center">
                <ul className={(isDropdownOpen ? "block" : "hidden") + " absolute z-10 bg-white shadow-lameduse-primary rounded-lg shadow-sm"}>
                    <div className="p-4 space-y-2 justify-center items-center">
                        {props.config.items.map((item, index) => {
                            return <NavLink key={index} config={item} className="p-2 w-full" />
                        })}
                    </div>
                </ul>
            </div>
        </div>
    );
}

export interface INavLogoProps {
    config: INavItemLogo;
    className?: string;
    wrapClassName?: string;
}

const NavItemLogo = (props: INavLogoProps) => {
    let height = props.config.height ?? 100;
    let width = props.config.width ?? 300;
    return (
        <div className={`${(props.wrapClassName || "")}`}>
            <NextLink href={props.config.href ?? "#"}>
                <Image src={props.config.src} alt={props.config.label} className={`w-[${width}px] h-[${height}px]`} height={height} width={width} />
            </NextLink>
        </div>
    );
}

export interface INavCustomProps {
    config: INavItemCustom;
    wrapClassName?: string;
}

const NavItemCustom = (props: INavCustomProps) => {
    return (
        <div className={`${(props.wrapClassName || "")}`}>
            <props.config.component />
        </div>
    );
}

const Navbar = (props: INavbarProps) => {
    // default values
    props = { ...props }; // copy to avoid modifying the original object
    props.type = props.type || "primary";
    props.className = props.className || "";

    // classes
    let text_color_class = {
        "primary": "text-lameduse-primary",
        "secondary": "text-lameduse-secondary",
        "tertiary": "text-lameduse-tertiary",
        "danger": "text-lameduse-red",
        "white": "text-white"
    }[props.type];
    let bg_color_class = {
        "primary": "bg-lameduse-primary",
        "secondary": "bg-lameduse-secondary",
        "tertiary": "bg-lameduse-tertiary",
        "danger": "bg-lameduse-red",
        "white": "bg-white"
    }[props.type];

    let wrapClassName = "lg:px-0 p-2";

    // Is the navbar open
    const [isNavOpen, setIsNavOpen] = useState(false);
    return (
        <div className="w-full bg-white grid grid-flow-col lg:grid-cols-3 grid-cols-2">
            {/* Desktop start Navbar */}
            <div className="justify-self-start hidden lg:flex flex-row items-center space-x-6 p-3 ml-6">
                {props.NavItems.filter((v) => v.position == "left").map((item, key) => {
                    switch (item.type) {
                        case "link":
                            return <NavLink key={key} config={item} wrapClassName={wrapClassName}/>;
                        case "dropdown":
                            return <NavItemDropdown key={key} config={item} wrapClassName={wrapClassName}/>;
                        case "logo":
                            return item.allowed_display.includes("desktop") && <NavItemLogo key={key} config={item} wrapClassName={wrapClassName} />;
                        case "custom":
                            return <NavItemCustom key={key} config={item} wrapClassName={wrapClassName} />;
                    }
                })
                }
            </div>
            {/* Mobile start Navbar */}
            <div className="justify-self-start flex lg:hidden flex-row items-center space-x-6 p-3 ml-6">
                {props.NavItems.filter((v) => v.position == "left").map((item, key) => {
                    switch (item.type) {
                        case "link":
                            return <NavLink key={key} config={item} wrapClassName={wrapClassName} />;
                        case "dropdown":
                            return <NavItemDropdown key={key} config={item} wrapClassName={wrapClassName} />;
                        case "logo":
                            return item.allowed_display.includes("mobile-outside") && <NavItemLogo key={key} config={item} wrapClassName={wrapClassName} />;
                        case "custom":
                            return <NavItemCustom key={key} config={item} wrapClassName={wrapClassName} />;
                    }
                })
                }
            </div>
            {/* Mobile menu Navbar */}
            <section className="flex lg:hidden p-3 ml-auto justify-center items-center mr-6">
                <div
                    className="space-y-2"
                    onClick={() => setIsNavOpen((prev) => !prev)}
                >
                    <span className="block h-0.5 w-8 bg-lameduse-primary"></span>
                    <span className="block h-0.5 w-8 bg-lameduse-primary"></span>
                    <span className="block h-0.5 w-8 bg-lameduse-primary"></span>
                </div>

                <div className={isNavOpen ? "top-0 left-0 absolute h-[100vh] w-full z-50 flex flex-col bg-white" : "hidden"}>
                    <div
                        className="absolute top-0 right-0 px-8 py-8"
                        onClick={() => setIsNavOpen(false)}
                    >
                        <svg
                            className="h-8 w-8 text-lameduse-primary"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </div>
                    <ul className="flex flex-col items-center justify-between space-y-3 min-h-[250px]">
                        {props.NavItems.map((item, key) => {
                            switch (item.type) {
                                case "link":
                                    return <NavLink key={key} config={item} wrapClassName={wrapClassName} />;
                                case "dropdown":
                                    return <NavItemDropdown key={key} config={item} wrapClassName={wrapClassName} />;
                                case "logo":
                                    return item.allowed_display.includes("mobile") && <NavItemLogo key={key} config={item} wrapClassName={wrapClassName} />;
                                case "custom":
                                    return <NavItemCustom key={key} config={item} wrapClassName={wrapClassName} />;
                            }
                        })
                        }
                    </ul>
                </div>
            </section>
            {/* Desktop center Navbar */}
            <div className="justify-self-center hidden lg:flex flex-row items-center space-x-9">
                {props.NavItems.filter((v) => v.position == "center").map((item, key) => {
                    switch (item.type) {
                        case "link":
                            return <NavLink key={key} config={item} wrapClassName={wrapClassName} />;
                        case "dropdown":
                            return <NavItemDropdown key={key} config={item} wrapClassName={wrapClassName} />;
                        case "logo":
                            return item.allowed_display.includes("desktop") && <NavItemLogo key={key} config={item} wrapClassName={wrapClassName} />;
                        case "custom":
                            return <NavItemCustom key={key} config={item} wrapClassName={wrapClassName} />;
                    }
                })
                }
            </div>
            {/* Desktop end Navbar */}
            <div className="justify-self-end hidden lg:flex flex-row items-center space-x-9 pr-9">
                {props.NavItems.filter((v) => v.position == "right").map((item, key) => {
                    switch (item.type) {
                        case "link":
                            return <NavLink key={key} config={item} wrapClassName={wrapClassName} />;
                        case "dropdown":
                            return <NavItemDropdown key={key} config={item} wrapClassName={wrapClassName} />;
                        case "logo":
                            return item.allowed_display.includes("desktop") && <NavItemLogo key={key} config={item} wrapClassName={wrapClassName} />;
                        case "custom":
                            return <NavItemCustom key={key} config={item} wrapClassName={wrapClassName} />;
                    }
                })
                }
            </div>
        </div>
    );
};

export default Navbar;