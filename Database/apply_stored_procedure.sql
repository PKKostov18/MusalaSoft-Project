CREATE OR ALTER PROCEDURE ApplyCheck

@JobName varchar(30),
@JobApplicationTitle varchar(30),
@VerifiedId int OUTPUT,
@JobNameOut varchar(30) OUTPUT
AS

DECLARE @JobNameInDatabase nvarchar(30)

SELECT @JobNameInDatabase = JobTitle, @VerifiedId = JobApplicationsId, @JobNameOut = JobTitle
    From JobApplication
WHERE JobName = @JobName

IF @JobNameInDatabase <> @JobName 
    SET @VerifiedId = 0