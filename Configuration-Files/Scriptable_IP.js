// 获取 IP 信息的函数
async function fetchIPInfo(url) {
  const req = new Request(url);
  const ipInfo = await req.loadString();
  return ipInfo;
}

// 创建小组件
async function createWidget() {
  let widget = new ListWidget();
  widget.backgroundColor = new Color("#1c1c1c");

  // 添加标题
  let title = widget.addText("你的 IP 信息");
  title.font = Font.boldSystemFont(16);
  title.textColor = Color.white();
  widget.addSpacer(8);

  // 获取 IP 信息（你可以选择使用 dark 或 normal 模式的 URL）
  const ipInfo = await fetchIPInfo("https://ip.skk.moe/simple");  // 普通模式
  // const ipInfo = await fetchIPInfo("https://ip.skk.moe/simple-dark"); // 暗色模式

  // 显示 IP 信息
  let ipText = widget.addText(ipInfo.trim());
  ipText.font = Font.systemFont(14);
  ipText.textColor = Color.white();
  widget.addSpacer(8);

  return widget;
}

// 运行小组件
let widget = await createWidget();
if (config.runsInWidget) {
  Script.setWidget(widget);
} else {
  widget.presentMedium();  // 如果不是小组件模式，则展示中等大小
}

Script.complete();
