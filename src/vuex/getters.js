//获取数据
 const getters = {
  templateAdd:state=>state.user.templateAdd,
    moveObj:state=>state.user.moveObj,
    deletID:state=>state.user.deletID,
    templetInfo:state=>state.user.templetInfo,
    isDrag:state=>state.computed.isDrag,
    scrType:state=>state.user.scrType,
    service:state=>state.user.service,
    baseUrl:state=>state.user.baseUrl,
    userInfo:state=>state.user.userInfo,
    loading:state=>state.user.loading,
 };

export default getters
 