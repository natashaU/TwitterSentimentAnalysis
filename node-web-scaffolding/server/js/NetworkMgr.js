/*
 * Name: NetworkMgr
 * Description: Class used to handle network requests
 * Author: Thomas Lanteigne
 * Date: 9 Mars 2017
 */
const path = require("path"),
    fs = require("fs"),
    url = require("url"),
    querystring = require('querystring'),
    restify = require("restify"),
    config = require("../config");

function cNetworkMgr(i_oApplication) {
    //=============================================================================
    // Public methods
    //=============================================================================
    this.startServer = function() {
        var l_rAPIRegExp = /^\/API\/(\w+)?(?:\/(.*))?/i;

        console.log("NetworkMgr::startServer::Starting Web Server...");
        m_oServer = restify.createServer({
            name: 'WebApp'
        });

        // query string parser
        m_oServer.use(restify.bodyParser());
        m_oServer.use(restify.queryParser());

        // gzip compression
        if(config.network.enableGZIP) {
            m_oServer.use(restify.gzipResponse());
        }

        if(config.network.enableCORS) {
            m_oServer.use(restify.CORS());
        }

        m_oServer.listen(config.network.server_port);

        // handle all file requests, ie: URLs NOT starting with /API/...
        m_oServer.get(/^(?!\/API)/i, _httpFileResponse);

        // handle all API requests, ie: all other URLs
        m_oServer.get(l_rAPIRegExp, _httpAPIResponse);
        m_oServer.post(l_rAPIRegExp, _httpAPIResponse);
        m_oServer.put(l_rAPIRegExp, _httpAPIResponse);
        m_oServer.del(l_rAPIRegExp, _httpAPIResponse);

        console.log("NetworkMgr::startServer::Web Server Started http://localhost:" + config.network.server_port + "/");

        return m_oServer;
    };

    //=============================================================================
    this.getServer = function() {
        return m_oServer;
    }

    //=============================================================================
    this.stopServer = function() {
        // unused for now
        m_oServer.close();
    };

    //=============================================================================
    // Private methods
    //=============================================================================
    function _extractAPIRequest(i_sURL) {
        var l_oParsedURL = url.parse(i_sURL),
            l_oParsedQuery = querystring.parse(l_oParsedURL.query),
            l_aRESTChunks;

        if (l_oParsedURL.pathname) {
            l_aRESTChunks = l_oParsedURL.pathname.split("/");
        } else {
            l_aRESTChunks = [];
        }

        return {
            restChunks: l_aRESTChunks,
            query: l_oParsedQuery
        };
    }

    //=============================================================================
    function _httpAPIResponse(i_oReq, i_oRes, i_oNext) {
        var l_sURL = i_oReq.url.replace(/\/API\//i, "").toLowerCase(),
            l_oAPIInfos,
            l_xData = "";

        l_oAPIInfos = _extractAPIRequest(l_sURL);
        l_oAPIInfos.method = i_oReq.method;
        l_oAPIInfos.httpRequest = i_oReq;
        l_oAPIInfos.httpResponse = i_oRes;
        m_oApplication.handleAPIRequest(l_oAPIInfos, _onAPIRequestCompleted.bind(m_oInterface, i_oReq, i_oRes, i_oNext));
    }

    //=============================================================================
    function _onAPIRequestCompleted(i_oReq, i_oRes, i_oNext, i_oData) {
        _httpResponse(JSON.stringify(i_oData), i_oReq, i_oRes, i_oNext);
    }

    //=============================================================================
    function _httpFileResponse(i_oReq, i_oRes, i_oNext) {
        var l_sRequestURL = decodeURIComponent(i_oReq.url),
            l_sMsg,
            l_sFilePath;

        l_sRequestURL = l_sRequestURL.replace(/\?.*/, ""); // strip out any query string arguments
        if (/\/$/i.test(l_sRequestURL)) {
            l_sRequestURL += "/index.html";
        } else if (/\/favicon.ico/.test(l_sRequestURL)) {
            l_sRequestURL = "/assets/images/favicon.ico";
        }

        l_sFilePath = path.resolve([config.client_web_path, l_sRequestURL].join('/'));
        l_sFilePath = decodeURI(l_sFilePath); // make sure string is decoded
        fs.readFile(l_sFilePath, function(err, i_oData) {
            var l_sExt = path.extname(l_sFilePath);

            if (err) {
                if (!/favicon/i.test(l_sFilePath)) {
                    console.error("NetworkMgr::_httpFileResponse::Error reading file ", l_sFilePath, err);
                }

                // prevent infinite loop if 404.html not found
                if (!/404/.test(i_oReq.url)) {
                    i_oReq.url = "404.html";
                    _httpFileResponse(i_oReq, i_oRes, i_oNext);
                } else {
                    _httpResponse("Not Found", i_oReq, i_oRes, i_oNext);
                }
            } else {
                fs.stat(l_sFilePath, function(err, i_oStats) {

                    l_sMime = m_oMimeTypes[l_sExt];
                    if (!l_sMime) {
                        l_sMime = m_oMimeTypes.default;
                    }

                    i_oRes.writeHead(200, {
                        'Content-Type': l_sMime,
                        'Content-Length': i_oStats.size, // causes problems with gzip
                        'Server': "Homemade Goodness"
                    });

                    if (/^text|javascript/.test(l_sMime)) {
                        l_sMsg = String(i_oData);
                    } else {
                        l_sMsg = i_oData;
                    }

                    _httpResponse(l_sMsg, i_oReq, i_oRes, i_oNext);
                });
            }
        });
    }

    //=============================================================================
    function _httpResponse(i_oMsg, i_oReq, i_oRes, i_oNext) {
        i_oRes.end(i_oMsg);
        return i_oNext();
    }

    //=============================================================================
    // Private Members
    //=============================================================================
    var m_oInterface = this,
        m_oServer,
        m_oApplication = i_oApplication,
        m_oMimeTypes = {
            '.html': 'text/html',
            '.js': 'text/javascript',
            '.css': 'text/css',
            '.jpg': 'image/jpeg',
            '.jpeg': 'image/jpeg',
            '.png': 'image/png',
            '.gif': 'image/gif',
            '.svg': 'image/svg+xml',
            '.woff': 'application/x-font-woff',
            '.woff2': 'application/x-font-woff2',
            '.ttf': 'application/x-font-ttf',
            '.otf': 'application/x-font-opentype',
            '.eot': 'application/vnd.ms-fontobject',
            '.cbr': 'application/x-cbr', // 'application/octet-stream'
            '.cbz': 'application/x-cbz',
            '.txt': 'text/plain',
            default: 'text/plain'
        };
}

module.exports = cNetworkMgr;
