const url = $request.url;
const ua = $request.headers['User-Agent'] || $request.headers['user-agent'] || "";

const isPdd = ua.includes("com.xunmeng.pinduoduo");

const ipv4Regex = /^http:\/\/((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\/d(\d)?/;
const ipv6Regex = /^http:\/\/\[[0-9a-fA-F:]+\]\/d(\d)?\?/;

if (isPdd && (ipv4Regex.test(url) || ipv6Regex.test(url))) {
    console.log("拦截拼多多 IP 直连请求: " + url);
    $done({ cancel: true });
} else {
    $done({});
}
