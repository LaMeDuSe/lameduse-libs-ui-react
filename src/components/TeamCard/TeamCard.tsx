import React from "react";
import Image from "next/image";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import NextLink from "next/link";
import Link from "../Link/Link";
import Icon from "../Icon/Icon";


export interface TeamCardProps {
  link_url: string;
  firstname: string;
  lastname: string;
  image: string | StaticImport;
  title: string;
  email: string;
  url_linkedin: string;
  url_blog: string;
  onClick?: () => void;
}

const TeamCard = (props: TeamCardProps) => {
  // default values
  props = { ...props }; // copy to avoid modifying the original object

  return (
    <div className="p-4 h-full flex flex-col items-center text-center">
      <Link href={`/contacts/${props.link_url}`} className="no-underline">
        <Image alt={props.firstname+' '+props.lastname} className="flex-shrink-0 h-56 w-56 object-cover object-center mb-4 rounded-full" src={props.image} height={224} width={224} />
        <h2 className=" text-lg text-gray-900">{props.firstname} {" "} {props.lastname}</h2>
        <h3 className="text-lameduse-primary mb-2">{props.title}</h3>
      </Link>
      {props.email && <a href={`mailto:${props.email}`} className="text-lameduse-primary/80 hover:text-lameduse-primary block mb-3">{props.email}</a>}
      <span className="inline-flex align-middle justify-between space-x-1">
        {props.url_linkedin && <Link href={props.url_linkedin} className="text-lameduse-primary/80  hover:text-lameduse-primary">
        <Icon icon="LINKEDIN" />
        </Link>}
        {props.url_blog && <Link href={props.url_blog} className="grayscale-50 hover:grayscale-0">
          <Image src="https://assets.lameduse.net/logo/lameduse_logo_grad.webp" alt="LaMeDuSe blog link" height={24} width={24} className="w-6 h-6" />
        </Link>}
        <Link href={`/contacts/${props.link_url}`} className="text-lameduse-primary/80  hover:text-lameduse-primary">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Zm6-10.125a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0Zm1.294 6.336a6.721 6.721 0 0 1-3.17.789 6.721 6.721 0 0 1-3.168-.789 3.376 3.376 0 0 1 6.338 0Z" />
          </svg>
        </Link>
      </span>
    </div>
  )
};

export default TeamCard;