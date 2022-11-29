--drop database school
create database school    --创建数据库
go

/*CREATE DATABASE school
ON 
( NAME = school_dat,
   FILENAME = 'd:\school1.mdf',
   SIZE = 2,
   MAXSIZE = 4,
   FILEGROWTH = 1 )
LOG ON
( NAME =school_log,
   FILENAME = 'd:\school1.ldf',
   SIZE = 2MB,
   MAXSIZE = 3MB,
   FILEGROWTH = 1MB ) */


go
use school
go
EXEC sp_addtype ud_sno,'char(6)' 
go
--创建表
create table Student ( 
   Sno ud_sno , 
   Sname char(10) not null unique ,
   Ssex char(2) check (ssex='男' or ssex='女') ,
   Sage smallint check(sage>16) ,
   Sdept char(10)  not null default 'JSJ' ,

   primary key (sno)
 ) 
create index ix_student_sname ON student(sname)

create table course( 
   Cno char(4) ,
   Cname char(16) ,
   Cpno  char(4) ,
   Ccredit int check (Ccredit >=0 and Ccredit<=5),

   check( cno<>cpno) , --约束
   primary key (cno)
 )
create index ix_course_cpno ON course(cpno)

create table SC( 
  Sno ud_sno ,
  Cno char(4) ,
  Grade int check(grade<=100) ,

  constraint pk_sc primary key (sno,cno),
  foreign key (sno) references student(sno) ,
  foreign key (cno) references course(cno) ,
 )
create index ix_sc_cno ON sc(cno)

--添加数据

insert into Student (Sno,Sname,Ssex,Sage,Sdept)  values ('0003','陈小明','男',20,'SX')
insert into Student (Sno,Sname,Ssex,Sage,Sdept)  values ('0004','杨秀红','女',21,'JSJ')
insert into Student (Sno,Sname,Ssex,Sage,Sdept)  values ('0001','周志林','男',20,'SX')
insert into Student (Sno,Sname,Ssex,Sage,Sdept)  values ('0009','钱明明','男',20,'SX')
insert into Student (Sno,Sname,Ssex,Sage,Sdept)  values ('0002','李文庆','男',23,'JSJ')
insert into Student (Sno,Sname,Ssex,Sage,Sdept)  values ('0081','刘亭','女',  22,'SX')
insert into Student (Sno,Sname,Ssex,Sage,Sdept)  values ('0091','贺秋雪','女',20,'SX')
insert into Student (Sno,Sname,Ssex,Sage,Sdept)  values ('0078','王振','男',  21,'JSJ')
insert into Student (Sno,Sname,Ssex,Sage,Sdept)  values ('0092','赵三','男',  22,'SX')
insert into student (sno,sname,ssex,sage,sdept) values ('8001','张华','男',23,'SX')
insert into student (sno,sname,ssex,sage,sdept) values ('8002','赵颖','女',21,'SX')
insert into student (sno,sname,ssex,sage,sdept) values ('8003','钱凯','男',22,'JSJ')
insert into student (sno,sname,ssex,sage,sdept) values ('8004','王华','男',21,'SX')
insert into student (sno,sname,ssex,sage) values ('8005','张英','女',21)
insert into student (sno,sname,ssex,sage) values ('8006','赵章','女',22)
insert into student (sno,sname,ssex,sage) values ('8007','钱利','男',23)
insert into student (sno,sname,ssex,sage) values ('8008','王铁','男',21)



insert into course(Cno,Cname,Cpno,Ccredit) values ('1001','高等数学','',5)
insert into course(Cno,Cname,Cpno,Ccredit) values ('1002','离散数学','1001',3)
insert into course(Cno,Cname,Cpno,Ccredit) values ('1003','程序设计','',5)
insert into course(Cno,Cname,Cpno,Ccredit) values ('1004','数据结构','1003',4)
insert into course(Cno,Cname,Cpno,Ccredit) values ('1005','数据库原理','1004',4)
insert into course(Cno,Cname,Cpno,Ccredit) values ('1006','操作系统','1004',5)

