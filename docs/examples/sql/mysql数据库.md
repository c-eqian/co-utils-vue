## 1. 基础操作

### Mysql 数据库存储的原理？

存储过程是一个可编程的函数，在数据库中创建并保存，它可以有SQL语句和一些特殊的控制结构组成。当希望在不同的应用程序或平台上执行相同的函数，或者封装特定功能时，存储过程时非常有用的，数据库中的存储过程可以看作是对编程中面向对象方法的模拟，它允许控制数据的访问方式。

**存储过程优点：**

1. 存储过程能实现较快的执行速度
2. 存储过程能实现标准组件是编程
3. 存储过程可以用流程语句编写，有很强的灵活性，可以完成复杂的判断和运算。
4. 存储过程可以被作为一种安全机制来充分应用。
5. 存储过程能够减少网络流量

### 创建数据表

**语句：**

```mysql
CREATE TABLE if NOT EXISTS usertable(
id INT UNSIGNED AUTO_INCREMENT,
username VARCHAR(30) NOT NULL,
account VARCHAR(30),
PRIMARY KEY ( id )
)ENGINE=InnoDB DEFAULT CHARSET=utf8;
```

**其中，if NOT EXISTS 判断该表是否存在，不存在就创建，usertable表名**

1. 如果不想字段为 **NULL** 可以设置字段的属性为 **NOT NULL**， 在操作数据库时如果输入该字段的数据为**NULL** ，就会报错。
2. AUTO_INCREMENT定义列为自增的属性，一般用于主键，数值会自动加1。
3. PRIMARY KEY关键字用于定义列为主键。 您可以使用多列来定义主键，列间以逗号分隔。
4. ENGINE 设置存储引擎，CHARSET 设置编码。

### 创建临时表

MySQL 临时表在我们需要保存一些临时数据时是非常有用的。临时表只在当前连接可见，当关闭连接时，Mysql会自动删除表并释放所有空间。

默认情况下，当你断开与数据库的连接后，临时表就会自动被销毁。当然你也可以在当前MySQL会话使用 **DROP TABLE** 命令来手动删除临时表。

**语句：**

```mysql
CREATE TEMPORARY TABLE cyq(
username VARCHAR(30),
account VARCHAR(30)
)
```

使用 **SHOW TABLES**命令显示数据表列表时，无法看到cyq表

