if ($response.statusCode != 200) {
  $done(null);
}

const flags = new Map([
["AC", "🇦🇨"], ["AD", "🇦🇩"], ["AE", "🇦🇪"], ["AF", "🇦🇫"], ["AG", "🇦🇬"], ["AI", "🇦🇮"], ["AL", "🇦🇱"], ["AM", "🇦🇲"], ["AO", "🇦🇴"], ["AQ", "🇦🇶"], ["AR", "🇦🇷"], ["AS", "🇦🇸"],
["AT", "🇦🇹"], ["AU", "🇦🇺"], ["AW", "🇦🇼"], ["AX", "🇦🇽"], ["AZ", "🇦🇿"], ["BA", "🇧🇦"], ["BB", "🇧🇧"], ["BD", "🇧🇩"], ["BE", "🇧🇪"], ["BF", "🇧🇫"], ["BG", "🇧🇬"], ["BH", "🇧🇭"],  
["BI", "🇧🇮"], ["BJ", "🇧🇯"], ["BM", "🇧🇲"], ["BN", "🇧🇳"], ["BO", "🇧🇴"], ["BR", "🇧🇷"], ["BS", "🇧🇸"], ["BT", "🇧🇹"], ["BV", "🇧🇻"], ["BW", "🇧🇼"], ["BY", "🇧🇾"], ["BZ", "🇧🇿"], 
["CA", "🇨🇦"], ["CD", "🇨🇩"], ["CF", "🇨🇫"], ["CG", "🇨🇬"], ["CH", "🇨🇭"], ["CI", "🇨🇮"], ["CK", "🇨🇰"], ["CL", "🇨🇱"], ["CM", "🇨🇲"], ["CN", "🇨🇳"], ["CO", "🇨🇴"], ["CP", "🇨🇵"], 
["CR", "🇨🇷"], ["CU", "🇨🇺"], ["CV", "🇨🇻"], ["CW", "🇨🇼"], ["CX", "🇨🇽"], ["CY", "🇨🇾"], ["CZ", "🇨🇿"], ["DE", "🇩🇪"], ["DG", "🇩🇬"], ["DJ", "🇩🇯"], ["DK", "🇩🇰"], ["DM", "🇩🇲"],
["DO", "🇩🇴"], ["DZ", "🇩🇿"], ["EA", "🇪🇦"], ["EC", "🇪🇨"], ["EE", "🇪🇪"], ["EG", "🇪🇬"], ["EH", "🇪🇭"], ["ER", "🇪🇷"], ["ES", "🇪🇸"], ["ET", "🇪🇹"], ["EU", "🇪🇺"], ["FI", "🇫🇮"],
["FJ", "🇫🇯"], ["FK", "🇫🇰"], ["FM", "🇫🇲"], ["FO", "🇫🇴"], ["FR", "🇫🇷"], ["GA", "🇬🇦"], ["GB", "🇬🇧"], ["GD", "🇬🇩"], ["GE", "🇬🇪"], ["GF", "🇬🇫"], ["GH", "🇬🇭"], ["GI", "🇬🇮"],
["GL", "🇬🇱"], ["GM", "🇬🇲"], ["GN", "🇬🇳"], ["GP", "🇬🇵"], ["GR", "🇬🇷"], ["GT", "🇬🇹"], ["GU", "🇬🇺"], ["GW", "🇬🇼"], ["GY", "🇬🇾"], ["HK", "🇭🇰"], ["HN", "🇭🇳"], ["HR", "🇭🇷"],
["HT", "🇭🇹"], ["HU", "🇭🇺"], ["ID", "🇮🇩"], ["IE", "🇮🇪"], ["IL", "🇮🇱"], ["IM", "🇮🇲"], ["IN", "🇮🇳"], ["IR", "🇮🇷"], ["IS", "🇮🇸"], ["IT", "🇮🇹"], ["JM", "🇯🇲"], ["JO", "🇯🇴"],
["JP", "🇯🇵"], ["KE", "🇰🇪"], ["KG", "🇰🇬"], ["KH", "🇰🇭"], ["KI", "🇰🇮"], ["KM", "🇰🇲"], ["KN", "🇰🇳"], ["KP", "🇰🇵"], ["KR", "🇰🇷"], ["KW", "🇰🇼"], ["KY", "🇰🇾"], ["KZ", "🇰🇿"],
["LA", "🇱🇦"], ["LB", "🇱🇧"], ["LC", "🇱🇨"], ["LI", "🇱🇮"], ["LK", "🇱🇰"], ["LR", "🇱🇷"], ["LS", "🇱🇸"], ["LT", "🇱🇹"], ["LU", "🇱🇺"], ["LV", "🇱🇻"], ["LY", "🇱🇾"], ["MA", "🇲🇦"],
["MC", "🇲🇨"], ["MD", "🇲🇩"], ["MG", "🇲🇬"], ["MH", "🇲🇭"], ["MK", "🇲🇰"], ["ML", "🇲🇱"], ["MM", "🇲🇲"], ["MN", "🇲🇳"], ["MO", "🇲🇴"], ["MP", "🇲🇵"], ["MQ", "🇲🇶"], ["MR", "🇲🇷"],
["MS", "🇲🇸"], ["MT", "🇲🇹"], ["MU", "🇲🇺"], ["MV", "🇲🇻"], ["MW", "🇲🇼"], ["MX", "🇲🇽"], ["MY", "🇲🇾"], ["MZ", "🇲🇿"], ["NA", "🇳🇦"], ["NC", "🇳🇨"], ["NE", "🇳🇪"], ["NF", "🇳🇫"],
["NG", "🇳🇬"], ["NI", "🇳🇮"], ["NL", "🇳🇱"], ["NO", "🇳🇴"], ["NP", "🇳🇵"], ["NR", "🇳🇷"], ["NZ", "🇳🇿"], ["OM", "🇴🇲"], ["PA", "🇵🇦"], ["PE", "🇵🇪"], ["PF", "🇵🇫"], ["PG", "🇵🇬"],
["PH", "🇵🇭"], ["PK", "🇵🇰"], ["PL", "🇵🇱"], ["PM", "🇵🇲"], ["PR", "🇵🇷"], ["PS", "🇵🇸"], ["PT", "🇵🇹"], ["PW", "🇵🇼"], ["PY", "🇵🇾"], ["QA", "🇶🇦"], ["RE", "🇷🇪"], ["RO", "🇷🇴"],
["RS", "🇷🇸"], ["RU", "🇷🇺"], ["RW", "🇷🇼"], ["SA", "🇸🇦"], ["SB", "🇸🇧"], ["SC", "🇸🇨"], ["SD", "🇸🇩"], ["SE", "🇸🇪"], ["SG", "🇸🇬"], ["SI", "🇸🇮"], ["SK", "🇸🇰"], ["SL", "🇸🇱"],
["SM", "🇸🇲"], ["SN", "🇸🇳"], ["SR", "🇸🇷"], ["ST", "🇸🇹"], ["SV", "🇸🇻"], ["SY", "🇸🇾"], ["SZ", "🇸🇿"], ["TC", "🇹🇨"], ["TD", "🇹🇩"], ["TG", "🇹🇬"], ["TH", "🇹🇭"], ["TJ", "🇹🇯"],
["TL", "🇹🇱"], ["TM", "🇹🇲"], ["TN", "🇹🇳"], ["TO", "🇹🇴"], ["TR", "🇹🇷"], ["TT", "🇹🇹"], ["TV", "🇹🇻"], ["TW", "🇨🇳"], ["TZ", "🇹🇿"], ["UA", "🇺🇦"], ["UG", "🇺🇬"], ["UK", "🇬🇧"],
["UM", "🇺🇲"], ["US", "🇺🇸"], ["UY", "🇺🇾"], ["UZ", "🇺🇿"], ["VA", "🇻🇦"], ["VC", "🇻🇨"], ["VE", "🇻🇪"], ["VG", "🇻🇬"], ["VI", "🇻🇮"], ["VN", "🇻🇳"], ["VU", "🇻🇺"], ["WS", "🇼🇸"],
["YE", "🇾🇪"], ["YT", "🇾🇹"], ["ZA", "🇿🇦"], ["ZM", "🇿🇲"], ["ZW", "🇿🇼"]
]);

