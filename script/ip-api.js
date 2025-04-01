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
["HT", "🇭🇹"], ["HU", "🇭🇺"], ["ID", "🇮🇩"], ["IE", "🇮🇪"], ["IL", "🇮🇱"], ["IM", "🇮🇲"], ["IN", "🇮🇳"], ["IQ", "🇮🇶"], ["IR", "🇮🇷"], ["IS", "🇮🇸"], ["IT", "🇮🇹"], ["JM", "🇯🇲"],
["JO", "🇯🇴"], ["JP", "🇯🇵"], ["KE", "🇰🇪"], ["KG", "🇰🇬"], ["KH", "🇰🇭"], ["KI", "🇰🇮"], ["KM", "🇰🇲"], ["KN", "🇰🇳"], ["KP", "🇰🇵"], ["KR", "🇰🇷"], ["KW", "🇰🇼"], ["KY", "🇰🇾"],
["KZ", "🇰🇿"], ["LA", "🇱🇦"], ["LB", "🇱🇧"], ["LC", "🇱🇨"], ["LI", "🇱🇮"], ["LK", "🇱🇰"], ["LR", "🇱🇷"], ["LS", "🇱🇸"], ["LT", "🇱🇹"], ["LU", "🇱🇺"], ["LV", "🇱🇻"], ["LY", "🇱🇾"],
["MA", "🇲🇦"], ["MC", "🇲🇨"], ["MD", "🇲🇩"], ["MG", "🇲🇬"], ["MH", "🇲🇭"], ["MK", "🇲🇰"], ["ML", "🇲🇱"], ["MM", "🇲🇲"], ["MN", "🇲🇳"], ["MO", "🇲🇴"], ["MP", "🇲🇵"], ["MQ", "🇲🇶"],
["MR", "🇲🇷"], ["MS", "🇲🇸"], ["MT", "🇲🇹"], ["MU", "🇲🇺"], ["MV", "🇲🇻"], ["MW", "🇲🇼"], ["MX", "🇲🇽"], ["MY", "🇲🇾"], ["MZ", "🇲🇿"], ["NA", "🇳🇦"], ["NC", "🇳🇨"], ["NE", "🇳🇪"], 
["NF", "🇳🇫"], ["NG", "🇳🇬"], ["NI", "🇳🇮"], ["NL", "🇳🇱"], ["NO", "🇳🇴"], ["NP", "🇳🇵"], ["NR", "🇳🇷"], ["NZ", "🇳🇿"], ["OM", "🇴🇲"], ["PA", "🇵🇦"], ["PE", "🇵🇪"], ["PF", "🇵🇫"],
["PG", "🇵🇬"], ["PH", "🇵🇭"], ["PK", "🇵🇰"], ["PL", "🇵🇱"], ["PM", "🇵🇲"], ["PR", "🇵🇷"], ["PS", "🇵🇸"], ["PT", "🇵🇹"], ["PW", "🇵🇼"], ["PY", "🇵🇾"], ["QA", "🇶🇦"], ["RE", "🇷🇪"],
["RO", "🇷🇴"], ["RS", "🇷🇸"], ["RU", "🇷🇺"], ["RW", "🇷🇼"], ["SA", "🇸🇦"], ["SB", "🇸🇧"], ["SC", "🇸🇨"], ["SD", "🇸🇩"], ["SE", "🇸🇪"], ["SG", "🇸🇬"], ["SI", "🇸🇮"], ["SK", "🇸🇰"],
["SL", "🇸🇱"], ["SM", "🇸🇲"], ["SN", "🇸🇳"], ["SR", "🇸🇷"], ["ST", "🇸🇹"], ["SV", "🇸🇻"], ["SY", "🇸🇾"], ["SZ", "🇸🇿"], ["TC", "🇹🇨"], ["TD", "🇹🇩"], ["TG", "🇹🇬"], ["TH", "🇹🇭"],
["TJ", "🇹🇯"], ["TL", "🇹🇱"], ["TM", "🇹🇲"], ["TN", "🇹🇳"], ["TO", "🇹🇴"], ["TR", "🇹🇷"], ["TT", "🇹🇹"], ["TV", "🇹🇻"], ["TW", "🇨🇳"], ["TZ", "🇹🇿"], ["UA", "🇺🇦"], ["UG", "🇺🇬"],
["UK", "🇬🇧"], ["UM", "🇺🇲"], ["US", "🇺🇸"], ["UY", "🇺🇾"], ["UZ", "🇺🇿"], ["VA", "🇻🇦"], ["VC", "🇻🇨"], ["VE", "🇻🇪"], ["VG", "🇻🇬"], ["VI", "🇻🇮"], ["VN", "🇻🇳"], ["VU", "🇻🇺"],
["WS", "🇼🇸"], ["YE", "🇾🇪"], ["YT", "🇾🇹"], ["ZA", "🇿🇦"], ["ZM", "🇿🇲"], ["ZW", "🇿🇼"]
]);

