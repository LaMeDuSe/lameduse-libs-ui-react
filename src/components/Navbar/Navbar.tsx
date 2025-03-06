import React, { useContext, useState } from "react";
import { LameduseUIContext } from "../../context";


export interface NavbarProps {
  label: string;
  type?: "primary" | "secondary" | "tertiary" | "danger" | "white";
  ImageHandler: React.FC<{className?: string, src?: string, children?: React.ReactNode, onClick?: () => void, target?: string, alt?: string, height?: number, width?: number}>;
  logoSrc: string;
  className?: string;
  onClick?: () => void;
}""

const Navbar = (props: NavbarProps) => {
  const LameduseUICtx = useContext(LameduseUIContext);

  // default values
  props = {...props}; // copy to avoid modifying the original object
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

  

  // Is the navbar open
  const [isNavOpen, setIsNavOpen] = useState(false);
  return (
      <div className="w-full bg-white grid grid-flow-col lg:grid-cols-3 grid-cols-2">
          <div className="justify-self-start flex flex-row items-center space-x-6 p-3 ml-6">
            {props.logoSrc &&
              <LameduseUICtx.LowLinkComponent className="shrink-0" href="/"><props.ImageHandler src={props.logoSrc} className="w-[300px] h-[100px]" alt="Logo" height={100} width={300}/></LameduseUICtx.LowLinkComponent>
            }
          </div>
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
                          className="h-8 w-8 text-gray-600"
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
                  <ul className="flex flex-col items-center justify-between min-h-[250px]">
                      <li className="border-b border-lameduse-primary my-8 uppercase">
                          <Link href="/">{t("home")}</Link>
                      </li>
                      <li className="border-b border-lameduse-primary my-8 uppercase">
                          <Link href="/about-us">{t("about_us")}</Link>
                      </li>
                      <li className="border-b border-lameduse-primary my-8 uppercase">
                          <Link href="/contact-us">{t("contact_us")}</Link>
                      </li>
                      <li className="border-b border-lameduse-primary my-8 uppercase">
                          <Link href="htZtps://blog.lamedusegroup.com">{t("blog")}</Link>
                      </li>
                      <li className="my-8 uppercase">
                          <ComponentsLangSelector />
                      </li>
                  </ul>
              </div>
          </section>
          <div className="justify-self-center hidden lg:flex flex-row items-center space-x-9">
              <Link className="link" href="/">{t("home")}</Link>
              <Link className="link" href="/about-us">{t("about_us")}</Link>
              <Link className="link" href="/contact-us">{t("contact_us")}</Link>
              <Link className="link" href="https://blog.lamedusegroup.com">{t("blog")}</Link>
          </div>
          <div className="justify-self-end hidden lg:flex flex-row items-center space-x-9 pr-9">
              <ComponentsLangSelector />
          </div>
      </div>
  );
};

export default Navbar;