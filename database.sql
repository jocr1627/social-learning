CREATE TABLE users (
  id serial unique not null,
  name text unique not null,
  pswhash text not null,
  primary key (id, name)
);
