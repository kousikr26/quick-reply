chrome.commands.onCommand.addListener(function (command) {
    console.log('Command:', command);
    if (command == "quick-reply-out"){
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { message: "reply-in" }, function (response) {
                
            });
        });
    }
    else if (command == "quick-reply-in") {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { message: "reply-out" }, function (response) {
                
            });
        });
    }
    else if (command =="send"){
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { message: "send" }, function (response) {
                
            });
        });
    }
});