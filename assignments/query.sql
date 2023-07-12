
Schema Link - 
click on - https://drive.google.com/file/d/1VwZFPc6gNk5ddMDLV-fcAHj5uX-9Zd9u/view?ts=64ac4ca9











------------------------------------------------------------------------------------------------------------------------------


Q1. Find all the comments for the photo with ID = 3, along with the username of the comment author - 
A1. SELECT c.contents, u.username FROM "comments" c JOIN users u on c.user_id = u.id WHERE (c.photo_id = 3);

Q2. Find the average number of comments per photo - 
A2. SELECT p.id, AVG(c.id) AS avg_comment_count FROM photos p LEFT JOIN comments c ON p.id = c.photo_id GROUP BY p.id;

Q3. Find the photo with the most comments attached to it
A3. SELECT p.id, p.url, COUNT(c.id) AS comment_count
   FROM photos p
   JOIN comments c ON p.id = c.photo_id
   GROUP BY p.id, p.url
   HAVING COUNT(c.id) = (
   SELECT MAX(comment_count)
   FROM (SELECT COUNT(id) AS comment_count FROM comments GROUP BY photo_id) AS subquery);

Q4. Find the photo with ID = 10 and get the number of comments attached to it
A4. select id, url, (
   SELECT COUNT(id)
   FROM comments
   WHERE photo_id = 10
   ) AS comment_count
   FROM photos
   WHERE id = 10;

Q5. Find the user with the most activity (most comments + most photos)
A5. select u.id, u.username, count(distinct p.id) as photos_count, count(distinct c.id) as comment_count from users u
   left join photos p on u.id = p.user_id
   left join "comments" c on u.id = c.user_id
   group by u.id, u.username
   ORDER BY photos_count DESC,
   comment_count DESC
   LIMIT 1;

Q6. Calculate the average number of characters per comment
A6. SELECT AVG(LENGTH(c.contents)) as comment_length FROM comments c;

