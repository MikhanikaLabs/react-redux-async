/*
let defaultOptions = {
url:'',
method:'POST',
mode: 'cors',
headers:{
'Access-Control-Allow-Origin':'*'
},
body:null,
};

let UploadFile=function(options){

let header = new Headers({
    'Access-Control-Allow-Origin':'*',
    'Content-Type': 'multipart/form-data'
});
let opt = Object.assign({}, defaultOptions, options); //将默认的参数和传过来的合并在一起

let sentData={
    method:opt.method,
    mode: 'cors',
    header: header,
    body:opt.body || ''
};
return new Promise((reslove,reject)=>{
    fetch(opt.url, sentData)
        .then(response=> response.json())
        .then(responseText=>{
            let resp = typeof responseText === 'string' ? JSON.parse(responseText) : responseText;
            //console.log(resp);
            reslove(resp); //这个resp会被外部接收
        }).catch(err=>{
        //console.log(err);
        reject(err);
    });
}).catch(err => {
        console.log('出错了');
    });

*/

let myHeaders = new Headers({
    'Access-Control-Allow-Origin':'*',
    'Content-Type': 'multipart/form-data'
});
var myInit = { method: 'GET',
               headers: myHeaders,
               mode: 'cors',
               cache: 'default' };



const getConnection = async (dispatch, authParam) => {
	dispatch({ type: "ITEMS_IS_FAILED", payload: false });
	dispatch({
		type: "SET_AUTH",
		payload: { error: true, message: "", session: "" }
	});
	dispatch({ type: "ITEMS_IS_LOADING", payload: true });

	try {
		const proxyurl = "https://shielded-brushlands-73771.herokuapp.com/";
		const auth = `https://www.myfxbook.com/api/login.json?email=${authParam.login}&password=${authParam.password}`;
		const api_call = await fetch(
			// `https://www.myfxbook.com/api/login.json?email=${
			// 	authParam.login
			// }&password=${authParam.password}`
			proxyurl+auth
		,myInit);
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
			getDataAvait(dispatch, data.session);
		}
	} catch (e) {
		// statements
		dispatch({ type: "ITEMS_IS_LOADING", payload: false });
		console.log(e);
	}
};

const getDataAvait = async (dispatch, query) => {
	dispatch({ type: "ITEMS_IS_FAILED", payload: false });
	dispatch({ type: "LOAD_DATA", payload: [] });
	dispatch({ type: "ITEMS_IS_LOADING", payload: true });

	try {
		const proxyurl = "https://shielded-brushlands-73771.herokuapp.com/";
		const url=`https://www.myfxbook.com/api/get-community-outlook.json?session=${query}`
		const api_call = await fetch(
			proxyurl + url
	//		`https://www.myfxbook.com/api/get-community-outlook.json?session=${query}`
			,myInit
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
			dispatch({ type: "LOAD_DATA", payload: data.symbols });
		}
	} catch (e) {
		// statements
		dispatch({ type: "ITEMS_IS_LOADING", payload: false });
		console.log(e);
	}
};

export default{
	getConnection,
	getDataAvait
}