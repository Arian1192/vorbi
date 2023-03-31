

interface IToogleAside {
	asideOpen: boolean;
	handleAsideOpen: () => void;
}


export const ToogleAside = ({ asideOpen, handleAsideOpen }: IToogleAside) => {
	return (
		<div
			className="tooltip  tooltip-right"
			data-tip={`${asideOpen ? "Close" : "Open"}`}
		>
			<button
				onClick={handleAsideOpen}
				className="btn btn-circle btn-sm w-12 h-12"
			>
				{asideOpen ? (
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className="w-6 h-6 rotate-0 transition-all duration-500 ease-in-out"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
						/>
					</svg>
				) : (
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className="w-6 h-6 rotate-180 transition-all duration-500 ease-in-out"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
						/>
					</svg>
				)}
			</button>
		</div>
	);
};
