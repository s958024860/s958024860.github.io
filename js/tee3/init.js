/**
 * @Author: fzsong3
 * @Date: 2020/6/29 10:01
 * @Description:
 */
const AVDEngine = ModuleBase.use(ModulesEnum.avdEngine)
const avdEngine = window.avdEngine = new AVDEngine()

avdEngine.setLog(Appender.browserConsole, LogLevel.debug)

avdEngine.initDevice();

avdEngine.setBugout('3teelog.txt')

avdEngine.setScreenExtensionFlag('JH_SS_PING')

const version = avdEngine.getVersion();

console.log('tee3 version', version);
//分布式集群部署中，设置加入房间时mcu服务器的分配路由参数，参数值格式参考如：{ip_tag":"local","idc_code":"idc_code"}
//ip_tag  对应于 rtc_node_addr 中的tag标志，用于区分同一台服务器的多网卡地址，可以自定义，然后在参数中传入。举例的话，比如 'local','internal','dianxin','liantong'
//idc_code 对应于 rtc_node 中的 idc_code标志，用于区分不同的服务器，唯一，可以自定义。比如北京服务器设置为'beijing'，杭州的设置为'hangzhou'，然后在参数中传入，用于定位到服务器。
avdEngine.setMcuClusterRouteParams('{"ip_tag":"local","idc_code":"idc_code"}');
