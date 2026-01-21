// 国家映射结构，支持 emoji 和中文名
const countryList = [
  { enShort: "AD", enShort3: "AND", zh: "安道尔", enFull: "Andorra", emoji: "🇦🇩" },
  { enShort: "AE", enShort3: "ARE", zh: "阿联酋", enFull: "United Arab Emirates", emoji: "🇦🇪", alias: ["阿拉伯联合酋长国", "迪拜"] },
  { enShort: "AF", enShort3: "AFG", zh: "阿富汗", enFull: "Afghanistan", emoji: "🇦🇫" },
  { enShort: "AG", enShort3: "ATG", zh: "安提瓜和巴布达", enFull: "Antigua and Barbuda", emoji: "🇦🇬" },
  { enShort: "AI", enShort3: "AIA", zh: "安圭拉", enFull: "Anguilla", emoji: "🇦🇮" },
  { enShort: "AL", enShort3: "ALB", zh: "阿尔巴尼亚", enFull: "Albania", emoji: "🇦🇱" },
  { enShort: "AM", enShort3: "ARM", zh: "亚美尼亚", enFull: "Armenia", emoji: "🇦🇲" },
  { enShort: "AO", enShort3: "AGO", zh: "安哥拉", enFull: "Angola", emoji: "🇦🇴" },
  { enShort: "AR", enShort3: "ARG", zh: "阿根廷", enFull: "Argentina", emoji: "🇦🇷" },
  { enShort: "AS", enShort3: "ASM", zh: "美属萨摩亚", enFull: "American Samoa", emoji: "🇦🇸" },
  { enShort: "AT", enShort3: "AUT", zh: "奥地利", enFull: "Austria", emoji: "🇦🇹", alias: ["Vienna"] },
  { enShort: "AQ", enShort3: "ATA", zh: "南极洲", enFull: "Antarctica", emoji: "🇦🇶" },
  { enShort: "AU", enShort3: "AUS", zh: "澳大利亚", enFull: "Australia", emoji: "🇦🇺" },
  { enShort: "AW", enShort3: "ABW", zh: "阿鲁巴", enFull: "Aruba", emoji: "🇦🇼" },
  { enShort: "AX", enShort3: "ALA", zh: "奥兰群岛", enFull: "Åland Islands", emoji: "🇦🇽" },
  { enShort: "AZ", enShort3: "AZE", zh: "阿塞拜疆", enFull: "Azerbaijan", emoji: "🇦🇿", alias: ["Baku"] },
  { enShort: "BA", enShort3: "BIH", zh: "波斯尼亚和黑塞哥维那", enFull: "Bosnia and Herzegovina", emoji: "🇧🇦" },
  { enShort: "BB", enShort3: "BRB", zh: "巴巴多斯", enFull: "Barbados", emoji: "🇧🇧" },
  { enShort: "BD", enShort3: "BGD", zh: "孟加拉国", enFull: "Bangladesh", emoji: "🇧🇩" },
  { enShort: "BE", enShort3: "BEL", zh: "比利时", enFull: "Belgium", emoji: "🇧🇪", alias: ["Brussels"] },
  { enShort: "BF", enShort3: "BFA", zh: "布基纳法索", enFull: "Burkina Faso", emoji: "🇧🇫" },
  { enShort: "BG", enShort3: "BGR", zh: "保加利亚", enFull: "Bulgaria", emoji: "🇧🇬", alias: ["Sofia"] },
  { enShort: "BH", enShort3: "BHR", zh: "巴林", enFull: "Bahrain", emoji: "🇧🇭" },
  { enShort: "BI", enShort3: "BDI", zh: "布隆迪", enFull: "Burundi", emoji: "🇧🇮" },
  { enShort: "BJ", enShort3: "BEN", zh: "贝宁", enFull: "Benin", emoji: "🇧🇯" },
  { enShort: "BL", enShort3: "BLM", zh: "圣巴泰勒米", enFull: "Saint Barthélemy", emoji: "🇧🇱" },
  { enShort: "BM", enShort3: "BMU", zh: "百慕大", enFull: "Bermuda", emoji: "🇧🇲" },
  { enShort: "BN", enShort3: "BRN", zh: "文莱达鲁萨兰国", enFull: "Brunei Darussalam", emoji: "🇧🇳" },
  { enShort: "BO", enShort3: "BOL", zh: "玻利维亚", enFull: "Bolivia, Plurinational State of", emoji: "🇧🇴" },
  { enShort: "BQ", enShort3: "BES", zh: "博内尔、圣尤斯特歇斯和萨巴", enFull: "Bonaire, Sint Eustatius and Saba", emoji: "🇧🇶" },
  { enShort: "BR", enShort3: "BRA", zh: "巴西", enFull: "Brazil", emoji: "🇧🇷", alias: ["São Paulo"] },
  { enShort: "BS", enShort3: "BHS", zh: "巴哈马", enFull: "Bahamas", emoji: "🇧🇸" },
  { enShort: "BT", enShort3: "BTN", zh: "不丹", enFull: "Bhutan", emoji: "🇧🇹" },
  { enShort: "BV", enShort3: "BVT", zh: "布韦岛", enFull: "Bouvet Island", emoji: "🇧🇻" },
  { enShort: "BW", enShort3: "BWA", zh: "博茨瓦纳", enFull: "Botswana", emoji: "🇧🇼" },
  { enShort: "BY", enShort3: "BLR", zh: "白俄罗斯", enFull: "Belarus", emoji: "🇧🇾", alias: ["Minsk"] },
  { enShort: "BZ", enShort3: "BLZ", zh: "伯利兹", enFull: "Belize", emoji: "🇧🇿" },
  { enShort: "CA", enShort3: "CAN", zh: "加拿大", enFull: "Canada", emoji: "🇨🇦", alias: ["Toronto", "Montreal", "Ottawa", "Mississauga"] },
  { enShort: "CC", enShort3: "CCK", zh: "科科斯（基林）群岛", enFull: "Cocos (Keeling) Islands", emoji: "🇨🇨" },
  { enShort: "CD", enShort3: "COD", zh: "刚果民主共和国", enFull: "Congo, The Democratic Republic of the", emoji: "🇨🇩" },
  { enShort: "CF", enShort3: "CAF", zh: "中非共和国", enFull: "Central African Republic", emoji: "🇨🇫" },
  { enShort: "CG", enShort3: "COG", zh: "刚果共和国", enFull: "Congo", emoji: "🇨🇬" },
  { enShort: "CH", enShort3: "CHE", zh: "瑞士", enFull: "Switzerland", emoji: "🇨🇭", alias: ["ZRH⚡TG@danfeng_chat", "Zurich"] },
  { enShort: "CI", enShort3: "CIV", zh: "科特迪瓦", enFull: "Côte d'Ivoire", emoji: "🇨🇮" },
  { enShort: "CK", enShort3: "COK", zh: "库克群岛", enFull: "Cook Islands", emoji: "🇨🇰" },
  { enShort: "CL", enShort3: "CHL", zh: "智利", enFull: "Chile", emoji: "🇨🇱", alias: ["智力"] },
  { enShort: "CM", enShort3: "CMR", zh: "喀麦隆", enFull: "Cameroon", emoji: "🇨🇲" },
  { enShort: "CN", enShort3: "CHN", zh: "中国", enFull: "China", emoji: "🇨🇳", alias: ["Beijing", "江苏", "山东", "安徽", "浙江", "广东", "广州", "上海", "联通", "电信", "移动"] },
  { enShort: "CO", enShort3: "COL", zh: "哥伦比亚", enFull: "Colombia", emoji: "🇨🇴" },
  { enShort: "CR", enShort3: "CRI", zh: "哥斯达黎加", enFull: "Costa Rica", emoji: "🇨🇷" },
  { enShort: "CU", enShort3: "CUB", zh: "古巴", enFull: "Cuba", emoji: "🇨🇺" },
  { enShort: "CV", enShort3: "CPV", zh: "佛得角", enFull: "Cabo Verde", emoji: "🇨🇻" },
  { enShort: "CW", enShort3: "CUW", zh: "库拉索", enFull: "Curaçao", emoji: "🇨🇼" },
  { enShort: "CX", enShort3: "CXR", zh: "圣诞岛", enFull: "Christmas Island", emoji: "🇨🇽" },
  { enShort: "CY", enShort3: "CYP", zh: "塞浦路斯", enFull: "Cyprus", emoji: "🇨🇾", alias: ["Nicosia"] },
  { enShort: "CZ", enShort3: "CZE", zh: "捷克", enFull: "Czechia", emoji: "🇨🇿", alias: ["Prague"] },
  { enShort: "DE", enShort3: "DEU", zh: "德国", enFull: "Germany", emoji: "🇩🇪", alias: ["Berlin", "German", "Franfurt" ] },
  { enShort: "DJ", enShort3: "DJI", zh: "吉布提", enFull: "Djibouti", emoji: "🇩🇯" },
  { enShort: "DK", enShort3: "DNK", zh: "丹麦", enFull: "Denmark", emoji: "🇩🇰", alias: ["Copenhagen"] },
  { enShort: "DM", enShort3: "DMA", zh: "多米尼加", enFull: "Dominica", emoji: "🇩🇲" },
  { enShort: "DO", enShort3: "DOM", zh: "多米尼加共和国", enFull: "Dominican Republic", emoji: "🇩🇴" },
  { enShort: "DZ", enShort3: "DZA", zh: "阿尔及利亚", enFull: "Algeria", emoji: "🇩🇿" },
  { enShort: "EC", enShort3: "ECU", zh: "厄瓜多尔", enFull: "Ecuador", emoji: "🇪🇨" },
  { enShort: "EE", enShort3: "EST", zh: "爱沙尼亚", enFull: "Estonia", emoji: "🇪🇪", alias: ["TLL⚡TG@danfeng_chat", "Tallinn"] },
  { enShort: "EG", enShort3: "EGY", zh: "埃及", enFull: "Egypt", emoji: "🇪🇬" },
  { enShort: "EH", enShort3: "ESH", zh: "西撒哈拉", enFull: "Western Sahara", emoji: "🇪🇭" },
  { enShort: "ER", enShort3: "ERI", zh: "厄立特里亚", enFull: "Eritrea", emoji: "🇪🇷" },
  { enShort: "ES", enShort3: "ESP", zh: "西班牙", enFull: "Spain", emoji: "🇪🇸", alias: ["spain", "Madrid"] },
  { enShort: "ET", enShort3: "ETH", zh: "埃塞俄比亚", enFull: "Ethiopia", emoji: "🇪🇹" },
  { enShort: "FI", enShort3: "FIN", zh: "芬兰", enFull: "Finland", emoji: "🇫🇮", alias: ["HEL⚡TG@danfeng_chat", "Helsinki"] },
  { enShort: "FJ", enShort3: "FJI", zh: "斐济", enFull: "Fiji", emoji: "🇫🇯" },
  { enShort: "FK", enShort3: "FLK", zh: "福克兰群岛（马尔维纳斯）", enFull: "Falkland Islands (Malvinas)", emoji: "🇫🇰" },
  { enShort: "FM", enShort3: "FSM", zh: "密克罗尼西亚联邦", enFull: "Micronesia, Federated States of", emoji: "🇫🇲" },
  { enShort: "FO", enShort3: "FRO", zh: "法罗群岛", enFull: "Faroe Islands", emoji: "🇫🇴" },
  { enShort: "FR", enShort3: "FRA", zh: "法国", enFull: "France", emoji: "🇫🇷", alias: ["france", "Paris"] },
  { enShort: "GA", enShort3: "GAB", zh: "加蓬", enFull: "Gabon", emoji: "🇬🇦" },
  { enShort: "GB", enShort3: "GBR", zh: "英国", enFull: "United Kingdom", emoji: "🇬🇧", alias: ["UK", "British", "London", "LHR", "GB⚡TG@danfeng_chat"] },
  { enShort: "GD", enShort3: "GRD", zh: "格林纳达", enFull: "Grenada", emoji: "🇬🇩" },
  { enShort: "GE", enShort3: "GEO", zh: "格鲁吉亚", enFull: "Georgia", emoji: "🇬🇪", alias: ["Tbilisi"] },
  { enShort: "GF", enShort3: "GUF", zh: "法属圭亚那", enFull: "French Guiana", emoji: "🇬🇫" },
  { enShort: "GG", enShort3: "GGY", zh: "根西岛", enFull: "Guernsey", emoji: "🇬🇬" },
  { enShort: "GH", enShort3: "GHA", zh: "加纳", enFull: "Ghana", emoji: "🇬🇭" },
  { enShort: "GI", enShort3: "GIB", zh: "直布罗陀", enFull: "Gibraltar", emoji: "🇬🇮" },
  { enShort: "GL", enShort3: "GRL", zh: "格陵兰", enFull: "Greenland", emoji: "🇬🇱" },
  { enShort: "GM", enShort3: "GMB", zh: "冈比亚", enFull: "Gambia", emoji: "🇬🇲" },
  { enShort: "GN", enShort3: "GIN", zh: "几内亚", enFull: "Guinea", emoji: "🇬🇳" },
  { enShort: "GQ", enShort3: "GNQ", zh: "赤道几内亚", enFull: "Equatorial Guinea", emoji: "🇬🇶" },
  { enShort: "GR", enShort3: "GRC", zh: "希腊", enFull: "Greece", emoji: "🇬🇷", alias: ["Athens"] },
  { enShort: "GT", enShort3: "GTM", zh: "危地马拉", enFull: "Guatemala", emoji: "🇬🇹" },
  { enShort: "GU", enShort3: "GUM", zh: "关岛", enFull: "Guam", emoji: "🇬🇺" },
  { enShort: "GW", enShort3: "GNB", zh: "几内亚比绍", enFull: "Guinea-Bissau", emoji: "🇬🇼" },
  { enShort: "GY", enShort3: "GUY", zh: "圭亚那", enFull: "Guyana", emoji: "🇬🇾" },
  { enShort: "HK", enShort3: "HKG", zh: "香港", enFull: "Hong Kong", emoji: "🇭🇰", alias: ["Hongkong", "深港", "广港", "沪港", "莞港"] },
  { enShort: "HM", enShort3: "HMD", zh: "赫德岛和麦克唐纳群岛", enFull: "Heard Island and McDonald Islands", emoji: "🇭🇲" },
  { enShort: "HN", enShort3: "HND", zh: "洪都拉斯", enFull: "Honduras", emoji: "🇭🇳" },
  { enShort: "HR", enShort3: "HRV", zh: "克罗地亚", enFull: "Croatia", emoji: "🇭🇷" },
  { enShort: "HT", enShort3: "HTI", zh: "海地", enFull: "Haiti", emoji: "🇭🇹" },
  { enShort: "HU", enShort3: "HUN", zh: "匈牙利", enFull: "Hungary", emoji: "🇭🇺", alias: ["Budapest"] },
  { enShort: "ID", enShort3: "IDN", zh: "印度尼西亚", enFull: "Indonesia", emoji: "🇮🇩" },
  { enShort: "IE", enShort3: "IRL", zh: "爱尔兰", enFull: "Ireland", emoji: "🇮🇪", alias: ["Dublin"] },
  { enShort: "IL", enShort3: "ISR", zh: "以色列", enFull: "Israel", emoji: "🇮🇱", alias:["TLV⚡TG@danfeng_chat",] },
  { enShort: "IM", enShort3: "IMN", zh: "马恩岛", enFull: "Isle of Man", emoji: "🇮🇲" },
  { enShort: "IN", enShort3: "IND", zh: "印度", enFull: "India", emoji: "🇮🇳", alias: ["Mumbai"] },
  { enShort: "IO", enShort3: "IOT", zh: "英属印度洋领地", enFull: "British Indian Ocean Territory", emoji: "🇮🇴" },
  { enShort: "IQ", enShort3: "IRQ", zh: "伊拉克", enFull: "Iraq", emoji: "🇮🇶" },
  { enShort: "IR", enShort3: "IRN", zh: "伊朗", enFull: "Iran, Islamic Republic of", emoji: "🇮🇷" },
  { enShort: "IS", enShort3: "ISL", zh: "冰岛", enFull: "Iceland", emoji: "🇮🇸", alias: ["Reykjavik"] },
  { enShort: "IT", enShort3: "ITA", zh: "意大利", enFull: "Italy", emoji: "🇮🇹", alias: ["Milan"] },
  { enShort: "JE", enShort3: "JEY", zh: "泽西岛", enFull: "Jersey", emoji: "🇯🇪" },
  { enShort: "JM", enShort3: "JAM", zh: "牙买加", enFull: "Jamaica", emoji: "🇯🇲" },
  { enShort: "JO", enShort3: "JOR", zh: "约旦", enFull: "Jordan", emoji: "🇯🇴" },
  { enShort: "JP", enShort3: "JPN", zh: "日本", enFull: "Japan", emoji: "🇯🇵", alias: ["Tokyo", "Osaka", "Kyoto", "Nagoya", "Sapporo", "Fukuoka", "NRT",] },
  { enShort: "KE", enShort3: "KEN", zh: "肯尼亚", enFull: "Kenya", emoji: "🇰🇪" },
  { enShort: "KG", enShort3: "KGZ", zh: "吉尔吉斯斯坦", enFull: "Kyrgyzstan", emoji: "🇰🇬" },
  { enShort: "KH", enShort3: "KHM", zh: "柬埔寨", enFull: "Cambodia", emoji: "🇰🇭" },
  { enShort: "KI", enShort3: "KIR", zh: "基里巴斯", enFull: "Kiribati", emoji: "🇰🇮" },
  { enShort: "KN", enShort3: "KNA", zh: "圣基茨和尼维斯", enFull: "Saint Kitts and Nevis", emoji: "🇰🇳" },
  { enShort: "KP", enShort3: "PRK", zh: "朝鲜", enFull: "North Korea", emoji: "🇰🇵" },
  { enShort: "KR", enShort3: "KOR", zh: "韩国", enFull: "Korea", emoji: "🇰🇷", alias: ["Seoul", "South Korea", "Busan", "Incheon"] },
  { enShort: "KM", enShort3: "COM", zh: "科摩罗", enFull: "Comoros", emoji: "🇰🇲" },
  { enShort: "KW", enShort3: "KWT", zh: "科威特", enFull: "Kuwait", emoji: "🇰🇼" },
  { enShort: "KY", enShort3: "CYM", zh: "开曼群岛", enFull: "Cayman Islands", emoji: "🇰🇾" },
  { enShort: "KZ", enShort3: "KAZ", zh: "哈萨克斯坦", enFull: "Kazakhstan", emoji: "🇰🇿", alias: ["Almaty"] },
  { enShort: "LA", enShort3: "LAO", zh: "老挝", enFull: "Lao People's Democratic Republic", emoji: "🇱🇦" },
  { enShort: "LB", enShort3: "LBN", zh: "黎巴嫩", enFull: "Lebanon", emoji: "🇱🇧" },
  { enShort: "LC", enShort3: "LCA", zh: "圣卢西亚", enFull: "Saint Lucia", emoji: "🇱🇨" },
  { enShort: "LI", enShort3: "LIE", zh: "列支敦士登", enFull: "Liechtenstein", emoji: "🇱🇮" },
  { enShort: "LK", enShort3: "LKA", zh: "斯里兰卡", enFull: "Sri Lanka", emoji: "🇱🇰" },
  { enShort: "LR", enShort3: "LBR", zh: "利比里亚", enFull: "Liberia", emoji: "🇱🇷" },
  { enShort: "LS", enShort3: "LSO", zh: "莱索托", enFull: "Lesotho", emoji: "🇱🇸" },
  { enShort: "LT", enShort3: "LTU", zh: "立陶宛", enFull: "Lithuania", emoji: "🇱🇹" },
  { enShort: "LU", enShort3: "LUX", zh: "卢森堡", enFull: "Luxembourg", emoji: "🇱🇺" },
  { enShort: "LV", enShort3: "LVA", zh: "拉脱维亚", enFull: "Latvia", emoji: "🇱🇻" },
  { enShort: "MA", enShort3: "MAR", zh: "摩洛哥", enFull: "Morocco", emoji: "🇲🇦" },
  { enShort: "MC", enShort3: "MCO", zh: "摩纳哥", enFull: "Monaco", emoji: "🇲🇨" },
  { enShort: "MD", enShort3: "MDA", zh: "摩尔多瓦", enFull: "Moldova, Republic of", emoji: "🇲🇩" },
  { enShort: "MG", enShort3: "MDG", zh: "马达加斯加", enFull: "Madagascar", emoji: "🇲🇬" },
  { enShort: "MH", enShort3: "MHL", zh: "马绍尔群岛", enFull: "Marshall Islands", emoji: "🇲🇭" },
  { enShort: "MK", enShort3: "MKD", zh: "北马其顿", enFull: "North Macedonia", emoji: "🇲🇰" },
  { enShort: "ML", enShort3: "MLI", zh: "马里", enFull: "Mali", emoji: "🇲🇱" },
  { enShort: "MM", enShort3: "MMR", zh: "缅甸", enFull: "Myanmar", emoji: "🇲🇲" },
  { enShort: "MN", enShort3: "MNG", zh: "蒙古", enFull: "Mongolia", emoji: "🇲🇳" },
  { enShort: "MO", enShort3: "MAC", zh: "澳门", enFull: "Macao", emoji: "🇲🇴" },
  { enShort: "MP", enShort3: "MNP", zh: "北马里亚纳群岛", enFull: "Northern Mariana Islands", emoji: "🇲🇵" },
  { enShort: "MQ", enShort3: "MTQ", zh: "马提尼克", enFull: "Martinique", emoji: "🇲🇶" },
  { enShort: "MR", enShort3: "MRT", zh: "毛里塔尼亚", enFull: "Mauritania", emoji: "🇲🇷" },
  { enShort: "MS", enShort3: "MSR", zh: "蒙特塞拉特", enFull: "Montserrat", emoji: "🇲🇸" },
  { enShort: "MT", enShort3: "MLT", zh: "马耳他", enFull: "Malta", emoji: "🇲🇹" },
  { enShort: "MU", enShort3: "MUS", zh: "毛里求斯", enFull: "Mauritius", emoji: "🇲🇺" },
  { enShort: "MV", enShort3: "MDV", zh: "马尔代夫", enFull: "Maldives", emoji: "🇲🇻" },
  { enShort: "MW", enShort3: "MWI", zh: "马拉维", enFull: "Malawi", emoji: "🇲🇼" },
  { enShort: "MX", enShort3: "MEX", zh: "墨西哥", enFull: "Mexico", emoji: "🇲🇽", alias: ["Mexico City"] },
  { enShort: "MY", enShort3: "MYS", zh: "马来西亚", enFull: "Malaysia", emoji: "🇲🇾" },
  { enShort: "NA", enShort3: "NAM", zh: "纳米比亚", enFull: "Namibia", emoji: "🇳🇦" },
  { enShort: "NC", enShort3: "NCL", zh: "新喀里多尼亚", enFull: "New Caledonia", emoji: "🇳🇨" },
  { enShort: "NE", enShort3: "NER", zh: "尼日尔", enFull: "Niger", emoji: "🇳🇪" },
  { enShort: "NF", enShort3: "NFK", zh: "诺福克岛", enFull: "Norfolk Island", emoji: "🇳🇫" },
  { enShort: "NG", enShort3: "NGA", zh: "尼日利亚", enFull: "Nigeria", emoji: "🇳🇬" },
  { enShort: "NI", enShort3: "NIC", zh: "尼加拉瓜", enFull: "Nicaragua", emoji: "🇳🇮" },
  { enShort: "NL", enShort3: "NLD", zh: "荷兰", enFull: "Netherlands", emoji: "🇳🇱", alias: ["Amsterdam"] },
  { enShort: "NO", enShort3: "NOR", zh: "挪威", enFull: "Norway", emoji: "🇳🇴", alias: ["Oslo"] },
  { enShort: "NP", enShort3: "NPL", zh: "尼泊尔", enFull: "Nepal", emoji: "🇳🇵" },
  { enShort: "NR", enShort3: "NRU", zh: "瑙鲁", enFull: "Nauru", emoji: "🇳🇷" },
  { enShort: "NU", enShort3: "NIU", zh: "纽埃", enFull: "Niue", emoji: "🇳🇺" },
  { enShort: "NZ", enShort3: "NZL", zh: "新西兰", enFull: "New Zealand", emoji: "🇳🇿" },
  { enShort: "OM", enShort3: "OMN", zh: "阿曼", enFull: "Oman", emoji: "🇴🇲", alias: ["马斯喀特"] },
  { enShort: "PA", enShort3: "PAN", zh: "巴拿马", enFull: "Panama", emoji: "🇵🇦" },
  { enShort: "PE", enShort3: "PER", zh: "秘鲁", enFull: "Peru", emoji: "🇵🇪" },
  { enShort: "PF", enShort3: "PYF", zh: "法属波利尼西亚", enFull: "French Polynesia", emoji: "🇵🇫" },
  { enShort: "PG", enShort3: "PNG", zh: "巴布亚新几内亚", enFull: "Papua New Guinea", emoji: "🇵🇬" },
  { enShort: "PH", enShort3: "PHL", zh: "菲律宾", enFull: "Philippines", emoji: "🇵🇭" },
  { enShort: "PK", enShort3: "PAK", zh: "巴基斯坦", enFull: "Pakistan", emoji: "🇵🇰" },
  { enShort: "PL", enShort3: "POL", zh: "波兰", enFull: "Poland", emoji: "🇵🇱", alias: ["Warsaw"] },
  { enShort: "PM", enShort3: "SPM", zh: "圣皮埃尔和密克隆", enFull: "Saint Pierre and Miquelon", emoji: "🇵🇲" },
  { enShort: "PN", enShort3: "PCN", zh: "皮特凯恩", enFull: "Pitcairn", emoji: "🇵🇳" },
  { enShort: "PT", enShort3: "PRT", zh: "葡萄牙", enFull: "Portugal", emoji: "🇵🇹" },
  { enShort: "PR", enShort3: "PRI", zh: "波多黎各", enFull: "Puerto Rico", emoji: "🇵🇷" },
  { enShort: "PS", enShort3: "PSE", zh: "巴勒斯坦", enFull: "Palestine, State of", emoji: "🇵🇸" },
  { enShort: "PW", enShort3: "PLW", zh: "帕劳", enFull: "Palau", emoji: "🇵🇼" },
  { enShort: "PY", enShort3: "PRY", zh: "巴拉圭", enFull: "Paraguay", emoji: "🇵🇾" },
  { enShort: "QA", enShort3: "QAT", zh: "卡塔尔", enFull: "Qatar", emoji: "🇶🇦" },
  { enShort: "RE", enShort3: "REU", zh: "留尼旺", enFull: "Réunion", emoji: "🇷🇪" },
  { enShort: "RO", enShort3: "ROU", zh: "罗马尼亚", enFull: "Romania", emoji: "🇷🇴", alias: ["Bucharest"] },
  { enShort: "RS", enShort3: "SRB", zh: "塞尔维亚", enFull: "Serbia", emoji: "🇷🇸", alias: ["Belgrade"] },
  { enShort: "RU", enShort3: "RUS", zh: "俄罗斯", enFull: "Russian Federation", emoji: "🇷🇺", alias: ["🏴‍☠_1RU", "Russia", "Moscow", "俄国"] },
  { enShort: "RW", enShort3: "RWA", zh: "卢旺达", enFull: "Rwanda", emoji: "🇷🇼" },
  { enShort: "SA", enShort3: "SAU", zh: "沙特阿拉伯", enFull: "Saudi Arabia", emoji: "🇸🇦" },
  { enShort: "SB", enShort3: "SLB", zh: "所罗门群岛", enFull: "Solomon Islands", emoji: "🇸🇧" },
  { enShort: "SC", enShort3: "SYC", zh: "塞舌尔", enFull: "Seychelles", emoji: "🇸🇨" },
  { enShort: "SD", enShort3: "SDN", zh: "苏丹", enFull: "Sudan", emoji: "🇸🇩" },
  { enShort: "SE", enShort3: "SWE", zh: "瑞典", enFull: "Sweden", emoji: "🇸🇪", alias: ["Stockholm"] },
  { enShort: "SG", enShort3: "SGP", zh: "新加坡", enFull: "Singapore", emoji: "🇸🇬", alias: ["广新", "深新"] },
  { enShort: "SH", enShort3: "SHN", zh: "圣赫勒拿、阿森松和特里斯坦达库尼亚", enFull: "Saint Helena, Ascension and Tristan da Cunha", emoji: "🇸🇭" },
  { enShort: "SI", enShort3: "SVN", zh: "斯洛文尼亚", enFull: "Slovenia", emoji: "🇸🇮", alias: ["Ljubljana"] },
  { enShort: "SJ", enShort3: "SJM", zh: "斯瓦尔巴和扬马延", enFull: "Svalbard and Jan Mayen", emoji: "🇸🇯" },
  { enShort: "SK", enShort3: "SVK", zh: "斯洛伐克", enFull: "Slovakia", emoji: "🇸🇰", alias: ["Bratislava"] },
  { enShort: "SL", enShort3: "SLE", zh: "塞拉利昂", enFull: "Sierra Leone", emoji: "🇸🇱" },
  { enShort: "SM", enShort3: "SMR", zh: "圣马力诺", enFull: "San Marino", emoji: "🇸🇲" },
  { enShort: "SN", enShort3: "SEN", zh: "塞内加尔", enFull: "Senegal", emoji: "🇸🇳" },
  { enShort: "SO", enShort3: "SOM", zh: "索马里", enFull: "Somalia", emoji: "🇸🇴" },
  { enShort: "SR", enShort3: "SUR", zh: "苏里南", enFull: "Suriname", emoji: "🇸🇷" },
  { enShort: "SS", enShort3: "SSD", zh: "南苏丹", enFull: "South Sudan", emoji: "🇸🇸" },
  { enShort: "ST", enShort3: "STP", zh: "圣多美和普林西比", enFull: "Sao Tome and Principe", emoji: "🇸🇹" },
  { enShort: "SV", enShort3: "SLV", zh: "萨尔瓦多", enFull: "El Salvador", emoji: "🇸🇻" },
  { enShort: "SX", enShort3: "SXM", zh: "荷属圣马丁", enFull: "Sint Maarten (Dutch part)", emoji: "🇸🇽" },
  { enShort: "SY", enShort3: "SYR", zh: "叙利亚", enFull: "Syrian Arab Republic", emoji: "🇸🇾" },
  { enShort: "SZ", enShort3: "SWZ", zh: "斯威士兰", enFull: "Eswatini", emoji: "🇸🇿" },
  { enShort: "TC", enShort3: "TCA", zh: "特克斯和凯科斯群岛", enFull: "Turks and Caicos Islands", emoji: "🇹🇨" },
  { enShort: "TD", enShort3: "TCD", zh: "乍得", enFull: "Chad", emoji: "🇹🇩" },
  { enShort: "TF", enShort3: "ATF", zh: "法属南部领地", enFull: "French Southern Territories", emoji: "🇹🇫" },
  { enShort: "TG", enShort3: "TGO", zh: "多哥", enFull: "Togo", emoji: "🇹🇬" },
  { enShort: "TH", enShort3: "THA", zh: "泰国", enFull: "Thailand", emoji: "🇹🇭", alias: ["TH⚡TG@danfeng_chat"] }
  { enShort: "TJ", enShort3: "TJK", zh: "塔吉克斯坦", enFull: "Tajikistan", emoji: "🇹🇯" },
  { enShort: "TK", enShort3: "TKL", zh: "托克劳", enFull: "Tokelau", emoji: "🇹🇰" },
  { enShort: "TL", enShort3: "TLS", zh: "东帝汶", enFull: "Timor-Leste", emoji: "🇹🇱" },
  { enShort: "TM", enShort3: "TKM", zh: "土库曼斯坦", enFull: "Turkmenistan", emoji: "🇹🇲" },
  { enShort: "TN", enShort3: "TUN", zh: "突尼斯", enFull: "Tunisia", emoji: "🇹🇳" },
  { enShort: "TO", enShort3: "TON", zh: "汤加", enFull: "Tonga", emoji: "🇹🇴" },
  { enShort: "TT", enShort3: "TTO", zh: "特立尼达和多巴哥", enFull: "Trinidad and Tobago", emoji: "🇹🇹" },
  { enShort: "TR", enShort3: "TUR", zh: "土耳其", enFull: "Turkey", emoji: "🇹🇷" },
  { enShort: "TV", enShort3: "TUV", zh: "图瓦卢", enFull: "Tuvalu", emoji: "🇹🇻" },
  { enShort: "TW", enShort3: "TWN", zh: "台湾", enFull: "Taiwan", emoji: "🇨🇳", alias: ["TW⚡TG@danfeng_chat","Taipei","中华民国", "中国台湾"] },
  { enShort: "TZ", enShort3: "TZA", zh: "坦桑尼亚", enFull: "Tanzania, United Republic of", emoji: "🇹🇿" },
  { enShort: "UG", enShort3: "UGA", zh: "乌干达", enFull: "Uganda", emoji: "🇺🇬" },
  { enShort: "UA", enShort3: "UKR", zh: "乌克兰", enFull: "Ukraine", emoji: "🇺🇦", alias: ["Kyiv"] },
  { enShort: "UM", enShort3: "UMI", zh: "美国本土外小岛屿", enFull: "United States Minor Outlying Islands", emoji: "🇺🇲" },
  { enShort: "UN", enShort3: "UNI", zh: "联合国", enFull: "United Nations", emoji: "🇺🇳" },
  { enShort: "US", enShort3: "USA", zh: "美国", enFull: "United States", emoji: "🇺🇸", alias: ["EWR⚡TG@danfeng_chat", "US⚡TG@danfeng_chat", "LAX", "SJC", "Chicago", "Los Angeles", "New York", "NewYork", "San Jose", "西雅图", "阿什本"] },
  { enShort: "UY", enShort3: "URY", zh: "乌拉圭", enFull: "Uruguay", emoji: "🇺🇾" },
  { enShort: "UZ", enShort3: "UZB", zh: "乌兹别克斯坦", enFull: "Uzbekistan", emoji: "🇺🇿" },
  { enShort: "VA", enShort3: "VAT", zh: "梵蒂冈", enFull: "Holy See (Vatican City State)", emoji: "🇻🇦" },
  { enShort: "VC", enShort3: "VCT", zh: "圣文森特和格林纳丁斯", enFull: "Saint Vincent and the Grenadines", emoji: "🇻🇨" },
  { enShort: "VE", enShort3: "VEN", zh: "委内瑞拉", enFull: "Venezuela, Bolivarian Republic of", emoji: "🇻🇪" },
  { enShort: "VG", enShort3: "VGB", zh: "英属维尔京群岛", enFull: "Virgin Islands, British", emoji: "🇻🇬" },
  { enShort: "VI", enShort3: "VIR", zh: "美属维尔京群岛", enFull: "Virgin Islands, U.S.", emoji: "🇻🇮" },
  { enShort: "VN", enShort3: "VNM", zh: "越南", enFull: "Viet Nam", emoji: "🇻🇳", alias:["VN⚡TG@danfeng_chat"] },
  { enShort: "VU", enShort3: "VUT", zh: "瓦努阿图", enFull: "Vanuatu", emoji: "🇻🇺" },
  { enShort: "WF", enShort3: "WLF", zh: "瓦利斯和富图纳", enFull: "Wallis and Futuna", emoji: "🇼🇫" },
  { enShort: "WS", enShort3: "WSM", zh: "萨摩亚", enFull: "Samoa", emoji: "🇼🇸" },
  { enShort: "YE", enShort3: "YEM", zh: "也门", enFull: "Yemen", emoji: "🇾🇪" },
  { enShort: "ZA", enShort3: "ZAF", zh: "南非", enFull: "South Africa", emoji: "🇿🇦", alias: ["Johannesburg"] },
  { enShort: "ZM", enShort3: "ZMB", zh: "赞比亚", enFull: "Zambia", emoji: "🇿🇲" },
  { enShort: "ZW", enShort3: "ZWE", zh: "津巴布韦", enFull: "Zimbabwe", emoji: "🇿🇼" }
];

