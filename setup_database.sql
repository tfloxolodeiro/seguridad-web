CREATE TABLE IF NOT EXISTS "User" (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

INSERT INTO "User" (username, password) VALUES
    ('pepita', '123'),
    ('user', 'password')
ON CONFLICT (username) DO NOTHING;