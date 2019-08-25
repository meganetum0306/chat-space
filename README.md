## usersテーブル
|Column|Type|Options|
|------|----|-------|
|name|varchar(50)|null: false|
|email|string|add_index :users, :email, unique: true|
|password|char(8)|add_index :users, :password, unique: true|

### Association
- has_many :messages
- has_many :groups
- has_many :groups_users

## groupsテーブル
|Column|Type|Options|
|------|----|-------|
|title|varchar(255)|null: false|

### Association
- belongs_to :user
- has_many :messages
- has_many :groups_users

## messagesテーブル
|Column|Type|Options|
|------|----|-------|
|body|text|null: false|
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