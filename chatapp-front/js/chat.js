const eventSource = new EventSource("http://localhost:8080/sender/min/receiver/jun");

eventSource.onmessage = (event) => {
    console.log(1, event);
    const data = JSON.parse(event.data);
    console.log(2, data);
    initMessage(data);
}


function getSendMsgBox(msg, time) {
    return `<div class="sent_msg">  
    <p>${msg}</p>    
    <span class="time_date">${time}</span>
</div>`;
}

function initMessage(data) {
    // alert("클릭됨");
    let chatBox = document.querySelector("#chat-box");
    let msgInput = document.querySelector("#chat-outgoing-msg");

    // alert(msgInput.value);

    let chatOutgoingBox = document.createElement("div");
    chatOutgoingBox.className = "outgoing_msg";
    
    let day = data.createdAt.substring(5, 10);
    let timeHM = data.createdAt.substring(11, 16);

    let dayTime = day + " | " + timeHM;
    
    chatOutgoingBox.innerHTML = getSendMsgBox(data.msg, dayTime);
    chatBox.append(chatOutgoingBox);
    msgInput.value = "";
}

async function addMessage() {
    // alert("클릭됨");
    let chatBox = document.querySelector("#chat-box");
    let msgInput = document.querySelector("#chat-outgoing-msg");

    // alert(msgInput.value);

    let chatOutgoingBox = document.createElement("div");
    chatOutgoingBox.className = "outgoing_msg";

    let date = new Date();
    let now = date.getHours() + ":" + date.getMinutes() + " | " + date.getMonth() + "/" + date.getDate();

    let chat = {
        sender: "min",
        receiver: "jun",
        msg: msgInput.value
    };

    let response = await fetch("http://localhost:8080/chat", {
        method: "post", //http post 메서드
        body: JSON.stringify(chat), //JavaScriptObject -> JSON
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        }
    });

    console.log(response);

    let parseResponse = await response.json();

    console.log(parseResponse);
    
    chatOutgoingBox.innerHTML = getSendMsgBox(msgInput.value, now);
    chatBox.append(chatOutgoingBox);
    msgInput.value = "";
}

document.querySelector("#chat-send").addEventListener("click", ()=>{
    addMessage();
});

document.querySelector("#chat-outgoing-msg").addEventListener("keydown", (e)=>{
    console.log(e.keyCode);
    if(e.keyCode === 13) {
        addMessage();
    }
});