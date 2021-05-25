//JD不定时热更新活动页，请关注脚本更新
//遇到问题请在发布页留言：
//https://blog.chrxw.com/archives/1970/01/01/1570.html
//Ver 1.1 2021.05.25
//By Chr_(chr@chrxw.com) 
//========================= 
//更新日志
//重写了判定代码,执行速度更快了
//修复无法返回的问题
//========================= 
//功能配置
//自动加入会员（改成1启用) 
let auto_join_vip = 0;
//自动完成加购任务（改成1启用) 
let auto_add_cart = 0;
//延时时间倍率（倍数越大延时越久) 
let sleep_t = 1.0;
//========================= 

auto.waitFor();
console.show();

toastLog('\n脚本开始运行\n请切换到任务页\nBy Chr_');
for (let i = 0; i < 10; i++) {
    //等待切换到任务页 
    if (text("打怪兽分红包").exists() &&
        text("做任务领金币").exists()) {
        break;
    }
    rsleep(1);
}
if (!textStartsWith("邀请好友助力").exists()) {
    advclick(text("做任务领金币").findOnce());
}

toastLog("\n即将开始工作\n中途需退出请按【音量+】终止");

sleep(1000);

for (; ;) {
    let flag = false;
    // let skip = false;
    let tasks = textStartsWith("邀请好友助力").findOnce().parent().parent().children();
    // for (let i = 0; i < tasks.length; i++) { // 限时任务(不清楚还有没有)
    //     if (tasks[i].childCount() == 5) {
    //         tasks[i].child(4).click();
    //         rsleep(1);
    //         advback();
    //         skip = true;
    //     }
    // }
    // if (skip) {
    //     continue;
    // }
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].length < 4) {
            for (let j = 0; j < tasks[i].childCount(); j++) {
                log(tasks[i].child(j).text());
            }
            continue;
        }
        let desc;
        let title;
        try {
            desc = tasks[i].child(2).text();
            title = tasks[i].child(1).text();
        } catch (e) {
            log(e);
            continue;
        }
        let btn = tasks[i].child(3);

        log(i, desc);

        if (desc.search("8秒") != -1) {
            if (checks(title)) {
                advclick(btn);
                view();
                flag = true;
            }
        } else if (desc.search("并关注") != -1) {
            if (checks(title)) {
                advclick(btn);
                log('view');
                view();
                flag = true;
            }
        } else if (desc.search("逛店") != -1) {
            if (checks(title)) {
                advclick(btn);
                view3();
                flag = true;
            }
        } else if (auto_join_vip && desc.search("成功入会") != -1) {
            if (checks(title)) {
                advclick(btn);
                view3();
                flag = true;
            }
        } else if (auto_add_cart && desc.search("5个") != -1) {
            if (checks(title)) {
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
        // console.hide();
        break;
    }
}
//检查任务是否完成
function checks(title) {
    let match = title.match(/(\d+)\/(\d+)/);
    if (match) {
        let a = Number(match[1]);
        let b = Number(match[2]);
        // log(a, b, a < b);
        return a < b;
    } else {
        return false;
    }
}
//模拟浏览（浏览会场任务） 
function view() {
    rsleep(3);
    let i = 0;
    while (!textMatches("获得\\d+金币").exists() && i++ < 8) {
        if (desc("关闭页面").exists()) {
            desc("关闭页面").findOnce().click();
        }
        rslide(1);
    }
    rslideR(1);
    advback2();
}
//模拟浏览（直接返回） 
function view2() {
    rsleep(2);
    back();
}
//模拟浏览（开卡） 
function view3() {
    rsleep(2);
    let btn = className("android.view.View").text("确认授权并加入店铺会员").findOne(5000);
    if (btn) {
        advclick(btn);
        rsleep(3);
    } else {
        rslide(1);
        rsleep(1);
    }
    advback();
}
//模拟浏览（浏览商品、加购任务） 
function view4() {
    className("android.view.View").textMatches("^¥[0-9]+\.[0-9][0-9]").untilFind();

    let add_cart = true;
    let count = 4;
    if (className("android.view.View").text("任意浏览以下5个商品").exists()) {
        add_cart = false;
        count = 4;
    } else {
        add_cart = true;
        count = 5;
    }
    log(add_cart ? "加购模式" : "浏览模式");
    for (let i = 0; i < 5; i++) {

        let prices = className("android.view.View").textMatches("^¥[0-9]+\.[0-9][0-9]").untilFind();

        log(i, prices[i].text());

        let good = prices[i].parent();
        if (good.childCount() != count) {
            log('已完成，跳过');
            continue;
        }
        if (!add_cart) {
            advclick(good);
            rsleep(1);
            rslide(1);
            className("android.widget.ImageView").desc("返回").click();
        } else {
            good.child(4).click();
            rsleep(1);
            className("android.widget.ImageView").desc("返回").click();
        } rslide(1);
        rsleep(2);
    }
    advback();
    rsleep(3);
}
//随机延时 
function rsleep(s) {
    while (s--) {
        let t = random(900, 1200) * sleep_t;
        sleep(t);
    }
}
//模拟返回 
function advback() {
    if (text("做任务领金币").exists()) {
        return;
    }
    for (let i = 0; i < 3; i++) {
        if (!className("android.widget.ImageView").desc("返回").exists()) {
            rslideR(1);
            rsleep(2);
            continue;
        }
        className("android.widget.ImageView").desc("返回").click();
        rsleep(3);
        if (text("做任务领金币").exists()) {
            return;
        }
    }
    log("定位不到返回按钮，模拟返回键");
    back();
}
//模拟返回 
function advback2() {
    if (text("做任务领金币").exists()) {
        return;
    }
    for (let i = 0; i < 3; i++) {
        if (!textMatches("获得\\d+金币").exists()) {
            rslideR(1);
            rsleep(2);
            continue;
        }
        advclick(textMatches("获得\\d+金币").findOnce());
        rsleep(5);
        if (text("做任务领金币").exists()) {
            return;
        }
    }
    log("定位不到返回按钮，模拟返回键");
    back();
}
//随机划屏 
function rslide(i) {
    while (i--) {
        let x1 = random(300, 800);
        let y1 = random(1200, 1900);
        let x2 = random(300, 800);
        let y2 = random(1000, 1200);
        swipe(x1, y1, x2, y2, 300);
        rsleep(1);
    }
}
//随机划屏，反向 
function rslideR(i) {
    while (i--) {
        let x1 = random(300, 800);
        let y1 = random(900, 1300);
        let x2 = random(300, 800);
        let y2 = random(1500, 1900);
        swipe(x1, y1, x2, y2, 300);
        rsleep(1);
    }
}
//模拟点击
function advclick(uiobject) {
    let rect = uiobject.bounds();
    click(rect.centerX(), rect.centerY());
}
