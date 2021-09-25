use systemDB
go

--if OBJECT_ID (N'Celebrities', N'U') is not null
--	drop table Celebrities;
--go

--create table Celebrities (
--	[celeb_id] varchar(50) primary key not null,
--	[primary_name] varchar(100) not null,
--	[birth_year] varchar(20) null,
--	[death_year] varchar(20) null
--);
--go

--insert into Celebrities([celeb_id], [primary_name], [birth_year], [death_year])
--select nconst, primaryName, birthYear, deathYear 
--from [dbo].[name.basics]
--go

--select top 20 * from [dbo].[Celebrities]

--select top 10 * from [dbo].[name.basics]
--go

---------------------------------------------------------------------------------

--if OBJECT_ID (N'Movie', N'U') is not null
--	drop table Movie;
--go

--create table Movie (
--	[movie_id] varchar(50) primary key not null,
--	[original_type] varchar(MAX) not null,
--	[is_adult] varchar(20) null,
--	[start_year] varchar(20) null,
--	[end_year] varchar(20) null, 
--	[runtime] varchar(20) null
--);
--go

--insert into Celebrities([celeb_id], [primary_name], [birth_year], [death_year])
--select nconst, primaryName, birthYear, deathYear 
--from [dbo].[name.basics]
--go

--insert into Movie(movie_id, original_type, is_adult, start_year, end_year, runtime)
--select tconst, primaryTitle, isAdult, startYear, endYear, runtimeMinutes 
--from [dbo].[title.basics]
--go

--select top 20 * from Movie
--go

--------------------------------------------------------------------------------

--create table Movie_genres (
--	[movie_id] varchar(50) not null,
--	constraint FK_movie foreign key ([movie_id]) references Movie(movie_id),
--	[genres_type] varchar(200) null
--);
--go

--insert into Movie_genres(movie_id,[genres_type])
--select tconst, genres 
--from [dbo].[title.basics]
--go

--select * from Movie_genres
--go

--select top 20 tconst,primaryTitle,genres from [title.basics]
--go

--------------------------------------------------------------------------------
--create table Movie_directors (
--	movie_id varchar(50) not null, 
--	celeb_id varchar(50) not null, 
--	constraint FK_movie_dir foreign key ([movie_id]) references Movie(movie_id),
--	constraint FK_celeb foreign key (celeb_id) references Celebrities(celeb_id),
--)

--insert into Movie_directors(movie_id,celeb_id)
--select tconst, nconst 
--from [dbo].[title.principals]
--where category = N'director'
--go

--select top 20 * from Movie_directors
--go

--select category from [dbo].[title.principals]
--group by category
--go

--select top 20 * from [dbo].[title.principals]
--where category = N'director'
--go
------------------------------------------------------------
--create table Movie_rating (
--	[movie_id] varchar(50) not null,
--	constraint FK_movie_rate foreign key ([movie_id]) references Movie(movie_id),
--	[average_rating] float null, 
--	[num_votes] int null
--);
--select top 20 * from [dbo].[title.ratings]
--go

--insert into Movie_rating(movie_id,average_rating, num_votes)
--select tconst, averageRating, numVotes 
--from [dbo].[title.ratings]
--go

--select top 20 * from Movie_rating 
------------------------------------------------------------

--create table Movie_actor (
--	movie_id varchar(50) not null, 
--	celeb_id varchar(50) not null, 
--	constraint FK_m_actor foreign key ([movie_id]) references Movie(movie_id),
--	constraint FK_c_actor foreign key (celeb_id) references Celebrities(celeb_id)
--)

--insert into Movie_actor(movie_id,celeb_id)
--select tconst, nconst 
--from [dbo].[title.principals]
--where category = N'actor' or category = N'actress'
--go

--select top 10 * from Movie_actor