require('../config.js');
require('dotenv').config();
console.log(process.env);
const pgp = require('pg-promise')();

console.log(`process.env.DB_URL ${process.env.DB_URL}`);
db = pgp(process.env.DB_URL);

const schemaSql = `
    -- Extensions
    CREATE EXTENSION IF NOT EXISTS pg_trgm;

    -- Drop (droppable only when no dependency)
    DROP TABLE IF EXISTS users;
    DROP TABLE IF EXISTS songs;
    DROP TABLE IF EXISTS friends;
    DROP TABLE IF EXISTS timelines;
    DROP TABLE IF EXISTS playlists;
    DROP TABLE IF EXISTS playlists_owners;
    DROP TABLE IF EXISTS playlists_songs;
    DROP TABLE IF EXISTS story;

    -- Create
    CREATE TABLE users (
        user_id              serial PRIMARY KEY NOT NULL,
        username             text NOT NULL,
        password             text NOT NULL,
        profile_pic          text NOT NULL
    );

    CREATE TABLE songs (
        song_id              serial PRIMARY KEY NOT NULL,
        songname             text NOT NULL,
        artist               text NOT NULL
    );

    CREATE TABLE friends (
        friend_id            serial PRIMARY KEY NOT NULL,
        user1_id             integer NOT NULL,
        user2_id             integer NOT NULL
    );

    CREATE TABLE timelines (
        timeline_id          serial PRIMARY KEY NOT NULL,
        user_id              integer NOT NULL,
        song_id              integer NOT NULL,
        timestamp            integer NOT NULL
    );

    CREATE TABLE playlists (
        playlist_id          serial PRIMARY KEY NOT NULL,
        playlistname         text NOT NULL
    );

    CREATE TABLE playlists_owners (
        playlists_owners_id  serial PRIMARY KEY NOT NULL,
        playlist_id          integer NOT NULL,
        user_id              integer NOT NULL
    );

    CREATE TABLE playlists_songs (
        playlists_songs_id   serial PRIMARY KEY NOT NULL,
        playlist_id          integer NOT NULL,
        song_id              integer NOT NULL
    );

    CREATE TABLE story (
        stories_id   serial PRIMARY KEY NOT NULL,
        song_id              integer NOT NULL
    );
`;

const dataSql = `
    -- Populate dummy users
    INSERT INTO users (username, password, profile_pic)
    VALUES ('Crystal', '0000', 'images/user_pfp1.jpg');
    INSERT INTO users (username, password, profile_pic)
    VALUES ('Kelvin', '1234', 'images/user_pfp1.jpg');
    INSERT INTO users (username, password, profile_pic)
    VALUES ('li3', '1133', 'images/user_pfp1.jpg');
    INSERT INTO users (username, password, profile_pic)
    VALUES ('Cody', '7777', 'images/user_pfp1.jpg');
    INSERT INTO users (username, password, profile_pic)
    VALUES ('Nevkiw', '64564', 'images/user_pfp1.jpg');

    -- Populate dummy songs
    INSERT INTO songs (songname, artist)
    VALUES ('Anaconda', 'Nicki Minaj');
    INSERT INTO songs (songname, artist)
    VALUES ('Side by Side', 'Ariana Grande');
    INSERT INTO songs (songname, artist)
    VALUES ('Lemon', '米津玄師');
    INSERT INTO songs (songname, artist)
    VALUES ('Night Dancer', 'Imase');

    -- Populate dummy friends
    INSERT INTO friends (user1_id, user2_id)
    VALUES (1, 2);
    INSERT INTO friends (user1_id, user2_id)
    VALUES (2, 3);
    INSERT INTO friends (user1_id, user2_id)
    VALUES (3, 1);
    INSERT INTO friends (user1_id, user2_id)
    VALUES (4, 5);

    -- Populate dummy timelines
    INSERT INTO timelines (user_id, song_id, timestamp)
    VALUES (1, 2, 50000);
    INSERT INTO timelines (user_id, song_id, timestamp)
    VALUES (2, 1, 52000);
    INSERT INTO timelines (user_id, song_id, timestamp)
    VALUES (1, 3, 54000);
    INSERT INTO timelines (user_id, song_id, timestamp)
    VALUES (3, 1, 58000);

    -- Populate dummy playlists
    INSERT INTO playlists (playlistname)
    VALUES ('西洋音樂');
    INSERT INTO playlists (playlistname)
    VALUES ('東洋音樂');
    
    -- Populate dummy playlists_owners
    INSERT INTO playlists_owners (playlist_id, user_id)
    VALUES (1, 1);
    INSERT INTO playlists_owners (playlist_id, user_id)
    VALUES (1, 2);
    INSERT INTO playlists_owners (playlist_id, user_id)
    VALUES (2, 3);

    -- Populate dummy playlists_songss
    INSERT INTO playlists_songs (playlist_id, song_id)
    VALUES (1, 1);
    INSERT INTO playlists_songs (playlist_id, song_id)
    VALUES (1, 2);
    INSERT INTO playlists_songs (playlist_id, song_id)
    VALUES (2, 3);
    INSERT INTO playlists_songs (playlist_id, song_id)
    VALUES (2, 4);
`;

db.none(schemaSql)
  .then(() => {
    console.log('Schema created');
    db.none(dataSql).then(() => {
      console.log('Data populated');
      pgp.end();
    });
  })
  .catch((err) => {
    console.log('Error creating schema', err);
});
