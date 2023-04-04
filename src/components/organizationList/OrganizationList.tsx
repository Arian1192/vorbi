import { useOrganizationList } from "@clerk/nextjs";
import Link from "next/link";
import { useContext, useState, useEffect } from "react";
import OrganizationContext from "@/Contexts/OrganizationContext";
import { trpc } from "@/utils/trpc";
import { useUser } from "@clerk/nextjs";
import { IRoomProps } from "../../pages/api/server/routers/roomRouter";

const OrganizationList = () => {
	const { organizationList, isLoaded } = useOrganizationList();
	const { setOrganizationId, organizationId } = useContext(OrganizationContext);
	const [previouseOrganizationId, setPreviousOrganizationId] =
		useState<string>(organizationId);

	const [roomData, setRoomData] = useState<string>("");
	const orgs = organizationList;
	useEffect(() => {
		const firstOrg = orgs?.[0]?.organization?.id?.toString() || "";
		setOrganizationId(firstOrg);
	}, []);

	if (!isLoaded) {
		return null;
	}
	const { user } = useUser();

	// Mutation
	const mutation = trpc.roomRouter.JoinRoom.useMutation();

	const handleOrganization = (id: string) => {
		if (previouseOrganizationId !== id) {
			mutation.mutate({
				prevSocketIdRoom: previouseOrganizationId,
				socketRoom: id,
				type: "Join",
				userId: user?.id as string,
			});
			setPreviousOrganizationId(id);
		}
		setOrganizationId(id);
	};

	// Subscription

	trpc.roomRouter.onJoinRoom.useSubscription(undefined, {
		onData(value) {
			setRoomData(value.room);
		},
	});

	useEffect(() => {
		console.log(`the user with id ${user?.id} has joined the room ${roomData}`);
	}, [roomData]);

	return (
		<div>
			{organizationList.length === 0 && null}
			<ul>
				{organizationList.map(({ organization }) => (
					<li
						key={organization.id}
						onClick={() => handleOrganization(organization?.id)}
						value={organization.id}
					>
						{/* <Link href={`/organizations/switcher?selected=${organization.id}`}> */}
						<div className="avatar my-2 cursor-pointer">
							<div
								className={`w-12 rounded-full  ${
									organization?.id === organizationId && "ring ring-purple-300"
								} hover:ring ring-white ring-offset-0.2 transition-all delay-75 linear `}
							>
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
