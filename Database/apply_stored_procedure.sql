CREATE OR ALTER PROCEDURE ApplyCheck

@JobName varchar(30),
@VerifiedId int OUTPUT,
@JobNameOut varchar(30) OUTPUT
AS

DECLARE @JobNameInDatabase nvarchar(30)

SELECT @JobNameInDatabase = JobName, @VerifiedId = JobApplicationsId, @JobNameOut = JobName
    From ApplyJob
WHERE JobName = @JobName

IF @JobNameInDatabase <> @JobName 
    SET @VerifiedId = 0