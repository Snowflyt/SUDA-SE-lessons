-- 一、利用帮助系统了解SQL-Server 的下列语句的含义
-- 1 锁的隔离级别
SET TRANSACTION ISOLATION LEVEL Serializable

-- 2  设置锁定超时时间
SET LOCK_TIMEOUT 5000  

-- 3
EXEC SP_LOCK


-- 二、观察封锁
-- 1 执行语句序列A
BEGIN TRANSACTION 
UPDATE Student
SET Sage = Sage + 1
WHERE Sno = '0001';
SELECT *
FROM Student
WHERE Sno = '0002';

-- 2 在查询分析器中打开第二个连接(连接 school)[文件-连接], 输入下列语句:
-- 1)
SELECT *
FROM Student
WHERE Sno = '0002';
-- 记录执行结果,说明原因。
-- 2)
SELECT *
FROM Student
WHERE Sno = '0001';
-- 记录执行结果,说明原因。（如上一步没有停止，则强行终止）
-- 3)
UPDATE Student
SET Sname = 'aaa'
WHERE Sno = '0002';
-- 记录执行结果,说明原因。（如上一步没有停止，则强行终止）
-- 4) 强行终止上一步的命令，然后执行语句：
DBCC opentran
-- 记录结果 ,思考：如何知道此事务是那一台计算机发出的？
SELECT *
FROM sys.dm_exec_Sessions
WHERE session_id = 55;
-- 5）执行： 
SELECT *
FROM Student
WHERE Sno = '0001';
-- 记录执行结果,说明原因
-- 然后回到第一个连接中，执行语句:
COMMIT TRANSACTION
-- 观察并记录第二个连接窗口中的现象，说明原因


-- 三、了解锁的类型
-- 1 执行下列语句 
BEGIN TRANSACTION
SELECT *
FROM Student
WHERE Sno = '0001';
PRINT 'server process ID (spid) : ';
PRINT @@spid;
-- 1) 然后执行下列语句
EXEC sp_lock 
-- 注意根据事务中输出的 spid ,观察结果中相应 spid 的记录, 观察加锁。
-- 2) 然后执行下列语句
COMMIT TRANSACTION
EXEC sp_lock
-- 注意根据事务中输出的 spid ,观察结果中相应 spid 的记录, 观察加锁。

-- 2 执行下列语句 
BEGIN TRANSACTION
UPDATE Student
SET Sage = Sage + 1
WHERE Sno = '1001';
PRINT 'server process ID (spid) : ';
PRINT @@spid;
-- 1) 然后执行下列语句
EXEC sp_lock;
-- 注意根据事务中输出的 spid ,观察结果中相应 spid 的记录, 观察加锁。
-- 2) 然后执行下列语句
COMMIT TRANSACTION
EXEC sp_lock
-- 注意根据事务中输出的 spid ,观察结果中相应 spid 的记录, 观察加锁。

-- 3 使用
SET TRANSACTION ISOLATION LEVEL Serializable
-- 然后重新执行 三和四步，观察与原来有何不同。

-- 4 了解表级锁（查看帮助文件）
BEGIN TRANSACTION
SELECT *
FROM Student (TABLOCKX)
WHERE Sno = '1002';
PRINT 'Server Process ID (spid): ';
PRINT @@spid;
-- 然后执行：
EXEC sp_lock;
-- 注意根据事务中输出的 spid,
-- 观察结果中相应 spid 的记录,
-- 观察加锁类型。

-- 5 了解锁定超时
-- a) 执行下列语句 ，设置锁定超时为 1000 ms
SET lock_timeout 1000
GO
BEGIN TRANSACTION
SELECT *
FROM Student (TABLOCKX)
WHERE Sno = '1002';
-- 2）打开第二个连接
-- 执行：
SELECT *
FROM Student;
-- 记录观察到的现象。
-- 3）在打开的第二个连接中
set lock_timeout 10000      
go
SELECT *
FROM Student;
GO;
-- 记录观察到的现象。


-- 四 编程实例
-- 1 编写存储过程 usp_update1 , 传入参数为课程号,处理逻辑:
-- 对传入的这门课,进行如下处理:
-- 如某学生该门课成绩>80 , 则加 2 分
-- 如某学生该门课成绩>60 , 则加 1 分
-- 如某学生该门课成绩<=60 ,扣1分
--  要求：在存储过程中，要么全部学生的成绩被处理成功，要么全部不处理
CREATE PROCEDURE usp_update1
(@Cno CHAR(10))
AS
BEGIN
  BEGIN TRANSACTION
  UPDATE SC
  SET Grade = Grade + 2
  WHERE Cno = @Cno
   AND Grade > 80;
  UPDATE SC
  SET Grade = Grade + 1
  WHERE Cno = @Cno
   AND Grade > 60;
  UPDATE SC
  SET Grade = Grade - 1
  WHERE Cno = @Cno
   AND Grade <= 60;
  COMMIT TRANSACTION
END
GO;
--  思考：在调试中，采用那些措施，使存储过程运行时执行回滚操作 (rollback) 。

--  2 编写触发器，
-- 对insert、update语句进行监控，当学生的年龄超过40岁时，
-- 把该学生的系科改为 ‘BAK’,同时删除该学生的所有选课记录。
-- （注意，利用事务，使修改系科及删除选课记录要么全做，要么全不做）
CREATE TRIGGER tr_update1
ON Student
FOR INSERT, UPDATE
AS
BEGIN
  IF ((SELECT Sage FROM inserted) > 40)
  BEGIN
    BEGIN TRANSACTION
    UPDATE Student
    SET Sdept = 'BAK'
    WHERE Sno = (SELECT Sno FROM inserted);
    DELETE SC
    WHERE Sno = (SELECT Sno FROM inserted);
    COMMIT TRANSACTION
  END
END
GO;
