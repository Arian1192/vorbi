import { useState, lazy, Suspense } from "react";
import { trpc } from "@/utils/trpc";
import { useUser } from "@clerk/nextjs";
const OrganizationAside = lazy(() => import("../components/organizationAside/OrganizationAside"));
const Aside = lazy(() => import("../components/aside/Aside"));
const Main = lazy(() => import("../components/main/Main"));


export default function Home() {
	const [asideOpen, setAsideOpen] = useState(false);
	const { user } = useUser();
	const userId = user?.id || "";

	// const data = trpc.getUserData.useQuery({userId});

	const handleAsideOpen = () => {
		setAsideOpen(!asideOpen);
	};

	return (
		<div className="w-full h-screen flex">
			<Suspense>
				<OrganizationAside
					handleAsideOpen={handleAsideOpen}
					asideOpen={asideOpen}
				/>
				<Aside asideOpen={asideOpen} />
				<Main />
			</Suspense>
		</div>
	);
}
