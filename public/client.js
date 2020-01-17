$(function(){
	const socket = io();
	messageContainer = document.getElementById('message_container');
    $("#send_msg").attr("disabled", true);
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
        if(email != '' && name!= '' ){
            $('#send_msg').attr("disabled", false);
        }
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
        $('#myModal').modal('show');       
        $('#chat_body').animate({scrollTop:$("div#endpoint").offset().top},500);
        return false;
    });

    

    

    appendMessage = (message) =>{
    	if(message.status!='sender' && message.status!='reciever'){
            $('#user_join').html('');
            $('#user_join').append('<p>'+message+'</p>');
            $('#user_join').show();
        }

        $('#user_join').delay(8000).fadeOut('slow');


        if(message.status=='sender'){
          $("#message_container").append('<div class="rightText"><span class="badge badge-light text-right text-wrap p-2">'  + message.data + '</span></div>');
      }

      if(message.status=='reciever')
      {
          $("#message_container").append('<div class="leftText"><span class="badge badge-secondary text-left text-wrap p-2">'  + message.data + '</span></div>');
      }
  }

  $(document).on('click', '#go_to_top',(e)=>{
   e.preventDefault();
   console.log('go top');
   $('#myModal').modal('show');            
   $('#chat_body').animate({ scrollTop: 0 }, 500);
})

})