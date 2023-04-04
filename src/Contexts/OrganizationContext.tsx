import React, { useState, useMemo, createContext } from "react";


export const OrganizationContext = createContext({
	organizationId : '',
	setOrganizationId: (id: string) => {},
});

interface IOrganizationStateProps {
	organizationId: string;
	setOrganizationId: (id: string) => void;
}

export const OrganizationContextProvider = ({ children }: any) => {
	const [organizationId, setOrganizationId] = useState('');
	const values: IOrganizationStateProps = useMemo(
		() => ({
			organizationId,
			setOrganizationId,
		}),
		[organizationId]
	);
	return (
		<OrganizationContext.Provider value={values}>
			{children}
		</OrganizationContext.Provider>
	);
};

export default OrganizationContext;
