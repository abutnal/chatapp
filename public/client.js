$(function(){
	const socket = io();
	messageContainer = document.getElementById('message_container');
	socket.on('chat-message', data=>{
		// console.log(data);
		// appendMessage(`${data.name}: ${data.message}`);
		appendMessage({status:'reciever',data:data.message});
	});

	socket.on('user-connected', name=>{
		appendMessage(`${name} connected`);
	})

	socket.on('user-disconnected', name=>{
        if(name!=null){
		appendMessage(`${name} disconnected`);
        }
	})
	

    // const name = prompt('What is your name');
    $('#saveName').submit(()=>{
    	var name = $('#name').val();
    	var email = $('#email').val();
    	// console.log(email);
    	appendMessage(`You joined`);
    	socket.emit('new-user', name);
    	socket.emit('user-email', email, name);
    	return false;
    })

    $('#chatForm').submit(function(){
    	var msg  = $('#message').val();
    	appendMessage({status:'sender', data:msg});
    	socket.emit('send-chat-message', msg);
    	$('#message').val('');

    	return false;
    });


    

    appendMessage = (message) =>{
    	if(message.status!='sender' && message.status!='reciever'){
    		$('#user_join').append('<p>'+message+'</p>');
    	}

    	if(message.status=='sender'){
    		$("#message_container").append('<div class="rightText"><span class="badge badge-light text-right text-wrap p-2">'  + message.data + '</span></div>');

    	}

    	if(message.status=='reciever')
    	{
    		$("#message_container").append('<div class="leftText"><span class="badge badge-secondary text-left text-wrap p-2">'  + message.data + '</span></div>');
    	}


    }

})