const country0 = "MUC";
const region0 = "韦恩大厦";
const city0 = "高谭市";
const isp0 = "MCU.com";


// 脚本开始
let body = $response.body;
let obj = JSON.parse(body);

const country = country_ValidCheck(obj['country']);
const region = Area_check(obj['regionName']);
const city = City_ValidCheck(obj['city']);

let displayCity = (city !== country && city !== region) ? city : '';

let title = flags.get(obj['countryCode']) + ' ' + country + ' ' + region;
let subtitle = (displayCity ? displayCity + ' ' : '') + obj['query'] + ' ' + ISP_ValidCheck(obj['isp']);

let ip = obj['query'];
let description = 
  '国家：'.padEnd(5, ' ') + obj['countryCode'] + ' ' + country + '\n' +
  '地区：'.padEnd(5, ' ') + obj['region'] + ' ' + region + '\n' +
  'IP：'.padEnd(5, ' ') + obj['query'] + '\n' +
  '服务商：'.padEnd(5, ' ') + obj['isp'] + '\n' +
  '经纬度：'.padEnd(5, ' ') + obj['lat'] + ' / ' + obj['lon'] + '\n' +
  '时区：'.padEnd(5, ' ') + obj['timezone'];

$done({title, subtitle, ip, description});



function country_ValidCheck(para) {
   const countryMap = {
     "中華民國":"台湾", "中华民国":"台湾","俄罗斯联邦":"俄罗斯",
 };
 para = para ? para.trim() : "";
 return countryMap[para] || para || country0;
};

