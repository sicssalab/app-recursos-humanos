import { DefaultTheme as DefaultThemeProps } from "styled-components";

export const Font = {
    GilroyLight: "Gilroy-Light",
    GilroyMedium: "Gilroy-Medium",
    GilroyBold: "Gilroy-Bold",
    GilroySemiBold: "Gilroy-SemiBold",
    GilroyExtraBold: "Gilroy-ExtraBold",
    GilroyRegular: "Gilroy-Regular",
}

export const DefaultConfigs = {
    typography: {
        fontFamily: {
            light: Font.GilroyLight,
            medium: Font.GilroyMedium,
            regular: Font.GilroyRegular,
            semiBold: Font.GilroySemiBold,
            bold: Font.GilroyBold,
            extraBold: Font.GilroyExtraBold,
        },
        sizes: {
            h1: {
                size: 38,
                lineHeight: 44,
            },
            h2: {
                size: 32,
                lineHeight: 36,
            },
            h3: {
                size: 24,
                lineHeight: 30,
            },
            xxl: {
                size: 20,
                lineHeight: 26,
            },
            large: {
                size: 18,
                lineHeight: 26,
            },
            regular: {
                size: 16,
                lineHeight: 18,
            },
            small: {
                size: 14,
                lineHeight: 20,
            },
        },
    },
};

//const DarkTheme DefaultThemeProps = {
export const DarkTheme = {
    ...DefaultConfigs,
    ...DefaultThemeProps,
    dark: true,
    colors: {
        primary: "#f5df4d",
        text: "#f2f2f2", //todo, textos genericos
        black: "red", //TODO no existe dentro de la gama de colores
        grey: "#bbb",
        background: "#f2f2f2",
        secondaryBackground: "#22252e",
        whiteBackground: "#f2f2f2",
        headerBackground: "#242526",
        topHeaderBackground: "#242526",
        inputBackground: "#f2f2f2", //inpts
        input: "#f2f2f2", //inpts
        border: "#3E4042", //contents
        borderSecondary: "#bbb", //inputs
        placeholder: "#bbb",
    },
    // h2: {
    //     fontsize: 20
    // },
    // h3: {
    //     fontsize: 18
    // },
    sizes: {
        h1: {
            size: 38,
            lineHeight: 44,
        },
        h2: {
            size: 32,
            lineHeight: 36,
        },
        h3: {
            size: 24,
            lineHeight: 30,
        },
        xxl: {
            size: 20,
            lineHeight: 26,
        },
        large: {
            size: 18,
            lineHeight: 26,
        },
        regular: {
            size: 16,
            lineHeight: 18,
        },
        small: {
            size: 14,
            lineHeight: 20,
        },
    },
    pallete: {
        common: {
            black: "#000",
            white: "#fff"
        },
        primary: {
            main: "#f5df4d",
            dark: "#21215e",
            light: "#41428e",
            contrasText: "#fff"
        },
        secondary: {
            main: "#1289a7",
            dark: "#0d1b2e",
            light: "#12cbc4",
            contrasText: "#fff"
        },
        error: {
            main: "#d32f2f",
            dark: "#ef5350",
            light: "#c62828",
            contrasText: "#fff"
        },
        warning: {
            main: "#ed6c02",
            dark: "#ff9800",
            light: "#e65100",
            contrasText: "#fff"
        },
        border: {
            main: "#3E4042",
            dark: "#0d1b2e",
            light: "#12cbc4",
            contrasText: "#fff"
        },
        background: {
            paper: "#111001",
            main: "#fff",
            dark: "#fff",
            light: "#fff"
        },
        buttonSubmit: {
            main: "#f5df4d",
            dark: "#21215e",
            light: "#41428e",
            contrasText: "#fff"
        },
    },
    shape: {
        borderRadius: 15,
        borderRadiusMain: 15,
        borderRadiusSmall: 15,
        borderRadiusBig: 15,
    }
};

//export const LightTheme: DefaultThemeProps = {
export const LightTheme = {
    ...DefaultConfigs,
    dark: false,
    colors: {
        primary: "#f5df4d",
        black: "#000",
        text: "#f2f2f2",
        grey: "#bbb",
        background: "#111001", // #18191A
        secondaryBackground: "#22252e",
        whiteBackground: "#f2f2f2",
        headerBackground: "#242526",
        topHeaderBackground: "#000",
        inputBackground: "#2222222",
        border: "#3E4042",
    },
};
export const DefaultTheme = LightTheme;

export const p = {
    fontSize: 16,
        color: '#fff',
}

// const theme = {
//     p: {
//         fontSize: 16,
//         color: '#fff',
//     }
// }
