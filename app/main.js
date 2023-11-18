var $jC3rJ$nodecrypto = require("node:crypto");
var $jC3rJ$nodefs = require("node:fs");
var $jC3rJ$nodehttp = require("node:http");


function $parcel$interopDefault(a) {
  return a && a.__esModule ? a.default : a;
}
// serialization issues when round tripping bytes to "chars" to bytes
// keep the original bytes for the string
// TODO: could maybe get away with a WeakRef here
const $3e273184e3a72f2a$export$226a103a52ef3067 = new Map();


class $82e5f4275773712f$export$50792b0e93539fde {
    constructor(str){
        this.str = str;
    }
    toString() {
        return this.str;
    }
}
class $82e5f4275773712f$export$6ee0ae27af45b853 extends $82e5f4275773712f$export$50792b0e93539fde {
}
class $82e5f4275773712f$export$f25f153afe0ce4cc extends $82e5f4275773712f$export$50792b0e93539fde {
    constructor(strBytes){
        const buffer = Buffer.from(strBytes);
        const str = buffer.toString("utf8");
        (0, $3e273184e3a72f2a$export$226a103a52ef3067).set(str, strBytes);
        super(str);
        this.buffer = buffer;
    }
    toString() {
        return JSON.stringify(this.str);
    }
}
class $82e5f4275773712f$export$5edada7a246e2325 extends $82e5f4275773712f$export$50792b0e93539fde {
    toString() {
        return `[`;
    }
}
class $82e5f4275773712f$export$cde8c14ea0efb6bf extends $82e5f4275773712f$export$50792b0e93539fde {
    toString() {
        return `]`;
    }
}
class $82e5f4275773712f$export$c232086534285ef extends $82e5f4275773712f$export$50792b0e93539fde {
    toString() {
        return `{`;
    }
}
class $82e5f4275773712f$export$c5248a0f555b2c55 extends $82e5f4275773712f$export$50792b0e93539fde {
    toString() {
        return `}`;
    }
}
class $82e5f4275773712f$export$b4cd9db38d761c5c extends $82e5f4275773712f$export$50792b0e93539fde {
    toString() {
        return `, `;
    }
}
class $82e5f4275773712f$export$7be493d1692ce0d3 extends $82e5f4275773712f$export$50792b0e93539fde {
    toString() {
        return `: `;
    }
}


class $66158fbd6a0ff2e9$export$b55edb69cfa7ac57 {
    constructor(tokens = [], openDelims = []){
        this.tokens = tokens;
        this.openDelims = openDelims;
        this.openDelims = openDelims ?? [];
        this.tokens = tokens ?? [];
    }
    end() {
        const top = this.openDelims.at(-1);
        if (top instanceof (0, $82e5f4275773712f$export$5edada7a246e2325)) return this.add(new (0, $82e5f4275773712f$export$cde8c14ea0efb6bf)());
        if (top instanceof (0, $82e5f4275773712f$export$c232086534285ef)) return this.add(new (0, $82e5f4275773712f$export$c5248a0f555b2c55)());
        throw new Error("unexpected end");
    }
    bailStr() {
        if (!this.openDelims.length) return this.toString();
        return this.end().bailStr();
    }
    add(t) {
        let nextDelims = this.openDelims;
        if (t instanceof (0, $82e5f4275773712f$export$5edada7a246e2325)) nextDelims = nextDelims.concat(t);
        else if (t instanceof (0, $82e5f4275773712f$export$c232086534285ef)) nextDelims = nextDelims.concat(t);
        else if (t instanceof (0, $82e5f4275773712f$export$cde8c14ea0efb6bf)) {
            const top = nextDelims.at(-1);
            if (!(top instanceof (0, $82e5f4275773712f$export$5edada7a246e2325))) throw new Error("unmatched close array token");
            nextDelims = [
                ...nextDelims
            ];
            nextDelims.pop();
        } else if (t instanceof (0, $82e5f4275773712f$export$c5248a0f555b2c55)) {
            const top = nextDelims.at(-1);
            if (!(top instanceof (0, $82e5f4275773712f$export$c232086534285ef))) throw new Error("unmatched close dict token");
            nextDelims = [
                ...nextDelims
            ];
            nextDelims.pop();
        }
        const needsArrSep = this.openDelims.at(-1) instanceof (0, $82e5f4275773712f$export$5edada7a246e2325) && !(t instanceof (0, $82e5f4275773712f$export$cde8c14ea0efb6bf)) && !(this.tokens.at(-1) instanceof (0, $82e5f4275773712f$export$5edada7a246e2325));
        const needsKvSep = this.openDelims.at(-1) instanceof (0, $82e5f4275773712f$export$c232086534285ef) && this.tokens.at(-1) instanceof (0, $82e5f4275773712f$export$f25f153afe0ce4cc) && !(this.tokens.at(-2) instanceof (0, $82e5f4275773712f$export$7be493d1692ce0d3));
        const needsDictSep = !needsKvSep && this.openDelims.at(-1) instanceof (0, $82e5f4275773712f$export$c232086534285ef) && !(t instanceof (0, $82e5f4275773712f$export$c5248a0f555b2c55)) && !(this.tokens.at(-1) instanceof (0, $82e5f4275773712f$export$c232086534285ef));
        if (needsArrSep && needsDictSep) throw new Error("cannot need both");
        if (needsKvSep && (needsDictSep || needsArrSep)) throw new Error("cannot need kv and dict/arr sep");
        const nextTokens = needsArrSep || needsDictSep ? this.tokens.concat(new (0, $82e5f4275773712f$export$b4cd9db38d761c5c)()) : needsKvSep ? this.tokens.concat(new (0, $82e5f4275773712f$export$7be493d1692ce0d3)()) : this.tokens;
        return new $66158fbd6a0ff2e9$export$b55edb69cfa7ac57(nextTokens.concat(t), nextDelims);
    }
    toString() {
        const raw = this.tokens.join("");
        const parsed = JSON.parse(raw);
        const str = JSON.stringify(parsed);
        return str;
    }
}



