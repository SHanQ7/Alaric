const { Solar, Lunar } = importModule("lunar.module");
const fm = FileManager.local();
const dbPath = fm.joinPath(fm.documentsDirectory(), "family_birthdays.json");
const VERSION = "1.0.0"; 
const GITHUB_URL = "https://raw.githubusercontent.com/SHanQ7/Alaric/refs/heads/main/src-repo/Scriptable/Fmailybirthday.js";

// =================【1. 核心渲染】=================
async function createWidget() {
  const currentData = getDB();
  const w = new ListWidget();
  
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const todayLunar = Lunar.fromDate(now);
  const currentMonth = now.getMonth() + 1;

  let seasonColor = new Color("#f9f9fb");
  let seasonDarkColor = new Color("#1c1c1e");
  if ([3,4,5].includes(currentMonth)) { 
    seasonColor = new Color("#f0fdf4"); seasonDarkColor = new Color("#0a1a0c");
  } else if ([6,7,8].includes(currentMonth)) { 
    seasonColor = new Color("#fef2f2"); seasonDarkColor = new Color("#1a0a0a");
  } else if ([9,10,11].includes(currentMonth)) { 
    seasonColor = new Color("#f8fafc"); seasonDarkColor = new Color("#0a0f1a");
  } else { 
    seasonColor = new Color("#f0f9ff"); seasonDarkColor = new Color("#0a141a");
  }

  w.backgroundColor = Color.dynamic(seasonColor, seasonDarkColor);
  w.setPadding(10, 5, 10, 5); 

  const mainStack = w.addStack();
  mainStack.centerAlignContent();

  const displayData = currentData.slice(0, 4);
  
  displayData.forEach((p, i) => {
    const info = calculateBday(p, today, todayLunar);
    const isBday = info.diff === 0;
    const isChong = checkChong(info.shengXiao.slice(-1), todayLunar.getDayShengXiao());
    
    const col = mainStack.addStack();
    col.layoutVertically();
    col.centerAlignContent(); 

    const canvas = new DrawContext();
    canvas.size = new Size(100, 115); 
    canvas.respectScreenScale = true;
    canvas.opaque = false;
    const arcCenterY = 75;
    const radius = 34;

    let accentColor = isBday ? Color.cyan() : (info.diff <= 7 ? new Color("#ff4d94") : (info.diff <= 30 ? Color.orange() : new Color("#f2c94c")));
    const ringColor = accentColor;

    canvas.setFont(Font.systemFont(isBday ? 34 : 26));
    canvas.setTextAlignedCenter();
    canvas.drawTextInRect(p.emoji || "👤", new Rect(0, 0, 100, 38));

    const progress = isBday ? 1.0 : Math.max(0.01, 1 - info.diff / 365);
    drawNeonArc(canvas, arcCenterY, radius, ringColor, Color.dynamic(new Color("#e0e0e0", 0.3), new Color("#3a3a3c", 0.3)), 180 + (180 * progress));

    canvas.setFont(Font.heavySystemFont(18));
    canvas.setTextColor(ringColor);
    canvas.drawTextInRect(isBday ? "🎉" : `${info.diff}`, new Rect(0, arcCenterY - 14, 100, 22));

    canvas.setFont(Font.heavySystemFont(9.5));
    canvas.setTextColor(Color.dynamic(Color.black(), Color.white()));
    canvas.drawTextInRect(info.solarDateStr, new Rect(0, arcCenterY + 11, 100, 12));

    canvas.setFont(Font.boldSystemFont(8.5));
    canvas.setTextColor(Color.dynamic(new Color("#111111"), new Color("#eeeeee")));
    canvas.drawTextInRect(`${info.age}岁·${info.fullDayGan}`, new Rect(0, arcCenterY + 23, 100, 11));

    const img = col.addImage(canvas.getImage());
    img.imageSize = new Size(72, 82.8); 
    col.addSpacer(-2);

    const detailList = [
      { text: `${info.shengXiao}·${info.zodiac}`, size: 15, isSX: true },
      { text: info.naYin, size: 15 },
      { text: info.bazi, size: 15 },
      { text: "宜 " + info.personalAdvice, size: 13, isMain: true },
      { text: "财位 " + info.personalCai, size: 15 }
    ];

    detailList.forEach(item => {
      const capsuleWrapper = col.addStack();
      capsuleWrapper.layoutHorizontally();
      capsuleWrapper.addSpacer(); 

      const capsule = capsuleWrapper.addStack();
      capsule.size = new Size(62, 0); 
      capsule.setPadding(1.5, 0, 1.5, 0);
      capsule.cornerRadius = 7;
      capsule.centerAlignContent();
      
      let bg;
      if (item.isSX && isChong) {
        bg = Color.dynamic(new Color("#ff4d4d", 0.4), new Color("#ff4d4d", 0.6));
      } else {
        bg = item.isMain ? 
             Color.dynamic(new Color(accentColor.hex, 0.22), new Color(accentColor.hex, 0.25)) : 
             Color.dynamic(new Color("#000000", 0.08), new Color("#ffffff", 0.15));
      }
      capsule.backgroundColor = bg;
      
      const t = capsule.addText(item.text);
      t.font = Font.heavySystemFont(item.size); 

      t.textColor = (item.isSX && isChong) ? 
                    Color.white() : 
                    Color.dynamic(Color.black(), Color.white());
      
      t.lineLimit = 1;
      t.minimumScaleFactor = 0.5;
      t.centerAlignText();
      
      capsuleWrapper.addSpacer(); 
      col.addSpacer(3.5);
    });
    
    if (i < displayData.length - 1) mainStack.addSpacer();
  });
  return w;
}

