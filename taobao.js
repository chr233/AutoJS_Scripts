//遇到问题请在https://chrxw.com留言

//Ver:0.2 By Chr_(chr@chrxw.com)

//延时倍数，1.0为基准速度，2.0比基准速度慢一倍，其他同理，求稳建议改大点

var sleep_ctrl = 1.2;

auto.waitFor();

var key = new Array("去浏览", "去围观", "去观看");

toast('\n脚本开始运行\n请手动打开任务页\n\n【长时间闲置将自动退出】\n也可以按【音量+】结束运行');

for (var t = 0; t < 20; t++) {

    if (className("android.view.View").text("赚喵币").findOne(3000)) {

        if (!className("android.view.View").text("累计任务奖励").exists()) {

            className("android.view.View").text("赚喵币").findOne().click();

        }

        sleep(1000);

        toast("\n即将开始工作\n中途需退出请按【音量+】终止");

        for (; ;) {

            var btn = null;

            className("android.view.View").text("累计任务奖励").waitFor();

            for (var i = 0; i < key.length; i++) {

                if (text(key[i]).exists()) {

                    btn = text(key[i]).findOne();

                    break;

                } else {

                    i++;

                }

            }

            if (btn != null) {

                btn.click()

         //遇到问题请在https://chrxw.com留言
//Ver:0.2 By Chr_(chr@chrxw.com)
//延时倍数，1.0为基准速度，2.0比基准速度慢一倍，其他同理，求稳建议改大点
var sleep_ctrl = 1.2;
auto.waitFor();
var key = new Array("去浏览", "去围观", "去观看");
toast('\n脚本开始运行\n请手动打开任务页\n\n【长时间闲置将自动退出】\n也可以按【音量+】结束运行');
for (var t = 0; t < 20; t++) {
    if (className("android.view.View").text("赚喵币").findOne(3000)) {
        if (!className("android.view.View").text("累计任务奖励").exists()) {
            className("android.view.View").text("赚喵币").findOne().click();
        }
        sleep(1000);
        toast("\n即将开始工作\n中途需退出请按【音量+】终止");
        for (; ;) {
            var btn = null;
            className("android.view.View").text("累计任务奖励").waitFor();
            for (var i = 0; i < key.length; i++) {
                if (text(key[i]).exists()) {
                    btn = text(key[i]).findOne();
                    break;
                } else {
                    i++;
                }
            }
            if (btn != null) {
                btn.click()
                view();
            } else {
                var bc = btn = text('去完成').find();
                var flag = false;
                for (var i = 0; i < bc.length; i++) {
                    var btn = bc[i];
                    var txt = btn.parent().child(0).child(0).text();
                    if (txt.search("逛一逛") != -1) {
                        flag = true;
                        btn.click()
                        view();
                    }
                }

                if (!flag) {
                    toast("\n没有定位到按钮\n可能任务已经完成\n请切换到下一个APP");
                    rsleep(5);
                    break;
                }
            }
        }
    }
}
toast("\n长时间闲置，脚本自动退出");
exit();
//随机延时
function rsleep(s) {
    while (s--) {
        var t = random(900, 1200) * sleep_ctrl;
        sleep(t);
    }
}
//模拟返回
function advback() {
    for (var i = 0; i < 3; i++) {
        // if (!className("android.view.View").desc("返回").exists()) {
        //     rslideR(1);
        //     rsleep(2);
        //     continue;
        // }
        back();
        className("android.view.View").textContains("累计任务奖励").findOne(3000)
        if (className("android.view.View").textContains("累计任务奖励").exists() |
            className("android.view.View").textContains("赚喵币").exists()) {
            return;
        }
    }
}
//随机划屏
function rslide(i) {
    while (i--) {
        var x1 = random(400, 900);
        var y1 = random(1200, 1900);
        var x2 = random(400, 900);
        var y2 = random(1000, 1200);
        swipe(x1, y1, x2, y2, random(100, 300));
        rsleep(2);
    }
}
//随机划屏，反向
function rslideR(i) {
    while (i--) {
        var x1 = random(400, 900);
        var y1 = random(900, 1300);
        var x2 = random(400, 900);
        var y2 = random(1200, 1900);
        swipe(x1, y1, x2, y2, random(100, 300));
        rsleep(2);
    }
}
//模拟浏览（浏览会场任务）
function view() {
    rsleep(5);
    if (className("android.view.View").textContains("今日已达上限").exists()) {
        toast("该账号今日已达上限");
        advback();
        return;
    }
    rslide(8);
    className("android.view.View").textContains("任务完成").findOne(2000);
    rsleep(2);
    advback();
    rsleep(2);
}
