const { Solar, Lunar } = importModule("lunar.module");
const fm = FileManager.local();
const dbPath = fm.joinPath(fm.documentsDirectory(), "family_birthdays.json");
const VERSION = "1.0.0"; 

const GITHUB_URL = "https://raw.githubusercontent.com/SHanQ7/Alaric/refs/heads/main/src-repo/Scriptable/Fmailybirthday.js";

// =================【1. 核心渲染逻辑】=================
async function createWidget() {
  const currentData = getDB();
  const w = new ListWidget();
  
  // 动态颜色定义
  const dynamicBg = Color.dynamic(new Color("#f9f9fb"), new Color("#1c1c1e"));
  const dynamicText = Color.dynamic(Color.black(), Color.white());
  const dynamicSubText = Color.dynamic(new Color("#333333", 0.8), new Color("#ffffff", 0.7));
  
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const birthdaysToday = currentData.some(p => calculateBday(p, today).diff === 0);

  if (birthdaysToday) {
    let gradient = new LinearGradient();
    gradient.colors = [new Color("#4527a0"), dynamicBg]; 
    gradient.locations = [0, 1];
    w.backgroundGradient = gradient;
  } else {
    w.backgroundColor = dynamicBg;
  }

  w.setPadding(10, 5, 10, 5); 
  const mainStack = w.addStack();
  mainStack.centerAlignContent();

  currentData.slice(0, 4).forEach((p, i) => {
    const info = calculateBday(p, today);
    const isBday = info.diff === 0;
    const col = mainStack.addStack();
    col.layoutVertically();
    col.centerAlignContent(); 

    const canvas = new DrawContext();
    canvas.size = new Size(100, 115); 
    canvas.respectScreenScale = true;
    canvas.opaque = false;
    
    const arcCenterY = 75; 
    const radius = 34;      
    const accentColor = isBday ? Color.cyan() : (info.diff <= 30 ? Color.orange() : new Color("#f2c94c"));

    // 1. 头像
    canvas.setFont(Font.systemFont(isBday ? 32 : 26));
    canvas.setTextAlignedCenter();
    canvas.drawTextInRect(p.emoji || "👤", new Rect(0, 2, 100, 35));

    // 2. 进度计算
    const progress = Math.max(0.01, 1 - info.diff / 365);
    const endDeg = 180 + (180 * progress);

    // --- A1. 绘制底座槽位 ---
    for (let deg = 180; deg <= 360; deg += 0.8) {
      const rad = deg * Math.PI / 180;
      const x = 50 + radius * Math.cos(rad);
      const y = arcCenterY + radius * Math.sin(rad);
      canvas.setFillColor(new Color("#000000", 0.1)); 
      canvas.fillEllipse(new Rect(x - 3, y - 3, 6, 6)); 
      const slotColor = Color.dynamic(new Color("#cccccc", 0.4), new Color("#888888", 0.25));
      canvas.setFillColor(slotColor); 
      canvas.fillEllipse(new Rect(x - 2.5, y - 2.5, 5, 5));
    }

    // --- A2. 绘制填充式霓虹进度 (收敛优化版) ---
    for (let deg = 180; deg <= endDeg; deg += 0.8) {
      const rad = deg * Math.PI / 180;
      const x = 50 + radius * Math.cos(rad);
      const y = arcCenterY + radius * Math.sin(rad);
      
      // 收敛光晕 (直径8, 透明度0.3)
      canvas.setFillColor(new Color(accentColor.hex, 0.3)); 
      canvas.fillEllipse(new Rect(x - 4, y - 4, 8, 8)); 
      
      // 主灯管 (直径5)
      canvas.setFillColor(accentColor);
      canvas.fillEllipse(new Rect(x - 2.5, y - 2.5, 5, 5)); 
      
      // 核心高亮
      canvas.setFillColor(new Color("#FFFFFF", 0.85));
      canvas.fillEllipse(new Rect(x - 1, y - 1, 2, 2)); 
    }

    // 3. 圆弧内信息
    canvas.setFont(Font.heavySystemFont(18));
    canvas.setTextColor(accentColor);
    canvas.drawTextInRect(isBday ? "🎉" : `${info.diff}`, new Rect(0, arcCenterY - 14, 100, 22));
    
    const df = new DateFormatter();
    df.dateFormat = "yyyy-MM-dd";
    canvas.setFont(Font.boldSystemFont(10));
    canvas.setTextColor(isBday ? Color.white() : dynamicText);
    canvas.drawTextInRect(df.string(info.solarDate), new Rect(0, arcCenterY + 12, 100, 12));

    const img = col.addImage(canvas.getImage());
    img.imageSize = new Size(76, 87.4); 
    col.addSpacer(0); 

    // --- B. 详细信息行 (含财神方位 & 八字优化) ---
    const details = [
      { text: info.shengXiao },
      { text: info.zodiac },
      { text: info.bazi, isBazi: true }, 
      { text: info.dayWuXing + "命" },
      { text: info.caiShen }
    ];

    const leftPadding = 12; 
    details.forEach(item => {
      const lineStack = col.addStack();
      lineStack.layoutHorizontally();
      lineStack.centerAlignContent();
      lineStack.addSpacer(leftPadding); 

      const indicator = lineStack.addStack();
      indicator.size = new Size(2.5, 7.5);
      indicator.cornerRadius = 1.25;
      let grad = new LinearGradient();
      grad.colors = [accentColor, new Color(accentColor.hex, 0.3)];
      grad.locations = [0, 1];
      indicator.backgroundGradient = grad;

      lineStack.addSpacer(3.5); 

      const t = lineStack.addText(item.text);
      let fontSize = item.isBazi && item.text.length > 5 ? 7 : 8;
      t.font = Font.systemFont(fontSize);
      t.textColor = isBday ? Color.white() : dynamicSubText;
      t.lineLimit = 1;
      t.minimumScaleFactor = 0.5; 
      
      lineStack.addSpacer(); 
      col.addSpacer(0.3); 
    });

    if (i < currentData.length - 1 && i < 3) mainStack.addSpacer();
  });
  
  return w;
}

