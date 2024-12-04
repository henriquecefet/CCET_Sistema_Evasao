CREATE TABLE sistema_predicao_evasao_versao_2.log_predicao (
  idlog_predicao INT NOT NULL AUTO_INCREMENT,
  data DATETIME NULL,
  predicao VARCHAR(60) NULL,
  curso VARCHAR(60) NULL,
  matricula VARCHAR(60) NULL,
  PRIMARY KEY (idlog_predicao)
);

