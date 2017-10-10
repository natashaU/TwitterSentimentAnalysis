//==============================================================================
function _getDOMElement(i_sId) {
    return document.getElementById(i_sId);
}

//==============================================================================
function _getDOMGreetingContainer() {
    return document.getElementById("greetings-container");
}

//==============================================================================
function _getGreetings() {
    var l_oDomInputName = _getDOMElement("input-name"),
        l_sName = l_oDomInputName.value;

    if (l_sName) {
        _callGreetingAPI(l_sName);
    }
}

// call API to get proper greeting
//==============================================================================
function _callGreetingAPI(i_sName) {
    var l_oXHR = new XMLHttpRequest();
    l_oXHR.open("GET", "/api/greetings/" + i_sName, true);
    l_oXHR.send();
    l_oXHR.onloadend = _onGreetingReceived.bind(this, l_oXHR);
}

//==============================================================================
function _onGreetingReceived(i_oXHR) {
    var l_oDomGreeting = _getDOMElement("greetings-container");
    l_oDomGreeting.innerHTML = JSON.parse(i_oXHR.responseText);
}

//==============================================================================
function _onInputKeyDown(i_oEvt) {
    if (i_oEvt.keyCode === 13) { // enter key
        _getGreetings();
    }

    return true;
}


//==============================================================================
function _bootstrap() {
    var domInputName = _getDOMElement("input-name");
    domInputName.addEventListener("keydown", _onInputKeyDown);
    domInputName.addEventListener("blur", _getGreetings);
}

//==============================================================================
window.onload = _bootstrap;
