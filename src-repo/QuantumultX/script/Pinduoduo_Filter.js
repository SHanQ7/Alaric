const ua = $request.headers['User-Agent'] || $request.headers['user-agent'];
if (ua && ua.indexOf('com.xunmeng.pinduoduo') !== -1) {
    $done({ response: { status: 403, body: "" } });
} else {
    $done({});
}
