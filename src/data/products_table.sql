
DROP TABLE IF EXISTS "product", "order" CASCADE;
-- Creating the Products table
CREATE TABLE "product" (
    "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" VARCHAR(255) NOT NULL,
    "price" DECIMAL(10, 2) NOT NULL,
    "inventory" INTEGER NOT NULL,
    "image" VARCHAR(255) NOT NULL
);

CREATE TABLE "order" (
    "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "sessionId" VARCHAR(255) NOT NULL,
    "productId" INTEGER NOT NULL REFERENCES product("id") ON DELETE CASCADE,
    "price" DECIMAL(10, 2) NOT NULL,
    "quantity" INTEGER NOT NULL,
    "TotalpricePerUnit" DECIMAL(10, 2) NOT NULL
);

-- Inserting 20 sample fashion product entries
INSERT INTO "product" (name, price, inventory, image) VALUES 
    ('T-shirt Blanc', 19.99, 100, 'http://localhost:3000/images/products/T-shirtBlanc.webp'),
    ('Jean Slim Noir', 49.99, 75, 'http://localhost:3000/images/products/JeanSlimNoir.webp'),
    ('Chaussures de Sport', 89.99, 50, 'http://localhost:3000/images/products/ChaussuresdeSport.jpg'),
    ('Veste en Cuir', 199.99, 25, 'http://localhost:3000/images/products/VesteenCuir.webp'),
    ('Robe d''Été', 29.99, 60, 'http://localhost:3000/images/products/RobeEte.jpg'),
    ('Cravate en Soie', 24.99, 40, 'http://localhost:3000/images/products/CravateEnSoie.webp'),
    ('Sac à Main', 59.99, 30, 'http://localhost:3000/images/products/SacaMain.webp'),
    ('Chapeau Panama', 34.99, 20, 'http://localhost:3000/images/products/ChapeauPanama.jpeg'),
    ('Écharpe en Laine', 29.99, 45, 'http://localhost:3000/images/products/EcharpeEnLaine.webp'),
    ('Ceinture en Cuir', 39.99, 70, 'http://localhost:3000/images/products/CeintureEnCuir.jpg'),
    ('Montre Classique', 149.99, 15, 'http://localhost:3000/images/products/MontreClassique.webp'),
    ('Bottes en Cuir', 99.99, 40, 'http://localhost:3000/images/products/BottesenCuir.webp'),
    ('Lunettes de Soleil', 79.99, 50, 'http://localhost:3000/images/products/LunettesdeSoleil.jpg'),
    ('Chemise à Carreaux', 44.99, 55, 'http://localhost:3000/images/products/ChemiseCarreaux.jpg'),
    ('Pull-over Gris', 64.99, 35, 'http://localhost:3000/images/products/Pull-overGris.jpg'),
    ('Short en Jean', 39.99, 60, 'http://localhost:3000/images/products/ShortenJean.jpg'),
    ('Sandales d''Été', 49.99, 40, 'http://localhost:3000/images/products/Sandales.jpeg'),
    ('Bijoux Fantaisie', 14.99, 85, 'http://localhost:3000/images/products/BijouxFantaisie.webp'),
    ('Pantalon Chino', 54.99, 50, 'http://localhost:3000/images/products/PantalonChino.webp'),
    ('Blouse Florale', 39.99, 40, 'http://localhost:3000/images/products/BlouseFlorale.jpg');
