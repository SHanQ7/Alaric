/**
 * pinduoduo.js
 * 统一处理多个接口的响应修改
 */

(function () {
  try {
    const url = $request.url || "";
    const body = $response && $response.body ? $response.body : null;

    if (!body) {
      $done({});
      return;
    }

    let obj;
    try {
      obj = JSON.parse(body);
    } catch (e) {
      // 非 JSON 响应则直接返回原始内容
      $done({ body });
      return;
    }

    // helper - safe delete
    const safeDelete = (o, path) => {
      if (!o) return;
      const parts = path.split(".");
      let cur = o;
      for (let i = 0; i < parts.length - 1; i++) {
        if (cur[parts[i]] === undefined) return;
        cur = cur[parts[i]];
      }
      delete cur[parts[parts.length - 1]];
    };

    // 1) /api/alexa/homepage/hub
    if (/api\/alexa\/homepage\/hub/.test(url)) {
      try {
        safeDelete(obj, "result.icon_set");
        safeDelete(obj, "result.search_bar_hot_query");
        // dy_module may not exist
        if (obj.result && obj.result.dy_module) {
          safeDelete(obj.result.dy_module, "irregular_banner_dy"); // note: safeDelete expects object and path string, but for nested ease do manual
          delete obj.result.dy_module.recommend_fresh_info;
        }
        // filter bottom_tabs by link
        if (obj.result && Array.isArray(obj.result.bottom_tabs)) {
          obj.result.bottom_tabs = obj.result.bottom_tabs.filter(function (t) {
            return t && (t.link === "index.html" || t.link === "chat_list.html" || t.link === "personal.html");
          });
        }
      } catch (e) {}
      $done({ body: JSON.stringify(obj) });
      return;
    }

    // 2) /search
    if (/\/search\b/.test(url)) {
      if (obj && obj.expansion !== undefined) {
        delete obj.expansion;
      }
      $done({ body: JSON.stringify(obj) });
      return;
    }

    // 3) /api/philo/personal/hub
    if (/api\/philo\/personal\/hub/.test(url)) {
      try {
        delete obj.monthly_card_entrance;
        delete obj.personal_center_style_v2_vo;
        if (obj.icon_set) {
          delete obj.icon_set.icons;
          delete obj.icon_set.top_personal_icons;
        }
      } catch (e) {}
      $done({ body: JSON.stringify(obj) });
      return;
    }

    // 4) /api/oak/integration/render
    if (/api\/oak\/integration\/render/.test(url)) {
      try {
        delete obj.bottom_section_list;
        if (obj.ui) {
          delete obj.ui.bottom_section;
          if (obj.ui.live_section) {
            delete obj.ui.live_section.float_info;
          }
        }
      } catch (e) {}
      $done({ body: JSON.stringify(obj) });
      return;
    }

    // 5) /api/caterham/v3/query/order_detail_group
    if (/caterham\/v3\/query\/order_detail_group/.test(url)) {
      try {
        if (obj.data && obj.data.goods_list !== undefined) {
          delete obj.data.goods_list;
        }
      } catch (e) {}
      $done({ body: JSON.stringify(obj) });
      return;
    }

    // 如果 URL 未匹配上任一处理分支，直接返回原始响应
    $done({ body: JSON.stringify(obj) });
  } catch (err) {
    // 出错则返回原始响应（尽量保证不破坏应用）
    $done({});
  }
})();
