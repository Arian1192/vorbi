import { useOrganizationList } from "@clerk/nextjs";
import Link from "next/link";
import { useContext, useState, useEffect } from "react";
import OrganizationContext from "@/Contexts/OrganizationContext";
import { trpc } from "@/utils/trpc";
import { useUser } from "@clerk/nextjs";

const OrganizationList = () => {
	const { organizationList, isLoaded } = useOrganizationList();
	const { setOrganizationId, organizationId } = useContext(OrganizationContext);
	const [data, setData] = useState<any>(null);
	if (!isLoaded) {
		return null;
	}
	const { user } = useUser();
	const mutation = trpc.roomRouter.JoinRoom.useMutation();

	const handleOrganization = (id: string) => {
		setOrganizationId(id);
		mutation.mutate({
			socketRoom: id,
			type: "Join",
			userId: user?.id as string,
		});
	};

	trpc.roomRouter.onJoinRoom.useSubscription(undefined, {
		onData(data) {
			setData(data);
		},
	});

	console.log(data);

	return (
		<div>
			{organizationList.length === 0 && null}
			<ul>
				{organizationList.map(({ organization }) => (
					<li
						key={organization.id}
						onClick={() => handleOrganization(organization?.id)}
					>
						{/* <Link href={`/organizations/switcher?selected=${organization.id}`}> */}
						<div className="avatar">
							<div className="w-12 rounded-full hover:ring ring-white ring-offset-0.2 transition-all delay-75 linear ">
								<img src={organization.logoUrl as string} />
							</div>
						</div>
						{/* </Link> */}
					</li>
				))}
			</ul>
		</div>
	);
};

export default OrganizationList;
function onSubcription(): [any] {
	throw new Error("Function not implemented.");
}
