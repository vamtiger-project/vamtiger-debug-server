"use strict";function _interopDefault(e){return e&&"object"==typeof e&&"default"in e?e.default:e}Object.defineProperty(exports,"__esModule",{value:!0});var http=require("http"),vamtigerRequire=_interopDefault(require("vamtiger-require"));function __awaiter(e,t,r,n){return new(r||(r=Promise))(function(o,s){function a(e){try{u(n.next(e))}catch(e){s(e)}}function i(e){try{u(n.throw(e))}catch(e){s(e)}}function u(e){e.done?o(e.value):new r(function(t){t(e.value)}).then(a,i)}u((n=n.apply(e,t)).next())})}const referenceObjectPath=require("vamtiger-reference-object-path");let server;function vamtigerDebugServer({port:e}){return(server=server||http.createServer(handleRequest)).listen(e),server}function stopServer(){server.close()}function handleRequest(e,t){return __awaiter(this,void 0,void 0,function*(){const r=yield getBody({request:e}),n=(e,r)=>t.end(JSON.stringify({error:e,result:r}));let o;t.setHeader(exports.HeaderKey.contentType,exports.HeaderValue.json);try{r.callback?(r.arguments&&r.arguments.push(n),r.instanceArguments&&r.instanceArguments.push(n),o=vamtigerRequire(r)):(o=vamtigerRequire(r),r.instanceGetPath&&(o=referenceObjectPath({object:o,path:r.instanceGetPath})),t.end(JSON.stringify({result:o})))}catch(e){console.error(e),t.end(JSON.stringify({error:e}))}})}function getBody({request:e}){const t=[];return new Promise(r=>{e.on(exports.Event.data,e=>t.push(e)),e.on(exports.Event.end,()=>Promise.resolve(Buffer.concat(t).toString()).then(JSON.parse).then(r))})}!function(e){e.data="data",e.end="end"}(exports.Event||(exports.Event={})),(exports.HeaderKey||(exports.HeaderKey={})).contentType="Content-Type",(exports.HeaderValue||(exports.HeaderValue={})).json="application/json",(exports.CommandlineArgs||(exports.CommandlineArgs={})).port="port",exports.default=vamtigerDebugServer,exports.stopServer=stopServer;
//# sourceMappingURL=index.js.map