insert into SC(Sno,Cno,Grade) values ('0002','1002',90)
insert into SC(Sno,Cno,Grade) values ('0002','1001',91)
insert into SC(Sno,Cno,Grade) values ('0002','1003',67)
insert into SC(Sno,Cno,Grade) values ('0002','1004',98)
insert into SC(Sno,Cno,Grade) values ('0001','1002',92)
insert into SC(Sno,Cno,Grade) values ('0001','1001',92)
insert into SC(Sno,Cno,Grade) values ('0001','1003',76)
insert into SC(Sno,Cno,Grade) values ('0003','1001',77)
insert into SC(Sno,Cno,Grade) values ('0001','1004',     91)
insert into SC(Sno,Cno,Grade) values ('0004','1001',     97)
insert into SC(Sno,Cno,Grade) values ('0004','1002',     78)
insert into SC(Sno,Cno,Grade) values ('0004','1003',     65)
insert into SC(Sno,Cno,Grade) values ('0004','1004',     89)
insert into SC(Sno,Cno,Grade) values ('0091','1001',     93)
insert into SC(Sno,Cno,Grade) values ('0091','1002',     87)
insert into SC(Sno,Cno,Grade) values ('0091','1003',     99)
insert into SC(Sno,Cno,Grade) values ('0091','1004',     95)
insert into SC(Sno,Cno,Grade) values ('0009','1001',     93)
insert into SC(Sno,Cno,Grade) values ('0009','1002',     88)
insert into SC(Sno,Cno,Grade) values ('0009','1003',     60)
insert into SC(Sno,Cno,Grade) values ('0009','1004',     83)
insert into SC(Sno,Cno,Grade) values ('0092','1001',     98)
insert into SC(Sno,Cno,Grade) values ('0092','1002',     86)
insert into SC(Sno,Cno) values ('0092','1003')

insert into SC(Sno,Cno,Grade) values ('0081','1001',     90)
insert into SC(Sno,Cno) values ('0081','1002')
insert into SC(Sno,Cno) values ('0081','1003')

insert into SC(Sno,Cno,Grade) values ('8001','1002',90)
insert into SC(Sno,Cno,Grade) values ('8001','1001',91)
insert into SC(Sno,Cno,Grade) values ('8001','1003',67)
insert into SC(Sno,Cno,Grade) values ('8001','1005',98)
insert into SC(Sno,Cno,Grade) values ('8002','1002',87)
insert into SC(Sno,Cno,Grade) values ('8002','1001',96)
insert into SC(Sno,Cno,Grade) values ('8002','1003',68)
insert into SC(Sno,Cno,Grade) values ('8002','1005',92)

insert into SC(Sno,Cno,Grade) values ('8003','1001',91)
insert into SC(Sno,Cno,Grade) values ('8003','1003',92)
insert into SC(Sno,Cno,Grade) values ('8003','1004',63)
insert into SC(Sno,Cno,Grade) values ('8003','1005',94)

insert into SC(Sno,Cno,Grade) values ('8004','1001',92)
insert into SC(Sno,Cno,Grade) values ('8004','1003',93)
insert into SC(Sno,Cno,Grade) values ('8004','1004',64)
insert into SC(Sno,Cno) values ('8004','1005')

insert into SC(Sno,Cno) values ('8006','1001')
insert into SC(Sno,Cno,Grade) values ('8006','1002',92)
insert into SC(Sno,Cno,Grade) values ('8006','1003',20)
insert into SC(Sno,Cno) values ('8006','1004')

insert into SC(Sno,Cno,Grade) values ('8007','1001',99)
insert into SC(Sno,Cno,Grade) values ('8007','1003',92)
insert into SC(Sno,Cno,Grade) values ('8007','1004',86)
insert into SC(Sno,Cno,Grade) values ('8007','1005',98)
insert into SC(Sno,Cno,Grade) values ('8007','1002',95)

insert into SC(Sno,Cno,Grade) values ('8008','1001',91)
insert into SC(Sno,Cno,Grade) values ('8008','1003',92)
insert into SC(Sno,Cno,Grade) values ('8008','1004',83)
insert into SC(Sno,Cno,Grade) values ('8008','1005',94)
insert into SC(Sno,Cno,Grade) values ('8008','1002',99)

