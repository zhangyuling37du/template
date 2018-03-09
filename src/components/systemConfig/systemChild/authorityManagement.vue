<template>
	<div  class="com-paint com-paint-main">
	  	<div class="com-paint-head">
           <div>
		      <el-button size="small" @click="goBack" class="Bread-button-le goBack imgom">
		          返回
		      </el-button>
		  </div>
		  <div>
		      <el-button size="small" @click="edit" class="Bread-button-le edit imgom" >
		         编辑
		      </el-button>
		      <el-button size="small" class=" delete-selected imgom">
				  删除 
			  </el-button>
		  </div>
		</div>
		<div class="com-paint-main">
			<div class="main-box">
		      <div>
		      	<el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
		      </div>
		      <div>
		      	<el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
		      </div>
		      <div>
		      	<el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
		      </div>
		      <div>
		      	<el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
		      </div>
		      <div>
		      	<el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
		      </div>
		      <div>
		      	<el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
		      </div>
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
			  data: [{
          label: '一级 1',
          children: [{
            label: '二级 1-1',
            children: [{
              label: '三级 1-1-1'
            }]
          }]
        }, {
          label: '一级 2',
          children: [{
            label: '二级 2-1',
            children: [{
              label: '三级 2-1-1'
            }]
          }, {
            label: '二级 2-2',
            children: [{
              label: '三级 2-2-1'
            }]
          }]
        }, {
          label: '一级 3',
          children: [{
            label: '二级 3-1',
            children: [{
              label: '三级 3-1-1'
            }]
          }, {
            label: '二级 3-2',
            children: [{
              label: '三级 3-2-1'
            }]
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
	}
},
	 
	methods:{
	 goBack(val){
        this.$router.go(-1)
      },
     edit(){

      },
      handleNodeClick(data) {
        console.log(data);
      }
     
	}
}
</script>
<style lang="less" scoped>
	 
	 .userName{
       padding-bottom:20px;
       border-bottom:1px solid #ccc;
	 }
	 label{
	 	color:#9c9c9c;
	 }
	 .main-box{
         display: flex;
	    flex-direction: row;
	    justify-content: space-around;
	    align-items: center;
	    padding: 1rem 0%;
	    div{
	     width: 16.6%;
         background:#ccc; 
        margin-right: 1%;
	    }
	 }
</style>  
 
