<template>
  <div>
    <h1>近一周订单数量</h1>
    <div id="main" style="width: 600px;height:400px;"></div>
  </div>
</template>
<script>
import echarts from "echarts";
import { mapGetters, mapActions } from "vuex";
export default {
  props: [],
  components: {},
  data() {
    return {
      // option: {
      //   chart:{
      //     type:'line'   //指定图标的类型，默认line折线图
      //   },
      //   title: {
      //     text: "近一周订单数量"   // 标题
      //   },
      //   legend: {
      //     data: ["近一周订单数量"]
      //   },
      //   xAxis: {
      //     data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]   //x轴分类
      //   },
      //   yAxis: {},   // y轴标题
      //   series: [    //数据列
      //     {
      //       name: "近一周订单数量",  //数据名
      //       type: "line",  //数据类型
      //       data: [5, 20, 36, 10, 10, 20]   //数据
      //      }
      //   ]
      // }
    };
  },
  computed: {
    ...mapGetters({
      list: "cate/cateList"
    })
  },
  methods: {
    ...mapActions({
      reqListAction: "cate/reqCateListAction"
    })
  },
  mounted() {
    // // 基于准备好的dom，初始化echarts实例
    // var myChart = echarts.init(document.getElementById("main"));
    // // 使用刚指定的配置项和数据显示图表。
    // myChart.setOption(this.option);
    this.reqListAction()
  },
  watch:{
    list: {
      handler() {
        if (this.list.length > 0) {
          // 基于准备好的dom，初始化echarts实例
          var myChart = echarts.init(document.getElementById("main"));

          // 指定图表的配置项和数据
          var option = {
            title: {
              text: "商品分类",
            },
            tooltip: {},
            legend: {
              data: ["下级分类数量"],
            },
            xAxis: {
              data:this.list.map(item=>item.catename),
              
            },
            yAxis: {},
            series: [
              {
                name: "下级分类数量",
                type: "line",
                data: this.list.map(item=>item.children.length),
              },
            ],
          };

          // 使用刚指定的配置项和数据显示图表。
          myChart.setOption(option);
        }
      },
      deep: true,
    }
 }
}
</script>
<style scoped>
#main {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>