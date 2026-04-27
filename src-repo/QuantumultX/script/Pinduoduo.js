let body = JSON.parse($response.body);
let url = $request.url;

if (url.includes("alexa/homepage/hub")) {
    let p = '.result.bottom_tabs? |= map(select(.link | IN("index.html", "chat_list.html", "personal.html"))) | ' +
            '.result.buffer_bottom_tabs? |= map(select(.link | IN("index.html", "chat_list.html", "personal.html"))) | ' +
            '.result.all_top_opts |= map(del(.selected_image, .image, .height, .width)) | ' +
            'del(.result.dy_module.irregular_banner_dy, .result.icon_set, .result.search_bar_hot_query)';
    body = $jqlang.query(body, p);
}

if (url.includes("/search?")) {
    body = $jqlang.query(body, 'del(.expansion)');
}

if (url.includes("philo/personal/hub")) {
    body = $jqlang.query(body, 'del(.monthly_card_entrance, .personal_center_style_v2_vo, .icon_set.icons, .icon_set.top_personal_icons)');
}

if (url.includes("oak/integration/render")) {
    body = $jqlang.query(body, 'del(.bottom_section_list, .ui.bottom_section, .ui.live_section.float_info)');
}

if (url.includes("query/order_detail_group")) {
    body = $jqlang.query(body, 'del(.data.goods_list)');
}

if (url.includes("/order/")) {
    body = $jqlang.query(body, 'del(.marketing_banner_vo, .shipping.banner_above_recommend)');
}

if (url.includes("aristotle/order_list_v4")) {
    body = $jqlang.query(body, '.orders |= map(.order_buttons |= map(del(.order_growth_tip)))');
}

$done({ body: JSON.stringify(body) });
