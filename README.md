## usersテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false|
|email|string|add_index :users, :email, unique: true|
|password|char(8)|add_index :users, :password, unique: true|

### Association
- has_many :messages
- has_many :groups
- has_many :groups, through: :groups_users

## groupsテーブル
|Column|Type|Options|
|------|----|-------|
|name|varchar(255)|null: false|

### Association
- belongs_to :user
- has_many :messages
- has_many :users, through: :groups_users

## messagesテーブル
|Column|Type|Options|
|------|----|-------|
|body|text|
|image|string|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user

## groups_usersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user