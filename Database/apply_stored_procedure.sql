CREATE OR ALTER PROCEDURE ApplyCheck

@JobName varchar(30),
@VerifiedId int OUTPUT,
@JobNameOut varchar(30) OUTPUT,
@JobApplicationTitleOut varchar(30) OUTPUT
AS

DECLARE @JobApplicationTitle nvarchar(30)

SELECT @VerifiedId = JobApplicationsId, @JobNameOut = JobName, @JobApplicationTitle = JobApplication.Columns.JobTitle
    From ApplyJob
WHERE JobName = @JobName 

IF @JobName <> @JobApplicationTitle
    SET @VerifiedId = 0