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
       'Admin001', 
       '$2a$12$Y1oTrfmr/zm4PwFIT9Tv.u.JZgVT9N76Eir/G0xEtReTPJKOfkTnS',
       'admin',
        15
);

-- password: reitmanz




-- create table players(
--        player_id  uuid primary key default  uuid_generate_v4(),
--        player_number int  not null,
--        player_firstname text not null,
--        player_lastname text not null,
--        player_age int not null,
--        player_position player_position not null,
--        player_photo text
-- );


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