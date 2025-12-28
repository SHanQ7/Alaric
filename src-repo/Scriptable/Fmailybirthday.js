// Variables used by Scriptable.
// icon-color: gold; icon-glyph: cake;

const { Solar, Lunar } = importModule("lunar.module");
const fm = FileManager.local();
const dbPath = fm.joinPath(fm.documentsDirectory(), "family_birthdays.json");
const VERSION = "1.8.7"; // 最终兼容版：高密度点阵模拟实线

const GITHUB_URL = "https://raw.githubusercontent.com/SHanQ7/Alaric/refs/heads/main/src-repo/Scriptable/Fmailybirthday.js";

// =================【1. 配色与环境】=================
const isNight = Device.isUsingDarkAppearance();
const bgColor = isNight ? new Color("#1c1c1e") : new Color("#f9f9fb"); 
const textColor = isNight ? Color.white() : Color.black();
const subTextColor = isNight ? new Color("#ffffff", 0.7) : new Color("#333333", 0.8);

// =================【2. 核心渲染】=================
async function createWidget() {
  const currentData = getDB();
  const w = new ListWidget();
  w.backgroundColor = bgColor;
  w.setPadding(10, 12, 10, 12); 

  const mainStack = w.addStack();
  mainStack.centerAlignContent();

  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  currentData.slice(0, 4).forEach((p, i) => {
    const info = calculateBday(p, today);
    const col = mainStack.addStack();
    col.layoutVertically();
    col.centerAlignContent(); 

    // --- A. 仪表盘绘制 ---
    const canvas = new DrawContext();
    canvas.size = new Size(100, 115); 
    canvas.respectScreenScale = true;
    canvas.opaque = false;
    
    const arcCenterY = 77; 
    const radius = 33;      
    const accentColor = info.diff <= 30 ? Color.orange() : new Color("#f2c94c");

    // 1. 绘制头像
    canvas.setFont(Font.systemFont(28));
    canvas.setTextAlignedCenter();
    canvas.drawTextInRect(p.emoji || "👤", new Rect(0, 0, 100, 32));

    // 2. 绘制半圆弧 (高密度点阵模拟平滑曲线)
    const progress = Math.max(0.01, 1 - info.diff / 365);
    
    // 绘制背景底色弧 (180度到360度)
    // 步进 0.5 度，确保点与点之间高度重合，消除颗粒感
    for (let deg = 180; deg <= 360; deg += 0.5) {
      const rad = deg * Math.PI / 180;
      const x = 50 + radius * Math.cos(rad);
      const y = arcCenterY + radius * Math.sin(rad);
      canvas.setFillColor(new Color("#888888", 0.15));
      canvas.fillEllipse(new Rect(x - 1.5, y - 1.5, 3, 3));
    }

    // 绘制进度彩色弧
    const endDeg = 180 + (180 * progress);
    for (let deg = 180; deg <= endDeg; deg += 0.5) {
      const rad = deg * Math.PI / 180;
      const x = 50 + radius * Math.cos(rad);
      const y = arcCenterY + radius * Math.sin(rad);
      canvas.setFillColor(accentColor);
      // 稍微加大进度条圆点直径，覆盖底色并更显眼
      canvas.fillEllipse(new Rect(x - 2, y - 2, 4, 4));
    }

    // 3. 圆弧内：天数
    canvas.setFont(Font.heavySystemFont(18));
    canvas.setTextColor(accentColor);
    canvas.drawTextInRect(info.diff === 0 ? "🎂" : `${info.diff}`, new Rect(0, arcCenterY - 12, 100, 22));
    
    // 4. 圆弧下方：日期
    const df = new DateFormatter();
    df.dateFormat = "yyyy-MM-dd";
    canvas.setFont(Font.boldSystemFont(13));
    canvas.setTextColor(textColor);
    canvas.drawTextInRect(df.string(info.solarDate), new Rect(0, arcCenterY + 12, 100, 15));

    const img = col.addImage(canvas.getImage());
    img.imageSize = new Size(75, 86); 
    col.addSpacer(-3);

    // --- B. 详细信息行 ---
    const details = [
      { icon: info.shengXiaoIco, text: info.shengXiao },
      { icon: info.zodiacIco, text: info.zodiac },
      { icon: "", text: info.bazi },
      { icon: "", text: info.dayWuXing + "命" },
      { icon: "", text: info.caiShen }
    ];

    details.forEach(item => {
      const lineStack = col.addStack();
      lineStack.centerAlignContent();
      
      const glowCanvas = new DrawContext();
      glowCanvas.size = new Size(12, 20);
      glowCanvas.opaque = false;
      const glowRect = new Rect(4, 4, 3, 12);
      const glowPath = new Path();
      glowPath.addRoundedRect(glowRect, 1.5, 1.5);
      glowCanvas.setFillColor(new Color(accentColor.hex, 0.15));
      glowCanvas.fillEllipse(new Rect(2, 2, 7, 16));
      glowCanvas.addPath(glowPath);
      glowCanvas.setFillColor(accentColor);
      glowCanvas.fillPath();
      
      const glowImg = lineStack.addImage(glowCanvas.getImage());
      glowImg.imageSize = new Size(6, 10);
      lineStack.addSpacer(4);
      
      const t = lineStack.addText(`${item.icon} ${item.text}`);
      t.font = Font.systemFont(8);
      t.textColor = subTextColor;
      col.addSpacer(1); 
    });

    if (i < 3 && i < currentData.length - 1) mainStack.addSpacer();
  });
  
  return w;
}

