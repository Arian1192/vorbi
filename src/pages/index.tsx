import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
import dbConnect from "../../lib/dbConnect";
import IUser from "../interfaces/IUser";

/**
 * {data} : {data: User[]} is a type anotation for typescript
 * Esto se llama una "anotación de tipo" y ayuda al compilador de TypeScript a verificar que se están pasando los tipos de datos correctos a la función o componente. Si se intenta pasar una propiedad "data" que no es un array de objetos "User", el compilador de TypeScript mostrará un error en el código.
 */
export default function Home({ data }: { data: IUser[] }) {
	return (
		<>
			<h1 className={"text-2xl"}>{data[0].nickName}</h1>
		</>
	);
}

export const getStaticProps = async () => {
	await dbConnect();
	const response = await fetch("http://localhost:3000/api/user/getUsers");
	const data = await response.json();
	return {
		props: {
			data: data,
		},
	};
};