function Area_check(para) {
  const areaMap = {
    // 迪拜 - Dubai - AE
    "dubai" : "迪拜",
    // 亚美尼亚 - Armenia -  AM
    "葉里溫" : "叶里温",
    // 澳大利亚 - Australia - AU
    "new south wales" : "新南威尔士州",
    "Victoria" : "维多利亚州",
    // 阿塞拜疆 - Azerbaijan - AZ
    "baku city" : "巴库市",
    // 巴西- Brazil - BR
    "Sao Paulo" : "圣保罗州", 
    "聖保羅州" : "圣保罗州",
    // 保加利亚 - Bulgaria - BG
    "Sofia-Capital" : "索菲亚市",
    // 加拿大 - Canad - CA
    "Quebec" : "魁北克市",
    // 智利 - Chile -  CL
    "圣地亚哥首都大区" : "圣地亚哥大区",
    // 哥伦比亚 - Colombia - CO
    "昆迪納馬卡省" : "昆迪纳马尔卡省",
    // 中国 - China - CN
    "Changhua" : "彰化县",
    "taichung city" : "台中市",
    "Taoyuan" : "桃园市",
    "臺北市" : "台北市",
    "臺灣省 or 台灣省" : "中部地区",
    "中华民国" : "台湾",
    // 德国 - Germany - DE
    "Hesse": "黑森州",
    // 法国 - France - FR
    "Île-de-france" : "法兰西岛",
    "奧弗涅-羅訥-阿爾卑斯大區" : "阿尔卑斯大区",
    "普罗旺斯-阿尔卑斯-蔚蓝海岸大区" : "蔚蓝海岸大区",
    // 英国 - United Kingdom - GB
    "Wales" : "威尔士",
    // 希腊 - Greece - GR
    "Attica" : "阿提卡",
    // 香港 - Hong Kong - HK
    "Kowloon" : "九龙区",
    // 冰岛 - Island - IS
    "Southern Peninsula" : "雷克雅未克半岛",
    // 意大利 - Italy - IT
    "Lombardy" : "伦巴第大区",
    // 日本 - Japan - JP
    "Tokyo" : "东京都",
    "Osaka" : "大阪府",
    "福岡縣" : "福冈县",
    "千葉縣" : "千叶县",
    "埼玉縣" : "埼玉县",
    "神奈川縣" : "神奈川县",
    // 韩国 - Korea - KR
    "Gangwon-do" : "江原道",
    "North Chungcheong" : "忠清北道",
    // 立陶宛 - Lithuania - LT
    "維爾紐斯縣" : "维尔纽斯县",
    // 拉脱维亚 - Latvia - LV
    "Riga" : "里加",
    // 挪威 - Norway - NO
    // 波兰 - Porland - PL
    "Mazovia" : "摩拉维亚",
    // 塞尔维亚 - Serbia - RS 
    "Belgrade" : "贝尔格莱德",
    // 俄罗斯 - Ruassia - RU
    "Moscow" : "莫斯科州",
    // 罗马尼亚 - Romania - RO
    "伊爾福夫縣": "伊尔福夫县",
    // 沙特阿拉伯 - Saudi Arabia - SA
    "Mecca Region" : "麦加地区",
    // 瑞典 - Sweden - SE
    "Stockholm County" : "斯德哥尔摩",
    // 新加坡 - Singapore - SG
    "Central Singapore" : "中环区",
    "North West" : "西北区",
 };
  para = para ? para.trim().normalize('NFKD').replace(/[\u0300-\u036f]/g, '') : para;
  return areaMap[para] || para || region0;
};

function City_ValidCheck(para) {
  const cityMap = {
    "abadou": "豪兹省",
   };
  para = para ? para.trim().normalize('NFKD').replace(/[\u0300-\u036f]/g, '') : para;
  return cityMap[para] || para || city0;
};

function ISP_ValidCheck(para) {
  return para || ips0;
};
