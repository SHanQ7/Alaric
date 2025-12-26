// Variables used by Scriptable.
// icon-color: gold; icon-glyph: cake;

const { Solar, Lunar } = importModule("lunar.module");
const fm = FileManager.local();
const dbPath = fm.joinPath(fm.documentsDirectory(), "family_birthdays.json");
const VERSION = "1.5.1";
const GITHUB_URL = "https://raw.githubusercontent.com/SHanQ7/Alaric/refs/heads/main/src-repo/Scriptable/Fmailybirthday.js";

// =================【1. 自动配色系统】=================
const isNight = Device.isUsingDarkAppearance();
const bgColor = isNight ? new Color("#1c1c1e") : new Color("#f9f9fb"); 
const textColor = isNight ? Color.white() : Color.black();
const subTextColor = isNight ? new Color("#ffffff", 0.7) : new Color("#333333", 0.8);

// =================【2. 数据管理逻辑】=================
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

// =================【3. 核心渲染函数】=================
async function createWidget() {
  const currentData = getDB();
  const w = new ListWidget();
  w.backgroundColor = bgColor;
  w.setPadding(15, 12, 12, 12);

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
    canvas.size = new Size(100, 90);
    canvas.opaque = false;
    const center = { x: 50, y: 58 };
    const radius = 38;
    const accentColor = info.diff <= 30 ? Color.orange() : new Color("#f2c94c");

    canvas.setFont(Font.systemFont(24));
    canvas.drawTextInRect(p.emoji || "👤", new Rect(38, 0, 30, 30));

    // 底弧
    canvas.setStrokeColor(new Color("#888888", 0.15));
    canvas.setLineWidth(3);
    for (let a = 180; a <= 360; a += 8) {
      const rad = a * Math.PI / 180;
      canvas.fillEllipse(new Rect(center.x + radius * Math.cos(rad) - 1.5, center.y + radius * Math.sin(rad) - 1.5, 3, 3));
    }
    // 进度弧
    const progress = Math.max(0.05, 1 - info.diff / 365);
    for (let a = 180; a <= 180 + (180 * progress); a += 5) {
      const rad = a * Math.PI / 180;
      canvas.setFillColor(accentColor);
      canvas.fillEllipse(new Rect(center.x + radius * Math.cos(rad) - 1.5, center.y + radius * Math.sin(rad) - 1.5, 3, 3));
    }

    canvas.setFont(Font.heavySystemFont(18));
    canvas.setTextColor(accentColor);
    canvas.setTextAlignedCenter();
    canvas.drawTextInRect(info.diff === 0 ? "🎂" : `${info.diff}`, new Rect(0, 45, 100, 22));

    const img = col.addImage(canvas.getImage());
    img.imageSize = new Size(75, 68);

    col.addSpacer(2);
    const nameT = col.addText(p.name);
    nameT.font = Font.boldSystemFont(11);
    nameT.textColor = textColor;
    nameT.centerAlignText();
    
    col.addSpacer(6);

    // --- C. 详细信息行：发光椭圆 + 图标 + 文字 ---
    const details = [
      { icon: info.shengXiaoIco, text: info.shengXiao },
      { icon: info.zodiacIco, text: info.zodiac },
      { icon: "🧭", text: info.caiShen }
    ];

    details.forEach(item => {
      const lineStack = col.addStack();
      lineStack.centerAlignContent();
      
      const pillCanvas = new DrawContext();
      pillCanvas.size = new Size(8, 20);
      pillCanvas.opaque = false;
      pillCanvas.setFillColor(new Color(accentColor.hex, 0.3));
      pillCanvas.fillRoundedRect(new Rect(2, 2, 3, 16), 1.5, 1.5);
      pillCanvas.setFillColor(accentColor);
      pillCanvas.fillEllipse(new Rect(2.5, 4, 2, 2));
      pillCanvas.fillEllipse(new Rect(2.5, 9, 2, 2));
      pillCanvas.fillEllipse(new Rect(2.5, 14, 2, 2));
      
      const pillImg = lineStack.addImage(pillCanvas.getImage());
      pillImg.imageSize = new Size(5, 13);
      lineStack.addSpacer(3);
      
      const t = lineStack.addText(`${item.icon} ${item.text}`);
      t.font = Font.systemFont(9);
      t.textColor = subTextColor;
      col.addSpacer(2);
    });

    if (i < 3 && i < currentData.length - 1) mainStack.addSpacer();
  });

  w.addSpacer();
  renderYearBar(w, today);
  return w;
}

// =================【4. 辅助功能函数】=================

// 手动星座判定逻辑
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
  const originS = originL.getSolar(); // 获取出生年公历
  
  // 使用刚才定义的 getZodiac 替换掉 originS.getZodiac()
  const zodiacName = getZodiac(originS.getMonth(), originS.getDay());
  
  const sxMap = {"鼠":"🐭","牛":"🐮","虎":"🐯","兔":"🐰","龙":"🐲","蛇":"🐍","马":"🐴","羊":"🐑","猴":"🐵","鸡":"🐔","狗":"🐶","猪":"🐷"};
  const zdMap = {"白羊":"♈️","金牛":"♉️","双子":"♊️","巨蟹":"♋️","狮子":"♌️","处女":"♍️","天秤":"♎️","天蝎":"♏️","射手":"♐️","摩羯":"♑️","水瓶":"♒️","双鱼":"♓️"};

  return {
    solarDate: bDay,
    diff: Math.ceil((bDay - today) / 86400000),
    shengXiao: originL.getYearInGanZhi().substring(1) + originL.getYearShengXiao(),
    shengXiaoIco: sxMap[originL.getYearShengXiao()] || "🐾",
    zodiac: zodiacName + "座",
    zodiacIco: zdMap[zodiacName] || "✨",
    caiShen: originL.getDayPositionCaiDesc() + "财"
  };
}

function renderYearBar(w, now) {
  const startYear = new Date(now.getFullYear(), 0, 1);
  const endYear = new Date(now.getFullYear(), 11, 31);
  const yearPercent = (now - startYear) / (endYear - startYear);
  const barCanvas = new DrawContext();
  barCanvas.size = new Size(300, 20);
  barCanvas.opaque = false;
  const barWidth = 300 * yearPercent;
  barCanvas.setFillColor(new Color("#888888", 0.15));
  barCanvas.fillRoundedRect(new Rect(0, 8, 300, 4), 2, 2);
  barCanvas.setFillColor(new Color("#f2c94c", 0.25));
  barCanvas.fillRoundedRect(new Rect(0, 6, barWidth, 8), 4, 4);
  for(let x=0; x < barWidth; x += 5) {
    const s = 2 + Math.random() * 2;
    barCanvas.setFillColor(new Color("#f2c94c", 0.9));
    barCanvas.fillEllipse(new Rect(x, 8 + (4-s)/2, s, s));
  }
  const footerStack = w.addStack();
  footerStack.layoutVertically();
  const barImg = footerStack.addImage(barCanvas.getImage());
  barImg.imageSize = new Size(300, 15);
  const label = footerStack.addText(`${now.getFullYear()} YEAR PROGRESS ${Math.floor(yearPercent * 100)}%`);
  label.font = Font.boldSystemFont(8);
  label.textColor = subTextColor;
  label.centerAlignText();
}

// =================【5. 面板逻辑】=================
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
