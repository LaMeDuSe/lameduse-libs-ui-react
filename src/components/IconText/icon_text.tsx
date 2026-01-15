import Icon, { IconProps } from "../Icon/Icon";
import React from "react";


export interface IconTextProps {
    icon: IconProps;
    text?: string;
    className?: string;
    position?: "left" | "right" | "center";
}

export const IconText = (props: IconTextProps) => {
    // default values
    props = { ...props }; // copy to avoid modifying the original object
    props.position = props.position || "left";

    const position_class = {
        left:"flex flex-row justify-items-start",
        right:"flex flex-row-reverse justify-items-end",
        center:"flex flex-row justify-center"
    }[props.position];

    return (
        <div className={`${position_class}`}>
            <Icon {...props.icon} />
            <p className={`${props.className ?? ""}`}>{props.text ?? ""}</p>
        </div>
    )
}
