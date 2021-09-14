use systemDB 
go 

--select top 100 * from [dbo].[title.basics] 
--go

if OBJECT_ID(N'dbo.movie_title_view',N'V') is not null
	drop view [dbo].[movie_title_view]
go

create view dbo.movie_title_view (
	[movie_id],[original_type],[is_adult],
	[start_year],[end_year],[runtime],
	[num_votes], [avg_scores]
)
with schemabinding 
as 
	select 
		title.tconst as [movie_id], title.primaryTitle as [original_type],
		title.isAdult as [is_adult], title.startYear as [start_year], title.endYear as [end_year], 
		title.runtimeMinutes as [runtime], 
		rating.averageRating as [avg_scores], rating.numVotes as [num_votes] 
	from [dbo].[title.basics] as title
	inner join [dbo].[title.ratings] rating
	on title.[tconst] = rating.[tconst]
go

if object_id(N'idx_movie_view',N'I') is not null
	drop index idx_movie_view on dbo.[movie_title_view]
go

if object_id(N'idx_movie_id',N'I') is not null
	drop index idx_movie_id on dbo.[movie_title_view]
go

--if object_id(N'idx_recommend',N'I') is not null
--	drop index idx_recommend on dbo.[recommendation]
--go

create unique clustered index idx_movie_id
on [dbo].movie_title_view([movie_id])
go

create nonclustered index idx_movie_view
on [dbo].movie_title_view([movie_id],[start_year])
include([original_type],[is_adult],[num_votes],[runtime],[avg_scores])
go

--GET MOVIE BY ID
--select * from [dbo].movie_title_view
--where [movie_id] = N'tt6723592'

--GET MOVIE BY YEAR
--select top 21 * from [dbo].movie_title_view
--where [start_year] = N'2020'
--order by [avg_scores] desc

--GET RECOMMENDATION LIST
--select title.[movie_id], title.original_type, title.avg_scores
--from [dbo].[movie_title_view] as title 
--inner join [dbo].[recommendation] as recommended 
--on title.movie_id = recommended.movie_id
--where recommended.user_id = N'OHqqldr2uJMlwp2l'

--select top 20 * from [dbo].[title.principals]
--select top 20 * from [dbo].[name.basics]

if object_id(N'dbo.celeb_view',N'V') is not null
	drop view [dbo].[celeb_view] 
go 

create view [dbo].[celeb_view] (
	 rid, movie_id, [name], [birth_year], [death_year], [role], [character_name]
)
with schemabinding 
as 
	select 
		prins.tconst as movie_id,
		bname.primaryName as [name], bname.birthYear as [birth_year], bname.deathYear as [death_year],
		prins.category,prins.characters as [character_name]
	from [dbo].[title.principals] as prins 
	inner join [dbo].[name.basics] as bname 
	on prins.nconst = bname.nconst
go

--GET ALL CELEBS
--select * from [dbo].celeb_view
--where [movie_id] = N'tt6723592'

-- GET and DELETE FROM TABLE 
--select [user_id],[user_name],[password] from [dbo].[users.data]
--where [user_id] = N'OHqqldr2uJMlwp2l'

--select * from [dbo].[dislike_action]
--where [user_id] = N'OHqqldr2uJMlwp2l'