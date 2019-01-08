var utils = {

    cookie: function(name, value, options) {
        if (typeof value != 'undefined') { // name and value given, set cookie
            options = options || {};
            if (value === null) {
                value = '';
                options.expires = -1;
            }
            var expires = '';
            if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
                var date;
                if (typeof options.expires == 'number') {
                    date = new Date();
                    date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
                } else {
                    date = options.expires;
                }
                expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
            }
            var path = options.path ? '; path=' + options.path : '; path=/';
            var domain = options.domain ? '; domain=' + options.domain : '; domain=.rong360.com';
            var secure = options.secure ? '; secure' : '';
            document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
        } else { // only name given, get cookie
            var reg = new RegExp("(?:^| )" + name + "=([^;]*)(;|$)"),
                result = reg.exec(document.cookie);
            return decodeURIComponent((result && result[1]) || '');
        }
    },
    getQueryValue: function(key) {
        var url = document.location.search;
        var reg = new RegExp("(^|&|\\?|#)" + key + "=([^&#]*)(&|\x24|#)", "");
        var match = url.match(reg);
        if (match) {
            return match[2];
        }
        return null;
    },
    emptyObject: function(o) {
        if (o == null || o == undefined) return true;
        if (Object.prototype.toString.call(o) === '[object Array]' && o.length == 0) return true; //空数组
        return Object.keys(o).length >= 1 ? false : true;
    },
    os: function() {
        var t = navigator.userAgent;
        var e = {},
            n = {},
            i = t.match(/WebKit\/([\d.]+)/),
            r = t.match(/(Android)\s+([\d.]+)/),
            o = t.match(/(iPad).*OS\s([\d_]+)/),
            a = !o && t.match(/(iPhone\sOS)\s([\d_]+)/),
            s = t.match(/(webOS|hpwOS)[\s\/]([\d.]+)/),
            u = s && t.match(/TouchPad/),
            c = t.match(/Kindle\/([\d.]+)/),
            l = t.match(/Silk\/([\d._]+)/),
            f = t.match(/(BlackBerry).*Version\/([\d.]+)/),
            h = t.match(/(BB10).*Version\/([\d.]+)/),
            p = t.match(/(RIM\sTablet\sOS)\s([\d.]+)/),
            d = t.match(/PlayBook/),
            m = t.match(/Chrome\/([\d.]+)/) || t.match(/CriOS\/([\d.]+)/),
            v = t.match(/Firefox\/([\d.]+)/);
        (n.webkit = !!i) && (n.version = i[1]),
        r && (e.android = !0,
                e.version = r[2]),
            a && (e.ios = e.iphone = !0,
                e.version = a[2].replace(/_/g, ".")),
            o && (e.ios = e.ipad = !0,
                e.version = o[2].replace(/_/g, ".")),
            s && (e.webos = !0,
                e.version = s[2]),
            u && (e.touchpad = !0),
            f && (e.blackberry = !0,
                e.version = f[2]),
            h && (e.bb10 = !0,
                e.version = h[2]),
            p && (e.rimtabletos = !0,
                e.version = p[2]),
            d && (n.playbook = !0),
            c && (e.kindle = !0,
                e.version = c[1]),
            l && (n.silk = !0,
                n.version = l[1]), !l && e.android && t.match(/Kindle Fire/) && (n.silk = !0),
            m && (n.chrome = !0,
                n.version = m[1]),
            v && (n.firefox = !0,
                n.version = v[1]),
            e.tablet = !!(o || d || r && !t.match(/Mobile/) || v && t.match(/Tablet/)),
            e.phone = !e.tablet && !!(r || a || s || f || h || m && t.match(/Android/) || m && t.match(/CriOS\/([\d.]+)/) || v && t.match(/Mobile/));
        return e;
    },
    ajax: function(params) {
        /* xmlhttprequest 参数说明
		options =  {
		    url:'', //请求地址
		    method:'', //方法
		    datatype: "",//预期服务器返回的数据类型。如果不指定，默认为json,jsonp时为跨域请求
		    jsonp: "", //跨域请求时的回调函数
		    data:'', //参数
		    success:'', //成功回调
		    error: '',//错误回调
		    async:''//是否异步请求
		}
		*/
        params = params || {};
        params.data = params.data || {};
        var json = (params.datatype == 'jsonp') ? jsonp(params) : json(params);


        //非跨域请求
        function json(options) {
            //默认参数
            options.url = options.url || '',
                options.method = options.method && options.method.toLowerCase() || 'get',
                options.data = options.data || '',
                options.success = options.success || '',
                options.error = options.error || '',
                options.async = options.async || true;
            //get请求-拼接url
            if (options.method == 'get') {
                if (typeof options.data == 'object') {
                    var query = [];
                    for (var k in options.data) {
                        query.push(k + '=' + options.data[k]);
                    }
                    options.data = query.join('&');
                }
                options.url += (options.url.indexOf('?' == -1) ? '?' : '') + options.data;
            }
            //post请求-转换字符串
            if (options.method == 'post') {
                if (typeof options.data == 'object') {
                    var arrs = [];
                    for (var k in options.data) {
                        arrs.push(k + '=' + options.data[k]);
                    }
                    options.data = arrs.join('&');
                }
            }
            //创建发送请求
            var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP'); //兼容ie
            //console.log(options.url);
            xhr.open(options.method, options.url, options.async);
            if (options.method == 'post') {
                xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                xhr.send(options.data);
            } else {
                xhr.send(null);
            }
            //异步请求
            if (options.async == true) {
                xhr.onreadystatechange = function() {
                    if (xhr.readyState == 4) {
                        callcall();
                    }
                }
            }
            // xhr.abort(); // 取消异步请求
            //同步请求
            if (options.async == false) {
                callcall();
            }
            //返回状态判断
            function callcall() {
                if (xhr.status == 200) {
                    options.success && typeof options.success == 'function' && options.success(JSON.parse(xhr.responseText));
                } else {
                    options.error && typeof options.error == 'function' && options.error({
                        status: xhr.status,
                        msg: xhr.statusText
                    });
                }
            }

        }


        // jsonp请求  
        function jsonp(params) {
            //创建script标签并加入到页面中 
            var callbackName = 'rong_json' + new Date().getTime();
            var customJsonName = params.jsonp;
            var head = document.getElementsByTagName('head')[0];
            if (typeof customJsonName != 'undefined') {
                callbackName = customJsonName + "_" + callbackName;
            }
            // 设置传递给后台的回调参数名  
            params.data['callback'] = callbackName;
            var data = formatParams(params.data);
            var script = document.createElement('script');
            head.appendChild(script);
            //创建jsonp回调函数  
            window[callbackName] = function(json) {
                head.removeChild(script);
                clearTimeout(script.timer);
                window[callbackName] = null;
                params.success && params.success(json);
            };
            //发送请求  
            if (params.url.indexOf("?") > -1) {
                script.src = params.url + '&' + data;
            } else {
                script.src = params.url + '?' + data;
            }

            //为了得知此次请求是否成功，设置超时处理  
            if (params.time) {
                script.timer = setTimeout(function() {
                    window[callbackName] = null;
                    head.removeChild(script);
                    params.error && params.error({
                        message: '超时'
                    });
                }, time);
            }
        };
        //格式化参数  
        function formatParams(data) {
            var arr = [];
            for (var name in data) {
                arr.push(encodeURIComponent(name) + '=' + encodeURIComponent(data[name]));
            };
            // 添加一个随机数，防止缓存  
            arr.push('v=' + random());
            return arr.join('&');
        }
        // 获取随机数  
        function random() {
            return Math.floor(Math.random() * 10000 + 500);
        }
    }
}

