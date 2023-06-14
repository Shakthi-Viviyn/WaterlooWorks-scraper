
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    sendResponse('message recieved');

    const tabUrl = window.location.href;
    if (tabUrl.includes('https://waterlooworks.uwaterloo.ca/myAccount/co-op/coop-postings.htm')) {
        rowElements = document.querySelectorAll("tr");

        function extractTextFromNode(node) {
            let text = '';
        
            for (let i = 0; i < node.childNodes.length; i++) {
            const child = node.childNodes[i];
        
            if (child.nodeType === Node.TEXT_NODE) {
                text += child.textContent.trim();
            }
        
            else if (child.nodeType === Node.ELEMENT_NODE) {
                text += extractTextFromNode(child);
            }
            }
        
            return text;
        }

        for (let i=0; i < rowElements.length; i++) {
            const temp = rowElements[i].querySelector("strong");
            if ((temp != null) && (rowElements[i].querySelector("strong").innerText === "Special Job Requirements:")){

                const selectedNode = rowElements[i].querySelectorAll("td")[1].querySelector("span");
                const selectedText = extractTextFromNode(selectedNode);
                console.log(selectedText);

                const hasCanadian = /canadian citizen/i.test(selectedText);
                const hasRemote = /remote/i.test(selectedText);
                const eightMonth = /8-month work term/i.test(selectedText);
                const required = /required/i.test(selectedText);

                let message = "";
                if (hasCanadian){
                    message += "Canadian citizen";  
                }
                // if (hasRemote){
                //     message += " RemoteOption";
                // }
                if (eightMonth){
                    message += " 8-month work term";
                    if (required){
                        message += " required";
                    }else{
                        message += " preferred";
                    }
                }

                if (message){
                    // (async () => {
                    //     await chrome.runtime.sendMessage("close");
                    // })();
                    alert(message);
                }
                
            }
        }
    } 
});

(async () => {
    await chrome.runtime.sendMessage("ready");
})();

