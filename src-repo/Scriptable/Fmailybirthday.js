// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: orange; icon-glyph: birthday-cake;

const { Solar, Lunar } = importModule("lunar.module");
const fm = FileManager.local();
const dbPath = fm.joinPath(fm.documentsDirectory(), "family_birthdays.json");
const VERSION = "1.0.0"; 

const GITHUB_URL = "https://raw.githubusercontent.com/SHanQ7/Alaric/refs/heads/main/src-repo/Scriptable/Fmailybirthday.js";

// =================【1. 核心渲染】=================
async function createWidget() {
  const currentData = getDB();
  const w = new ListWidget();
  const dynamicBg = Color.dynamic(new Color("#f9f9fb"), new Color("#1c1c1e"));
  const dynamicText = Color.dynamic(Color.black(), Color.white());
  const dynamicSubText = Color.dynamic(new Color("#333333", 0.8), new Color("#ffffff", 0.7));
  
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const todayLunar = Lunar.fromDate(now);

  w.backgroundColor = dynamicBg;
  w.setPadding(10, 5, 5, 5); 

  const mainStack = w.addStack();
  mainStack.centerAlignContent();

  currentData.slice(0, 4).forEach((p, i) => {
    const info = calculateBday(p, today, todayLunar);
    const isBday = info.diff === 0;
    const col = mainStack.addStack();
    col.layoutVertically();
    col.centerAlignContent(); 

    const canvas = new DrawContext();
    canvas.size = new Size(100, 120); 
    canvas.respectScreenScale = true;
    canvas.opaque = false;
    
    const arcCenterY = 78; 
    const radius = 34;      
    let accentColor = isBday ? Color.cyan() : (info.diff <= 7 ? new Color("#ff4d94") : (info.diff <= 30 ? Color.orange() : new Color("#f2c94c")));

    // 1. 绘制头像
    canvas.setFont(Font.systemFont(isBday ? 32 : 26));
    canvas.setTextAlignedCenter();
    canvas.drawTextInRect(p.emoji || "👤", new Rect(0, 0, 100, 35));

    // 2. 绘制圆弧进度条
    const progress = isBday ? 1.0 : Math.max(0.01, 1 - info.diff / 365);
    const trackColor = Color.dynamic(new Color("#e0e0e0", 0.4), new Color("#3a3a3c", 0.5));
    drawNeonArc(canvas, arcCenterY, radius, accentColor, trackColor, 180 + (180 * progress));

    // 3. 绘制倒计时数字
    canvas.setFont(Font.heavySystemFont(18));
    canvas.setTextColor(accentColor);
    canvas.drawTextInRect(isBday ? "🎉" : `${info.diff}`, new Rect(0, arcCenterY - 14, 100, 22));
    
    // 4. ✨ 生日日期
    canvas.setFont(Font.boldSystemFont(9));
    canvas.setTextColor(isBday ? Color.white() : dynamicText);
    canvas.drawTextInRect(info.solarDateStr, new Rect(0, arcCenterY + 11, 100, 11));
    
    // 5. 绘制岁数和命格
    canvas.setFont(Font.systemFont(8));
    canvas.setTextColor(isBday ? Color.white() : dynamicSubText);
    canvas.drawTextInRect(`${info.age}岁 · ${info.fullDayGan}`, new Rect(0, arcCenterY + 22, 100, 10));

    const img = col.addImage(canvas.getImage());
    img.imageSize = new Size(76, 91.2); 
    col.addSpacer(-12); 

    const details = [
      { text: info.sxIco + " " + info.shengXiao + " · " + info.zodiac },
      { text: info.naYinIcon + " " + info.naYin },
      { text: "☯️ " + info.bazi, isBazi: true }, 
      { text: "🌟 宜 " + info.personalAdvice }, 
      { text: "💰 财位" + info.personalCai }
    ];

    details.forEach(item => {
      const lineStack = col.addStack();
      lineStack.layoutHorizontally();
      lineStack.centerAlignContent();
      lineStack.addSpacer(10); 
      const indicator = lineStack.addStack();
      indicator.size = new Size(2, 6);
      indicator.backgroundColor = accentColor;
      indicator.cornerRadius = 1;
      lineStack.addSpacer(3); 
      const t = lineStack.addText(item.text);
      t.font = Font.systemFont(item.isBazi ? 6.2 : 7.2);
      t.textColor = dynamicSubText;
      t.lineLimit = 1;
      t.minimumScaleFactor = 0.5; 
      lineStack.addSpacer(); 
    });
    if (i < currentData.length - 1 && i < 3) mainStack.addSpacer();
  });
  return w;
}

