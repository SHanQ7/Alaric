// IPPure 风险监测
const url = "https://my.ippure.com/v1/info";

async function fetchData() {
  try {
    let req = new Request(url);
    req.timeoutInterval = 8;
    return await req.loadJSON();
  } catch (e) { return null; }
}

const data = await fetchData();
let widget = await createWidget(data);

if (!config.runsInWidget) {
  await widget.presentMedium();
}
Script.setWidget(widget);
Script.complete();

async function createWidget(data) {
  let w = new ListWidget();
  w.setPadding(8, 12, 8, 12);

  const purpleNeon = new Color("#8165AC"); 
  const mainTextColor = Color.dynamic(new Color("#1C1C1E"), new Color("#FFFFFF"));
  w.backgroundColor = Color.dynamic(new Color("#FFFFFF"), new Color("#0A0A0C"));

  if (!data) {
    let msg = w.addText("⚠️ 连接中...");
    msg.textColor = purpleNeon;
    msg.centerAlignText();
    return w;
  }

  const score = data.fraudScore || 0;
  const flag = getFlagEmoji(data.countryCode);

  let mainStack = w.addStack();
  mainStack.centerAlignContent();

  // --- 左侧信息栏 ---
  let leftStack = mainStack.addStack();
  leftStack.layoutVertically();
  
  const addNeonInfo = (label, value) => {
    let rowStack = leftStack.addStack();
    rowStack.centerAlignContent();
    
    let labelStack = rowStack.addStack();
    labelStack.size = new Size(38, 22); 
    labelStack.centerAlignContent();
    let boxStack = labelStack.addStack();
    boxStack.size = new Size(36, 18); 
    boxStack.cornerRadius = 4;
    boxStack.borderWidth = 1.5; 
    boxStack.borderColor = purpleNeon;
    boxStack.centerAlignContent();
    let lText = boxStack.addText(label);
    lText.font = Font.boldSystemFont(8.5);
    lText.textColor = purpleNeon;
    
    rowStack.addSpacer(4); 

    let infoValueStack = rowStack.addStack();
    infoValueStack.size = new Size(170, 20); 
    infoValueStack.cornerRadius = 10; 
    infoValueStack.borderWidth = 2; 
    infoValueStack.borderColor = purpleNeon;
    infoValueStack.setPadding(0, 8, 0, 8);
    infoValueStack.centerAlignContent();
    let vText = infoValueStack.addText(value);
    vText.font = Font.boldSystemFont(10);
    vText.textColor = mainTextColor;
    vText.lineLimit = 1;
    vText.minimumScaleFactor = 0.5;
    
    leftStack.addSpacer(3); 
  };

  addNeonInfo("IP位置", `${flag} ${data.countryCode || 'UN'} · ${data.city || '未知'}`);
  addNeonInfo("IP地址", data.ip || "N/A");
  addNeonInfo("ISP", data.asOrganization || "N/A");
  addNeonInfo("ASN", data.asn ? `AS${data.asn}` : "N/A");
  addNeonInfo("IP类型", data.isResidential ? "住宅网络" : "数据中心");
  
  leftStack.addSpacer(2);
  let time = leftStack.addText(`SECURITY SCAN: ${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`);
  time.font = Font.systemFont(8);
  time.textColor = purpleNeon;
  time.textOpacity = 0.6;

  mainStack.addSpacer();

  // --- 右侧圆环栏 (优化霓虹绘制) ---
  let rightStack = mainStack.addStack();
  let ringStack = rightStack.addStack();
  ringStack.size = new Size(95, 95);
  ringStack.centerAlignContent();

  let canvas = new DrawContext();
  const cSize = 200;
  canvas.size = new Size(cSize, cSize);
  canvas.opaque = false;
  
  const deg = (score / 100) * 360;

  // 1. 绘制底色光影环 (Blur Effect)
  canvas.setLineWidth(12);
  canvas.setStrokeColor(new Color("#8165AC", 0.15));
  canvas.strokeEllipse(new Rect(10, 10, cSize-20, cSize-20));

  // 2. 绘制霓虹进度
  for (let i = 0; i <= deg; i += 1.5) { // 减小步进值让灯管更连贯
    let x = cSize/2 + (cSize/2-10) * Math.cos((i-90) * Math.PI/180);
    let y = cSize/2 + (cSize/2-10) * Math.sin((i-90) * Math.PI/180);
    
    // 霓虹光晕层
    canvas.setFillColor(new Color("#8165AC", 0.3));
    canvas.fillEllipse(new Rect(x-10, y-10, 20, 20));
    
    // 紫色主灯管层
    canvas.setFillColor(purpleNeon);
    canvas.fillEllipse(new Rect(x-7, y-7, 14, 14));
    
    // 核心亮白层 (画龙点睛的灯丝效果)
    canvas.setFillColor(new Color("#FFFFFF", 0.7));
    canvas.fillEllipse(new Rect(x-3, y-3, 6, 6));
  }
  
  ringStack.backgroundImage = canvas.getImage();
  
  let centerColumn = ringStack.addStack();
  centerColumn.layoutVertically();
  
  let scoreText = centerColumn.addText(`${score}`);
  scoreText.font = Font.boldSystemFont(28);
  scoreText.textColor = mainTextColor;
  scoreText.centerAlignText();
  
  let riskText = centerColumn.addText("RISK");
  riskText.font = Font.boldSystemFont(10);
  riskText.textColor = purpleNeon;
  riskText.centerAlignText();

  return w;
}

function getFlagEmoji(countryCode) {
  if (!countryCode) return "🌐";
  return countryCode.toUpperCase().replace(/./g, char => 
    String.fromCodePoint(127397 + char.charCodeAt())
  );
}
