var times = {};
times.server_space_time = 0;

//设置服务器时间戳差值
times.setTime = (sTime)=>{
  if (typeof sTime === 'number') {
    sTime = sTime < 1e12? sTime * 1000:sTime
  }
  // # sTime=源时间，cTime=当前时间，dTime=时间差
  let cTime = parseInt((new Date()).getTime());
  let dTime = cTime - sTime;

  const max = 5 * 1000;//5秒，服务器是1分钟时间差验证
  if(Math.abs(dTime) >= max){
    times.server_space_time = dTime * -1;
  }else{
    times.server_space_time = 0;
  }
  // console.log("setTime",dTime,times.server_space_time ,new Date(times.getTime()) , new Date(sTime))
}
//获取当前服务器时间戳
times.getTime = ()=>{
  let cTime = parseInt((new Date()).getTime());
  return cTime + times.server_space_time;
}
/**
 * fmt 格式化的格式  yyyy-MM-dd hh:mm:ss
 * day 距当前日期的间隔日期 -1表示前一天  1表示后一天
 * **/
times.getFormatData = (fmt, day = 0) => {
  //获取格式化日期
  let dateCurr = new Date();
  let date =
    day && !isNaN(parseInt(day))
      ? new Date(dateCurr.getTime() + parseInt(day) * 24 * 60 * 60 * 1000)
      : dateCurr;
  var o = {
    "M+": date.getMonth() + 1, //月份
    "d+": date.getDate(), //日
    "h+": date.getHours(), //小时
    "m+": date.getMinutes(), //分
    "s+": date.getSeconds(), //秒
    "q+": Math.floor((date.getMonth() + 3) / 3), //季度
    S: date.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(
      RegExp.$1,
      (date.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
      );
  return fmt;
};

times.getFormaAges = str => {
  var r = str.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);
  if (r == null) return 0;
  var d = new Date(r[1], r[3] - 1, r[4]);
  if (
    d.getFullYear() == r[1] &&
    d.getMonth() + 1 == r[3] &&
    d.getDate() == r[4]
  ) {
    var Y = new Date().getFullYear();
    return Y - r[1];
  }
  return 0;
};

times.formatTimeStampToDate = function (ts, showFullYear = false) {
  if (Number.isNaN(ts)) return ts
  if (!Number(ts)) return '未知日期'
  ts = ts < 1e10 ? ts * 1000 : ts
  const date = new Date(ts)
  return showFullYear
    ? `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
    : `${date.getMonth() + 1}/${date.getDate()}`
}

const repeat = (str = "0", times) => new Array(times + 1).join(str);
// 时间前面 +0
const pad = (num, maxLength = 2) =>
  repeat("0", maxLength - num.toString().length) + num;

// 时间格式装换函数
times.formatTime = time => {
  `${pad(time.getHours())}:${pad(time.getMinutes())}:${pad(
    time.getSeconds()
  )}.${pad(time.getMilliseconds(), 3)}`;
};

/**
 * 时间戳或者日期换算成相对于今天的日期
 * @param {any} ts 待转换的时间戳或者字符串
 * @param {boolean} showTime 是否显示具体时间
 * @param {boolean} isForward 是从今天往后计算
 */
times.getRelativeDate = function(ts, showTime = false ){
  if (!ts) return '未知'
  if (typeof ts === 'number') {
    ts = ts < 1e12? ts * 1000:ts
  }
  const date = new Date(ts)
  if(isNaN(date.valueOf())) return ts
  const today = new Date()
  today.setHours(0,0,0,0)
  const dateText = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
  const timeText = ` ${pad(date.getHours())}:${pad(date.getMinutes())}`
  const fullText = showTime? dateText + timeText: dateText
  date.setHours(0,0,0,0)
  let diff = date - today
  let _todayText = '今天'
  let _1dayText =  '昨天'
  let _2dayText =  '前天'
  let __1dayText = '明天'
  let __2dayText = '后天'
  if (showTime) {
    _todayText += timeText
    _1dayText += timeText
    _2dayText += timeText
    __1dayText += timeText
    __2dayText += timeText
  }
  const second = 1000,
  minute = second * 60,
  hour = minute * 60,
  day = hour * 24
  return diff < -2 * day
  ? fullText
  : diff < - day
  ? _2dayText
  : diff < 0
  ? _1dayText
  : diff < day
  ? _todayText
  :  diff < 2 * day
    ? __1dayText
    : diff < 3 * day
    ? __2dayText
    : fullText
}
/* 时间戳转换为日期格式
 * 使用time_format('Y-m-d H:i:s',t)等同PHP的date()
 */
times.time_format = function(str,t){
  if(!t) return '';
  var d = new Date();
      d.setTime(t);
      
  var    _m = d.getMonth()+1,
      _d = d.getDate(),
      _H = d.getHours(),        
      _i = d.getMinutes(),              
      _s = d.getSeconds(),

      format = {
          'Y' : d.getFullYear(),                            // 年
          'm' : _m.toString().length == 1 ? '0'+_m : _m,    // 月
          'd' : _d.toString().length == 1 ? '0'+_d : _d,    // 日
          'H' : _H.toString().length == 1 ? '0'+_H : _H,    // 时
          'i' : _i.toString().length == 1 ? '0'+_i : _i,    // 分
          's' : _s.toString().length == 1 ? '0'+_s : _s    // 秒
      };

      for(var i in format){
          str = str.replace(new RegExp(i),format[i]);
      }
      return str;
}
/**
 * 友好的时间显示
 * @param int sTime 待显示的时间
 * @param string type 类型. normal | mohu | full | ymd | other
 * @return string
*/
times.friendlyDate = function(sTime, type = 'normal')
{
    if (!sTime || !Number(sTime) || sTime.length <= 0) {
        return sTime || '';
    }
    sTime = Number(sTime);

    if (typeof sTime === 'number') {
      sTime = sTime < 1e12? sTime * 1000:sTime
    }
    // # sTime=源时间，cTime=当前时间，dTime=时间差
    let cTime = times.getTime();
    let dTime = cTime - sTime;
    // console.log(cTime , sTime , dTime);
    let dDay = parseInt(times.time_format("d", cTime)) - parseInt(times.time_format("d", sTime));
    // dDay = parseInt(dTime/3600/24);
    let dYear = parseInt(times.time_format("Y", cTime)) - parseInt(times.time_format("Y", sTime));
    // # rmal：n秒前，n分钟前，n小时前，日期
    if (type == 'normal') {
        if (dTime > 0) {
            if (dTime < 60) {
                if (dTime < 10) {
                    return '刚刚'; //by yangjs
                } else {
                    return parseInt(floor(dTime / 10) * 10)+ "秒前";
                }
            } else if (dTime < 3600) {
                return parseInt(dTime / 60) + "分钟前";
                // # 今天的数据.年份相同.日期相同.
            } else if (dYear == 0 && dDay == 0) {
                // # return parseInt($dTime/3600)."小时前";
                return '今天' + times.time_format('H:i', sTime);
            } else if (dYear == 0) {
                return times.time_format("m月d日 H:i", sTime);
            } else {
                return times.time_format("Y-m-d H:i", sTime);
            }
        } else {
            return times.time_format("Y年m月d日", sTime);
        }
    } else if (type == 'mohu') {
        if (dTime < 60) {
            return dTime + "秒前";
        } else if (dTime < 3600) {
            return parseInt(dTime / 60) + "分钟前";
        } else if (dTime >= 3600 && dDay == 0) {
            return parseInt(dTime / 3600) + "小时前";
        } else if (dDay > 0 && dDay <= 7) {
            return parseInt(dDay) + "天前";
        } else if (dDay > 7 && dDay <= 30) {
            return parseInt(dDay / 7) + '周前';
        } else if (dDay > 30) {
            return parseInt(dDay / 30) + '个月前';
        }
    } 
    else if (type == 'full') {
        // # full: Y-m-d , H:i:s
        return times.time_format("Y-m-d , H:i:s", sTime);
    } else if (type == 'ymd') {
        return times.time_format("Y-m-d", sTime);
    } else {
        if (dTime < 60) {
            return dTime + "秒前";
        } else if (dTime < 3600) {
            return parseInt(dTime / 60) + "分钟前";
        } else if (dTime >= 3600 && dDay == 0) {
            return parseInt(dTime / 3600) + "小时前";
        } else if (dYear == 0) {
            return times.time_format("Y-m-d H:i:s", sTime);
        } else {
            return times.time_format("Y-m-d H:i:s", sTime);
        }
    }
}

// 农历日期
function GetBit(m, n){return (m >> n) & 1;}
function e2c() {
    let cYear, cMonth, cDay, TheDate;
    let CalendarData = new Array(100);
    CalendarData = new Array(0xA4B, 0x5164B, 0x6A5, 0x6D4, 0x415B5, 0x2B6, 0x957, 0x2092F, 0x497, 0x60C96, 0xD4A, 0xEA5, 0x50DA9, 0x5AD, 0x2B6, 0x3126E, 0x92E, 0x7192D, 0xC95, 0xD4A, 0x61B4A, 0xB55, 0x56A, 0x4155B, 0x25D, 0x92D, 0x2192B, 0xA95, 0x71695, 0x6CA, 0xB55, 0x50AB5, 0x4DA, 0xA5B, 0x30A57, 0x52B, 0x8152A, 0xE95, 0x6AA, 0x615AA, 0xAB5, 0x4B6, 0x414AE, 0xA57, 0x526, 0x31D26, 0xD95, 0x70B55, 0x56A, 0x96D, 0x5095D, 0x4AD, 0xA4D, 0x41A4D, 0xD25, 0x81AA5, 0xB54, 0xB6A, 0x612DA, 0x95B, 0x49B, 0x41497, 0xA4B, 0xA164B, 0x6A5, 0x6D4, 0x615B4, 0xAB6, 0x957, 0x5092F, 0x497, 0x64B, 0x30D4A, 0xEA5, 0x80D65, 0x5AC, 0xAB6, 0x5126D, 0x92E, 0xC96, 0x41A95, 0xD4A, 0xDA5, 0x20B55, 0x56A, 0x7155B, 0x25D, 0x92D, 0x5192B, 0xA95, 0xB4A, 0x416AA, 0xAD5, 0x90AB5, 0x4BA, 0xA5B, 0x60A57, 0x52B, 0xA93, 0x40E95);
    let madd = new Array(12);
    madd = new Array(0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334)
    TheDate=(arguments.length != 3) ? new Date() : new Date(arguments[0], arguments[1], arguments[2]);
    let total, m, n, k;
    let isEnd = false;
    let tmp = TheDate.getYear();
    if (tmp < 1900){tmp += 1900;}
    total = (tmp - 1921) * 365 + Math.floor((tmp - 1921) / 4) + madd[TheDate.getMonth()] + TheDate.getDate() - 38;
    if (TheDate.getYear() % 4 == 0 && TheDate.getMonth() > 1){total++;}
    for (m = 0; ; m++) {
      k = (CalendarData[m] < 0xfff) ? 11 : 12;
      for (n = k; n >= 0; n--) {
        if (total <= 29 + GetBit(CalendarData[m], n)) {isEnd = true; break; }
        total = total - 29 - GetBit(CalendarData[m], n);
      }
      if (isEnd) break;
    }
    cYear = 1921 + m;
    cMonth = k - n + 1;
    cDay = total;
    if (k == 12) {
      if (cMonth == Math.floor(CalendarData[m] / 0x10000) + 1) {cMonth = 1 - cMonth;}
      if (cMonth > Math.floor(CalendarData[m] / 0x10000) + 1) {cMonth--;}
    }
    const editDate = {
        cYear, cMonth, cDay, TheDate
    }
    return editDate
}
function GetcDateString (editDate) {
    const {cYear, cMonth, cDay, TheDate} = editDate
    const tgString = "甲乙丙丁戊己庚辛壬癸";
    const dzString = "子丑寅卯辰巳午未申酉戌亥";
    const numString = "一二三四五六七八九十";
    const monString = "正二三四五六七八九十冬腊";
    const sx = "鼠牛虎兔龙蛇马羊猴鸡狗猪";
    let tmp = "";
    // tmp += tgString.charAt((cYear - 4) % 10);
    // tmp += dzString.charAt((cYear - 4) % 12);
    // tmp += `(${sx.charAt((cYear - 4) % 12)})年 `
    if (cMonth < 1) {
      tmp += "(闰)";
      tmp += monString.charAt(-cMonth - 1);
    } else {
      tmp += monString.charAt(cMonth - 1);
    }
    tmp += "月";
    tmp += (cDay < 11) ? "初" : ((cDay < 20) ? "十" : ((cDay < 30) ? "廿" : "三十"));
    if (cDay % 10 != 0 || cDay == 10) {
      tmp += numString.charAt((cDay - 1) % 10);
    }
    return tmp;
}
// 获取农历日期
times.lunarCalendar = function(){
    let D = new Date();
    let yy = D.getFullYear();
    let mm = D.getMonth() + 1;
    let dd = D.getDate();
    if (yy < 100) yy = "19" + yy;
    let d = '';
    if (yy < 1921 || yy > 2020) {
        d = "";
    } else {
        mm = (parseInt(mm) > 0) ? (mm - 1) : 11;
        let editDate = e2c(yy, mm, dd);
        d = GetcDateString(editDate);
    }
    return d
}





export default times;


// console.log(times.getRelativeDate(1582285711))
// console.log(times.friendlyDate(1582289498));