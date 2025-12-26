// 1. 导入依赖与配置
const { Solar, Lunar } = importModule("lunar.module");
const fm = FileManager.local();
const dbPath = fm.joinPath(fm.documentsDirectory(), "family_birthdays.json");
const VERSION = "1.2.0";

// 获取数据
function getDB() {
  if (!fm.fileExists(dbPath)) return [
    { name: "爸爸", year: 1963, month: 6, day: 7, emoji: "👨" },
    { name: "妈妈", year: 1965, month: 8, day: 12, emoji: "👩" },
    { name: "妹妹", year: 2000, month: 3, day: 15, emoji: "👧" },
    { name: "我", year: 1995, month: 11, day: 26, emoji: "👦" }
  ];
  return JSON.parse(fm.readString(dbPath));
}

// ==========================================
//               核心渲染逻辑
// ==========================================
async function createWidget() {
  const db = getDB();
  const w = new ListWidget();
  w.backgroundColor = new Color("#1c1c1e");
  w.setPadding(12, 10, 10, 10);

  // 2. 创建主 Stack (水平排列四人)
  const mainStack = w.addStack();
  mainStack.centerAlignContent();

  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  db.slice(0, 4).forEach((p, i) => {
    const info = calculateBday(p, today);
    
    // 3. 创建垂直子 Stack
    const col = mainStack.addStack();
    col.layoutVertically();
    col.centerAlignContent();

    // 4. 上端：头像
    const emojiStack = col.addStack();
    emojiStack.addSpacer();
    const t_emoji = emojiStack.addText(p.emoji || "👤");
    t_emoji.font = Font.systemFont(26);
    emojiStack.addSpacer();

    col.addSpacer(2);

    // 5. 中间：半圆弧进度条 (Canvas 绘制)
    const canvas = new DrawContext();
    canvas.size = new Size(100, 60); // 压缩高度适配半圆
    canvas.opaque = false;
    const center = { x: 50, y: 55 };
    const radius = 40;
    
    // 绘制背景底弧 (180度)
    canvas.setStrokeColor(new Color("#ffffff", 0.1));
    canvas.setLineWidth(4);
    for (let a = 180; a <= 360; a += 6) {
      const rad = a * Math.PI / 180;
      canvas.fillEllipse(new Rect(center.x + radius * Math.cos(rad) - 2, center.y + radius * Math.sin(rad) - 2, 4, 4));
    }

    // 绘制进度弧 (根据距离生日的天数)
    const progress = Math.max(0.05, 1 - info.diff / 365);
    const accentColor = info.diff <= 30 ? Color.orange() : new Color("#f2c94c");
    for (let a = 180; a <= 180 + (180 * progress); a += 4) {
      const rad = a * Math.PI / 180;
      canvas.setFillColor(accentColor);
      canvas.fillEllipse(new Rect(center.x + radius * Math.cos(rad) - 2, center.y + radius * Math.sin(rad) - 2, 4, 4));
    }

    // 半圆中心：公历标准日期
    const df = new DateFormatter();
    df.dateFormat = "MM-dd";
    canvas.setFont(Font.boldSystemFont(14));
    canvas.setTextColor(Color.white());
    canvas.setTextAlignedCenter();
    canvas.drawTextInRect(df.string(info.solarDate), new Rect(0, 40, 100, 20));

    const img = col.addImage(canvas.getImage());
    img.imageSize = new Size(75, 45);

    // 底部：玄学信息 | 生肖 星座 财神
    col.addSpacer(4);
    const detailT = col.addText(`${info.shengXiao} · ${info.zodiac}`);
    detailT.font = Font.systemFont(9);
    detailT.textColor = new Color("#ffffff", 0.7);
    detailT.centerAlignText();
    
    const godT = col.addText(info.caiShen);
    godT.font = Font.systemFont(8);
    godT.textColor = new Color("#f2c94c", 0.6);
    godT.centerAlignText();

    const diffT = col.addText(info.diff === 0 ? "今天!" : `${info.diff}天`);
    diffT.font = Font.heavySystemFont(11);
    diffT.textColor = accentColor;
    diffT.centerAlignText();

    if (i < 3) mainStack.addSpacer(); // 成员间隙
  });

  w.addSpacer();

  // 6. 年度进度条
  const yearProgressStack = w.addStack();
  yearProgressStack.layoutVertically();
  
  const startYear = new Date(now.getFullYear(), 0, 1);
  const endYear = new Date(now.getFullYear(), 11, 31);
  const yearPercent = (now - startYear) / (endYear - startYear);

  // 进度条容器
  const barBg = yearProgressStack.addStack();
  barBg.backgroundColor = new Color("#ffffff", 0.1);
  barBg.cornerRadius = 3;
  barBg.setPadding(0, 0, 0, 0);
  
  const barFill = barBg.addStack();
  barFill.size = new Size(310 * yearPercent, 5); // 宽度根据比例
  barFill.backgroundColor = new Color("#f2c94c", 0.8);
  barFill.cornerRadius = 3;

  yearProgressStack.addSpacer(2);
  const yearLabel = yearProgressStack.addText(`${now.getFullYear()} 年度进度 ${Math.floor(yearPercent * 100)}%`);
  yearLabel.font = Font.systemFont(8);
  yearLabel.textColor = new Color("#ffffff", 0.3);
  yearLabel.centerAlignText();

  return w;
}

// --- 计算逻辑：公历转换与玄学提取 ---
function calculateBday(p, today) {
  // 核心：基于农历生日转今年/明年的公历
  let l = Lunar.fromYmd(today.getFullYear(), p.month, p.day);
  let s = l.getSolar();
  let bDay = new Date(s.getYear(), s.getMonth() - 1, s.getDay());

  // 如果今年生日已过，自动计算明年
  if (bDay < today) {
    l = Lunar.fromYmd(today.getFullYear() + 1, p.month, p.day);
    s = l.getSolar();
    bDay = new Date(s.getYear(), s.getMonth() - 1, s.getDay());
  }

  const diff = Math.ceil((bDay - today) / 86400000);
  
  // 提取出生当天的命理信息
  const originL = Lunar.fromYmd(p.year, p.month, p.day);
  const originS = originL.getSolar();
  
  return {
    solarDate: bDay,
    diff: diff,
    shengXiao: originL.getYearInGanZhi().substring(1) + originL.getYearShengXiao(), // 如: 寅虎
    zodiac: originS.toFullString().split(' ').pop(), // 星座
    caiShen: originL.getDayPositionCaiDesc() + "财位"
  };
}

// 启动环境判断
if (config.runsInApp) {
  const w = await createWidget();
  await w.presentMedium();
} else {
  const w = await createWidget();
  Script.setWidget(w);
  Script.complete();
}
