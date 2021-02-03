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
                    :style="'width:'+td.rowWidth+'px;position:relative;padding:16px 30px;'"
                    :colspan="td.colspan"
                    :rowspan="td.rowspan"
                   >
                    {{td.value}}
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
        console.log(JSON.parse(this.$route.query.data))
        // this.previewData = JSON.parse(this.$route.query)
        this.previewData = JSON.parse(this.$route.query.data)
    }
}
</script>

<style>

</style>