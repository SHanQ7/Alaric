// =================【FmailyBirthday】=================
const { Solar, Lunar } = importModule("lunar.module");
const fm = FileManager.local();
const dbPath = fm.joinPath(fm.documentsDirectory(), "family_birthdays.json");

// --- 配置区 ---
const VERSION = "1.0.0";
const GITHUB_RAW_URL = "https://raw.githubusercontent.com/SHanQ7/Alaric/refs/heads/main/src-repo/Scriptable/Fmailybirthday.js";

async function createWidget() {
  const currentData = getDB();
  const w = new ListWidget();
  
  // 1. 动态背景
  const bgColor = Color.dynamic(new Color("#EBEBEF"), new Color("#1A1A1C"));
  w.backgroundColor = bgColor;
  w.setPadding(12, 12, 12, 12); 

  const mainStack = w.addStack();
  mainStack.layoutHorizontally();
  mainStack.centerAlignContent();

  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const todayLunar = Lunar.fromDate(now);
  const displayData = currentData.slice(0, 4);
  
  displayData.forEach((p, i) => {
    const info = calculateBday(p, today, todayLunar);
    const isBday = info.diff === 0;
    const isChong = checkChong(info.shengXiao.slice(-1), todayLunar.getDayShengXiao());
    let accentColor = isBday ? Color.cyan() : (info.diff <= 7 ? new Color("#ff4d94") : (info.diff <= 30 ? Color.orange() : new Color("#f2c94c")));

    // --- 2. 拟态容器 ---
    const highlightStack = mainStack.addStack();
    highlightStack.setPadding(2, 2, 0, 0); 
    highlightStack.backgroundColor = Color.dynamic(new Color("#FFFFFF"), new Color("#2C2C2E"));
    highlightStack.cornerRadius = 18;

    const shadowStack = highlightStack.addStack();
    shadowStack.setPadding(0, 0, 3, 3); 
    shadowStack.backgroundColor = Color.dynamic(new Color("#D1D1D6"), new Color("#000000"));
    shadowStack.cornerRadius = 18;

    const container = shadowStack.addStack();
    container.size = new Size(72, 145);
    container.backgroundColor = Color.dynamic(new Color("#EBEBEF"), new Color("#1C1C1E"));
    container.cornerRadius = 16;
    
    // --- 3. 精密坐标 ---
    const canvas = new DrawContext();
    canvas.size = new Size(144, 290); 
    canvas.opaque = false;
    canvas.respectScreenScale = true;

    const midX = 72;
    const headY = 40;          
    const arcY = 130;
    const capsuleStartY = 163;

    // A. 头像
    canvas.setFont(Font.systemFont(37));
    canvas.setTextAlignedCenter();
    canvas.drawTextInRect(p.emoji || "👤", new Rect(0, headY - 17, 144, 45));

    // B. 半圆弧
    const radius = 46; 
    const trackColor = Color.dynamic(new Color("#D8D8DF"), new Color("#333333"));
    drawHeavyArc(canvas, midX, arcY, radius, accentColor, isBday ? 1.0 : Math.max(0.01, 1 - info.diff / 365), trackColor);

    // C. 倒计时
    canvas.setFont(Font.heavySystemFont(28));
    canvas.setTextColor(accentColor);
    canvas.drawTextInRect(isBday ? "🎉" : `${info.diff}`, new Rect(0, arcY - 18, 144, 40));

    // D. 详细信息胶囊
    const labels = [
      info.solarDateStr,
      `${info.age}岁·${info.fullDayGan}`,
      `${info.shengXiao}·${info.zodiac}`,
      info.naYin,
      info.bazi
    ];

    let currentY = capsuleStartY;
    labels.forEach((text, idx) => {
      const capW = 124; 
      const capH = 19;  
      const capX = (144 - capW) / 2;
      
      const capBg = (idx === 2 && isChong) 
        ? new Color("#FF4D4D") 
        : Color.dynamic(new Color("#E2E2E7"), new Color("#252527"));
      
      canvas.setFillColor(capBg);
      const path = new Path();
      path.addRoundedRect(new Rect(capX, currentY, capW, capH), 6, 6);
      canvas.addPath(path);
      canvas.fillPath();

      canvas.setFont(Font.boldSystemFont(11)); // 略微调小一点点字号防止四柱溢出
      const textColor = (idx === 2 && isChong) 
        ? Color.white() 
        : Color.dynamic(new Color("#444448"), new Color("#AEAEB2"));
      
      canvas.setTextColor(textColor);
      canvas.drawTextInRect(text, new Rect(capX, currentY + 3, capW, capH));
      
      currentY += 23.5; 
    });

    const img = container.addImage(canvas.getImage());
    img.imageSize = new Size(72, 145);

    if (i < displayData.length - 1) mainStack.addSpacer(8);
  });

  return w;
}

