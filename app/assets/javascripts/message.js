$(function(){
  function buildHTML(message){
    
    var img = message.image ? `<img src= ${ message.image }>` : "";
    var html = `<div class="chat-main__messages__message" data-id="${message.id}">
                  <div class="chat-main__messages__message__upper-info">
                    <div class="chat-main__messages__message__upper-info--talker">
                      ${message.user_name}
                    </div>
                    <div class="chat-main__messages__message__upper-info--data">
                      ${message.data}
                    </div>
                  </div>
                  <div class="chat-main__messages__message--text">
                    <p class="lower-message__content">
                      ${message.content}
                    </p>
                      ${img}
                  </div>
                </div>`
    return html;
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(message){
      var html = buildHTML(message);
      $('.chat-main__messages').append(html);
      $('#new_message')[0].reset();
      $('.chat-main__messages').animate({scrollTop: $('.chat-main__messages')[0].scrollHeight}, 'fast');
    })
    .fail(function(message){
      alert('メッセージを入力してください');
      $('.chat-main__form__new_messages--submit-btn').prop('disabled', false);
    })
    .always(function(message){
      $('.chat-main__form__new_messages--submit-btn').prop('disabled', false);
    })
  })

  var reloadMessages = function() {
    last_message_id = $('.chat-main__messages__message:last').data('id');
    $.ajax({
      url: 'api/messages',
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      var insertHTML = '';
        messages.forEach(function(message){
          insertHTML = buildHTML(message);
          $('.chat-main__messages').append(insertHTML);
          $('.chat-main__messages').animate({scrollTop: $('.chat-main__messages')[0].scrollHeight}, 'fast');
        });
      })
      .fail(function(message){
        message.alert("自動更新に失敗しました")
      });
    };
  setInterval(reloadMessages, 5000);
});