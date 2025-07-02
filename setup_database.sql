CREATE TABLE IF NOT EXISTS "User" (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    hash VARCHAR(255) NOT NULL, 
    salt VARCHAR(255) NOT NULL,
    isPremium BOOLEAN NOT NULL DEFAULT false
);

INSERT INTO "User" (username, hash, salt, isPremium) VALUES
    ('pepita', 'e10adc3949ba59abbe56e057f20f883e123', '2M1AWK', false),
    ('marge', 'c85e25287b403444455018f2604618e4123', 'ABIQG', false),
    ('homero', '0192023a7bbd73250516f069df18b500123', 'Z58YA', true),
    ('bart', 'd8578edf8458ce06fbc5bb76a58c5ca4123', 'S4AXJ', false),
    ('lisa', 'e0600a98b482276532320b3353df6b5c123', 'AKO2M', false)
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