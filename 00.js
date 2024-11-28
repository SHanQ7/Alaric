// 创建一个小部件
let widget = new ListWidget();

// 设置小部件的背景颜色和字体颜色
widget.backgroundColor = new Color("#ffffff");
widget.textColor = new Color("#000000");

// 获取当前日期
let currentDate = new Date();

// 格式化日期为字符串
let dateString = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`;

// 添加日期文本到小部件
let dateText = widget.addText(dateString);
dateText.font = Font.boldSystemFont(16);

// 在主屏幕上显示小部件
if (config.runsInWidget) {
  Script.setWidget(widget);
} else {
  widget.presentMedium();
}

Script.complete();
