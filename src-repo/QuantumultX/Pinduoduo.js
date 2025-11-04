(function () {
  const url = $request?.url || "";
  const body = $response?.body;
  if (!body) return $done({});

  let obj;
  try {
    obj = JSON.parse(body);
  } catch {
    return $done({ body });
  }

  // 1) /api/alexa/homepage/hub
  if (/api\/alexa\/homepage\/hub/.test(url)) {
    try {
      delete obj.result?.icon_set;
      delete obj.result?.search_bar_hot_query;
      delete obj.result?.dy_module?.irregular_banner_dy;
      delete obj.result?.dy_module?.recommend_fresh_info;

      if (Array.isArray(obj.result?.bottom_tabs)) {
        obj.result.bottom_tabs = obj.result.bottom_tabs.filter(t =>
          ["index.html", "chat_list.html", "personal.html"].includes(t?.link)
        );
      }
    } catch {}
    return $done({ body: JSON.stringify(obj) });
  }

  // 2) /search
  if (/\/search\b/.test(url)) {
    try {
      delete obj.expansion;
    } catch {}
    return $done({ body: JSON.stringify(obj) });
  }

  // 3) /api/philo/personal/hub
  if (/api\/philo\/personal\/hub/.test(url)) {
    try {
      delete obj.monthly_card_entrance;
      delete obj.personal_center_style_v2_vo;
      delete obj.icon_set?.icons;
      delete obj.icon_set?.top_personal_icons;
    } catch {}
    return $done({ body: JSON.stringify(obj) });
  }

  // 4) /api/oak/integration/render
  if (/api\/oak\/integration\/render/.test(url)) {
    try {
      delete obj.bottom_section_list;
      delete obj.ui?.bottom_section;
      delete obj.ui?.live_section?.float_info;
    } catch {}
    return $done({ body: JSON.stringify(obj) });
  }

  // 5) /api/caterham/v3/query/order_detail_group
  if (/api\/caterham\/v3\/query\/order_detail_group/.test(url)) {
    try {
      delete obj.data?.goods_list;
    } catch {}
    return $done({ body: JSON.stringify(obj) });
  }

  // 无匹配则原样返回
  $done({ body });
})();
