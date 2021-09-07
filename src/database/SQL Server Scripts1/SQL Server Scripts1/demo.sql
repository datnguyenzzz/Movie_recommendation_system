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

create unique clustered index idx_movie_id
on [dbo].movie_title_view([movie_id])
go

create nonclustered index idx_movie_view
on [dbo].movie_title_view([movie_id],[avg_scores],[start_year])

--select top 21 * from [dbo].movie_title_view
--where [start_year] = N'2020'
--order by [avg_scores] desc

----------------------------------------------------------------------------------

select * from [dbo].[users.data]



			