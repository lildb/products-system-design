
CREATE DATABASE store;

DROP TABLE product;

CREATE TABLE product (
  id INT GENERATED BY DEFAULT
    AS IDENTITY PRIMARY KEY,
  product_id INT,
  name VARCHAR(255),
  slogan VARCHAR(255),
  description VARCHAR(1000),
  category VARCHAR(64),
  default_price VARCHAR(64),
  styles VARCHAR(64)
);

DROP TABLE IF EXISTS style;

CREATE TABLE styles (
  id INT GENERATED BY DEFAULT
    AS IDENTITY PRIMARY KEY,
  product_id INT NOT NULL,
  name VARCHAR(255),
  sale_price INT,
  original_price VARCHAR(255),
  default_style VARCHAR(255),
  FOREIGN KEY (product_id)
    REFERENCES product(id)
);

DROP TABLE IF EXISTS related_product;

CREATE TABLE related_product (
  id INT GENERATED BY DEFAULT
    AS IDENTITY PRIMARY KEY,
  product_id INT NOT NULL,
  related_ids INT NOT NULL,
  FOREIGN KEY (product_id)
    REFERENCES product(id)
);

DROP TABLE IF EXISTS feature;

CREATE TABLE features (
  id INT GENERATED BY DEFAULT
    AS IDENTITY PRIMARY KEY,
  product_id INT NOT NULL,
  feature VARCHAR(255),
  value VARCHAR(255),
  FOREIGN KEY (product_id)
    REFERENCES product (id)
);

DROP TABLE IF EXISTS skus;

CREATE TABLE sku (
  id INT GENERATED BY DEFAULT
    AS IDENTITY PRIMARY KEY,
  style_id INT NOT NULL,
  size VARCHAR(255),
  quantity SMALLINT,
  sku SMALLINT,
  FOREIGN KEY (style_id)
    REFERENCES styles (id)
);

DROP TABLE IF EXISTS photos;

CREATE TABLE photos (
  id INT GENERATED BY DEFAULT
    AS IDENTITY PRIMARY KEY,
  style_id INT NOT NULL,
  thumbnail_url VARCHAR(255),
  url VARCHAR(1000),
  FOREIGN KEY (style_id)
    REFERENCES styles (id)
);

DROP TABLE IF EXISTS cart;

CREATE TABLE cart (
  id INT GENERATED BY DEFAULT
    AS IDENTITY PRIMARY KEY,
  sku_id INT NOT NULL,
  count INT NOT NULL,

)

-- \COPY photos (id, style_id, url, thumbnail_url) from './photosfixed.csv' DELIMITER ',' CSV HEADER ;
COPY product (id, name, slogan, description, category, default_price, styles) from './product.csv' DELIMITER ',' CSV HEADER ;
COPY styles (id, product_id, name, original_price, sale_price, default_val) from './styles.csv' DELIMITER ',' CSV HEADER ;
COPY features (id, product_id, feature, value) from './features.csv' DELIMITER ',' CSV HEADER ;
COPY photos (id, style_id, url, thumbnail_url) from './photosfixed.csv' DELIMITER ',' CSV HEADER ;
COPY sku (id, style_id, size, quantity, sku) from './sku.csv' DELIMITER ',' CSV HEADER ;

-- \COPY product (id, name, slogan, description, category, default_price) from './product.csv' DELIMITER ',' CSV HEADER ;
-- \COPY styles (id, product_id, name, original_price, sale_price, default_val) from './styles.csv' DELIMITER ',' CSV HEADER ;
-- \COPY features (id, product_id, feature, value) from './features.csv' DELIMITER ',' CSV HEADER ;
-- \COPY photos (id, style_id, url, thumbnail_url) from './photosfixed.csv' DELIMITER ',' CSV HEADER ;
-- \COPY sku (id, style_id, size, quantity, sku) from './sku.csv' DELIMITER ',' CSV HEADER ;



create index product_to_styles on styles(product_id);
create index style_to_sku on sku(style_id);
create index style_to_index on photos(style_id);
create index product_to_related on related_product(product_id);
create index product_to_features on features(product_id);