const $8bc3a143ba90e228$export$cea7f32f77c01158 = (ch)=>ch.charCodeAt(0);
const $8bc3a143ba90e228$export$9bb611d729802a56 = $8bc3a143ba90e228$export$cea7f32f77c01158("i");
const $8bc3a143ba90e228$export$a9c23c6ac3fc3eca = $8bc3a143ba90e228$export$cea7f32f77c01158("e");
const $8bc3a143ba90e228$export$96c3628b3b9d2079 = $8bc3a143ba90e228$export$cea7f32f77c01158(":");
const $8bc3a143ba90e228$export$1658304bacb54f82 = $8bc3a143ba90e228$export$cea7f32f77c01158("-");
const $8bc3a143ba90e228$export$561f80bd3c078e48 = $8bc3a143ba90e228$export$cea7f32f77c01158("0");
const $8bc3a143ba90e228$export$91bc1ec88fa68c13 = $8bc3a143ba90e228$export$cea7f32f77c01158("9");
const $8bc3a143ba90e228$export$61196ced6d74a310 = $8bc3a143ba90e228$export$cea7f32f77c01158("l");
const $8bc3a143ba90e228$export$96f57966bedc81b4 = $8bc3a143ba90e228$export$cea7f32f77c01158("d");


const $e4e5653eb30567a4$var$intFromByte = (b)=>Number.parseInt(String.fromCharCode(b), 10);
function $e4e5653eb30567a4$export$da4f2b68efa4c4b(str) {
    const bytes = Buffer.from(str, "utf8");
    const decoded = String($e4e5653eb30567a4$export$a1124e132c740495(bytes));
    return decoded;
}
function $e4e5653eb30567a4$export$a1124e132c740495(bytes, idx = 0, tokens = new (0, $66158fbd6a0ff2e9$export$b55edb69cfa7ac57)()) {
    if (idx > bytes.length) {
        console.error(`>>> ERROR: idx ${idx} > ${bytes.length}`);
        return tokens.bailStr(); // lol - not handling bytes correctly in some sample files?
    }
    if (idx === bytes.length) return tokens;
    if (bytes[idx] === (0, $8bc3a143ba90e228$export$96f57966bedc81b4)) return $e4e5653eb30567a4$export$a1124e132c740495(bytes, idx + 1, tokens.add(new (0, $82e5f4275773712f$export$c232086534285ef)()));
    if (bytes[idx] === (0, $8bc3a143ba90e228$export$61196ced6d74a310)) return $e4e5653eb30567a4$export$a1124e132c740495(bytes, idx + 1, tokens.add(new (0, $82e5f4275773712f$export$5edada7a246e2325)()));
    if (bytes[idx] === (0, $8bc3a143ba90e228$export$a9c23c6ac3fc3eca)) return $e4e5653eb30567a4$export$a1124e132c740495(bytes, idx + 1, tokens.end());
    if (!isNaN($e4e5653eb30567a4$var$intFromByte(bytes[idx]))) {
        let next = idx;
        const sizeBytes = [
            bytes[idx]
        ];
        while(!isNaN($e4e5653eb30567a4$var$intFromByte(bytes[++next])))sizeBytes.push(bytes[next]);
        // // ????
        // if (!bytes[next] === COLON) {
        //   throw new Error('expected :');
        // }
        if (bytes[next] !== (0, $8bc3a143ba90e228$export$96c3628b3b9d2079)) throw new Error("expected :");
        ++next;
        const sizeStr = Buffer.from(sizeBytes).toString("utf8");
        const sizeNum = Number.parseInt(sizeStr, 10);
        const strBytes = [];
        let ate = 0;
        while(ate++ < sizeNum)strBytes.push(bytes[next++]);
        return $e4e5653eb30567a4$export$a1124e132c740495(bytes, next, tokens.add(new (0, $82e5f4275773712f$export$f25f153afe0ce4cc)(strBytes)));
    }
    if (bytes[idx] === (0, $8bc3a143ba90e228$export$9bb611d729802a56)) {
        let next = idx + 1;
        const numBytes = [];
        if (bytes[next] === (0, $8bc3a143ba90e228$export$1658304bacb54f82)) numBytes.push(bytes[next++]);
        while(bytes[next] !== (0, $8bc3a143ba90e228$export$a9c23c6ac3fc3eca) && next < bytes.length){
            const numB = bytes[next++];
            if (numB < (0, $8bc3a143ba90e228$export$561f80bd3c078e48) || numB > (0, $8bc3a143ba90e228$export$91bc1ec88fa68c13)) throw new Error(`invalid integer byte ${numB}`);
            numBytes.push(numB);
        }
        const numStr = Buffer.from(numBytes).toString("utf8");
        ++next;
        return $e4e5653eb30567a4$export$a1124e132c740495(bytes, next, tokens.add(new (0, $82e5f4275773712f$export$6ee0ae27af45b853)(numStr)));
    }
    throw new Error(`Unknown token type at index ${idx}`);
}











