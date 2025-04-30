import { CalendarDaysIcon } from "@heroicons/react/24/solid";
import React from "react";


/**
 * @prop {string} name - The name of the contact option
 * @prop {string} first_line - first line of the description tell what the contact opiton is
 * @prop {string} second_line - second line of the description tell what the are days available
 * @prop {string} third_line - third line of the description tell what the are times available
 * @prop {string} link - the link to the contact option
 */
export interface ContactCardProps {
  name: string;
  first_line: string;
  second_line: string;
  third_line: string;
  link_url: string;
  link_text: string;
  Icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
}

const ContactCard = (props: ContactCardProps) => {
  // default values
  props = { ...props }; // copy to avoid modifying the original object

  
  return (
    <div className="p-4 lg:w-1/2 w-full">
      <div className="flex border-2 rounded-lg border-gray-200 border-opacity-50 p-8 sm:flex-row flex-col">
        <div className="w-16 h-16 sm:mr-8 sm:mb-0 mb-4 inline-flex items-center justify-center rounded-full bg-lameduse-primary/20 text-lameduse-primary flex-shrink-0">
          <props.Icon className="w-10 h-10" />
        </div>
        <div className="flex-grow">
          <h2 className="text-gray-900 text-lg title-font font-medium mb-3">{props.name}</h2>
          <p className="leading-relaxed text-base">{props.first_line}</p>
          <p className="leading-relaxed text-base">{props.second_line}</p>
          <p className="leading-relaxed text-base">{props.third_line}</p>
          <a className="mt-3 text-lameduse-primary inline-flex items-center" href={props.link_url}>{props.link_text}
            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
          </a>
        </div>
      </div>
    </div>
  )
};

export default ContactCard;