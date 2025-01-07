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
  '国家：' + obj['countryCode'] + ' ' + country + '\n' +
  '地区：' + obj['region'] + ' ' + region + '\n' +
  '城市：' + obj['city'] +  '\n' +
  'IP：' + obj['query'] + '\n' +
  '服务商：' + obj['isp'] + '\n' +
  '经纬度：' + obj['lat'] + ' / ' + obj['lon'] + '\n' +
  '时区：' + obj['timezone'];

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
    "叶里温" : "耶列万省",
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
    "石勒苏益格-荷尔斯泰因" : "石荷州",
    // 丹麦 - The Kingdom of Denmark - DK
    "Capital Region" : "哥本哈根大区",
    // 爱沙尼亚 - Republic of Estonia - EE
    "哈爾尤縣" : "哈尔尤县",
    // 法国 - France - FR
    "Île-de-France" : "法兰西岛",
    "奧弗涅-羅訥-阿爾卑斯大區" : "阿尔卑斯大区",
    "普罗旺斯-阿尔卑斯-蔚蓝海岸大区" : "蔚蓝海岸大区",
    // 英国 - United Kingdom - GB
    "Wales" : "威尔士",
    // 希腊 - Greece - GR
    "Attica" : "阿提卡",
    // 香港 - Hong Kong - HK
    "Kowloon" : "九龙区",
    // 爱尔兰 - Ireland - IE
    "倫斯特省" : "伦斯特省",
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
    // 墨西哥 - The United Mexican States - MX
    "克雷塔羅州" : "克雷塔罗州",
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
    "Stockholm" : "斯德哥尔摩",
    "Stockholm County" : "斯德哥尔摩",
    // 新加坡 - Singapore - SG
    "Central Singapore" : "中环区",
    "North West" : "西北区",
    // 美国 - The United States of America - US
    "加州" : "加利福尼亚州",
 };
  para = para ? para.trim() : para;
  return areaMap[para] || para;
};

function City_ValidCheck(para) {
  const cityMap = {
    // 亚美尼亚-叶里温
    "YEREVAN" : "叶里温",
    // 巴西-圣保罗州
    "São Paulo" : "圣保罗",
    "VINHEDO" : "温赫杜",
    // 智利-圣地亚哥大区
    "LAMPA" : "拉帕",
    // 哥伦比亚-昆迪纳马尔卡省
    "COTA" : "科塔",
    // 德国-黑森州
    "FRANKFURT" : "法兰克福",
    // 德国-石勒苏益格-荷尔斯泰因
    "諾德施泰特" : "诺德施泰特",
    // 西班牙-马德里自治区
    "查馬丁區" : "查马丁区",
    // 法国-蔚蓝海岸大区
    "伊斯特爾" : "伊斯特尔",
    // 英国-英格兰
    "HARLESDEN" : "伦敦",
    // 匈牙利-佩斯州
    "SZIGETSZENTMIKLOS" : "锡盖特圣米克洛什",
    // 以色列-中央区
     "RUSH HA‘AYIN" : "罗什艾因",
    // 印度-恰蒂斯加尔邦
    "BILASPUR" : "比拉斯布尔",
    // 印度-卡纳塔克邦
    "BADAFANHATTI" : "巴达甘哈提",
    // 印度-马哈拉施特拉邦
    "SANTA CRUZ" : "孟买·圣克鲁兹",
    "新孟買": "新孟买",
    // 印度-泰米尔纳德邦
    "TIREVANMIYUR" : "钦奈市",
    // 意大利-伦巴第大区
    "GALLARATE" : "加拉拉泰",
    "PONTE SAN PIETRO" : "圣彼得桥",
    // 日本-东京都
    "東京都": "东京都",
    "CHIYODA": "千代田区",
    "SHIBUYA": "涩谷区",
    // 日本-埼玉县
    "NEGISHI": "根岸",
    // 日本-大阪府
    "OSAKA" : "大阪市",
    "OKUBO-NAKA" : "大久保中",
    // 日本-福冈县
    "福岡市" : "福冈市",
    // 韩国-忠清北道
    "YEONGDONG-GUN" : "永同郡",
    // 拉脱维亚-里加
    "RIGA" : "里加",
    // 墨西哥-克雷塔罗州
    "QUERETARO" : "克雷塔罗",
    // 波兰-摩拉维亚
    "普魯斯科夫" : "普鲁斯科夫",
    // 瑞典-斯德哥尔摩
    "STENINGE" : "斯特宁厄",
    // 挪威-阿克什胡斯郡
    "JESSHEIM" : "杰斯海姆",
    // 塞尔维亚-贝尔格莱德
    "RUCKA" : "鲁卡镇",
    // 俄罗斯-莫斯科州
    "多莫傑多沃" : "多莫杰多沃",
    // 罗马尼亚-伊尔福夫县
    "VOLUNTARI" : "沃伦塔里",
    // 沙特阿拉伯-利雅得省
    "SHA`IB AL MALQAH" : "沙伊布·阿尔·马尔卡",
    // 土耳其-伊斯坦布尔
    "KOCASINAN" : "科卡西楠",
    // 台湾-桃园市
    "中壢" : "中坜区",
    // 美国-加利福尼亚州
    "SAN JOSE" : "圣荷西",
    "聖荷西" : "圣荷西",
    // 美国-弗吉尼亚州
    "ASHBURN" : "阿什本",
    "RESTON": "里斯顿",
    "馬納薩斯" : "马纳萨斯",
    // 美国-德克萨斯州
    "達拉斯" : "达拉斯",
    // 美国-俄勒冈州
    "波特蘭": "波特兰",
    // 美国-俄亥俄州
    "DUBLIN": "都柏林",
   };
  para = para ? para.trim() : para;
  return cityMap[para] || para;
};

function ISP_ValidCheck(para) {
  return para || ips0;
};
