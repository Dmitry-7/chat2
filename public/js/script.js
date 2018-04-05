function sendButtonClick(event){
	event.preventDefault();
	if (userName.value.trim()!='' && userMessage.value.trim()!=''){
		ws.send(JSON.stringify({message:userMessage.value,nickName:userName.value}));
		userMessage.value='';
	} else{
		userMessage.value='';
	}
}


function renderMessages(responseText){
	responseText.forEach( function(elem) {
		//console.log(elem);
		var newLi = document.createElement('li');
		newLi.innerHTML = elem.nickName+':'+elem.message;
		messagesWindow.appendChild(newLi);
	});
	messagesWindow.scrollTo(0,messagesWindow.scrollHeight);
}

function deleteMaxMessage(){
	var messagesItems = document.querySelectorAll('.messages li');
	if(messagesItems.length>maxNumberOfMessages){
		for(var i=0;i<(messagesItems.length-maxNumberOfMessages);i++){
			console.log(messagesItems[i].innerHTML);
			messagesItems[i].remove();
		}
	}
}

var maxNumberOfMessages = 50;
var userMessage = document.querySelector('.userMessage');
var sendButton = document.querySelector('.sendButton');
var messagesWindow = document.querySelector('.messages');
var userName = document.querySelector('.userName');

sendButton.addEventListener('click',sendButtonClick);

var ws = new WebSocket('ws://localhost:3000');

ws.onopen= function (){
	console.log('Соединение открыто');
}
ws.onclose = function(event) {
  if (event.wasClean) {
    console.log('Соединение закрыто чисто');
  } else {
    console.log('Обрыв соединения'); // например, "убит" процесс сервера
  }
  console.log('Код: ' + event.code);
};
ws.onmessage = function(response){
	console.log(response.data);
	renderMessages(JSON.parse(response.data));
	deleteMaxMessage();
}
ws.onerror = function(error){
	console.log('Ошибка' + error.message);
}

