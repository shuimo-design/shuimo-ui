<script>
/**
 * @Description: 控制台打印插件demo
 * @Author: 菩萨蛮
 * @Date: 2021/2/19 3:30 下午
 * @Version v1.0.0
 *
 * 公司的业务千篇一律，复杂的代码好几百行。
 */

export default {
  name: 'PrinterDemo',
  mounted() {
    this.print.suggest('建议');
    this.print.info('信息');
    this.print.error('异常');
  }
};
</script>