// =================【逻辑函数】=================
function calculateBday(p, today, todayLunar) {
  let l = Lunar.fromYmd(today.getFullYear(), p.month, p.day);
  let s = l.getSolar();
  let bDate = new Date(s.getYear(), s.getMonth() - 1, s.getDay());
  if (bDate < today) {
    l = Lunar.fromYmd(today.getFullYear() + 1, p.month, p.day);
    s = l.getSolar();
    bDate = new Date(s.getYear(), s.getMonth() - 1, s.getDay());
  }
  const originL = Lunar.fromYmd(p.year, p.month, p.day);
  const baZi = originL.getEightChar();
  const dayGan = baZi.getDayGan(); 
  const df = new DateFormatter();
  df.dateFormat = "yyyy-MM-dd";

  // 纳音解析字典
  const naYinDict = {
    "涧下水":"清静深邃", "天河水":"慷慨博爱", "长流水":"源远流长", "大溪水":"奔流豪迈", "大海水":"包容深沉", "泉中水":"细腻无私",
    "霹雳火":"刚烈果决", "天上火":"温暖显赫", "炉中火":"热情进取", "山下火":"稳健慎行", "佛灯火":"宁静致远", "山头火":"热烈奔放",
    "桑松木":"刚柔并济", "杨柳木":"随和坚定", "大林木":"仁慈宽厚", "松柏木":"坚毅抗压", "平地木":"谦逊才华", "石榴木":"倔强坚韧",
    "海中金":"深藏不露", "沙中金":"高洁独立", "金箔金":"精致优雅", "剑锋金":"锐意进取", "钗钏金":"温婉唯美", "白蜡金":"纯真灵动",
    "壁上土":"踏实稳重", "路旁土":"宽厚奉献", "城头土":"威严大气", "大驿土":"豁达博学", "屋上土":"成熟尽责", "沙中土":"自由随性"
  };
  
  const rawNaYin = baZi.getYearNaYin();
  const naYinDesc = naYinDict[rawNaYin] || "顺其自然";

  return {
    age: bDate.getFullYear() - p.year, 
    solarDateStr: df.string(bDate),
    diff: Math.ceil((bDate - today) / 86400000),
    shengXiao: originL.getYearInGanZhi().substring(1) + originL.getYearShengXiao(),
    naYin: rawNaYin + "·" + naYinDesc,
    fullDayGan: dayGan + baZi.getDayWuXing() + "命",
    zodiac: getZodiac(originL.getSolar().getMonth(), originL.getSolar().getDay()),
    personalAdvice: getPersonalAdvice(dayGan, todayLunar.getDayGan()), 
    personalCai: getPersonalDailyCai(dayGan),
    bazi: baZi.getYear() + " " + baZi.getMonth() + " " + baZi.getDay() 
  };
}

