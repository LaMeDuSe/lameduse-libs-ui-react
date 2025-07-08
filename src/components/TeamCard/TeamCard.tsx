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
        <Icon icon="LAMEDUSE" />
        </Link>}
        <Link href={`/contacts/${props.link_url}`} className="text-lameduse-primary/80  hover:text-lameduse-primary">
        <Icon icon="IDENTITY CARD" />
        </Link>
      </span>
    </div>
  )
};

export default TeamCard;