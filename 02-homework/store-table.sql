CREATE TABLE users(
	user_id SERIAL PRIMARY KEY,
	user_firstname VARCHAR(50) NOT NULL,
	user_lastname VARCHAR(50) NOT NULL,
	username VARCHAR(50) UNIQUE NOT NULL,
	password VARCHAR(50) NOT NULL,
	email VARCHAR(50) UNIQUE NOT NULL,
	address TEXT
);

CREATE TABLE products(
	product_id SERIAL PRIMARY KEY,
	product_name VARCHAR(100) UNIQUE NOT NULL,
	description TEXT,
	product_price DECIMAL(10,2) NOT NULL,
	stock_quantity INT NOT NULL,
	product_category VARCHAR(50)
);

CREATE TABLE orders (
	order_id SERIAL PRIMARY KEY,
	user_id INT NOT NULL,
	order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	total_amount DECIMAL(10,2) NOT NULL,
	status VARCHAR(20) DEFAULT 'Pending',
	FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE TABLE order_items (
	order_item_id SERIAL PRIMARY KEY,
	order_id INT NOT NULL,
	product_id INT NOT NULL,
	quantity INT NOT NULL,
	price_per_unit DECIMAL(10,2) NOT NULL,
	FOREIGN KEY (order_id) REFERENCES 
	orders(order_id) ON DELETE CASCADE,
	FOREIGN KEY (product_id) REFERENCES 
	products(product_id) ON DELETE CASCADE
);