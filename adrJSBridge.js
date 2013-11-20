function sendEmail(to, cc, subject, body, successCallback, errorCallback)
{
	if(useAPI)
	{
		API.sendEmail();
	}
	else
		_callNativeFunction("sendEmail", [to, cc, subject, body], successCallback, errorCallback);
}


function getItem(key, successCallback, errorCallback)
{
    if(useAPI)
    {
        API.getItem(key);
    }
    else
        _callNativeFunction("getValue", [key], successCallback, errorCallback);
}

function setItem(key, value, successCallback, errorCallback)
{
    if(useAPI)
    {
        API.setItem(key, value);
    }
    else
        _callNativeFunction("setValue", [key, value], successCallback, errorCallback);
}

function logEvent(object, action, additionalParams, successCallback, errorCallback)
{
    if(useAPI)
    {
        API.logEvent(object, action, additionalParams);
    }
    else
        _callNativeFunction("logEvent", [object, action, additionalParams], successCallback, errorCallback);
}

function _callNativeFunction(functionName, args, successCallback, errorCallback)
{
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
}

function _createCallbackFunction (funcName, callbackFunc)
{
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
}

function _createIFrame(src)
{
    var rootElm = document.documentElement;
    var newFrameElm = document.createElement("IFRAME");
    newFrameElm.setAttribute("src",src);
    rootElm.appendChild(newFrameElm);
    return newFrameElm;
}