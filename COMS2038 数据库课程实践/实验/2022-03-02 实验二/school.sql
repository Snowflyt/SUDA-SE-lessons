USE school
CREATE TABLE Student(
  Sno char(6),
  Sname varchar(8),
  Ssex char(2),
  Sage smallint,
  Sdept varchar(15)
)
CREATE TABLE Course(
  Cno char(4),
  Cname varchar(20),
  Cpno char(4),
  Ccredit tinyint
) 
CREATE TABLE SC(
  Sno char(6),
  Cno char(4),
  Grade decimal(12, 1)
)