function checkChong(sx1, sx2) {
  const chongMap = {"鼠":"马","马":"鼠","牛":"羊","羊":"牛","虎":"猴","猴":"虎","兔":"鸡","鸡":"兔","龙":"狗","狗":"龙","蛇":"猪","猪":"蛇"};
  return chongMap[sx1] === sx2;
}

function drawNeonArc(canvas, arcCenterY, radius, progressColor, trackColor, endDeg) {
  for (let deg = 180; deg <= 360; deg += 1) {
    const rad = deg * Math.PI / 180;
    const x = 50 + radius * Math.cos(rad);
    const y = arcCenterY + radius * Math.sin(rad);
    canvas.setFillColor(trackColor);
    canvas.fillEllipse(new Rect(x - 2, y - 2, 4, 4));
  }
  for (let deg = 180; deg <= endDeg; deg += 1) {
    const rad = deg * Math.PI / 180;
    const x = 50 + radius * Math.cos(rad);
    const y = arcCenterY + radius * Math.sin(rad);
    canvas.setFillColor(progressColor);
    canvas.fillEllipse(new Rect(x - 2, y - 2, 4, 4));
  }
}

function getZodiac(m, d) {
  const s = "魔羯水瓶双鱼白羊金牛双子巨蟹狮子处女天秤天蝎射手魔羯";
  const arr = [20, 19, 21, 21, 21, 22, 23, 23, 23, 23, 22, 22];
  return s.substr(m * 2 - (d < arr[m - 1] ? 2 : 0), 2) + "座";
}

function getPersonalDailyCai(sg) {
  const m = {"甲":"东北","乙":"正东","丙":"西南","丁":"正西","戊":"正北","己":"正北","庚":"正东","辛":"正南","壬":"正南","癸":"正南"};
  return (m[sg] || "正南") + "方";
}

function getPersonalAdvice(s, d) {
  const rel = {
    "甲": {"甲":"比肩","乙":"劫财","丙":"食神","丁":"伤官","戊":"偏财","己":"正财","庚":"七杀","辛":"正官","壬":"偏印","癸":"正印"},
    "乙": {"甲":"劫财","乙":"比肩","丙":"伤官","丁":"食神","戊":"正财","己":"偏财","庚":"正官","辛":"七杀","壬":"正印","癸":"偏印"},
    "丙": {"甲":"偏印","乙":"正印","丙":"比肩","丁":"劫财","戊":"食神","己":"伤官","庚":"偏财","辛":"正财","壬":"七杀","癸":"正官"},
    "丁": {"甲":"正印","乙":"偏印","丙":"劫财","丁":"比肩","戊":"伤官","己":"食神","庚":"正财","辛":"偏财","壬":"正官","癸":"七杀"},
    "戊": {"甲":"七杀","乙":"正官","丙":"偏印","丁":"正印","戊":"比肩","己":"劫财","庚":"食神","辛":"伤官","壬":"偏财","癸":"正财"},
    "己": {"甲":"正官","乙":"七杀","丙":"正印","丁":"偏印","戊":"劫财","己":"比肩","庚":"伤官","辛":"食神","壬":"正财","癸":"偏财"},
    "庚": {"甲":"偏财","乙":"正财","丙":"七杀","丁":"正官","戊":"偏印","己":"正印","庚":"比肩","辛":"劫财","壬":"食神","癸":"伤官"},
    "辛": {"甲":"正财","乙":"偏财","丙":"正官","丁":"七杀","戊":"正印","己":"偏印","庚":"劫财","辛":"比肩","壬":"伤官","癸":"食神"},
    "壬": {"甲":"食神","乙":"伤官","丙":"偏财","丁":"正财","戊":"七杀","己":"正官","庚":"偏印","辛":"正印","壬":"比肩","癸":"劫财"},
    "癸": {"甲":"伤官","乙":"食神","丙":"正财","丁":"偏财","戊":"正官","己":"七杀","庚":"正印","辛":"偏印","壬":"劫财","癸":"比肩"}
  };
  const dict = {
    "比肩": { tag: "同辈帮身", act: "聚会·结盟" }, 
    "劫财": { tag: "同僚夺气", act: "低调·防损" },
    "食神": { tag: "福禄生财", act: "聚餐·休闲" }, 
    "伤官": { tag: "才华横溢", act: "表达·炫技" },
    "偏财": { tag: "意外之财", act: "投资·博弈" }, 
    "正财": { tag: "勤劳致富", act: "财务·存钱" },
    "七杀": { tag: "威权压力", act: "突破·自律" }, 
    "正官": { tag: "名誉地位", act: "面试·向上" },
    "偏印": { tag: "奇思妙想", act: "灵感·独处" }, 
    "正印": { tag: "贵人护佑", act: "学习·求教" }
  };
  try {
    const tenGod = rel[s][d];
    const data = dict[tenGod];
    return `${tenGod}·${data.act}`;
  } catch (e) { return "顺其自然"; }
}

