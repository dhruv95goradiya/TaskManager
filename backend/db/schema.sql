-- db/schema.sql
CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    description TEXT,
    due_date DATE,
    status VARCHAR(50)
);
