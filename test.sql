SELECT b.*
cat.*
col.*
e.amount
FROM b budget
INNER JOIN cat category ON cat.id = b.category_id
INNER JOIN col color ON col.id = cat.color_id
LEFT JOIN expenses e ON e.budget_id = b.id 
AND e.date >= firstDay AND e.date <= lastDay;
WHERE b.user_id = userId
AND b.year = year
AND b.month = month



