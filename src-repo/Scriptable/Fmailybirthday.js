const { Solar, Lunar, LunarUtil } = importModule("lunar.module");
const fm = FileManager.local();
const dbPath = fm.joinPath(fm.documentsDirectory(), "family_birthdays.json");
const VERSION = "1.0.0"; 

const GITHUB_URL = "https://raw.githubusercontent.com/SHanQ7/Alaric/refs/heads/main/src-repo/Scriptable/Fmailybirthday.js";

// =================【1. 核心渲染】=================
async function createWidget() {
  const currentData = getDB();
  const w = new ListWidget();
  
  // 自适应白天/夜晚配色
  const dynamicBg = Color.dynamic(new Color("#f9f9fb"), new Color("#1c1c1e"));
  const dynamicText = Color.dynamic(Color.black(), Color.white());
  const dynamicSubText = Color.dynamic(new Color("#333333", 0.8), new Color("#ffffff", 0.7));
  
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  w.backgroundColor = dynamicBg;
  w.setPadding(10, 5, 5, 5); 

  const mainStack = w.addStack();
  mainStack.centerAlignContent();

  currentData.slice(0, 4).forEach((p, i) => {
    const info = calculateBday(p, today);
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

    // 颜色阶梯
    let accentColor = isBday ? Color.cyan() : (info.diff <= 7 ? new Color("#ff4d94") : (info.diff <= 30 ? Color.orange() : new Color("#f2c94c")));

    // 1. 头像
    canvas.setFont(Font.systemFont(isBday ? 32 : 26));
    canvas.setTextAlignedCenter();
    canvas.drawTextInRect(p.emoji || "👤", new Rect(0, 5, 100, 35));

    // 2. 圆弧进度
    const progress = isBday ? 1.0 : Math.max(0.01, 1 - info.diff / 365);
    drawNeonArc(canvas, arcCenterY, radius, accentColor, 180 + (180 * progress));

    // 3. 内部文字
    canvas.setFont(Font.heavySystemFont(18));
    canvas.setTextColor(accentColor);
    canvas.drawTextInRect(isBday ? "🎉" : `${info.diff}`, new Rect(0, arcCenterY - 14, 100, 22));
    
    const df = new DateFormatter();
    df.dateFormat = "yyyy-MM-dd";
    canvas.setFont(Font.boldSystemFont(9));
    canvas.setTextColor(isBday ? Color.white() : dynamicText);
    canvas.drawTextInRect(df.string(info.solarDate), new Rect(0, arcCenterY + 11, 100, 11));

    canvas.setFont(Font.systemFont(8));
    canvas.setTextColor(isBday ? Color.white() : dynamicSubText);
    canvas.drawTextInRect(`${info.age}岁 (虚${info.lunarAge})`, new Rect(0, arcCenterY + 22, 100, 10));

    const img = col.addImage(canvas.getImage());
    img.imageSize = new Size(76, 91.2); 
    
    col.addSpacer(-12); // 解决间距过宽，上提详细信息

    const details = [
      { text: info.sxIco + " " + info.shengXiao },
      { text: info.zdIco + " " + info.zodiac },
      { text: "☯️ " + info.bazi, isBazi: true }, 
      { text: "✨ " + info.dayWuXing + "命" },
      { text: "💰专属" + info.personalCai } // 恢复为专属财位
    ];

    details.forEach(item => {
      const lineStack = col.addStack();
      lineStack.layoutHorizontally();
      lineStack.centerAlignContent();
      lineStack.addSpacer(12); 
      const indicator = lineStack.addStack();
      indicator.size = new Size(2, 6.5);
      indicator.cornerRadius = 1;
      indicator.backgroundColor = accentColor;
      lineStack.addSpacer(3); 
      const t = lineStack.addText(item.text);
      t.font = Font.systemFont(item.isBazi && item.text.length > 8 ? 6.5 : 7.5);
      t.textColor = dynamicSubText;
      t.lineLimit = 1;
      lineStack.addSpacer(); 
    });

    if (i < currentData.length - 1 && i < 3) mainStack.addSpacer();
  });
  
  return w;
}

// =================【2. 辅助逻辑】=================
function calculateBday(p, today) {
  let l = Lunar.fromYmd(today.getFullYear(), p.month, p.day);
  let s = l.getSolar();
  let bDay = new Date(s.getYear(), s.getMonth() - 1, s.getDay());
  if (bDay < today) {
    l = Lunar.fromYmd(today.getFullYear() + 1, p.month, p.day);
    s = l.getSolar();
    bDay = new Date(s.getYear(), s.getMonth() - 1, s.getDay());
  }

  const originL = Lunar.fromYmd(p.year, p.month, p.day);
  const baZi = originL.getEightChar();
  const dayGan = baZi.getDayGan(); 

  // 获取今日个人专属财位
  const todayLunar = Lunar.fromDate(new Date()); 
  const personalCai = todayLunar.getDayPositionCaiDesc(dayGan);

  const sxMap = {"鼠":"🐭","牛":"🐮","虎":"🐯","兔":"🐰","龙":"🐲","蛇":"🐍","马":"🐴","羊":"🐑","猴":"🐵","鸡":"🐔","狗":"🐶","猪":"🐷"};
  const zdMap = {"白羊":"♈️","金牛":"♉️","双子":"♊️","巨蟹":"♋️","狮子":"♌️","处女":"♍️","天秤":"♎️","天蝎":"♏️","射手":"♐️","摩羯":"♑️","水瓶":"♒️","双鱼":"♓️"};
  const zodiac = getZodiac(originL.getSolar().getMonth(), originL.getSolar().getDay());

  return {
    age: bDay.getFullYear() - p.year, 
    lunarAge: (bDay.getFullYear() - p.year) + 1,
    solarDate: bDay,
    diff: Math.ceil((bDay - today) / 86400000),
    shengXiao: originL.getYearInGanZhi().substring(1) + originL.getYearShengXiao(),
    sxIco: sxMap[originL.getYearShengXiao()] || "🐾",
    zodiac: zodiac + "座",
    zdIco: zdMap[zodiac] || "✨",
    personalCai: personalCai + "财", 
    bazi: baZi.getYear() + baZi.getMonth() + baZi.getDay(), 
    dayWuXing: baZi.getDayWuXing()
  };
}

