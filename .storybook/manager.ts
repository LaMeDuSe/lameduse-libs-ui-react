import { version } from "../package.json"
import { addons } from 'storybook/manager-api'
import { create } from 'storybook/theming'

addons.setConfig({
    theme: create({
        base: "light",
        brandTitle: `Components v.${version}`,

        brandImage: `https://assets.lameduse.net/logo/lameduse_technology_logo_grad_text_primary_bg_none.webp`,
        brandTarget: "_blank",
        brandUrl: "https://lamedusegroup.com",

        //
        colorPrimary: '#1B1464',
        colorSecondary: '#0080E2',

        // UI
        appBg: '#ffffff',
        appContentBg: '#ffffff',
        appPreviewBg: '#ffffff',
        appBorderColor: '#1B1464',
        appBorderRadius: 4,

        // Text colors
        textColor: '#1B1464',
        textInverseColor: '#ffffff',

        // Toolbar default and active colors
        barTextColor: '#1B1464',
        barSelectedColor: '#1B1464',
        barHoverColor: '#1B1464',
        barBg: '#ffffff',

        // Form colors
        inputBg: '#ffffff',
        inputBorder: '#1B1464',
        inputTextColor: '#1B1464',
        inputBorderRadius: 2,
    })
})