// =================【3. 辅助逻辑】=================
function getDB() {
  if (!fm.fileExists(dbPath)) {
    const defaultData = [
      { name: "爸爸", year: 1973, month: 11, day: 8, emoji: "👨" },
      { name: "妈妈", year: 1975, month: 5, day: 20, emoji: "👩" },
      { name: "妹妹", year: 2000, month: 3, day: 15, emoji: "👧" },
      { name: "我", year: 1995, month: 11, day: 26, emoji: "👦" }
    ];
    fm.writeString(dbPath, JSON.stringify(defaultData));
    return defaultData;
  }
  return JSON.parse(fm.readString(dbPath));
}

function saveDB(data) {
  fm.writeString(dbPath, JSON.stringify(data));
}

function getZodiac(month, day) {
  const dates = [20, 19, 21, 20, 21, 22, 23, 23, 23, 24, 22, 22];
  const signs = ["摩羯", "水瓶", "双鱼", "白羊", "金牛", "双子", "巨蟹", "狮子", "处女", "天秤", "天蝎", "射手", "摩羯"];
  return signs[day < dates[month - 1] ? month - 1 : month];
}

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
  const originS = originL.getSolar();
  const zodiacName = getZodiac(originS.getMonth(), originS.getDay());
  const baZi = originL.getEightChar(); 
  const baZiStr = `${baZi.getYear()}${baZi.getMonth()}${baZi.getDay()}`; 
  const dayWuXing = baZi.getDayWuXing(); 

  const sxMap = {"鼠":"🐭","牛":"🐮","虎":"🐯","兔":"🐰","龙":"🐲","蛇":"🐍","马":"🐴","羊":"🐑","猴":"🐵","鸡":"🐔","狗":"🐶","猪":"🐷"};
  const zdMap = {"白羊":"♈️","金牛":"♉️","双子":"♊️","巨蟹":"♋️","狮子":"♌️","处女":"♍️","天秤":"♎️","天蝎":"♏️","射手":"♐️","摩羯":"♑️","水瓶":"♒️","双鱼":"♓️"};

  return {
    solarDate: bDay,
    diff: Math.ceil((bDay - today) / 86400000),
    shengXiao: originL.getYearInGanZhi().substring(1) + originL.getYearShengXiao(),
    shengXiaoIco: sxMap[originL.getYearShengXiao()] || "🐾",
    zodiac: zodiacName + "座",
    zodiacIco: zdMap[zodiacName] || "✨",
    caiShen: originL.getDayPositionCaiDesc() + "财",
    bazi: baZiStr,
    dayWuXing: dayWuXing
  };
}

async function updateScript() {
  const a = new Alert();
  a.title = "🔄 检查更新";
  a.message = "将从 GitHub 获取最新代码...";
  a.addAction("下载并覆盖");
  a.addCancelAction("取消");
  if (await a.present() === 0) {
    try {
      const req = new Request(GITHUB_URL);
      const code = await req.loadString();
      if (code.includes("VERSION")) {
        fm.writeString(module.filename, code);
        const s = new Alert(); s.title = "✅ 更新成功"; s.message = "请重新运行脚本。"; await s.present();
      }
    } catch (e) {
      const f = new Alert(); f.title = "❌ 更新失败"; f.message = "请检查网络"; await f.present();
    }
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
  a.addTextField("姓名", item.name);
  a.addTextField("出生年", String(item.year));
  a.addTextField("农历月", String(item.month));
  a.addTextField("农历日", String(item.day));
  a.addTextField("头像Emoji", item.emoji);
  a.addAction("保存");
  if (!isNew) a.addDestructiveAction("删除");
  a.addCancelAction("取消");
  if (await a.present() === 0) {
    const newObj = {
      name: a.textFieldValue(0), year: parseInt(a.textFieldValue(1)),
      month: parseInt(a.textFieldValue(2)), day: parseInt(a.textFieldValue(3)),
      emoji: a.textFieldValue(4)
    };
    if (isNew) dataList.push(newObj); else dataList[index] = newObj;
    saveDB(dataList);
  } else if (!isNew) {
    dataList.splice(index, 1); saveDB(dataList);
  }
  await renderSettings();
}

if (config.runsInApp) { await renderSettings(); } 
else { Script.setWidget(await createWidget()); Script.complete(); }