// =================【2. 计算逻辑】=================
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
  const naYinRaw = baZi.getYearNaYin();
  const birthSolar = originL.getSolar();
  
  const df = new DateFormatter();
  df.dateFormat = "yyyy-MM-dd";

  return {
    age: bDate.getFullYear() - p.year, 
    solarDateStr: df.string(bDate),
    diff: Math.ceil((bDate - today) / 86400000),
    shengXiao: originL.getYearInGanZhi().substring(1) + originL.getYearShengXiao(),
    sxIco: {"鼠":"🐭","牛":"🐮","虎":"🐯","兔":"🐰","龙":"🐲","蛇":"🐍","马":"🐴","羊":"🐑","猴":"🐵","鸡":"🐔","狗":"🐶","猪":"🐷"}[originL.getYearShengXiao()] || "🐾",
    naYin: naYinRaw + "命",
    naYinIcon: getNaYinIcon(naYinRaw),
    fullDayGan: dayGan + baZi.getDayWuXing() + "命",
    zodiac: getZodiac(birthSolar.getMonth(), birthSolar.getDay()),
    personalAdvice: getPersonalAdvice(dayGan, todayLunar.getDayGan()), 
    personalCai: getPersonalDailyCai(dayGan),
    bazi: baZi.getYear() + baZi.getMonth() + baZi.getDay() 
  };
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

//
function getZodiac(m, d) {
  const s = "魔羯水瓶双鱼白羊金牛双子巨蟹狮子处女天秤天蝎射手魔羯";
  const arr = [20, 19, 21, 21, 21, 22, 23, 23, 23, 23, 22, 22];
  return s.substr(m * 2 - (d < arr[m - 1] ? 2 : 0), 2) + "座";
}

function getPersonalDailyCai(sg) {
  const m = {"甲":"东北","乙":"正东","丙":"西南","丁":"正西","戊":"正北","己":"正北","庚":"正东","辛":"正南","壬":"正南","癸":"正南"};
  return (m[sg] || "正南") + "方";
}

function getNaYinIcon(n) {
  // 木类
  if (n.includes("大林")) return "🌳";
  if (n.includes("松柏")) return "🌲";
  if (n.includes("杨柳")) return "🌿";
  if (n.includes("平地")) return "🌱";
  if (n.includes("桑拓")) return "🍃";
  if (n.includes("石榴")) return "🌺";
  
  // 火类
  if (n.includes("炉中")) return "🔥";
  if (n.includes("天上")) return "☀️";
  if (n.includes("霹雳")) return "⚡";
  if (n.includes("山下")) return "🌋";
  if (n.includes("佛灯") || n.includes("覆灯")) return "🕯️";
  if (n.includes("山头")) return "🌅";
  
  // 土类
  if (n.includes("路旁") || n.includes("大驿")) return "🛣️";
  if (n.includes("城头") || n.includes("壁上")) return "🧱";
  if (n.includes("屋上")) return "🏠";
  if (n.includes("沙中土")) return "🏜️";
  
  // 金类
  if (n.includes("剑锋")) return "⚔️";
  if (n.includes("海中")) return "💎";
  if (n.includes("金箔")) return "✨";
  if (n.includes("白蜡")) return "🕯️";
  if (n.includes("沙中金")) return "🏖️";
  if (n.includes("钗钏")) return "💍";
  
  // 水类
  if (n.includes("涧下") || n.includes("大溪") || n.includes("长流")) return "🌊";
  if (n.includes("天河")) return "🌧️";
  if (n.includes("井泉")) return "⛲";
  if (n.includes("大海")) return "🔱";

  return "🔮"; // 兜底图标
}

