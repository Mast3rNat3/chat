
const storage=window.sessionStorage;
const storageKey="username";


document.addEventListener('DOMContentLoaded' , (event)=> {
    console.log(io);
    const socket = io("http://localhost:3005/");
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
    

    const insertMessage= function(message, shouldScroll= true){
        log.innerHTML+=`<div class="message">
        <strong>${message.username}:</strong> <span>${message.message}</span>
    </div>`;
        if (shouldScroll){
            scrollChat();
        }
    };


    const message=document.getElementById("message");
    const send=document.getElementById("send");

    socket.on("connect", () => {
        console.log(socket.id); // x8WIv7-mJelg7on_ALbx
        socket.on("chatLog", (data)=>{
            console.log(data);
            log.innerHTML= "";
            for(let i= 0;i<data.length; i++){
                // if data.length == 10, this block runs 10 times
                const message= data[i];
                const shouldScroll= i === data.length-1;
                insertMessage(message, shouldScroll);
            }
        });
        socket.on("messageReceived", (data)=>{
            console.log("messageReceived",data);
            insertMessage(data);
        })
    });

    send.addEventListener("click", ()=>{
        // insertMessage(message.value);
        socket.emit("sendMessage", {
            message: message.value,
            username: username
        });
        message.value="";
    }); 

});
