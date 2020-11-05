const globalState = {
	code: '',
}

const VendingReducer = (state = globalState, action) => {
    // eslint-disable-next-line default-case
    switch(action.type){
        case "CHANGE_CODE_NUMPAD":
            let value_ = '';
            if(state.code === ''){
                if(action.value === 'backspace'){
                    value_ = ''
                }else{
                    value_ = action.value;
                }
            }else{
                if(action.value === 'backspace'){
                    value_ = state.code.slice(0,-1)
                }else{
                    value_ = state.code+""+action.value
                }
            }
            return{
                ...state,
                code: value_
            }
        case "HANDLE_STEP_CHANGE":
            let {id, idcategory, method} = action.data
            console.log(action);
            if(action.stepAction === 'NEXT1TO2'){
                // if(action.data.idcategory === '1'){
                    return{
                        ...state,
                        id: id,
                        idcategory: idcategory,
                        method: method,
                    }
                // }
            }
        // eslint-disable-next-line no-fallthrough
        default:
            return state;
    }
    
    
    // if(action.type === 'CHANGE_CODE_NUMPAD'){
	// 	let value_ = '';
	// 	if(state.code === ''){
	// 		if(action.value === 'backspace'){
	// 			value_ = ''
	// 		}else{
	// 			value_ = action.value;
	// 		}
	// 	}else{
	// 		if(action.value === 'backspace'){
	// 			value_ = state.code.slice(0,-1)
	// 		}else{
	// 			value_ = state.code+""+action.value
	// 		}
	// 	}
	// 	return{
	// 		...state,
	// 		code: value_
	// 	}
	// }
	// else if(action.type === 'HANDLE_STEP_CHANGE'){
	// 	let {id, idcategory, method} = action.data
	// 	console.log(action);
	// 	if(action.stepAction === 'NEXT1TO2'){
	// 		// if(action.data.idcategory === '1'){
	// 			return{
	// 				...state,
	// 				id: id,
	// 				idcategory: idcategory,
	// 				method: method,
	// 			// }
	// 		}
	// 	}
			
		
	// }
	// return state;
}

export default VendingReducer;