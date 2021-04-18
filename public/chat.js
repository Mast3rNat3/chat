
const storage=window.sessionStorage;
const storageKey="username";


document.addEventListener('DOMContentLoaded' , (event)=> {
    const log=document.getElementById("log");
    var username=storage.getItem(storageKey);
    if(!username) {
        const defaultuser="User" + performance.now();
        username= window.prompt("Please provide a username" , defaultuser);
        if (username!==defaultuser){
            storage.setItem(storageKey, username);
        }
    }
    const scrollChat=() => {
        if(log!=undefined){
            const chatHeight=log.scrollHeight;
            log.scrollTo(0, chatHeight);
    
        }
    };
    
    window.scrollChat=scrollChat;
    const insertMessage= function(message){
        log.innerHTML+=`<div class="message">
        <strong>${username}:</strong> <span>${message}</span>
    </div>`;
        scrollChat();
    };
    window.insertMessage=insertMessage;
    console.log(username);
    const message=document.getElementById("message");
    const send=document.getElementById("send");
    send.addEventListener("click", ()=>{
        insertMessage(message.value);
    });
});