json.array! @messages do |message|
  json.content message.content
  json.image message.image.url
  json.data message.created_at.strftime("%Y/%m/%d/(%a) %T")
  json.user_name message.user.name
  json.id message.id
end