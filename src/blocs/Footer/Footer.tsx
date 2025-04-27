import React from "react";
import Image from "next/image";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import NextLink from "next/link";
import Link from "../../components/Link"
import Icon from "../../components/Icon";

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
  icons?: {
    twitter?: string;
    linkedin?: string;
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
          <span className="inline-flex sm:ml-auto sm:mt-0 mt-2 justify-center sm:justify-start gap-2">
            {props.companyInfos.icons?.twitter && (
                <Icon icon="TWITTER" href={props.companyInfos.icons.twitter}/>
              )
            }
            {props.companyInfos.icons?.linkedin && (
                <Icon icon="LINKEDIN" href={props.companyInfos.icons.linkedin}/>
              )
            }
          </span>
        </div>
      </div>
    </footer>
  )
};

export default Footer;