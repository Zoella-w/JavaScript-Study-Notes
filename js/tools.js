/*      获取样式        */
// 既兼容IE8，又支持其他浏览器
function getStyle(obj, cssName) {
    // 注意没有window，会认为是变量，如果不存在则报错
    // 有window，会认为是属性，如果不存在会返回false
    if (window.getComputedStyle) {
        return getComputedStyle(obj, null)[cssName];
    } else {
        return obj.currentStyle[cssName];
    }
}


/*      移动函数        */
// obj 操作对象
// attr 要执行动画的样式（left，top, width, height）
// speed 为正：向右；为负：向左（在函数内部考虑）
// target 目标位置
// callback 回调函数，在动画执行完毕后执行
function move(obj, attr, speed, target, callback) {

    // 若没有，则不操作
    // 关闭同一元素的上一个定时器
    clearInterval(obj.timer);

    // 元素当前位置
    var current = parseInt(getStyle(obj, attr));
    if (current > target) {
        speed = -speed;
    }

    // 不要使用全局变量保存 timer!
    obj.timer = setInterval(function() {
        var oldValue = parseInt(getStyle(obj, attr));
        var newValue = oldValue + speed;

        if (speed < 0) {
            if (newValue < target) {
                newValue = target;
            }
        } else {
            if (newValue > target) {
                newValue = target;
            }
        }

        obj.style[attr] = newValue + "px";

        if (newValue === target) {
            clearInterval(obj.timer);

            // 传不传callback都可以！
            callback && callback();
        }
    }, 30);
}


/*      判断是否包含        */
function hasClass(obj, cn) {
    var reg = new RegExp("\\b" + cn + "\\b");
    return reg.test(obj.className);
}


/*      添加        */
function addClass(obj, cn) {
    if (!hasClass(obj, cn)) {
        obj.className += " " + cn;
    }
}


/*      删除        */
function removeClass(obj, cn) {
    var reg = new RegExp("\\b" + cn + "\\b");
    // 空串替换要删除的内容
    obj.className = obj.className.replace(reg, "");
}


/*      切换（有：删除  无：添加）      */
function toggleClass(obj, cn) {
    if (hasClass(obj, cn)) {
        removeClass(obj, cn);
    } else {
        addClass(obj, cn);
    }
}