<template>
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
              <span v-show="currentHoverTrIndex===trIndex && currentHoverTdIndex===tdIndex" style="position:absolute;left:0" class="el-icon-circle-plus-outline" @click="add(trIndex,tdIndex)" title="向前插入"></span>
              <span v-show="currentHoverTrIndex===trIndex && currentHoverTdIndex===tdIndex" style="position:absolute;left:15px" class="el-icon-caret-right" @click="merge(trIndex,tdIndex)" title="向后合并"></span>
              <span v-show="currentHoverTrIndex===trIndex && currentHoverTdIndex===tdIndex" style="position:absolute;right:0" class="el-icon-circle-plus-outline" @click="add(trIndex,tdIndex+1)" title="向后插入"></span>
              <span v-show="currentHoverTrIndex===trIndex && currentHoverTdIndex===tdIndex" style="position:absolute;right:40%;bottom:0" class="el-icon-remove-outline" @click="del(trIndex,tdIndex)" title="删除当前"></span>
              <span v-show="currentHoverTrIndex===trIndex && currentHoverTdIndex===tdIndex" style="position:absolute;right:58%;bottom:0" class="el-icon-caret-bottom" @click="mergeBottom(trIndex,tdIndex)" title="向下合并"></span>
              {{td.value}}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div style="width:300px;border:1px solid #e5e5e5;min-height:100vh;padding:20px 20px 0 0;">
      <div v-show="isConfig">
        <h3 class="center">配置栏</h3>
        <el-form :model="bindData" label-width="100px" class="demo-ruleForm" style="margin-top:50px">
          <el-form-item label="行"  class="inputNum">
            <el-input type="text" v-model="bindData.rows" @input="changeRows($event)"></el-input>
          </el-form-item>
          <el-form-item label="列" class="inputNum" style="margin-right:30px;">
            <el-input type="text" v-model="bindData.cols" @input="changeCols($event)"></el-input>
          </el-form-item>
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
      </div>
    </div>
  </div>
</template>

<script>
export default {
   data() {
      return {
        isConfig: false, //配置栏的显示控制
        currentTrIndex: 0, //点击当前的tr索引
        currentTdIndex: 0, //点击当前的td索引
        currentHoverTrIndex: 0, //hover当前的tr索引
        currentHoverTdIndex: 0, //hover当前的td索引
        bindData: {
          trProp: '',
        },
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
      // 元数据

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
        this.isConfig = true
        this.currentTrIndex = tri
        this.currentTdIndex = tdi
      },
      add(tri,tdi) {
        this.tableData.trArr.forEach((itemTr, indexTr) => {
          if (indexTr === tri) {
            itemTr.tdArr.splice(tdi, 0, {
                  id: new Date()+indexTr,
                  name: '增加',
                  value: '100',
                  width:'100',
                  class:'#fff',
                  rowspan: 1,
                  colspan: 1
            })
          }
        })
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
        // let temp = 1  //定义下一行的当前格的rowspan值，默认为1
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

                // temp = this.tableData.trArr[indexTr+1].tdArr[indexTd].rowspan
                // console.log(temp)
                // itemTd.rowspan = itemTd.rowspan+temp

                itemTd.rowspan = itemTd.rowspan+1


                // for(let i=temp; i>0; i--) {
            //   console.log("遍历删除")
            //   console.log(indexTr)
            //   console.log(i)
            //   this.tableData.trArr[currentTr+i].tdArr.splice(tdi, 1)
            // }
                // 如果处于第一行
                if(indexTr===0){
                  this.tableData.trArr[itemTd.rowspan-1].tdArr.splice(tdi, 1)
                } else{
                  // let aaa = this.tableData.trArr[indexTr].tdArr[tdi].rowspan
                  this.tableData.trArr[indexTr+itemTd.rowspan-1].tdArr.splice(tdi, 1)
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
      }
    }

}
</script>

<style>
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