function $b18cbde4f374671f$export$a92a1eaeb06ea361(dict) {
    const keys = Object.keys(dict).sort();
    const bytes = [
        (0, $8bc3a143ba90e228$export$cea7f32f77c01158)("d")
    ];
    for (const key of keys){
        const keyStr = `${key.length}:${key}`;
        bytes.push(Array.from(Buffer.from(keyStr, "utf8")));
        const val = dict[key];
        if (typeof val === "number") {
            const intStr = `i${val}e`;
            bytes.push(Array.from(Buffer.from(intStr, "utf8")));
        } else if (typeof val === "string") {
            const strBytes = (0, $3e273184e3a72f2a$export$226a103a52ef3067).get(val);
            if (!strBytes) throw new Error(`no bytes for ${val}`);
            const prefix = `${strBytes.length}:`;
            bytes.push(Array.from(Buffer.from(prefix, "utf8")));
            bytes.push(strBytes);
        } else throw new Error(`unsupported val type for ${val}`);
    }
    bytes.push((0, $8bc3a143ba90e228$export$cea7f32f77c01158)("e"));
    return Buffer.from(bytes.flat());
}


const $0a38c752b5042f46$export$c73dcf559dad2f44 = (file)=>{
    const contents = (0, ($parcel$interopDefault($jC3rJ$nodefs))).readFileSync(file);
    const decoded = (0, $e4e5653eb30567a4$export$a1124e132c740495)(contents);
    const parsed = JSON.parse(decoded);
    const { announce: announce, info: info } = parsed;
    const encodedInfo = (0, $b18cbde4f374671f$export$a92a1eaeb06ea361)(info);
    const hasher = (0, ($parcel$interopDefault($jC3rJ$nodecrypto))).createHash("sha1");
    hasher.update(encodedInfo);
    const sha1 = hasher.digest("hex");
    const hasherRaw = (0, ($parcel$interopDefault($jC3rJ$nodecrypto))).createHash("sha1");
    hasherRaw.update(encodedInfo);
    const sha1Raw = hasherRaw.digest();
    const piecesConcat = (0, $3e273184e3a72f2a$export$226a103a52ef3067).get(info.pieces);
    const pieceHashes = [];
    for(let i = 0; i < piecesConcat.length; i += 20){
        const p = piecesConcat.slice(i, i + 20);
        pieceHashes.push(Buffer.from(p).toString("hex"));
    }
    return {
        announce: announce,
        info: info,
        sha1: sha1,
        sha1Raw: sha1Raw,
        pieceHashes: pieceHashes
    };
};
function $0a38c752b5042f46$export$af06c3af5bd98cb4(file) {
    const { announce: announce, info: info, sha1: sha1, pieceHashes: pieceHashes } = $0a38c752b5042f46$export$c73dcf559dad2f44(file);
    const infoStr = [
        [
            "Tracker URL",
            announce
        ],
        [
            "Length",
            info.length
        ],
        [
            "Info Hash",
            sha1
        ],
        [
            "Piece Length",
            info["piece length"]
        ],
        [
            "Piece Hashes",
            pieceHashes.join("\n"),
            "\n"
        ]
    ].map(([k, v, delim = " "])=>`${k}:${delim}${v}`).join("\n");
    return infoStr;
}








