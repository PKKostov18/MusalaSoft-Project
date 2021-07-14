USE [master]
GO
/****** Object:  Database [MusalaSoft-Internship]    Script Date: 14.7.2021 г. 21:12:36 ******/
CREATE DATABASE [MusalaSoft-Internship]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'MusalaSoft-Internship', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.SQLEXPRESS\MSSQL\DATA\MusalaSoft-Internship.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'MusalaSoft-Internship_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.SQLEXPRESS\MSSQL\DATA\MusalaSoft-Internship_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [MusalaSoft-Internship].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [MusalaSoft-Internship] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [MusalaSoft-Internship] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [MusalaSoft-Internship] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [MusalaSoft-Internship] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [MusalaSoft-Internship] SET ARITHABORT OFF 
GO
ALTER DATABASE [MusalaSoft-Internship] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [MusalaSoft-Internship] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [MusalaSoft-Internship] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [MusalaSoft-Internship] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [MusalaSoft-Internship] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [MusalaSoft-Internship] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [MusalaSoft-Internship] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [MusalaSoft-Internship] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [MusalaSoft-Internship] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [MusalaSoft-Internship] SET  DISABLE_BROKER 
GO
ALTER DATABASE [MusalaSoft-Internship] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [MusalaSoft-Internship] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [MusalaSoft-Internship] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [MusalaSoft-Internship] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [MusalaSoft-Internship] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [MusalaSoft-Internship] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [MusalaSoft-Internship] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [MusalaSoft-Internship] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [MusalaSoft-Internship] SET  MULTI_USER 
GO
ALTER DATABASE [MusalaSoft-Internship] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [MusalaSoft-Internship] SET DB_CHAINING OFF 
GO
ALTER DATABASE [MusalaSoft-Internship] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [MusalaSoft-Internship] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [MusalaSoft-Internship] SET DELAYED_DURABILITY = DISABLED 
GO
USE [MusalaSoft-Internship]
GO
/****** Object:  Table [dbo].[JobApplication]    Script Date: 14.7.2021 г. 21:12:36 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[JobApplication](
	[JobId] [int] IDENTITY(1,1) NOT NULL,
	[JobTitle] [nvarchar](50) NOT NULL,
	[CompanyName] [nvarchar](50) NOT NULL,
	[Category] [nvarchar](50) NOT NULL,
	[City] [nvarchar](50) NOT NULL,
	[WorkTime] [nvarchar](50) NOT NULL,
	[Description] [nvarchar](100) NOT NULL,
	[Salary] [decimal](18, 0) NULL,
	[PublishedOn] [date] NULL,
 CONSTRAINT [PK_JobApplication_1] PRIMARY KEY CLUSTERED 
(
	[JobId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Users]    Script Date: 14.7.2021 г. 21:12:36 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Users](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Username] [nvarchar](50) NOT NULL,
	[Email] [nvarchar](50) NOT NULL,
	[Password] [varchar](80) NOT NULL,
 CONSTRAINT [PK_UsersId] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[JobApplication] ON 
GO
INSERT [dbo].[JobApplication] ([JobId], [JobTitle], [CompanyName], [Category], [City], [WorkTime], [Description], [Salary], [PublishedOn]) VALUES (1006, N'Nurse', N'Burgasmed Hospital', N'HEALTH CARE', N'Burgas', N'Full Time', N'We need a certificate for this job.', CAST(5000 AS Decimal(18, 0)), CAST(N'2021-07-14' AS Date))
GO
INSERT [dbo].[JobApplication] ([JobId], [JobTitle], [CompanyName], [Category], [City], [WorkTime], [Description], [Salary], [PublishedOn]) VALUES (1007, N'PHP developer', N'Microsoft', N'TELECOMMUNICATIONS', N'New York', N'Part Time', N'We need a certificates and you should to have knowledge in PHP, database and Java.', CAST(10000 AS Decimal(18, 0)), CAST(N'2021-07-14' AS Date))
GO
INSERT [dbo].[JobApplication] ([JobId], [JobTitle], [CompanyName], [Category], [City], [WorkTime], [Description], [Salary], [PublishedOn]) VALUES (1008, N'Bartenders and Waitresses', N'The Cake company', N'RESTAURANT / FOOD SERVICIES', N'Varna', N'Part Time', N'Good communications skills and precision!', CAST(700 AS Decimal(18, 0)), CAST(N'2021-07-14' AS Date))
GO
INSERT [dbo].[JobApplication] ([JobId], [JobTitle], [CompanyName], [Category], [City], [WorkTime], [Description], [Salary], [PublishedOn]) VALUES (1009, N'Cashier', N'Jumbo', N'SALES & MARKETING', N'Burgas', N'Part Time', N'Secondary education, teamwork skills, previous experience and multiple languages', CAST(1300 AS Decimal(18, 0)), CAST(N'2021-07-14' AS Date))
GO
INSERT [dbo].[JobApplication] ([JobId], [JobTitle], [CompanyName], [Category], [City], [WorkTime], [Description], [Salary], [PublishedOn]) VALUES (1010, N'Facilities Construction Project Manager', N'Tesla', N'CONSTRUCTION / FACILITIES', N'Plovdiv', N'Part Time', N'5+ years of experience in a Manufacturing environment, in either a Production, Engineering, or Facil', CAST(5000 AS Decimal(18, 0)), CAST(N'2021-07-14' AS Date))
GO
SET IDENTITY_INSERT [dbo].[JobApplication] OFF
GO
SET IDENTITY_INSERT [dbo].[Users] ON 
GO
INSERT [dbo].[Users] ([Id], [Username], [Email], [Password]) VALUES (1058, N'plamen', N'PKKostov18@codingburgas.bg', N'$2a$10$yFuYTXQUTZeV9JNOTJGczeXCt4GxWjzubtCTLVCnTz0blNZ2HEJ4q')
GO
INSERT [dbo].[Users] ([Id], [Username], [Email], [Password]) VALUES (1059, N'ilian', N'IMYanev18@codingburgas.bg', N'$2a$10$9hPOzu2a3PPV1HSaGZ5CIOWwPtD.5LCLPYpFvo/JKwibZSbs0ThcC')
GO
INSERT [dbo].[Users] ([Id], [Username], [Email], [Password]) VALUES (1060, N'radoslav', N'RAStoychev18@codingburgas.bg', N'$2a$10$ooU7k2swG6B5ORPK9r/GVuCQ80xcQlwID8PgYSKkcNbOMaQ0tXTxO')
GO
INSERT [dbo].[Users] ([Id], [Username], [Email], [Password]) VALUES (1061, N'kaloyan', N'KNAndrikov18@codingburgas.bg', N'$2a$10$CGVn1xqd8hSeHUtV2AkH/u0G4givUNGwNgSCeEeAY4gi5UTI6bMrq')
GO
INSERT [dbo].[Users] ([Id], [Username], [Email], [Password]) VALUES (1062, N'ivan', N'ITIvanov18@codingburgas.bg', N'$2a$10$r0Mu6iZm4ruJlNvIsjryfeXhWCQHTVSlP3tF5sVzgfWz0d4GJ9sA6')
GO
SET IDENTITY_INSERT [dbo].[Users] OFF
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [UK_Username]    Script Date: 14.7.2021 г. 21:12:37 ******/
ALTER TABLE [dbo].[Users] ADD  CONSTRAINT [UK_Username] UNIQUE NONCLUSTERED 
(
	[Username] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
ALTER TABLE [dbo].[JobApplication] ADD  CONSTRAINT [DF_JobApplication_PublishedOn]  DEFAULT (getdate()) FOR [PublishedOn]
GO
ALTER TABLE [dbo].[Users]  WITH CHECK ADD  CONSTRAINT [CK_Email] CHECK  (([Email] like '%_@__%.__%'))
GO
ALTER TABLE [dbo].[Users] CHECK CONSTRAINT [CK_Email]
GO
USE [master]
GO
ALTER DATABASE [MusalaSoft-Internship] SET  READ_WRITE 
GO
