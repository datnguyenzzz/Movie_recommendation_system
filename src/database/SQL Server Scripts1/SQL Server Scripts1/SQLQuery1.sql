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

/*
insert into [Users.data]([user_id],[user_name],[password],[movies_saved],[movies_liked],[movies_disliked]) 
values ('11meme11','thanhdat','123123','','','')
go*/ 


select * from [Users.data]
where [user_name] = N'datnnt'


select * from [Users.data];

/*
select top 10 *
from [title.basics] as basics 
inner join [title.ratings] ratings
on ratings.tconst = basics.tconst
where (basics.startYear<>N'\N' and cast(basics.startYear as int) >= 2020 )
order by ratings.averageRating * 8000 + ratings.numVotes desc
*/

/*
select top 21 ratings.[tconst],[primaryTitle]
from [title.ratings] as ratings
inner join [title.basics] basics
on basics.[tconst] = ratings.[tconst]
and cast([averageRating] as int) >= 6 and cast([numVotes] as int) > 50000
and basics.startYear<>N'\N' and (cast(basics.startYear as int) = 2019)
order by ratings.averageRating desc
*/

/*
select top 21 ratings.[tconst],[primaryTitle]
from [title.ratings] as ratings
inner join [title.basics] basics
on basics.[tconst] = ratings.[tconst]
and cast([numVotes] as int) > 230000
order by ratings.averageRating desc

*/
/*
delete from [title.principals] 
where [tconst] not in (select [tconst] from [title.basics])
*/

/*
delete from [title.ratings] 
where [tconst] not in (select [tconst] from [title.basics])
*/
/*
delete from [name.basics]
where [nconst] not in (select [nconst] from [title.principals]) 
*/
/*
select count(*) from [title.basics]
select count(*) from [title.principals]
select count(*) from [title.ratings]
select count(*) from [name.basics]
*/
/*
select * 
from [title.principals] as principals 
left join [title.basics] basics 
on principals.tconst = basics.tconst
*/

/*
delete from [title.basics]
where startYear=N'\N' or cast(startYear as int) <= 2018
*/

/*
select [originalTitle], [isAdult],[startYear], [runtimeMinutes], [genres],
[averageRating], [numVotes]
from [title.basics] as basics 
inner join [title.ratings] ratings
on basics.tconst = N'tt7395114' and basics.tconst = ratings.tconst
*/

/*
select principals.[nconst], [category], [characters], [primaryName]
from [title.principals] as principals 
inner join [name.basics] namebasics
on principals.tconst = N'tt7395114' and principals.[nconst] = namebasics.nconst
*/



/*SELECT * from [title.episode];*/

/*
create table Originals (
	[Name] varchar(50) primary key not null,
	ISBN varchar(20) not null,
	Title varchar(50) not null,
	Author varchar(20) not null
);
go

insert into Originals(Name,ISBN,Title,Author)
	values ('The witcher 1','1232412554','The Last Wish','Andrzej Sapkowski')
go

insert into Originals(Name,ISBN,Title,Author)
	values ('The witcher 2','1274384781','Blood of Elves','Andrzej Sapkowski')
go

insert into Originals(Name,ISBN,Title,Author)
	values ('The witcher 3','1238977843','Baptism of Fire','Andrzej Sapkowski')
go

select * from Originals
go

create table B2 (
	[Name] varchar(50) primary key not null,
);
go

insert into B2(Name)
	values ('The witcher 1')
go

select * from B2
go

delete from Originals 
where [Name] not in (select [Name] from B2)

select * from Originals
go
*/