const country0 = "MUC";
const region0 = "韦恩大厦";
const city0 = "高谭市";
const isp0 = "MCU.com";


// 脚本开始
let body = $response.body;
let obj = JSON.parse(body);

const countryCode = obj['countryCode'];
const country = country_ValidCheck(obj['country']);
const region = Area_check(obj['regionName']);
const city = City_ValidCheck(obj['city']);
const ip = obj['query'];
const isp = ISP_ValidCheck(obj['isp']);
const lat = obj['lat'];
const lon = obj['lon'];
const timezone = obj['timezone'];

let displayCity = (city !== country && city !== region) ? city : '';

let title = flags.get(obj['countryCode']) + ' ' + country + ' ' + region;
let subtitle = (displayCity ? displayCity + ' ' : '') + obj['query'] + ' ' + ISP_ValidCheck(obj['isp']);
let description = `
--------------------------------------
${countryCode} ${country}

${obj['region']} ${region}

${obj['city']}

${ip}

${isp}

${lat} / ${lon}

${timezone}
--------------------------------------
`;
$done({title, subtitle, ip, description});

function country_ValidCheck(para) {
   const countryMap = {
     "中華民國":"台湾", "中华民国":"台湾", "俄罗斯联邦":"俄罗斯", "德意志联邦共和国":"德国",
 };
 para = para ? para.trim() : "";
 return countryMap[para] || para || country0;
};

