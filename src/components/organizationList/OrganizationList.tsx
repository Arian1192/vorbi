import { useOrganizationList } from "@clerk/nextjs";
import Link from "next/link";
import { useContext } from "react";
import OrganizationContext from "@/Contexts/OrganizationContext";
interface IOrganizationProps {
	setOrganizationId: (id: String) => void;
}

const OrganizationList = () => {
	const { organizationList, isLoaded } = useOrganizationList();

	const { setOrganizationId } = useContext(OrganizationContext);

	if (!isLoaded) {
		return null;
	}
	return (
		<div>
			{organizationList.length === 0 && null}
			<ul>
				{organizationList.map(({ organization }) => (
					<li
						key={organization.id}
						onClick={() => setOrganizationId(organization?.id)}
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
