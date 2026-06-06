// 获取 B 站接口返回的原始数据
let body = $response.body;

try {
    let obj = JSON.parse(body);
    
    // 💡 在这里定义你需要屏蔽的所有模块名称
    const hideList = ['直播', '消息', '毕业歌会', '新征程'];
    
    if (obj.data) {
        // 1. 过滤底部导航栏 (bottom)
        if (obj.data.bottom) {
            obj.data.bottom = obj.data.bottom.filter(item => !hideList.includes(item.name));
        }
        
        // 2. 过滤顶部导航栏 (tab)
        if (obj.data.tab) {
            obj.data.tab = obj.data.tab.filter(item => !hideList.includes(item.name));
        }
        
        // 3. 过滤顶部导航栏的备用字段 (top) 
        // B站部分版本的数据结构里顶部栏可能叫 top
        if (obj.data.top) {
            obj.data.top = obj.data.top.filter(item => !hideList.includes(item.name));
        }
    }
    
    // 将修改后的数据重新打包返回给 B 站客户端
    $done({ body: JSON.stringify(obj) });
} catch (e) {
    // 遇到异常原样返回，防止 APP 崩溃
    $done({});
}
