//遇到问题请在 https://chrxw.com 留言
//Ver 0.51 2020.10.25
//By Chr_(chr@chrxw.com)
//=========================
//功能配置
//自动加入会员（设为false禁用)
var auto_join_vip = true;
//自动完成加购任务（设为false禁用)
var auto_add_cart = true;
//=========================
auto.waitFor();
// console.show();
toast('\n脚本开始运行\n请切换到任务页');
for (var i = 0; i < 10; i++) {
    //等待切换到任务页
    if (className("android.view.View").text("收取金币").exists() ||
        className("android.view.View").text("立即解锁").exists()) {
        log('break');
        break;
    }
    rsleep(1);
}

if (!className("android.view.View").textStartsWith("邀请好友助力").exists()) {
    advclick(className("android.view.View").text("领金币").findOnce());
}
toast("\n即将开始工作\n中途需退出请按【音量+】终止");
sleep(2000);
for (; ;) {
    var flag = false;
    var tasks = text("去完成").findOnce().parent().children();
    for (var i = 2; i < tasks.length; i += 4) {
        var txt = tasks[i].text();
        log(txt, i);
        if (txt.search("8秒") != -1) {
            var btn = tasks[i + 1];
            if (btn.text() == "去完成") {
                advclick(btn);
                view();
                flag = true;
            }
        } else if (txt.search("浏览可得") != -1) {
            var btn = tasks[i + 1];
            if (btn.text() == "去完成") {
                advclick(btn);
                view2();
                flag = true;
            }
        } else if (auto_join_vip && txt.search("成功入会可得") != -1) {
            var btn = tasks[i + 1];
            if (btn.text() == "去完成") {
                advclick(btn);
                view3();
                flag = true;
            }
        } else if (auto_add_cart && txt.search("5个") != -1) {
            var btn = tasks[i + 1];
            if (btn.text() == "去完成") {
                advclick(btn);
                view4();
                flag = true;
            }
        }
        if (flag) {
            break;
        }
    }
    if (!flag) {
        toast("\n脚本运行完毕\n模拟浏览任务全部完成（大概）");
        break;
    }
}
//模拟浏览（浏览会场任务）
function view() {
    rsleep(3);
    rslide(10);
    // className("android.widget.Image").text("vk image").findOne(5000);
    rslideR(1);
    rsleep(3);
    advback();
}
//模拟浏览（直接返回）
function view2() {
    rsleep(2);
    back();
    rsleep(2);
}
//模拟浏览（开卡）
function view3() {
    rsleep(2);
    var btn = className("android.view.View").text("确认授权并加入店铺会员").findOne(5000);
    log(btn);
    if (btn) {
        advclick(btn);
        className("android.view.View").text("恭喜您已集齐所有会员卡").findOne(2000);
        rsleep(2);
        advback();
    }
}
//模拟浏览（浏览商品、加购任务）
function view4() {
    rsleep(3);
    var add_cart = true;
    var count = 4;
    if (className("android.view.View").text("任意浏览以下5个商品").exists()) {
        var add_cart = false;
        var count = 4;
    } else {
        var add_cart = true;
        var count = 5;
    }
    log(add_cart ? "加购模式" : "浏览模式");

    for (var i = 0; i < 5; i++) {
        var prices = className("android.view.View").textMatches("^¥[0-9]+\.[0-9][0-9]").untilFind();
        log(i, prices[i].text());
        var good = prices[i].parent().parent();
        if (good.childCount() > count) {
            log('已完成，跳过');
            continue;
        }
        if (!add_cart) {
            advclick(good);
            rsleep(2);
            rslide(1);
            className("android.widget.ImageView").desc("返回").click();
        } else {
            good.child(4).click();
        } rslide(1);
        rsleep(2);
    }
    advback();
    rsleep(3);
}
//随机延时
function rsleep(s) {
    while (s--) {
        sleep(random(900, 1200));
    }
}
//模拟返回
function advback() {
    for (var i = 0; i < 3; i++) {
        if (!className("android.widget.ImageView").desc("返回").exists()) {
            rslideR(1);
            rsleep(2);
            continue;
        }
        className("android.widget.ImageView").desc("返回").click();
        rsleep(5);
        if (className("android.view.View").text("领金币").exists()) {
            return;
        }
    }
    log("定位不到返回按钮，模拟返回键");
    back();
}
//随机划屏
function rslide(i) {
    while (i--) {
        var x1 = random(200, 900);
        var y1 = random(1200, 1900);
        var x2 = random(200, 900);
        var y2 = random(1000, 1200);
        swipe(x1, y1, x2, y2, 300);
        rsleep(1);
    }
}
//随机划屏，反向
function rslideR(i) {
    while (i--) {
        var x1 = random(200, 900);
        var y1 = random(900, 1300);
        var x2 = random(200, 900);
        var y2 = random(1500, 1900);
        swipe(x1, y1, x2, y2, 300);
        rsleep(1);
    }
}
function advclick(uiobject) {
    var rect = uiobject.bounds();
    // var x = random(rect.left, rect.right);
    // var y = random(rect.top, rect.bottom);
    click(rect.centerX(), rect.centerY());
}