function Area_check(para) {
  const areaMap = {
    // AE - 阿拉伯联合酋长国 - United Arab Emirates
    "Dubai" : "迪拜",
    "Imārat Umm al Qaywayn" : "乌姆盖万",
    // AF - 摩洛哥王国 - Kingdom of Morocco
    "Fès-Meknès" : "非斯-梅克内斯大区",
    // AM - 亚美尼亚共和国 - Republic of Armenia
    "葉里溫" : "埃里温",
    // AT - 奥地利共和国 - Republic of Austria
    "Vienna" : "维也纳",
    // AU - 澳大利亚联邦 - Commonwealth of Australia
    "new south wales" : "新南威尔士州",
    "Victoria" : "维多利亚州",
    // AR - 阿根廷共和国 - The República Argentina
    "Buenos Aires F.D." : "布宜诺斯艾利斯联邦区",
    // AZ - 阿塞拜疆共和国 - Republic of Azerbaijan
    "Baku City" : "巴库市",
    // BE - 比利时王国- Kingdom of Belgium
    "布鲁塞尔首都大区" : "布鲁塞尔", 
    // BR - 巴西联邦共和国- Federative Republic of Brazil
    "Sao Paulo" : "圣保罗州", 
    "聖保羅州" : "圣保罗州",
    // BG - 保加利亚共和国 - Republic of Bulgaria
    "Sofia-Capital" : "索菲亚市",
    // CA - 加拿大自治领 - The Dominion of Canada
    "Quebec" : "魁北克市",
    // CH - 瑞士联邦 - Swiss Confederation
    "Zurich" : "苏黎世州",
    // CL - 智利共和国 - Republic of Chile
    "圣地亚哥首都大区" : "圣地亚哥大区",
    // CO - 哥伦比亚共和国 - Republic of Colombia
    "波哥大首都地区" : "波哥大",
    "昆迪納馬卡省" : "昆迪纳马尔卡省",
    "Bogota D.C." : "波哥大首都地区",
    // CR - 哥斯达黎加共和国 - Republic of Costa Rica
    "Provincia de San José" : "圣荷西",
    // CN - 中华人民共和国 - The People's Republic of China
    "Changhua" : "彰化市",
    "Taichung City" : "台中市",
    "Taoyuan" : "桃园市",
    "臺北市" : "台北市",
    "臺灣省 or 台灣省" : "中部地区",
    "油尖旺區" : "油尖旺区",
    "中华民国" : "台湾",
    // DE - 德意志联邦共和国 - Federal Republic of Germany
    "Hesse": "黑森州",
    "石勒苏益格-荷尔斯泰因" : "石荷州",
    // DK - 丹麦王国 - The Kingdom of Denmark
    "Capital Region" : "哥本哈根大区",
    // EC - 厄瓜多尔共和国 - Republic of Ecuador
    "皮欽查省" : "皮钦查省",
    // EE - 爱沙尼亚共和国 - Republic of Estonia
    "哈爾尤縣" : "哈尔尤县",
    // ES - 西班牙王国 - The Kingdom of Spain
    "Catalonia" : "加泰罗尼亚",
    // EU - 葡萄牙共和国 - Portuguese Republic
    "里斯本區" : "里斯本区",
    "維亞納堡區" : "维亚纳堡区",
    // FR - 法兰西共和国 - French Republic
    "Île-de-France" : "法兰西岛",
    "奧弗涅-羅訥-阿爾卑斯大區" : "奥罗阿大区",
    "普罗旺斯-阿尔卑斯-蔚蓝海岸大区" : "普阿蓝大区",
    // GB - 大不列颠及北爱尔兰联合王国 - United Kingdom of Great Britain and Northern Ireland
    "Wales" : "威尔士",
    // GR - 希腊共和国 - Hellenic Republic
    "Attica" : "阿提卡",
    // GT - 危地马拉共和国 - Republic of Guatemala
    "瓜地馬拉省" : "瓜地马拉省",
    // HK - 香港 - Hong Kong
    "Kowloon" : "九龙",
    "Wong Tai Sin" : "黄大仙区",
    "北區" : "北区",
    "東區" : "东区",
    "葵青區" : "葵青区",
    "中西區" : "中西区",
    // HU - 匈牙利共和国 - Hungarian Republic
    "Budapest" : "布达佩斯",
    // IE - 爱尔兰共和国 - Republic of Ireland
    "倫斯特省" : "伦斯特省",
    // IL - 以色列国 - State of Israel
    "Rosh Ha‘Ayin" : "罗什艾因",
    // IQ - 伊拉克共和国 - Republic of Iraq
     "巴格達省" : "巴格达省",
    // IS - 冰岛共和国 - Republic of Iceland
    "Southern Peninsula" : "雷克雅未克半岛",
    // IT - 意大利共和国 - Italian Republic
    "Lombardy" : "伦巴第大区",
    // JK - 印度尼西亚共和国 - Republic of Indonesia
    "Jakarta" : "雅加达",
    // JP - 日本国 - State of Japan
    "Tokyo" : "东京都",
    "Osaka" : "大阪府",
    "福岡縣" : "福冈县",
    "千葉縣" : "千叶县",
    "埼玉縣" : "埼玉县",
    "神奈川縣" : "神奈川县",
    // KR - 大韩民国 - Republic of Korea
    "Gangwon-do" : "江原道",
    "North Chungcheong" : "忠清北道",
    // KZ - 哈萨克斯坦共和国 - Republic of Kazakhstan
    "Almaty" : "阿拉木图",
    // LT - 立陶宛共和国 - Republic of Lithuania
    "維爾紐斯縣" : "维尔纽斯县",
    // LU - 卢森堡大公国- Grand Duchy of Luxembourg
    "Luxembourg" : "卢森堡市",
    "Diekirch" : "迪基希", 
    // LV - 拉脱维亚共和国 - Republic of Latvia
    "Rīga" : "里加",
    // MD - 摩尔多瓦共和国 - Republic of Moldova
    "Chișinău Municipality" : "基希讷乌市",
    // MX - 墨西哥合众国 - The United Mexican States
    "克雷塔羅州" : "克雷塔罗州",
    // MY - 马来西亚联邦 - Federation of Malaysia
    "Kuala Lumpur" : "吉隆坡",
    // NL - 荷兰王国 - Kingdom of the Netherlands
    "North Holland" : "北荷兰省",
    // NO - 挪威王国 - Kingdom of Norway
    "Oslo County" : "东挪威",
    "Viken" : "维肯郡",
    // NP - 尼泊尔 - Nepal
    "Bagmati Province" : "巴格马蒂省",
    // PH - 菲律宾共和国 - Republic of the Philippines
    "Metro Manila" : "马尼拉大都会",
    "Northern Mindanao" : "北棉兰老",
    // PL - 波兰共和国 - Republic of Poland
    "Mazovia" : "马佐夫舍省",
    "波美拉尼亞省" : "波美拉尼亚省",
    // RS - 塞尔维亚共和国 - Republic of Serbia
    "Belgrade" : "贝尔格莱德",
    // RU - 俄罗斯联邦 - Russian Federation
    "Moscow" : "莫斯科州",
    "St.-Petersburg" : "圣彼得堡",
    "Tatarstan Republic" : "鞑靼斯坦共和国",
    // RO - 罗马尼亚共和国 - The Republic of Romania
    "București": "布加勒斯特",
    "蒂米什縣": "蒂米什县",
    "伊爾福夫縣": "伊尔福夫县",
    // SA - 沙特阿拉伯王国 - Kingdom of Saudi Arabia
    "Mecca Region" : "麦加省",
    // SE - 瑞典王国 - Kingdom of Sweden
    "Stockholm" : "斯德哥尔摩",
    "Stockholm County" : "斯德哥尔摩",
    // SG - 新加坡共和国 - Republic of Singapore
    "Central Singapore" : "中区",
    "South West" : "西南区",
    "North West" : "西北区",
    // TH - 泰王国 - Kingdom of Thailand
    "Ang Thong" : "红统府",
    // UA - 乌克兰共和国 - The Republic of Ukraine
    "Kyiv City" : "基辅市",
    // US - 美利坚合众国 - The United States of America
    "Arizona" : "亚利桑那州",
    "加州" : "加利福尼亚州",
    // VN - 越南社会主义共和国 - Socialist Republic of Vietnam
    "Hanoi" : "河内市",
    "Hòa Bình Province" : "和平省",
    "慶和省" : "庆和省",
    // ZA - 南非共和国 - Republic of South Africa
    "西開普省" : "西开普省",
 };
  para = para ? para.trim() : para;
  return areaMap[para] || para || region0;
};

