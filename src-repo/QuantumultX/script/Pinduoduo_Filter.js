const url = $request.url;
const ua = $request.headers['User-Agent'] || $request.headers['user-agent'];

if (ua && ua.includes("com.xunmeng.pinduoduo")) {
    const ipDirectRegex = /^http:\/\/(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}|\[[0-9a-fA-F:]+\])\/d(\d)?/;
    
    if (ipDirectRegex.test(url)) {
        console.log("🚫 拦截拼多多 IP 直连: " + url);
        $done({ policy: "REJECT" });
    } else {
        $done({});
    }
} else {
    $done({});
}
