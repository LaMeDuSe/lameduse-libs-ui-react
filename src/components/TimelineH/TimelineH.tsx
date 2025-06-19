import React from "react";

export type TimelineHProps = {
  elements: {
    title: string;
    content: string;
    year: string;
  }[];
};

const TimelineH = (props: TimelineHProps) => {
  // default values
  props = { ...props }; // copy to avoid modifying the original object

  return (
    <div className="container px-5 py-24 mx-auto">
      <div className="flex items-start relative px-5">
        {/* Ligne */}
        <div className="absolute top-3 left-0 right-0 h-1 bg-gray-200 z-0" />
        {props.elements.map((value, index) => (
          <div
            key={index}
            className="relative flex flex-col items-center text-center flex-1 z-10"
          >
            {/* Point */}
            <div className="w-6 h-6 rounded-full bg-lameduse-primary text-lameduse-white flex items-center justify-center text-sm font-medium mb-4 relative z-10"></div>
            {/* Contenu */}
              <h2 className="font-medium title-font text-black mb-1 text-xl">
                {value.year}
              </h2>
              <h1 className="font-semibold title-font text-lameduse-black mb-1 text-2xl">
                {value.title}
              </h1>
              <p className="leading-relaxed">{value.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TimelineH;