// 来源识别映射（用于构建机场前缀）
const sourceMap = [

];

const ispMap = [
  { key: "电信", suffix: "CT" },
  { key: "联通", suffix: "CU" },
  { key: "移动", suffix: "CM" },
  { key: "铁通", suffix: "TT" },
  { key: "教育网", suffix: "EDU" }
];

// 默认关键词映射表
const defaultOthers = [
  { key: '[Premium]', value: '[Premium]' },
  { key: 'Relay', value: 'Relay' },
  { key: 'IPLC', value: 'IPLC' },
  { key: '专线', value: 'Spec' },
  { key: '专用', value: 'VIP' },
  { key: '核心', value: 'Core' },
  { key: '边缘', value: 'Edge' },
  { key: '高级', value: 'Pro' },
  { key: '标准', value: 'Std' },
  { key: '实验', value: 'Exp' },
  { key: '商宽', value: 'Biz' },
  { key: '住宅', value: 'ISP' },
  { key: '家宽', value: 'ISP' },
];

// 动态构建国家映射 Map（多键映射）
function buildCountryMap(outputKey) {
  const map = new Map();
  for (const country of countryList) {
    const entry = {
      name: country[outputKey],
      emoji: country.emoji,
      count: 0,
      alias: country.alias || [],
    };

    // 添加所有可识别字段（统一指向 entry）
    const keys = [
      country.zh,
      country.enShort,
      country.enShort3,
      country.enFull,
      ...(entry.alias || []),
    ];

    for (const key of keys) {
      if (key && key.length >= 2) {
        map.set(key.toLowerCase(), entry);
      }
    }
  }
  return map;
}

