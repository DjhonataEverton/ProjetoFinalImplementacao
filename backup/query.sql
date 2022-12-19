CREATE DATABASE IF NOT EXISTS apiCrud;

use apiCrud;
CREATE TABLE IF NOT EXISTS encomendas (
	codigo INT PRIMARY KEY AUTO_INCREMENT,
    data_de_entrega DATE NOT NULL,
	produto ENUM('Queijo de coalho','Leite condensado','Queijo do reino','Iogurte', 'Queijo Gouda') NOT NULL,
	quantidade INT NOT NULL,
	cliente VARCHAR(50) NOT NULL
);

INSERT INTO encomendas (data_de_entrega, produto, quantidade, cliente) VALUES ('2022-01-02', 'Queijo de coalho', 10, 'João');
INSERT INTO encomendas (data_de_entrega, produto, quantidade, cliente) VALUES ('2022-01-02', 'Iogurte', 5, 'Maria');
SELECT * FROM encomendas;