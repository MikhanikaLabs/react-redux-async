const getConnection = async (dispatch, authParam) => {
	dispatch({ type: "ITEMS_IS_FAILED", payload: false });
	dispatch({
		type: "SET_AUTH",
		payload: { error: true, message: "", session: "" }
	});
	dispatch({ type: "ITEMS_IS_LOADING", payload: true });

	try {
		const api_call = await fetch(
			`https://www.myfxbook.com/api/login.json?email=${
				authParam.login
			}&password=${authParam.password}`
		);
		const data = await api_call.json();
		console.log("data:", data);
		if (data.error) {
			dispatch({ type: "ITEMS_IS_LOADING", payload: false });
			dispatch({ type: "ITEMS_IS_FAILED", payload: true });
			dispatch({ type: "DIALOG_OPEN", payload: true });
			dispatch({ type: "SET_AUTH", payload: data });
		} else {
			dispatch({ type: "ITEMS_IS_LOADING", payload: false });
			dispatch({ type: "ITEMS_IS_FAILED", payload: false });
			dispatch({ type: "SET_AUTH", payload: data });
			console.log("data.session=", data.session);
			getReposAvait(dispatch, data.session);
		}
	} catch (e) {
		// statements
		dispatch({ type: "ITEMS_IS_LOADING", payload: false });
		console.log(e);
	}
};

const getReposAvait = async (dispatch, query) => {
	dispatch({ type: "ITEMS_IS_FAILED", payload: false });
	dispatch({ type: "SET_REPOS", payload: [] });
	dispatch({ type: "ITEMS_IS_LOADING", payload: true });

	try {
		const api_call = await fetch(
			`https://www.myfxbook.com/api/get-community-outlook.json?session=${query}`
		);
		const data = await api_call.json();
		console.log("data:", data);
		if (data.error) {
			dispatch({ type: "ITEMS_IS_LOADING", payload: false });
			dispatch({ type: "ITEMS_IS_FAILED", payload: true });
			dispatch({ type: "DIALOG_OPEN", payload: true });
			dispatch({ type: "SET_AUTH", payload: data });
		} else {
			dispatch({ type: "ITEMS_IS_LOADING", payload: false });
			dispatch({ type: "ITEMS_IS_FAILED", payload: false });
			dispatch({ type: "SET_REPOS", payload: data.symbols });
		}
	} catch (e) {
		// statements
		dispatch({ type: "ITEMS_IS_LOADING", payload: false });
		console.log(e);
	}
};

export default{
	getConnection,
	getReposAvait
}