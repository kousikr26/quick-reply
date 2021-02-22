console.log("On WhatsApp");

var clickEvent = document.createEvent('MouseEvents');
clickEvent.initEvent('dblclick', true, true);

allMessagesIn = document.getElementsByClassName("message-in");
n = allMessagesIn.length;
allMessagesOut = document.getElementsByClassName("message-out");
m = allMessagesOut.length;

document.addEventListener("keyup", function (event) {
    if (event.code == "Enter") {
        allMessagesIn = document.getElementsByClassName("message-in");
        n= allMessagesIn.length;
        allMessagesOut = document.getElementsByClassName("message-out");
        m = allMessagesOut.length;
    }

    else if (event.code =="Escape"){
        allMessagesIn = document.getElementsByClassName("message-in");
        n = allMessagesIn.length;
        allMessagesOut = document.getElementsByClassName("message-out");
        m = allMessagesOut.length;
    }
});

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {

        console.log(request.message);
        
        if(request.message=="reply-in"){
            var elem = allMessagesIn[n - 1];
            if (elem === undefined ) {
                allMessagesIn = document.getElementsByClassName("message-in");
                n = allMessagesIn.length;
               
                elem = allMessagesIn[n - 1];
            }
            elem.dispatchEvent(clickEvent);

            n -= 1;
        }
        else if(request.message == "reply-out"){
            console.log("out triggered");
            var elem = allMessagesOut[m - 1];
            if (elem === undefined) {
                
                allMessagesOut = document.getElementsByClassName("message-out");
                m = allMessagesOut.length;
                elem = allMessagesOut[m - 1];
            }
            elem.dispatchEvent(clickEvent);

            m -= 1;
        }
        
        sendResponse({ success: "true" });
        
        
    }
);