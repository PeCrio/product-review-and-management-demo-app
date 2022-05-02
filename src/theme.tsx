import { extendTheme } from "@chakra-ui/react";

const fonts = {
	heading: "sans-serif",
	body: "sans-serif",
};

const theme = extendTheme({
	colors: {
		brand: {
			secondary: "#FFFFC8",
			primary: {
				50: "#dbfefe",
				100: "#b6f4f6",
				200: "#99f0f3",
				300: "#b6f4f6",
				400: "#8deaed",
				500: "#6be0e6",
				600: "#3bd7de",
				700: "#026a6e",
				800: "#004043",
				900: "#001719",
			},
		},
	},
	fonts,
});

export default theme;
