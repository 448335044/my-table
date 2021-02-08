<template>
  <div>
    <div class="top">
      <el-button @click="reDesign">重新设计</el-button>
      <el-button @click="preview">预览效果</el-button>
      <el-button @click="showJson">查看JSON</el-button>
      <el-button @click="importJson">导入JSON</el-button>
    </div>
    <div style="display: flex; width: 100%; padding: 20px">
      <div style="flex: 1; margin-right: 30px">
        <table border cellspacing="0" style="width: 100%" ref="visual_table">
          <tbody>
            <tr v-for="(tr, trIndex) in tableData.trArr" :key="tr.id">
              <td
                v-for="(td, tdIndex) in tr.tdArr"
                :key="td.id"
                :class="td.class"
                :style="
                  'backgroundColor:' +
                  td.tdBgStyle +
                  ';width:' +
                  td.rowWidth +
                  'px;position:relative;padding:16px 30px;'
                "
                :colspan="td.colspan"
                :rowspan="td.rowspan"
                @click.self="handleTd($event, trIndex, tdIndex)"
                @mouseenter="handleHover(trIndex, tdIndex)"
              >
                <!-- <el-dropdown v-show="currentHoverTrIndex===trIndex && currentHoverTdIndex===tdIndex" style="position:absolute;right:10px;bottom:10px;">
                <el-button style="position:absolute;right:0;bottom:0;padding:6px">
                  <i class="el-icon-menu"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item><span @click="add(trIndex,tdIndex)">向前插入</span></el-dropdown-item>
                  <el-dropdown-item><span @click="mergeRight(trIndex,tdIndex)">向后合并</span></el-dropdown-item>
                  <el-dropdown-item><span @click="add(trIndex,tdIndex+1)">向后插入</span></el-dropdown-item>
                  <el-dropdown-item><span @click="addBottom(trIndex,tdIndex)">插入行</span></el-dropdown-item>
                  <el-dropdown-item><span @click="del(trIndex,tdIndex)">删除当前</span></el-dropdown-item>
                  <el-dropdown-item><span @click="mergeBottomtest(trIndex,tdIndex)">向下合并</span></el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown> -->
                <span
                  v-show="
                    currentHoverTrIndex === trIndex &&
                    currentHoverTdIndex === tdIndex
                  "
                  style="position: absolute; right: 30px; bottom: 20px"
                  class="el-icon-circle-plus-outline"
                  @click="add(trIndex, tdIndex)"
                  title="向前插入"
                ></span>
                <span
                  v-show="
                    currentHoverTrIndex === trIndex &&
                    currentHoverTdIndex === tdIndex
                  "
                  style="position: absolute; right: 15px; bottom: 20px"
                  class="el-icon-caret-right"
                  @click="mergeRight(trIndex, tdIndex)"
                  title="向后合并"
                ></span>
                <span
                  v-show="
                    currentHoverTrIndex === trIndex &&
                    currentHoverTdIndex === tdIndex
                  "
                  style="position: absolute; right: 0px; bottom: 20px"
                  class="el-icon-circle-plus-outline"
                  @click="add(trIndex, tdIndex + 1)"
                  title="向后插入"
                ></span>
                <span
                  v-show="
                    currentHoverTrIndex === trIndex &&
                    currentHoverTdIndex === tdIndex
                  "
                  style="position: absolute; right: 30px; bottom: 0"
                  class="el-icon-circle-plus-outline"
                  @click="addBottom(trIndex, tdIndex)"
                  title="插入行"
                ></span>
                <span
                  v-show="
                    currentHoverTrIndex === trIndex &&
                    currentHoverTdIndex === tdIndex
                  "
                  style="position: absolute; right: 15px; bottom: 0"
                  class="el-icon-remove-outline"
                  @click="del(trIndex, tdIndex)"
                  title="删除当前"
                ></span>
                <!-- <span v-show="currentHoverTrIndex===trIndex && currentHoverTdIndex===tdIndex" style="position:absolute;right:0;bottom:0" class="el-icon-caret-bottom" @click="mergeBottom(trIndex,tdIndex)" title="向下合并"></span> -->
                <span
                  v-show="
                    currentHoverTrIndex === trIndex &&
                    currentHoverTdIndex === tdIndex
                  "
                  style="position: absolute; right: 0; bottom: 0"
                  class="el-icon-caret-bottom"
                  @click="mergeBottomPosStyle(trIndex, tdIndex)"
                  title="向下合并"
                ></span>
                <!-- <span v-show="currentHoverTrIndex===trIndex && currentHoverTdIndex===tdIndex" style="position:absolute;right:0;top:0" class="el-icon-caret-bottom" @click="mergeBottomtest(trIndex,tdIndex)" title="向下合并"></span> -->
                <span
                  :style="
                    'fontSize:' + td.tdFont + 'px;color:' + td.tdColor + ';'
                  "
                  >{{ td.value }}</span
                >
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div
        style="
          width: 300px;
          border: 1px solid #e5e5e5;
          min-height: 80vh;
          padding-right: 30px;
        "
      >
        <div>
          <h3 class="center">配置栏</h3>
          <el-tabs v-model="activeName">
            <el-tab-pane label="单元格配置" name="first">
              <el-form
                :model="bindData"
                label-width="100px"
                class="demo-ruleForm"
                style="margin-top: 50px"
              >
                <el-form-item label="绑定文本">
                  <el-input type="text" v-model="bindData.trLabel"></el-input>
                </el-form-item>
                <el-form-item label="绑定字段">
                  <el-input type="text" v-model="bindData.trProp"></el-input>
                </el-form-item>
                <el-form-item label="行宽">
                  <el-input type="text" v-model="bindData.rowWidth"></el-input>
                </el-form-item>
                <!-- <el-form-item label="行高">
                <el-input type="text" v-model="bindData.rowHeight"></el-input>
              </el-form-item> -->
                <el-form-item label="选择字体颜色">
                  <el-color-picker v-model="bindData.tdColor"></el-color-picker>
                </el-form-item>
                <el-form-item label="选择字体大小">
                  <el-input type="text" v-model="bindData.tdFont"></el-input>
                </el-form-item>
                <el-form-item label="选择背景色">
                  <el-color-picker
                    v-model="bindData.tdBgStyle"
                  ></el-color-picker>
                </el-form-item>
                <el-form-item label="绑定class">
                  <el-input type="text" v-model="bindData.trClass"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="save">保存</el-button>
                  <!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->
                </el-form-item>
              </el-form>
            </el-tab-pane>
            <el-tab-pane label="表格配置" name="second">
              <el-form
                :model="bindTableData"
                label-width="100px"
                class="demo-ruleForm"
                style="margin-top: 50px"
              >
                <el-form-item label="行" class="inputNum">
                  <el-input
                    type="text"
                    v-model="bindTableData.rows"
                    @input="changeRows($event)"
                  ></el-input>
                </el-form-item>
                <el-form-item
                  label="列"
                  class="inputNum"
                  style="margin-right: 30px"
                >
                  <el-input
                    type="text"
                    v-model="bindTableData.cols"
                    @input="changeCols($event)"
                  ></el-input>
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
    <!-- 显示JSON -->
    <el-dialog title="JSON数据" :visible.sync="isShowJsonDialog" width="70%">
      <el-input type="textarea" v-model="JsonData"></el-input>
      <!-- <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
    </span> -->
    </el-dialog>
    <!-- 导入JSON -->
    <el-dialog
      title="导入JSON数据"
      :visible.sync="isImportJsonDialog"
      width="70%"
    >
      <el-input type="textarea" v-model="importJsonData"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isImportJsonDialog = false">取 消</el-button>
        <el-button type="primary" @click="importJsonSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "DesignPage",
  data() {
    return {
    currentTdX:0,
    currentTdY:0,
    currentTdW:0,
    currentTdH:0,
    currentGe: undefined,    //定义当前格
    deleteTdTopRowspan: 1,  //当前格的rowspan

      isShowJsonDialog: false, //控制显示JSON弹窗
      isImportJsonDialog: false, //控制导入JSON弹窗
      importJsonData: null, // 导入的JSON
      activeName: "second", //默认显示表格配置栏
      // isConfig: false, //配置栏的显示控制
      currentTrIndex: 0, //点击当前的tr索引
      currentTdIndex: 0, //点击当前的td索引
      currentHoverTrIndex: undefined, //hover当前的tr索引
      currentHoverTdIndex: undefined, //hover当前的td索引
      bindData: {
        trLabel: "内容",
        tdColor: "#666", //td字体颜色
        tdFont: "15", //td字体大小
        tdBgStyle: "#fff", //td背景色
      },
      // 表格初始化，默认两行两列。
      bindTableData: {
        rows: 2,
        cols: 2,
      },
      copyTableData: null,
      tableData: {
        trArr: [
          {
            id: 1000,
            tdArr: [
              {
                id: 2000,
                name: "aaa",
                value: "姓名",
                width: "100",
                class: "#fff",
                rowspan: 1,
                colspan: 1,
              },
              {
                id: 2001,
                name: "bbb",
                value: "张三",
                width: "100",
                class: "#fff",
                rowspan: 1,
                colspan: 1,
              },
            ],
          },
          {
            id: 10000,
            tdArr: [
              {
                id: 2000,
                name: "aaa",
                value: "姓名",
                width: "100",
                class: "#fff",
                rowspan: 1,
                colspan: 1,
              },
              {
                id: 2001,
                name: "bbb",
                value: "张三",
                width: "100",
                class: "#fff",
                rowspan: 1,
                colspan: 1,
              },
            ],
          },
          {
            id: 10010,
            tdArr: [
              {
                id: 2000,
                name: "aaa",
                value: "姓名",
                width: "100",
                class: "#fff",
                rowspan: 1,
                colspan: 1,
              },
              {
                id: 2001,
                name: "bbb",
                value: "张三",
                width: "100",
                class: "#fff",
                rowspan: 1,
                colspan: 1,
              },
            ],
          },
          {
            id: 100011,
            tdArr: [
              {
                id: 2000,
                name: "aaa",
                value: "姓名",
                width: "100",
                class: "#fff",
                rowspan: 1,
                colspan: 1,
              },
              {
                id: 2001,
                name: "bbb",
                value: "张三",
                width: "100",
                class: "#fff",
                rowspan: 1,
                colspan: 1,
              },
            ],
          },
          {
            id: 1001,
            tdArr: [
              {
                id: 2100,
                name: "aaa1",
                value: "姓名",
                width: "100",
                class: "#fff",
                rowspan: 1,
                colspan: 1,
              },
              {
                id: 2101,
                name: "bbb1",
                value: "张三",
                width: "100",
                class: "#fff",
                rowspan: 1,
                colspan: 1,
              },
            ],
          },
        ],
      },
    };
  },
  mounted() {
    this.resourceDataChange(this.tableData)
    // 存储元数据
    this.copyTableData = JSON.parse(JSON.stringify(this.tableData));
  },
  methods: {
    //   元数据变化坐标属性也跟着变化
    resourceDataChange(data){
            //   对元数据每个td对象增加坐标属性
            let allTrArrNode = this.$refs.visual_table.childNodes[0].childNodes
            data.trArr.forEach((tr, indexTr) => {
                tr.tdArr.forEach((td, indexTd) => {
                    let currentTdNode = allTrArrNode[indexTr].childNodes[indexTd]
                    td.currentPosX = this.findPosX(currentTdNode)
                    td.currentPosY = this.findPosY(currentTdNode)
                })
            })
            console.log(this.tableData.trArr)
    },
    // 点击当前格
    handleTd(e, tri, tdi) {
      this.currentHoverTrIndex = tri;
      this.currentHoverTdIndex = tdi;


      console.log("e", e.currentTarget.parentElement);
      //   获取当前格坐标
      this.currentTdX = this.findPosX(e.currentTarget);
      this.currentTdY = this.findPosY(e.currentTarget);
      // 获取当前元素宽高
      this.currentTdH = e.currentTarget.offsetHeight;
      this.currentTdW = e.currentTarget.offsetWidth;
      console.log("坐标",this.currentTdX, this.currentTdY);
      console.log("宽高",this.currentTdW, this.currentTdH);
      console.log("ffff");
      console.log(tri, this.currentTrIndex);
      console.log(tdi, this.currentTdIndex);
      // if((tri !== this.currentTrIndex) && (tdi !== this.currentTdIndex)) {
      //   console.log("dd")
      //   Object.keys(this.bindData).forEach((item) => {
      //     this.bindData[item] = ''
      //   })
      // }

      // 显示配置栏
      // this.isConfig = true
      // 显示单元格配置栏
      this.activeName = "first";
      this.currentTrIndex = tri;
      this.currentTdIndex = tdi;


    //   存储当前格
        this.currentGe = this.tableData.trArr[tri].tdArr[tdi]
    //   点击当前格获取当前格的rowspan
        this.deleteTdTopRowspan = this.tableData.trArr[tri].tdArr[tdi].rowspan
    },
    //   获取X坐标
    findPosX(obj) {
      var curleft = 0;

      if (obj.offsetParent) {
        //返回父类元素，大多说offsetParent返回body
        while (obj.offsetParent) {
          //遍历所有父类元素
          curleft += obj.offsetLeft; //当前元素的左边距
          obj = obj.offsetParent;
        }
      } else if (obj.x) curleft += obj.x;
      return curleft;
    },
    // 获取Y坐标
    findPosY(obj) {
      var curtop = 0;

      if (obj.offsetParent) {
        while (obj.offsetParent) {
          curtop += obj.offsetTop;
          obj = obj.offsetParent;
        }
      } else if (obj.y) curtop += obj.y;
      return curtop;
    },
    // 向下合并新思路，通过坐标找位置
    mergeBottomPosStyle(tri, tdi) {
        console.log(tri,tdi)
         console.log("坐标",this.currentTdX, this.currentTdY);
      console.log("宽高",this.currentTdW, this.currentTdH);
      let bottomTdY = this.currentTdY+this.currentTdH
      console.log("下一格td的currentTdY",bottomTdY)
      let bottomTdX = this.currentTdX
      console.log("下一格td的currentTdX",bottomTdX)
      let deleteTdIndex = 0
      let deleteTrIndex = 0
      let deleteTdRowspan = 1  //缓存删除格的rowspan
    //   let deleteTdTopRowspan = 1
    //   let currentGe = undefined    //定义当前格
      this.tableData.trArr.forEach((tr, indexTr) => {
            tr.tdArr.forEach((td, indexTd) => {
                if((td.currentPosX===bottomTdX) && (td.currentPosY===bottomTdY)){
                    // 找到当前格
                    // this.currentGe = this.tableData.trArr[indexTr-this.deleteTdTopRowspan].tdArr[deleteTdIndex] //当前格
                    // 通过坐标和当前格所占的高度找到要删除的那一格,缓存索引和该格的rowspan
                    console.log("下一格的索引（删除的td）", indexTr+this.currentGe.rowspan-1, indexTd)
                    deleteTdIndex = indexTd
                    deleteTrIndex = indexTr
                    deleteTdRowspan = td.rowspan
                    console.log("当前格", this.currentGe)
                    console.log("当前格SPAN", this.currentGe.rowspan)
                }
            })
        })

        console.log("当前格的高度", this.currentTdH)
        console.log("被合并的那格rowspan", deleteTdRowspan)
        console.log("删除格的坐标索引", deleteTrIndex, deleteTdIndex)
        console.log("被合并td的上一格", this.currentGe)
        console.log("最终rowspan", this.currentGe.rowspan+1)
        // 删除目标格
        this.tableData.trArr[deleteTrIndex].tdArr.splice(deleteTdIndex,1)
        // 合并后改变当前格的rowspan

console.log("当前格格", this.currentGe)
        this.currentGe.rowspan = this.currentGe.rowspan + deleteTdRowspan

        // 合并之后坐标发生变化，重新绑定坐标属性
        this.resourceDataChange(this.tableData)


    //   遍历所有td节点（更准确)
    // console.log(this.$refs.visual_table.childNodes[0].childNodes)
    // // 获取所有tr节点
    // let allTrArr = this.$refs.visual_table.childNodes[0].childNodes
    // allTrArr.forEach((tr, trIndex) => {
    //     console.log("tr的子元素",tr.childNodes)
    //     tr.childNodes.forEach((td, tdIndex) => {
    //         console.log("td元素",td.offsetHeight)
    //         console.log("td元素坐标", this.findPosX(td), this.findPosY(td))
    //         console.log("td元素正对着的下一格坐标", bottomTdX, bottomTdY)

    //         if((bottomTdX === this.findPosX(td)) && bottomTdY === this.findPosY(td)) {
    //             console.log("这就是正对着的下一格",this.findPosX(td), this.findPosY(td))
    //             this.tableData.trArr[trIndex].tdArr[tdIndex]
    //         }
    //     })
    // })



    },
    add(tdi) {
      this.tableData.trArr.forEach((itemTr, indexTr) => {
        itemTr.tdArr.splice(tdi, 0, {
          id: new Date() + indexTr,
          name: "增加",
          value: "100",
          width: "100",
          class: "#fff",
          rowspan: 1,
          colspan: 1,
        });
      });
    },
    addBottom() {
      this.tableData.trArr.push(
        this.tableData.trArr[this.tableData.trArr.length - 1]
      );
    },
    del(tri, tdi) {
      this.tableData.trArr.forEach((itemTr, indexTr) => {
        if (indexTr === tri) {
          itemTr.tdArr.splice(tdi, 1);
        }
      });
    },
    handleHover(tri, tdi) {
      console.log(tri,tdi);
    //   this.currentHoverTrIndex = tri;
    //   this.currentHoverTdIndex = tdi;
    },
    // 向后合并
    mergeRight(tri, tdi) {
      // 1.先判断后面一格的rowspan是否等于当前格的rowspan（相等才允许合并----前提是有右一格）
      let currentGeRowspan = this.tableData.trArr[tri].tdArr[tdi].rowspan;
      // let rightGeRowspan = this.tableData.trArr[tri].tdArr[tdi+1].rowspan
      // 解决右一格没有的情况
      let rightGeRowspan = 0;
      if (this.tableData.trArr[tri].tdArr[tdi + 1]) {
        rightGeRowspan = this.tableData.trArr[tri].tdArr[tdi + 1].rowspan;
      }

      if (currentGeRowspan === rightGeRowspan && rightGeRowspan) {
        this.tableData.trArr.forEach((itemTr, indexTr) => {
          // 定位到当前行
          if (indexTr === tri) {
            // itemTr.tdArr.splice(tdi+1, 1)
            itemTr.tdArr.forEach((itemTd, indexTd) => {
              // 定位到当前格
              if (indexTd === tdi) {
                // 2.向后合并后---当前格的colspan = 当前格的colspan + 右一格的colspan
                itemTd.colspan =
                  itemTd.colspan + itemTr.tdArr[indexTd + 1].colspan;
              }
            });
            // 3.合并之后删除后一个
            itemTr.tdArr.splice(tdi + 1, 1);
          }
        });
      } else {
        this.$message.error("前后高度不一致，当前不允许向后合并！");
      }
    },
    // 向下合并
    mergeBottom(tri, tdi) {
      let nextRowCurrentGeRowspan = 1; //定义下一行的当前格的rowspan值，默认为1
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
              console.log("向下合并");
              console.log(itemTd.rowspan);
              console.log("向下合并");
              // nextRowCurrentGeRowspan = itemTr.tdArr[indexTd+1].rowspan

              // 当前格的rowspan加上下一行当前格的rowspan
              // 获取下一行的当前格(下一行不一定是index+1，因该是index+当前格的rowspan)
              let currentGeRowspan = itemTd.rowspan;
              // nextRowCurrentGeRowspan = this.tableData.trArr[indexTr+1].tdArr[indexTd].rowspan
              nextRowCurrentGeRowspan = this.tableData.trArr[
                indexTr + currentGeRowspan
              ].tdArr[indexTd].rowspan;
              console.log(nextRowCurrentGeRowspan);
              // itemTd.rowspan = itemTd.rowspan+nextRowCurrentGeRowspan
              itemTd.rowspan = itemTd.rowspan + nextRowCurrentGeRowspan;
              // 如果处于第一行
              if (indexTr === 0 && nextRowCurrentGeRowspan === 1) {
                this.tableData.trArr[itemTd.rowspan - 1].tdArr.splice(tdi, 1);
              } else {
                // 如果下一行的rowspan为1
                if (nextRowCurrentGeRowspan === 1) {
                  console.log(1111111111);
                  // let aaa = this.tableData.trArr[indexTr].tdArr[tdi].rowspan
                  this.tableData.trArr[
                    indexTr + itemTd.rowspan - 1
                  ].tdArr.splice(tdi, 1);
                } else if (
                  nextRowCurrentGeRowspan > 1 &&
                  nextRowCurrentGeRowspan < 3
                ) {
                  //   for循环控制当前格包含的rowspan，跨几格，删几格
                  //  不用for循环的话，当前格为一格向下合并没问题，当前格大于一格，删少了
                  for (let i = 1; i < nextRowCurrentGeRowspan; i++) {
                    console.log("遍历删除");
                    console.log(indexTr);
                    console.log(i);
                    this.tableData.trArr[
                      indexTr + currentGeRowspan - 1 + i
                    ].tdArr.splice(tdi, 1);
                  }
                  console.log(">>>>>>>>>>>>>>>>1111111111");
                  // this.tableData.trArr[indexTr+itemTd.rowspan-1].tdArr.splice(tdi, 1)
                } else if (nextRowCurrentGeRowspan > 2) {
                  //  for(let i=1; i<nextRowCurrentGeRowspan; i++) {
                  //   console.log("遍历删除")
                  //   console.log(indexTr)
                  //   console.log(i)
                  //   this.tableData.trArr[indexTr+i-1].tdArr.splice(tdi, 1)
                  // }
                  this.tableData.trArr[indexTr + currentGeRowspan].tdArr.splice(
                    tdi,
                    1
                  );
                  console.log(">>>>>>>>>>>>>>>>222222222222222");
                  // this.tableData.trArr[indexTr+itemTd.rowspan-1].tdArr.splice(tdi, 1)
                }

                // for(let i=nextRowCurrentGeRowspan; i>0; i--) {
                //   console.log("遍历删除")
                //   console.log(indexTr)
                //   console.log(i)
                //   this.tableData.trArr[indexTr+itemTd.rowspan-i].tdArr.splice(tdi, 1)
                // }
              }
            }
          });
          console.log("eeeeeee");
          console.log(itemTr.tdArr);
          // for(let i=nextRowCurrentGeRowspan; i>0; i--) {
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
        console.log(this.tableData.trArr);
      });
    },
    // 测试向下合并
    mergeBottomtest(tri, tdi) {
      console.log(tri, tdi);
      this.tableData.trArr.forEach((itemTr, indexTr) => {
        // 定位到当前行
        if (indexTr === tri) {
          itemTr.tdArr.forEach((itemTd, indexTd) => {
            // 定位到当前格
            if (indexTd === tdi) {
              //1.先删除下一行当前格(注意先保留删除的这一格的rowspan)
              //(算法:特别注意,下一行的当前格不一定等于正对着下一格,有可能前面被向下合并过,那就删的是下一行当前格后面的td)
              // let WillDeleteGe =  this.tableData.trArr[tri+itemTd.rowspan].tdArr[tdi]  //将要删除的一格(前面被向下合并过使用tdi就有bug)
              // 前面被向下合并过: 使用tdi不能定位到当前行正对着的下一格,需判断当前格之前是否有发生过合并.
              // 如何判断当前格和将要删除的格处于正对着的状态??????
              // 1.1
              // 行不通的思路一：
              //   判断当前行td的个数和将要删除的格所在行td的个数.(个数相等说明没有合并过)
              // if(itemTr.tdArr.length === this.tableData.trArr[tri+itemTd.rowspan].tdArr.length){
              //   console.log("没有合并过")
              // }else{
              //   console.log("合并过")
              // }
              // 刚写完注释发现这种方式不可靠. 举个栗子:
              // 当前格前面合并过,下一行的当前格后面合并过.
              let WillDeleteGe = this.tableData.trArr[tri + itemTd.rowspan]
                .tdArr[tdi]; //将要删除的一格
              // 1.1
              //  遍历当前格所在行前面的所有td,找出有向下合并过的td,且合并过的td延申到了下一行当前格前面的td中去了.
              let rowspanAllHeight = itemTd.rowspan + WillDeleteGe.rowspan;
              console.log("总高度", rowspanAllHeight);

              // 下面的行也应该遍历，要遍历到被合并的那一行
              //1.2遍历每一行前面的td（两层遍历）
              // 先获取所有需要遍历的行(应该从行索引0开始，上面的也有可能合并过)

              // ------------------------------------版本1.1----------------------------------
              // let currentRowAllTr = JSON.parse(JSON.stringify(this.tableData.trArr)).splice(indexTr,itemTd.rowspan+1)

              // 版本2.1.-----------------------------版本2.1----------------------------------
              let currentRowAllTr = JSON.parse(
                JSON.stringify(this.tableData.trArr)
              ).splice(0, itemTd.rowspan + 1);
              // ---------------------------------------------------------------

              console.log("当前需要遍历的行", currentRowAllTr);

              // 版本2.2.-----------------------------版本2.2----------------------------------
              let mergeAllArr = [];
              // 遍历所有行
              currentRowAllTr.forEach((everyTr) => {
                // 1.3获取当前行所有需要遍历的td(当前格所在行前面的所有td)
                let beforeTdArr = everyTr.tdArr.splice(0, indexTd);
                // let currentRowAllTd = JSON.parse(JSON.stringify(this.tableData.trArr[tri].tdArr))  //拷贝当前行的所有td
                // let beforeTdArr = currentRowAllTd.splice(0,indexTd)    //当前格所在行的所有td

                console.log("当前格所在行之前的所有td", beforeTdArr);

                // 此处遍历的是当前行前面的所有td，
                // let ismerge = beforeTdArr.filter(item => {
                //   console.log('每一项的',item.rowspan)
                //   return rowspanAllHeight <= item.rowspan
                // })
                // 下面的行也应该遍历，要遍历到被合并的那一行
                //1.2遍历每一行前面的td（两层遍历）

                let ismerge = beforeTdArr.filter((item) => {
                  console.log("每一项的", item.rowspan);
                  console.log(rowspanAllHeight, item.rowspan);

                  return rowspanAllHeight <= item.rowspan;
                });
                console.log("ismerge", ismerge);
                mergeAllArr = [...mergeAllArr, ...ismerge];
              });

              let storgeDeleteGeRowspan = WillDeleteGe.rowspan;
              console.log("删除的这一格处于行的索引", tri + itemTd.rowspan);
              console.log("删除的这一格的rowspan", storgeDeleteGeRowspan);
              let WillDeleteGeIndex = this.tableData.trArr[
                tri + itemTd.rowspan
              ].tdArr.indexOf(WillDeleteGe);
              console.log("当前格的td索引", indexTd);
              console.log("删除的这一格的td索引", WillDeleteGeIndex);
              // 行不通的思路二：
              // 需判断当前格之前是否有发生过合并 (当前格处于td索引是否等于合并这格的td索引)  相等也可能合并过，不相等也可能正对着
              // if(indexTd !== WillDeleteGeIndex) {
              console.log("前面合并过的个数", mergeAllArr);

              // 思路三：判断当前格之前的所有td，并且遍历当前行之前的所有行，找出合并过的个数，如果合并过的rowspan>=rowspanAllHeight，统计个数。
              if (mergeAllArr.length) {
                // 合并过执行
                console.log("前面有合并过");
                let storgeDeleteTd = this.tableData.trArr[tri + itemTd.rowspan]
                  .tdArr[tdi - mergeAllArr.length]; //缓存将要删除的一格
                this.tableData.trArr[tri + itemTd.rowspan].tdArr.splice(
                  tdi - mergeAllArr.length,
                  1
                );

                itemTd.rowspan = itemTd.rowspan + storgeDeleteTd.rowspan;
              } else {
                // 无合并执行
                console.log("前面没有合并过");
                this.tableData.trArr[tri + itemTd.rowspan].tdArr.splice(tdi, 1);
                // 2.向下合并后---当前格的rowspan = 当前格的rowspan + 下一行的当前格rowspan (当前存储的storgeDeleteGeRowspan)
                itemTd.rowspan = itemTd.rowspan + storgeDeleteGeRowspan;
              }

              // ---------------------------------------------------------------

              // 好的注释1
              // ------------------------------------版本1.2----------------------------------
              // let currentRowAllTd = JSON.parse(JSON.stringify(this.tableData.trArr[tri].tdArr))  //拷贝当前行的所有td
              // let beforeTdArr = currentRowAllTd.splice(0,indexTd)    //当前格所在行的所有td
              // console.log("当前格所在行之前的所有td", beforeTdArr)

              // // 此处遍历的是当前行前面的所有td，
              // // let ismerge = beforeTdArr.filter(item => {
              // //   console.log('每一项的',item.rowspan)
              // //   return rowspanAllHeight <= item.rowspan
              // // })
              // // 下面的行也应该遍历，要遍历到被合并的那一行
              // //1.2遍历每一行前面的td（两层遍历）

              // let ismerge = beforeTdArr.filter(item => {
              //   console.log('每一项的',item.rowspan)
              //   return rowspanAllHeight <= item.rowspan
              // })
              // 好的注释1

              // 好的注释2
              // let storgeDeleteGeRowspan = WillDeleteGe.rowspan
              // console.log("删除的这一格处于行的索引", tri+itemTd.rowspan)
              // console.log('删除的这一格的rowspan',storgeDeleteGeRowspan)
              // let WillDeleteGeIndex = this.tableData.trArr[tri+itemTd.rowspan].tdArr.indexOf(WillDeleteGe)
              // console.log('当前格的td索引',indexTd)
              // console.log('删除的这一格的td索引',WillDeleteGeIndex)
              //   //需判断当前格之前是否有发生过合并 (当前格处于td索引是否等于合并这格的td索引)
              //   // if(indexTd !== WillDeleteGeIndex) {
              //   if(ismerge.length) {
              //     // 合并过执行
              //     console.log("前面有合并过")
              //     let storgeDeleteTd =  this.tableData.trArr[tri+itemTd.rowspan].tdArr[tdi-ismerge.length] //缓存将要删除的一格
              //     this.tableData.trArr[tri+itemTd.rowspan].tdArr.splice(tdi-ismerge.length, 1)

              //     itemTd.rowspan = itemTd.rowspan + storgeDeleteTd.rowspan
              //   } else{
              //     // 无合并执行
              //     console.log("前面没有合并过")
              //     this.tableData.trArr[tri+itemTd.rowspan].tdArr.splice(tdi, 1)
              //     // 2.向下合并后---当前格的rowspan = 当前格的rowspan + 下一行的当前格rowspan (当前存储的storgeDeleteGeRowspan)
              //     itemTd.rowspan = itemTd.rowspan + storgeDeleteGeRowspan
              //   }

              // ------------------------------------版本1.2----------------------------------
              // 好的注释2

              // 3.合并之后
              // console.log("第几行", tri+itemTd.rowspan)
            }
          });
        }
      });
    },
    // 配置表格行
    changeRows(e) {
      console.log(111);
      console.log(e);

      if (e > this.tableData.trArr.length) {
        let maxRows = e - this.tableData.trArr.length;
        for (let i = 0; i < maxRows; i++) {
          this.tableData.trArr.push({
            id: new Date() + i,
            tdArr: [
              {
                name: "aaa",
                value: "姓名",
                width: "100",
                class: "#fff",
                rowspan: 1,
                colspan: 1,
              },
              {
                name: "bbb",
                value: "张三",
                width: "100",
                class: "#fff",
                rowspan: 1,
                colspan: 1,
              },
            ],
          });
        }
        //   对新数据增加坐标属性
    // this.resourceDataChange(this.tableData)
      } else if (e < this.tableData.trArr.length) {
        this.tableData.trArr.length = e;
      }
    },
    changeCols(e) {
      console.log(111);
      console.log(e);
      this.tableData.trArr.forEach((itemTr) => {
        if (e > itemTr.tdArr.length) {
          let maxRows = e - itemTr.tdArr.length;
          for (let i = 0; i < maxRows; i++) {
            itemTr.tdArr.push({
              name: "aaa",
              value: "姓名",
              width: "100",
              class: "#fff",
              rowspan: 1,
              colspan: 1,
            });
          }
        } else if (e < itemTr.tdArr.length) {
          itemTr.tdArr.length = e;
        }
      });
      //   对新数据增加坐标属性
    // this.resourceDataChange(this.tableData)
    },
    save() {
      // 遍历所有的tr
      this.tableData.trArr.forEach((itemTr, indexTr) => {
        if (indexTr === this.currentTrIndex) {
          itemTr.tdArr.forEach((itemTd, indexTd) => {
            if (indexTd === this.currentTdIndex) {
              itemTd.value = this.bindData.trLabel;
              itemTd.rowWidth = this.bindData.rowWidth;
              itemTd.class = this.bindData.trClass;
              itemTd.tdBgStyle = this.bindData.tdBgStyle;
              itemTd.tdColor = this.bindData.tdColor;
              itemTd.tdFont = this.bindData.tdFont;
            }
          });
        }
      });
    },
    //   重新设计
    reDesign() {
      //  恢复元数据
      this.tableData = this.copyTableData;
      //  恢复行，列
      this.bindTableData.rows = this.bindTableData.cols = 2;
    },
    //   效果预览
    preview() {
      // query格式是url传参,长度受到限制.
      // let routeData = this.$router.resolve({ path: '/preview',query:this.tableData.trArr });
      localStorage.setItem("jsonData", JSON.stringify(this.tableData.trArr));
      let routeData = this.$router.resolve({ name: "preview" });
      window.open(routeData.href, "_blank");
      // this.$router.push({path: '/preview',query:this.tableData.trArr})
    },
    //   显示JSON数据
    showJson() {
      this.isShowJsonDialog = true;
    },
    //   导入JSON数据
    importJson() {
      this.importJsonData = "";
      this.isImportJsonDialog = true;
    },
    //   导入JSON数据提交
    importJsonSubmit() {
      if (this.importJsonData) {
        console.log("eeee");
        console.log(JSON.parse(this.importJsonData));
        this.tableData = JSON.parse(this.importJsonData);
      }
      this.isImportJsonDialog = false;
      // 重置行显示
      this.bindTableData.rows = this.tableData.trArr.length;
      // 重置列显示（显示最多的列）
      let maxCol = 1;
      this.tableData.trArr.forEach((trItem) => {
        if (trItem.tdArr.length > maxCol) {
          maxCol = trItem.tdArr.length;
        }
      });
      this.bindTableData.cols = maxCol;
    },
  },
  computed: {
    JsonData() {
      return JSON.stringify(this.tableData, null, 4);
    },
  },
  watch:{
    'bindTableData.rows': {
        handler(newName, oldName) {
            console.log("变化了", newName, oldName)
            console.log(this.bindTableData.rows)
            // this.resourceDataChange(this.tableData)

        },
        deep: true,
        immediate: true
    },
    // 'bindTableData.cols': {
    //     handler(newName, oldName) {
    //         console.log("变化了", newName, oldName)
    //         this.resourceDataChange(this.tableData)

    //     },
    //     deep: true,
    //     immediate: true
    // }
}
};
</script>

<style>
.top {
  width: 100%;
  height: 50px;
  border-bottom: 1px solid #e6e6e6;
  display: flex;
  justify-content: flex-end;
}
.top .el-button {
  height: 40px;
}
.el-tabs {
  margin-left: 20px;
}
.el-tabs--top .el-tabs__item.is-top:nth-child(2) {
  padding-left: 60px !important;
}
/* .el-tabs__active-bar{
  left:70px !important;
} */
table {
  /* border: 1px solid #dadada; */
  border-color: #e6e6e6;
}
td,
.center {
  text-align: center;
  font-size: 15px;
  color: #666;
}
.inputNum {
  width: 40%;
  display: inline-block;
}
.inputNum input {
  width: 50px;
}
.el-dialog {
  width: 70% !important;
  height: 70vh;
}
.el-dialog .el-dialog__body {
  height: 70%;
}
.el-dialog .el-dialog__body .el-textarea,
.el-dialog .el-dialog__body .el-textarea .el-textarea__inner {
  height: 100%;
  color: #409eff;
  font-weight: 500;
}
</style>
