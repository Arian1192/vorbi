import React from "react";
import { SignIn } from "@clerk/nextjs";

const SigninComponent = () => {
	console.log("entro aqui");
	return (
		<div className="w-full h-screen flex justify-center items-center bg-base-current">
			<SignIn
				path="/sign-in"
				routing="path"
				appearance={{
					elements: {
						formButtonPrimary: "btn",
						footerActionLink: "text-primary",
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
			/>
		</div>
	);
};

export default SigninComponent;
