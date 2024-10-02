// 导入 Scriptable 模块
const widget = new ListWidget();
const title = widget.addText("📅 历史上的今天");
title.font = Font.boldSystemFont(16);

// 获取今天的日期
const today = new Date();
const dateString = today.toISOString().slice(5, 10);  // 获取日期，格式 MM-DD

// 定义维基百科 API 请求 URL
const url = `https://zh.wikipedia.org/api/rest_v1/feed/onthisday/events/${dateString}`;

// 通过 API 获取数据
const req = new Request(url);
const res = await req.loadJSON();

// 显示事件的数量，设置一个限制
const maxEvents = 5;
let eventCount = 0;

// 遍历获取的事件并显示
for (const event of res.events) {
  if (eventCount >= maxEvents) break;

  const year = event.year;
  const text = event.text;
  
  // 添加事件的年份和描述
  const eventText = widget.addText(`📅 ${year}: ${text}`);
  eventText.font = Font.systemFont(12);
  eventText.lineLimit = 2;
  
  eventCount++;
}

// 设置 widget 的刷新间隔
widget.refreshAfterDate = new Date(Date.now() + 1000 * 60 * 60);

// 将 widget 设置为主界面小组件
if (config.runsInWidget) {
  Script.setWidget(widget);
} else {
  widget.presentMedium();
}

Script.complete();
