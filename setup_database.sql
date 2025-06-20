CREATE TABLE IF NOT EXISTS "User" (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

INSERT INTO "User" (username, password) VALUES
    ('pepita', '123'),
    ('user', 'password')
ON CONFLICT (username) DO NOTHING;


CREATE TABLE IF NOT EXISTS "CosasRandom"(
    id SERIAL PRIMARY KEY,
    comida VARCHAR(100) NOT NULL,
    bebida VARCHAR(100) NOT NULL,
    color VARCHAR(50) NOT NULL
);

INSERT INTO "CosasRandom" (comida, bebida, color) VALUES
    ('Pizza', 'Coca Cola', 'Rojo'),
    ('Tacos', 'Sprite', 'Verde'),
    ('Hamburguesa', 'Agua', 'Amarillo')