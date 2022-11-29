-- 一、理解 rollback
-- 1 在查询分析器输入下列语句并执行 ,记录该学生的年龄。
SELECT *
FROM student
WHERE Sno = '0001';

-- 2 执行下列 语句序列A:
BEGIN TRANSACTION 
UPDATE Student
SET Sage = Sage + 1
WHERE Sno = '0001';
SELECT *
FROM student
WHERE Sno = '0002';
-- 此事务结束了吗？

-- 3 执行:
SELECT *
FROM student
WHERE Sno = '0001';
-- 记录该学生的年龄。
-- 思考：student 中的0001的年龄确实被更改了吗? 为什么?

-- 4 执行下列语句:
ROLLBACK TRANSACTION
-- 然后再执行：
SELECT *
FROM student
WHERE Sno = '0001';
-- 观察0001的年龄, 解释发生这种现象的原因。


-- 二、理解 commit 
-- 1 在查询分析器输入下列语句并执行 ,记录该学生的年龄。
SELECT *
FROM student
WHERE Sno = '0001';

-- 2 执行下列 语句序列A:
BEGIN TRANSACTION 
UPDATE Student
SET Sage = Sage + 1
WHERE Sno = '0001';
SELECT *
FROM student
WHERE Sno = '0002';
   
-- 3 执行:
COMMIT TRANSACTION

SELECT *
FROM student
WHERE Sno = '0001';
-- 记录结果, 此时更改后的数据被永久保存了吗?

-- 三、执行下列语句序列:
BEGIN TRANSACTION 
UPDATE Student
SET Sage = Sage + 1
WHERE Sno = '0001';
UPDATE SC
SET Grade = Grade + 1
WHERE Sno = '0002'
 AND Cno = '1001';
ROLLBACK TRANSACTION

-- 上述指令执行后，数据库发生了什么变化？
