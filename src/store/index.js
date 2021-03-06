import {createStore} from 'redux';


const initialState = {
	authParam: {login:'',password:''},
	authData: {error: true, message:'',session:''},
	extData : [],	
	itemsIsLoading: false,
	itemsIsFailed: false,
	dialogOpen:false 
}

const evtreducer = (state = initialState, action) => {
	switch(action.type){
		case "LOAD_DATA" : 
			return Object.assign({},state, {extData: action.payload});	
		case "ITEMS_IS_LOADING" : 
			return Object.assign({},state, {itemsIsLoading: action.payload});
		case "ITEMS_IS_FAILED" : 
			return Object.assign({},state, {itemsIsFailed: action.payload});						
		case "LOGIN_INPUT_CHANGE":
			return Object.assign({},state,{authParam: {login:action.payload,password:state.authParam.password}});
		case "PASSWORD_INPUT_CHANGE":
			return Object.assign({},state,{authParam: {login:state.authParam.login,password:action.payload}});						
		case "SET_AUTH" : 
			return Object.assign({},state, {authData: action.payload});	
		case "DIALOG_OPEN" : 
			return Object.assign({},state, {dialogOpen: action.payload});	

		default: return state;
	}	
}

const store = createStore(evtreducer);

export default store;
