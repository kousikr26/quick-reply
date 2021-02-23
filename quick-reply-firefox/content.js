console.log("On WhatsApp");

var clickEvent = document.createEvent('MouseEvents');
clickEvent.initEvent('dblclick', true, true);
window.InputEvent = window.Event || window.InputEvent;

var inputEvent = new InputEvent('input', {
    bubbles: true
});
var emojis = { "1": "😂", "2": "❤️", "3": "🙂", "4": "😢", "5": "😏", "6": "🥺", "7": "🥳", "8": "😘", "9": "😊", "0": "🤤" };

var allMessagesIn, allMessagesOut, n, m;
var replying = false;


function getIn() {
    allMessagesIn = document.getElementsByClassName("message-in");
    n = allMessagesIn.length;
}
function getOut() {
    allMessagesOut = document.getElementsByClassName("message-out");
    m = allMessagesOut.length;
}
function changedChat() {
    temp = document.getElementsByClassName("message-in");
    if (temp.length > 0 && typeof (allMessagesIn) != "undefined" && allMessagesIn.length > 0 && temp[0] != allMessagesIn[0]) {
        getIn();
        getOut();
        replying = false;
    }
}
var textbox;
document.addEventListener("keydown", function (event) {
    if (event.code == "Enter") {
        getIn();
        getOut();
        replying = false;
    }

    else if (event.code == "Escape") {
        getIn();
        getOut();
        replying = false;
    }
    else if (event.altKey) {
        if (event.key in emojis) {
            footer = document.getElementsByTagName("footer")
            if (footer.length > 0) {
                textbox = footer[0].getElementsByClassName("selectable-text");
                if (textbox.length > 0) {
                    textbox = textbox[0];
                }
            }

            event.preventDefault();
            console.log("Pressed " + emojis[event.key]);

            textbox.textContent += emojis[event.key];

            textbox.dispatchEvent(inputEvent);
            document.execCommand('selectAll', false, null);
            document.getSelection().collapseToEnd();


        }
    }

});

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {

        console.log(request.message);

        if (request.message == "reply-in") {
            changedChat();
            if (!replying) {
                getIn();
                getOut();
                replying = true;
            }
            n -= 1
            var elem = allMessagesIn[n];
            if (elem === undefined) {
                getIn();
                getOut();
                n -= 1
                elem = allMessagesIn[n];

            }
            elem.dispatchEvent(clickEvent);


        }
        else if (request.message == "reply-in-back") {
            changedChat();
            if (!replying) {
                return;
            }
            n += 1
            var elem = allMessagesIn[n];
            if (elem === undefined) {
                getIn();
                getOut();
                n += 1
                elem = allMessagesIn[n];

            }
            elem.dispatchEvent(clickEvent);


        }
        else if (request.message == "reply-out") {
            changedChat();
            if (!replying) {
                getIn();
                getOut();
                replying = true;
            }
            m -= 1
            var elem = allMessagesOut[m];
            if (elem === undefined) {
                getIn();
                getOut();
                m -= 1
                elem = allMessagesOut[m];

            }
            elem.dispatchEvent(clickEvent);


        }
        else if (request.message == "reply-out-back") {
            changedChat();
            if (!replying) {
                return;
            }
            m += 1
            var elem = allMessagesOut[m];
            if (elem === undefined) {
                getIn();
                getOut();
                m += 1
                elem = allMessagesOut[m];

            }
            elem.dispatchEvent(clickEvent);


        }

        sendResponse({ success: "true" });


    }
);