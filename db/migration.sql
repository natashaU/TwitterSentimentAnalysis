\c tweet_analysis;
DROP TABLE IF EXISTS sentiments;


CREATE TABLE sentiments (
id SERIAL PRIMARY KEY,
twitter_handle VARCHAR(255),
positive VARCHAR (255),
negative  VARCHAR (255),
date_created TIMESTAMP NOT NULL DEFAULT NOW()
);
