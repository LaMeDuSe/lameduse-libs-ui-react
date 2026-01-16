import Icon, { IconProps } from "../Icon/Icon";
import React from "react";


export interface IconTextProps {
    icon: IconProps;
    text?: string;
    className?: string;
    position?: "left" | "right" | "center";
}

const IconText = (props: IconTextProps) => {
    // default values
    props = { ...props }; // copy to avoid modifying the original object
    props.position = props.position || "left";

    const position_class = {
        left:"flex flex-row justify-items-start items-center ",
        right:"flex flex-row-reverse justify-items-end items-center",
        center:"flex flex-row justify-center items-center"
    }[props.position];

    return (
        <div className={`${position_class} items-end`}>
            <Icon {...props.icon} />
            <p className={`${props.className} px-2`}>{props.text ?? ""}</p>
        </div>
    )
}

export default IconText;