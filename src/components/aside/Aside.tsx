import { useState, useEffect } from "react";

interface AsideProps {
	asideOpen: boolean;
}

const Channels = [
	{
		id: 1,
		name: "General",
		description: "General chat",
	},
	{
		id: 2,
		name: "Random",
		description: "Random chat",
	},
	{
		id: 3,
		name: "Programming",
		description: "Programming chat",
	},
	{
		id: 4,
		name: "Design",
		description: "Design chat",
	},
	{
		id: 5,
		name: "Marketing",
		description: "Marketing chat",
	},
    {
        id: 6,
        name: "Sales",
        description: "Sales chat",
    },
    {
        id: 7,
        name: "Support",
        description: "Support chat",
    },
    {
        id: 8,
        name: "Human Resources",
        description: "Human Resources chat",
    },
    
];

const Aside = ({ asideOpen }: AsideProps) => {
	return (
		<div
			className={`${
				!asideOpen
					? "w-0"
					: "max-w-[15vw] min-w-fit flex flex-col justify-start items-start p-10"
			} h-screen  transition-all duration-500 linear`}
		>
			<div className={`${!asideOpen && "hidden"} divider  w-40 `}>
				{asideOpen && "CANALES"}
			</div>
			<div className="w-40 h-auto flex flex-col mt-5 gap-2 justify-center items-start ">
				{asideOpen &&
					Channels.map((channel) => (
						<div
							key={channel.id}
							className={`${!asideOpen && "opacity-0"}   flex flex-col`}
						>
							<div className="flex flex-row gap-2">
								<div className="w-4 h-4 bg-green-500 rounded-full"></div>
								<div className="flex flex-col gap-1">
									<div className="text-sm font-semibold">{channel.name}</div>
									<div className="text-xs text-gray-500">
										{channel.description}
									</div>
								</div>
							</div>
						</div>
					))}
			</div>
			<div className={`${!asideOpen && "hidden"} divider mt-10`}>
				{asideOpen && "MESSAGES"}
			</div>
		</div>
	);
};
export default Aside;
