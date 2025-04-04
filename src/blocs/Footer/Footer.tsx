import React from "react";
import Image from "next/image";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import NextLink from "next/link";
import Link from "../../components/Link"

/*
FIXME: Year is static should not be hardcoded
FIXME: Company id number type should be a string
FIXME: Better support for non provided fields
*/

export interface FooterCompanyInfosProps {
  name: string;
  id_number?: string;
  email?: string;
  phone?: string;
  description?: string;
  address?: string;
  logo: StaticImport | string;
  logo_size?: {
    width: number;
    height: number;
  }
}

export interface FooterLinkProps {
  href: string
  label: string
}

export interface FooterLinksProps {
  title: string
  links: FooterLinkProps[]
}

export interface FooterProps {
  companyInfos: FooterCompanyInfosProps
  links: FooterLinksProps[]
}

const Footer = (props: FooterProps) => {
  // default values
  props = { ...props }; // copy to avoid modifying the original object

  props.companyInfos.logo_size = props.companyInfos.logo_size || { width: 192, height: 64 };
  return (
    <footer className="text-gray-600 body-font w-full">
      <div className="container px-5 py-24 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
        <div className="w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left">
          <div className="justify-self-start flex flex-row items-center md:justify-start justify-center">
            <NextLink className="shrink-0" href="/">
              <Image
                src={props.companyInfos.logo}
                className={`w-[${props.companyInfos.logo_size.width}px] h-[${props.companyInfos.logo_size.height}px]`}
                alt="Logo"
                width={props.companyInfos.logo_size.width}
                height={props.companyInfos.logo_size.height}
              />
            </NextLink>
          </div>
          <p className="mt-2 text-sm text-gray-500">{props.companyInfos.description}</p>
          <p className="mt-2 text-sm text-gray-500">{props.companyInfos.email}</p>
          <p className="mt-2 text-sm text-gray-500">{props.companyInfos.phone}</p>
        </div>
        <div className="flex-grow flex flex-wrap md:pl-20 -mb-10 md:mt-0 mt-10 md:text-left text-center">
          {props.links.map((linkGroup, index) => (
            <div key={index} className="lg:w-1/4 md:w-1/2 w-full px-4">
              <h2 className="text-lameduse-primary tracking-widest text-lg mb-3">{linkGroup.title}</h2>
              <nav className="list-none mb-10">
                {linkGroup.links.map((link, index) => (
                  <li>
                    <NextLink key={index} className="text-gray-600 hover:text-lameduse-primary text-base" href={link.href}>{link.label}</NextLink>
                  </li>
                ))}
              </nav>
            </div>)
          )}
        </div>
      </div>
      <div className="bg-gray-100">
        <div className="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
          <p className="text-gray-500 text-sm text-center sm:text-left">
            {`© 2025 - ${props.companyInfos.name} — ${props.companyInfos.address} — SIREN : ${props.companyInfos.id_number}`}
          </p>
          <span className="inline-flex sm:ml-auto sm:mt-0 mt-2 justify-center sm:justify-start">
            <NextLink href="https://twitter.com/lamedusegroup" className="ml-3 text-gray-500 hover:text-lameduse-primary">
              <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
              </svg>
            </NextLink>
            <NextLink href="https://www.linkedin.com/company/lameduse" className="ml-3 text-gray-500 hover:text-lameduse-primary">
              <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0" className="w-5 h-5" viewBox="0 0 24 24">
                <path stroke="none" d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"></path>
                <circle cx="4" cy="4" r="2" stroke="none"></circle>
              </svg>
            </NextLink>
          </span>
        </div>
      </div>
    </footer>
  )
};

export default Footer;