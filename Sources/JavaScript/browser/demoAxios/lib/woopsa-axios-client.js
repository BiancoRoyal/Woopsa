
(function (global) {
    let nop = function () {
    };

    global.woopsaClient = {};

    global.woopsaClient.open = (axios, options) => {
        global.axiosService = axios.create(options);
        if (options.url.lastIndexOf('/') === options.url.length - 1) {
            global.axiosURL = options.url;
        } else {
            global.axiosURL = options.url + "/";
        }
        global.axiosService.defaults.timeout = 2500;

        return global.axiosService
    }

    global.woopsaClient.authSettings = (auth) => {
        global.axiosAuth = auth
    }

    global.woopsaClient.read = (path, callback, onError) => {
        if (axiosService) {
            global.axiosService.get(global.axiosURL + 'read' + path)
                .then((response) => {
                    callback(response.data.Value, path);
                }).catch((err) => {
                console.log(err.message)
                onError(err)
            })
        }
    }

    global.woopsaClient.write = (path, value, callback, onError) => {
        if (global.axiosService) {
            global.axiosService.post(global.axiosURL + 'write' + path, { value: value }, {})
                .then((response) => {
                    callback(path, response);
                }).catch((err) => {
                console.log(err.message)
                onError(err)
            })
        }
    }

    global.woopsaClient.meta = (path, callback, onError) => {
        if (global.axiosService) {
            global.axiosService.get(global.axiosURL + 'meta' + path)
                .then((response) => {
                    callback(JSON.stringify(response.data), path);
                }).catch((err) => {
                console.log(err.message)
                onError(err)
            })
        }
    }

    global.woopsaClient.invoke = (path, arguments, callback, onError, timeout) => {
        if (global.axiosService) {

            timeout = timeout || global.axiosService.defaults.timeout;
            arguments = arguments || {};

            callback = callback || (function () {
                console.log('No callback for invoke was set.')
            });

            global.axiosService.post({ url: global.axiosURL + 'invoke' + path, data: arguments, responseType: "text", timeout: timeout })
                .then(function (response) {
                    if (response.data === "")
                        callback();
                    else
                        callback(JSON.parse(response.data).Value);
                })
                .catch((err) => {
                    console.log(err.message)
                    onError(err)
                })
        }
    }

})(window);