// 简繁转换函数
function charPYStr() {
  return '锕皑蔼碍爱嗳嫒瑷暧霭谙铵鹌肮袄奥媪骜鳌坝罢钯摆败呗颁办绊钣帮绑镑谤剥饱宝报鲍鸨龅辈贝钡狈备惫鹎贲锛绷笔毕毙币闭荜哔滗铋筚跸边编贬变辩辫苄缏笾标骠飑飙镖镳鳔鳖别瘪濒滨宾摈傧缤槟殡膑镔髌鬓饼禀拨钵铂驳饽钹鹁补钸财参蚕残惭惨灿骖黪苍舱仓沧厕侧册测恻层诧锸侪钗搀掺蝉馋谗缠铲产阐颤冁谄谶蒇忏婵骣觇禅镡场尝长偿肠厂畅伥苌怅阊鲳钞车彻砗尘陈衬伧谌榇碜龀撑称惩诚骋枨柽铖铛痴迟驰耻齿炽饬鸱冲冲虫宠铳畴踌筹绸俦帱雠橱厨锄雏础储触处刍绌蹰传钏疮闯创怆锤缍纯鹑绰辍龊辞词赐鹚聪葱囱从丛苁骢枞凑辏蹿窜撺错锉鹾达哒鞑带贷骀绐担单郸掸胆惮诞弹殚赕瘅箪当挡党荡档谠砀裆捣岛祷导盗焘灯邓镫敌涤递缔籴诋谛绨觌镝颠点垫电巅钿癫钓调铫鲷谍叠鲽钉顶锭订铤丢铥东动栋冻岽鸫窦犊独读赌镀渎椟牍笃黩锻断缎簖兑队对怼镦吨顿钝炖趸夺堕铎鹅额讹恶饿谔垩阏轭锇锷鹗颚颛鳄诶儿尔饵贰迩铒鸸鲕发罚阀珐矾钒烦贩饭访纺钫鲂飞诽废费绯镄鲱纷坟奋愤粪偾丰枫锋风疯冯缝讽凤沣肤辐抚辅赋复负讣妇缚凫驸绂绋赙麸鲋鳆钆该钙盖赅杆赶秆赣尴擀绀冈刚钢纲岗戆镐睾诰缟锆搁鸽阁铬个纥镉颍给亘赓绠鲠龚宫巩贡钩沟苟构购够诟缑觏蛊顾诂毂钴锢鸪鹄鹘剐挂鸹掴关观馆惯贯诖掼鹳鳏广犷规归龟闺轨诡贵刽匦刿妫桧鲑鳜辊滚衮绲鲧锅国过埚呙帼椁蝈铪骇韩汉阚绗颉号灏颢阂鹤贺诃阖蛎横轰鸿红黉讧荭闳鲎壶护沪户浒鹕哗华画划话骅桦铧怀坏欢环还缓换唤痪焕涣奂缳锾鲩黄谎鳇挥辉毁贿秽会烩汇讳诲绘诙荟哕浍缋珲晖荤浑诨馄阍获货祸钬镬击机积饥迹讥鸡绩缉极辑级挤几蓟剂济计记际继纪讦诘荠叽哜骥玑觊齑矶羁虿跻霁鲚鲫夹荚颊贾钾价驾郏浃铗镓蛲歼监坚笺间艰缄茧检碱硷拣捡简俭减荐槛鉴践贱见键舰剑饯渐溅涧谏缣戋戬睑鹣笕鲣鞯将浆蒋桨奖讲酱绛缰胶浇骄娇搅铰矫侥脚饺缴绞轿较挢峤鹪鲛阶节洁结诫届疖颌鲒紧锦仅谨进晋烬尽劲荆茎卺荩馑缙赆觐鲸惊经颈静镜径痉竞净刭泾迳弪胫靓纠厩旧阄鸠鹫驹举据锯惧剧讵屦榉飓钜锔窭龃鹃绢锩镌隽觉决绝谲珏钧军骏皲开凯剀垲忾恺铠锴龛闶钪铐颗壳课骒缂轲钶锞颔垦恳龈铿抠库裤喾块侩郐哙脍宽狯髋矿旷况诓诳邝圹纩贶亏岿窥馈溃匮蒉愦聩篑阃锟鲲扩阔蛴蜡腊莱来赖崃徕涞濑赉睐铼癞籁蓝栏拦篮阑兰澜谰揽览懒缆烂滥岚榄斓镧褴琅阆锒捞劳涝唠崂铑铹痨乐鳓镭垒类泪诔缧篱狸离鲤礼丽厉励砾历沥隶俪郦坜苈莅蓠呖逦骊缡枥栎轹砺锂鹂疠粝跞雳鲡鳢俩联莲连镰怜涟帘敛脸链恋炼练蔹奁潋琏殓裢裣鲢粮凉两辆谅魉疗辽镣缭钌鹩猎临邻鳞凛赁蔺廪檩辚躏龄铃灵岭领绫棂蛏鲮馏刘浏骝绺镏鹨龙聋咙笼垄拢陇茏泷珑栊胧砻楼娄搂篓偻蒌喽嵝镂瘘耧蝼髅芦卢颅庐炉掳卤虏鲁赂禄录陆垆撸噜闾泸渌栌橹轳辂辘氇胪鸬鹭舻鲈峦挛孪滦乱脔娈栾鸾銮抡轮伦仑沦纶论囵萝罗逻锣箩骡骆络荦猡泺椤脶镙驴吕铝侣屡缕虑滤绿榈褛锊呒妈玛码蚂马骂吗唛嬷杩买麦卖迈脉劢瞒馒蛮满谩缦镘颡鳗猫锚铆贸麽没镁门闷们扪焖懑钔锰梦眯谜弥觅幂芈谧猕祢绵缅渑腼黾庙缈缪灭悯闽闵缗鸣铭谬谟蓦馍殁镆谋亩钼呐钠纳难挠脑恼闹铙讷馁内拟腻铌鲵撵辇鲶酿鸟茑袅聂啮镊镍陧蘖嗫颟蹑柠狞宁拧泞苎咛聍钮纽脓浓农侬哝驽钕诺傩疟欧鸥殴呕沤讴怄瓯盘蹒庞抛疱赔辔喷鹏纰罴铍骗谝骈飘缥频贫嫔苹凭评泼颇钋扑铺朴谱镤镨栖脐齐骑岂启气弃讫蕲骐绮桤碛颀颃鳍牵钎铅迁签谦钱钳潜浅谴堑佥荨悭骞缱椠钤枪呛墙蔷强抢嫱樯戗炝锖锵镪羟跄锹桥乔侨翘窍诮谯荞缲硗跷窃惬锲箧钦亲寝锓轻氢倾顷请庆揿鲭琼穷茕蛱巯赇虮鳅趋区躯驱龋诎岖阒觑鸲颧权劝诠绻辁铨却鹊确阕阙悫让饶扰绕荛娆桡热韧认纫饪轫荣绒嵘蝾缛铷颦软锐蚬闰润洒萨飒鳃赛伞毵糁丧骚扫缫涩啬铯穑杀刹纱铩鲨筛晒酾删闪陕赡缮讪姗骟钐鳝墒伤赏垧殇觞烧绍赊摄慑设厍滠畲绅审婶肾渗诜谂渖声绳胜师狮湿诗时蚀实识驶势适释饰视试谥埘莳弑轼贳铈鲥寿兽绶枢输书赎属术树竖数摅纾帅闩双谁税顺说硕烁铄丝饲厮驷缌锶鸶耸怂颂讼诵擞薮馊飕锼苏诉肃谡稣虽随绥岁谇孙损笋荪狲缩琐锁唢睃獭挞闼铊鳎台态钛鲐摊贪瘫滩坛谭谈叹昙钽锬顸汤烫傥饧铴镗涛绦讨韬铽腾誊锑题体屉缇鹈阗条粜龆鲦贴铁厅听烃铜统恸头钭秃图钍团抟颓蜕饨脱鸵驮驼椭箨鼍袜娲腽弯湾顽万纨绾网辋韦违围为潍维苇伟伪纬谓卫诿帏闱沩涠玮韪炜鲔温闻纹稳问阌瓮挝蜗涡窝卧莴龌呜钨乌诬无芜吴坞雾务误邬庑怃妩骛鹉鹜锡牺袭习铣戏细饩阋玺觋虾辖峡侠狭厦吓硖鲜纤贤衔闲显险现献县馅羡宪线苋莶藓岘猃娴鹇痫蚝籼跹厢镶乡详响项芗饷骧缃飨萧嚣销晓啸哓潇骁绡枭箫协挟携胁谐写泻谢亵撷绁缬锌衅兴陉荥凶汹锈绣馐鸺虚嘘须许叙绪续诩顼轩悬选癣绚谖铉镟学谑泶鳕勋询寻驯训讯逊埙浔鲟压鸦鸭哑亚讶垭娅桠氩阉烟盐严岩颜阎艳厌砚彦谚验厣赝俨兖谳恹闫酽魇餍鼹鸯杨扬疡阳痒养样炀瑶摇尧遥窑谣药轺鹞鳐爷页业叶靥谒邺晔烨医铱颐遗仪蚁艺亿忆义诣议谊译异绎诒呓峄饴怿驿缢轶贻钇镒镱瘗舣荫阴银饮隐铟瘾樱婴鹰应缨莹萤营荧蝇赢颖茔莺萦蓥撄嘤滢潆璎鹦瘿颏罂哟拥佣痈踊咏镛优忧邮铀犹诱莸铕鱿舆鱼渔娱与屿语狱誉预驭伛俣谀谕蓣嵛饫阈妪纡觎欤钰鹆鹬龉鸳渊辕园员圆缘远橼鸢鼋约跃钥粤悦阅钺郧匀陨运蕴酝晕韵郓芸恽愠纭韫殒氲杂灾载攒暂赞瓒趱錾赃脏驵凿枣责择则泽赜啧帻箦贼谮赠综缯轧铡闸栅诈斋债毡盏斩辗崭栈战绽谵张涨帐账胀赵诏钊蛰辙锗这谪辄鹧贞针侦诊镇阵浈缜桢轸赈祯鸩挣睁狰争帧症郑证诤峥钲铮筝织职执纸挚掷帜质滞骘栉栀轵轾贽鸷蛳絷踬踯觯钟终种肿众锺诌轴皱昼骤纣绉猪诸诛烛瞩嘱贮铸驻伫槠铢专砖转赚啭馔颞桩庄装妆壮状锥赘坠缀骓缒谆准着浊诼镯兹资渍谘缁辎赀眦锱龇鲻踪总纵偬邹诹驺鲰诅组镞钻缵躜鳟翱并卜沉丑淀迭斗范干皋硅柜后伙秸杰诀夸里凌么霉捻凄扦圣尸抬涂洼喂污锨咸蝎彝涌游吁御愿岳云灶扎札筑于志注凋讠谫郄勐凼坂垅垴埯埝苘荬荮莜莼菰藁揸吒吣咔咝咴噘噼嚯幞岙嵴彷徼犸狍馀馇馓馕愣憷懔丬溆滟溷漤潴澹甯纟绔绱珉枧桊桉槔橥轱轷赍肷胨飚煳煅熘愍淼砜磙眍钚钷铘铞锃锍锎锏锘锝锪锫锿镅镎镢镥镩镲稆鹋鹛鹱疬疴痖癯裥襁耢颥螨麴鲅鲆鲇鲞鲴鲺鲼鳊鳋鳘鳙鞒鞴齄';
}
function ftPYStr() {
  return '錒皚藹礙愛噯嬡璦曖靄諳銨鵪骯襖奧媼驁鰲壩罷鈀擺敗唄頒辦絆鈑幫綁鎊謗剝飽寶報鮑鴇齙輩貝鋇狽備憊鵯賁錛繃筆畢斃幣閉蓽嗶潷鉍篳蹕邊編貶變辯辮芐緶籩標驃颮飆鏢鑣鰾鱉別癟瀕濱賓擯儐繽檳殯臏鑌髕鬢餅稟撥缽鉑駁餑鈸鵓補鈽財參蠶殘慚慘燦驂黲蒼艙倉滄廁側冊測惻層詫鍤儕釵攙摻蟬饞讒纏鏟產闡顫囅諂讖蕆懺嬋驏覘禪鐔場嘗長償腸廠暢倀萇悵閶鯧鈔車徹硨塵陳襯傖諶櫬磣齔撐稱懲誠騁棖檉鋮鐺癡遲馳恥齒熾飭鴟沖衝蟲寵銃疇躊籌綢儔幬讎櫥廚鋤雛礎儲觸處芻絀躕傳釧瘡闖創愴錘綞純鶉綽輟齪辭詞賜鶿聰蔥囪從叢蓯驄樅湊輳躥竄攛錯銼鹺達噠韃帶貸駘紿擔單鄲撣膽憚誕彈殫賧癉簞當擋黨蕩檔讜碭襠搗島禱導盜燾燈鄧鐙敵滌遞締糴詆諦綈覿鏑顛點墊電巔鈿癲釣調銚鯛諜疊鰈釘頂錠訂鋌丟銩東動棟凍崠鶇竇犢獨讀賭鍍瀆櫝牘篤黷鍛斷緞籪兌隊對懟鐓噸頓鈍燉躉奪墮鐸鵝額訛惡餓諤堊閼軛鋨鍔鶚顎顓鱷誒兒爾餌貳邇鉺鴯鮞發罰閥琺礬釩煩販飯訪紡鈁魴飛誹廢費緋鐨鯡紛墳奮憤糞僨豐楓鋒風瘋馮縫諷鳳灃膚輻撫輔賦復負訃婦縛鳧駙紱紼賻麩鮒鰒釓該鈣蓋賅桿趕稈贛尷搟紺岡剛鋼綱崗戇鎬睪誥縞鋯擱鴿閣鉻個紇鎘潁給亙賡綆鯁龔宮鞏貢鉤溝茍構購夠詬緱覯蠱顧詁轂鈷錮鴣鵠鶻剮掛鴰摑關觀館慣貫詿摜鸛鰥廣獷規歸龜閨軌詭貴劊匭劌媯檜鮭鱖輥滾袞緄鯀鍋國過堝咼幗槨蟈鉿駭韓漢闞絎頡號灝顥閡鶴賀訶闔蠣橫轟鴻紅黌訌葒閎鱟壺護滬戶滸鶘嘩華畫劃話驊樺鏵懷壞歡環還緩換喚瘓煥渙奐繯鍰鯇黃謊鰉揮輝毀賄穢會燴匯諱誨繪詼薈噦澮繢琿暉葷渾諢餛閽獲貨禍鈥鑊擊機積饑跡譏雞績緝極輯級擠幾薊劑濟計記際繼紀訐詰薺嘰嚌驥璣覬齏磯羈蠆躋霽鱭鯽夾莢頰賈鉀價駕郟浹鋏鎵蟯殲監堅箋間艱緘繭檢堿鹼揀撿簡儉減薦檻鑒踐賤見鍵艦劍餞漸濺澗諫縑戔戩瞼鶼筧鰹韉將漿蔣槳獎講醬絳韁膠澆驕嬌攪鉸矯僥腳餃繳絞轎較撟嶠鷦鮫階節潔結誡屆癤頜鮚緊錦僅謹進晉燼盡勁荊莖巹藎饉縉贐覲鯨驚經頸靜鏡徑痙競凈剄涇逕弳脛靚糾廄舊鬮鳩鷲駒舉據鋸懼劇詎屨櫸颶鉅鋦窶齟鵑絹錈鐫雋覺決絕譎玨鈞軍駿皸開凱剴塏愾愷鎧鍇龕閌鈧銬顆殼課騍緙軻鈳錁頷墾懇齦鏗摳庫褲嚳塊儈鄶噲膾寬獪髖礦曠況誆誑鄺壙纊貺虧巋窺饋潰匱蕢憒聵簣閫錕鯤擴闊蠐蠟臘萊來賴崍徠淶瀨賚睞錸癩籟藍欄攔籃闌蘭瀾讕攬覽懶纜爛濫嵐欖斕鑭襤瑯閬鋃撈勞澇嘮嶗銠鐒癆樂鰳鐳壘類淚誄縲籬貍離鯉禮麗厲勵礫歷瀝隸儷酈壢藶蒞蘺嚦邐驪縭櫪櫟轢礪鋰鸝癘糲躒靂鱺鱧倆聯蓮連鐮憐漣簾斂臉鏈戀煉練蘞奩瀲璉殮褳襝鰱糧涼兩輛諒魎療遼鐐繚釕鷯獵臨鄰鱗凜賃藺廩檁轔躪齡鈴靈嶺領綾欞蟶鯪餾劉瀏騮綹鎦鷚龍聾嚨籠壟攏隴蘢瀧瓏櫳朧礱樓婁摟簍僂蔞嘍嶁鏤瘺耬螻髏蘆盧顱廬爐擄鹵虜魯賂祿錄陸壚擼嚕閭瀘淥櫨櫓轤輅轆氌臚鸕鷺艫鱸巒攣孿灤亂臠孌欒鸞鑾掄輪倫侖淪綸論圇蘿羅邏鑼籮騾駱絡犖玀濼欏腡鏍驢呂鋁侶屢縷慮濾綠櫚褸鋝嘸媽瑪碼螞馬罵嗎嘜嬤榪買麥賣邁脈勱瞞饅蠻滿謾縵鏝顙鰻貓錨鉚貿麼沒鎂門悶們捫燜懣鍆錳夢瞇謎彌覓冪羋謐獼禰綿緬澠靦黽廟緲繆滅憫閩閔緡鳴銘謬謨驀饃歿鏌謀畝鉬吶鈉納難撓腦惱鬧鐃訥餒內擬膩鈮鯢攆輦鯰釀鳥蔦裊聶嚙鑷鎳隉蘗囁顢躡檸獰寧擰濘苧嚀聹鈕紐膿濃農儂噥駑釹諾儺瘧歐鷗毆嘔漚謳慪甌盤蹣龐拋皰賠轡噴鵬紕羆鈹騙諞駢飄縹頻貧嬪蘋憑評潑頗釙撲鋪樸譜鏷鐠棲臍齊騎豈啟氣棄訖蘄騏綺榿磧頎頏鰭牽釬鉛遷簽謙錢鉗潛淺譴塹僉蕁慳騫繾槧鈐槍嗆墻薔強搶嬙檣戧熗錆鏘鏹羥蹌鍬橋喬僑翹竅誚譙蕎繰磽蹺竊愜鍥篋欽親寢鋟輕氫傾頃請慶撳鯖瓊窮煢蛺巰賕蟣鰍趨區軀驅齲詘嶇闃覷鴝顴權勸詮綣輇銓卻鵲確闋闕愨讓饒擾繞蕘嬈橈熱韌認紉飪軔榮絨嶸蠑縟銣顰軟銳蜆閏潤灑薩颯鰓賽傘毿糝喪騷掃繅澀嗇銫穡殺剎紗鎩鯊篩曬釃刪閃陜贍繕訕姍騸釤鱔墑傷賞坰殤觴燒紹賒攝懾設厙灄畬紳審嬸腎滲詵諗瀋聲繩勝師獅濕詩時蝕實識駛勢適釋飾視試謚塒蒔弒軾貰鈰鰣壽獸綬樞輸書贖屬術樹豎數攄紓帥閂雙誰稅順說碩爍鑠絲飼廝駟緦鍶鷥聳慫頌訟誦擻藪餿颼鎪蘇訴肅謖穌雖隨綏歲誶孫損筍蓀猻縮瑣鎖嗩脧獺撻闥鉈鰨臺態鈦鮐攤貪癱灘壇譚談嘆曇鉭錟頇湯燙儻餳鐋鏜濤絳討韜鋱騰謄銻題體屜緹鵜闐條糶齠鰷貼鐵廳聽烴銅統慟頭鈄禿圖釷團摶頹蛻飩脫鴕馱駝橢籜鼉襪媧膃彎灣頑萬紈綰網輞韋違圍為濰維葦偉偽緯謂衛諉幃闈溈潿瑋韙煒鮪溫聞紋穩問閿甕撾蝸渦窩臥萵齷嗚鎢烏誣無蕪吳塢霧務誤鄔廡憮嫵騖鵡鶩錫犧襲習銑戲細餼鬩璽覡蝦轄峽俠狹廈嚇硤鮮纖賢銜閑顯險現獻縣餡羨憲線莧薟蘚峴獫嫻鷴癇蠔秈躚廂鑲鄉詳響項薌餉驤緗饗蕭囂銷曉嘯嘵瀟驍綃梟簫協挾攜脅諧寫瀉謝褻擷紲纈鋅釁興陘滎兇洶銹繡饈鵂虛噓須許敘緒續詡頊軒懸選癬絢諼鉉鏇學謔澩鱈勛詢尋馴訓訊遜塤潯鱘壓鴉鴨啞亞訝埡婭椏氬閹煙鹽嚴巖顏閻艷厭硯彥諺驗厴贗儼兗讞懨閆釅魘饜鼴鴦楊揚瘍陽癢養樣煬瑤搖堯遙窯謠藥軺鷂鰩爺頁業葉靨謁鄴曄燁醫銥頤遺儀蟻藝億憶義詣議誼譯異繹詒囈嶧飴懌驛縊軼貽釔鎰鐿瘞艤蔭陰銀飲隱銦癮櫻嬰鷹應纓瑩螢營熒蠅贏穎塋鶯縈鎣攖嚶瀅瀠瓔鸚癭頦罌喲擁傭癰踴詠鏞優憂郵鈾猶誘蕕銪魷輿魚漁娛與嶼語獄譽預馭傴俁諛諭蕷崳飫閾嫗紆覦歟鈺鵒鷸齬鴛淵轅園員圓緣遠櫞鳶黿約躍鑰粵悅閱鉞鄖勻隕運蘊醞暈韻鄆蕓惲慍紜韞殞氳雜災載攢暫贊瓚趲鏨贓臟駔鑿棗責擇則澤賾嘖幘簀賊譖贈綜繒軋鍘閘柵詐齋債氈盞斬輾嶄棧戰綻譫張漲帳賬脹趙詔釗蟄轍鍺這謫輒鷓貞針偵診鎮陣湞縝楨軫賑禎鴆掙睜猙爭幀癥鄭證諍崢鉦錚箏織職執紙摯擲幟質滯騭櫛梔軹輊贄鷙螄縶躓躑觶鐘終種腫眾鍾謅軸皺晝驟紂縐豬諸誅燭矚囑貯鑄駐佇櫧銖專磚轉賺囀饌顳樁莊裝妝壯狀錐贅墜綴騅縋諄準著濁諑鐲茲資漬諮緇輜貲眥錙齜鯔蹤總縱傯鄒諏騶鯫詛組鏃鉆纘躦鱒翺並蔔沈醜澱叠鬥範幹臯矽櫃後夥稭傑訣誇裏淩麽黴撚淒扡聖屍擡塗窪餵汙鍁鹹蠍彜湧遊籲禦願嶽雲竈紮劄築於誌註雕訁譾郤猛氹阪壟堖垵墊檾蕒葤蓧蒓菇槁摣咤唚哢噝噅撅劈謔襆嶴脊仿僥獁麅餘餷饊饢楞怵懍爿漵灩混濫瀦淡寧糸絝緔瑉梘棬案橰櫫軲軤賫膁腖飈糊煆溜湣渺碸滾瞘鈈鉕鋣銱鋥鋶鐦鐧鍩鍀鍃錇鎄鎇鎿鐝鑥鑹鑔穭鶓鶥鸌癧屙瘂臒襇繈耮顬蟎麯鮁鮃鮎鯗鯝鯴鱝鯿鰠鰵鱅鞽韝齇';
}

