-- Create follower management and user profile - 
-- Schema Link - 
-- click on - https://drive.google.com/file/d/1VwZFPc6gNk5ddMDLV-fcAHj5uX-9Zd9u/view?ts=64ac4ca9

-- Queries considering 
-- User with userId - '39814192-9958-4304-b31f-c6d4d7a92446' is logged in.
-- Another user with userId - '6a4d246c-a220-42a5-b338-ca62a079540f' can be a followeror following.

-- 1. User should be able to follow other user. --

INSERT INTO followers (userId, following, followingId) VALUES ('39814192-9958-4304-b31f-c6d4d7a92446', true, '6a4d246c-a220-42a5-b338-ca62a079540f');

-- If record is already present
UPDATE followers SET following = true WHERE userId = '39814192-9958-4304-b31f-c6d4d7a92446' AND followerId = '6a4d246c-a220-42a5-b338-ca62a079540f';

-- 2. User should be able to unfollow other user.

-- Only Update Value if already exists in table
UPDATE followers SET following = false WHERE userId = '39814192-9958-4304-b31f-c6d4d7a92446' AND followerId = '6a4d246c-a220-42a5-b338-ca62a079540f';

-- 3. User should be able to see total followers and following count. 

-- To Count Following
SELECT COUNT(userId) FROM followers WHERE following=true AND userId = '39814192-9958-4304-b31f-c6d4d7a92446';

-- To Count Followers - 
SELECT COUNT(userId) FROM followers WHERE followers=true AND userId = '39814192-9958-4304-b31f-c6d4d7a92446';

-- 4. User should be able to see followers list.

SELECT u.* FROM users u JOIN followers f ON u.userId = f.followerid WHERE f.followers = true AND u.userId = '39814192-9958-4304-b31f-c6d4d7a92446';

-- 5. User should be able to see following list.

SELECT u.*, f.followerid FROM users u JOIN followers f ON u.userId = f.followerid WHERE f.followers = true AND u.userId = '39814192-9958-4304-b31f-c6d4d7a92446';

-- 6. User should be able to remove follower or following. [single follower at once]

DELETE FROM followers WHERE followerid = '6a4d246c-a220-42a5-b338-ca62a079540f' AND userId = '39814192-9958-4304-b31f-c6d4d7a92446'

-- 7. User should be able to see profile of another user.

-- User profile should consist basic details 
--     a. name
--     b. image
--     c. age
--     d. username
--     e. emailId"

SELECT u.* FROM users u WHERE u.userId = '6a4d246c-a220-42a5-b338-ca62a079540f';




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

