/* THIS IS A GENERATED FILE. DO NOT EDIT DIRECTLY. */
import type React from "react";

import config from "@payload-config";
import { RootLayout } from "@payloadcms/next/layouts";
import { handleServerFunctions } from "./actions";
import { importMap } from "./admin/importMap.js";

import "@payloadcms/next/css";

type Args = {
	children: React.ReactNode;
};

const Layout = ({ children }: Args) => (
	<RootLayout
		config={config}
		importMap={importMap}
		serverFunction={handleServerFunctions}
	>
		{children}
	</RootLayout>
);

export default Layout;
