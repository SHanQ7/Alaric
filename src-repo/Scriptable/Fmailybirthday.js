// Variables used by Scriptable.
// icon-color: gold; icon-glyph: cake;

// ================= 配置区 =================
const VERSION = "1.1.0"; // 当前本地版本
const GITHUB_URL = "https://raw.githubusercontent.com/你的用户名/你的仓库名/main/BirthdayWidget.js"; 
// ==========================================

const { Solar, Lunar } = importModule("lunar.module");
const fm = FileManager.local();
const dbPath = fm.joinPath(fm.documentsDirectory(), "family_birthdays.json");

/** 基础数据管理 **/
function getDB() {
  if (!fm.fileExists(dbPath)) fm.writeString(dbPath, "[]");
  return JSON.parse(fm.readString(dbPath));
}
function saveDB(data) {
  fm.writeString(dbPath, JSON.stringify(data));
}

/** 核心：GitHub 自动更新功能 **/
async function updateCheck() {
  const a = new Alert();
  a.title = "🔍 检查更新";
  a.message = "正在连接 GitHub 确认最新版本...";
  
  try {
    const req = new Request(GITHUB_URL);
    const code = await req.loadString();
    
    // 正则匹配远程代码中的 VERSION 变量
    const remoteVersion = code.match(/const VERSION = "(.*?)";/)[1];
    
    if (remoteVersion && remoteVersion !== VERSION) {
      const updateA = new Alert();
      updateA.title = "🚀 发现新版本";
      updateA.message = `本地版本: ${VERSION}\n远程版本: ${remoteVersion}\n是否现在更新代码？`;
      updateA.addAction("立即更新");
      updateA.addCancelAction("稍后再说");
      
      if (await updateA.present() === 0) {
        const path = module.filename;
        fm.writeString(path, code); // 覆盖当前脚本文件
        const success = new Alert();
        success.title = "✅ 更新成功";
        success.message = "代码已更新，请重启脚本。";
        await success.present();
        return true;
      }
    } else {
      const noUpdate = new Alert();
      noUpdate.title = "👏 已经是最新版";
      noUpdate.message = `当前版本 ${VERSION} 运行良好。`;
      noUpdate.addAction("好");
      await noUpdate.present();
    }
  } catch (e) {
    const errorA = new Alert();
    errorA.title = "❌ 更新失败";
    errorA.message = "请检查网络连接或 GitHub 链接是否正确。";
    errorA.addAction("确定");
    await errorA.present();
  }
  return false;
}

// ==========================================
//               【控制面板区】
// ==========================================
async function renderSettings() {
  const db = getDB();
  const alert = new Alert();
  alert.title = "🎂 生日管家 Pro";
  alert.message = `版本: ${VERSION} | 已录入 ${db.length} 人`;
  
  alert.addAction("➕ 添加新成员");
  if (db.length > 0) alert.addAction("📝 管理成员");
  alert.addAction("🖼 预览组件");
  alert.addAction("🔄 检查更新"); // 新增更新入口
  alert.addCancelAction("退出");

  const menuIdx = await alert.present();
  
  if (menuIdx === 0) {
    await editMember(db, -1);
  } else if (menuIdx === 1 && db.length > 0) {
    const list = new Alert();
    list.title = "选择成员";
    db.forEach(p => list.addAction(p.name));
    list.addCancelAction("返回");
    const idx = await list.present();
    if (idx !== -1) await editMember(db, idx);
  } else if (menuIdx === 2 || (menuIdx === 1 && db.length === 0)) {
    const w = await createWidget();
    await w.presentMedium();
  } else if (menuIdx === 3 || (menuIdx === 2 && db.length === 0)) {
    await updateCheck(); // 调用更新逻辑
  }
}

