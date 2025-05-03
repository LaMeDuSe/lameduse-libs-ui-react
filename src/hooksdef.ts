import { Hook, UIConfig } from "./defaults";

export const blocsfullclass : Hook = {
    name: "blocsfullclass",
    priority: 0,
    hook: (config: UIConfig) => {
        blocsfullclass.result = `${config.blocs.marginX} ${config.blocs.marginY} ${config.blocs.paddingX} ${config.blocs.paddingY}`;
    },
    result: ""
}