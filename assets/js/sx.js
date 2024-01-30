!function () {
    function j(i) {
        return document.getElementsByTagName(i);  //函数j用于获得文档的所有i元素标签，返回类型为HTMLCollection 
    }

    function o(w, v, i) {  
        return w.getAttribute(v) || i;  
    }

    function l() {
        var i = j("script"), w = i.length, v = i[w - 1];  //i、w、v是局部变量，由于i得到的是script标签，所以以下对象属性都是不存在的，只采用默认值
        return {l: w, z: o(v, "zIndex", -1), o: o(v, "opacity", 1), c: o(v, "color", "0,255,255"), n: o(v, "count", 400)};  //构建l对象，它有l、z、o、c、n五个属性
    }

    function k() {
        r = u.width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;  //r是window窗口的宽
        n = u.height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;  //n是window窗口的高
    }

    function b() {
        e.clearRect(0, 0, r, n);  //先清除画布
        var w = [f].concat(t);  //[f]直接用f创建了一个数组，并和数组t合并，w数组的首个元素就是鼠标状态
        var x, v, A, B, z, y;
        t.forEach(function (i) {
            i.x += i.xa, i.y += i.ya;  //更新i.x和i.y,为其赋予一个初始移动
			i.xa *= i.x > r || i.x < 0 ? -1 : 1;  //如果超过画布，就将初始移动变成负，使其反弹
			i.ya *= i.y > n || i.y < 0 ? -1 : 1;  //如果超过画布，就将初始移动变成负，使其反弹
			e.fillRect(i.x - 0.5, i.y - 0.5, 1, 1);  //在i.x和i.y的位置画一个1和1像素的矩形，并且是从左上角开始，这样矩形的中心就是点的原始位置
            for (v = 0; v < w.length; v++) {
                x = w[v];
                if (i !== x && null !== x.x && null !== x.y) {  //这里的i是数组t中的元素，x是数组w中的元素，当f中含有空值时，就跳过，即鼠标移出，不执行首次
                    B = i.x - x.x;
					z = i.y - x.y;
					y = B * B + z * z; //根据直角三角形定理得到y是直线距离的平方
                    y < x.max && (  //以下部分都不可以使用";"分隔,因为其本质是一个&&语句,且并不考虑返回，而只考虑操作
						x === f && y >= x.max / 2 && (  //使用&&作为条件判断，和javascript的真值形式有关
							i.x -= 0.03 * B, i.y -= 0.03 * z  //当鼠标移入时，就在一定范围内给其一个反向量，抵消之前的正向量，使其粘合
						),  //这部分为false不会影响到下一部分，因为他们是在括号内，而不是用&&连接
                        A = (x.max - y) / x.max,  
                        e.beginPath(),
                        e.lineWidth = A / 2,
                        e.strokeStyle = "rgba(" + s.c + "," + (A + 0.2) + ")",
                        e.moveTo(i.x, i.y),
                        e.lineTo(x.x, x.y),
                        e.stroke()
					)
                }
            }
            w.splice(w.indexOf(i), 1); //删除w数组中i的位置,这样i元素和x元素的连线就不会重复，且不会删除f元素
        });  //只有在括号语句结束时，才可以用分号
		m(b);  //b是function b()
    }

    var u = document.createElement("canvas"), s = l(), c = "c_n" + s.l, e = u.getContext("2d"), r, n;   //其中定义的u、s、c、e、r、n都是全局变量，e的作用是创建画布
    m = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (i) {window.setTimeout(i, 1000 / 45)}; //匿名函数。有一个参数i，执行代码块setTimeout
    a = Math.random; f = {x: null, y: null, max: 20000};  //定义a、f,其中a只是赋予了一个方法，而不是一个值,他们都是全局变量
    
    u.id = c;  //为u标签添加属性
    u.style.cssText = "position:fixed;top:0;left:0;z-index:" + s.z + ";opacity:" + s.o; //为u标签添加属性，其中style是基本属性，cssText是内联样式，这里用来赋值，即设置Css属性

    j("body")[0].appendChild(u);
    k();

    window.onresize = k;  //这里的k是作为function的k(),事件的赋值是有区别的，不能加()否则会直接调用
    window.onmousemove = function (i) {  //执行一个匿名函数，而不是直接执行初始函数，这个匿名函数会产生一个全局变量的i，不同于上面的i
        i = i || event || window.event;
        f.x = i.clientX; 
        f.y = i.clientY;
    }
    window.onmouseout = function () {  //当鼠标移出时，初始化f对象
        f.x = null; 
        f.y = null;
    }

    var t = [] //数组t中储存了随机生成的点
    for (p = 0; s.n > p; p++) { //s.n的值是400默认
        var h = a() * r, g = a() * n, q = 2 * a() - 1, d = 2 * a() - 1;
        t.push({x: h, y: g, xa: q, ya: d, max: 6000});  //向t中添加对象，其有x、y、xa、ya、max五个属性
    }
    
    setTimeout(function () {b()}, 100);  //以上是一个匿名函数，函数内容是函数b()
}();
