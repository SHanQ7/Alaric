// 如果响应状态码不是 200，则退出脚本
if ($response.statusCode != 200) {
  $done(null);
}

// 默认值
const defaultCity = "哥谭市";
const defaultRegion = "韦恩大厦";
const defaultISP = "limbopro.com";
const defaultCountry = "默认国家";

// 生成一个小于 max 的随机整数
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

// 检查并返回有效的国家信息
function country_ValidCheck(para) {
  return para || defaultCountry;
}

// 检查并返回有效的地区信息
function Region_ValidCheck(para) {
  return para || defaultRegion;
}

// 检查并返回有效的城市信息
function City_ValidCheck(para) {
  return para || defaultCity;
}

// 检查并返回有效的 ISP 信息
function ISP_ValidCheck(para) {
  return para || defaultISP;
}

// 检查并转换地区名称
function Area_check(para) {
  const areaMap = {
    "中华民国": "台湾",
    "kowloon": "九龙城区",
    "千葉縣": "千叶县",
    "mazovia": "摩拉维亚",
    "north chungcheong": "忠清北道",
    "stockholm county": "斯德哥尔摩",
    "ang thong": "红统府",
    "奧弗涅-羅訥-阿爾卑斯大區": "阿尔卑斯大区",
    "// 检查并转换地区名称
function Area_check(para) {
  const areaMap = {
    "中华民国": "台湾",
    "kowloon": "九龙城区",
    "千葉縣": "千叶县",
    "mazovia": "摩拉维亚",
    "north chungcheong": "忠清北道", 
    "stockholm county": "斯德哥尔摩",
    "ang thong": "红统府",
    "奧弗涅-羅訥-阿爾卑斯大區": "阿尔卑斯大区",
    "普罗旺斯-阿尔卑斯-蔚蓝海岸大区": "蔚蓝海岸大区",
    "hawalli": "哈瓦利省",
    "taoyuan": "桃园市",
    "加州": "加利福尼亚州",
    "lombardy": "伦巴第大区",
  };

  // 将传入的参数转换为小写并去除前后空格
  para = para ? para.toLowerCase().trim() : para;

  // 输出调试信息，查看传入的参数
  console.log(`Area_check received para: ${para}`);

  // 返回映射表中的值，或原值（如果未找到匹配）
  return areaMap[para] || para;
}

  // 将传入的参数转换为小写并去除前后空格
  para = para ? para.toLowerCase().trim() : para;

  // 输出调试信息，查看传入的参数
  console.log(`Area_check received para: ${para}`);

  // 返回映射表中的值，或原值（如果未找到匹配）
  return areaMap[para] || para;
}

// 检查并转换城市名称
function City_ValidCheck(para) {
  const cityMap = {
    "los angeles": "洛杉矶",
    "san francisco": "旧金山",
    "tokyo": "东京",
    "paris": "巴黎",
    "london": "伦敦",
    "beijing": "北京",
    "shanghai": "上海",
    "taipei": "台北",
    "hong kong": "香港",
    "singapore": "新加坡",
  };

  // 将城市名转换为小写并去除前后空格
  para = para ? para.toLowerCase().trim() : para;

  // 返回城市名称的有效值，如果 para 不存在则使用默认值
  return cityMap[para] || para || defaultCity;
}

// 定义国家旗帜的映射
const flags = new Map([
  ["AC", "🇦🇨"], ["AD", "🇦🇩"], ["AE", "🇦🇪"], ["AF", "🇦🇫"], ["AG", "🇦🇬"], ["AI", "🇦🇮"],
  ["AL", "🇦🇱"], ["AM", "🇦🇲"], ["AO", "🇦🇴"], ["AQ", "🇦🇶"], ["AR", "🇦🇷"], ["AS", "🇦🇸"],
  ["AT", "🇦🇹"], ["AU", "🇦🇺"], ["AW", "🇦🇼"], ["AX", "🇦🇽"], ["AZ", "🇦🇿"], ["BA", "🇧🇦"],
  ["BB", "🇧🇧"], ["BD", "🇧🇩"], ["BE", "🇧🇪"], ["BF", "🇧🇫"], ["BG", "🇧🇬"], ["BH", "🇧🇭"],
  ["BI", "🇧🇮"], ["BJ", "🇧🇯"], ["BM", "🇧🇲"], ["BN", "🇧🇳"], ["BO", "🇧🇴"], ["BR", "🇧🇷"],
  ["BS", "🇧🇸"], ["BT", "🇧🇹"], ["BV", "🇧🇻"], ["BW", "🇧🇼"], ["BY", "🇧🇾"], ["BZ", "🇧🇿"],
  ["CA", "🇨🇦"], ["CD", "🇨🇩"], ["CF", "🇨🇫"], ["CG", "🇨🇬"], ["CH", "🇨🇭"], ["CI", "🇨🇮"],
  ["CK", "🇨🇰"], ["CL", "🇨🇱"], ["CM", "🇨🇲"], ["CN", "🇨🇳"], ["CO", "🇨🇴"], ["CP", "🇨🇵"],
  ["CR", "🇨🇷"], ["CU", "🇨🇺"], ["CV", "🇨🇻"], ["CW", "🇨🇼"], ["CX", "🇨🇽"], ["CY", "🇨🇾"],
  ["CZ", "🇨🇿"], ["DE", "🇩🇪"], ["DG", "🇩🇬"], ["DJ", "🇩🇯"], ["DK", "🇩🇰"], ["DM", "🇩🇲"],
  ["DO", "🇩🇴"], ["DZ", "🇩🇿"], ["EA", "🇪🇦"], ["EC", "🇪🇨"], ["EE", "🇪🇪"], ["EG", "🇪🇬"],
  ["EH", "🇪🇭"], ["ER", "🇪🇷"], ["ES", "🇪🇸"], ["ET", "🇪🇹"], ["EU", "🇪🇺"], ["FI", "🇫🇮"],
  ["FJ", "🇫🇯"], ["FK", "🇫🇰"], ["FM", "🇫🇲"], ["FO", "🇫🇴"], ["FR", "🇫🇷"], ["GA", "🇬🇦"],
  ["GB", "🇬🇧"], ["GD", "🇬🇩"], ["GE", "🇬🇪"], ["GF", "🇬🇫"], ["GH", "🇬🇭"], ["GI", "🇬🇮"],
  ["GL", "🇬🇱"], ["GM", "🇬🇲"], ["GN", "🇬🇳"], ["GP", "🇬🇵"], ["GR", "🇬🇷"], ["GT", "🇬🇹"],
  ["GU", "🇬🇺"], ["GW", "🇬🇼"], ["GY", "🇬🇾"], ["HK", "🇭🇰"], ["HN", "🇭🇳"], ["HR", "🇭🇷"],
  ["HT", "🇭🇹"], ["HU", "🇭🇺"], ["ID", "🇮🇩"], ["IE", "🇮🇪"], ["IL", "🇮🇱"], ["IM", "🇮🇲"],
  ["IN", "🇮🇳"], ["IR", "🇮🇷"], ["IS", "🇮🇸"], ["IT", "🇮🇹"], ["JM", "🇯🇲"], ["JO", "🇯🇴"],
  ["JP", "🇯🇵"], ["KE", "🇰🇪"], ["KG", "🇰🇬"], ["KH", "🇰🇭"], ["KI", "🇰🇮"], ["KM", "🇰🇲"],
  ["KN", "🇰🇳"], ["KP", "🇰🇵"], ["KR", "🇰🇷"], ["KW", "🇰🇼"], ["KY", "🇰🇾"], ["KZ", "🇰🇿"],
  ["LA", "🇱🇦"], ["LB", "🇱🇧"], ["LC", "🇱🇨"], ["LI", "🇱🇮"], ["LK", "🇱🇰"], ["LR", "🇱🇷"],
  ["LS", "🇱🇸"], ["LT", "🇱🇹"], ["LU", "🇱🇺"], ["LV", "🇱🇻"], ["LY", "🇱🇾"], ["MA", "🇲🇦"],
  ["MC", "🇲🇨"], ["MD", "🇲🇩"], ["MG", "🇲🇬"], ["MH", "🇲🇭"], ["MK", "🇲🇰"], ["ML", "🇲🇱"],
  ["MM", "🇲🇲"], ["MN", "🇲🇳"], ["MO", "🇲🇴"], ["MP", "🇲🇵"], ["MQ", "🇲🇶"], ["MR", "🇲🇷"],
  ["MS", "🇲🇸"], ["MT", "🇲🇹"], ["MU", "🇲🇺"], ["MV", "🇲🇻"], ["MW", "🇲🇼"], ["MX", "🇲🇽"],
  ["MY", "🇲🇾"], ["MZ", "🇲🇿"], ["NA", "🇳🇦"], ["NC", "🇳🇨"], ["NE", "🇳🇪"], ["NF", "🇳🇫"],
  ["NG", "🇳🇬"], ["NI", "🇳🇮"], ["NL", "🇳🇱"], ["NO", "🇳🇴"], ["NP", "🇳🇵"], ["NR", "🇳🇷"],
  ["NZ", "🇳🇿"], ["OM", "🇴🇲"], ["PA", "🇵🇦"], ["PE", "🇵🇪"], ["PF", "🇵🇫"], ["PG", "🇵🇬"],
  ["PH", "🇵🇭"], ["PK", "🇵🇰"], ["PL", "🇵🇱"], ["PM", "🇵🇲"], ["PR", "🇵🇷"], ["PS", "🇵🇸"],
  ["PT", "🇵🇹"], ["PW", "🇵🇼"], ["PY", "🇵🇾"], ["QA", "🇶🇦"], ["RE", "🇷🇪"], ["RO", "🇷🇴"],
  ["RS", "🇷🇸"], ["RU", "🇷🇺"], ["RW", "🇷🇼"], ["SA", "🇸🇦"], ["SB", "🇸🇧"], ["SC", "🇸🇨"],
  ["SD", "🇸🇩"], ["SE", "🇸🇪"], ["SG", "🇸🇬"], ["SI", "🇸🇮"], ["SK", "🇸🇰"], ["SL", "🇸🇱"],
  ["SM", "🇸🇲"], ["SN", "🇸🇳"], ["SR", "🇸🇷"], ["ST", "🇸🇹"], ["SV", "🇸🇻"], ["SY", "🇸🇾"],
  ["SZ", "🇸🇿"], ["TC", "🇹🇨"], ["TD", "🇹🇩"], ["TG", "🇹🇬"], ["TH", "🇹🇭"], ["TJ", "🇹🇯"],
  ["TL", "🇹🇱"], ["TM", "🇹🇲"], ["TN", "🇹🇳"], ["TO", "🇹🇴"], ["TR", "🇹🇷"], ["TT", "🇹🇹"],
  ["TV", "🇹🇻"], ["TW", "🇹🇼"], ["TZ", "🇹🇿"], ["UA", "🇺🇦"], ["UG", "🇺🇬"], ["UK", "🇬🇧"],
  ["UM", "🇺🇲"], ["US", "🇺🇸"], ["UY", "🇺🇾"], ["UZ", "🇺🇿"], ["VA", "🇻🇦"], ["VC", "🇻🇨"],
  ["VE", "🇻🇪"], ["VG", "🇻🇬"], ["VI", "🇻🇮"], ["VN", "🇻🇳"], ["VU", "🇻🇺"], ["WS", "🇼🇸"],
  ["YE", "🇾🇪"], ["YT", "🇾🇹"], ["ZA", "🇿🇦"], ["ZM", "🇿🇲"], ["ZW", "🇿🇼"]
]);

// 脚本开始
let body = $response.body;
let obj = JSON.parse(body);

// 提取地区信息
var region = obj['regionName'] || defaultRegion;

// 格式化标题（第1行）：国旗 + 国家名 + 地区名
var title = flags.get(obj['countryCode']) + ' ' + obj['country'] + ' ' + Area_check(obj['regionName']);

// 格式化副标题（第2行）：城市名 + IP + ISP 名
var subtitle = City_ValidCheck(obj['city']) + ' ' + obj['query'] + ' ' +obj['isp']

// IP 信息
var ip = obj['query'];

// 长按节点选择“查看节点信息”时的信息
var description = `服务商: ${obj['isp']}\n地区: ${Region_ValidCheck(region)}\n城市: ${City_ValidCheck(obj['city'])}\nIP: ${obj['query']}\n时区: ${obj['timezone']}`;

// 完成并返回处理结果
$done({ title, subtitle, ip, description });
