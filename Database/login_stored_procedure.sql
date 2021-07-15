CREATE OR ALTER PROCEDURE LoginUser

@Username varchar(30),
@IncommingPassword nvarchar(256),
@VerifiedId int OUTPUT,
@UsernameOut varchar(30) OUTPUT
AS

DECLARE @UserPassword nvarchar(256)

SELECT @UserPassword = [Password], @VerifiedId = Id, @UsernameOut = Username
	From Users
WHERE Username = @Username

IF @IncommingPassword <> @UserPassword
	SET @VerifiedId = 0