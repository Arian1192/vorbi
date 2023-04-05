import "@/styles/globals.css";
import { trpc } from "../utils/trpc";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { useRouter } from "next/router";
import type { AppProps } from "next/app";
import { ClerkProvider } from "@clerk/nextjs";
import SigninComponent from "@/components/sign-in/SigninComponent";

import getConfig from "next/config";
import { SocketContextProvider } from "@/Contexts/SocketIoContext";

const publicPages = ["/sign-in/[[...index]]", "/sign-up/[[...index]]", "/"];
const { publicRuntimeConfig } = getConfig();

function App({ Component, pageProps }: AppProps) {
	const { pathname } = useRouter();

	const isPublicPage = publicPages.includes(pathname);

	return (
		<SocketContextProvider>
			<ClerkProvider {...pageProps}>
				{isPublicPage ? (
					<Component {...pageProps} />
				) : (
					<>
						<SignedIn>
							<Component {...pageProps} />
						</SignedIn>
						<SignedOut>
							<SigninComponent />
						</SignedOut>
					</>
				)}
			</ClerkProvider>
		</SocketContextProvider>
	);
}

export default trpc.withTRPC(App);
