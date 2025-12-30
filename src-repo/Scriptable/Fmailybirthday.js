if (typeof require === 'undefined') require = importModule;
const { DmYY, Runing } = require('./DmYY');

const VERSION = "1.1.0";
const GITHUB_RAW_URL = "https://raw.githubusercontent.com/SHanQ7/Alaric/refs/heads/main/src-repo/Scriptable/Fmailybirthday.js"; 

class Widget extends DmYY {
  constructor(arg) {
    super(arg);
    this.en = 'birthdayWidget';
    this.name = '生日管家';
    
    if (config.runsInApp) {
      this.registerAction('管理成员', async () => {
        await this.manageMembersMenu();
      }, { name: 'person.2.fill', color: '#5BBFF6' });

      this.registerAction('视觉微调', async () => {
        return this.setAlertInput('坐标与间距', '圆心Y,起点Y,文字大小,行间距', {
          arcY: '130', startY: '163', fontSize: '13', spacing: '23.5'
        }, 'visualConfig');
      }, { name: 'paintbrush.fill', color: '#ff9500' });

      this.registerAction('检查更新', async () => {
        await this.checkUpdate();
      }, { name: 'arrow.triangle.2.circlepath', color: '#34c759' });

      this.registerAction('基础设置', this.setWidgetConfig);
    }
  }

  async checkUpdate() {
    const a = new Alert();
    a.title = "检查更新";
    a.message = "正在连接 GitHub 检查最新版本...";
    const checkIdx = a.addAction("开始检查");
    a.addCancelAction("取消");
    
    if (await a.presentAlert() === checkIdx) {
      try {
        const req = new Request(GITHUB_RAW_URL);
        const remoteCode = await req.loadString();
        const remoteVersionMatch = remoteCode.match(/const VERSION = "([\d\.]+)";/);
        
        if (remoteVersionMatch && remoteVersionMatch[1] !== VERSION) {
          const updateAlert = new Alert();
          updateAlert.title = "发现新版本: v" + remoteVersionMatch[1];
          updateAlert.message = "当前版本: v" + VERSION + "\n是否前往 GitHub 下载最新脚本？";
          updateAlert.addAction("前往下载");
          updateAlert.addCancelAction("下次再说");
          if (await updateAlert.presentAlert() === 0) {
            Safari.open(GITHUB_RAW_URL.replace("raw.githubusercontent.com", "github.com").replace("/main/", "/blob/main/"));
          }
        } else {
          const latestAlert = new Alert();
          latestAlert.title = "已是最新版本";
          latestAlert.message = "当前版本 v" + VERSION + " 运行良好。";
          await latestAlert.present();
        }
      } catch (e) {
        const errAlert = new Alert();
        errAlert.title = "更新检查失败";
        errAlert.message = "请检查网络连接或 GitHub 链接是否正确。";
        await errAlert.present();
      }
    }
  }

  async manageMembersMenu() {
    const data = this.settings.dataSource || [];
    const alert = new Alert();
    alert.title = "👥 成员管理";
    alert.addAction("➕ 添加新成员");
    data.forEach(p => alert.addAction(`📝 编辑: ${p.emoji}${p.name}`));
    alert.addDestructiveAction("🗑️ 删除成员");
    alert.addCancelAction("返回");
    
    const idx = await alert.presentSheet();
    if (idx === 0) await this.editMember(null);
    else if (idx > 0 && idx <= data.length) await this.editMember(idx - 1);
    else if (idx === data.length + 1) await this.deleteMemberMenu();
  }

  async editMember(index) {
    const data = this.settings.dataSource || [];
    const isNew = index === null;
    const p = isNew ? { name: '', year: '1995', month: '1', day: '1', emoji: '👤' } : data[index];
    const a = new Alert();
    a.title = isNew ? "新增成员" : "修改信息";
    a.addTextField("姓名", p.name);
    a.addTextField("生年", String(p.year));
    a.addTextField("农历月", String(p.month));
    a.addTextField("农历日", String(p.day));
    a.addTextField("Emoji", p.emoji);
    a.addAction("保存");
    a.addCancelAction("取消");
    if (await a.presentAlert() === 0) {
      const newP = {
        name: a.textFieldValue(0),
        year: parseInt(a.textFieldValue(1)),
        month: parseInt(a.textFieldValue(2)),
        day: parseInt(a.textFieldValue(3)),
        emoji: a.textFieldValue(4)
      };
      if (isNew) data.push(newP);
      else data[index] = newP;
      this.settings.dataSource = data;
      this.saveSettings();
      await this.manageMembersMenu();
    }
  }

  async deleteMemberMenu() {
    const data = this.settings.dataSource || [];
    const a = new Alert();
    a.title = "选择要删除的成员";
    data.forEach(p => a.addAction(p.name));
    a.addCancelAction("取消");
    const idx = await a.presentSheet();
    if (idx > -1) {
      data.splice(idx, 1);
      this.settings.dataSource = data;
      this.saveSettings();
    }
  }

