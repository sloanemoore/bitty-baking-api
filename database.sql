
-- Create the database
CREATE DATABASE bittybaking;
USE bittybaking;


-- Create the tables
CREATE TABLE menu (
    itemId INT AUTO_INCREMENT PRIMARY KEY,
    itemName VARCHAR(255) NOT NULL,
    itemType VARCHAR(255) NOT NULL
);

CREATE TABLE orders (
	orderId INT AUTO_INCREMENT PRIMARY KEY,
	customerName VARCHAR(255) NOT NULL,
    itemId INT NOT NULL,
    FOREIGN KEY (itemId) REFERENCES menu(itemId)
);

-- Add data to the menu table
INSERT INTO menu (itemName, itemType)
	VALUES ('chocolate chip cookie', 'cookie'),
	('sugar cookie', 'cookie'),
    ('lemon cookie', 'cookie'),
    ('chocolate cupcake', 'cupcake'),
    ('vanilla cupcake', 'cupcake');