// --- 绘图函数 ---
function drawHeavyArc(canvas, x, y, r, color, progress, trackColor) {
  for (let deg = 180; deg <= 360; deg += 2.5) {
    const rad = deg * Math.PI / 180;
    canvas.setFillColor(trackColor);
    canvas.fillEllipse(new Rect(x + r * Math.cos(rad) - 2.5, y + r * Math.sin(rad) - 2.5, 5, 5));
  }
  const endDeg = 180 + (180 * progress);
  canvas.setFillColor(color);
  for (let deg = 180; deg <= endDeg; deg += 1) {
    const rad = deg * Math.PI / 180;
    canvas.fillEllipse(new Rect(x + r * Math.cos(rad) - 3.5, y + r * Math.sin(rad) - 3.5, 7, 7));
  }
}

// --- 核心逻辑 ---
function calculateBday(p, today, todayLunar) {
  let l = Lunar.fromYmd(today.getFullYear(), p.month, p.day);
  let s = l.getSolar();
  let bDate = new Date(s.getYear(), s.getMonth() - 1, s.getDay());
  if (bDate < today) {
    l = Lunar.fromYmd(today.getFullYear() + 1, p.month, p.day);
    s = l.getSolar();
    bDate = new Date(s.getYear(), s.getMonth() - 1, s.getDay());
  }

  const hasTime = p.hour && p.hour !== "" && p.hour !== "无";
  const originL = hasTime 
    ? Lunar.fromYmdHms(p.year, p.month, p.day, getHourNum(p.hour), 0, 0)
    : Lunar.fromYmd(p.year, p.month, p.day);
    
  const baZi = originL.getEightChar();
  const month = (bDate.getMonth() + 1).toString().padStart(2, '0');
  const date = bDate.getDate().toString().padStart(2, '0');

  return {
    age: bDate.getFullYear() - p.year, 
    solarDateStr: `${bDate.getFullYear()}-${month}-${date}`,
    diff: Math.ceil((bDate - today) / 86400000),
    shengXiao: originL.getYearInGanZhi().substring(1) + originL.getYearShengXiao(),
    naYin: baZi.getYearNaYin().substring(0,3),
    fullDayGan: baZi.getDayGan() + baZi.getDayWuXing() + "命",
    zodiac: getZodiac(originL.getSolar().getMonth(), originL.getSolar().getDay()),
    bazi: hasTime 
      ? `${baZi.getYear()} ${baZi.getMonth()} ${baZi.getDay()} ${baZi.getTime()}`
      : `${baZi.getYear()} ${baZi.getMonth()} ${baZi.getDay()}`
  };
}

function getHourNum(h) {
  const hours = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"];
  if (hours.indexOf(h) !== -1) return hours.indexOf(h) * 2;
  const num = parseInt(h);
  return isNaN(num) ? 0 : num;
}

function getZodiac(m, d) {
  const s = "魔羯水瓶双鱼白羊金牛双子巨蟹狮子处女天秤天蝎射手魔羯";
  const arr = [20, 19, 21, 21, 21, 22, 23, 23, 23, 23, 22, 22];
  return s.substr(m * 2 - (d < arr[m - 1] ? 2 : 0), 2) + "座";
}

function checkChong(sx1, sx2) {
  const chongMap = {"鼠":"马","马":"鼠","牛":"羊","羊":"牛","虎":"猴","猴":"虎","兔":"鸡","鸡":"兔","龙":"狗","狗":"龙","蛇":"猪","猪":"蛇"};
  return chongMap[sx1] === sx2;
}

// --- GitHub 更新逻辑 ---
async function checkUpdate() {
  const a = new Alert();
  a.title = "检查更新";
  a.message = "正在连接 GitHub...";
  a.addAction("开始");
  a.addCancelAction("取消");
  if (await a.presentAlert() === 0) {
    try {
      let req = new Request(GITHUB_RAW_URL);
      let code = await req.loadString();
      let remoteVersion = code.match(/const VERSION = "([\d\.]+)";/)[1];
      if (remoteVersion !== VERSION) {
        let up = new Alert();
        up.title = "发现新版本 " + remoteVersion;
        up.addAction("更新");
        up.addCancelAction("取消");
        if (await up.presentAlert() === 0) Safari.open(GITHUB_RAW_URL);
      } else {
        let ok = new Alert();
        ok.title = "已是最新版本";
        await ok.present();
      }
    } catch (e) {
      let err = new Alert();
      err.title = "连接失败";
      await err.present();
    }
  }
}

// --- 数据管理与入口 ---
function getDB() {
  if (!fm.fileExists(dbPath)) return [{ name: "示例", year: 1995, month: 10, day: 24, hour: "子", emoji: "👤" }];
  return JSON.parse(fm.readString(dbPath));
}

if (config.runsInApp) {
  const menu = new Alert();
  menu.addAction("预览组件");
  menu.addAction("检查更新");
  const res = await menu.presentSheet();
  if (res === 0) (await createWidget()).presentMedium();
  if (res === 1) await checkUpdate();
} else {
  Script.setWidget(await createWidget());
  Script.complete();
}
