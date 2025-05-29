import React, { useEffect } from "react";
import CardOne, { CardOneProps } from "../../components/CardOne/CardOne";


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
      <div className="flex flex-wrap justify-center ">
        {props.TeamCards.map((card, index) => (
          <div>
            {card}
          </div>
        ))}
      </div>
    </div>
  )
};

export default TeamsDisplay;