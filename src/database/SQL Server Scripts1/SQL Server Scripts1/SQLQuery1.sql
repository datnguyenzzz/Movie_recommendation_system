-- Create database and logs
/*
use master;
go
if DB_ID (N'systemDB') is not null
	drop database systemDB;
go 
create database systemDB
	on (NAME = systemDBdat,
		FILENAME = 'D:\My_Code\movie_recommendation_system\src\database\DB\systemDBdat.mdf',
		SIZE = 100,
		MAXSIZE = UNLIMITED, 
		FILEGROWTH = 5)
log on (NAME = systemDBlog,
		FILENAME = 'D:\My_Code\movie_recommendation_system\src\database\DB\systemDBlog.ldf',
		SIZE = 100,
		MAXSIZE = UNLIMITED,
		FILEGROWTH = 5);
go
*/

--tables describes
--Information courtesy of IMDb
--(http://www.imdb.com).
--Used with permission.
/* 

Users.data:
[user_id]
[user_name]
[password]
[movies_saved]
[movies_liked]
[movies_disliked]
title.basics :
tconst (string) - alphanumeric unique identifier of the title
titleType (string) – the type/format of the title (e.g. movie, short, tvseries, tvepisode, video, etc)
primaryTitle (string) – the more popular title / the title used by the filmmakers on promotional materials at the point of release
originalTitle (string) - original title, in the original language
isAdult (boolean) - 0: non-adult title; 1: adult title
startYear (YYYY) – represents the release year of a title. In the case of TV Series, it is the series start year
endYear (YYYY) – TV Series end year. ‘\N’ for all other title types
runtimeMinutes – primary runtime of the title, in minutes
genres (string array) – includes up to three genres associated with the title

title.principals : 
tconst (string) - alphanumeric unique identifier of the title
ordering (integer) – a number to uniquely identify rows for a given titleId
nconst (string) - alphanumeric unique identifier of the name/person
category (string) - the category of job that person was in
job (string) - the specific job title if applicable, else '\N'
characters (string) - the name of the character played if applicable, else '\N'

title.ratings : 
tconst (string) - alphanumeric unique identifier of the title
averageRating – weighted average of all the individual user ratings
numVotes - number of votes the title has received

name.basics :
nconst (string) - alphanumeric unique identifier of the name/person
primaryName (string)– name by which the person is most often credited
birthYear – in YYYY format
deathYear – in YYYY format if applicable, else '\N'
primaryProfession (array of strings)– the top-3 professions of the person
knownForTitles (array of tconsts) – titles the person is known for
*/

use systemDB;
go


select top 7 * from [title.basics]
order by newid()
