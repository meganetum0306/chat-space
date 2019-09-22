json.user_name @message.user.name
json.data @message.created_at.strftime("%Y/%m/%d/(%a) %T")
json.content @message.content
json.image @message.image.url
json.id @message.group_id