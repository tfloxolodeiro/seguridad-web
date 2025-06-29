CREATE TABLE IF NOT EXISTS "User" (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    hash VARCHAR(255) NOT NULL, 
    salt VARCHAR(255) NOT NULL
);

INSERT INTO "User" (username, hash, salt) VALUES
    ('pepita', 'e10adc3949ba59abbe56e057f20f883e123', '483920'),
    ('marge', 'c85e25287b403444455018f2604618e4123', '192837'),
    ('homero', '0192023a7bbd73250516f069df18b500123', '564738'),
    ('bart', 'd8578edf8458ce06fbc5bb76a58c5ca4123', '837465'),
    ('lisa', 'e0600a98b482276532320b3353df6b5c123', '274910')
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