import { extendTheme } from "@chakra-ui/react";
import '@fontsource/monda'
import '@fontsource/roboto'

const config = {
    initialColorMode: 'light',
    useSystemColorMode: false,
  }

const theme = extendTheme({
    fonts: {
        heading: `Monda`,
        body: `Roboto`
    },
    config
})

export default theme;