function getPersonalAdvice(s, d) {
  // 1. 核心十神逻辑映射 (日干 s 对 流日 d)
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

  // 2. 神棍级专业断语字典 (包含气场描述与玄学动作)
  const dict = {
    "比肩": { tag: "帮身", act: "会友聚气，借力使力" },
    "劫财": { tag: "夺气", act: "财源有损，谨言慎行" },
    "食神": { tag: "福寿", act: "灵感泉涌，赏味人间" },
    "伤官": { tag: "驰骋", act: "锋芒毕露，创意破局" },
    "偏财": { tag: "机缘", act: "偏路生财，捕捉商机" },
    "正财": { tag: "勤耕", act: "财归库房，稳扎稳打" },
    "七杀": { tag: "破坚", act: "凶星入座，迎难而上" },
    "正官": { tag: "显达", act: "官星照命，规划全局" },
    "偏印": { tag: "探幽", act: "避世参悟，深度修心" },
    "正印": { tag: "润泽", act: "贵人垂青，求教得助" }
  };

  try {
    const tenGod = rel[s][d];
    const data = dict[tenGod];
    // 最终输出：[比肩] 帮身·会友聚气，借力使力
    return `[${tenGod}] ${data.tag}·${data.act}`;
  } catch (e) {
    return "气场交杂·宜静守平安";
  }
}

function getDB() {
  if (!fm.fileExists(dbPath)) return [{ name: "示例", year: 1998, month: 11, day: 11, emoji: "👤" }];
  return JSON.parse(fm.readString(dbPath));
}
function saveDB(d) { fm.writeString(dbPath, JSON.stringify(d)); }

async function renderSettings() {
  const currentDB = getDB();
  const alert = new Alert();
  alert.title = "🎂 生日管家 Pro " + VERSION;
  alert.addAction("➕ 管理成员"); alert.addAction("🖼 预览组件"); alert.addAction("🚀 检查更新"); alert.addCancelAction("退出");
  const res = await alert.present();
  if (res === 0) {
    const list = new Alert();
    currentDB.forEach(p => list.addAction(p.name));
    list.addAction("➕ 新增成员");
    const idx = await list.present();
    if (idx !== -1) {
      if (idx === currentDB.length) await editMember(currentDB, -1);
      else await editMember(currentDB, idx);
    }
  } else if (res === 1) { (await createWidget()).presentMedium(); }
  else if (res === 2) { await updateScript(); }
}

async function updateScript() {
  try {
    const code = await new Request(GITHUB_URL).loadString();
    if (code.includes("const VERSION")) { fm.writeString(module.filename, code); new Alert().title="更新成功"; }
  } catch(e) {}
}

async function editMember(dataList, index) {
  const isNew = index === -1;
  const item = isNew ? { name: "", year: 1998, month: 11, day: 11, emoji: "👤" } : dataList[index];
  const a = new Alert();
  a.addTextField("姓名", item.name); a.addTextField("出生年", String(item.year));
  a.addTextField("农历月", String(item.month)); a.addTextField("农历日", String(item.day));
  a.addTextField("头像Emoji", item.emoji);
  a.addAction("保存"); if (!isNew) a.addDestructiveAction("删除"); a.addCancelAction("取消");
  if (await a.present() === 0) {
    const newObj = { name: a.textFieldValue(0), year: parseInt(a.textFieldValue(1)), month: parseInt(a.textFieldValue(2)), day: parseInt(a.textFieldValue(3)), emoji: a.textFieldValue(4) };
    if (isNew) dataList.push(newObj); else dataList[index] = newObj;
    saveDB(dataList);
  } else if (!isNew) { dataList.splice(index, 1); saveDB(dataList); }
  await renderSettings();
}

if (config.runsInApp) { await renderSettings(); } 
else { Script.setWidget(await createWidget()); Script.complete(); }
