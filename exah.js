var fs = require('fs');
var cson = require('cursive');
var irc = require('irc');
var exec = require('child_process').exec;

var template = fs.readFileSync('./template.hx', {encoding: 'utf8'});
var config = cson.parse(fs.readFileSync('./config.cson', {encoding: 'utf8'}));

var client = new irc.Client(config.server, config.nick, {
    port: config.port,
    secure: config.secure,
    autoRejoin: config.autoRejoin,
    autoConnect: config.autoConnect,
    channels: config.channels
});

if (!config.autoConnect)
    client.connect();

client.addListener('error', function(info) {
    console.log('error:', info);
});

client.addListener('message#', function (from, to, message) {
    if (checkCallMe(message)) {
        code = message.substr(client.nick.length + 1);
        runHaxe(code, to);
    }
});

function checkCallMe(message) {
    var length = client.nick.length;
    return message.substr(0, length) === client.nick &&
           / |,|:/.test(message.charAt(length));
}

function runHaxe(code, to) {
    fs.writeFileSync('Exah.hx',
        template.replace('/* code here */', code));
    exec('haxe --interp -main Exah',
        {
            encoding: 'utf8',
            timeout: 1000,
            maxBuffer: 200,
            killSignal: 'SIGTERM',
            cwd: process.cwd(),
            env: null
        },
        function (error, stdout, stderr) {
            client.say(to,
                stderr === '' ?
                stdout.split(/\n|\r\n/).slice(0, 3).join('\n') :
                stderr);
            if (error && error.killed)
                client.say(to, 'timeout');
        }
    );
}
