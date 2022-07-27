import { extendTheme, theme as base} from "@chakra-ui/react";

const config = {
    initialColorMode: 'light',
    useSystemColorMode: false,
  }

const theme = extendTheme({
    fonts: {
        ...base.fonts,
        heading: `Montserrat`,
        body: `Inter`
    },
    config
})

export default theme;