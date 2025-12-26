// Variables used by Scriptable.
// icon-color: gold; icon-glyph: cake;

const { Solar, Lunar } = importModule("lunar.module");
const fm = FileManager.local();
const dbPath = fm.joinPath(fm.documentsDirectory(), "family_birthdays.json");
const VERSION = "1.2.1";

// =================【数据持久化逻辑】=================
function getDB() {
  if (!fm.fileExists(dbPath)) {
    // 首次运行如果没有数据，自动创建示例，防止报错白屏
    const defaultData = [
      { name: "爸爸", year: 1963, month: 6, day: 7, emoji: "👨" },
      { name: "妈妈", year: 1965, month: 8, day: 12, emoji: "👩" },
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

// =================【控制面板逻辑】=================
async function renderSettings() {
  const currentDB = getDB(); // 确保这里获取了 db
  const alert = new Alert();
  alert.title = "🎂 生日管家 Pro";
  alert.message = `版本: ${VERSION}\n请点击下方按钮管理成员或预览。`;
  
  alert.addAction("➕ 添加新成员");
  if (currentDB.length > 0) alert.addAction("📝 管理成员");
  alert.addAction("🖼 预览组件");
  alert.addCancelAction("退出");

  const menuIdx = await alert.present();
  
  if (menuIdx === 0) {
    await editMember(currentDB, -1);
  } else if (menuIdx === 1 && currentDB.length > 0) {
    const list = new Alert();
    list.title = "选择成员";
    currentDB.forEach(p => list.addAction(p.name));
    list.addCancelAction("返回");
    const idx = await list.present();
    if (idx !== -1) await editMember(currentDB, idx);
  } else if (menuIdx === 2 || (menuIdx === 1 && currentDB.length === 0)) {
    const w = await createWidget();
    await w.presentMedium();
  }
}

async function editMember(dataList, index) {
  const isNew = index === -1;
  const item = isNew ? { name: "", year: 1990, month: 1, day: 1, emoji: "👤" } : dataList[index];
  
  const a = new Alert();
  a.title = isNew ? "添加成员" : `修改 ${item.name}`;
  a.addTextField("姓名", item.name);
  a.addTextField("出生年", String(item.year));
  a.addTextField("农历月", String(item.month));
  a.addTextField("农历日", String(item.day));
  a.addTextField("表情 (Emoji)", item.emoji || "👤");
  
  a.addAction("保存");
  if (!isNew) a.addDestructiveAction("删除");
  a.addCancelAction("取消");
  
  const res = await a.present();
  if (res === 0) {
    const newObj = {
      name: a.textFieldValue(0),
      year: parseInt(a.textFieldValue(1)),
      month: parseInt(a.textFieldValue(2)),
      day: parseInt(a.textFieldValue(3)),
      emoji: a.textFieldValue(4)
    };
    if (isNew) dataList.push(newObj); else dataList[index] = newObj;
    saveDB(dataList);
  } else if (res === 1 && !isNew) {
    dataList.splice(index, 1);
    saveDB(dataList);
  }
  await renderSettings();
}

// =================【小组件渲染逻辑】=================
async function createWidget() {
  const currentData = getDB();
  const w = new ListWidget();
  w.backgroundColor = new Color("#1c1c1e");
  w.setPadding(12, 10, 10, 10);

  const mainStack = w.addStack();
  mainStack.centerAlignContent();

  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  // 只展示前 4 个人
  currentData.slice(0, 4).forEach((p, i) => {
    const info = calculateBday(p, today);
    const col = mainStack.addStack();
    col.layoutVertically();
    col.centerAlignContent();

    // 1. 头像
    const t_emoji = col.addText(p.emoji || "👤");
    t_emoji.font = Font.systemFont(25);
    t_emoji.centerAlignText();

    col.addSpacer(2);

    // 2. 半圆弧画布
    const canvas = new DrawContext();
    canvas.size = new Size(100, 60);
    canvas.opaque = false;
    const center = { x: 50, y: 55 };
    const radius = 40;
    
    // 底弧
    canvas.setStrokeColor(new Color("#ffffff", 0.1));
    canvas.setLineWidth(4);
    for (let a = 180; a <= 360; a += 8) {
      const rad = a * Math.PI / 180;
      canvas.fillEllipse(new Rect(center.x + radius * Math.cos(rad) - 2, center.y + radius * Math.sin(rad) - 2, 4, 4));
    }

    // 进度弧
    const progress = Math.max(0.05, 1 - info.diff / 365);
    const accentColor = info.diff <= 30 ? Color.orange() : new Color("#f2c94c");
    for (let a = 180; a <= 180 + (180 * progress); a += 5) {
      const rad = a * Math.PI / 180;
      canvas.setFillColor(accentColor);
      canvas.fillEllipse(new Rect(center.x + radius * Math.cos(rad) - 2, center.y + radius * Math.sin(rad) - 2, 4, 4));
    }

    // 圆心日期
    const df = new DateFormatter();
    df.dateFormat = "MM-dd";
    canvas.setFont(Font.boldSystemFont(13));
    canvas.setTextColor(Color.white());
    canvas.setTextAlignedCenter();
    canvas.drawTextInRect(df.string(info.solarDate), new Rect(0, 40, 100, 20));

    const img = col.addImage(canvas.getImage());
    img.imageSize = new Size(70, 42);

    // 3. 底部信息
    col.addSpacer(4);
    const detailT = col.addText(`${info.shengXiao} ${info.zodiac}`);
    detailT.font = Font.systemFont(8);
    detailT.textColor = new Color("#ffffff", 0.6);
    detailT.centerAlignText();
    
    const godT = col.addText(info.caiShen);
    godT.font = Font.systemFont(7);
    godT.textColor = new Color("#f2c94c", 0.5);
    godT.centerAlignText();

    const diffT = col.addText(info.diff === 0 ? "🎂今天" : `${info.diff}天`);
    diffT.font = Font.boldSystemFont(10);
    diffT.textColor = accentColor;
    diffT.centerAlignText();

    if (i < 3 && i < currentData.length - 1) mainStack.addSpacer();
  });

  w.addSpacer();

  // 4. 年度进度条
  const startYear = new Date(now.getFullYear(), 0, 1);
  const endYear = new Date(now.getFullYear(), 11, 31);
  const yearPercent = (now - startYear) / (endYear - startYear);

  const barBg = w.addStack();
  barBg.backgroundColor = new Color("#ffffff", 0.1);
  barBg.cornerRadius = 2;
  barBg.size = new Size(0, 4);
  
  const barFill = barBg.addStack();
  barFill.size = new Size(300 * yearPercent, 4);
  barFill.backgroundColor = new Color("#f2c94c", 0.8);
  barFill.cornerRadius = 2;

  w.addSpacer(2);
  const yearLabel = w.addText(`${now.getFullYear()} 年度进度 ${Math.floor(yearPercent * 100)}%`);
  yearLabel.font = Font.systemFont(8);
  yearLabel.textColor = new Color("#ffffff", 0.3);
  yearLabel.centerAlignText();

  return w;
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
  return {
    solarDate: bDay,
    diff: Math.ceil((bDay - today) / 86400000),
    shengXiao: originL.getYearInGanZhi().substring(1) + originL.getYearShengXiao(),
    zodiac: originL.getSolar().toFullString().split(' ').pop(),
    caiShen: originL.getDayPositionCaiDesc() + "财位"
  };
}

// 启动
if (config.runsInApp) {
  await renderSettings();
} else {
  const w = await createWidget();
  Script.setWidget(w);
  Script.complete();
}
