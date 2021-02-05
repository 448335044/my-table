<template>
  <div>
      <!-- <el-button style="float:right;" @click="$router.back()">取消预览</el-button> -->
      <div>
           <table border cellspacing="0"  style="width:100%">
        <tbody>
          <tr v-for="tr in previewData" :key="tr.id">
            <td
            v-for="td in tr.tdArr"
            :key="td.id"
            :class="td.class"
            :style="'backgroundColor:'+td.tdBgStyle+';width:'+td.rowWidth+'px;position:relative;padding:16px 30px;'"
            :colspan="td.colspan"
            :rowspan="td.rowspan">
              <span :style="'fontSize:'+td.tdFont+'px;color:'+td.tdColor+';'">{{td.value}}</span>
            </td>
          </tr>
        </tbody>
      </table>
      </div>
  </div>
</template>

<script>
export default {
    name:'Preview',
    data() {
        return {
            previewData: []
        }
    },
    created() {
        console.log('this.$route.params')

        // this.previewData = this.$route.query
        this.previewData = JSON.parse(localStorage.getItem('jsonData'))
        // this.previewData = JSON.parse(this.$route.params.data)
    }
}
</script>

<style>
    td{
        text-align: center;
    }
</style>