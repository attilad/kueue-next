"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// app.ts
const koa_1 = __importDefault(require("koa"));
const koa_router_1 = __importDefault(require("koa-router"));
const koa_bodyparser_1 = __importDefault(require("koa-bodyparser"));
const cors_1 = __importDefault(require("@koa/cors"));
const ws_1 = __importDefault(require("ws"));
const karaokeQueue_1 = require("./karaokeQueue");
const app = new koa_1.default();
const router = new koa_router_1.default();
const karaoke = new karaokeQueue_1.KaraokeQueue({
    broadcastUpdate: (singers) => {
        wss.clients.forEach((client) => {
            if (client.readyState === ws_1.default.OPEN)
                client.send(JSON.stringify(singers));
        });
    },
});
function isAddSingerRequestBody(obj) {
    return (obj && (typeof obj.name === "string" || typeof obj.name === "undefined"));
}
router.post("/reset", (ctx) => {
    karaoke.reset();
    ctx.status = 200;
});
router.get("/current", (ctx) => {
    ctx.body = {
        currentSinger: karaoke.currentSinger(),
    };
});
router.post("/next", (ctx) => {
    ctx.body = {
        nextSinger: karaoke.nextSinger(),
    };
});
router.get("/singers", (ctx) => {
    ctx.body = {
        singers: karaoke.showSingers(),
    };
});
router.post("/add", (ctx) => {
    const requestBody = ctx.request.body;
    if (!isAddSingerRequestBody(requestBody)) {
        ctx.throw(400, "Invalid request body.");
    }
    const { name } = requestBody;
    if (!name) {
        ctx.throw(400, "Name is required.");
    }
    const [success, message] = karaoke.addSinger(name);
    if (!success) {
        ctx.status = 409; // Conflict status code
        ctx.body = {
            error: message,
        };
    }
    else {
        ctx.body = {
            message: message,
        };
    }
});
router.post("/add-priority", (ctx) => {
    const requestBody = ctx.request.body;
    if (!isAddSingerRequestBody(requestBody)) {
        ctx.throw(400, "Invalid request body.");
    }
    const { name } = requestBody;
    if (!name) {
        ctx.throw(400, "Name is required.");
    }
    const [success, message] = karaoke.addPrioritySinger(name);
    if (!success) {
        ctx.status = 409; // Conflict status code
        ctx.body = {
            error: message,
        };
    }
    else {
        ctx.body = {
            message: message,
        };
    }
});
router.post("/remove", (ctx) => {
    const requestBody = ctx.request.body;
    if (!isAddSingerRequestBody(requestBody)) {
        ctx.throw(400, "Invalid request body.");
    }
    const { name } = requestBody;
    if (!name) {
        ctx.throw(400, "Name is required.");
    }
    const [success, message] = karaoke.removeSinger(name);
    if (!success) {
        ctx.status = 404; // Not Found status code
        ctx.body = {
            error: message,
        };
    }
    else {
        ctx.body = {
            message: message,
        };
    }
});
app.use((0, koa_bodyparser_1.default)());
app.use((0, cors_1.default)());
const wss = new ws_1.default.Server({ noServer: true });
wss.on("connection", (ws) => {
    console.log("Client connected");
    ws.on("close", () => {
        console.log("Client disconnected");
    });
});
app.use(router.routes());
app.use(router.allowedMethods());
const port = process.env.QUEUE_PORT || 3030;
const server = app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
server.on("upgrade", (request, socket, head) => {
    wss.handleUpgrade(request, socket, head, (ws) => {
        wss.emit("connection", ws, request);
    });
});
