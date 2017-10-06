CREATE TABLE posts (
  creation_date timestamp with time zone default now() not null,
  id serial unique not null,
  text text not null,
  user_id int not null,
  primary key (id)
);

CREATE TABLE users (
  id serial unique not null,
  name text unique not null,
  pswhash text not null,
  primary key (id, name)
);
