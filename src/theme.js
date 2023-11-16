import { extendTheme } from "@chakra-ui/react";

export const Theme = extendTheme({
  styles: {
    global: () => ({
      body: {
        backgroundColor: "#040305",
        fontFamily: "Inter",
        color: "#fff",
        overflowX: "hidden",
      },
    }),
  },
});