  // --- 渲染逻辑 (保持拟态设计) ---
  async init() { this.currentData = this.settings.dataSource || []; }

  renderMedium = async (w) => {
    const v = this.settings.visualConfig || { arcY: 130, startY: 163, fontSize: 13, spacing: 23.5 };
    w.backgroundColor = Color.dynamic(new Color("#EBEBEF"), new Color("#1A1A1C"));
    w.setPadding(12, 22, 12, 22); 
    const mainStack = w.addStack();
    mainStack.layoutHorizontally();
    mainStack.centerAlignContent();
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const { Solar, Lunar } = importModule("lunar.module");
    const todayLunar = Lunar.fromDate(now);
    const displayData = this.currentData.slice(0, 4);
    
    displayData.forEach((p, i) => {
      const info = this.calculateBday(p, today, todayLunar);
      const isBday = info.diff === 0;
      let accentColor = isBday ? Color.cyan() : (info.diff <= 7 ? new Color("#ff4d94") : Color.orange());

      const highlightStack = mainStack.addStack();
      highlightStack.setPadding(2, 2, 0, 0); 
      highlightStack.backgroundColor = Color.dynamic(new Color("#FFFFFF"), new Color("#2C2C2E"));
      highlightStack.cornerRadius = 18;
      const shadowStack = highlightStack.addStack();
      shadowStack.setPadding(0, 0, 3, 3); 
      shadowStack.backgroundColor = Color.dynamic(new Color("#D1D1D6"), new Color("#000000"));
      shadowStack.cornerRadius = 18;
      const container = shadowStack.addStack();
      container.size = new Size(68, 145);
      container.backgroundColor = Color.dynamic(new Color("#EBEBEF"), new Color("#1C1C1E"));
      container.cornerRadius = 16;
      
      const canvas = new DrawContext();
      canvas.size = new Size(144, 290); 
      canvas.opaque = false;
      canvas.respectScreenScale = true;

      const arcY = parseFloat(v.arcY);
      const capsuleStartY = parseFloat(v.startY);
      canvas.setFont(Font.systemFont(37));
      canvas.setTextAlignedCenter();
      canvas.drawTextInRect(p.emoji || "👤", new Rect(0, 23, 144, 45));
      const trackColor = Color.dynamic(new Color("#D8D8DF"), new Color("#333333"));
      this.drawHeavyArc(canvas, 72, arcY, 46, accentColor, 1 - info.diff/365, trackColor);
      canvas.setFont(Font.heavySystemFont(28));
      canvas.setTextColor(accentColor);
      canvas.drawTextInRect(isBday ? "🎉" : `${info.diff}`, new Rect(0, arcY - 18, 144, 40));

      const labels = [info.solarDateStr, `${info.age}岁`, info.shengXiao, info.naYin, info.bazi];
      let currentY = capsuleStartY;
      labels.forEach(text => {
        canvas.setFillColor(Color.dynamic(new Color("#E2E2E7"), new Color("#252527")));
        const path = new Path();
        path.addRoundedRect(new Rect(10, currentY, 124, 19), 6, 6);
        canvas.addPath(path);
        canvas.fillPath();
        canvas.setFont(Font.boldSystemFont(parseFloat(v.fontSize)));
        canvas.setTextColor(Color.dynamic(new Color("#444448"), new Color("#AEAEB2")));
        canvas.drawTextInRect(text, new Rect(10, currentY + 2.5, 124, 19));
        currentY += parseFloat(v.spacing);
      });
      container.addImage(canvas.getImage());
      if (i < displayData.length - 1) mainStack.addSpacer(12);
    });
    return w;
  };

  drawHeavyArc(canvas, x, y, r, color, progress, trackColor) {
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

  calculateBday(p, today, todayLunar) {
    const { Lunar } = importModule("lunar.module");
    let l = Lunar.fromYmd(today.getFullYear(), p.month, p.day);
    let s = l.getSolar();
    let bDate = new Date(s.getYear(), s.getMonth() - 1, s.getDay());
    if (bDate < today) {
      l = Lunar.fromYmd(today.getFullYear() + 1, p.month, p.day);
      s = l.getSolar();
      bDate = new Date(s.getYear(), s.getMonth() - 1, s.getDay());
    }
    const originL = Lunar.fromYmd(p.year, p.month, p.day);
    const bz = originL.getEightChar();
    return {
      age: bDate.getFullYear() - p.year, 
      solarDateStr: `${bDate.getMonth()+1}-${bDate.getDate()}`,
      diff: Math.ceil((bDate - today) / 86400000),
      shengXiao: originL.getYearInGanZhi().substring(1) + originL.getYearShengXiao(),
      naYin: bz.getYearNaYin().substring(0,3),
      bazi: bz.getYear() + " " + bz.getMonth()
    };
  }

  async render() {
    await this.init();
    const widget = new ListWidget();
    return await this.renderMedium(widget);
  }
}

await Runing(Widget, '', false);