async function editMember(db, index) {
  const isNew = index === -1;
  const item = isNew ? { name: "", year: 1990, month: 1, day: 1 } : db[index];
  const a = new Alert();
  a.title = isNew ? "添加成员" : `修改 ${item.name}`;
  a.addTextField("姓名", item.name);
  a.addTextField("出生年", String(item.year));
  a.addTextField("农历月", String(item.month));
  a.addTextField("农历日", String(item.day));
  a.addAction("保存");
  if (!isNew) a.addDestructiveAction("删除");
  a.addCancelAction("取消");
  
  const res = await a.present();
  if (res === 0) {
    const newObj = {
      name: a.textFieldValue(0),
      year: parseInt(a.textFieldValue(1)),
      month: parseInt(a.textFieldValue(2)),
      day: parseInt(a.textFieldValue(3))
    };
    if (isNew) db.push(newObj); else db[index] = newObj;
    saveDB(db);
  } else if (res === 1 && !isNew) {
    db.splice(index, 1);
    saveDB(db);
  }
  await renderSettings();
}

// ==========================================
//               【小组件渲染区】
// ==========================================
async function createWidget() {
  const db = getDB();
  const w = new ListWidget();
  w.backgroundColor = new Color("#1c1c1e");
  const todayL = Lunar.fromDate(new Date());
  
  const header = w.addStack();
  const t_date = header.addText(`📅 ${todayL.getMonthInChinese()}月${todayL.getDayInChinese()} · 财位:${todayL.getDayPositionCaiDesc()}`);
  t_date.font = Font.boldSystemFont(12);
  t_date.textColor = new Color("#f2c94c");

  w.addSpacer(15);
  const bodyStack = w.addStack();
  
  if (db.length === 0) {
    bodyStack.addText("点击图标录入数据");
  }

  db.slice(0, 4).forEach((p, i) => {
    const info = getBdayInfo(p);
    const col = bodyStack.addStack();
    col.layoutVertically();
    col.centerAlignContent();

    const canvas = new DrawContext();
    canvas.size = new Size(100, 100);
    canvas.opaque = false;
    canvas.setLineWidth(6);
    canvas.setStrokeColor(new Color("#ffffff", 0.1));
    canvas.strokeEllipse(new Rect(10, 10, 80, 80));
    
    const progColor = info.diff < 30 ? Color.orange() : new Color("#f2c94c");
    canvas.setStrokeColor(progColor);
    const progress = Math.max(0.1, 1 - info.diff/365);
    for(let a=0; a<360*progress; a+=5) {
      const rad = (a - 90) * Math.PI / 180;
      canvas.fillEllipse(new Rect(50 + 40*Math.cos(rad) - 3, 50 + 40*Math.sin(rad) - 3, 6, 6));
    }
    
    const emojiMap = {"鼠":"🐭","牛":"🐮","虎":"🐯","兔":"🐰","龙":"🐲","蛇":"🐍","马":"🐴","羊":"🐑","猴":"🐵","鸡":"🐔","狗":"🐶","猪":"🐷"};
    canvas.setFont(Font.systemFont(35));
    canvas.drawTextInRect(emojiMap[info.shengXiao] || "👤", new Rect(0, 28, 100, 40));

    const img = col.addImage(canvas.getImage());
    img.imageSize = new Size(60, 60);

    col.addSpacer(4);
    const nameT = col.addText(p.name);
    nameT.font = Font.boldSystemFont(11);
    nameT.centerAlignText();

    const diffT = col.addText(info.diff === 0 ? "今天!" : `${info.diff}天`);
    diffT.font = Font.systemFont(10);
    diffT.textColor = progColor;
    diffT.centerAlignText();

    if (i < db.length - 1) bodyStack.addSpacer();
  });

  return w;
}

function getBdayInfo(p) {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  let l = Lunar.fromYmd(now.getFullYear(), p.month, p.day);
  let s = l.getSolar();
  let bDay = new Date(s.getYear(), s.getMonth()-1, s.getDay());
  if (bDay < today) {
    l = Lunar.fromYmd(now.getFullYear() + 1, p.month, p.day);
    s = l.getSolar();
    bDay = new Date(s.getYear(), s.getMonth()-1, s.getDay());
  }
  const diff = Math.ceil((bDay - today) / 86400000);
  const originL = Lunar.fromYmd(p.year, p.month, p.day);
  return { diff, shengXiao: originL.getYearShengXiao() };
}

// 启动逻辑
if (config.runsInApp) {
  await renderSettings();
} else {
  const w = await createWidget();
  Script.setWidget(w);
  Script.complete();
}
