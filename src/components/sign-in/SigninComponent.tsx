import React from "react";
import { SignIn } from "@clerk/nextjs";

const SigninComponent = () => {
	console.log("entro aqui");
	return (
		<div className="w-full h-screen flex justify-center items-center bg-base-current">
			<div className="bg-gradient-to-br from-gray-700 via-gray-900 to-black w-[50%] max-lg:w-full max-sm:p-10  h-screen flex justify-center items-center">
				<SignIn
					path="/sign-in"
					routing="path"
					appearance={{
						elements: {
							formButtonPrimary: "btn",
							footerActionLink: "text-primary",
							rootBox: "w-[80vw] flex justify-center items-center",
						},
						layout: {
							termsPageUrl: "/terms",
							privacyPageUrl: "/privacy",
							socialButtonsPlacement: "bottom",
							socialButtonsVariant: "iconButton",
						},
						variables: {
							colorPrimary: "#1a202c",
						},
					}}
					redirectUrl="/home"
					signUpUrl="/sign-up"
				/>
			</div>
			<div className="w-[50%] max-sm:hidden h-screen  flex justify-center items-center p-10 max-lg:hidden 2xl:p-40 flex-col gap-5">
				<h1 className="text-6xl 2xl:text-7xl font-bold text-center">
					Habla sin límites con Vorbi: la app empresarial de mensajería
				</h1>
			</div>
		</div>
	);
};

export default SigninComponent;
