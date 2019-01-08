export default{
    //根据身份证计算年龄
    GetAge: function (identityCard) {
        var len = (identityCard + "").length;
        if (len == 0) {
            return 0;
        } else {
            if ((len != 15) && (len != 18))//身份证号码只能为15位或18位其它不合法
            {
                return 0;
            }
        }
        var strBirthday = "";
        if (len == 18)//处理18位的身份证号码从号码中得到生日和性别代码
        {
            strBirthday = identityCard.substr(6, 4) + "/" + identityCard.substr(10, 2) + "/" + identityCard.substr(12, 2);
        }
        if (len == 15) {
            strBirthday = "19" + identityCard.substr(6, 2) + "/" + identityCard.substr(8, 2) + "/" + identityCard.substr(10, 2);
        }
        //时间字符串里，必须是“/”
        var birthDate = new Date(strBirthday);
        var nowDateTime = new Date();
        var age = nowDateTime.getFullYear() - birthDate.getFullYear();
        //再考虑月、天的因素;.getMonth()获取的是从0开始的，这里进行比较，不需要加1
        if (nowDateTime.getMonth() < birthDate.getMonth() || (nowDateTime.getMonth() == birthDate.getMonth() && nowDateTime.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    },
    //根据身份证计算出生日期
    getBirthdayStr: function (identityCard) {
        var len = (identityCard + "").length;
        if (len == 0) {
            return 0;
        } else {
            if ((len != 15) && (len != 18))//身份证号码只能为15位或18位其它不合法
            {
                return 0;
            }
        }
        var strBirthday = "";
        if (len == 18)//处理18位的身份证号码从号码中得到生日和性别代码
        {
            strBirthday = identityCard.substr(6, 4) + "-" + identityCard.substr(10, 2) + "-" + identityCard.substr(12, 2);
        }
        if (len == 15) {
            strBirthday = "19" + identityCard.substr(6, 2) + "-" + identityCard.substr(8, 2) + "-" + identityCard.substr(10, 2);
        }
        return strBirthday;
    },
    //根据出生日期返回年龄
    getAgeByDate(strBirthday) {
        var returnAge;
        var strBirthdayArr = strBirthday.split("-");
        var birthYear = strBirthdayArr[0];
        var birthMonth = strBirthdayArr[1];
        var birthDay = strBirthdayArr[2];

        var d = new Date();
        var nowYear = d.getFullYear();
        var nowMonth = d.getMonth() + 1;
        var nowDay = d.getDate();

        if (nowYear == birthYear) {
            returnAge = 0;//同年 则为0岁
        }
        else {
            var ageDiff = nowYear - birthYear; //年之差
            if (ageDiff > 0) {
                if (nowMonth == birthMonth) {
                    var dayDiff = nowDay - birthDay;//日之差
                    if (dayDiff < 0) {
                        returnAge = ageDiff - 1;
                    }
                    else {
                        returnAge = ageDiff;
                    }
                }
                else {
                    var monthDiff = nowMonth - birthMonth;//月之差
                    if (monthDiff < 0) {
                        returnAge = ageDiff - 1;
                    }
                    else {
                        returnAge = ageDiff;
                    }
                }
            }
            else {
                returnAge = -1;//返回-1 表示出生日期输入错误 晚于今天
            }
        }
        return returnAge;//返回周岁年龄
    },
    //身份证15位转成18位
    idcardConvert:function (idcard) {
        var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
        var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
        var sum = 0;

        if (idcard.length != 15 && idcard.length != 18) {
            return idcard;
        }

        if (idcard.length == 15) {
            idcard = idcard.substr(0, 6) + '19' + idcard.substr(6, idcard.length - 6);
        } else {
            idcard = idcard.substr(0, 17);
        }

        for (var i = 0; i < idcard.length; i++) {
            sum += idcard.substr(i, 1) * arrInt[i];
        }

        idcard += arrCh[sum % 11];

        return idcard;
    },
    //校验身份证
    validateIdCard(idCard){
        //15位和18位身份证号码的正则表达式
        let regIdCard = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
        let regResult = regIdCard.test(idCard)
        //如果通过该验证，说明身份证格式正确，但准确性还需计算
        let msg = ''
        if (regResult) {
            if (idCard.length == 18) {
                var idCardWi = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2); //将前17位加权因子保存在数组里
                var idCardY = new Array(1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2); //这是除以11后，可能产生的11位余数、验证码，也保存成数组
                var idCardWiSum = 0; //用来保存前17位各自乖以加权因子后的总和
                for (var i = 0; i < 17; i++) {
                    idCardWiSum += idCard.substring(i, i + 1) * idCardWi[i];
                }

                var idCardMod = idCardWiSum % 11;//计算出校验码所在数组的位置
                var idCardLast = idCard.substring(17);//得到最后一位身份证号码

                //如果等于2，则说明校验码是10，身份证号码最后一位应该是X
                if (idCardMod == 2) {
                    if (idCardLast == "X" || idCardLast == "x") {
                        console.log("恭喜通过验证啦！");
//                        msg="恭喜通过验证啦！"
                    } else {
                        console.log("身份证号码错误！");
                        msg = "身份证号码错误！"
                    }
                } else {
                    //用计算出的验证码与最后一位身份证号码匹配，如果一致，说明通过，否则是无效的身份证号码
                    if (idCardLast == idCardY[idCardMod]) {
                        console.log("恭喜通过验证啦！");
                    } else {
                        msg = "身份证号码错误！"
                    }
                }
            }
        } else {
            msg = "身份证格式不正确！"
            console.log("身份证格式不正确!");

        };
        return {
            valid: regResult === true,
            msg: msg
        }
    },
    //根据18位身份证号获取性别
    getSex(idCard){
        if (parseInt(idCard.substr(16, 1)) % 2 == 1) {
            return "1";//男
        } else {
            return "0";//女
        }
    },
    //根据18位身份证号获取出生日期，性别，年龄
    getInfoByIdCard(UUserCard, num){
        if (num == 1) {
         //获取出生日期
            birth = UUserCard.substring(6, 10) + "-" + UUserCard.substring(10, 12) + "-" + UUserCard.substring(12, 14);
            return birth;
        }
        if (num == 2) {
           //获取性别
            if (parseInt(UUserCard.substr(16, 1)) % 2 == 1) {
                return "男";
            } else {
                return "女";
            }
        }
        if (num == 3) {
          //获取年龄
            var myDate = new Date();
            var month = myDate.getMonth() + 1;
            var day = myDate.getDate();
            var age = myDate.getFullYear() - UUserCard.substring(6, 10) - 1;
            if (UUserCard.substring(10, 12) < month || UUserCard.substring(10, 12) == month && UUserCard.substring(12, 14) <= day) {
                age++;
            }
            return age;
        }
    },
    // 日期格式话
    formatDate(date, fmt) {
        if (date == undefined || date == null) {
            date = new Date();
        }
        if (fmt == undefined || fmt == null) {
            fmt = "yyyy-MM-dd";
        }
        var o = {
            "M+": date.getMonth() + 1,                 //月份
            "d+": date.getDate(),                    //日
            "h+": date.getHours(),                   //小时
            "m+": date.getMinutes(),                 //分
            "s+": date.getSeconds(),                 //秒
            "q+": Math.floor((date.getMonth() + 3) / 3), //季度
            "S": date.getMilliseconds()             //毫秒
        };
        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        }
        for (var k in o) {
            if (new RegExp("(" + k + ")").test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            }
        }
        return fmt;
    },
    //日期增加若干天，如加1天、加-2天
    dateAddDay:function (date1, addDay) {
        //date1的日 加上addDay 得到date2
        var date2=new Date(date1.getTime()+1000*3600*24*addDay)
        return date2;
    },
    plusDay (date, days) {
        //date的日期加上days天 得到date2返回
        if(date==null){
            date=new Date()
        }
        var timestamp=date.getTime()
        timestamp=timestamp+days*(1000*3600*24)
        var date2=new Date(timestamp);
        return date2;
    },
    getDateOffsetYear(date1, offsetYear) {
        //date1的年份加上offsetYear 得到date2
        var date2=new Date(date1.getFullYear()+offsetYear,date1.getMonth(),date1.getDate());
        return date2;
    },
    alertNo(){
        alert('对不起，您的状况不符合本产品要求，不能进行投保')
    },
    backTop(){
        document.body.scrollTop = 0;
    },
    //微信不漏底
    notShowBackground:function (id) {
        document.body.ontouchmove = function (e) {
            e.preventDefault();
        };
        var startX = 0, startY = 0;
//touchstart事件
        function touchSatrtFunc(evt) {
            try
            {
                //evt.preventDefault(); //阻止触摸时浏览器的缩放、滚动条滚动等

                var touch = evt.touches[0]; //获取第一个触点
                var x = Number(touch.pageX); //页面触点X坐标
                var y = Number(touch.pageY); //页面触点Y坐标
                //记录触点初始位置
                startX = x;
                startY = y;

            } catch (e) {
                console.log('touchSatrtFunc：' + e.message);
            }
        }
        document.addEventListener('touchstart', touchSatrtFunc, false);

        var _ss = document.getElementById(id);
        _ss.ontouchmove = function (ev) {
            var _point = ev.touches[0],
                _top = _ss.scrollTop;
            // 什么时候到底部
            var _bottomFaVal = _ss.scrollHeight - _ss.offsetHeight;
            // 到达顶端
            if (_top === 0) {
                // 阻止向下滑动
                if (_point.clientY > startY) {
                    ev.preventDefault();
                } else {
                    // 阻止冒泡
                    // 正常执行
                    ev.stopPropagation();
                }
            } else if (_top === _bottomFaVal) {
                // 到达底部
                // 阻止向上滑动
                if (_point.clientY < startY) {
                    ev.preventDefault();
                } else {
                    // 阻止冒泡
                    // 正常执行
                    ev.stopPropagation();
                }
            } else if (_top > 0 && _top < _bottomFaVal) {
                ev.stopPropagation();
            } else {
                ev.preventDefault();
            }
        };
    },
    //校验银行卡
    validateBankCard(value){
        let reg =  /^[\w]{12,18}$/;
        let regResult = reg.test(value);
        return {
            valid: regResult === true,
            msg: "银行卡格式不正确"
        }
    },
    //邮编
    propertyZip(value){
        let reg = /^\d{6}$/;
        let regResult = reg.test(value);
        return {
            valid: regResult === true,
            msg: "编码必须为6位数字!"
        }
    },
    //身高
    validateStature(value){
        let reg =/^[1-2]{0,1}\d{2}$/; //10-299
        let regResult = reg.test(value);
        return {
            valid: regResult === true,
            msg: "身高必须为10-299的整数!"
        }
    },
    //体重
    validateWeight(value){
        let reg =/^([1-9]\d{0,2}|0\.[1-9]|[1-9]\d{0,2}\.\d)$/; //0-999
        let regResult = reg.test(value);
        return {
            valid: regResult === true,
            msg: "体重必须为0-999,可保留一位小数"
        }
    },
    //只能输入数字和英文
    validateTaxNumber(value){
        let  reg = /^[0-9a-zA-Z]+$/;
        let regResult = reg.test(value);
        return {
            valid: regResult === true,
            msg: "只能输入数字和英文"
        }
    },
    validateAge(idcard){
        let strIdCard=this.idcardConvert(idcard)
        let age=this.GetAge(strIdCard);
        if(age<18){
            return false
        }
    },
}
