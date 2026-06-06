// 获取 B 站接口返回的原始数据
let body = $response.body;

try {
    let obj = JSON.parse(body);

    if (obj.data) {
        // 1. 过滤底部导航栏 (bottom) 中的“直播”和“消息”
        if (obj.data.bottom) {
            obj.data.bottom = obj.data.bottom.filter(item => item.name !== '直播' && item.name !== '消息');
        }

        // 2. 过滤顶部导航栏 (tab) 中的“直播”和“消息”
        // (有时候 B 站会进行 A/B 测试，把直播放在顶部栏，一并过滤更保险)
        if (obj.data.tab) {
            obj.data.tab = obj.data.tab.filter(item => item.name !== '直播' && item.name !== '消息');
        }
    }

    // 将修改后的数据重新打包返回给 B 站客户端
    $done({ body: JSON.stringify(obj) });
} catch (e) {
    // 遇到异常原样返回，防止 APP 崩溃
    $done({});
}
