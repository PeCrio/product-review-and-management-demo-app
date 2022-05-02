import { ChakraProvider } from "@chakra-ui/react";
import { AppProps } from "next/app";
import axios from "axios";
import theme from "theme";
axios.defaults.baseURL = process.env.API_URL;

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<ChakraProvider resetCSS theme={theme}>
			<Component {...pageProps} />
		</ChakraProvider>
	);
}

export default MyApp;
