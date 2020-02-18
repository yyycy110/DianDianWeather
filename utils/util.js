const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

// 获取当前日期即以后几天日期的方法（且转换为星期几）


// //todate默认参数是当前日期，可以传入对应时间 todate格式为2018-10-05
// function getDates(days, todate) {
//   var dateArry = [];
//   for (var i = 0; i < days; i++) {
//     var dateObj = dateLater(todate, i);
//     dateArry.push(dateObj)
//   }
//   return dateArry;
// }


// function dateLater(dates, later) {
//   let dateObj = {};
//   let show_day = new Array('星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六');
//   //获取当前日期
//   let date = new Date();
//   //获取 later后的日期
//   date.setDate(date.getDate() + later);
//   //获取年月日
//   let day = date.getDay();
//   let yearDate = date.getFullYear();
//   let month = ((date.getMonth() + 1) < 10 ? ("0" + (date.getMonth() + 1)) : date.getMonth() + 1);
//   let dayFormate = (date.getDate() < 10 ? ("0" + date.getDate()) : date.getDate());


//   dateObj.time = yearDate + '-' + month + '-' + dayFormate;
//   dateObj.week = show_day[day];
//   return dateObj;
// }




module.exports = {
  formatTime: formatTime,

}
