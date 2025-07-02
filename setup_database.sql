CREATE TABLE IF NOT EXISTS "User" (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    hash VARCHAR(255) NOT NULL, 
    salt VARCHAR(255) NOT NULL,
    isPremium BOOLEAN NOT NULL DEFAULT false
);

INSERT INTO "User" (username, hash, salt, isPremium) VALUES
    ('otroUsuario', '574cae0c98bbe81699166cdab116ede6', '3XTWG', false),
    ('usuariousuario', '9b1cb5765eff6fe9be0433fd03b6ae57', 'DBIVKI', false),
    ('unAmigo', '396d2a8f9336fb61ef6e46febe1e8d6f', 'YICJV', false),
    ('wowowowowoww', 'e5e3fd68e7cbf3c495ebe87c063b9e7a', 'GKXRCH', false),
    ('julielcapo', 'ee399c35459295af0c23fac26771a7d2', 'WGBC5', false),
    ('pimipimipimipimi', '8d95471a146e7f406ef2663aab7041ad', 'WZCHB', false),
    ('elLocoPerez', 'e9d28e8bd48ef2d009465d58e3f4169a', 'IR0S1', false),
    ('nosequeesesto', 'ddb18669f87545f6cdd218e10ce29bed', '47R9NL', false),
    ('usuarioDeAdorno', '8ddb5b4967f6b3919bbdc1f021a6f1b4', '27DRH', false),
    ('usuarioCapo', 'a3844572a9ca3429e1f67495785e3827', 'MQL1X', true),
    ('esteEsRealmenteUnUsuario', 'dd38b94795a956ab112d9f467b15edce', 'PSTIIF', true),
    ('premium_test', '49d1d52a56e039df194f5187b18f46c1', 'EPNLP', true),
    ('nomehackees', '93b2ae676ee55417b6ebd415c8e39d21', 'XN3E8K', false),
    ('soyPremiumNoMePodesHackear', '5037b7f9c55841be7ccb0c65744fc774', '33QJL', true),
    ('spiderman', 'abd9b5529d4202fdc811c8fa06288a28', '78KRX', true),
    ('inhackeable', '52c0b20a6d1570d27e4d8d11f7c8c844', 'MLRD3F', true),
    ('yosoyunusuario', 'a2ab78207b60a21d94d43d12044dcfd4', 'P0JI9', true),
    ('usuario_normal', 'f2103403d62ae77969ee60ad33cfb1d4', '33V2TH', false)
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



