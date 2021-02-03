<template>
<div>
  <div class="top">
    <el-button @click="reDesign">重新设计</el-button>
    <el-button @click="preview">预览效果</el-button>
  </div>
  <div style="display:flex;width:100%;padding:20px;">
    <div style="flex:1;margin-right:30px;">
      <table border cellspacing="0"  style="width:100%">
        <tbody>
          <tr v-for="(tr, trIndex) in tableData.trArr" :key="tr.id">
            <td
            v-for="(td, tdIndex) in tr.tdArr"
            :key="td.id"
            :class="td.class"
            :style="'width:'+td.rowWidth+'px;position:relative;padding:16px 30px;'"
            :colspan="td.colspan"
            :rowspan="td.rowspan"
            @click="handleTd(trIndex,tdIndex)"
            @mouseenter="handleHover(trIndex,tdIndex)">
              <span v-show="currentHoverTrIndex===trIndex && currentHoverTdIndex===tdIndex" style="position:absolute;right:30px;bottom:20px" class="el-icon-circle-plus-outline" @click="add(trIndex,tdIndex)" title="向前插入"></span>
              <span v-show="currentHoverTrIndex===trIndex && currentHoverTdIndex===tdIndex" style="position:absolute;right:15px;bottom:20px" class="el-icon-caret-right" @click="merge(trIndex,tdIndex)" title="向后合并"></span>
              <span v-show="currentHoverTrIndex===trIndex && currentHoverTdIndex===tdIndex" style="position:absolute;right:0px;bottom:20px" class="el-icon-circle-plus-outline" @click="add(trIndex,tdIndex+1)" title="向后插入"></span>
              <span v-show="currentHoverTrIndex===trIndex && currentHoverTdIndex===tdIndex" style="position:absolute;right:30px;bottom:0" class="el-icon-circle-plus-outline" @click="addBottom(trIndex,tdIndex)" title="插入行"></span>
              <span v-show="currentHoverTrIndex===trIndex && currentHoverTdIndex===tdIndex" style="position:absolute;right:15px;bottom:0" class="el-icon-remove-outline" @click="del(trIndex,tdIndex)" title="删除当前"></span>
              <span v-show="currentHoverTrIndex===trIndex && currentHoverTdIndex===tdIndex" style="position:absolute;right:0;bottom:0" class="el-icon-caret-bottom" @click="mergeBottom(trIndex,tdIndex)" title="向下合并"></span>
              {{td.value}}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div style="width:300px;border:1px solid #e5e5e5;min-height:80vh;padding-right:30px;">
      <div>
        <h3 class="center">配置栏</h3>
        <el-tabs v-model="activeName">
          <el-tab-pane label="单元格配置" name="first">
             <el-form :model="bindData" label-width="100px" class="demo-ruleForm" style="margin-top:50px">
              <el-form-item label="绑定文本" >
                <el-input type="text" v-model="bindData.trLabel"></el-input>
              </el-form-item>
              <el-form-item label="绑定字段" >
                <el-input type="text" v-model="bindData.trProp"></el-input>
              </el-form-item>
              <el-form-item label="行宽">
                <el-input type="text" v-model="bindData.rowWidth"></el-input>
              </el-form-item>
              <!-- <el-form-item label="行高">
                <el-input type="text" v-model="bindData.rowHeight"></el-input>
              </el-form-item> -->
              <el-form-item label="绑定样式">
                <el-input type="text" v-model="bindData.trClass"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="save">保存</el-button>
                <!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="表格配置" name="second">
            <el-form :model="bindTableData" label-width="100px" class="demo-ruleForm" style="margin-top:50px">
              <el-form-item label="行"  class="inputNum">
                <el-input type="text" v-model="bindTableData.rows" @input="changeRows($event)"></el-input>
              </el-form-item>
              <el-form-item label="列" class="inputNum" style="margin-right:30px;">
                <el-input type="text" v-model="bindTableData.cols" @input="changeCols($event)"></el-input>
              </el-form-item>
              <!-- <el-form-item label="绑定文本" >
                <el-input type="text" v-model="bindTableData.trLabel"></el-input>
              </el-form-item> -->
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
    name: 'DesignPage',
   data() {
      return {
        activeName: 'second', //默认显示表格配置栏
        // isConfig: false, //配置栏的显示控制
        currentTrIndex: 0, //点击当前的tr索引
        currentTdIndex: 0, //点击当前的td索引
        currentHoverTrIndex: 0, //hover当前的tr索引
        currentHoverTdIndex: 0, //hover当前的td索引
        bindData: {
          trProp: '',
        },
        // 表格初始化，默认两行两列。
        bindTableData: {
            rows: 2,
            cols: 2
        },
        copyTableData: null,
        tableData: {
          trArr: [
            {
              id:1000,
              tdArr: [
                {
                  id: 2000,
                  name: 'aaa',
                  value: '姓名',
                  width:'100',
                  class:'#fff',
                  rowspan: 1,
                  colspan: 1
                },
                {
                  id: 2001,
                  name: 'bbb',
                  value: '张三',
                  width:'100',
                  class:'#fff',
                  rowspan: 1,
                  colspan: 1
                }
              ]
            },
            {
              id:1001,
              tdArr: [
               {
                  id:2100,
                  name: 'aaa1',
                  value: '姓名',
                  width:'100',
                  class:'#fff',
                  rowspan: 1,
                  colspan: 1
                },
                {
                  id:2101,
                  name: 'bbb1',
                  value: '张三',
                  width:'100',
                  class:'#fff',
                  rowspan: 1,
                  colspan: 1
                }
              ]
            }
          ]
        }
      }
    },
    mounted() {
      // 存储元数据
        this.copyTableData = JSON.parse(JSON.stringify(this.tableData))

    },
    methods: {
      handleTd(tri,tdi){
        console.log(tri,this.currentTrIndex)
        console.log(tdi,this.currentTdIndex)
        // if((tri !== this.currentTrIndex) && (tdi !== this.currentTdIndex)) {
        //   console.log("dd")
        //   Object.keys(this.bindData).forEach((item) => {
        //     this.bindData[item] = ''
        //   })
        // }

        // 显示配置栏
        // this.isConfig = true
        // 显示单元格配置栏
        this.activeName = 'first'
        this.currentTrIndex = tri
        this.currentTdIndex = tdi
      },
      add(tdi) {
        this.tableData.trArr.forEach((itemTr, indexTr) => {
            itemTr.tdArr.splice(tdi, 0, {
                  id: new Date()+indexTr,
                  name: '增加',
                  value: '100',
                  width:'100',
                  class:'#fff',
                  rowspan: 1,
                  colspan: 1
            })
        })
      },
      addBottom() {
        this.tableData.trArr.push(this.tableData.trArr[this.tableData.trArr.length-1])
      },
      del(tri,tdi) {
        this.tableData.trArr.forEach((itemTr, indexTr) => {
          if (indexTr === tri) {
            itemTr.tdArr.splice(tdi, 1)
          }
        })
      },
      handleHover(tri, tdi) {
        console.log("1")
        this.currentHoverTrIndex = tri
        this.currentHoverTdIndex = tdi
      },
      // 向后合并
      merge(tri, tdi) {
        this.tableData.trArr.forEach((itemTr, indexTr) => {
          if (indexTr === tri) {
            // itemTr.tdArr.splice(tdi+1, 1)
           itemTr.tdArr.forEach((itemTd, indexTd) => {
              if (indexTd === tdi) {
                itemTd.colspan = itemTd.colspan+itemTr.tdArr[indexTd+1].colspan
              }
            })
            itemTr.tdArr.splice(tdi+1, 1)
          }
        })
      },
      // 向下合并
      mergeBottom(tri, tdi) {
        let temp = 1  //定义下一行的当前格的rowspan值，默认为1
        // let currentTr = 1
        this.tableData.trArr.forEach((itemTr, indexTr) => {

          if (indexTr === tri) {


            //  currentTr = indexTr+1

             itemTr.tdArr.forEach((itemTd, indexTd) => {

              if (indexTd === tdi) {
                // 当前格的rowspan为1时默认删除下面一格
                // 当前格的rowspan为2时删除第三行的格
                // 判断当前格的rowspan
                // 当前格操作
                console.log("向下合并")
                console.log(itemTd.rowspan)
                console.log("向下合并")
                // temp = itemTr.tdArr[indexTd+1].rowspan

                // 当前格的rowspan加上下一行当前格的rowspan
                  // 获取下一行的当前格(下一行不一定是index+1，因该是index+当前格的rowspan)
                  let currentGeRowspan = itemTd.rowspan
                // temp = this.tableData.trArr[indexTr+1].tdArr[indexTd].rowspan
                temp = this.tableData.trArr[indexTr+currentGeRowspan].tdArr[indexTd].rowspan
                console.log(temp)
                // itemTd.rowspan = itemTd.rowspan+temp
                itemTd.rowspan = itemTd.rowspan+temp
                // 如果处于第一行
                if(indexTr===0 && temp===1){
                  this.tableData.trArr[itemTd.rowspan-1].tdArr.splice(tdi, 1)
                } else{
                  // 如果下一行的rowspan为1
                  if(temp===1){
                    console.log(1111111111)
                     // let aaa = this.tableData.trArr[indexTr].tdArr[tdi].rowspan
                    this.tableData.trArr[indexTr+itemTd.rowspan-1].tdArr.splice(tdi, 1)
                  }else if(temp > 1 && temp < 3) {
                    //   for循环控制当前格包含的rowspan，跨几格，删几格
                    //  不用for循环的话，当前格为一格向下合并没问题，当前格大于一格，删少了
                     for(let i=1; i<temp; i++) {
                      console.log("遍历删除")
                      console.log(indexTr)
                      console.log(i)
                      this.tableData.trArr[indexTr+currentGeRowspan-1+i].tdArr.splice(tdi, 1)
                    }
                    console.log('>>>>>>>>>>>>>>>>1111111111')
                    // this.tableData.trArr[indexTr+itemTd.rowspan-1].tdArr.splice(tdi, 1)
                  }else if(temp > 2) {
                    //  for(let i=1; i<temp; i++) {
                    //   console.log("遍历删除")
                    //   console.log(indexTr)
                    //   console.log(i)
                    //   this.tableData.trArr[indexTr+i-1].tdArr.splice(tdi, 1)
                    // }
                    this.tableData.trArr[indexTr+currentGeRowspan].tdArr.splice(tdi, 1)
                    console.log('>>>>>>>>>>>>>>>>222222222222222')
                    // this.tableData.trArr[indexTr+itemTd.rowspan-1].tdArr.splice(tdi, 1)
                  }
                 


                    // for(let i=temp; i>0; i--) {
                    //   console.log("遍历删除")
                    //   console.log(indexTr)
                    //   console.log(i)
                    //   this.tableData.trArr[indexTr+itemTd.rowspan-i].tdArr.splice(tdi, 1)
                    // }
                }


              }
            })
            console.log("eeeeeee")
            console.log(itemTr.tdArr)
            // for(let i=temp; i>0; i--) {
            //   console.log("遍历删除")
            //   console.log(indexTr)
            //   console.log(i)
            //   this.tableData.trArr[currentTr+i].tdArr.splice(tdi, 1)
            // }
            // currentTr =


          }
          // if (indexTr === tri+1) {
          //  itemTr.tdArr.splice(tdi, 1)
          // }
          console.log(this.tableData.trArr)
        })
      },
      // 配置表格行
      changeRows(e) {
        console.log(111)
        console.log(e)

        if(e>this.tableData.trArr.length){
          let maxRows = e-this.tableData.trArr.length
          for(let i=0; i<maxRows; i++) {
            this.tableData.trArr.push(
              {
                id:new Date()+i,
                tdArr: [
                  {
                    name: 'aaa',
                    value: '姓名',
                    width:'100',
                    class:'#fff',
                    rowspan: 1,
                    colspan: 1
                  },
                  {
                    name: 'bbb',
                    value: '张三',
                    width:'100',
                    class:'#fff',
                    rowspan: 1,
                    colspan: 1
                  }
                ]
              }
            )
          }
        }else if(e<this.tableData.trArr.length){
          this.tableData.trArr.length = e
        }




      },
      changeCols(e) {
        console.log(111)
        console.log(e)
        this.tableData.trArr.forEach((itemTr) => {
          if(e>itemTr.tdArr.length){
          let maxRows = e-itemTr.tdArr.length
          for(let i=0; i<maxRows; i++) {
            itemTr.tdArr.push(

                  {
                    name: 'aaa',
                    value: '姓名',
                    width:'100',
                    class:'#fff',
                    rowspan: 1,
                    colspan: 1
                  }
            )
          }
        }else if(e<itemTr.tdArr.length){
          itemTr.tdArr.length = e
        }
        })
      },
      save(){
        // 遍历所有的tr
        this.tableData.trArr.forEach((itemTr, indexTr) => {
          if (indexTr === this.currentTrIndex) {
            itemTr.tdArr.forEach((itemTd, indexTd) => {
              if (indexTd === this.currentTdIndex) {
                itemTd.value = this.bindData.trLabel
                itemTd.rowWidth = this.bindData.rowWidth
                itemTd.class = this.bindData.trClass

              }
            })
          }
        })
      },
    //   重新设计
      reDesign() {
            //  恢复元数据
          this.tableData = this.copyTableData
            //  恢复行，列
          this.bindTableData.rows = this.bindTableData.cols = 2

      },
    //   效果预览
      preview(){
        //    let routeData = this.$router.resolve({ path: '/preview',query:this.tableData.trArr });
           let routeData = this.$router.resolve({name: 'preview', query: {data:JSON.stringify(this.tableData.trArr)}});
            window.open(routeData.href, '_blank');
        // this.$router.push({path: '/preview',query:this.tableData.trArr})
      }
    }

}
</script>

<style>
.top{
  width:100%;
  height:50px;
  border-bottom:1px solid #e6e6e6;
  display: flex;
  justify-content: flex-end;
}
.top .el-button{
  height:40px;
}
.el-tabs{
  margin-left: 20px;
}
.el-tabs--top .el-tabs__item.is-top:nth-child(2){
  padding-left:60px !important;
}
/* .el-tabs__active-bar{
  left:70px !important;
} */
table{
  /* border: 1px solid #dadada; */
  border-color: #e6e6e6;
}
td,.center{
  text-align: center;
}
.inputNum{
  width:40%;
  display:inline-block;
}
.inputNum input{
  width:50px;
}
.red{
  background-color: red;
}
.yellow{
  background-color: yellow;
}
.pink{
  background-color: pink;
}
</style>
