$(function() {
  var user_list = $("#user-search-result");

  function appendUsers(user){
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.name}</p>
                  <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
                </div>`
    user_list.append(html);
  }

  function appendNoUser(msg) {
    var html = 
      `<div class="chat-group-user clearfix">
        <p class="chat-group-user__name">${msg}</p>
      </div>`
      user_list.append(html);
  }

  function addUsers(id,name){
    var html = `<div class='chat-group-user'>
                  <input name='group[user_ids][]' type='hidden' value='${id}'>
                  <p class='chat-group-user__name'>${name}</p>
                  <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
                </div>`
  return html;
  }
  
  $("#user-search-field").on("keyup", function() {
    var input = $("#user-search-field").val();

    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })

    .done(function(users){
      $("#user-search-result").empty();
      if (users.length !== 0) {
        users.forEach(function (user) {
          appendUsers(user);
        });
      }

      else {
        appendNoUser("一致するユーザーが見つかりません");
      }
    
    })

    .fail(function(users){
      alert('ユーザー検索に失敗しました');
    });
  });

  $("#user-search-result").on('click','.user-search-add', function() {
    $(this).parent().remove();
      var id = $(this).data('user-id');
      var name = $(this).data("user-name")
      var html = addUsers(id,name)
    $(`#chat-group-users`).append(html);
  });

  $("#chat-group-users").on("click",".user-search-remove", function(){
    $(this).parent().remove();
  })
});