function drawNeonArc(canvas, arcCenterY, radius, accentColor, endDeg) {
  for (let deg = 180; deg <= 360; deg += 0.8) {
    const rad = deg * Math.PI / 180;
    const x = 50 + radius * Math.cos(rad);
    const y = arcCenterY + radius * Math.sin(rad);
    canvas.setFillColor(new Color("#000000", 0.08)); 
    canvas.fillEllipse(new Rect(x - 3, y - 3, 6, 6)); 
    canvas.setFillColor(Color.dynamic(new Color("#cccccc", 0.4), new Color("#888888", 0.25))); 
    canvas.fillEllipse(new Rect(x - 2.5, y - 2.5, 5, 5));
  }
  for (let deg = 180; deg <= endDeg; deg += 0.8) {
    const rad = deg * Math.PI / 180;
    const x = 50 + radius * Math.cos(rad);
    const y = arcCenterY + radius * Math.sin(rad);
    canvas.setFillColor(new Color(accentColor.hex, 0.3)); 
    canvas.fillEllipse(new Rect(x - 4, y - 4, 8, 8)); 
    canvas.setFillColor(accentColor);
    canvas.fillEllipse(new Rect(x - 2.5, y - 2.5, 5, 5)); 
    canvas.setFillColor(new Color("#FFFFFF", 0.9));
    canvas.fillEllipse(new Rect(x - 1, y - 1, 2, 2)); 
  }
}

function getZodiac(month, day) {
  const dates = [20, 19, 21, 20, 21, 22, 23, 23, 23, 24, 22, 22];
  const signs = ["摩羯", "水瓶", "双鱼", "白羊", "金牛", "双子", "巨蟹", "狮子", "处女", "天秤", "天蝎", "射手", "摩羯"];
  return signs[day < dates[month - 1] ? month - 1 : month];
}

function getDB() {
  if (!fm.fileExists(dbPath)) {
    const defaultData = [{ name: "示例", year: 1990, month: 1, day: 1, emoji: "🎂" }];
    fm.writeString(dbPath, JSON.stringify(defaultData));
    return defaultData;
  }
  return JSON.parse(fm.readString(dbPath));
}

function saveDB(data) { fm.writeString(dbPath, JSON.stringify(data)); }

async function updateScript() {
  const a = new Alert(); a.title = "🔄 检查更新"; a.message = "将同步 GitHub 最新代码"; a.addAction("确认更新"); a.addCancelAction("取消");
  if (await a.present() === 0) {
    try {
      const req = new Request(GITHUB_URL);
      const code = await req.loadString();
      fm.writeString(module.filename, code);
      const s = new Alert(); s.title = "✅ 更新成功"; await s.present();
    } catch(e) { }
  }
}

async function renderSettings() {
  const currentDB = getDB();
  const alert = new Alert();
  alert.title = "🎂 生日管家 Pro " + VERSION;
  alert.addAction("➕ 管理成员");
  alert.addAction("🖼 预览组件");
  alert.addAction("🚀 检查更新"); 
  alert.addCancelAction("退出");
  const res = await alert.present();
  if (res === 0) {
    const list = new Alert();
    list.title = "管理成员";
    currentDB.forEach(p => list.addAction(p.name));
    list.addAction("➕ 新增成员");
    list.addCancelAction("取消");
    const idx = await list.present();
    if (idx !== -1) {
      if (idx === currentDB.length) await editMember(currentDB, -1);
      else await editMember(currentDB, idx);
    }
  }
  if (res === 1) { (await createWidget()).presentMedium(); }
  if (res === 2) { await updateScript(); }
}

async function editMember(dataList, index) {
  const isNew = index === -1;
  const item = isNew ? { name: "", year: 1990, month: 1, day: 1, emoji: "👤" } : dataList[index];
  const a = new Alert();
  a.title = isNew ? "新增" : "修改";
  a.addTextField("姓名", item.name); a.addTextField("出生年", String(item.year));
  a.addTextField("农历月", String(item.month)); a.addTextField("农历日", String(item.day));
  a.addTextField("头像Emoji", item.emoji);
  a.addAction("保存"); if (!isNew) a.addDestructiveAction("删除");
  a.addCancelAction("取消");
  if (await a.present() === 0) {
    const newObj = {
      name: a.textFieldValue(0), year: parseInt(a.textFieldValue(1)),
      month: parseInt(a.textFieldValue(2)), day: parseInt(a.textFieldValue(3)),
      emoji: a.textFieldValue(4)
    };
    if (isNew) dataList.push(newObj); else dataList[index] = newObj;
    saveDB(dataList);
  } else if (!isNew) { dataList.splice(index, 1); saveDB(dataList); }
  await renderSettings();
}

if (config.runsInApp) { await renderSettings(); } 
else { Script.setWidget(await createWidget()); Script.complete(); }
