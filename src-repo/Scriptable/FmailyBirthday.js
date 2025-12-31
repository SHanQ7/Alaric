// =================【FamilyBirthday】=================
if (typeof require === 'undefined') require = importModule;
const { DmYY, Runing } = require('./DmYY');

const VERSION = "1.0.0";
const GITHUB_RAW_URL = "https://raw.githubusercontent.com/SHanQ7/Alaric/refs/heads/main/src-repo/Scriptable/FmailyBirthday.js";

class Widget extends DmYY {
  constructor(arg) {
    super(arg);
    this.en = 'Family_Birthday_Neumorphic';
    this.name = 'FamilyBirthday';
    
    if (config.runsInApp) {
      this.registerAction('管理成员', async () => { await this.manageMembersMenu(); }, { name: 'person.2.fill', color: '#5BBFF6' });
      this.registerAction('视觉微调', async () => {
        return this.setAlertInput('UI坐标微调', '圆心Y,起点Y,字号,行距', {
          arcY: '133', startY: '160', fontSize: '8.5', spacing: '23'
        }, 'visualConfig');
      }, { name: 'paintbrush.fill', color: '#ff9500' });
      this.registerAction('检查更新', async () => { await this.checkUpdate(); }, { name: 'arrow.triangle.2.circlepath', color: '#34c759' });
      this.registerAction('基础设置', this.setWidgetConfig);
    }
  }

  // --- 更新检查逻辑 ---
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

