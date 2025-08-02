"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.link = void 0;
/* eslint-disable no-await-in-loop */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable no-sequences */
var child_process_1 = require("child_process");
// import crypto from 'crypto';
var crypto = require("crypto");
var fs_1 = require("fs");
// import net from 'net';
var net = require("net");
// import os, { cpus } from 'os';
var os = require("os");
var cpus = os.cpus();
var promises_1 = require("readline/promises");
var supports_hyperlinks_1 = require("supports-hyperlinks");
var mongodb_1 = require("mongodb");
var isSupported = supports_hyperlinks_1.default.stdout;
var OSC = '\u001B]';
var BEL = '\u0007';
var SEP = ';';
exports.link = isSupported ? function (text, url) { return [
    OSC, '8', SEP, SEP, url, BEL, text, OSC, '8', SEP, SEP, BEL,
].join(''); } : function (text, url) { return "".concat(text, " < ").concat(url, " > "); };
var freemem = os.freemem();
var smallMemory = (freemem < 1024 * 1024 * 1024);
var nixInstall = function () {
    var packages = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        packages[_i] = arguments[_i];
    }
    return (smallMemory
        ? packages.map(function (t) { return "nix-env -iA ".concat(t.includes('.') ? t : "nixpkgs.".concat(t)); }).join(' && ')
        : "nix-env -iA ".concat(packages.map(function (t) { return (t.includes('.') ? t : "nixpkgs.".concat(t)); }).join(' ')));
};
var warnings = [];
var exec = function (command, args) {
    try {
        return {
            output: (0, child_process_1.execSync)(command, args).toString(),
            code: 0,
        };
    }
    catch (e) {
        return {
            code: e.status,
            message: e.message,
        };
    }
};
var sleep = function (t) { return new Promise(function (r) { setTimeout(r, t); }); };
var shmFAQ = 'https://docs.hydro.ac/FAQ/#%E8%B0%83%E6%95%B4%E4%B8%B4%E6%97%B6%E7%9B%AE%E5%BD%95%E5%A4%A7%E5%B0%8F';
var locales = {
    zh: {
        'install.wait': '安装脚本将等待 %d 秒后自动继续安装，或按 Ctrl-C 退出。',
        'install.start': '开始运行 Hydro 安装工具',
        'note.avx': "\u68C0\u6D4B\u5230\u60A8\u7684 CPU \u4E0D\u652F\u6301 avx \u6307\u4EE4\u96C6\uFF0C\u8FD9\u53EF\u80FD\u4F1A\u5F71\u54CD\u7CFB\u7EDF\u8FD0\u884C\u901F\u5EA6\u3002\n\u5982\u679C\u60A8\u6B63\u5728\u4F7F\u7528 PVE/VirtualBox \u7B49\u865A\u62DF\u673A\u5E73\u53F0\uFF0C\u8BF7\u5C1D\u8BD5\u5173\u673A\u540E\u5C06\u865A\u62DF\u673A\u7684 CPU \u7C7B\u578B\u8BBE\u7F6E\u4E3A Host\uFF0C\u91CD\u542F\u540E\u518D\u6B21\u8FD0\u884C\u8BE5\u811A\u672C\u3002",
        'warn.avx': '检测到您的 CPU 不支持 avx 指令集，将使用 mongodb@v4.4',
        'error.rootRequired': '请先使用 sudo su 切换到 root 用户后再运行该工具。',
        'error.unsupportedArch': '不支持的架构 %s ,请尝试手动安装。',
        'error.osreleaseNotFound': '无法获取系统版本信息（/etc/os-release 文件未找到），请尝试手动安装。',
        'error.unsupportedOS': '不支持的操作系统 %s ，请尝试手动安装，',
        'error.centos': 'CentOS 及其变种系统因系统内核过低，无法安装 Hydro，强烈建议使用其他系统。若确有需求，请升级 Linux 内核至 4.4+ 后再手动安装 Hydro。',
        'install.preparing': '正在初始化安装...',
        'install.mongodb': '正在安装 mongodb...',
        'install.createDatabaseUser': '正在创建数据库用户...',
        'install.compiler': '正在安装编译器...',
        'install.hydro': '正在安装 Hydro...',
        'install.done': 'Hydro 安装成功！',
        'install.alldone': '安装已全部完成。',
        'install.editJudgeConfigAndStart': '请编辑 ~/.hydro/judge.yaml 后使用 pm2 start hydrojudge && pm2 save 启动。',
        'extra.dbUser': '数据库用户名： hydro',
        'extra.dbPassword': '数据库密码： %s',
        'port.80': '端口 80 已被占用，Caddy 无法正常监听此端口。',
        'shm.readFail': '读取 /dev/shm 大小失败。请检查系统是否在此挂载了 tmpfs。',
        'shm.sizeTooSmall': "\u60A8\u7684\u7CFB\u7EDF /dev/shm \u5927\u5C0F\u4E3A %d MB\uFF0C\u5728\u9AD8\u5E76\u53D1\u8BC4\u6D4B\u65F6\u53EF\u80FD\u4EA7\u751F\u95EE\u9898\u3002\n\u5EFA\u8BAE\u53C2\u7167\u6587\u6863 ".concat((0, exports.link)('FAQS', shmFAQ), " \u8FDB\u884C\u8C03\u6574\u3002"),
        'info.skip': '步骤已跳过。',
        'error.bt': "\u68C0\u6D4B\u5230\u5B9D\u5854\u9762\u677F\uFF0C\u5B89\u88C5\u811A\u672C\u5F88\u53EF\u80FD\u65E0\u6CD5\u6B63\u5E38\u5DE5\u4F5C\u3002\u5EFA\u8BAE\u60A8\u4F7F\u7528\u7EAF\u51C0\u7684 Debian 12 \u7CFB\u7EDF\u8FDB\u884C\u5B89\u88C5\u3002\n\u8981\u5FFD\u7565\u8BE5\u8B66\u544A\uFF0C\u8BF7\u4F7F\u7528 --shamefully-unsafe-bt-panel \u53C2\u6570\u91CD\u65B0\u8FD0\u884C\u6B64\u811A\u672C\u3002",
        'warn.bt': "\u68C0\u6D4B\u5230\u5B9D\u5854\u9762\u677F\uFF0C\u8FD9\u4F1A\u5BF9\u7CFB\u7EDF\u5B89\u5168\u6027\u4E0E\u7A33\u5B9A\u6027\u9020\u6210\u5F71\u54CD\u3002\u5EFA\u8BAE\u4F7F\u7528\u7EAF\u51C0 Debian 12 \u7CFB\u7EDF\u8FDB\u884C\u5B89\u88C5\u3002\n\u5F00\u53D1\u8005\u5BF9\u56E0\u4E3A\u4F7F\u7528\u5B9D\u5854\u9762\u677F\u7684\u6570\u636E\u4E22\u5931\u4E0D\u627F\u62C5\u4EFB\u4F55\u8D23\u4EFB\u3002\n\u8981\u53D6\u6D88\u5B89\u88C5\uFF0C\u8BF7\u4F7F\u7528 Ctrl-C \u9000\u51FA\u3002\u5B89\u88C5\u7A0B\u5E8F\u5C06\u5728\u4E94\u79D2\u540E\u7EE7\u7EED\u3002",
        'migrate.hustojFound': "\u68C0\u6D4B\u5230 HustOJ\u3002\u5B89\u88C5\u7A0B\u5E8F\u53EF\u4EE5\u5C06 HustOJ \u4E2D\u7684\u5168\u90E8\u6570\u636E\u5BFC\u5165\u5230 Hydro\u3002\uFF08\u539F\u6709\u6570\u636E\u4E0D\u4F1A\u4E22\u5931\uFF0C\u60A8\u53EF\u968F\u65F6\u5207\u6362\u56DE HustOJ\uFF09\n\u8BE5\u529F\u80FD\u652F\u6301\u539F\u7248 HustOJ \u548C\u90E8\u5206\u4FEE\u6539\u7248\uFF0C\u8F93\u5165 y \u786E\u8BA4\u8BE5\u64CD\u4F5C\u3002\n\u8FC1\u79FB\u8FC7\u7A0B\u6709\u4EFB\u4F55\u95EE\u9898\uFF0C\u6B22\u8FCE\u52A0QQ\u7FA4 1085853538 \u54A8\u8BE2\u7BA1\u7406\u5458\u3002",
        'install.restartRequired': '安装完成，请使用 sudo reboot 重启系统。在此之前系统的部分功能可能无法正常使用。',
        'install.warnings': '安装过程中产生了以下警告：',
    },
    en: {
        'install.wait': "The installation script will wait for %d seconds before continuing.\nPress Ctrl-C to exit.",
        'install.start': 'Starting Hydro installation tool',
        'note.avx': "Your CPU does not support avx, this may affect system performance.\nIf you are using a virtual machine platform such as PVE/VirtualBox,\ntry shutting down and setting the CPU type of the virtual machine to Host,\nthen restart and run the script again.",
        'warn.avx': 'Your CPU does not support avx, will use mongodb@v4.4',
        'error.rootRequired': 'Please run this tool as root user.',
        'error.unsupportedArch': 'Unsupported architecture %s, please try to install manually.',
        'error.osreleaseNotFound': 'Unable to get system version information (/etc/os-release file not found), please try to install manually.',
        'error.unsupportedOS': 'Unsupported operating system %s, please try to install manually.',
        'error.centos': "CentOS and its derivatives are not supported due to low system kernel versions.\nIt is strongly recommended to use other systems. If you really need it, please upgrade the Linux kernel to 4.4+ and manually install Hydro.",
        'install.preparing': 'Initializing installation...',
        'install.mongodb': 'Installing mongodb...',
        'install.createDatabaseUser': 'Creating database user...',
        'install.compiler': 'Installing compiler...',
        'install.hydro': 'Installing Hydro...',
        'install.done': 'Hydro installation completed!',
        'install.alldone': 'Hydro installation completed.',
        'install.editJudgeConfigAndStart': 'Please edit config at ~/.hydro/judge.yaml than start hydrojudge with:\npm2 start hydrojudge && pm2 save.',
        'extra.dbUser': 'Database username: hydro',
        'extra.dbPassword': 'Database password: %s',
        'port.80': 'Port 80 is already in use, Caddy cannot listen to this port.',
        'shm.readFail': 'Failed to read /dev/shm size.',
        'shm.sizeTooSmall': "Your system /dev/shm size is %d MB, which may cause problems in high concurrency testing.\nPlease refer to ".concat((0, exports.link)('FAQS', shmFAQ), " for adjustments."),
        'info.skip': 'Step skipped.',
        'error.bt': "BT-Panel detected, this script may not work properly. It is recommended to use a clean Debian 12 OS.\nTo ignore this warning, please run this script again with '--shamefully-unsafe-bt-panel' flag.",
        'warn.bt': "BT-Panel detected, this will affect system security and stability. It is recommended to use a clean Debian 12 OS.\nThe developer is not responsible for any data loss caused by using BT-Panel.\nTo cancel the installation, please use Ctrl-C to exit. The installation program will continue in five seconds.",
        'migrate.hustojFound': "HustOJ detected. The installation program can migrate all data from HustOJ to Hydro.\nThe original data will not be lost, and you can switch back to HustOJ at any time.\nThis feature supports the original version of HustOJ and some modified versions. Enter y to confirm this operation.\nIf you have any questions about the migration process, please add QQ group 1085853538 to consult the administrator.",
        'install.restartRequired': 'Please reboot the system. Some functions may not work properly before the restart.',
        'install.warnings': 'The following warnings occurred during the installation:',
    },
};
var installAsJudge = process.argv.includes('--judge');
var noCaddy = process.argv.includes('--no-caddy');
var exposeDb = process.argv.includes('--expose-db');
var addons = ['@hydrooj/ui-default', '@hydrooj/hydrojudge', '@hydrooj/fps-importer', '@hydrooj/a11y'];
var installTarget = installAsJudge ? '@hydrooj/hydrojudge' : "hydrooj ".concat(addons.join(' '));
var substitutersArg = process.argv.find(function (i) { return i.startsWith('--substituters='); });
var substituters = substitutersArg ? substitutersArg.split('=')[1].split(',') : [];
var migrationArg = process.argv.find(function (i) { return i.startsWith('--migration='); });
var migration = migrationArg ? migrationArg.split('=')[1] : '';
var needRestart = false;
var locale = (((_a = process.env.LANG) === null || _a === void 0 ? void 0 : _a.includes('zh')) || ((_b = process.env.LOCALE) === null || _b === void 0 ? void 0 : _b.includes('zh'))) ? 'zh' : 'en';
if (process.env.TERM === 'linux')
    locale = 'en';
