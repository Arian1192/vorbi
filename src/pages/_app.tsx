import "@/styles/globals.css";
import { trpc } from "../utils/trpc";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { useRouter } from "next/router";
import type { AppProps } from "next/app";
import type { AppRouter } from "./api/server/routers/_app";
import { loggerLink } from "@trpc/client/links/loggerLink";
import { ClerkProvider } from "@clerk/nextjs";
import SigninComponent from "@/components/sign-in/SigninComponent";
import { httpBatchLink } from "@trpc/client/links/httpBatchLink";
import { wsLink, createWSClient } from "@trpc/client/links/wsLink";
import { withTRPC } from "@trpc/next";
import getConfig from "next/config";

const publicPages = ["/sign-in/[[...index]]", "/sign-up/[[...index]]", "/"];
const { publicRuntimeConfig } = getConfig();
const { APP_URL, WS_URL } = publicRuntimeConfig;

function App({ Component, pageProps }: AppProps) {
	const { pathname } = useRouter();

	const isPublicPage = publicPages.includes(pathname);

	return (
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
	);
}

function getEndingLink() {
	if (typeof window === "undefined") {
		return httpBatchLink({
			url: `${APP_URL}/api/trpc`,
			headers() {
				return {
					"Content-Type": "application/json",
					"Acess-Control-Allow-Origin": "*",
					"Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
					Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
				};
			},
		});
	}
	const client = createWSClient({
		url: WS_URL,
	});
	return wsLink<AppRouter>({
		client,
	});
}

export default withTRPC<AppRouter>({
	config() {
		return {
			links: [
				// adds pretty logs to your console in development and logs errors in production
				loggerLink({
					enabled: (opts) =>
						(process.env.NODE_ENV === "development" &&
							typeof window !== "undefined") ||
						(opts.direction === "down" && opts.result instanceof Error),
				}),
				getEndingLink(),
			],
		};
	},
})(App);
