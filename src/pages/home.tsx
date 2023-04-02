import { useState, lazy, Suspense, useContext } from "react";
import { useUser } from "@clerk/nextjs";
import {
	OrganizationContextProvider,
	OrganizationContext,
} from "../Contexts/OrganizationContext";
import OrganizationAside from "../components/organizationAside/OrganizationAside";
import Aside from "../components/aside/Aside";
import Main from "../components/main/Main";

export default function Home() {
	const [asideOpen, setAsideOpen] = useState<boolean>(false);
	const { user } = useUser();
	const userId: string = user?.id || "";

	// const data = trpc.getUserData.useQuery({userId});

	const handleAsideOpen = () => {
		setAsideOpen(!asideOpen);
	};

	const { organizationId } = useContext(OrganizationContext);

	

	return (
		<div className="w-full h-screen flex">
			<OrganizationContextProvider>
				<Suspense fallback={<div>Loading...</div>}>
					<OrganizationAside
						handleAsideOpen={handleAsideOpen}
						asideOpen={asideOpen}
					/>
					<Aside asideOpen={asideOpen} />
					<Main />
				</Suspense>
			</OrganizationContextProvider>
		</div>
	);
}

export interface IOrganizationProps {
	organizationId: string;
	setOrganizationId?: (id: string) => void;
}
