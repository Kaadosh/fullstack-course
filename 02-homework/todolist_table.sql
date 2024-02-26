CREATE TABLE users (
	user_id SERIAL PRIMARY KEY,
	username VARCHAR(50) UNIQUE NOT NULL,
	password VARCHAR(100) NOT NULL,
	email VARCHAR(100) NOT NULL
);

CREATE TABLE tasks (
	task_id SERIAL PRIMARY KEY,
	user_id INT NOT NULL,
	task_name VARCHAR(100) NOT NULL,
	description TEXT,
	due_date DATE,
	priority INT DEFAULT 0,
	completed BOOLEAN DEFAULT FALSE,
	FOREIGN KEY(user_id) REFERENCES users(user_id) ON DELETE CASCADE
);