![](https://c-typora.oss-cn-guangzhou.aliyuncs.com/c-typora/image-20210821231956963.png)

```
INSERT INTO cyq VALUES('cyq','1320')
```

![](https://c-typora.oss-cn-guangzhou.aliyuncs.com/c-typora/image-20210821232334074.png)

### 删除数据表

MySQL中删除数据表是非常容易操作的，但是你在进行删除表操作时要非常小心，因为执行删除命令后所有数据都会消失。

**语句：**

```mysql
DROP TABLE table_name ;
```

### 新增数据

**语句：**

```mysql
INSERT INTO table_name ( field1, field2,...fieldN )
                       VALUES
                       ( value1, value2,...valueN );
```

如果所有的列都要添加数据可以不规定列进行添加数据：



```
INSERT INTO usertable VALUES(2,'111','222')
```

### 更新数据

```mysql
UPDATE table_name SET field1=new-value1, field2=new-value2
[WHERE Clause]
```

1. 你可以同时更新一个或多个字段。
2. 你可以在 WHERE 子句中指定任何条件。
3. 你可以在一个单独表中同时更新数据。

### 删除数据

```
DELETE FROM table_name [WHERE Clause]
```

1. 如果没有指定 WHERE 子句，MySQL 表中的所有记录将被删除。
2. 你可以在 WHERE 子句中指定任何条件
3. 您可以在单个表中一次性删除记录。

### 多表关联删除数据

```
DELETE ct,
ls,
cet 
FROM
	content ct
	LEFT JOIN likes ls ON ct.id = ls.contentId
	LEFT JOIN `comment` cet ON ct.id = cet.contentId 
WHERE
	ct.id = 4 OR ct.id=5
```



## 2. SELECT  查询

### 常用关键字

| 关键字           | 作用                                                         | 语法                                                         |
| ---------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| distinct         | 返回列值，去除重复值                                         | SELECT DISTINCT 列名称 FROM 表名称                           |
| order by         | 根据字段由小到大排序（系统默认由小到大，升序关键字 asc，降序关键字desc） | SELECT  列名称 FROM 表名称 where 条件 order by  排序字段asc/desc |
| limit            | 返回部分条数据                                               | SELECT * FROM table LIMIT 条数                               |
| group by         | 将数据按照 group by 后面的字段分组，只返回每组的一条统计信息。即将字段值重复的行合并为一行 | SELECT  列名称 FROM 表名称 where 条件 group by               |
| in               | in常用于where表达式中，其作用是查询某个范围内的数据。not in与in作用相反 | select * from where field **in** (value1,value2,value3,…)    |
| LIKE             | 当想要查询姓名中包含某个字母时候就需要使用模糊查询。         | SELECT * FROM 表名 WHERE 列字段 LIKE 匹配什么内容            |
| UNION和UNION ALL | UNION用于合并两个或多个select语句的结果集，多个select内部必须有相同数量的列，数据类型相似，列顺序相同。 | select name from table1 union select name from table2        |

### 关系运算符

| 符号            | 描述                       | 备注                                                         |
| --------------- | -------------------------- | ------------------------------------------------------------ |
| =               | 等于                       |                                                              |
| <>, !=          | 不等于                     |                                                              |
| >               | 大于                       |                                                              |
| <               | 小于                       |                                                              |
| <=              | 小于等于                   |                                                              |
| >=              | 大于等于                   |                                                              |
| BETWEEN         | 在两值之间                 | >=min&&<=max                                                 |
| NOT BETWEEN     | 不在两值之间               |                                                              |
| <=>             | 严格比较两个NULL值是否相等 | 两个操作码均为NULL时，其所得值为1；而当一个操作码为NULL时，其所得值为0 |
| REGEXP 或 RLIKE | 正则式匹配                 |                                                              |



### IN关键字查询

IN关键字，用于判断某个记录的值，是否在指定的集合中 如果字段的值在集合中，则满足条件，该字段所在的记录将会被[查询出来。 

格式：SELECT * | 字段名1，字段名2，…… FROM 表名 WHERE 字段名 [NOT] IN (元素1，元素2，……)

```mysql
SELECT a.RequisitionId FROM pat_test_checklist a WHERE a.RequisitionId NOT IN ('21081800001')
```

![](https://c-typora.oss-cn-guangzhou.aliyuncs.com/c-typora/image-20210820144920832.png)

```mysql
SELECT a.RequisitionId FROM pat_test_checklist a WHERE a.RequisitionId  IN ('21081800001')
```

![](https://c-typora.oss-cn-guangzhou.aliyuncs.com/c-typora/image-20210820145135323.png)

### 空值查询

- is null是一个关键字来的，用于判断字段的值是否为空值（NULL）
- 空值 ≠ 0，也 ≠ 空字符串"" 

语法：SELECT *|字段 FROM 表名 WHERE  字段名 IS[NOT] NULL

如有这样一个表：

![](https://c-typora.oss-cn-guangzhou.aliyuncs.com/c-typora/image-20210820153207550.png)

**语句：**

```mysql
SELECT username,phone FROM userinfo WHERE phone IS NULL
```

![](https://c-typora.oss-cn-guangzhou.aliyuncs.com/c-typora/image-20210820152838948.png)

**语句：**

```mysql
SELECT username,phone FROM userinfo WHERE phone IS  NOT NULL
```

![image-20210820153002185](C:\Users\24291\AppData\Roaming\Typora\typora-user-images\image-20210820153002185.png)

### DISTINCT 关键字查询

有时需要查询出某个字段不重复的记录，这时可以使用mysql提供的distinct这个关键字来过滤重复的记录。

语法：SELECT DISTINCT 列名称 FROM 表名称

**语句：**

```mysql
SELECT DISTINCT Isuse FROM userinfo
```

![](C:\Users\24291\AppData\Roaming\Typora\typora-user-images\image-20210820153559029.png)

### LIKE 关键字查询

1. % 通配符：匹配任意字符串
2. 下划线（__）通配符：匹配单个字符，如果要匹配多个字符，需要使用多个下划线，但是，中间不能有空格出现。
3. 由于% 和下划线都是通配符，因此，如果要匹配字符串中的% 和下划线，需要进行转义，例如，’\%‘，’\_’

语法：SELECT * FROM 表名 WHERE 列字段 LIKE 匹配什么内容

**语句：**

```mysql
SELECT *  FROM userinfo WHERE username LIKE '%2%'
```

![](C:\Users\24291\AppData\Roaming\Typora\typora-user-images\image-20210820154107733.png)

**语句：**

```mysql
SELECT *  FROM userinfo WHERE username LIKE '2%'
```

![](C:\Users\24291\AppData\Roaming\Typora\typora-user-images\image-20210820154237604.png)

**语句：**

```
SELECT *  FROM userinfo WHERE username LIKE '%2'
```

![image-20210820154423562](C:\Users\24291\AppData\Roaming\Typora\typora-user-images\image-20210820154423562.png)

解析：可以看到，当使用’%key%‘查询时，表示匹配含有该key的所有信息，而使用’key%‘表示匹配以key开头的所有信息，’%2‘则表示匹配以2结尾的所有信息。

### 连接查询

1. 交叉连接查询：交叉查询返回的结果是第一个表与第二个表中的数据行数相乘，例如，第一个表中有3条数据，第二个表中有4条数据，那么返回结果就是3x4=12条。

   语法：SELECT * FROM 表1 CROSS JOIN 表2

   ```mysql
   SELECT *  FROM userinfo CROSS JOIN menulist WHERE username='202020'
   ```

   ![image-20210820163450875](C:\Users\24291\AppData\Roaming\Typora\typora-user-images\image-20210820163450875.png)

2. 内连接查询：组合两个表中的记录，返回关联字段相符的记录.

   语法：select \* from a_table a [inner] join b_table b on a.a_id = b.b_id

   ```mysql
   SELECT a.*,b.*  FROM userinfo a JOIN menulist b ON a.authority=b.authority WHERE b.authority='0'
   ```

   ![](C:\Users\24291\AppData\Roaming\Typora\typora-user-images\image-20210820164235336.png)

3. 外连接查询:外连接可分为左外连接（**LEFT JOIN**）、右外连接（**RIGHT JOIN**）

**左(外)连接，左表(a_table)的记录将会全部表示出来，而右表(b_table)只会显示符合搜索条件的记录。右表记录不足的地方均为NULL**

**与左(外)连接相反，右(外)连接，左表(a_table)只会显示符合搜索条件的记录，而右表(b_table)的记录将会全部表示出来。左表记录不足的地方均为NULL。**

### 子查询

 子查询是指一个查询语句嵌套在另一个 询语句内部的在询。它可以嵌套在另一个SELECT，



SELECT..INTO语句、INSERT …INTO等语句中，在执行子查询语句时，首先会执行子查询中的语句，然后将返回的结果作为外层在查询的过滤条件，在子查询中可以使用IN、EXISTS、ANY、ALL操作符。

### EXISTS关键字

这个子查询相当于测试，返回TRUE或者FALSE 只有返回TRUE时，外层语句才会执行。

EXISTS在更新操作中，遇到的问题，如：

```mysql
UPDATE pat_test_checklist SET `Status`='已完成' WHERE EXISTS(SELECT b.tcm_identifier,b.ini_identifier,b.adl_identifier,b.sds_identifier FROM pat_test_checklist b WHERE b.tcm_identifier IS NOT NULL AND b.ini_identifier IS NOT NULL AND b.sds_identifier IS NOT NULL AND b.adl_identifier IS NOT NULL AND b.adl_identifier='3') AND adl_identifier='3'
```

本想通过上面语句，实现的功能是，当

```mysql
(SELECT b.tcm_identifier,b.ini_identifier,b.adl_identifier,b.sds_identifier FROM pat_test_checklist b WHERE b.tcm_identifier IS NOT NULL AND b.ini_identifier IS NOT NULL AND b.sds_identifier IS NOT NULL AND b.adl_identifier IS NOT NULL AND b.adl_identifier='3')
```

子句返回TRUE时，来执行外层的更新语句，但是，结果提示，**1093 - You can't specify target table 'pat_test_checklist' for update in FROM clause**，大概的意思是**不能在 FROM 子句中为更新指定目标表**。

因此，需要再嵌套一个SELECT语句，当作查询。以下语句，实现的功能是：

**1. 当表中的某些字段都不为NULL的时候，并且指定条件，返回的结果作为外层SELECT 语句需要查询的表，并选择其中的结果，如图**

**2. 由于在字段中有NULL，所以返回的结果全为NULL，然后把该字段写上数据，发现，已经正常显示查询的结果。但如果，即使所有字段都不为NULL，指定的条件不满足时，结果全部一样返回NULL**

**3.如果，外层SELECT查询返回的结果都为NULL，说明EXISTS得到的是FALSE，最后最外层语句并不执行，否则为TRUE，最外层语句执行**

```mysql
SELECT a.tcm_identifier,a.ini_identifier,a.adl_identifier,a.sds_identifier FROM (SELECT b.tcm_identifier,b.ini_identifier,b.adl_identifier,b.sds_identifier FROM pat_test_checklist b WHERE b.tcm_identifier IS NOT NULL AND b.ini_identifier IS NOT NULL AND b.sds_identifier IS NOT NULL AND b.adl_identifier IS NOT NULL AND b.adl_identifier='3') a
```

![](C:\Users\24291\AppData\Roaming\Typora\typora-user-images\image-20210821130648440.png)

![](C:\Users\24291\AppData\Roaming\Typora\typora-user-images\image-20210821130830107.png)

![](C:\Users\24291\AppData\Roaming\Typora\typora-user-images\image-20210821130953728.png)

 **正确语句**：

```mysql
UPDATE pat_test_checklist SET `Status`='已完成' WHERE EXISTS(SELECT a.tcm_identifier,a.ini_identifier,a.adl_identifier,a.sds_identifier FROM (SELECT b.tcm_identifier,b.ini_identifier,b.adl_identifier,b.sds_identifier FROM pat_test_checklist b WHERE b.tcm_identifier IS NOT NULL AND b.ini_identifier IS NOT NULL AND b.sds_identifier IS NOT NULL AND b.adl_identifier IS NOT NULL AND b.adl_identifier='3') a) AND adl_identifier='3'
```

### ANY 关键字子查询

顾名思义 any表示任意的意思，只有其中一个条件满足即可。

**语句：**

```mysql
SELECT * FROM userinfo WHERE authority > ANY	(SELECT authority FROM menulist)
```

**案例：**

![image-20210821183827903](C:\Users\24291\AppData\Roaming\Typora\typora-user-images\image-20210821183827903.png)

### ALL 关键字子查询

ALL关键字与any关键字相反，它必须满足所有条件。

**语句：**

```
SELECT * FROM userinfo WHERE Isuse > ALL (SELECT authority FROM menulist)
```

**值得注意的是，该关键字中的子语句返回结果必须为单一的**

**错误语句：**

```
SELECT * FROM userinfo WHERE Isuse > ALL (SELECT authority,children FROM menulist)
```

### 内层查询结果作为外层查询的条件

```
SELECT * FROM 《表名》 <where> 条件字段1=(SELECT B.字段 FROM 《内层查询结果集》)
```

**案列**

```
SELECT * FROM fh_self_care_assess WHERE id=(SELECT b.BusinessInnerId FROM (SELECT BusinessInnerId FROM pat_onhand WHERE ProjectNo='72' AND empi='b7e380cc4f80b2b00dd4b8f75f84dd6d' ORDER BY Did DESC LIMIT 1) AS b)
```

![](C:\Users\24291\AppData\Roaming\Typora\typora-user-images\image-20210913113622467.png)

```
INSERT INTO userinfo (username) SELECT '20616985' FROM DUAL WHERE NOT EXISTS (SELECT username FROM userinfo WHERE username='20616985')
```

```
INSERT INTO user_sys ( userAccount,userId ) SELECT
a.userId,'2022'
FROM
user_list a
WHERE
 EXISTS (
	SELECT
		userName
	FROM
		user_list 
	WHERE
	userName = '十七') AND a.userName='十七'
```



### 通过内联查询实现多表查询并更新

```
UPDATE `fh_depression_assesss` a INNER JOIN `fh_personbasics` b SET a.`f_no` = b.`f_no`,a.idcard=b.idcard,a.`name`=b.`name`,a.gender=b.gender,a.phone=b.phone WHERE a.`empi` = b.empi;
```

### 删除表中的重复记录，并保留一条

```mysql
DELETE
FROM
	fh_personbasics
WHERE
	empi IN (
		SELECT
			t.empi
		FROM
			(
				SELECT
					empi
				FROM
					fh_personbasics
				GROUP BY
					empi
				HAVING
					count(empi) > 1
			) t
	)
AND id NOT IN (
SELECT
	dt.id
FROM
	(
		SELECT
			min(id) as id
		FROM
			fh_personbasics
		GROUP BY
			empi
		HAVING
			count(empi) > 1
	) dt
)
```

### 在多表查询中，ORDER BY与GROUP BY一起使用排序问题

在使用GROUP BY与ORDER BY进行查询时，由于会先执行GROUP BY导致，会取第一条数据进行分组，因此取不到最新的记录，

解决：

在排序时使用子查询里应该加上limit

```mysql
SELECT
	e.RequisitionId,
	d.* 
FROM
	pat_test_checklist e
	JOIN ((
		SELECT
			c.* 
		FROM
			(
				(
				SELECT
					a.`身份证号` `idcard`,
					a.`姓名` `name`,
					a.`年龄` `age`,
					a.`本人电话` `phone`,
					a.`性别` `gender`,
					a.`责任医生` `doctor_name`,
					b.* 
				FROM
					ac_databank a
					JOIN pat_onhand b ON a.`个人序号` = b.empi 
				WHERE
					b.org_code = '4509230026' 
					AND `Status` IS NOT NULL 
					AND b.ProjectNo = '30' 
				ORDER BY
					b.Did DESC LIMIT 0,10
				) c
			) 
		GROUP BY
			c.empi 
			LIMIT 0,
			10 
			) d 
	) ON d.BusinessInnerId = e.test_identifier 
WHERE
	d.empi = e.empi
```

### 查询多字段范围

```mysql
SELECT F.* FROM zd_feeitem F WHERE F.FeeItemCode  IN (SELECT a.FeeItemCode FROM (SELECT DISTINCT FeeItemCode FROM zd_feeitem WHERE FeeItemCode IN ('TJ002','TJ008','TJ005','JB001') AND isUse=1) a) AND F.isUse=1
```

```mysql
select ID as '编码' , STORE_NUM AS '门店数' from add_stop_center_manager.s_merchant_admin where STORE_NUM >1
select ID as '编码' , STORE_NUM AS '门店数' from add_stop_center_manager.s_merchant_admin where STORE_NUM  IN (1,2) AND 
```

