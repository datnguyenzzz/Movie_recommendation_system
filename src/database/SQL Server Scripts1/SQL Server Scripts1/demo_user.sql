use systemDB
go 
if OBJECT_ID(N'insert_userdata_trigger',N'TR') is not null
	drop trigger insert_userdata_trigger
go

create trigger insert_userdata_trigger 
on [dbo].[users.data] 
instead of insert 
as 
	begin
		if exists(select top 1 i.[user_name] 
		          from inserted as i 
				  where i.[user_name] 
				  in (select [user_name] from [dbo].[users.data]))
			begin 
				exec sp_addmessage 50001, 15,N'User_name exist',@lang = 'us_english', @replace='REPLACE';
				RAISERROR(50001,15,-1)
			end
		else
			begin
				insert into [dbo].[users.data] ([user_id], [user_name], [password])
				select CONVERT(nvarchar(100), NEWID()), i.[user_name], i.[password] 
				from inserted as i
			end
		
	end
go

use systemDB
go 

if OBJECT_ID(N'insert_saved_movie_trigger',N'TR') is not null
	drop trigger insert_saved_movie_trigger
go

create trigger insert_saved_movie_trigger
on [dbo].[saved_movies] 
instead of insert 
as 
	begin
		if exists (select top 1 * 
				   from inserted as i 
				   inner join [dbo].[saved_movies] as mov 
				   on i.[user_id] = mov.[user_id] and i.[movie_id] = mov.[movie_id])
			begin
				exec sp_addmessage 50001, 15,N'Movie had been saved',@lang = 'us_english', @replace='REPLACE';
				delete from [dbo].[saved_movies]
				where exists (
					select * 
					from inserted as i 
					where i.[user_id] = [saved_movies].[user_id] 
					and i.[movie_id] = [saved_movies].[movie_id]
				)
			end 
		else
			begin
				exec sp_addmessage 50001, 15,N'Add movie to saved list',@lang = 'us_english', @replace='REPLACE';
				insert into [dbo].[saved_movies] ([user_id], [movie_id])
				select top 1 i.[user_id], i.[movie_id] 
				from inserted as i
			end
	end

insert into [dbo].[saved_movies] values (N'OHqqldr2uJMlwp2l', N'tt1213593')

select * from [dbo].[saved_movies]
where[user_id] = N'OHqqldr2uJMlwp2l'