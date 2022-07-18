import { extendTheme, theme as base} from "@chakra-ui/react";

const theme = extendTheme({
    fonts: {
        ...base.fonts,
        heading: `Montserrat`,
        body: `'Inter'`
    }
})

export default theme;