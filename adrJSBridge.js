var adr = function() {

    var _callNativeFunction = function(functionName, args, successCallback, errorCallback) {
        var url = "adrJSBridge://";

        var callInfo = {};
        callInfo.functionname = functionName;

        if (successCallback)
        {
            if (typeof successCallback == 'function')
            {
                var callbackFuncName = _createCallbackFunction(functionName + "_" + "successCallback", successCallback);
                callInfo.success = callbackFuncName;
            }
            else
                callInfo.success = successCallback;
        }

        if (errorCallback)
        {
            if (typeof errorCallback == 'function')
            {
                var callbackFuncName = _createCallbackFunction(functionName + "_" + "errorCallback", errorCallback);
                callInfo.error = callbackFuncName;
            }
            else
                callInfo.error = errorCallback;
        }

        if (args)
        {
            callInfo.args = args;
        }

        url += JSON.stringify(callInfo)


        var iFrame = _createIFrame(url);
        //remove the frame now
        iFrame.parentNode.removeChild(iFrame);
    };
    var _createCallbackFunction = function(funcName, callbackFunc) {
        if (callbackFunc && callbackFunc.name != null && callbackFunc.name.length > 0)
        {
            return callbackFunc.name;
        }

        if (typeof window[funcName+0] != 'function')
        {
            window[funcName+0] = callbackFunc;
            __functionIndexMap[funcName] = 0;
            return funcName+0

        } else
        {
            var maxIndex = __functionIndexMap[funcName];
            var callbackFuncStr = callbackFunc.toString();
            for (var i = 0; i <= maxIndex; i++)
            {
                var tmpName = funcName + i;
                if (window[tmpName].toString() == callbackFuncStr)
                    return tmpName;
            }

            var newIndex = ++__functionIndexMap[funcName];
            window[funcName+newIndex] = callbackFunc;
            return funcName+newIndex;
        }
    };
    var _createIFrame = function(src) {
        var rootElm = document.documentElement;
        var newFrameElm = document.createElement("IFRAME");
        newFrameElm.setAttribute("src",src);
        rootElm.appendChild(newFrameElm);
        return newFrameElm;
    };
    return {
        sendEmail : function(to, cc, subject, body, successCallback, errorCallback) {
            if(typeof useAPI === 'undefined')
                _callNativeFunction("sendEmail", [to, cc, subject, body], successCallback, errorCallback);
            else
                API.sendEmail();
        },
        getItem : function(key, successCallback, errorCallback) {
            if(typeof useAPI === 'undefined')
                _callNativeFunction("getValue", [key], successCallback, errorCallback);
            else
                API.getItem(key);
        },
        setItem : function(key, value, successCallback, errorCallback) {
            if(typeof useAPI === 'undefined')
                _callNativeFunction("setValue", [key, value], successCallback, errorCallback);
            else
                API.setItem(key, value);
        },
        logEvent : function(object, action, additionalParams, successCallback, errorCallback) {
            if(typeof useAPI === 'undefined')
                _callNativeFunction("logEvent", [object, action, additionalParams], successCallback, errorCallback);
            else
                API.logEvent(object, action, additionalParams);
        }
    };
}();
