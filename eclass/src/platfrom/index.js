const Platfrom = {};

Platfrom.getType = function() {
  return "taro";
};

//登录相关
Platfrom.appCheckAuth = function() {
  return null;
};

//请求定位
Platfrom.sendLocation = function() {
  return null;
};

//请求输入提示
Platfrom.sendAutocomplete = function() {
  return null;
};

//请求天气
Platfrom.sendWeather = function() {
  return null;
};

Platfrom.geocoder = function() {
  return null;
};

//请求支付
Platfrom.sendPay = function() {
  return null;
};

//请求分享
Platfrom.sendShare = function() {
  return null;
};

export default Platfrom;