  // --- 核心渲染函数 ---
  renderMedium = async (w) => {
    const { Lunar } = importModule("lunar.module");

    const rawV = this.settings.visualConfig || { arcY: 133, startY: 160, fontSize: 8.5, spacing: 23 };
    const v = {
      arcY: parseFloat(rawV.arcY),
      startY: parseFloat(rawV.startY),
      fontSize: parseFloat(rawV.fontSize),
      spacing: parseFloat(rawV.spacing)
    };

    const diZhiChongMap = {"子":"午","午":"子","丑":"未","未":"丑","寅":"申","申":"寅","卯":"酉","酉":"卯","辰":"戌","戌":"辰","巳":"亥","亥":"巳"};
    const diZhiHeMap = {"子":"丑","丑":"子","寅":"亥","亥":"寅","卯":"戌","戌":"卯","辰":"酉","酉":"辰","巳":"申","申":"巳","午":"未","未":"午"};
    const tianGanHeMap = {"甲":"己","己":"甲","乙":"庚","庚":"乙","丙":"辛","辛":"丙","丁":"壬","壬":"丁","戊":"癸","癸":"戊"};
    const sanHeMap = {
      "亥": ["卯", "未"], "子": ["辰", "申"], "丑": ["巳", "酉"],
      "寅": ["午", "戌"], "卯": ["亥", "未"], "辰": ["子", "申"],
      "巳": ["酉", "丑"], "午": ["寅", "戌"], "未": ["亥", "卯"],
      "申": ["子", "辰"], "酉": ["巳", "丑"], "戌": ["寅", "午"]
    };
    const sanXingMap = { "寅": "巳", "巳": "申", "申": "寅", "子": "卯", "卯": "子" };
    const chouWeiXu = ["丑", "未", "戌"];
    const ziXingList = ["辰", "午", "酉", "亥"]; 

    const wxColors = {
      "金": Color.dynamic(new Color("#D4AF37"), new Color("#FFD700")),
      "木": Color.dynamic(new Color("#228B22"), new Color("#32CD32")),
      "水": Color.dynamic(new Color("#00008B"), new Color("#1E90FF")),
      "火": Color.dynamic(new Color("#B22222"), new Color("#FF4500")),
      "土": Color.dynamic(new Color("#8B4513"), new Color("#CD853F"))
    };

    w.backgroundColor = Color.dynamic(new Color("#EBEBEF"), new Color("#1A1A1C"));
    w.setPadding(10, 6, 10, 6);
    const mainStack = w.addStack();
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const todayLunar = Lunar.fromDate(now);

    const dayGan = todayLunar.getDayGan();
    const dayZhi = todayLunar.getDayZhi();
    const dayChongGan = todayLunar.getDayChongGan();

    const displayData = (this.settings.dataSource || []).slice(0, 4);

    displayData.forEach((p, i) => {
      const info = this.calculateBday(p, today, todayLunar);
      const isBday = info.diff === 0;

      let statusColor = null;
      if (diZhiChongMap[info.riZhi] === dayZhi) {
        statusColor = new Color("#D32F2F"); 
      } else if (chouWeiXu.includes(dayZhi) && chouWeiXu.includes(info.riZhi) && dayZhi !== info.riZhi) {
        statusColor = new Color("#EF6C00"); 
      } else if (sanXingMap[info.riZhi] === dayZhi || sanXingMap[dayZhi] === info.riZhi) {
        statusColor = new Color("#EF6C00"); 
      } else if (info.riZhi === dayZhi && ziXingList.includes(dayZhi)) {
        statusColor = new Color("#F57C00"); 
      } else if (info.riGan === dayChongGan) {
        statusColor = new Color("#E64A19"); 
      } else if (diZhiHeMap[info.riZhi] === dayZhi) {
        statusColor = new Color("#2E7D32"); 
      } else if (sanHeMap[dayZhi] && sanHeMap[dayZhi].includes(info.riZhi)) {
        statusColor = new Color("#81C784"); 
      } else if (tianGanHeMap[info.riGan] === dayGan) {
        statusColor = new Color("#4CAF50"); 
      }

      let accentColor = isBday ? Color.cyan() : (info.diff <= 7 ? new Color("#ff4d94") : (wxColors[info.wuXing] || Color.orange()));

      const highlightStack = mainStack.addStack();
      highlightStack.setPadding(1, 1, 0, 0); 
      highlightStack.backgroundColor = Color.dynamic(new Color("#FFFFFF"), new Color("#2C2C2E"));
      highlightStack.cornerRadius = 14;

      const shadowStack = highlightStack.addStack();
      shadowStack.setPadding(0, 0, 2, 2); 
      shadowStack.backgroundColor = Color.dynamic(new Color("#D1D1D6"), new Color("#000000"));
      shadowStack.cornerRadius = 14;

      const container = shadowStack.addStack();
      container.size = new Size(73, 140);
      container.backgroundColor = Color.dynamic(new Color("#EBEBEF"), new Color("#1C1C1E"));
      container.cornerRadius = 13;

      const canvas = new DrawContext();
      canvas.size = new Size(68, 140);
      canvas.opaque = false;
      canvas.respectScreenScale = true;

      const arcY = Math.round(v.arcY / 2);
      const capStartY = Math.round(v.startY / 2);
      const fSize = Math.floor(v.fontSize - 1.5);
      const fGap = v.spacing / 2;

      canvas.setFont(Font.systemFont(22));
      canvas.setTextAlignedCenter();
      canvas.drawTextInRect(p.emoji || "👤", new Rect(0, 10, 71, 30));

      this.drawHeavyArc(canvas, 35.5, arcY, 27, accentColor, isBday ? 1.0 : Math.max(0.01, 1 - info.diff / 365));
      
      canvas.setFont(Font.boldSystemFont(13));
      canvas.setTextColor(accentColor);
      canvas.drawTextInRect(isBday ? "🎉" : `${info.diff}`, new Rect(0, arcY - 12, 71, 25));

      const labels = [info.solarDateStr, info.bazi, info.fullDayGan, info.naYin, info.sxAndZodiac];
      let currentY = capStartY;
      
      labels.forEach((text, idx) => {
        const hasStatus = (idx === 4 && statusColor !== null);
        canvas.setFillColor(hasStatus ? statusColor : Color.dynamic(new Color("#E2E2E7"), new Color("#252527")));
        const path = new Path();
        path.addRoundedRect(new Rect(5, Math.round(currentY), 61, 9), 3, 3);
        canvas.addPath(path);
        canvas.fillPath();
        canvas.setFont(Font.boldSystemFont(fSize));
        canvas.setTextColor(hasStatus ? Color.white() : Color.dynamic(new Color("#444448"), new Color("#AEAEB2")));
        canvas.drawTextInRect(text, new Rect(5, Math.round(currentY) + 1, 61, 10));
        currentY += fGap; 
      });

      container.addImage(canvas.getImage());
      if (i < displayData.length - 1) mainStack.addSpacer(6);
    });
    return w;
  };

