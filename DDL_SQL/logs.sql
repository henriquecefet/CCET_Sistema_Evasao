CREATE TABLE `log_predicao` (
  `idlog_predicao` int NOT NULL AUTO_INCREMENT,
  `data` datetime DEFAULT NULL,
  `predicao` varchar(60) DEFAULT NULL,
  `curso` varchar(60) DEFAULT NULL,
  `usuario` varchar(200) DEFAULT NULL,
  `ip_usuario` varchar(45) DEFAULT NULL,
  `matricula` varchar(60) DEFAULT NULL,
  PRIMARY KEY (`idlog_predicao`)
) ENGINE=InnoDB AUTO_INCREMENT=3317 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci
