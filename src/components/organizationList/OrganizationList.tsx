import { useOrganizationList } from "@clerk/nextjs";
import { useContext, useEffect } from "react";
import OrganizationContext from "@/Contexts/OrganizationContext";
import { SocketContext } from "@/Contexts/SocketIoContext";
import { useUser } from "@clerk/nextjs";
import IRoom from "@/interfaces/IRoom";

const OrganizationList = () => {
	const { organizationList, isLoaded } = useOrganizationList();
	const { setOrganizationId, organizationId } = useContext(OrganizationContext);
	const { socket } = useContext(SocketContext);
	const orgs = organizationList;


	useEffect(() => {
		const firstOrg = orgs?.[0]?.organization?.id?.toString() || "";
		setOrganizationId(firstOrg);
		const data:IRoom = {socketRoom : firstOrg, userId: user?.id, previousRoom: ""}
		if (socket !== undefined) {
			socket.emit("joinRoom", data);
		}
	}, []);


	if (!isLoaded) {
		return null;
	}

	// eslint-disable-next-line react-hooks/rules-of-hooks
	const {user} = useUser();


	const handleOrganization = (id:string) => {
		if(socket !== undefined){
			const data = {socketRoom: id, userId: user?.id || "", previousRoom: organizationId}
			socket.emit("joinRoom", data);
		}
		setOrganizationId(id);
	}

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