  // --- 命理逻辑 ---
  calculateBday(p, today, todayLunar) {
    const { Lunar } = importModule("lunar.module");
    const yr = parseInt(p.year), mo = parseInt(p.month), dy = parseInt(p.day);

    const birthLunar = Lunar.fromYmd(yr, mo, dy);
    const birthSolar = birthLunar.getSolar();
    const baZi = birthLunar.getEightChar();
    
    const birthDayGan = baZi.getDayGan();
    const birthDayZhi = baZi.getDayZhi();
    const birthDayZhu = birthDayGan + birthDayZhi;

    let currentYear = todayLunar.getYear();
    let nextL = Lunar.fromYmd(currentYear, mo, dy);
    let nextS = nextL.getSolar();
    let bDate = new Date(nextS.getYear(), nextS.getMonth() - 1, nextS.getDay());
    if (bDate < today) {
      currentYear++;
      nextL = Lunar.fromYmd(currentYear, mo, dy);
      nextS = nextL.getSolar();
      bDate = new Date(nextS.getYear(), nextS.getMonth() - 1, nextS.getDay());
    }

    const WuXingMap = {"甲":"木","乙":"木","丙":"火","丁":"火","戊":"土","己":"土","庚":"金","辛":"金","壬":"水","癸":"水"};
    const myWuXing = WuXingMap[birthDayGan];
    const age = today.getFullYear() - yr;

  return {
      age,
      solarDateStr: `${nextS.getYear()}年${nextS.getMonth()}月${nextS.getDay()}日`,
      diff: Math.round((bDate.getTime() - today.getTime()) / 86400000),
      riZhi: birthDayZhi,
      riGan: birthDayGan,
      bazi: p.hour && p.hour !== "无" 
            ? `${baZi.getYear()} ${baZi.getMonth()} ${birthDayZhu} ${baZi.getTime()}`
            : `${baZi.getYear()} ${baZi.getMonth()} ${birthDayZhu}`,
      fullDayGan: `${age}岁 · ${birthDayGan}${myWuXing}命`,
      wuXing: myWuXing,
      naYin: baZi.getYearNaYin() + "命",
      sxAndZodiac: baZi.getYear() + birthLunar.getYearShengXiao() + " · " + this.getZodiac(birthSolar.getMonth(), birthSolar.getDay())
    };
  }

  // --- 绘图与辅助 ---
  drawHeavyArc(canvas, x, y, r, color, progress) {
    const trackColor = Color.dynamic(new Color("#D8D8DF"), new Color("#333333"));
    for (let deg = 180; deg <= 360; deg += 2.5) {
      const rad = deg * Math.PI / 180;
      canvas.setFillColor(trackColor);
      canvas.fillEllipse(new Rect(x + r * Math.cos(rad) - 1, y + r * Math.sin(rad) - 1, 2, 2));
    }
    const endDeg = 180 + (180 * progress);
    canvas.setFillColor(color);
    for (let deg = 180; deg <= endDeg; deg += 1) {
      const rad = deg * Math.PI / 180;
      canvas.fillEllipse(new Rect(x + r * Math.cos(rad) - 1.5, y + r * Math.sin(rad) - 1.5, 3, 3));
    }
  }

  getZodiac(m, d) {
    const s = "魔羯水瓶双鱼白羊金牛双子巨蟹狮子处女天秤天蝎射手魔羯";
    const arr = [20, 19, 21, 21, 21, 22, 23, 23, 23, 23, 22, 22];
    return s.substr(m * 2 - (d < arr[m - 1] ? 2 : 0), 2) + "座";
  }

  // --- 管理界面 ---
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
      const newP = { 
        name: a.textFieldValue(0), 
        year: parseInt(a.textFieldValue(1)), 
        month: parseInt(a.textFieldValue(2)), 
        day: parseInt(a.textFieldValue(3)), 
        hour: a.textFieldValue(4), 
        emoji: a.textFieldValue(5) 
      };
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
