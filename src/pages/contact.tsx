import dbConnect from "../../lib/dbConnect";

interface IJsonplaceholder {
	id: number;
	name: string;
	username: string;
	email: string;
	address: {
		street: string;
		suite: string;
		city: string;
		zipcode: string;
		geo: {
			lat: string;
			lng: string;
		};
	};
	phone: string;
	website: string;
	company: {
		name: string;
		catchPhrase: string;
		bs: string;
	};
}

export default function Contact({ data }: { data: IJsonplaceholder[] }) {
	return (
		<>
			{data.map((user) => {
				return <h1>{user.name}</h1>;
			})}
		</>
	);
}

export const getStaticProps = async () => {
	await dbConnect();
	const response = await fetch("http://jsonplaceholder.typicode.com/users");
	const data = await response.json();
	return {
		props: {
			data: data,
		},
	};
};