// =================【2. 辅助数据处理】=================
function getDB() {
  if (!fm.fileExists(dbPath)) {
    const defaultData = [{ name: "示例", year: 1990, month: 1, day: 1, emoji: "🎂" }];
    fm.writeString(dbPath, JSON.stringify(defaultData));
    return defaultData;
  }
  return JSON.parse(fm.readString(dbPath));
}

function saveDB(data) { fm.writeString(dbPath, JSON.stringify(data)); }

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

  return {
    solarDate: bDay,
    diff: Math.ceil((bDay - today) / 86400000),
    shengXiao: originL.getYearInGanZhi().substring(1) + originL.getYearShengXiao(),
    zodiac: zodiacName + "座",
    caiShen: originL.getDayPositionCaiDesc() + "财",
    bazi: baZi.getYear() + baZi.getMonth() + baZi.getDay(), 
    dayWuXing: baZi.getDayWuXing()
  };
}

// =================【3. 更新与交互】=================
async function updateScript() {
  const a = new Alert();
  a.title = "🔄 检查更新";
  a.message = "将从 GitHub 获取最新版本代码并覆盖本地脚本。";
  a.addAction("立即更新");
  a.addCancelAction("取消");
  if (await a.present() === 0) {
    try {
      const req = new Request(GITHUB_URL);
      const code = await req.loadString();
      if (code.includes("VERSION")) {
        fm.writeString(module.filename, code);
        const s = new Alert(); s.title = "✅ 更新成功"; s.message = "版本已同步，请重新运行脚本。"; await s.present();
      }
    } catch (e) {
      const f = new Alert(); f.title = "❌ 更新失败"; f.message = "请检查网络连接或 GitHub 链接是否有效。"; await f.present();
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