function getDB() {
  if (!fm.fileExists(dbPath)) return [{ name: "示例", year: 1998, month: 11, day: 11, emoji: "👤" }];
  return JSON.parse(fm.readString(dbPath));
}
function saveDB(d) { fm.writeString(dbPath, JSON.stringify(d)); }

async function renderSettings() {
  const currentDB = getDB();
  const alert = new Alert();
  alert.title = "FmaliyBirthday " + VERSION;
  alert.addAction("成员录入"); alert.addAction("预览组件"); alert.addAction("版本更新"); alert.addCancelAction("退出设置");
  const res = await alert.present();
  if (res === 0) {
    const list = new Alert();
    currentDB.forEach(p => list.addAction(p.name));
    list.addAction("➕ 成员录入");
    const idx = await list.present();
    if (idx !== -1) {
      if (idx === currentDB.length) await editMember(currentDB, -1);
      else await editMember(currentDB, idx);
    }
  } else if (res === 1) { 
    (await createWidget()).presentMedium();
  } else if (res === 2) { 
    await updateScript(); 
  }
}

async function updateScript() {
  try {
    const code = await new Request(GITHUB_URL).loadString();
    if (code.includes("const VERSION")) { 
      fm.writeString(module.filename, code); 
      new Alert().title="已保存"; await renderSettings();
    }
  } catch(e) {}
}

async function editMember(dataList, index) {
  const isNew = index === -1;
  const item = isNew ? { name: "", year: 1998, month: 11, day: 11, emoji: "👤" } : dataList[index];
  const a = new Alert();
  a.addTextField("名讳", item.name); a.addTextField("诞生年", String(item.year));
  a.addTextField("斋月", String(item.month)); a.addTextField("斋日", String(item.day));
  a.addTextField("法相", item.emoji);
  a.addAction("保存"); if (!isNew) a.addDestructiveAction("删除"); a.addCancelAction("取消");
  const res = await a.present();
  if (res === 0) {
    const newObj = { name: a.textFieldValue(0), year: parseInt(a.textFieldValue(1)), month: parseInt(a.textFieldValue(2)), day: parseInt(a.textFieldValue(3)), emoji: a.textFieldValue(4) };
    if (isNew) dataList.push(newObj); else dataList[index] = newObj;
    saveDB(dataList);
  } else if (res === 1 && !isNew) { 
    dataList.splice(index, 1); 
    saveDB(dataList); 
  }
  await renderSettings();
}

if (config.runsInApp) { await renderSettings(); } 
else { Script.setWidget(await createWidget()); Script.complete(); }
