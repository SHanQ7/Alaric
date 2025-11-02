#!name = 拼多多净化页面布局
#!author = 怎么肥事 walala
#!update = 2025-09-13
#!版本号：7.55.0

//pdd
# === IP-CIDR 规则 ===
IP-CIDR, 36.152.46.3/32, REJECT
IP-CIDR, 36.152.46.13/32, REJECT
IP-CIDR, 36.152.46.15/32, REJECT
IP-CIDR, 49.235.102.190/32, REJECT
IP-CIDR, 81.69.104.17/32, REJECT
IP-CIDR, 81.69.116.33/32, REJECT
IP-CIDR, 81.69.130.131/32, REJECT
IP-CIDR, 101.35.204.35/32, REJECT
IP-CIDR, 101.35.212.35/32, REJECT
IP-CIDR, 114.110.96.1/32, REJECT
IP-CIDR, 114.110.96.6/32, REJECT
IP-CIDR, 114.110.96.26/32, REJECT
IP-CIDR, 114.110.97.30/32, REJECT
IP-CIDR, 114.110.97.97/32, REJECT
IP-CIDR, 114.110.98.2/32, REJECT
IP-CIDR, 114.110.98.3/32, REJECT
IP-CIDR, 117.185.242.18/32, REJECT
IP-CIDR, 117.185.242.187/32, REJECT
IP-CIDR, 117.185.244.145/32, REJECT
IP-CIDR, 121.5.84.85/32, REJECT
IP-CIDR, 183.194.214.14/32, REJECT
IP-CIDR, 183.194.214.20/32, REJECT
IP-CIDR, 183.194.214.21/32, REJECT

# === DOMAIN 规则 ===
DOMAIN, apm-a.pinduoduo.com, REJECT
DOMAIN, apm.pinduoduo.com, REJECT
DOMAIN, cd-1.pddpic.com, REJECT
DOMAIN, cdl-1.pddpic.com, REJECT
DOMAIN, cdl-p2.pddpic.com, REJECT
DOMAIN, file.pinduoduo.com, REJECT
DOMAIN, m.pinduoduo.net, REJECT
DOMAIN, meta.pinduoduo.com, REJECT
DOMAIN, sdk.1rtb.net, REJECT
DOMAIN, ta-a.pinduoduo.com, REJECT
DOMAIN, ta.pinduoduo.com, REJECT
DOMAIN, th-a.pinduoduo.com, REJECT
DOMAIN, th-b.pinduoduo.com, REJECT
DOMAIN, th.pinduoduo.com, REJECT
DOMAIN, titan.pinduoduo.com, REJECT
DOMAIN, xg.pinduoduo.com, REJECT

^https:\/\/api\.pinduoduo\.com\/api\/alexa\/goods\/back_up url reject-dict
^https:\/\/api\.pinduoduo\.com\/api\/alexa\/homepage\/hub url jsonjq-response-body 'del(.result.icon_set, .result.search_bar_hot_query, .result.dy_module.irregular_banner_dy, .result.dy_module.recommend_fresh_info) | if .result.bottom_tabs then .result.bottom_tabs |= map(select(.link == "index.html" or .link == "chat_list.html" or .link == "personal.html")) else . end'
^https:\/\/api\.pinduoduo\.com\/api\/aquarius\/hungary\/global\/homepage\? url reject-dict
^https:\/\/api\.pinduoduo\.com\/api\/aristotle\/query_order_list_tabs_element url reject-dict
^https:\/\/api\.pinduoduo\.com\/api\/aristotle\/unrated_order_for_unreceived_tab url reject-dict
^https:\/\/api\.pinduoduo\.com\/api\/brand-olay\/goods_detail\/bybt_guide url reject-dict
^https:\/\/api\.pinduoduo\.com\/api\/caterham\/v3\/query\/likes url reject-dict
^https:\/\/api\.pinduoduo\.com\/api\/caterham\/v3\/query\/my_order_group url reject-dict
^https:\/\/api\.pinduoduo\.com\/api\/caterham\/v3\/query\/new_chat_group url reject-dict
^https:\/\/api\.pinduoduo\.com\/api\/caterham\/v3\/query\/order_detail_group url jsonjq-response-body 'del(.data.goods_list)'
^https:\/\/api\.pinduoduo\.com\/api\/caterham\/v3\/query\/order_express_group url reject-dict
^https:\/\/api\.pinduoduo\.com\/api\/caterham\/v3\/query\/personal url reject-dict
^https:\/\/api\.pinduoduo\.com\/api\/dunkirk\/liveactivity\/push\/create\/url\/report url reject-dict
^https:\/\/api\.pinduoduo\.com\/api\/engels\/reviews\/require\/append url reject-dict
^https:\/\/api\.pinduoduo\.com\/api\/engels\/wait\/receive\/review url reject-dict
^https:\/\/api\.pinduoduo\.com\/api\/growth\/nagato\/app\/index\/gather url reject-dict
^https:\/\/api\.pinduoduo\.com\/api\/manufacturer\/cross\/shortcut\/list url reject-dict
^https:\/\/api\.pinduoduo\.com\/api\/oak\/integration\/render url jsonjq-response-body 'del(.bottom_section_list, .ui.bottom_section, .ui.live_section.float_info)'
^https:\/\/api\.pinduoduo\.com\/api\/philo\/personal\/hub url jsonjq-response-body 'del(.monthly_card_entrance, .personal_center_style_v2_vo, .icon_set.icons, .icon_set.top_personal_icons)'
^https:\/\/api\.pinduoduo\.com\/api\/phantom\/gbdbpdv\/extra url reject-dict
^https:\/\/api\.pinduoduo\.com\/api\/zaire_biz\/chat\/resource\/get_list_data url reject-dict
^https:\/\/api\.pinduoduo\.com\/search url jsonjq-response-body 'del(.expansion)'
^https:\/\/api\.pinduoduo\.com\/search_hotquery url reject-dict

hostname = api.pinduoduo.com
