----------------------------------------------------------------------------------------------
-- cria a tabela Usuario
-- drop table Usuario
if not exists(select * from INFORMATION_SCHEMA.tables where TABLE_NAME = 'Usuario')
begin
create table Usuario
(
	UsuarioID int identity not null,
	Nome nvarchar(50),
	Email nvarchar(50),
	Senha nvarchar(50),
	constraint PK_Usuario primary key(UsuarioID)
)
end
go

----------------------------------------------------------------------------------------------
-- ListarUsuario
if OBJECT_ID('ListarUsuario') is not null
begin
	drop procedure ListarUsuario
end
go  
Create Procedure ListarUsuario   
as     
Begin    
	Select * from Usuario;
End  
go
----------------------------------------------------------------------------------------------
--Insert e Update na tabela Usuario
if OBJECT_ID('InsertUpdateUsuario') is not null
begin
	drop procedure InsertUpdateUsuario
end
go  
 
Create Procedure InsertUpdateUsuario    
(    
@Id integer,    
@Nome nvarchar(50),    
@Email nvarchar(50),
@Senha nvarchar(50),     
@Action varchar(10)    
)    
As    
Begin    
if @Action='Insert'    
Begin    
 Insert into Usuario(Nome, Email, Senha) values(@Nome, @Email, @Senha);    
End    
if @Action='Update'    
Begin    
 Update Usuario set Nome = @Nome, Email = @Email, Senha = @Senha where UsuarioID = @Id;    
End      
End  
go

----------------------------------------------------------------------------------------------
--Delete Usuario  
if OBJECT_ID('DeleteUsuario') is not null
begin
	drop procedure DeleteUsuario
end
go  
Create Procedure DeleteUsuario   
(    
 @Id integer    
)    
as     
Begin    
 Delete Usuario where UsuarioID = @Id;    
End