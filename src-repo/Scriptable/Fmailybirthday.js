// =================【FamilyBirthday】=================
if (typeof require === 'undefined') require = importModule;
const { DmYY, Runing } = require('./DmYY');

const VERSION = "1.0.0";
const GITHUB_RAW_URL = "https://raw.githubusercontent.com/SHanQ7/Alaric/refs/heads/main/src-repo/Scriptable/Fmailybirthday.js";

class Widget extends DmYY {
  constructor(arg) {
    super(arg);
    this.en = 'Family_Birthday_Neumorphic';
    this.name = 'FamilyBirthday';
    
    if (config.runsInApp) {
      this.registerAction('管理成员', async () => { await this.manageMembersMenu(); }, { name: 'person.2.fill', color: '#5BBFF6' });
      this.registerAction('视觉微调', async () => {
        return this.setAlertInput('UI坐标微调', '圆心Y,起点Y,字号,行距', {
          arcY: '130', startY: '163', fontSize: '12', spacing: '23.5'
        }, 'visualConfig');
      }, { name: 'paintbrush.fill', color: '#ff9500' });
      this.registerAction('检查更新', async () => { await this.checkUpdate(); }, { name: 'arrow.triangle.2.circlepath', color: '#34c759' });
      this.registerAction('基础设置', this.setWidgetConfig);
    }
  }

  async checkUpdate() {
    const alert = new Alert();
    alert.title = "🔄 检查更新";
    alert.message = "正在从 GitHub 获取最新版本信息...";
    alert.addCancelAction("取消");
    alert.addAction("立即检查");
    
    if (await alert.presentAlert() === 0) {
      try {
        const req = new Request(GITHUB_RAW_URL);
        const code = await req.loadString();
        const remoteVersion = code.match(/const VERSION = "([\d\.]+)";/)[1];
        if (this.compareVersion(remoteVersion, VERSION)) {
          const up = new Alert();
          up.title = "发现新版本 " + remoteVersion;
          up.message = "是否立即下载并覆盖当前代码？";
          up.addAction("开始更新");
          up.addCancelAction("取消");
          if (await up.presentAlert() === 0) {
            FileManager.local().writeString(module.filename, code);
            const success = new Alert();
            success.title = "✅ 更新成功";
            await success.present();
          }
        } else {
          const ok = new Alert();
          ok.title = "已是最新版本";
          await ok.present();
        }
      } catch (e) {
        const err = new Alert();
        err.title = "❌ 更新失败";
        await err.present();
      }
    }
  }

  compareVersion(v1, v2) {
    const a = v1.split('.').map(Number);
    const b = v2.split('.').map(Number);
    for (let i = 0; i < a.length; i++) {
      if (a[i] > (b[i] || 0)) return true;
      if (a[i] < (b[i] || 0)) return false;
    }
    return false;
  }

