USE school
CREATE TABLE Student(
  Sno char(6) PRIMARY KEY,
  Sname varchar(8) NOT NULL UNIQUE,
  Ssex char(2) NOT NULL CHECK (Ssex = 'ÄÐ' or Ssex = 'Å®'),
  Sage smallint CHECK (Sage > 16),
  Sdept varchar(15) DEFAULT 'JSJ'
)
CREATE TABLE Course(
  Cno char(4) PRIMARY KEY,
  Cname varchar(20),
  Cpno char(4),
  Ccredit tinyint CHECK (Ccredit >= 0 AND Ccredit <= 5),
  CONSTRAINT Cpno CHECK (Cpno <> Cno)
)
CREATE TABLE SC(
  Sno char(6) REFERENCES Student(Sno),
  Cno char(4) REFERENCES Course(Cno),
  Grade decimal(12, 1),
  CONSTRAINT PK_SC PRIMARY KEY (Sno, Cno)
)
