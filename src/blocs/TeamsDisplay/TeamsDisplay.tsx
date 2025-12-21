import React, { useEffect } from "react";
import TeamCard, { TeamCardProps } from "../../components/TeamCard/TeamCard";


export interface TeamsDisplayProps {
  // FIXME: define team cards
  // array of team cards
  TeamCards: React.ReactNode[];

  onClick?: () => void;
}

const TeamsDisplay = (props: TeamsDisplayProps) => {
  // default values
  props = { ...props }; // copy to avoid modifying the original object

  return (
    <div>
      <h1 className="sm:text-3xl text-2xl text-center mb-2 text-lameduse-primary">
        Our amazing team
      </h1>
      <p className="w-full text-center leading-relaxed mb-8 text-gray-500">
        Our incredible team that is working hard to provide you with the best
        services.
      </p>
      <div className="flex flex-wrap justify-center ">
        {props.TeamCards.map((card, index) => (
          <div>{card}</div>
        ))}
      </div>
    </div>
  )
};

export default TeamsDisplay;