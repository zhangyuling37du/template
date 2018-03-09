<template>
	<div  class="com-paint com-paint-main">
	  	<div class="com-paint-head">
           <div>
		      <el-button size="small" @click="goBack" class="Bread-button-le goBack imgom">
		          返回
		      </el-button>
		  </div>
		  <div>
		      <el-button size="small" @click="save" class="Bread-button-le butSave imgom" >
		         保存
		      </el-button>
		  </div>
		</div>
		<div class="com-paint-main">
			<div class="main-box">
		     <el-form ref="form" :model="form"  label-width="80px" >
				<el-form-item label="角色:" prop="planName" >
		          <el-input v-model="form.planName" style="width:200px;"></el-input>
		        </el-form-item>
		        <el-form-item label="用户名:" prop="planName" class="userName">
		          <el-input v-model="form.planName" style="width:200px;"></el-input>
		        </el-form-item>
		        <el-form-item label="密码:" prop="planName" >
		          <el-input v-model="form.planName" style="width:200px;"></el-input>
		        </el-form-item>
			</el-form>
             <label>标签编号:</label><span> </span>
			 <p><label>标签状态:</label><span> </span></p>
			     <el-button class="leftDetail-message butColor" size="small"  @click="target()">权限管理</el-button>
			</div>
		</div>
	</div>
	
</template>
<script>
export default{
	data(){
		return{
		     form:{
			 planName:'',
			},
		}
	},
	 
	methods:{
	 goBack(val){
        this.$router.go(-1)
      },
     save(){

      } ,
      target(row){
      	this.$router.push({name:"authorityManagement"})	
      }
	}
}
</script>
<style lang="less" scoped>
	 .mianDetail{
	 	
	 }
	 .userName{
       padding-bottom:20px;border-bottom:1px solid #ccc;
	 }
	 label{
	 	color:#9c9c9c;
	 }
</style>  
 