/**
 * @param {String}  errorMessage   错误信息
 * @param {String}  scriptURI      出错的文件
 * @param {Long}    lineNumber     出错代码的行号
 * @param {Long}    columnNumber   出错代码的列号
 * @param {Object}  errorObj       错误的详细信息，Anything
 */
// window.onerror = function(errorMessage, scriptURI, lineNumber,columnNumber,errorObj) { 
//     alert("errorMessage=" + errorMessage +"; scriptURI=" + scriptURI + "; lineNumber=" + lineNumber + "; columnNumber=" + columnNumber + "; errorObj=" + JSON.stringify(errorObj));
// }

/*Object.assign Pollyfill*/
if (typeof Object.assign != 'function') {
    Object.assign = function(target) {
        'use strict';
        if (target == null) {
            throw new TypeError('Cannot convert undefined or null to object');
        }

        target = Object(target);
        for (var index = 1; index < arguments.length; index++) {
            var source = arguments[index];
            if (source != null) {
                for (var key in source) {
                    if (Object.prototype.hasOwnProperty.call(source, key)) {
                        target[key] = source[key];
                    }
                }
            }
        }
        return target;
    };
}
if (!Object.keys) {
    Object.keys = (function() {
        'use strict';
        var hasOwnProperty = Object.prototype.hasOwnProperty,
            hasDontEnumBug = !({ toString: null }).propertyIsEnumerable('toString'),
            dontEnums = [
                'toString',
                'toLocaleString',
                'valueOf',
                'hasOwnProperty',
                'isPrototypeOf',
                'propertyIsEnumerable',
                'constructor'
            ],
            dontEnumsLength = dontEnums.length;

        return function(obj) {
            if (typeof obj !== 'function' && (typeof obj !== 'object' || obj === null)) {
                throw new TypeError('Object.keys called on non-object');
            }

            var result = [],
                prop, i;

            for (prop in obj) {
                if (hasOwnProperty.call(obj, prop)) {
                    result.push(prop);
                }
            }

            if (hasDontEnumBug) {
                for (i = 0; i < dontEnumsLength; i++) {
                    if (hasOwnProperty.call(obj, dontEnums[i])) {
                        result.push(dontEnums[i]);
                    }
                }
            }
            return result;
        };
    }());
}
// https://tc39.github.io/ecma262/#sec-array.prototype.findIndex
if (!Array.prototype.findIndex) {
    Object.defineProperty(Array.prototype, 'findIndex', {
        value: function(predicate) {
            // 1. Let O be ? ToObject(this value).
            if (this == null) {
                throw new TypeError('"this" is null or not defined');
            }

            var o = Object(this);

            // 2. Let len be ? ToLength(? Get(O, "length")).
            var len = o.length >>> 0;

            // 3. If IsCallable(predicate) is false, throw a TypeError exception.
            if (typeof predicate !== 'function') {
                throw new TypeError('predicate must be a function');
            }

            // 4. If thisArg was supplied, let T be thisArg; else let T be undefined.
            var thisArg = arguments[1];

            // 5. Let k be 0.
            var k = 0;

            // 6. Repeat, while k < len
            while (k < len) {
                // a. Let Pk be ! ToString(k).
                // b. Let kValue be ? Get(O, Pk).
                // c. Let testResult be ToBoolean(? Call(predicate, T, « kValue, k, O »)).
                // d. If testResult is true, return k.
                var kValue = o[k];
                if (predicate.call(thisArg, kValue, k, o)) {
                    return k;
                }
                // e. Increase k by 1.
                k++;
            }

            // 7. Return -1.
            return -1;
        }
    });
}

window.utils = utils;