  // --- 渲染函数 ---
  renderMedium = async (w) => {
    const { Lunar } = importModule("lunar.module");
    const v = this.settings.visualConfig || { arcY: 130, startY: 163, fontSize: 11, spacing: 23.5 };
    w.backgroundColor = Color.dynamic(new Color("#EBEBEF"), new Color("#1A1A1C"));
    w.setPadding(12, 12, 12, 12); 

    const mainStack = w.addStack();
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const todayLunar = Lunar.fromDate(now);
    const displayData = (this.settings.dataSource || []).slice(0, 4);
    
    displayData.forEach((p, i) => {
      const info = this.calculateBday(p, today, todayLunar);
      const isBday = info.diff === 0;
      const isChong = this.checkChong(info.shengXiao.slice(-1), todayLunar.getDayShengXiao());

      const wxColors = {
        "金": Color.dynamic(new Color("#D4AF37"), new Color("#FFD700")),
        "木": Color.dynamic(new Color("#228B22"), new Color("#32CD32")),
        "水": Color.dynamic(new Color("#00008B"), new Color("#1E90FF")),
        "火": Color.dynamic(new Color("#B22222"), new Color("#FF4500")),
        "土": Color.dynamic(new Color("#8B4513"), new Color("#CD853F"))
      };
      let accentColor = isBday ? Color.cyan() : (info.diff <= 7 ? new Color("#ff4d94") : (wxColors[info.wuXing] || Color.orange()));

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
      
      const canvas = new DrawContext();
      canvas.size = new Size(144, 290); 
      canvas.opaque = false;
      canvas.respectScreenScale = true;

      const arcY = parseFloat(v.arcY), capStartY = parseFloat(v.startY), fSize = parseFloat(v.fontSize), fGap = parseFloat(v.spacing);
      canvas.setFont(Font.systemFont(37));
      canvas.setTextAlignedCenter();
      canvas.drawTextInRect(p.emoji || "👤", new Rect(0, 23, 144, 45));

      this.drawHeavyArc(canvas, 72, arcY, 46, accentColor, isBday ? 1.0 : Math.max(0.01, 1 - info.diff / 365));
      canvas.setFont(Font.heavySystemFont(28));
      canvas.setTextColor(accentColor);
      canvas.drawTextInRect(isBday ? "🎉" : `${info.diff}`, new Rect(0, arcY - 18, 144, 40));

      const labels = [info.solarDateStr, info.bazi, info.fullDayGan, info.naYin, info.sxAndZodiac];
      let currentY = capStartY;
      labels.forEach((text, idx) => {
        const isChongRow = (idx === 4 && isChong);
        canvas.setFillColor(isChongRow ? new Color("#FF4D4D") : Color.dynamic(new Color("#E2E2E7"), new Color("#252527")));
        const path = new Path();
        path.addRoundedRect(new Rect(10, currentY, 124, 19), 6, 6);
        canvas.addPath(path);
        canvas.fillPath();

        canvas.setFont(Font.boldSystemFont(fSize));
        canvas.setTextColor(isChongRow ? Color.white() : Color.dynamic(new Color("#444448"), new Color("#AEAEB2")));
        canvas.drawTextInRect(text, new Rect(10, currentY + 3, 124, 19));
        currentY += fGap; 
      });

      container.addImage(canvas.getImage());
      if (i < displayData.length - 1) mainStack.addSpacer(8);
    });
    return w;
  };

// --- 命理逻辑 ---
  calculateBday(p, today, todayLunar) {
    const { Lunar, Solar } = importModule("lunar.module");
    const yr = parseInt(p.year), mo = parseInt(p.month), dy = parseInt(p.day);

    const tempL = Lunar.fromYmd(yr, mo, dy);
    const sDate = tempL.getSolar(); 
    const sYear = sDate.getYear(), sMonth = sDate.getMonth(), sDay = sDate.getDay();

    const L = Lunar.fromDate(new Date(sYear, sMonth - 1, sDay, 12, 0, 0));
    
    const baZi = L.getEightChar();
    const nianZhu = baZi.getYear();
    const yueZhu = baZi.getMonth();
    const riZhu = baZi.getDay();
    const riGan = riZhu.substring(0, 1);
    const riWuXing = baZi.getDayWuXing().substring(0, 1);

    let age = today.getFullYear() - yr;

    let currentLunarYear = todayLunar.getYear();
    let nextL = Lunar.fromYmd(currentLunarYear, mo, dy);
    let nextS = nextL.getSolar();
    let bDate = new Date(nextS.getYear(), nextS.getMonth() - 1, nextS.getDay());

    if (bDate < today) {
      currentLunarYear++;
      nextL = Lunar.fromYmd(currentLunarYear, mo, dy);
      nextS = nextL.getSolar();
      bDate = new Date(nextS.getYear(), nextS.getMonth() - 1, nextS.getDay());
    }

    return {
      age: age,
      solarDateStr: `${nextS.getYear()}-${String(nextS.getMonth()).padStart(2,'0')}-${String(nextS.getDay()).padStart(2,'0')}`,
      diff: Math.ceil((bDate - today) / 86400000),
      shengXiao: L.getYearShengXiao(),
      sxAndZodiac: `${nianZhu.substring(1)}${L.getYearShengXiao()} · ${this.getZodiac(sMonth, sDay)}`,
      naYin: baZi.getYearNaYin() + "命",
      wuXing: riWuXing,
      fullDayGan: `${age}岁 · ${riGan}${riWuXing}命`,
      bazi: `${nianZhu} ${yueZhu} ${riZhu}`
    };
  }

