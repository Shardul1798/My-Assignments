Notes for 10.07.2023

Topic - Database (RDBMS -Postgres)

1. What is a database.
2. Types of Database.
3. Relational Databases.
4. Tables - Rows & Columns
5. Queries - CREATE, INSERT, UPDATE & SELECT
6. Alias (AS)
7. Aggregations - COUNT, AVERAGE, SUM, GROUP BY
8. AND, OR Operators
9. WHERE Clause
10. ORDER BY
11. UML

EXAMPLES -

1. Design of a Database Schema for Instagram

Note - Use UPPER CASE letters for writing Query keywords as it will provide more readability for writing huge queries.

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
A.) What is Database?
Databases provides a structured and organized way to store data, making it easier to access, query, and update.

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
B.) Types of Database -

1. Relational Example - SQL
2. Non-Relational - MongoDB
3. Key Value - MongoDB

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
C.) Relational Database (SQL - Structured Query Langugage) -

In Relational Database, Data is stored in a table (also called as relation) having rows & columns.

SQL (Structured Query Language) is a programming language used to manage and manipulate relational databases. It provides a standardized set of commands and syntax for interacting with databases.

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
D.) Tables (Rows & Columns)

A table consists of rows, also known as records or tuples, and columns, also known as fields or attributes.
Each column represents a specific type of data, while each row represents an individual data entry or record.
Columns define the attributes or properties of the data, and rows contain the actual values or data instances.

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
E.) Queries -

CREATE - Used to create table

Example - CREATE TABLE employees (
id INT PRIMARY KEY,
name VARCHAR(50),
age INT,
salary DECIMAL(10,2)
);

Here, CREATE TABLE are the keywords. employess will be the table name. id, name, age, and salary will be the columns of the "empoyees" table. INT PRIMARY KEY, VARCHAR(50), INT, DECIMAL(10,2) specify the data types of the columns respectively.

INSERT - Used to Insert Values into the table

Example - INSERT INTO users (username) VALUES ('Nicole');

Here, INSERT INTO and VALUES are the Query keywords. "users" is the table name. "username" specifies the column name and 'Nicole' is the actual value to be inserted.

UPDATE - Used to modify the existing values present in the fields/columns.

Example - UPDATE employees SET salary = 50000 WHERE id = 123;

Here, UPDATE SET and WHERE are the keywords. "employees" is the tablename. "id" is the column name. "id = 123" specifies the condition to identify the specific row(s) to be updated..

SELECT - Used to fetch records from the table.

Example - SELECT \* FROM cities;

Here, SELECT and FROM are the Query keywords. \* returns the complete table. "cities" is the name of the table.

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
F.) Alias (AS)

In SQL, the "AS" keyword is used to provide an alias for a table or column in a query. An alias is an alternate name given to a table or column, which can be used to make the query more readable or to handle duplicate column names.

Example - SELECT population/area AS density from cities;

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
G.) Aggregations

Aggregations in SQL refer to the process of summarizing or grouping data to produce a single result based on a set of records. SQL provides several built-in aggregate functions that operate on columns of a table or the result set of a query. These functions perform calculations and return a single value representing a summary of the data.

Note - Using Aggregations will help in reducing more queries

COUNT() - Returns the number of rows that match a specific condition or the total number of rows in a table.

Example - SELECT COUNT(\*) FROM cities;

SUM() - Calculates the sum of values in a column.

Example - SELECT SUM(area) FROM cities;

AVG() - Calculates the average (mean) of values in a column.

Example - SELECT AVG(salary) FROM employees;

GROUP BY: Groups the result set by one or more columns, allowing aggregate functions to be applied on each group separately.

Example - SELECT department, AVG(salary) FROM employees GROUP BY department;

CONCAT() - Concatenate multiple columns;

Example - SELECT CONCAT(name, ', ' , country) FROM cities;

|| -> this double pipe operator can also be used for concatenation.

Example - SELECT name || ',' || country FROM cities;

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
H.) AND, OR Operators

The AND and OR operators are used to filter records based on more than one condition:

The AND operator displays a record if all the conditions separated by AND are TRUE.
The OR operator displays a record if any of the conditions separated by OR is TRUE.
The NOT operator displays a record if the condition(s) is NOT TRUE.

Example - (AND)

SELECT \* FROM cities WHERE Country='Germany' AND City='India';

Example - (OR)
SELECT \* FROM cities WHERE Country='Germany' OR City='India';

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
I.) WHERE Clause

The WHERE clause is used to filter records.

It is used to extract only those records that fulfill a specified condition.

Example - SELECT \* FROM cities WHERE country='INDIA';

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
J.) ORDER BY
ORDER BY is a clause used in SQL to sort the result set of a query based on one or more columns. It allows you to specify the order in which the rows should be returned by the query.

It is commonly used for sorting.

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
K.) UML - Unified Modeling Language

Assignment (10.07.2023)

1. User should be able to follow other user.

QUERY - INSERT INTO followers (id, userId, following) VALUES (uuid_generate_v4(), <userId> , true);

2. User should be able to unfollow other user.

QUERY - UPDATE followers SET following = false WHERE followerId = <userId>; //To Unfollow
//followingId will be the User Id of following person

3. User should be able to see total followers and following count.

QUERY for count of following - SELECT COUNT(_) AS following FROM followers WHERE following = true AND userId = <userId>;
QUERY for count of followers - SELECT COUNT(_) AS followers FROM followers WHERE followers = true AND userId = <userId>;

4. User should be able to see followers list.

QUERY - SELECT \* FROM followers JOIN users ON followers.followerId = users.userId AND followers = true;

5. User should be able to see following list.

QUERY - SELECT name FROM users JOIN users ON followers.followingId = users.userId AND following = true;

6. User should be able to remove follower or following. [single follower at once]

QUERY - DELETE FROM followers WHERE followingId = <userId>;

7. User should be able to see profile of another user..
   Query - SELECT name,image,age,username,emailId FROM users WHERE userid = <userId>;
   //<userId> is the Id of another userId

8. User profile should consist basic details
   a. name
   b. image
   c. age
   d. username
   e. emailId"

To have a look on UML of both tables -

click on - https://drive.google.com/file/d/1VwZFPc6gNk5ddMDLV-fcAHj5uX-9Zd9u/view?ts=64ac4ca9