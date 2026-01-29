import React from "react";

export type TimelineVProps = {
  elements: {
    title: string;
    content: string;
    date: string;
  }[];
};

const TimelineV = (props: TimelineVProps) => {
  // default values
  props = { ...props }; // copy to avoid modifying the original object

  return (
    <div className="container px-5 py-24 mx-auto flex flex-wrap">
      {props.elements.map((value, index) => (
        <div
          key={index}
          className="flex relative pt-10 pb-20 sm:items-center md:w-2/3 mx-auto"
        >
          {/* Ligne */}
          <div className="h-full w-6 absolute inset-0 flex items-center justify-center">
            <div className="h-full w-1 bg-gray-200 pointer-events-none"></div>
          </div>
          {/* Point */}
          <div className="flex-shrink-0 w-6 h-6 rounded-full mt-10 sm:mt-0 inline-flex items-center justify-center bg-lameduse-primary text-lameduse-white relative z-10 title-font font-medium text-sm"></div>
          {/* Contenu */}
          <div className="flex-grow sm:pl-6 mt-6 sm:mt-0 w-[400px]">
            <h2 className="font-medium title-font text-black mb-1 text-xl">
              {value.date}
            </h2>
            <h1 className="font-semibold title-font text-lameduse-black mb-1 text-2xl">
              {value.title}
            </h1>
            <p className="leading-relaxed">{value.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TimelineV;
