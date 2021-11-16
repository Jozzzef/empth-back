CREATE DATABASE survey;

CREATE TABLE surveydata(
    id serial primary key,
    ctrl boolean,
    q1 text,
    q2 text,
    q3 text,
    q4 text,
    date_added timestamp default NULL
);
