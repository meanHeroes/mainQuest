//CLIENT SIDE

$(document).ready(function(){
    var socket = io();

    var room = $('#gameName').val();
    var sender = $('#sender').val();

    socket.on('connect', function (){
        //console.log('User connected = true');

        var params = {
            room: room,
            name: sender
        }
        socket.emit('join', params, function() {
            //console.log('User has joined this channel');
        });
    });

    socket.on('usersList', function(users){
        var ol = $('<ol></ol>');

        for(var i = 0; i < users.length; i++){
            ol.append('<p><a id="val" data-toggle="modal" data-target="#myModal">'+users[i]+'</a></p>');
        }



        $('#numValue').text('('+users.length+')');
        $('#users').html(ol);
    });

    socket.on('newMessage', function(data){
        var template = $('#message-template').html();
        var message = Mustache.render(template, {
            text: data.text,
            sender: data.sender
        });
        
        $('#messages').append(message);
    });

    $('#message-form').on('submit', function(e){
        e.preventDefault();

        var msg = $('#msg').val();

        socket.emit('createMessage', {
            text: msg,
            room: room,
            sender: sender
        }, function(){
            $('#msg').val('');
        });
    });
});