const url = $request.url;
const ua = $request.headers['User-Agent'] || $request.headers['user-agent'] || "";
const isPdd = ua.includes("com.xunmeng.pinduoduo");

if (typeof $response === "undefined") {
    const ipv4Regex = /^http:\/\/((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\/d(\d)?/;
    const ipv6Regex = /^http:\/\/\[[0-9a-fA-F:]+\]\/d(\d)?\?/;

    if (isPdd && (ipv4Regex.test(url) || ipv6Regex.test(url))) {
        console.log("拦截拼多多 IP 直连请求: " + url);
        $done({ cancel: true });
    } else {
        $done({});
    }
} 

else {
    if (!$response.body || !isPdd) {
        $done({});
    } else {
        try {
            let obj = JSON.parse($response.body);
            if (url.includes("/api/alexa/homepage/hub")) {
                if (obj.result) {
                    delete obj.result.dy_module;
                    delete obj.result.icon_set;
                    delete obj.result.search_bar_hot_query;
                    const filterTabs = (tabs) => tabs ? tabs.filter(i => ["index.html", "chat_list.html", "personal.html"].includes(i.link)) : tabs;
                    obj.result.bottom_tabs = filterTabs(obj.result.bottom_tabs);
                    obj.result.buffer_bottom_tabs = filterTabs(obj.result.buffer_bottom_tabs);
                    if (obj.result.all_top_opts) {
                        obj.result.all_top_opts.forEach(opt => { delete opt.selected_image; delete opt.image; });
                    }
                }
            }
            else if (url.includes("/search")) {
                delete obj.expansion;
            }
            else if (url.includes("/api/philo/personal/hub")) {
                delete obj.monthly_card_entrance;
                delete obj.personal_center_style_v2_vo;
                if (obj.icon_set) { delete obj.icon_set.icons; delete obj.icon_set.top_personal_icons; }
            }
            else if (url.includes("/api/oak/integration/render")) {
                delete obj.bottom_section_list;
                if (obj.ui) {
                    delete obj.ui.bottom_section;
                    if (obj.ui.live_section) delete obj.ui.live_section.float_info;
                }
            }
            else if (url.includes("/api/caterham/v3/query/order_detail_group")) {
                if (obj.data) delete obj.data.goods_list;
            }
            else if (url.includes("/order/")) {
                delete obj.marketing_banner_vo;
                if (obj.shipping) delete obj.shipping.banner_above_recommend;
            }
            else if (url.includes("/api/aristotle/order_list_v4")) {
                if (obj.orders) {
                    obj.orders.forEach(o => { if (o.order_buttons) o.order_buttons.forEach(b => delete b.order_growth_tip); });
                }
            }

            $done({ body: JSON.stringify(obj) });
        } catch (e) {
            $done({});
        }
    }
}