const $1f1932f95910f014$var$peerId = "a79a7e603a3d4357b52f";
const $1f1932f95910f014$var$PORT = "6881";
async function $1f1932f95910f014$export$f05eafe0156b3b47(file) {
    const peersResp = await $1f1932f95910f014$export$a8157895bd9c53da(file);
    return peersResp.peers.join("\n");
}
async function $1f1932f95910f014$export$a8157895bd9c53da(file) {
    const info = (0, $0a38c752b5042f46$export$c73dcf559dad2f44)(file);
    const url = $1f1932f95910f014$var$getPeersUrl(info);
    const respStr = await $1f1932f95910f014$var$httpGetBuffer(url);
    const decoded = $1f1932f95910f014$export$6563632edab52a01(respStr);
    return decoded;
}
function $1f1932f95910f014$export$6563632edab52a01(resp) {
    const { interval: interval, peers: peers } = JSON.parse(String((0, $e4e5653eb30567a4$export$a1124e132c740495)(resp)));
    const peersBytes = (0, $3e273184e3a72f2a$export$226a103a52ef3067).get(peers);
    const peerStrs = [];
    for(let i = 0; i < peersBytes.length; i += 6){
        const ip = peersBytes.slice(i, i + 4).join(".");
        const [p0, p1] = peersBytes.slice(i + 4, i + 6);
        const port = p0 << 8 | p1;
        const str = [
            ip,
            port
        ].join(":");
        peerStrs.push(str);
    }
    return {
        interval: interval,
        peers: peerStrs
    };
}
function $1f1932f95910f014$var$getPeersUrl(info) {
    const infoHashBuf = Buffer.from(info.sha1, "hex");
    if (infoHashBuf.length !== 20) throw new Error("infoHashRaw.length !== 20");
    const params = new URLSearchParams();
    params.append("peer_id", $1f1932f95910f014$var$peerId);
    params.append("port", $1f1932f95910f014$var$PORT);
    params.append("uploaded", "0");
    params.append("downloaded", "0");
    params.append("left", info.info.length.toString());
    params.append("compact", "1");
    let url = `${info.announce}?${params.toString()}`;
    url += `&info_hash=${$1f1932f95910f014$export$3449a3b321ef3023(info.sha1)}`;
    return url;
}
function $1f1932f95910f014$export$3449a3b321ef3023(hexStr) {
    const encoded = [];
    for(let i = 0; i < hexStr.length; i += 2){
        const pair = hexStr.slice(i, i + 2);
        let e = "";
        switch(pair.toLowerCase()){
            case "4c":
                e = "L";
                break;
            case "54":
                e = "T";
                break;
            case "68":
                e = "h";
                break;
            case "71":
                e = "q";
                break;
            default:
                e = `%${pair}`;
        }
        encoded.push(e);
    }
    return encoded.join("");
}
function $1f1932f95910f014$var$httpGetBuffer(url) {
    return new Promise((resolve, reject)=>{
        (0, ($parcel$interopDefault($jC3rJ$nodehttp))).get(url, (res)=>{
            if (res.statusCode < 200 || res.statusCode >= 300) return reject(new Error("StatusCode=" + res.statusCode));
            const chunks = [];
            // Collect chunks of data
            res.on("data", (chunk)=>{
                chunks.push(chunk);
            });
            // The whole response has been received. Combine the chunks and resolve.
            res.on("end", ()=>{
                const buffer = Buffer.concat(chunks);
                resolve(buffer);
            });
        }).on("error", (err)=>{
            reject(err);
        });
    });
}




async function $3f97e85369539468$export$f22da7240b7add18() {
    const command = process.argv[2];
    switch(command){
        case "decode":
            {
                const bencodedValue = process.argv[3];
                console.log((0, $e4e5653eb30567a4$export$da4f2b68efa4c4b)(bencodedValue));
                break;
            }
        case "info":
            {
                const file = process.argv[3];
                console.log((0, $0a38c752b5042f46$export$af06c3af5bd98cb4)(file));
                break;
            }
        case "peers":
            {
                const file = process.argv[3];
                console.log(await (0, $1f1932f95910f014$export$f05eafe0156b3b47)(file));
                break;
            }
        default:
            throw new Error("Not implemented");
    }
}




(0, $3f97e85369539468$export$f22da7240b7add18)().catch((e)=>{
    console.error(e);
    process.exit(1);
});


//# sourceMappingURL=main.js.map