function City_ValidCheck(para) {
  const cityMap = {
    // 阿联酋 - 阿布扎比
    "Masdar City" : "马斯达尔城",
    // 阿联酋 - 乌姆盖万
    "Muhadhdhib" : "穆哈德布地区",
    // 摩洛哥 - 非斯-梅克内斯大区
    "Fes" : "非斯",
    // 亚美尼亚 - 埃里温
    "Yerevan" : "埃里温",
    // 奥地利 - 维也纳
    "Vienna" : "维也纳",
    "維也納" : "维也纳",
    // 澳大利亚 - 维多利亚州
    "Melton" : "梅尔顿",
    // 阿根廷共和国 - 布宜诺斯艾利斯联邦区
    "Buenos Aires" : "布宜诺斯艾利斯",
    // 巴西 - 圣保罗州
    "Osasco" : "奥萨斯库",
    "São Paulo" : "圣保罗",
    "Sao Paulo" : "圣保罗",
    "Vinhedo" : "维涅杜",
    // 智利 - 圣地亚哥大区
    "Lampa" : "兰帕",
    // 捷克 - 南波希米亚州
    "České Budějovice" : "捷克布杰约维采",
    // 哥伦比亚 - 昆迪纳马尔卡省
    "Cota" : "科塔",
    // 德国 - 黑森州
    "Frankfurt" : "法兰克福",
    "Frankfurt am Main" : "法兰克福",
    // 德国 - 石勒苏益格-荷尔斯泰因
    "諾德施泰特" : "诺德施泰特",
    // 爱沙尼亚 - 哈尔尤县
    "Harjumaa" : "哈尔尤县",
    // 西班牙 - 马德里自治区
    "查馬丁區" : "查马丁区",
    // 法国 - 法兰西岛大区
    "奧奈叢林": "奥奈丛林",
    "伊斯特爾" : "伊斯特尔",
    // 英国 - 英格兰
    "倫敦金融城" : "伦敦",
    "Harlesden" : "哈利斯登",
    "Slough" : "斯劳",
    // 危地马拉 - 危地马拉
    "Guatemala City" : "危地马拉城",
    // 中国 - 香港
    "柴灣" : "柴湾",
    "油尖旺區" : "油尖旺区",
    "Sheung Wan" : "上环",
    "The Latitude" : "誉港湾",
    // 匈牙利 - 佩斯州
    "Szigetszentmiklós" : "锡盖特圣米克洛什",
    // 以色列 - 中央区
     "Rosh Ha‘Ayin" : "罗什艾因",
    // 印度 - 恰蒂斯加尔邦
    "BILASPUR" : "比拉斯布尔",
    // 印度 - 卡纳塔克邦
    "Badaganhatti" : "巴达甘哈提",
    // 印度 - 马哈拉施特拉邦
    "Santa Cruz" : "圣克鲁斯",
    "新孟買": "新孟买",
    // 印度 - 泰米尔纳德邦
    "Tiruvānmiyūr" : "钦奈市",
    // 意大利 - 伦巴第大区
    "Milan" : "米兰",
    "Gallarate" : "加拉拉泰",
    "Ponte San Pietro" : "蓬泰圣彼得罗",
    "Siziano" : "西齐亚诺",
    // 日本 - 东京都
    "Chiyoda": "千代田区",
    "Shibuya": "涩谷区",
    "東京都": "东京",
    // 日本 - 埼玉县
    "Negishi": "根岸",
    // 日本 - 大阪府
    "Osaka" : "大阪市",
    "Ōkubo-naka" : "熊取町",
    // 日本 - 福冈县
    "福岡市" : "福冈市",
    // 韩国 - 忠清北道
    "Yeongdong-gun" : "永同郡",
    // 韩国 - 首尔
    "Dongjak-gu" : "铜雀区",
    "Gasan-dong" : "加山洞",
    "Gangnam-gu" : "江南区",
    "Gangseo-gu" : "江西区",
    "Gwanak-gu" : "冠岳区",
    "Jowon-dong" : "枣园洞",
    // 韩国 - 京畿道
    "Bucheon-si" : "富川市",
    "Gimpo-si" : "金浦市",
    "Seongnam-si" : "城南市",
    // 哈萨克斯坦 - 阿拉木图
    "阿拉木圖" : "阿拉木图",
    // 卢森堡 - 迪基希
    "Schieren" : "希伦",
    // 卢森堡 - 卢森堡市
    "Contern" : "孔特恩",
    // 立陶宛 - 维尔纽斯县
    "Vilnius" : "维尔纽斯",
    "倫特瓦里斯" : "伦特瓦里斯",
    // 拉脱维亚 - 里加
    "Riga" : "里加",
    // 墨西哥 - 克雷塔罗州
    "Querétaro" : "克雷塔罗",
    // 尼泊尔 - 巴格马蒂省
    "加德滿都" : "加德满都",
    // 菲律宾 - 大马尼拉地区
    "Taguig" : "塔吉格",
    // 菲律宾 - 北棉兰老
    "Impaya-ao" : "布基农省",
    // 葡萄牙 - 维也纳堡区
    "Viana do Castelo" : "维亚纳堡",
    // 波兰 - 摩拉维亚
    "普魯斯科夫" : "普鲁斯科夫",
    // 挪威 - 阿克什胡斯郡
    "Jessheim" : "杰斯海姆",
    "Lorenskog" : "勒伦斯科格",
    // 塞尔维亚 - 贝尔格莱德
    "Rucka" : "新贝尔格莱德",
    // 俄罗斯 - 莫斯科州
    "多莫傑多沃" : "多莫杰多沃",
    // 俄罗斯 - 圣彼得堡
    "St Petersburg" : "圣彼得堡",
    // 罗马尼亚 - 伊尔福夫县
    "Voluntari" : "沃伦塔里",
    // 罗马尼亚 - 蒂米什县
    "Dumbrăviţa" : "敦布勒维察",
    // 沙特阿拉伯 - 利雅得省
    "Sha`ib al Malqah" : "埃尔奥拉",
    // 瑞典 - 斯德哥尔摩
    "Steninge" : "斯特宁厄",
    // 土耳其 - 伊斯坦布尔
    "Kocasinan" : "科卡西南",
    // 台湾 - 桃园市
    "中壢" : "中坜区",
    "Taoyuan" : "桃园",
    // 泰国 - 红统府
    "Ang Thong" : "红统府",
    // 乌克兰 - 克罗皮夫尼茨基州
    "Pomichna" : "波莫什纳亚",
    // 乌克兰 - 基辅市
    "Kyiv" : "基辅",
    "Yahotyn" : "雅赫特恩",
    // 美国 - 加利福尼亚州
    "San Jose" : "圣荷西",
    "費利蒙" : "费利蒙",
    "聖荷西" : "圣荷西",
    // 美国 - 弗吉尼亚州
    "Ashburn" : "阿什本",
    "Boydton" : "博伊顿",
    "Reston": "雷斯顿",
    "馬納薩斯" : "马纳萨斯",
    // 美国 - 德克萨斯州
    "達拉斯" : "达拉斯",
    "Aldine": "奥尔代恩",
    "Flower Mound": "弗洛尔蒙特",
    // 美国 - 俄勒冈州
    "波特蘭": "波特兰",
    // 美国 - 俄亥俄州
    "Dublin": "都柏林",
    "Reynoldsburg": "雷诺兹堡",
    // 美国 - 纽约州
    "Cheektowaga" : "布法罗",
    "紐約" : "纽约",
    // 美国 - 新泽西州
    "Secaucus" : "锡考克斯",
    // 越南 - 河内
    "河內市" : "河内市",
    // 越南 - 庆和省
    "芽莊市" : "芽庄市",
    // 越南 - 和平省
    "Bo" : "乐山县",
    // 南非 - 西开普省
    "開普敦" : "开普敦",
   };
  para = para ? para.trim() : para;
  return cityMap[para] || para || city0;
};

function ISP_ValidCheck(para) {
  return para || ips0;
};
