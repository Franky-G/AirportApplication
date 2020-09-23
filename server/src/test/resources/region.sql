-- MariaDB dump 10.17  Distrib 10.4.14-MariaDB, for Linux (x86_64)
--
-- Host: faure    Database: cs314
-- ------------------------------------------------------
-- Server version	10.3.22-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `region`
--

DROP TABLE IF EXISTS `region`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `region` (
  `index` int(11) NOT NULL,
  `id` varchar(100) NOT NULL,
  `local_code` varchar(10) DEFAULT NULL,
  `name` varchar(200) DEFAULT NULL,
  `continent` varchar(10) DEFAULT NULL,
  `iso_country` varchar(10) DEFAULT NULL,
  `wikipedia_link` varchar(1000) DEFAULT NULL,
  `keywords` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`id`),
  FULLTEXT KEY `regions_name_idx` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `region`
--
-- WHERE:  1 order by name limit 150

LOCK TABLES `region` WRITE;
/*!40000 ALTER TABLE `region` DISABLE KEYS */;
INSERT INTO `region` VALUES (302818,'AD-U-A','U-A','(unassigned)','EU','AD',NULL,NULL),(302825,'AE-U-A','U-A','(unassigned)','AS','AE',NULL,NULL),(302857,'AF-U-A','U-A','(unassigned)','AS','AF',NULL,NULL),(302860,'AG-U-A','U-A','(unassigned)','NA','AG',NULL,NULL),(302861,'AI-U-A','U-A','(unassigned)','NA','AI',NULL,NULL),(302897,'AL-U-A','U-A','(unassigned)','EU','AL',NULL,NULL),(302909,'AM-U-A','U-A','(unassigned)','AS','AM',NULL,NULL),(302928,'AO-U-A','U-A','(unassigned)','AF','AO',NULL,NULL),(302931,'AQ-U-A','U-A','(unassigned)','AN','AQ',NULL,NULL),(302950,'AR-U-A','U-A','(unassigned)','SA','AR',NULL,NULL),(302956,'AS-U-A','U-A','(unassigned)','OC','AS',NULL,NULL),(302966,'AT-U-A','U-A','(unassigned)','EU','AT',NULL,NULL),(302974,'AU-U-A','U-A','(unassigned)','OC','AU',NULL,NULL),(302977,'AW-U-A','U-A','(unassigned)','NA','AW',NULL,NULL),(303039,'AZ-U-A','U-A','(unassigned)','AS','AZ',NULL,NULL),(303054,'BA-U-A','U-A','(unassigned)','EU','BA',NULL,NULL),(303066,'BB-U-A','U-A','(unassigned)','NA','BB',NULL,NULL),(303067,'BD-U-A','U-A','(unassigned)','AS','BD',NULL,NULL),(303069,'BE-U-A','U-A','(unassigned)','EU','BE',NULL,NULL),(303120,'BF-U-A','U-A','(unassigned)','AF','BF',NULL,NULL),(303153,'BG-U-A','U-A','(unassigned)','EU','BG',NULL,NULL),(303154,'BH-U-A','U-A','(unassigned)','AS','BH',NULL,NULL),(303169,'BI-U-A','U-A','(unassigned)','AF','BI',NULL,NULL),(303181,'BJ-U-A','U-A','(unassigned)','AF','BJ',NULL,NULL),(306727,'BL-U-A','U-A','(unassigned)','NA','BL',NULL,NULL),(303183,'BM-U-A','U-A','(unassigned)','NA','BM',NULL,NULL),(303188,'BN-U-A','U-A','(unassigned)','AS','BN',NULL,NULL),(303198,'BO-U-A','U-A','(unassigned)','SA','BO',NULL,NULL),(302911,'BQ-U-A','U-A','(unassigned)','NA','BQ',NULL,NULL),(303226,'BR-U-A','U-A','(unassigned)','SA','BR',NULL,NULL),(303248,'BS-U-A','U-A','(unassigned)','NA','BS',NULL,NULL),(303269,'BT-U-A','U-A','(unassigned)','AS','BT',NULL,NULL),(303279,'BW-U-A','U-A','(unassigned)','AF','BW',NULL,NULL),(303285,'BY-U-A','U-A','(unassigned)','EU','BY',NULL,NULL),(303293,'BZ-U-A','U-A','(unassigned)','NA','BZ',NULL,NULL),(303306,'CA-U-A','U-A','(unassigned)','NA','CA',NULL,NULL),(303308,'CC-U-A','U-A','(unassigned)','AS','CC',NULL,NULL),(303321,'CD-U-A','U-A','(unassigned)','AF','CD',NULL,NULL),(303337,'CF-U-A','U-A','(unassigned)','AF','CF',NULL,NULL),(303351,'CG-U-A','U-A','(unassigned)','AF','CG',NULL,NULL),(303373,'CH-U-A','U-A','(unassigned)','EU','CH',NULL,NULL),(303395,'CI-U-A','U-A','(unassigned)','AF','CI',NULL,NULL),(303396,'CK-U-A','U-A','(unassigned)','OC','CK',NULL,NULL),(303409,'CL-U-A','U-A','(unassigned)','SA','CL',NULL,NULL),(303421,'CM-U-A','U-A','(unassigned)','AF','CM',NULL,NULL),(303456,'CN-U-A','U-A','(unassigned)','AS','CN',NULL,NULL),(303487,'CO-U-A','U-A','(unassigned)','SA','CO',NULL,NULL),(303498,'CR-U-A','U-A','(unassigned)','NA','CR',NULL,NULL),(303520,'CU-U-A','U-A','(unassigned)','NA','CU',NULL,NULL),(303523,'CV-U-A','U-A','(unassigned)','AF','CV',NULL,NULL),(306901,'CW-U-A','U-A','(unassigned)','NA','CW',NULL,NULL),(303524,'CX-U-A','U-A','(unassigned)','AS','CX',NULL,NULL),(303531,'CY-U-A','U-A','(unassigned)','AS','CY',NULL,NULL),(303543,'CZ-U-A','U-A','(unassigned)','EU','CZ',NULL,NULL),(303563,'DE-U-A','U-A','(unassigned)','EU','DE',NULL,NULL),(303569,'DJ-U-A','U-A','(unassigned)','AF','DJ',NULL,NULL),(303570,'DK-U-A','U-A','(unassigned)','EU','DK',NULL,NULL),(303571,'DM-U-A','U-A','(unassigned)','NA','DM',NULL,NULL),(303602,'DO-U-A','U-A','(unassigned)','NA','DO',NULL,NULL),(303651,'DZ-U-A','U-A','(unassigned)','AF','DZ',NULL,NULL),(303670,'EC-U-A','U-A','(unassigned)','SA','EC',NULL,NULL),(303690,'EE-U-A','U-A','(unassigned)','EU','EE',NULL,NULL),(303716,'EG-U-A','U-A','(unassigned)','AF','EG',NULL,NULL),(303718,'EH-U-A','U-A','(unassigned)','AF','EH',NULL,NULL),(303725,'ER-U-A','U-A','(unassigned)','AF','ER',NULL,NULL),(303781,'ES-U-A','U-A','(unassigned)','EU','ES',NULL,NULL),(303798,'ET-U-A','U-A','(unassigned)','AF','ET',NULL,NULL),(303805,'FI-U-A','U-A','(unassigned)','EU','FI',NULL,NULL),(303810,'FJ-U-A','U-A','(unassigned)','OC','FJ',NULL,NULL),(303812,'FK-U-A','U-A','(unassigned)','SA','FK',NULL,NULL),(303816,'FM-U-A','U-A','(unassigned)','OC','FM',NULL,NULL),(303818,'FO-U-A','U-A','(unassigned)','EU','FO',NULL,NULL),(303819,'FR-U-A','U-A','(unassigned)','EU','FR',NULL,NULL),(303829,'GA-U-A','U-A','(unassigned)','AF','GA',NULL,NULL),(303830,'GB-U-A','U-A','(unassigned)','EU','GB',NULL,'keep'),(303837,'GD-U-A','U-A','(unassigned)','NA','GD',NULL,NULL),(303838,'GE-U-A','U-A','(unassigned)','AS','GE',NULL,NULL),(303839,'GF-U-A','U-A','(unassigned)','SA','GF',NULL,NULL),(303840,'GG-U-A','U-A','(unassigned)','EU','GG',NULL,NULL),(303848,'GH-U-A','U-A','(unassigned)','AF','GH',NULL,NULL),(303852,'GI-U-A','U-A','(unassigned)','EU','GI',NULL,NULL),(303853,'GL-U-A','U-A','(unassigned)','NA','GL',NULL,NULL),(303860,'GM-U-A','U-A','(unassigned)','AF','GM',NULL,NULL),(303894,'GN-U-A','U-A','(unassigned)','AF','GN',NULL,NULL),(303896,'GP-U-A','U-A','(unassigned)','NA','GP',NULL,NULL),(303905,'GQ-U-A','U-A','(unassigned)','AF','GQ',NULL,NULL),(303958,'GR-U-A','U-A','(unassigned)','EU','GR',NULL,NULL),(303959,'GS-U-A','U-A','(unassigned)','AN','GS',NULL,NULL),(303981,'GT-U-A','U-A','(unassigned)','NA','GT',NULL,NULL),(303983,'GU-U-A','U-A','(unassigned)','OC','GU',NULL,NULL),(303993,'GW-U-A','U-A','(unassigned)','AF','GW',NULL,NULL),(304002,'GY-U-A','U-A','(unassigned)','SA','GY',NULL,NULL),(304005,'HK-U-A','U-A','(unassigned)','AS','HK',NULL,NULL),(304022,'HN-U-A','U-A','(unassigned)','NA','HN',NULL,NULL),(304045,'HR-U-A','U-A','(unassigned)','EU','HR',NULL,NULL),(304054,'HT-U-A','U-A','(unassigned)','NA','HT',NULL,NULL),(304092,'HU-U-A','U-A','(unassigned)','EU','HU',NULL,NULL),(304127,'ID-U-A','U-A','(unassigned)','AS','ID',NULL,NULL),(304151,'IE-U-A','U-A','(unassigned)','EU','IE',NULL,NULL),(304161,'IL-U-A','U-A','(unassigned)','AS','IL',NULL,NULL),(304163,'IM-U-A','U-A','(unassigned)','EU','IM',NULL,NULL),(304195,'IN-U-A','U-A','(unassigned)','AS','IN',NULL,NULL),(304199,'IO-U-A','U-A','(unassigned)','AS','IO',NULL,NULL),(304217,'IQ-U-A','U-A','(unassigned)','AS','IQ',NULL,NULL),(304246,'IR-U-A','U-A','(unassigned)','AS','IR',NULL,NULL),(304255,'IS-U-A','U-A','(unassigned)','EU','IS',NULL,NULL),(304256,'IT-U-A','U-A','(unassigned)','EU','IT',NULL,NULL),(304257,'JE-U-A','U-A','(unassigned)','EU','JE',NULL,NULL),(304272,'JM-U-A','U-A','(unassigned)','NA','JM',NULL,NULL),(304285,'JO-U-A','U-A','(unassigned)','AS','JO',NULL,NULL),(304333,'JP-U-A','U-A','(unassigned)','AS','JP',NULL,NULL),(304342,'KE-U-A','U-A','(unassigned)','AF','KE',NULL,NULL),(304350,'KG-U-A','U-A','(unassigned)','AS','KG',NULL,NULL),(304376,'KH-U-A','U-A','(unassigned)','AS','KH',NULL,NULL),(304380,'KI-U-A','U-A','(unassigned)','OC','KI',NULL,NULL),(304384,'KM-U-A','U-A','(unassigned)','AF','KM',NULL,NULL),(304385,'KN-U-A','U-A','(unassigned)','NA','KN',NULL,NULL),(304398,'KP-U-A','U-A','(unassigned)','AS','KP',NULL,NULL),(304416,'KR-U-A','U-A','(unassigned)','AS','KR',NULL,NULL),(306323,'KS-U-A','U-A','(unassigned)','EU','XK',NULL,NULL),(304422,'KW-U-A','U-A','(unassigned)','AS','KW',NULL,NULL),(304423,'KY-U-A','U-A','(unassigned)','NA','KY',NULL,NULL),(304436,'KZ-U-A','U-A','(unassigned)','AS','KZ',NULL,NULL),(304453,'LA-U-A','U-A','(unassigned)','AS','LA',NULL,NULL),(304465,'LB-U-A','U-A','(unassigned)','AS','LB',NULL,NULL),(304466,'LC-U-A','U-A','(unassigned)','NA','LC',NULL,NULL),(304467,'LI-U-A','U-A','(unassigned)','EU','LI',NULL,NULL),(304468,'LK-U-A','U-A','(unassigned)','AS','LK',NULL,NULL),(304482,'LR-U-A','U-A','(unassigned)','AF','LR',NULL,NULL),(304493,'LS-U-A','U-A','(unassigned)','AF','LS',NULL,NULL),(304502,'LT-U-A','U-A','(unassigned)','EU','LT',NULL,NULL),(304507,'LU-U-A','U-A','(unassigned)','EU','LU',NULL,NULL),(304537,'LV-U-A','U-A','(unassigned)','EU','LV',NULL,NULL),(304560,'LY-U-A','U-A','(unassigned)','AF','LY',NULL,NULL),(304615,'MA-U-A','U-A','(unassigned)','AF','MA',NULL,NULL),(304616,'MC-U-A','U-A','(unassigned)','EU','MC',NULL,NULL),(304620,'MD-U-A','U-A','(unassigned)','EU','MD',NULL,NULL),(304622,'ME-U-A','U-A','(unassigned)','EU','ME',NULL,NULL),(306728,'MF-U-A','U-A','(unassigned)','NA','MF',NULL,NULL),(304629,'MG-U-A','U-A','(unassigned)','AF','MG',NULL,NULL),(304649,'MH-U-A','U-A','(unassigned)','OC','MH',NULL,NULL),(304655,'MK-U-A','U-A','(unassigned)','EU','MK',NULL,NULL),(304665,'ML-U-A','U-A','(unassigned)','AF','ML',NULL,NULL),(304680,'MM-U-A','U-A','(unassigned)','AS','MM',NULL,NULL),(304703,'MN-U-A','U-A','(unassigned)','AS','MN',NULL,NULL),(304704,'MO-U-A','U-A','(unassigned)','AS','MO',NULL,NULL),(304705,'MP-U-A','U-A','(unassigned)','OC','MP',NULL,NULL),(304706,'MQ-U-A','U-A','(unassigned)','NA','MQ',NULL,NULL),(304720,'MR-U-A','U-A','(unassigned)','AF','MR',NULL,NULL),(304721,'MS-U-A','U-A','(unassigned)','NA','MS',NULL,NULL);
/*!40000 ALTER TABLE `region` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-09-23 16:59:17