  // --- 工具函数 ---
  drawHeavyArc(canvas, x, y, r, color, progress) {
    const trackColor = Color.dynamic(new Color("#D8D8DF"), new Color("#333333"));
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

  getHourNum(h) {
    const hours = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"];
    return hours.indexOf(h) !== -1 ? hours.indexOf(h) * 2 : (isNaN(parseInt(h)) ? 0 : parseInt(h));
  }

  getZodiac(m, d) {
    const s = "魔羯水瓶双鱼白羊金牛双子巨蟹狮子处女天秤天蝎射手魔羯";
    const arr = [20, 19, 21, 21, 21, 22, 23, 23, 23, 23, 22, 22];
    return s.substr(m * 2 - (d < arr[m - 1] ? 2 : 0), 2) + "座";
  }

  checkChong(sx1, sx2) {
    const chongMap = {"鼠":"马","马":"鼠","牛":"羊","羊":"牛","虎":"猴","猴":"虎","兔":"鸡","鸡":"兔","龙":"狗","狗":"龙","蛇":"猪","猪":"蛇"};
    return chongMap[sx1] === sx2;
  }

  async manageMembersMenu() {
    const data = this.settings.dataSource || [];
    const a = new Alert();
    a.title = "👥 成员管理";
    a.addAction("➕ 添加新成员");
    data.forEach(p => a.addAction(`📝 编辑: ${p.emoji}${p.name}`));
    a.addDestructiveAction("🗑️ 删除成员");
    a.addCancelAction("返回");
    const res = await a.presentSheet();
    if (res === 0) await this.editMember(null);
    else if (res > 0 && res <= data.length) await this.editMember(res - 1);
    else if (res === data.length + 1) await this.deleteMemberMenu();
  }

  async editMember(index) {
    const data = this.settings.dataSource || [];
    const isNew = index === null;
    const p = isNew ? { name: '', year: '1995', month: '10', day: '24', hour: '无', emoji: '👤' } : data[index];
    const a = new Alert();
    a.title = isNew ? "新增" : "编辑";
    a.addTextField("姓名", p.name);
    a.addTextField("农历年", String(p.year));
    a.addTextField("农历月", String(p.month));
    a.addTextField("农历日", String(p.day));
    a.addTextField("时辰(子/14)", p.hour);
    a.addTextField("Emoji", p.emoji);
    a.addAction("保存");
    a.addCancelAction("取消");
    if (await a.presentAlert() === 0) {
      const newP = { name: a.textFieldValue(0), year: parseInt(a.textFieldValue(1)), month: parseInt(a.textFieldValue(2)), day: parseInt(a.textFieldValue(3)), hour: a.textFieldValue(4), emoji: a.textFieldValue(5) };
      if (isNew) data.push(newP); else data[index] = newP;
      this.settings.dataSource = data;
      this.saveSettings();
    }
  }

  async deleteMemberMenu() {
    const data = this.settings.dataSource || [];
    const a = new Alert(); data.forEach(p => a.addAction(p.name));
    const res = await a.presentSheet();
    if (res > -1) { data.splice(res, 1); this.settings.dataSource = data; this.saveSettings(); }
  }

  async render() {
    const widget = new ListWidget();
    return await this.renderMedium(widget);
  }
}

await Runing(Widget, '', false);
