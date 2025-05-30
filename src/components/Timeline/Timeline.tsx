import React from "react";

type ContentType = {
  year: string;
  content: string;
}

export interface TimelineProps {
  year: string;
  content: string;
  contents: ContentType[];
  onClick?: () => void;
}

const Timeline = (props: TimelineProps) => {
  // default values
  props = { ...props }; // copy to avoid modifying the original object
  props.year = props.year || "0";
  props.content = props.content;

  return (
    <div className="container px-5 py-24 mx-auto flex flex-wrap">
      <div className="flex relative pt-10 pb-20 sm:items-center md:w-2/3 mx-auto">
        <div className="h-full w-6 absolute inset-0 flex items-center justify-center">
          <div className="h-full w-1 bg-gray-200 pointer-events-none"></div>
        </div>
        <div className="flex-shrink-0 w-6 h-6 rounded-full mt-10 sm:mt-0 inline-flex items-center justify-center bg-lameduse-primary text-lameduse-white relative z-10 title-font font-medium text-sm"></div>
        <div className="flex-grow sm:pl-6 mt-6 sm:mt-0">
          <h2 className="font-medium title-font text-gray-900 mb-1 text-xl">{props.year}</h2>
          <p className="leading-relaxed">{props.content}</p>
        </div>
      </div>
      <div className="flex relative pb-20 sm:items-center md:w-2/3 mx-auto">
        <div className="h-full w-6 absolute inset-0 flex items-center justify-center">
          <div className="h-full w-1 bg-gray-200 pointer-events-none"></div>
        </div>
        <div className="flex-shrink-0 w-6 h-6 rounded-full mt-10 sm:mt-0 inline-flex items-center justify-center bg-lameduse-primary text-lameduse-white relative z-10 title-font font-medium text-sm"></div>
        <div className="flex-grow sm:pl-6 mt-6 sm:mt-0">
          <h2 className="font-medium title-font text-gray-900 mb-1 text-xl">{props.year}</h2>
          <p className="leading-relaxed">{props.content}</p>
        </div>
      </div>
      <div className="flex relative pb-20 sm:items-center md:w-2/3 mx-auto">
        <div className="h-full w-6 absolute inset-0 flex items-center justify-center">
          <div className="h-full w-1 bg-gray-200 pointer-events-none"></div>
        </div>
        <div className="flex-shrink-0 w-6 h-6 rounded-full mt-10 sm:mt-0 inline-flex items-center justify-center bg-lameduse-primary text-lameduse-white relative z-10 title-font font-medium text-sm"></div>
        <div className="flex-grow sm:pl-6 mt-6 sm:mt-0">
          <h2 className="font-medium title-font text-gray-900 mb-1 text-xl">{props.year}</h2>
          <p className="leading-relaxed">{props.content}</p>
        </div>
      </div>
    </div>
  )
};

export default Timeline;