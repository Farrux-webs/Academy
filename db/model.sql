create type user_role as enum('admin', 'player', 'user');

create type player_position as enum('Hujumchi', 'Himoyachi', 'Yarim Himoyachi', 'Darvozabon');

create extension if not exists "uuid-ossp";

create table aboutus(
       about_id uuid primary key default  uuid_generate_v4(),
       about_img text default null,
       about_desc text not null,
       about_title text not null,
       about_created_at timestamp default current_timestamp
);

insert into aboutus(about_img, about_desc, about_title)values('wedwede', 'wedwdwe', 'wedweded');

create table users(
        user_id  uuid primary key default  uuid_generate_v4(),
        user_name varchar(64) not null,
        user_lastname varchar(64) not null,
        user_username varchar(32) not null,
        user_age int not null,
        user_gamenum int default null,
        user_password varchar(64) not null,
        user_position player_position default null,
        user_photo text default null,
        user_role  user_role default 'user' not null,
        user_created_at timestamp default current_timestamp,
        user_isDelete BOOLEAN NOT NULL DEFAULT FALSE,
        user_updated timestamp default null
        );

Insert into users(
       user_name, 
       user_lastname,  
       user_username,       
       user_password, 
       user_role,
       user_age

)Values(
       'Adminbek',
       'Adminov', 
       'Admin0202', 
       '$2a$12$544wVgyxIS9qEVuarAXPlOiON9ou4WH0wQmCbIkI0aV5KfmTgnRmy',
       'admin',
        15
);

       create table notifs(
              notif_id uuid primary key default  uuid_generate_v4(),
              notif_message varchar(255) not null,
              notif_created_at timestamp default current_timestamp,
              user_id uuid not null,
              foreign key(user_id)
              references users(user_id)
       );


create table news(
       news_id uuid primary key default  uuid_generate_v4(),
       news_desc text not null,
       news_title varchar(128) not null,
       news_views int default 0,
       news_created_at timestamp default current_timestamp,
       news_is_deleted BOOLEAN NOT NULL DEFAULT 'false',
       news_photo text not null,
       news_short_desc varchar(128) not null
);


Insert INto news(
       news_desc,
       news_title,
       news_views,
       news_photo,
       news_short_desc
)values(
       'wcwcwecwecewc',
       'wedcwececewcwecec',
       12,
       'wxwecwecwecwe',
       'wcwcwcwecwe'
);