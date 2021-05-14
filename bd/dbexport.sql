-- MySQL dump 10.13  Distrib 8.0.25, for Linux (x86_64)
--
-- Host: localhost    Database: tfg
-- ------------------------------------------------------
-- Server version	8.0.25-0ubuntu0.20.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Categoria`
--

DROP TABLE IF EXISTS `Categoria`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Categoria` (
  `nom` varchar(255) NOT NULL,
  PRIMARY KEY (`nom`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Categoria`
--

LOCK TABLES `Categoria` WRITE;
/*!40000 ALTER TABLE `Categoria` DISABLE KEYS */;
INSERT INTO `Categoria` VALUES ('Altres'),('Deixalla'),('Electrodomèstic'),('Mobles'),('Residus');
/*!40000 ALTER TABLE `Categoria` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Contenidor`
--

DROP TABLE IF EXISTS `Contenidor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Contenidor` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(255) NOT NULL,
  `idUbicacio` varchar(255) DEFAULT NULL,
  `pes` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idUbicacio` (`idUbicacio`),
  CONSTRAINT `Contenidor_ibfk_1` FOREIGN KEY (`idUbicacio`) REFERENCES `Ubicacio` (`TAG`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Contenidor`
--

LOCK TABLES `Contenidor` WRITE;
/*!40000 ALTER TABLE `Contenidor` DISABLE KEYS */;
INSERT INTO `Contenidor` VALUES (8,'C1','N2',0),(9,'C2','W3',0),(10,'C3','S2',0),(11,'C4','C3',0);
/*!40000 ALTER TABLE `Contenidor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Producte`
--

DROP TABLE IF EXISTS `Producte`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Producte` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(255) NOT NULL,
  `pes` int NOT NULL,
  `descripcio` varchar(255) DEFAULT NULL,
  `idCategoria` varchar(255) NOT NULL,
  `idImatge` varchar(255) DEFAULT NULL,
  `disponible` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idCategoria` (`idCategoria`),
  CONSTRAINT `Producte_ibfk_2` FOREIGN KEY (`idCategoria`) REFERENCES `Categoria` (`nom`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=129 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Producte`
--

LOCK TABLES `Producte` WRITE;
/*!40000 ALTER TABLE `Producte` DISABLE KEYS */;
INSERT INTO `Producte` VALUES (123,'nevera',80,'nevera en perfecte estat','Electrodomèstic','3f6723d8-34cd-411a-943b-988a3d1726a7.png',1),(124,'moble',50,'moble vell','Mobles','84f22fd5-7ee4-4c97-b1fe-fa89aa9d94df.jpg',1),(125,'llibres',5,'llibres antics','Altres','c0e2daef-92fb-495d-8a46-de448ea5f416.jpg',1),(126,'sofa',80,'sofa nou','Mobles','d47f2329-3f71-4f4c-87d0-2d57bafefad7.jpg',1),(127,'Opel corsa',1500,'cotxe ','Altres','e552ddba-905c-455b-b2e2-8ee2ff9313b9.jpg',1),(128,'Taula',20,'Taula de menjador','Mobles','mesa.jpg',1);
/*!40000 ALTER TABLE `Producte` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Recollida`
--

DROP TABLE IF EXISTS `Recollida`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Recollida` (
  `id` int NOT NULL AUTO_INCREMENT,
  `date` date NOT NULL,
  `time` time NOT NULL,
  `idVehicle` int NOT NULL,
  `idUsuari` int DEFAULT NULL,
  `realitzada` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idVehicle` (`idVehicle`),
  KEY `idUsuari` (`idUsuari`),
  CONSTRAINT `Recollida_ibfk_2` FOREIGN KEY (`idVehicle`) REFERENCES `Vehicle` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Recollida_ibfk_3` FOREIGN KEY (`idUsuari`) REFERENCES `Usuari` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=128 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Recollida`
--

LOCK TABLES `Recollida` WRITE;
/*!40000 ALTER TABLE `Recollida` DISABLE KEYS */;
INSERT INTO `Recollida` VALUES (90,'2021-04-26','10:39:00',1,785,1),(112,'2021-05-07','13:20:00',1,785,1),(113,'2021-05-10','12:20:00',1,785,1),(114,'2021-05-10','13:00:02',1,785,1),(126,'2021-05-13','11:41:00',1,785,1),(127,'2021-05-13','11:41:00',2,785,1);
/*!40000 ALTER TABLE `Recollida` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Recollida_Contenidor`
--

DROP TABLE IF EXISTS `Recollida_Contenidor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Recollida_Contenidor` (
  `idRecollida` int NOT NULL,
  `idContenidor` int NOT NULL,
  PRIMARY KEY (`idRecollida`,`idContenidor`),
  KEY `idContenidor` (`idContenidor`),
  CONSTRAINT `Recollida_Contenidor_ibfk_1` FOREIGN KEY (`idRecollida`) REFERENCES `Recollida` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Recollida_Contenidor_ibfk_2` FOREIGN KEY (`idContenidor`) REFERENCES `Contenidor` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Recollida_Contenidor`
--

LOCK TABLES `Recollida_Contenidor` WRITE;
/*!40000 ALTER TABLE `Recollida_Contenidor` DISABLE KEYS */;
INSERT INTO `Recollida_Contenidor` VALUES (90,8),(112,8),(113,8),(114,8),(126,8),(90,9),(112,9),(113,9),(90,10),(112,10),(113,10),(114,10),(114,11),(127,11);
/*!40000 ALTER TABLE `Recollida_Contenidor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Reserva`
--

DROP TABLE IF EXISTS `Reserva`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Reserva` (
  `id` int NOT NULL AUTO_INCREMENT,
  `date` date NOT NULL,
  `time` time NOT NULL,
  `idVehicle` int NOT NULL,
  `idUbicacio` varchar(255) NOT NULL,
  `idUsuari` int DEFAULT NULL,
  `tipus` varchar(255) DEFAULT NULL,
  `realitzada` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idVehicle` (`idVehicle`),
  KEY `idUbicacio` (`idUbicacio`),
  KEY `idUsuari` (`idUsuari`),
  CONSTRAINT `Reserva_ibfk_1` FOREIGN KEY (`idVehicle`) REFERENCES `Vehicle` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Reserva_ibfk_3` FOREIGN KEY (`idUbicacio`) REFERENCES `Ubicacio` (`TAG`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Reserva_ibfk_4` FOREIGN KEY (`idUsuari`) REFERENCES `Usuari` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=151 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Reserva`
--

LOCK TABLES `Reserva` WRITE;
/*!40000 ALTER TABLE `Reserva` DISABLE KEYS */;
INSERT INTO `Reserva` VALUES (146,'2021-04-16','12:30:00',1,'C3',784,'porta',1),(148,'2021-05-10','12:17:08',1,'N1',785,'porta',1);
/*!40000 ALTER TABLE `Reserva` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Reserva_Producte`
--

DROP TABLE IF EXISTS `Reserva_Producte`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Reserva_Producte` (
  `idReserva` int NOT NULL,
  `idProducte` int NOT NULL,
  PRIMARY KEY (`idReserva`,`idProducte`),
  KEY `idProducte` (`idProducte`),
  CONSTRAINT `Reserva_Producte_ibfk_1` FOREIGN KEY (`idReserva`) REFERENCES `Reserva` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Reserva_Producte_ibfk_2` FOREIGN KEY (`idProducte`) REFERENCES `Producte` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Reserva_Producte`
--

LOCK TABLES `Reserva_Producte` WRITE;
/*!40000 ALTER TABLE `Reserva_Producte` DISABLE KEYS */;
INSERT INTO `Reserva_Producte` VALUES (146,123),(146,124),(146,125),(146,126),(146,127),(148,128);
/*!40000 ALTER TABLE `Reserva_Producte` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Solicitud`
--

DROP TABLE IF EXISTS `Solicitud`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Solicitud` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombreContenidor` int NOT NULL,
  `pesContenidor` int NOT NULL,
  `activada` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Solicitud`
--

LOCK TABLES `Solicitud` WRITE;
/*!40000 ALTER TABLE `Solicitud` DISABLE KEYS */;
INSERT INTO `Solicitud` VALUES (2,1,50,1);
/*!40000 ALTER TABLE `Solicitud` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Ubicacio`
--

DROP TABLE IF EXISTS `Ubicacio`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Ubicacio` (
  `TAG` varchar(255) NOT NULL,
  PRIMARY KEY (`TAG`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Ubicacio`
--

LOCK TABLES `Ubicacio` WRITE;
/*!40000 ALTER TABLE `Ubicacio` DISABLE KEYS */;
INSERT INTO `Ubicacio` VALUES ('B1'),('B2'),('B3'),('B4'),('B5'),('B6'),('B7'),('C1'),('C2'),('C3'),('C4'),('E1'),('E2'),('E3'),('E4'),('N1'),('N2'),('N3'),('N4'),('N5'),('N6'),('N7'),('NE'),('NW'),('S1'),('S2'),('S3'),('S4'),('S5'),('S6'),('S7'),('SE'),('SW'),('UB'),('W1'),('W2'),('W3'),('W4');
/*!40000 ALTER TABLE `Ubicacio` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Usuari`
--

DROP TABLE IF EXISTS `Usuari`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Usuari` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(255) NOT NULL,
  `cognom` varchar(255) NOT NULL,
  `mail` varchar(255) NOT NULL,
  `telefon` int NOT NULL,
  `contrasenya` varchar(255) NOT NULL,
  `dataRegistre` date NOT NULL,
  `admin` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `mail` (`mail`)
) ENGINE=InnoDB AUTO_INCREMENT=806 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Usuari`
--

LOCK TABLES `Usuari` WRITE;
/*!40000 ALTER TABLE `Usuari` DISABLE KEYS */;
INSERT INTO `Usuari` VALUES (784,'marc','mila','ian@gorro.com',620669401,'A8D2975BC794D5BA7903A489D35BBBC6','2021-03-23',0),(785,'x','x','x',6,'1BB7C8E88260F3D4FD824410BE514FD2','2021-03-31',1),(789,'francesc','saparra','fcesc@gmail.com',609,'BB99BCE20DAF91868272E647518FB569','2021-04-09',0),(805,'admin','admin','admin@gmail.com',609,'0856AFAD64692FCA2161A9583577DD2A','2021-05-13',1);
/*!40000 ALTER TABLE `Usuari` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Vehicle`
--

DROP TABLE IF EXISTS `Vehicle`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Vehicle` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(255) NOT NULL,
  `pes` int DEFAULT NULL,
  `ip` varchar(255) DEFAULT NULL,
  `lliure` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `ip` (`ip`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Vehicle`
--

LOCK TABLES `Vehicle` WRITE;
/*!40000 ALTER TABLE `Vehicle` DISABLE KEYS */;
INSERT INTO `Vehicle` VALUES (1,'v1',0,'10.0.1.172',1),(2,'v2',0,'10.0.1.187',1);
/*!40000 ALTER TABLE `Vehicle` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'tfg'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-05-14 12:58:13