var processLog = function (orig) { return function (str) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    return (orig.apply(void 0, __spreadArray([locales[locale][str] || str], args, false)), 0);
}; };
var log = {
    info: processLog(console.log),
    warn: processLog(console.warn),
    fatal: function (str) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return (processLog(console.error).apply(void 0, __spreadArray([str], args, false)), process.exit(1));
    },
};
if (!process.getuid)
    log.fatal('error.unsupportedOs');
// else if (process.getuid() !== 0)
//     log.fatal('error.rootRequired');
if (!['x64', 'arm64'].includes(process.arch))
    log.fatal('error.unsupportedArch', process.arch);
if (!process.env.HOME)
    log.fatal('$HOME not found');
if (!(0, fs_1.existsSync)('/etc/os-release'))
    log.fatal('error.osreleaseNotFound');
var osinfoFile = (0, fs_1.readFileSync)('/etc/os-release', 'utf-8');
var lines = osinfoFile.split('\n');
var values = {};
for (var _i = 0, lines_1 = lines; _i < lines_1.length; _i++) {
    var line = lines_1[_i];
    if (!line.trim())
        continue;
    var d = line.split('=');
    if (d[1].startsWith('"'))
        values[d[0].toLowerCase()] = d[1].substring(1, d[1].length - 2);
    else
        values[d[0].toLowerCase()] = d[1];
}
var avx = true;
var cpuInfoFile = (0, fs_1.readFileSync)('/proc/cpuinfo', 'utf-8');
if (!cpuInfoFile.includes('avx') && !installAsJudge) {
    avx = false;
    log.warn('warn.avx');
    warnings.push(['warn.avx']);
}
var retry = 0;
log.info('install.start');
var password = crypto.randomBytes(32).toString('hex');
// eslint-disable-next-line
var CN = true;
var nixProfile = "".concat(process.env.HOME, "/.nix-profile/");
var entry = function (source, target, ro) {
    if (target === void 0) { target = source; }
    if (ro === void 0) { ro = true; }
    return "  - type: bind\n    source: ".concat(source, "\n    target: ").concat(target).concat(ro ? '\n    readonly: true' : '');
};
var mount = "mount:\n".concat(entry("".concat(nixProfile, "bin"), '/bin'), "\n").concat(entry("".concat(nixProfile, "bin"), '/usr/bin'), "\n").concat(entry("".concat(nixProfile, "lib"), '/lib'), "\n").concat(entry("".concat(nixProfile, "share"), '/share'), "\n").concat(entry("".concat(nixProfile, "etc"), '/etc'), "\n").concat(entry('/nix', '/nix'), "\n").concat(entry('/dev/null', '/dev/null', false), "\n").concat(entry('/dev/urandom', '/dev/urandom', false), "\n  - type: tmpfs\n    target: /w\n    data: size=512m,nr_inodes=8k\n  - type: tmpfs\n    target: /tmp\n    data: size=512m,nr_inodes=8k\nproc: true\nworkDir: /w\nhostName: executor_server\ndomainName: executor_server\nuid: 1536\ngid: 1536\n");
var Caddyfile = "# \u5982\u679C\u4F60\u5E0C\u671B\u4F7F\u7528\u5176\u4ED6\u7AEF\u53E3\u6216\u4F7F\u7528\u57DF\u540D\uFF0C\u4FEE\u6539\u6B64\u5904 :80 \u7684\u503C\u540E\u5728 ~/.hydro \u76EE\u5F55\u4E0B\u4F7F\u7528 caddy reload \u91CD\u8F7D\u914D\u7F6E\u3002\n# \u5982\u679C\u4F60\u5728\u5F53\u524D\u914D\u7F6E\u4E0B\u80FD\u591F\u901A\u8FC7 http://\u4F60\u7684\u57DF\u540D/ \u6B63\u5E38\u8BBF\u95EE\u5230\u7F51\u7AD9\uFF0C\u82E5\u9700\u5F00\u542F ssl\uFF0C\n# \u4EC5\u9700\u5C06 :80 \u6539\u4E3A\u4F60\u7684\u57DF\u540D\uFF08\u5982 hydro.ac\uFF09\u540E\u4F7F\u7528 caddy reload \u91CD\u8F7D\u914D\u7F6E\u5373\u53EF\u81EA\u52A8\u7B7E\u53D1 ssl \u8BC1\u4E66\u3002\n# \u586B\u5199\u5B8C\u6574\u57DF\u540D\uFF0C\u6CE8\u610F\u533A\u5206\u6709\u65E0 www \uFF08www.hydro.ac \u548C hydro.ac \u4E0D\u540C\uFF0C\u8BF7\u68C0\u67E5 DNS \u8BBE\u7F6E\uFF09\n# \u8BF7\u6CE8\u610F\u5728\u9632\u706B\u5899/\u5B89\u5168\u7EC4\u4E2D\u653E\u884C\u7AEF\u53E3\uFF0C\u4E14\u90E8\u5206\u8FD0\u8425\u5546\u4F1A\u62E6\u622A\u672A\u7ECF\u5907\u6848\u7684\u57DF\u540D\u3002\n# \u5176\u4ED6\u9700\u6C42\u6E05\u53C2\u7167 https://caddyserver.com/docs/ \u8BF4\u660E\u8FDB\u884C\u8BBE\u7F6E\u3002\n# For more information, refer to caddy v2 documentation.\n:80 {\n  encode zstd gzip\n  log {\n    output file /data/access.log {\n      roll_size 1gb\n      roll_keep_for 72h\n    }\n    format json\n  }\n  # Handle static files directly, for better performance.\n  root * /root/.hydro/static\n  @static {\n    file {\n      try_files {path}\n    }\n  }\n  handle @static {\n    file_server\n  }\n  handle {\n    reverse_proxy http://127.0.0.1:8888\n  }\n}\n\n# \u5982\u679C\u4F60\u9700\u8981\u540C\u65F6\u914D\u7F6E\u5176\u4ED6\u7AD9\u70B9\uFF0C\u53EF\u53C2\u8003\u4E0B\u65B9\u8BBE\u7F6E\uFF1A\n# \u8BF7\u6CE8\u610F\uFF1A\u5982\u679C\u591A\u4E2A\u7AD9\u70B9\u9700\u8981\u5171\u4EAB\u540C\u4E00\u4E2A\u7AEF\u53E3\uFF08\u5982 80/443\uFF09\uFF0C\u8BF7\u786E\u4FDD\u4E3A\u6BCF\u4E2A\u7AD9\u70B9\u90FD\u586B\u5199\u4E86\u57DF\u540D\uFF01\n# \u52A8\u6001\u7AD9\u70B9\uFF1A\n# xxx.com {\n#    reverse_proxy http://127.0.0.1:1234\n# }\n# \u9759\u6001\u7AD9\u70B9\uFF1A\n# xxx.com {\n#    root * /www/xxx.com\n#    file_server\n# }\n";
var judgeYaml = "hosts:\n  local:\n    host: localhost\n    type: hydro\n    server_url: https://hydro.ac/\n    uname: judge\n    password: examplepassword\n    detail: true\n    concurrency: 2\ntmpfs_size: 512m\nstdio_size: 256m\nmemoryMax: ".concat(Math.min(1024, os.totalmem() / 4), "m\nprocessLimit: 128\ntestcases_max: 120\ntotal_time_limit: 600\nretry_delay_sec: 3\nparallelism: ").concat(Math.max(1, Math.floor(os.cpus().length / 4)), "\nsingleTaskParallelism: 2\nrate: 1.00\nrerun: 2\nsecret: ").concat(crypto.randomBytes(32).toString('hex'), "\nenv: |\n    PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin\n    HOME=/w\n");
var nixConfBase = "\ntrusted-public-keys = cache.nixos.org-1:6NCHdD59X431o0gWypbMrAURkbJ16ZPMQFGspcDShjY= hydro.ac:EytfvyReWHFwhY9MCGimCIn46KQNfmv9y8E2NqlNfxQ=\nconnect-timeout = 10\nexperimental-features = nix-command flakes\n";
var isPortFree = function (port) { return __awaiter(void 0, void 0, void 0, function () {
    var server, res;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                server = net.createServer();
                return [4 /*yield*/, new Promise(function (resolve) {
                        server.once('error', function () { return resolve(false); });
                        server.once('listening', function () { return resolve(true); });
                        server.listen(port);
                    })];
            case 1:
                res = _a.sent();
                server.close();
                return [2 /*return*/, res];
        }
    });
}); };
function removeOptionalEsbuildDeps() {
    var _a;
    var yarnGlobalPath = ((_a = exec('yarn global dir').output) === null || _a === void 0 ? void 0 : _a.trim()) || '';
    if (!yarnGlobalPath)
        return false;
    var pkgjson = "".concat(yarnGlobalPath, "/package.json");
    var data = (0, fs_1.existsSync)(pkgjson) ? require(pkgjson) : {};
    data.resolutions || (data.resolutions = {});
    Object.assign(data.resolutions, Object.fromEntries(__spreadArray(__spreadArray(__spreadArray([
        '@esbuild/linux-loong64',
        'esbuild-windows-32'
    ], ['android', 'darwin', 'freebsd', 'windows']
        .flatMap(function (i) { return ["".concat(i, "-64"), "".concat(i, "-arm64")]; })
        .map(function (i) { return "esbuild-".concat(i); }), true), ['32', 'arm', 'mips64', 'ppc64', 'riscv64', 's390x']
        .map(function (i) { return "esbuild-linux-".concat(i); }), true), ['netbsd', 'openbsd', 'sunos']
        .map(function (i) { return "esbuild-".concat(i, "-64"); }), true).map(function (i) { return [i, 'link:/dev/null']; })));
    exec("mkdir -p ".concat(yarnGlobalPath));
    (0, fs_1.writeFileSync)(pkgjson, JSON.stringify(data, null, 2));
    return true;
}
function rollbackResolveField() {
    var _a;
    var yarnGlobalPath = ((_a = exec('yarn global dir').output) === null || _a === void 0 ? void 0 : _a.trim()) || '';
    if (!yarnGlobalPath)
        return false;
    var pkgjson = "".concat(yarnGlobalPath, "/package.json");
    var data = JSON.parse((0, fs_1.readFileSync)(pkgjson, 'utf-8'));
    delete data.resolutions;
    (0, fs_1.writeFileSync)(pkgjson, JSON.stringify(data, null, 2));
    return true;
}
var mem = os.totalmem() / 1024 / 1024 / 1024; // In GiB
// TODO: refuse to install if mem < 1.5
var wtsize = Math.max(0.25, Math.floor((mem / 6) * 100) / 100);
var inviteLink = 'https://qm.qq.com/cgi-bin/qm/qr?k=0aTZfDKURRhPBZVpTYBohYG6P6sxABTw';
var printInfo = [
    function () { return console.log("\u626B\u7801\u6216\u70B9\u51FB".concat((0, exports.link)('链接', inviteLink), "\u52A0\u5165QQ\u7FA4\uFF1A")); },
    "echo '".concat(inviteLink, "' | qrencode -o - -m 2 -t UTF8"),
    function () {
        if (installAsJudge)
            return;
        var config = require("".concat(process.env.HOME, "/.hydro/config.json"));
        if (config.uri)
            password = new URL(config.uri).password || '(No password)';
        else
            password = config.password || '(No password)';
        log.info('extra.dbUser');
        log.info('extra.dbPassword', password);
    },
];
var Steps = function () { return [
    {
        init: 'install.preparing',
        operations: [
            function () { return __awaiter(void 0, void 0, void 0, function () {
                var res;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (process.env.IGNORE_BT)
                                return [2 /*return*/];
                            res = exec('bt default');
                            if (!!res.code) return [3 /*break*/, 3];
                            if (!!process.argv.includes('--shamefully-unsafe-bt-panel')) return [3 /*break*/, 1];
                            log.warn('error.bt');
                            process.exit(1);
                            return [3 /*break*/, 3];
                        case 1:
                            log.warn('warn.bt');
                            warnings.push(['warn.bt']);
                            log.info('install.wait', 5);
                            return [4 /*yield*/, sleep(5000)];
                        case 2:
                            _a.sent();
                            _a.label = 3;
                        case 3: return [2 /*return*/];
                    }
                });
            }); },
            function () { return __awaiter(void 0, void 0, void 0, function () {
                var res;
                return __generator(this, function (_a) {
                    if (process.env.IGNORE_CENTOS)
                        return [2 /*return*/];
                    res = exec('yum -h');
                    if (res.code)
                        return [2 /*return*/];
                    if (!process.argv.includes('--unsupported-centos')) {
                        log.warn('error.centos');
                        process.exit(1);
                    }
                    else {
                        log.warn('warn.centos');
                        warnings.push(['warn.centos']);
                    }
                    return [2 /*return*/];
                });
            }); },
            function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!(!avx && !installAsJudge)) return [3 /*break*/, 2];
                            log.warn('note.avx');
                            log.info('install.wait', 60);
                            return [4 /*yield*/, sleep(60000)];
                        case 1:
                            _a.sent();
                            _a.label = 2;
                        case 2: return [2 /*return*/];
                    }
                });
            }); },
            function () { return __awaiter(void 0, void 0, void 0, function () {
                var shm, size;
                var _a;
                return __generator(this, function (_b) {
                    shm = (_a = exec('df --output=avail -k /dev/shm').output) === null || _a === void 0 ? void 0 : _a.split('\n')[1];
                    if (!shm || !+shm) {
                        log.warn('shm.readFail');
                        warnings.push(['shm.readFail']);
                        return [2 /*return*/];
                    }
                    size = (+shm) / 1024;
                    if (size < 250) {
                        log.warn('shm.sizeTooSmall', size);
                        warnings.push(['shm.sizeTooSmall', size]);
                    }
                    return [2 /*return*/];
                });
            }); },
            function () { return __awaiter(void 0, void 0, void 0, function () {
                var isRpi, memoryLine, memoryCgroupEnabled, targetFile, content;
                var _a;
                return __generator(this, function (_b) {
                    // Enable memory cgroup for Raspberry Pi
                    if (process.arch !== 'arm64')
                        return [2 /*return*/];
                    isRpi = ['rpi', 'raspberrypi'].some(function (i) { return (0, fs_1.readFileSync)('/proc/cpuinfo', 'utf-8').toLowerCase().includes(i); });
                    if (!isRpi)
                        return [2 /*return*/];
                    memoryLine = (_a = (0, fs_1.readFileSync)('/proc/cgroups', 'utf-8').split('\n').find(function (i) { return i.includes('memory'); })) === null || _a === void 0 ? void 0 : _a.trim();
                    memoryCgroupEnabled = memoryLine && !memoryLine.endsWith('0');
                    if (memoryCgroupEnabled)
                        return [2 /*return*/];
                    targetFile = '/boot/cmdline.txt';
                    content = (0, fs_1.readFileSync)(targetFile, 'utf-8');
                    if (content.includes('has moved to /boot/firmware/cmdline.txt'))
                        targetFile = '/boot/firmware/cmdline.txt';
                    content = (0, fs_1.readFileSync)(targetFile, 'utf-8');
                    if (content.includes('cgroup_enable=memory'))
                        return [2 /*return*/];
                    (0, fs_1.writeFileSync)(targetFile, content.replace(' console=', ' cgroup_enable=memory cgroup_memory=1 console='));
                    needRestart = true;
                    return [2 /*return*/];
                });
            }); },
            function () {
                if (substituters.length) {
                    (0, fs_1.writeFileSync)('/etc/nix/nix.conf', "substituters = ".concat(substituters.join(' '), "\n").concat(nixConfBase));
                }
                else if (!CN) {
                    (0, fs_1.writeFileSync)('/etc/nix/nix.conf', "substituters = https://cache.nixos.org/ https://nix.hydro.ac/cache\n".concat(nixConfBase));
                }
                if (CN)
                    return;
                // rollback mirrors
                exec('nix-channel --remove nixpkgs', { stdio: 'inherit' });
                exec('nix-channel --add https://nixos.org/channels/nixpkgs-unstable nixpkgs', { stdio: 'inherit' });
                exec('nix-channel --update', { stdio: 'inherit' });
            },
            nixInstall('pm2', 'yarn', 'esbuild', 'bash', 'unzip', 'zip', 'diffutils', 'patch', 'screen', 'gawk'),
            'yarn config set disable-self-update-check true',
            function () { return __awaiter(void 0, void 0, void 0, function () {
                var rl, res, docker, containers, uoj, res, e_1;
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            rl = (0, promises_1.createInterface)(process.stdin, process.stdout);
                            _b.label = 1;
                        case 1:
                            _b.trys.push([1, 6, 7, 8]);
                            if (!(0, fs_1.existsSync)('/home/judge/src')) return [3 /*break*/, 3];
                            log.info('migrate.hustojFound');
                            return [4 /*yield*/, rl.question('>')];
                        case 2:
                            res = _b.sent();
                            if (res.toLowerCase().trim() === 'y')
                                migration = 'hustoj';
                            _b.label = 3;
                        case 3:
                            if (migration)
                                return [2 /*return*/];
                            docker = !exec('docker -v').code;
                            if (!docker)
                                return [2 /*return*/];
                            containers = ((_a = exec('docker ps -a --format json').output) === null || _a === void 0 ? void 0 : _a.split('\n').map(function (i) { return i.trim(); }).filter(function (i) { return i; }).map(function (i) { return JSON.parse(i); })) || [];
                            uoj = containers.find(function (i) { return i.Image.toLowerCase() === 'universaloj/uoj-system' && i.State === 'running'; });
                            if (!uoj) return [3 /*break*/, 5];
                            log.info('migrate.uojFound');
                            return [4 /*yield*/, rl.question('>')];
                        case 4:
                            res = _b.sent();
                            if (res.toLowerCase().trim() === 'y')
                                migration = 'uoj';
                            _b.label = 5;
                        case 5: return [3 /*break*/, 8];
                        case 6:
                            e_1 = _b.sent();
                            console.error('Failed migration detection');
                            return [3 /*break*/, 8];
                        case 7:
                            rl.close();
                            return [7 /*endfinally*/];
                        case 8: return [2 /*return*/];
                    }
                });
            }); },
        ],
    },
    {
        init: 'install.mongodb',
        skip: function () { return installAsJudge; },
        hidden: installAsJudge,
        operations: [
            function () { return (0, fs_1.writeFileSync)("".concat(process.env.HOME, "/.config/nixpkgs/config.nix"), "{\n    permittedInsecurePackages = [\n        \"openssl-1.1.1t\"\n        \"openssl-1.1.1u\"\n        \"openssl-1.1.1v\"\n        \"openssl-1.1.1w\"\n        \"openssl-1.1.1x\"\n        \"openssl-1.1.1y\"\n        \"openssl-1.1.1z\"\n    ];\n}"); },
            nixInstall("hydro.mongodb".concat(avx ? 7 : 4).concat(CN ? '-cn' : ''), 'mongosh', 'mongodb-tools'),
        ],
    },
    {
        init: 'install.compiler',
        operations: [
            nixInstall('gcc', 'python3'),
        ],
    },
    {
        init: 'install.sandbox',
        skip: function () { return !exec('hydro-sandbox --help').code; },
        operations: [
            nixInstall('go-judge'),
            'ln -sf $(which go-judge) /usr/local/bin/hydro-sandbox',
        ],
    },
    {
        init: 'install.caddy',
        skip: function () { return installAsJudge || noCaddy || (0, fs_1.existsSync)("".concat(process.env.HOME, "/.hydro/Caddyfile")); },
        hidden: installAsJudge,
        operations: [
            nixInstall('caddy'),
            function () { return (0, fs_1.writeFileSync)("".concat(process.env.HOME, "/.hydro/Caddyfile"), Caddyfile); },
        ],
    },
    {
        init: 'install.hydro',
        operations: [
            function () { return removeOptionalEsbuildDeps(); },
            (CN ? function () {
                var res = null;
                try {
                    exec('yarn config set registry https://registry.npmmirror.com/', { stdio: 'inherit' });
                    res = exec("yarn global add ".concat(installTarget), { stdio: 'inherit' });
                }
                catch (e) {
                    console.log('Failed to install from npmmirror, fallback to yarnpkg');
                }
                finally {
                    exec('yarn config set registry https://registry.yarnpkg.com', { stdio: 'inherit' });
                }
                try {
                    exec("yarn global add ".concat(installTarget), { timeout: 60000 });
                }
                catch (e) {
                    console.warn('Failed to check update from yarnpkg');
                    if ((res === null || res === void 0 ? void 0 : res.code) !== 0)
                        return 'retry';
                }
                return null;
            } : ["yarn global add ".concat(installTarget), { retry: true }]),
            function () {
                if (installAsJudge)
                    (0, fs_1.writeFileSync)("".concat(process.env.HOME, "/.hydro/judge.yaml"), judgeYaml);
                else
                    (0, fs_1.writeFileSync)("".concat(process.env.HOME, "/.hydro/addon.json"), JSON.stringify(addons));
            },
            function () { return rollbackResolveField(); },
        ],
    },
    {
        init: 'install.createDatabaseUser',
        skip: function () { return (0, fs_1.existsSync)("".concat(process.env.HOME, "/.hydro/config.json")) || installAsJudge; },
        hidden: installAsJudge,
        operations: [
            'pm2 start mongod',
            function () { return sleep(3000); },
            function () { return __awaiter(void 0, void 0, void 0, function () {
                var client;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, mongodb_1.MongoClient.connect('mongodb://127.0.0.1', {
                                readPreference: 'nearest',
                                writeConcern: new mongodb_1.WriteConcern('majority'),
                            })];
                        case 1:
                            client = _a.sent();
                            return [4 /*yield*/, client.db('hydro').command({
                                    createUser: 'hydro',
                                    pwd: password,
                                    roles: [{ role: 'readWrite', db: 'hydro' }],
                                })];
                        case 2:
                            _a.sent();
                            return [4 /*yield*/, client.close()];
                        case 3:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); },
            function () { return (0, fs_1.writeFileSync)("".concat(process.env.HOME, "/.hydro/config.json"), JSON.stringify({
                uri: "mongodb://hydro:".concat(password, "@127.0.0.1:27017/hydro"),
            })); },
            'pm2 stop mongod',
            'pm2 del mongod',
        ],
    },
    {
        init: 'install.starting',
        operations: __spreadArray(__spreadArray([
            ['pm2 stop all', { ignore: true }],
            function () { return (0, fs_1.writeFileSync)("".concat(process.env.HOME, "/.hydro/mount.yaml"), mount); },
            // eslint-disable-next-line max-len
            "pm2 start bash --name hydro-sandbox -- -c \"ulimit -s unlimited && hydro-sandbox -mount-conf ".concat(process.env.HOME, "/.hydro/mount.yaml -http-addr=localhost:5050\"")
        ], installAsJudge ? [] : [
            function () { return console.log("WiredTiger cache size: ".concat(wtsize, "GB")); },
            // The only thing mongod writes to stderr is 'libcurl no version information available'
            "pm2 start mongod --name mongodb -e /dev/null -- --auth ".concat(exposeDb ? '--bind_ip=0.0.0.0 ' : '', "--wiredTigerCacheSizeGB=").concat(wtsize),
            function () { return sleep(1000); },
            function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (noCaddy) {
                                exec('hydrooj cli system set server.host 0.0.0.0');
                                return [2 /*return*/];
                            }
                            if (!(migration === 'hustoj')) return [3 /*break*/, 2];
                            exec('systemctl stop nginx || true');
                            exec('systemctl disable nginx || true');
                            exec('/etc/init.d/nginx stop || true');
                            return [4 /*yield*/, sleep(1000)];
                        case 1:
                            _a.sent();
                            _a.label = 2;
                        case 2: return [4 /*yield*/, isPortFree(80)];
                        case 3:
                            if (!(_a.sent())) {
                                log.warn('port.80');
                                warnings.push(['port.80']);
                            }
                            exec('pm2 start caddy -- run', { cwd: "".concat(process.env.HOME, "/.hydro") });
                            exec('hydrooj cli system set server.xff x-forwarded-for');
                            exec('hydrooj cli system set server.xhost x-forwarded-host');
                            exec('hydrooj cli system set server.xproxy true');
                            return [2 /*return*/];
                    }
                });
            }); },
            'pm2 start hydrooj',
        ], true), [
            'pm2 startup',
            'pm2 save',
        ], false),
    },
    {
        init: 'install.migrate',
        skip: function () { return !migration; },
        silent: true,
        operations: [
            ['yarn global add @hydrooj/migrate', { retry: true }],
            'hydrooj addon add @hydrooj/migrate',
        ],
    },
    {
        init: 'install.migrateHustoj',
        skip: function () { return migration !== 'hustoj'; },
        silent: true,
        operations: [
            'pm2 restart hydrooj',
            function () {
                var dbInc = (0, fs_1.readFileSync)('/home/judge/src/web/include/db_info.inc.php', 'utf-8');
                var l = dbInc.split('\n');
                function getConfig(key) {
                    var _a;
                    var t = (_a = l.find(function (i) { return i.includes("$".concat(key)); })) === null || _a === void 0 ? void 0 : _a.split('=', 2)[1].split(';')[0].trim();
                    if (!t)
                        return null;
                    if (t.startsWith('"') && t.endsWith('"'))
                        return t.slice(1, -1);
                    if (t === 'false')
                        return false;
                    if (t === 'true')
                        return true;
                    return +t;
                }
                var config = {
                    host: getConfig('DB_HOST'),
                    port: 3306,
                    name: getConfig('DB_NAME'),
                    dataDir: getConfig('OJ_DATA'),
                    username: getConfig('DB_USER'),
                    password: getConfig('DB_PASS'),
                    contestType: getConfig('OJ_OI_MODE') ? 'oi' : 'acm',
                    domainId: 'system',
                };
                console.log(config);
                exec("hydrooj cli script migrateHustoj '".concat(JSON.stringify(config), "'"), { stdio: 'inherit' });
                if (!getConfig('OJ_REGISTER'))
                    exec('hydrooj cli user setPriv 0 0');
            },
            'pm2 restart hydrooj',
        ],
    },
    {
        init: 'install.migrateUoj',
        skip: function () { return migration !== 'uoj'; },
        silent: true,
        operations: [
            function () {
                var _a, _b;
                var containers = (_a = exec('docker ps -a --format json').output) === null || _a === void 0 ? void 0 : _a.split('\n').map(function (i) { return i.trim(); }).filter(function (i) { return i; }).map(function (i) { return JSON.parse(i); });
                var uoj = containers.find(function (i) { return i.Image.toLowerCase() === 'universaloj/uoj-system' && i.State === 'running'; });
                var id = uoj.Id || uoj.ID;
                var info = JSON.parse(exec("docker inspect ".concat(id)).output);
                var dir = info[0].GraphDriver.Data.MergedDir;
                exec("sed s/127.0.0.1/0.0.0.0/g -i ".concat(dir, "/etc/mysql/mysql.conf.d/mysqld.cnf"));
                exec("docker exec -i ".concat(id, " /etc/init.d/mysql restart"));
                var passwd = (_b = (0, fs_1.readFileSync)("".concat(dir, "/etc/mysql/debian.cnf"), 'utf-8')
                    .split('\n').find(function (i) { return i.startsWith('password'); })) === null || _b === void 0 ? void 0 : _b.split('=')[1].trim();
                var script = [
                    "CREATE USER 'hydromigrate'@'%' IDENTIFIED BY '".concat(password, "';"),
                    'GRANT ALL PRIVILEGES ON *.* TO \'hydromigrate\'@\'%\' WITH GRANT OPTION;',
                    'FLUSH PRIVILEGES;',
                    '',
                ].join('\n');
                exec("docker exec -i ".concat(id, " mysql -u debian-sys-maint -p").concat(passwd, " -e \"").concat(script, "\""));
                var config = {
                    host: info[0].NetworkSettings.IPAddress,
                    port: 3306,
                    name: 'app_uoj233',
                    dataDir: "".concat(dir, "/var/uoj_data"),
                    username: 'hydromigrate',
                    password: password,
                    domainId: 'system',
                };
                console.log(config);
                // TODO mail config
                exec("hydrooj cli script migrateUniversaloj '".concat(JSON.stringify(config), "'"), { stdio: 'inherit' });
            },
        ],
    },
    {
        init: 'install.done',
        skip: function () { return installAsJudge; },
        operations: printInfo,
    },
    {
        init: 'install.postinstall',
        operations: [
            'echo "layout=2" >/etc/HYDRO_INSTALLER',
            'echo "vm.swappiness = 1" >>/etc/sysctl.conf',
            'sysctl -p',
            // dont retry this as it usually fails
            'screen -d -m "pm2 install pm2-logrotate && pm2 set pm2-logrotate:max_size 64M"',
        ],
    },
    {
        init: 'install.alldone',
        operations: __spreadArray(__spreadArray([], printInfo, true), [
            function () { return log.info('install.alldone'); },
            function () { return installAsJudge && log.info('install.editJudgeConfigAndStart'); },
            function () { return needRestart && log.info('install.restartRequired'); },
            function () {
                if (warnings.length) {
                    log.warn('install.warnings');
                    for (var _i = 0, warnings_1 = warnings; _i < warnings_1.length; _i++) {
                        var warning = warnings_1[_i];
                        log.warn.apply(log, __spreadArray([warning[0]], warning.slice(1), false));
                    }
                }
            },
        ], false),
    },
]; };
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var res, e_2, steps, i, step, _i, _a, op, res, res;
        var _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 4, , 5]);
                    if (!process.env.REGION) return [3 /*break*/, 1];
                    if (process.env.REGION !== 'CN')
                        CN = false;
                    return [3 /*break*/, 3];
                case 1:
                    console.log('Getting IP info to find best mirror:');
                    return [4 /*yield*/, fetch('https://ipinfo.io', { headers: { accept: 'application/json' } }).then(function (r) { return r.json(); })];
                case 2:
                    res = _c.sent();
                    delete res.readme;
                    console.log(res);
                    if (res.country !== 'CN')
                        CN = false;
                    _c.label = 3;
                case 3: return [3 /*break*/, 5];
                case 4:
                    e_2 = _c.sent();
                    console.error(e_2);
                    console.log('Cannot find the best mirror. Fallback to default.');
                    return [3 /*break*/, 5];
                case 5:
                    steps = Steps();
                    i = 0;
                    _c.label = 6;
                case 6:
                    if (!(i < steps.length)) return [3 /*break*/, 24];
                    step = steps[i];
                    if (!step.silent)
                        log.info(step.init);
                    if (!!((_b = step.skip) === null || _b === void 0 ? void 0 : _b.call(step))) return [3 /*break*/, 22];
                    _i = 0, _a = step.operations;
                    _c.label = 7;
                case 7:
                    if (!(_i < _a.length)) return [3 /*break*/, 21];
                    op = _a[_i];
                    if (!(op instanceof Array))
                        op = [op, {}];
                    if (op[0].toString().startsWith('nix-env'))
                        op[1].retry = true;
                    if (!(typeof op[0] === 'string')) return [3 /*break*/, 13];
                    retry = 0;
                    res = exec(op[0], { stdio: 'inherit' });
                    _c.label = 8;
                case 8:
                    if (!(res.code && op[1].ignore !== true)) return [3 /*break*/, 12];
                    if (!(op[1].retry && retry < 30)) return [3 /*break*/, 10];
                    log.warn('Retry in 3 secs... (%s)', op[0]);
                    return [4 /*yield*/, sleep(3000)];
                case 9:
                    _c.sent();
                    res = exec(op[0], { stdio: 'inherit' });
                    retry++;
                    return [3 /*break*/, 11];
                case 10:
                    log.fatal('Error when running %s', op[0]);
                    _c.label = 11;
                case 11: return [3 /*break*/, 8];
                case 12: return [3 /*break*/, 20];
                case 13:
                    retry = 0;
                    return [4 /*yield*/, op[0](op[1])];
                case 14:
                    res = _c.sent();
                    _c.label = 15;
                case 15:
                    if (!(res === 'retry')) return [3 /*break*/, 20];
                    if (!(retry < 30)) return [3 /*break*/, 18];
                    log.warn('Retry in 3 secs...');
                    return [4 /*yield*/, sleep(3000)];
                case 16:
                    _c.sent();
                    return [4 /*yield*/, op[0](op[1])];
                case 17:
                    res = _c.sent();
                    retry++;
                    return [3 /*break*/, 19];
                case 18:
                    log.fatal('Error installing');
                    _c.label = 19;
                case 19: return [3 /*break*/, 15];
                case 20:
                    _i++;
                    return [3 /*break*/, 7];
                case 21: return [3 /*break*/, 23];
                case 22:
                    if (!step.silent)
                        log.info('info.skip');
                    _c.label = 23;
                case 23:
                    i++;
                    return [3 /*break*/, 6];
                case 24: return [2 /*return*/];
            }
        });
    });
}
main().catch(log.fatal);
global.main = main;
