import React, { useContext } from "react";
import { Context } from "../store/appContext.js";


export const Login = () => {
	const { store, actions } = useContext(Context);

	const n = {
		id: "1",
		user_id: "1",
		title: "notice.title",
		body: "notice.body",
		status: "notice.status",
		created_at: "notice.created_at",
		importance_level: "low",
		img_url: "notice.img_url"
	}

	//actions.getNotice("all");
//	actions.get(n);
	console.log(actions.getNotice(n));

	

	return (
		<div className="text-center mt-5">
			
			<h1>LOGIN</h1>			
		</div>
	);
};