function simplify(text) {
  let result = '';
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    const index = ftPYStr().indexOf(ch);
    result += index !== -1 ? charPYStr().charAt(index) : ch;
  }
  return result;
}

function operator(proxies) {
  const outputKey = $arguments.output || 'zh';
  const autofill = parseInt($arguments.autofill) || 2;
  const airport = $arguments.airport || '';

  const countryMap = buildCountryMap(outputKey);

  // 用户标签映射，全部转小写key
  let others = [];
  try {
    const userOthers = JSON.parse($arguments.others || '{}');
    others = Object.entries(userOthers).map(([key, value]) => ({ key: key.toLowerCase(), value }));
  } catch (e) {}
  // 默认标签
  others = others.concat(defaultOthers.map(({ key, value }) => ({ key: key.toLowerCase(), value })));

  // 重置国家计数
  for (const val of countryMap.values()) {
    val.count = 0;
  }

  proxies.forEach(res => {
    const originalName = res.name || '';
    const name = simplify(originalName.toLowerCase());

    // 来源前缀 + ISP后缀（保持原逻辑）
    const prefixes = [];
    for (const src of sourceMap) {
      if (name.includes((src.key || '').toLowerCase())) {
        prefixes.push(src.prefix || '');
        break;
      }
    }
    for (const isp of ispMap) {
      if (name.includes((isp.key || '').toLowerCase())) {
        prefixes.push(isp.suffix || '');
        break;
      }
    }
    const sourcePrefix = prefixes.join('');

    // === 国家识别（新流程） ===
    let matched = null;

    // 1) 优先 Emoji 匹配（保持现有）
    const emojis = originalName.match(/[\u{1F1E6}-\u{1F1FF}]{2}/gu) || [];
    const excludeEmoji = ['🇨🇳'];
    for (const emoji of emojis) {
      if (excludeEmoji.includes(emoji)) continue;
      for (const val of countryMap.values()) {
        if (val.emoji === emoji) {
          matched = val;
          break;
        }
      }
      if (matched) break;
    }

    // 2) 若无 emoji，按 新优先级 去匹配（zh -> enShort -> alias/enShort3）
    if (!matched) {
      // 准备 country 列表（去重 entry），并从 countryMap 的 keys 收集 zhKeys/alias/enShort/enShort3
      const countryKeys = Array.from(countryMap.keys());
      const countries = []; // { entry, zhKeys:[], aliasKeys:[], enShort, enShort3 }
      for (const key of countryKeys) {
        const entry = countryMap.get(key);
        // find or create container for this entry
        let c = countries.find(x => x.entry === entry);
        if (!c) {
          c = { entry, zhKeys: [], aliasKeys: [], enShort: null, enShort3: null };
          countries.push(c);
        }
        const kk = (key || '').toLowerCase();
        // classify key
        if (/[^\x00-\x7F]/.test(kk) && kk.length >= 1) {
          // 包含非 ASCII，认作中文/汉字相关 key
          c.zhKeys.push(kk);
        } else if (kk.length === 2) {
          c.enShort = kk;
        } else if (kk.length === 3) {
          c.enShort3 = kk;
        } else {
          // 其他（可能是 enFull / alias / 城市名 等），当作 alias 扩充
          c.aliasKeys.push(kk);
        }
      }
      // 把 entry.alias 也加入 aliasKeys（若有）
      for (const c of countries) {
        if (c.entry && c.entry.alias && Array.isArray(c.entry.alias)) {
          for (const a of c.entry.alias) {
            if (a && !c.aliasKeys.includes(a.toLowerCase())) c.aliasKeys.push(a.toLowerCase());
          }
        }
      }

      const simplified = name; // 已 simplify 的小写
      const rawLower = originalName.toLowerCase();

      // token 集（用于 enShort 两字母精确匹配）
      const alphaNumTokens = simplified.replace(/[^a-z0-9]+/g, ' ').trim().split(/\s+/).filter(Boolean);
      const rawTokens = rawLower.replace(/[^a-z0-9\u4e00-\u9fa5]+/g, ' ').trim().split(/\s+/).filter(Boolean);

      // --- 2.1 中文匹配（优先考虑最后一个 '转' 后的片段） ---
      let zhMatched = null;
      if (rawLower.includes('转')) {
        const after = rawLower.substring(rawLower.lastIndexOf('转') + 1).trim();
        if (after.length > 0) {
          const zhCandidates = [];
          for (const c of countries) {
            for (const z of c.zhKeys) {
              if (!z) continue;
              const idx = after.indexOf(z);
              if (idx !== -1) zhCandidates.push({ c, z, idx, len: z.length });
            }
          }
          if (zhCandidates.length > 0) {
            zhCandidates.sort((a,b) => (a.idx - b.idx) || (b.len - a.len));
            zhMatched = zhCandidates[0].c.entry;
          }
        }
      }

      // 如果转后没命中，再在整个字符串中做最左+最长的中文匹配
      if (!zhMatched) {
        const zhCandidates = [];
        for (const c of countries) {
          for (const z of c.zhKeys) {
            if (!z) continue;
            const idx = rawLower.indexOf(z);
            if (idx !== -1) zhCandidates.push({ c, z, idx, len: z.length });
          }
        }
        if (zhCandidates.length > 0) {
          zhCandidates.sort((a,b) => (a.idx - b.idx) || (b.len - a.len));
          zhMatched = zhCandidates[0].c.entry;
        }
      }

      if (zhMatched) {
        matched = zhMatched;
      } else {
        // --- 2.2 enShort (两字母) 精确 token 匹配（避免 chat->ch 的误判） ---
        let enShortMatched = null;
        for (const c of countries) {
          if (!c.enShort) continue;
          const code = c.enShort.toLowerCase();
          if (alphaNumTokens.includes(code) || rawTokens.includes(code)) {
            enShortMatched = c.entry;
            break;
          }
        }

        if (enShortMatched) {
          matched = enShortMatched;
        } else {
          // --- 2.3 alias 优先，然后 enShort3 ---
          let aliasOr3 = null;

          // alias 匹配（最左+最长）
          const aliasCandidates = [];
          for (const c of countries) {
            for (const a of c.aliasKeys) {
              if (!a) continue;
              const aLower = a.toLowerCase();
              if (/^[a-z0-9]+$/.test(aLower)) {
                // 英文/数字 alias 用 token 匹配
                if (alphaNumTokens.includes(aLower) || rawTokens.includes(aLower)) {
                  // 找位置
                  const idx = simplified.indexOf(aLower);
                  aliasCandidates.push({ c, idx: idx === -1 ? Infinity : idx, len: aLower.length });
                }
              } else {
                // 中文或复杂 alias 用 includes 查找最左位置
                const idx1 = simplified.indexOf(aLower);
                const idx2 = rawLower.indexOf(aLower);
                const idx = (idx1 !== -1 ? idx1 : (idx2 !== -1 ? idx2 : -1));
                if (idx !== -1) aliasCandidates.push({ c, idx, len: aLower.length });
              }
            }
          }
          if (aliasCandidates.length > 0) {
            aliasCandidates.sort((a,b) => (a.idx - b.idx) || (b.len - a.len));
            aliasOr3 = aliasCandidates[0].c.entry;
          }

          // 若 alias 未命中，尝试 enShort3（边界或 includes）
          if (!aliasOr3) {
            const en3Candidates = [];
            for (const c of countries) {
              if (!c.enShort3) continue;
              const code3 = c.enShort3.toLowerCase();
              // 边界正则
              const safe = code3.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
              const regex = new RegExp(`(^|[^a-z0-9])${safe}([^a-z0-9]|$)`, 'i');
              const m1 = simplified.match(regex);
              const m2 = rawLower.match(regex);
              let idx = -1;
              if (m1 && m1.index != null) idx = m1.index + (m1[1] ? m1[1].length : 0);
              else if (m2 && m2.index != null) idx = m2.index + (m2[1] ? m2[1].length : 0);
              else {
                const i1 = simplified.indexOf(code3);
                const i2 = rawLower.indexOf(code3);
                idx = Math.min(i1 === -1 ? Infinity : i1, i2 === -1 ? Infinity : i2);
                if (idx === Infinity) idx = -1;
              }
              if (idx !== -1) en3Candidates.push({ c, idx, len: code3.length });
            }
            if (en3Candidates.length > 0) {
              en3Candidates.sort((a,b) => (a.idx - b.idx) || (b.len - a.len));
              aliasOr3 = en3Candidates[0].c.entry;
            }
          }

          if (aliasOr3) matched = aliasOr3;
        } // end enShort/en3
      } // end zh/enShort/en3
    } // end if (!matched) overall
    // === 国家识别结束 ===

    // === 国家标识 ===
    let flag = '', cname = '', countStr = '';
    if (matched) {
      matched.count = (matched.count || 0) + 1;
      flag = matched.emoji || '';
      cname = matched.name || '';
      countStr = (matched.count || 0).toString().padStart(autofill, '0');
    }

    // === 标签识别 ===
    const tags = [];
    for (const { key, value } of others) {
      const safeKey = key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(`(^|[^a-z0-9])${safeKey}($|[^a-z0-9])`, 'i');
      if (regex.test(name) && !tags.includes(value)) {
        tags.push(value);
      }
    }

    // === 倍率匹配 ===
    let rateStr = '';
    const rateRegex = /(?:倍率|rate)[:：]?\s*(\d+(?:\.\d+)?)(?:x|倍)?/i;
    const rateMatch = originalName.match(rateRegex);
    if (rateMatch) {
      rateStr = `-${rateMatch[1]}x`;
    }

    // === 网速匹配 ===
    let speedStr = '';
    const speedMatch = originalName.match(/(\d+(?:\.\d+)?\s?(?:KB|MB|GB)\/S)/i);
    if (speedMatch) {
      speedStr = ` - ${speedMatch[1].toUpperCase()}`;
    }

    // === 构建最终名称 ===
    const composed = [flag, cname];
    if (tags.length) composed.push(...tags);
    composed.push(countStr);
    if (sourcePrefix || rateStr) composed.push(sourcePrefix + rateStr);
    if (airport) composed.push(`- ${airport}`);
    if (speedStr) composed.push(speedStr);

    res.name = composed.filter(Boolean).join(' ');
  });

  return proxies;
}
