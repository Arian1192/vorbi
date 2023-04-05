import dbConnect from "../../lib/dbConnect";
import { useRouter } from "next/router";
import io from "socket.io-client";
import {useEffect} from "react";

let socket: any;

export default function Home() {
	const router = useRouter();

	// const socketInit = async () =>{
	// 	await fetch("/api/socket")
	// 	socket = io()
	// 	socket.on('connect', ()=>{
	// 		console.log('connected')
	// 	})
	// 	return socket
	// }

	// useEffect(()=> {
	// 	socketInit()
	// }, [])

	const handleClick = () => {
		router.push("/sign-in");
	};

	return (
		<div className="w-full h-screen border-2 border-slate-800 flex flex-row gap-10 p-10">
			<button className="btn w-64" onClick={handleClick}>
				Go to Signing
			</button>
		</div>
	);
}

// export const getStaticProps = async () => {
// 	// await dbConnect();
// 	return {{}}
// };
