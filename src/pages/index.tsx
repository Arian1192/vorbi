import { useState } from "react";
import dbConnect from "../../lib/dbConnect";
import IUser from "../interfaces/IUser";
import Image from "next/image";
import { RedirectToSignIn } from "@clerk/nextjs";
import { useRouter } from "next/router";
import { trpc } from "../utils/trpc";

/**
 * {data} : {data: User[]} is a type anotation for typescript
 * Esto se llama una "anotación de tipo" y ayuda al compilador de TypeScript a verificar que se están pasando los tipos de datos correctos a la función o componente. Si se intenta pasar una propiedad "data" que no es un array de objetos "User", el compilador de TypeScript mostrará un error en el código.
 */
export default function Home() {
	const router = useRouter();

	const handleClick = () => {
		router.push("/sign-in");
	};

	return (
		<div className="w-full h-screen border-2 border-slate-800 flex flex-row gap-10 p-10">
			<button className="btn w-64" onClick={handleClick}>
				Go to Signin
			</button>
		</div>
	);
}

// export const getStaticProps = async () => {
// 	// await dbConnect();
// 	return {{}}
// };
