import { UserButton } from "@clerk/nextjs";
import { ToogleAside } from "../toogleAside/toogleAside";
interface IOrganizationAside {
	asideOpen: boolean;
	handleAsideOpen: () => void;
}

const OrganizationAside = ({
	asideOpen,
	handleAsideOpen,
}: IOrganizationAside) => {
	return (
		<div className="w-30 p-6">
			<div className="flex flex-col gap-2 justify-center items-center">
				<UserButton appearance={{
                    elements: {
                        userButtonAvatarBox: 'w-12 h-12',
                    }
                }}/>
                <ToogleAside asideOpen={asideOpen} handleAsideOpen={handleAsideOpen}/>
			</div>
		</div>
	);
};

export default OrganizationAside;
