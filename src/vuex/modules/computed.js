const computed = {
	state:{
		isDrag:true
	},
	mutations:{
		SET_ISDRAG:(state,isDrag)=>{
			state.isDrag = isDrag;
		}
	}
}
export default computed