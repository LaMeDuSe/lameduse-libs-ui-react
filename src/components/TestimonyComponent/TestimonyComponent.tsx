import React from "react";

export interface TestimonyComponentProps {
  text: string;
}

const TestimonyComponent = ({ text }: TestimonyComponentProps) => {
  return (
    <div className="flex flex-col items-center text-center max-w-3xl mx-auto px-4 py-10">
      <div className="text-[64px] text-blue-900 font-bold mb-6 leading-none">
        ”</div>

      <p className="text-lg text-gray-600 leading-relaxed">
        {text}
      </p>

      <div className="h-1 w-12 bg-blue-900 mt-6 rounded-full" />
    </div>
  );
};

export default TestimonyComponent;
