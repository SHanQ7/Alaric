// 如果响应状态码不是 200，则退出脚本
if ($response.statusCode != 200) {
  $done(null);
}

const defaultCity = "哥谭市";
const defaultRegion = "韦恩大厦";
const defaultISP = "ShanQ.com";
const defaultCountry = "天可汗";

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function country_ValidCheck(para) {
  return para || defaultCountry;
}

function Region_ValidCheck(para) {
  return para || defaultRegion;
}

function City_ValidCheck(para) {
  const cityMap = {
    "grallarate": "加拉拉泰",  // 加拉拉泰（位于意大利）
    "melton": "墨尔顿",        // 墨尔顿（位于英国或澳大利亚）
    "lampa": "拉帕",           // 拉帕（位于智利）
    "cedar knolls": "雪松诺尔斯", // 雪松诺尔斯（位于美国）
    "santa cruz": "圣克鲁斯",   // 圣克鲁斯（位于美国或玻利维亚等地）
    "yeongdong-gun": "永同郡",  // 永同郡（位于韩国）
    "steninge": "斯特宁厄",    // 斯特宁厄（位于瑞典）
    "中壢": "中坜区",          // 中坜区（位于台湾）
    "聖荷西": "圣荷西",        // 圣荷西（位于美国）
    "meyzieu": "梅济约",       // 梅济约（位于法国）
    "Ōkubo-naka": "大久保中",  // 大久保中（位于日本）
    "jessheim": "耶瑟海姆",     // 耶瑟海姆（位于挪威）
  };

  para = para ? para.toLowerCase().trim() : para;
  console.log(`City_ValidCheck received para: ${para}`);
  return cityMap[para] || para || defaultCity;
}

function ISP_ValidCheck(para) {
  return para || defaultISP;
}

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
    "dubai": "迪拜",
  };

  para = para ? para.toLowerCase().trim() : para;
  console.log(`Area_check received para: ${para}`);
  return areaMap[para] || para;
}

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
  ["YE", "🇾🇪"], ["YT", "🇾🇹"], ["ZA", "🇿🇦"], ["ZM", "🇿🇲"], ["ZW", "🇿🇼"], ["TW", "🇨🇳"]
]);

let body = $response.body;
let obj = JSON.parse(body);

var region = obj['regionName'] || defaultRegion;
var title = flags.get(obj['countryCode']) + ' ' + obj['country'] + ' ' + Area_check(obj['regionName']);
var subtitle = City_ValidCheck(obj['city']) + ' ' + obj['query'] + ' ' +obj['isp']
var ip = obj['query'];
var description = `服务商: ${obj['isp']}\n地区: ${Region_ValidCheck(region)}\n城市: ${City_ValidCheck(obj['city'])}\nIP: ${obj['query']}\n时区: ${obj['timezone']}`;

$done({ title, subtitle, ip, description });
