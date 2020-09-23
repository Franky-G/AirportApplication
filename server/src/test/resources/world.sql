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
-- Table structure for table `world`
--

DROP TABLE IF EXISTS `world`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `world` (
  `index` int(11) NOT NULL,
  `id` varchar(30) NOT NULL,
  `type` varchar(100) DEFAULT NULL,
  `name` varchar(1000) DEFAULT NULL,
  `latitude` varchar(1000) DEFAULT NULL,
  `longitude` varchar(1000) DEFAULT NULL,
  `altitude` varchar(1000) DEFAULT NULL,
  `continent` varchar(1000) DEFAULT NULL,
  `iso_country` varchar(1000) DEFAULT NULL,
  `iso_region` varchar(1000) DEFAULT NULL,
  `municipality` varchar(1000) DEFAULT NULL,
  `scheduled_service` varchar(1000) DEFAULT NULL,
  `gps_code` varchar(1000) DEFAULT NULL,
  `iata_code` varchar(1000) DEFAULT NULL,
  `local_code` varchar(1000) DEFAULT NULL,
  `home_link` varchar(1000) DEFAULT NULL,
  `wikipedia_link` varchar(1000) DEFAULT NULL,
  `keywords` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`id`),
  FULLTEXT KEY `airports_name_idx` (`name`),
  FULLTEXT KEY `airpots_municipality_idx` (`municipality`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `world`
--
-- WHERE:  1 order by name limit 150

LOCK TABLES `world` WRITE;
/*!40000 ALTER TABLE `world` DISABLE KEYS */;
INSERT INTO `world` VALUES (312571,'DE-0140','small_airport','\"Der Dingel\" Airfield','51.536','9.3805','718','EU','DE','DE-HE','Hofgeismar','no',NULL,NULL,NULL,'http://www.lsv-hofgeismar.de/dingel_neu/flugplatz.html',NULL,NULL),(43758,'EBSN','closed','\'S Gravenvoeren heliport','50.764771','5.786845','394','EU','BE','BE-WLG','\'S Gravenvoeren','no','EBSN',NULL,NULL,NULL,NULL,NULL),(43726,'EBAS','heliport','\'s Gravenwezel heliport','51.246944427490234','4.542778015136719','20','EU','BE','BE-VAN','Schilde','no','EBAS',NULL,NULL,NULL,NULL,NULL),(320388,'RTS','small_airport','(Duplicate) Rottnest Island Airport','-32.0067','115.5367',NULL,'OC','AU','AU-WA',NULL,'yes','YRTI','RTS',NULL,NULL,NULL,NULL),(35410,'AR-0016','closed','(Old) Antoine De Saint Exupery Airport','-40.7401008606','-64.9804992676','85','SA','AR','AR-R','San Antonio Oeste','no',NULL,NULL,'OES',NULL,NULL,NULL),(30601,'PK-0001','large_airport','(Under construction) New Islamabad International Airport','33.560714','72.851614','646','AS','PK','PK-PB','Islamabad','no',NULL,NULL,NULL,'http://www.niia.com.pk/','http://en.wikipedia.org/wiki/New_Islamabad_International_Airport','Fateh Jang'),(11182,'46TE','small_airport','02 Ranch Airport','29.874900817871094','-103.6969985961914','3799','NA','US','US-TX','Alpine','no','46TE',NULL,'46TE',NULL,NULL,NULL),(315350,'UNSR','heliport','1 Razryvno-Moiseevskaya Helipad','58.095','76.0083','357','EU','RU','RU-TOM',NULL,'no','UNSR',NULL,'UNSR',NULL,NULL,'????, 1-? ????????-???????????'),(24957,'TN41','small_airport','100 Aker Wood Airport','35.77280044555664','-84.76529693603516','809','NA','US','US-TN','Spring City','no','TN41',NULL,'TN41',NULL,NULL,NULL),(25648,'WA54','heliport','1001 Fourth Avenue Plaza Heliport','47.6068000793457','-122.33399963378906','716','NA','US','US-WA','Seattle','no','WA54',NULL,'WA54',NULL,NULL,NULL),(24864,'TE56','heliport','11 Tv Dallas Heliport','32.885101318359375','-96.70719909667969','595','NA','US','US-TX','Dallas','no','TE56',NULL,'TE56',NULL,NULL,NULL),(11242,'48IN','heliport','123 Arcom Heliport','39.8588981628418','-85.99829864501953','850','NA','US','US-IN','Indianapolis','no','48IN',NULL,'48IN',NULL,NULL,NULL),(38694,'AR-0019','small_airport','13 De Diciembre Airport','-45.9033','-67.5564','170','SA','AR','AR-U','Comodoro Rivadavia','no',NULL,NULL,'ICO',NULL,NULL,NULL),(37597,'SSOK','small_airport','14 Bis Airport','-23.214166641200002','-51.185832977299995','1932','SA','BR','BR-PR','Londrina','no','SSOK',NULL,NULL,NULL,NULL,NULL),(42744,'CA-0043','small_airport','1669 Diamondview Road Private Strip','45.31809997558594','-76.05599975585938',NULL,'NA','CA','CA-ON','Carp','no',NULL,NULL,NULL,NULL,NULL,NULL),(42745,'CA-0062','small_airport','1797 Diamondview Road Private Strip','45.331119537353516','-76.07295989990234',NULL,'NA','CA','CA-ON','Carp','no',NULL,NULL,NULL,NULL,NULL,NULL),(315351,'UNSB','heliport','181 Sobolinaya Helipad','58.4589','79.5317','234','EU','RU','RU-TOM',NULL,'no','UNSB',NULL,'UNSB',NULL,NULL,'????, 181 ?????????'),(16400,'AZ12','heliport','183 Mile Heliport','36.108299255371094','-113.21299743652344','1705','NA','US','US-AZ','Peach Springs','no','AZ12',NULL,'AZ12',NULL,NULL,NULL),(13439,'6NJ6','heliport','185 Monmouth Parkway Associates Helistop','40.30009841918945','-74.02539825439453','20','NA','US','US-NJ','West Long Branch','no','6NJ6',NULL,'6NJ6',NULL,NULL,NULL),(316515,'BR-0031','small_airport','19P12 Airstrip','-9.1736','-43.0513','1500','SA','BR','BR-PI','Anisio de Abreu','no',NULL,NULL,NULL,NULL,NULL,NULL),(23697,'OI50','heliport','1st District Police Station Heliport','41.44810104370117','-81.77899932861328','783','NA','US','US-OH','Cleveland','no','OI50',NULL,'OI50',NULL,NULL,NULL),(37801,'SWBP','heliport','1º BPM Heliport','-16.51361083984375','-49.2511100769043','2264','SA','BR','BR-GO','Goiânia','no','SWBP',NULL,NULL,NULL,NULL,NULL),(23265,'NM47','small_airport','2 X 4 Ranch Airport','32.78010177612305','-104.38099670410156','3360','NA','US','US-NM','Artesia','no','NM47',NULL,'NM47',NULL,NULL,NULL),(45675,'9NR9','heliport','210 Investors Heliport','34.358889','-77.860556','28','NA','US','US-NC','Castle Hayne','no','9NR9',NULL,'9NR9',NULL,NULL,NULL),(29849,'SAWT','small_airport','28 de Noviembre Airport','-51.605','-72.2203','909','SA','AR','AR-Z','Rio Turbio','yes','SAWT','RYO','BIO',NULL,'http://es.wikipedia.org/wiki/Aeropuerto_El_Turbio/28_de_Noviembre','El Turbio'),(9263,'29NC','closed','29NC Airport','35.311698913574','-81.625297546387','930','NA','US','US-NC','Shelby','no','29NC',NULL,'29NC',NULL,NULL,NULL),(23514,'OG00','small_airport','3 Rivers Recreation Area Airport','44.557899475097656','-121.4010009765625','2695','NA','US','US-OR','Culver','no','OG00',NULL,'OG00',NULL,NULL,NULL),(25322,'UT79','small_airport','3-I Rocker Ranch Airport','40.41559982299805','-109.34400177001953','4865','NA','US','US-UT','Jensen','no','UT79',NULL,'UT79',NULL,NULL,NULL),(15486,'96GA','small_airport','3-M\'s Airport','33.18579864501953','-84.36810302734375','890','NA','US','US-GA','Williamson','no','96GA',NULL,'96GA',NULL,NULL,NULL),(16585,'CA54','small_airport','33 Strip','37.670501708984375','-121.3280029296875','81','NA','US','US-CA','Tracy','no','CA54',NULL,'CA54',NULL,NULL,NULL),(26262,'XS38','heliport','3321 Westside Heliport','29.660499572753906','-95.20189666748047','36','NA','US','US-TX','Pasadena','no','XS38',NULL,'XS38',NULL,NULL,NULL),(313164,'AA35','heliport','35 Mile Lodge Heliport','59.4375556','-136.2293611','690','NA','US','US-AK','Haines','no','AA35',NULL,'AA35',NULL,NULL,NULL),(18114,'IN45','small_airport','4 Winds Aerodrome','39.82500076293945','-86.88330078125','810','NA','US','US-IN','Roachdale','no','IN45',NULL,'IN45',NULL,NULL,NULL),(26273,'XS50','small_airport','4-G Ranch Airport','27.38360023498535','-98.30999755859375','272','NA','US','US-TX','Premont','no','XS50',NULL,'XS50',NULL,NULL,NULL),(45799,'4XA5','small_airport','4-Shipp Airport','34.03775','-98.496','1004','NA','US','US-TX','Burkburnett','no','4XA5',NULL,'4XA5',NULL,NULL,NULL),(8614,'1PA1','heliport','401 City Avenue Heliport','40.00960159301758','-75.21379852294922','234','NA','US','US-PA','Philadelphia','no','1PA1',NULL,'1PA1',NULL,NULL,NULL),(45698,'OH73','heliport','41 Heliport','41.538875','-84.131322','725','NA','US','US-OH','Wauseon','no','OH73',NULL,'OH73',NULL,NULL,NULL),(15798,'9LS9','small_airport','4B Ranch Airport','32.4099006652832','-91.34870147705078','80','NA','US','US-LA','Tendal','no','9LS9',NULL,'9LS9',NULL,NULL,NULL),(10210,'36TS','heliport','4BH Heliport','30.718799591064453','-97.77330017089844','920','NA','US','US-TX','Georgetown','no','36TS',NULL,'36TS',NULL,NULL,NULL),(11264,'48TE','small_airport','4M Ranch Airfield','30.021','-101.573056','1824','NA','US','US-TX','Langtry','no','48TE',NULL,'48TE',NULL,NULL,NULL),(23698,'OI51','heliport','4th Dist Police Station Heliport','41.4720001221','-81.6195983887','825','NA','US','US-OH','Cleveland','no','OI51',NULL,'OI51',NULL,NULL,NULL),(10969,'41OK','heliport','5 Alive Heliport','35.56420135498047','-97.48809814453125','1163','NA','US','US-OK','Oklahoma City','no','41OK',NULL,'41OK',NULL,NULL,NULL),(24049,'PA81','small_airport','5 Lakes Airport','39.91279983520508','-77.53279876708984','819','NA','US','US-PA','Fayetteville','no','PA81',NULL,'PA81',NULL,NULL,NULL),(12907,'63KS','small_airport','5-D Ranch Airport','39.32830047607422','-97.06089782714844','1190','NA','US','US-KS','Clay Center','no','63KS',NULL,'63KS',NULL,NULL,NULL),(24890,'TE82','heliport','5-State Heliport','32.9385986328125','-96.36750030517578','555','NA','US','US-TX','Fate','no','TE82',NULL,'TE82',NULL,NULL,NULL),(17013,'CT56','heliport','50 Washington Street Heliport','41.100101470947266','-73.42040252685547','143','NA','US','US-CT','Norwalk','no','CT56',NULL,'CT56',NULL,NULL,NULL),(18121,'IN52','heliport','500 Heliport','39.782798767089844','-86.2332992553711','720','NA','US','US-IN','Speedway','no','IN52',NULL,'IN52',NULL,NULL,NULL),(8599,'1OK8','small_airport','5B Ranch Airport','35.729801177978516','-97.54139709472656','1085','NA','US','US-OK','Edmond','no','1OK8',NULL,'1OK8',NULL,NULL,NULL),(24185,'PN78','heliport','600 Grant Street Rooftop Heliport','40.44200134277344','-79.99530029296875','1604','NA','US','US-PA','Pittsburgh','no','PN78',NULL,'PN78',NULL,NULL,NULL),(14221,'7MD6','heliport','65th Street Heliport','38.38930130004883','-75.07209777832031','7','NA','US','US-MD','Ocean City','no','7MD6',NULL,'7MD6',NULL,NULL,NULL),(13549,'6TE6','small_airport','6666 Ranch Airport','33.6412010193','-100.347999573','1775','NA','US','US-TX','Guthrie','no','6TE6',NULL,'6TE6',NULL,NULL,NULL),(24945,'TN29','heliport','67 Madison Ave Partnership Ltd Heliport','35.137298583984375','-90.0542984008789','650','NA','US','US-TN','Memphis','no','TN29',NULL,'TN29',NULL,NULL,NULL),(13792,'73WA','small_airport','7 Bays Airport','47.85100173950195','-118.33000183105469','1580','NA','US','US-WA','Davenport','no','73WA',NULL,'73WA',NULL,NULL,NULL),(24289,'PS53','small_airport','7-H Skeet Club Inc. Field','40.638999939','-78.5813980103','1605','NA','US','US-PA','Patton','no','PS53',NULL,'PS53',NULL,NULL,NULL),(14521,'81CA','small_airport','7-M Ranch Airport','38.73160171508789','-122.56300354003906','1153','NA','US','US-CA','Middletown','no','81CA',NULL,'81CA',NULL,NULL,NULL),(7631,'0XA5','small_airport','74 Ranch Airport','28.684900283813477','-98.38279724121094','320','NA','US','US-TX','Campbellton','no','0XA5',NULL,'0XA5',NULL,NULL,NULL),(14735,'86PA','heliport','7D Farms Heliport','40.644500732421875','-78.30059814453125','1080','NA','US','US-PA','Tipton','no','86PA',NULL,'86PA',NULL,NULL,NULL),(16744,'CL25','small_airport','7R Ranch Airport','34.93550109863281','-119.4520034790039','3176','NA','US','US-CA','Cuyama','no','CL25',NULL,'CL25',NULL,NULL,NULL),(7859,'13VA','heliport','7th Division State Police Headquarters Heliport','38.82509994506836','-77.28410339355469','395','NA','US','US-VA','Fairfax','no','13VA',NULL,'13VA',NULL,NULL,NULL),(17273,'FD02','small_airport','85th Avenue Airstrip','29.485000610351562','-82.02200317382812','80','NA','US','US-FL','Orange Springs','no','FD02',NULL,'FD02',NULL,NULL,NULL),(35934,'SIEI','closed','8º Batalhão da Polícia Militar Heliport','-26.306388855','-48.8600006104','98','SA','BR','BR-SC','Joinville','no','SIEI',NULL,NULL,NULL,NULL,NULL),(399,'SNTF','small_airport','9 de Maio - Teixeira de Freitas Airport','-17.524499893188','-39.66849899292','344','SA','BR','BR-BA','Teixeira De Freitas','yes','SNTF','TXF','SNTF',NULL,'https://en.wikipedia.org/wiki/Teixeira_de_Freitas_Airport',NULL),(23738,'OI94','heliport','9 Newsport Heliport','39.08340072631836','-84.51239776611328','550','NA','US','US-OH','Cincinnati','no','OI94',NULL,'OI94',NULL,NULL,NULL),(316546,'LTCV','medium_airport','??rnak ?erafettin Elçi Airport','37.3647','42.0582','2038','AS','TR','TR-73','??rnak','yes','LTCV','NKT',NULL,NULL,'https://en.wikipedia.org/wiki/%C5%9E%C4%B1rnak_Airport',NULL),(309974,'LYCA','small_airport','?a?ak-Preljina Airport','43.8981','20.435','776','EU','RS','RS-17','?a?ak','no','LYCA',NULL,NULL,NULL,'http://en.wikipedia.org/wiki/%C4%8Ca%C4%8Dak-Preljina_Airport','Ravan Airport, ???????? ?????-???????, ?????'),(321945,'SK-0038','small_airport','?a?ov Airstrip','49.1471713','20.9458054',NULL,'EU','SK','SK-U-A',NULL,'no',NULL,NULL,NULL,NULL,NULL,NULL),(43171,'EPLN','small_airport','?a?sk / Gry?liny Airport','53.60805892944336','20.344440460205078','538','EU','PL','PL-WN','Olsztynek','no','EPLN',NULL,NULL,NULL,NULL,NULL),(320704,'SK-0015','small_airport','?ab Airstrip','48.3888085','18.0043553',NULL,'EU','SK','SK-NJ','?ab','no',NULL,NULL,NULL,NULL,NULL,NULL),(43170,'PL-0049','small_airport','?agowo Airport','51.96666717529297','16.983333587646484','295','EU','PL','PL-WP','Dolsk','no',NULL,NULL,NULL,NULL,NULL,NULL),(29747,'LDVC','small_airport','?akovec Pribisla Airport','46.39189910888672','16.50029945373535','512','EU','HR','HR-20','?akovec','no','LDVC',NULL,NULL,NULL,NULL,NULL),(4554,'LTCH','medium_airport','?anl?urfa Airport','37.09429931640625','38.84709930419922','1483','AS','TR','TR-63','?anl?urfa','yes','LTCH','SFQ',NULL,NULL,'http://en.wikipedia.org/wiki/%C5%9Eanl%C4%B1urfa_Airport',NULL),(44491,'LTCS','medium_airport','?anl?urfa GAP Airport','37.44566345214844','38.895591735839844','2708','AS','TR','TR-63','?anl?urfa','yes','LTCS','GNY',NULL,NULL,NULL,NULL),(30578,'EPZR','small_airport','?ar Airport','49.77109909057617','19.21809959411621','1260','EU','PL','PL-SL','Mi?dzybrodzie  ?ywieckie','no','EPZR',NULL,NULL,NULL,NULL,'Góra ?ar'),(4394,'LKCV','medium_airport','?áslav Air Base','49.939701080322266','15.381799697875977','794','EU','CZ','CZ-ST','?áslav','no','LKCV',NULL,NULL,NULL,NULL,NULL),(315905,'CZ-0058','small_airport','?ástkovice private ULM','49.4093492','15.1436869','1926','EU','CZ','CZ-VY',NULL,'no',NULL,NULL,NULL,'http://www.lmk-castkovice.cz',NULL,NULL),(29765,'LDZC','closed','?azma Grabovnica Airport','45.749698638916016','16.66360092163086','479','EU','HR','HR-07','?azma','no','LDZC',NULL,NULL,NULL,NULL,NULL),(4301,'LHOY','small_airport','?csény Airport','46.30390167236328','18.76919937133789','295','EU','HU','HU-TO','?csény','no','LHOY',NULL,NULL,NULL,NULL,NULL),(42778,'LYPO','small_airport','?emovsko Polje Airport','42.42231750488281','19.2907772064209','197','EU','ME','ME-16','Podgorica','no','LYPO',NULL,NULL,NULL,'http://en.wikipedia.org/wiki/%C4%86emovsko_Polje_Airport',NULL),(29772,'LKCL','closed','?ernovice Air Base','49.1775016784','16.6608','778','EU','CZ','CZ-JM','?ernovice','no','LKCL',NULL,NULL,NULL,NULL,NULL),(321143,'CZ-0140','closed','?ernovice u Tábora Airstrip','49.3761111','14.9938889','2175','EU','CZ','CZ-VY',NULL,'no',NULL,NULL,NULL,NULL,NULL,NULL),(29773,'LKCE','small_airport','?eská Lípa Airport','50.70940017700195','14.566699981689453','932','EU','CZ','CZ-LI','?eská Lípa','no','LKCE',NULL,NULL,NULL,NULL,NULL),(315763,'CZ-0054','small_airport','?eská Lípa Ram?','50.641667','14.541389',NULL,'EU','CZ','CZ-LI',NULL,'no',NULL,NULL,NULL,NULL,NULL,NULL),(315764,'CZ-0055','small_airport','?eská T?ebová Airstrip','49.91','16.455278',NULL,'EU','CZ','CZ-PA','?eská T?ebová','no',NULL,NULL,'LKCTRE',NULL,NULL,NULL),(4393,'LKCS','small_airport','?eské Bud?jovice Airport','48.9463996887207','14.427499771118164','1417','EU','CZ','CZ-JC','?eské Bud?jovice','no','LKCS',NULL,NULL,NULL,NULL,NULL),(315765,'CZ-0056','small_airport','?eský Dub','50.678056','14.999722',NULL,'EU','CZ','CZ-LI',NULL,'no',NULL,NULL,NULL,NULL,NULL,NULL),(316644,'CZ-0079','small_airport','?í?any','49.9744444','14.6491667',NULL,'EU','CZ','CZ-ST',NULL,'no',NULL,NULL,NULL,NULL,NULL,NULL),(315986,'LRPH','small_airport','?irna','44.785556','25.988208',NULL,'EU','RO','RO-PH',NULL,'no','LRPH',NULL,NULL,NULL,NULL,NULL),(4513,'LTAG','medium_airport','?ncirlik Air Base','37.002101898199996','35.4258995056','238','AS','TR','TR-01','Adana','no','LTAG','UAB',NULL,NULL,'http://en.wikipedia.org/wiki/Incirlik_Air_Base',NULL),(2616,'EPLL','medium_airport','?ód? W?adys?aw Reymont Airport','51.721900939899996','19.3980998993','604','EU','PL','PL-LD','?ód?','yes','EPLL','LCJ',NULL,NULL,'http://en.wikipedia.org/wiki/%C5%81%C3%B3d%C5%BA_W%C5%82adys%C5%82aw_Reymont_Airport','Lublinek'),(43150,'PL-0032','small_airport','?roda ?l?ska  (Komorniki) Highway Strip','51.16279983520508','16.66860008239746','449','EU','PL','PL-DS','?roda ?l?ska','no',NULL,NULL,NULL,NULL,NULL,NULL),(4517,'LTAK','closed','?skenderun Airport','36.5744552612','36.1534194946','25','AS','TR','TR-31','?skenderun','no','LTAK',NULL,'ISK',NULL,NULL,'Antakya, Antioch'),(29981,'LTBW','small_airport','?stanbul Hezarfen Airfield','41.103599548300004','28.547700882','57','EU','TR','TR-34','Istanbul','no','LTBW',NULL,NULL,'http://www.hezarfen.com.tr/','http://en.wikipedia.org/wiki/Istanbul_Hezarfen_Airfield','Istanbul Hezarfen Havaalan?'),(43142,'PL-0024','small_airport','?uk?cin  (Pobierowo) Highway Strip','54.0452995300293','14.90530014038086','23','EU','PL','PL-ZP','Kamie? Pomorski','no',NULL,NULL,NULL,NULL,NULL,NULL),(30451,'EPSW','small_airport','?widnik Lotnisko Airport','51.23189926147461','22.69029998779297','659','EU','PL','PL-LU','?widnik','no','EPSW',NULL,NULL,NULL,NULL,NULL),(15491,'96KY','small_airport','A & L Airport','37.55220031738281','-87.27140045166016','465','NA','US','US-KY','Calhoun','no','96KY',NULL,'96KY',NULL,NULL,NULL),(21709,'LS77','small_airport','A & P Airpark','30.727100372299997','-91.1485977173','140','NA','US','US-LA','Slaughter','no','LS77',NULL,'LS77',NULL,NULL,'7LA9'),(5652,'RKSG','medium_airport','A 511 Airport','36.96220016479492','127.03099822998047','51','AS','KR','KR-41',NULL,'no','RKSG',NULL,NULL,NULL,NULL,NULL),(25282,'UT39','heliport','A A Helicopters Inc Heliport','40.858299255371094','-111.93499755859375','4234','NA','US','US-UT','North Salt Lake','no','UT39',NULL,'UT39',NULL,NULL,NULL),(26073,'WY11','small_airport','A A Ranch Airport','41.15829849243164','-106.55799865722656','7880','NA','US','US-WY','Encampment','no','WY11',NULL,'WY11',NULL,NULL,NULL),(9215,'28NH','heliport','A and K Heliport','42.9369010925293','-71.66950225830078','825','NA','US','US-NH','New Boston','no','28NH',NULL,'28NH',NULL,NULL,NULL),(10006,'32LA','heliport','A B Dock Services Heliport','29.77359962463379','-93.3499984741211','10','NA','US','US-LA','Cameron','no','32LA',NULL,'32LA',NULL,NULL,NULL),(4007,'LECO','medium_airport','A Coruña Airport','43.302101135253906','-8.377260208129883','326','EU','ES','ES-GA','Culleredo','yes','LECO','LCG',NULL,'http://www.aena.es/csee/Satellite?cid=1048146841342&pagename=subHome&SiteName=LCG&c=Page&Language=EN_GB','http://en.wikipedia.org/wiki/A_Coru%C3%B1a_Airport','The Groyne, La Coruña'),(12843,'61PN','small_airport','A G A Farms Airport','40.42570114135742','-75.2323989868164','450','NA','US','US-PA','Perkasie','no','61PN',NULL,'61PN',NULL,NULL,NULL),(14885,'8CL4','heliport','A G Spanos Companies Hq Heliport','38.04719924926758','-121.37000274658203','96','NA','US','US-CA','Stockton','no','8CL4',NULL,'8CL4',NULL,NULL,NULL),(12167,'58FL','heliport','A I M Heliport','26.415599822998047','-80.19139862060547','20','NA','US','US-FL','Boca Raton','no','58FL',NULL,'58FL',NULL,NULL,NULL),(17022,'CT67','heliport','A J Oster Co. Heliport','41.6142997742','-73.0593032837','300','NA','US','US-CT','Watertown','no','CT67',NULL,'CT67',NULL,NULL,NULL),(13188,'6AR2','small_airport','A J\'s Airport','35.02040100097656','-93.06490325927734','370','NA','US','US-AR','Casa','no','6AR2',NULL,'6AR2',NULL,NULL,NULL),(20713,'KOCH','small_airport','A L Mangham Jr. Regional Airport','31.57799911','-94.70950317','355','NA','US','US-TX','Nacogdoches','no','KOCH','OCH','OCH','http://www.ci.nacogdoches.tx.us/index.aspx?nid=634',NULL,NULL),(11614,'4NJ7','heliport','A M Classics Heliport','39.64649963378906','-75.30439758300781','59','NA','US','US-NJ','Woodstown','no','4NJ7',NULL,'4NJ7',NULL,NULL,NULL),(9775,'2TA9','small_airport','A M I G O For Christ Airport','32.660400390625','-97.84200286865234','840','NA','US','US-TX','Weatherford','no','2TA9',NULL,'2TA9',NULL,NULL,NULL),(19294,'KAPH','small_airport','A P Hill Aaf (Fort A P Hill) Airport','38.06890106','-77.31829834','220','NA','US','US-VA','Fort A. P. Hill','no','KAPH','APH','APH',NULL,'http://en.wikipedia.org/wiki/A.P._Hill_Army_Airfield',NULL),(20018,'KH88','small_airport','A Paul Vance Fredericktown Regional Airport','37.605801','-90.2873','880','NA','US','US-MO','Fredericktown','no',NULL,NULL,'H88','http://fredericktownmo.org/airport.html','https://en.wikipedia.org/wiki/A._Paul_Vance_Fredericktown_Regional_Airport',NULL),(14234,'7MI9','heliport','A T I Heliport','42.22090148925781','-83.47660064697266','716','NA','US','US-MI','Belleville','no','7MI9',NULL,'7MI9',NULL,NULL,NULL),(36906,'SJUV','heliport','A Universal Heliport','-23.517221450805664','-46.627220153808594','2507','SA','BR','BR-SP','São Paulo','no','SJUV',NULL,NULL,NULL,NULL,NULL),(26302,'XS79','small_airport','A W Ranch Airport','29.25860023498535','-98.4583969116211','540','NA','US','US-TX','San Antonio','no','XS79',NULL,'XS79',NULL,NULL,NULL),(6747,'03UT','small_airport','A Z Minerals Corporation Airport','37.12080001831055','-109.98600006103516','5315','NA','US','US-UT','Mexican Hat','no','03UT',NULL,'03UT',NULL,NULL,NULL),(26263,'XS39','small_airport','A&A Flying Service Airport','29.536300659179688','-95.26409912109375','49','NA','US','US-TX','Pearland','no','XS39',NULL,'XS39',NULL,NULL,NULL),(32196,'RKNC','small_airport','A-306 Airport','37.8838005065918','127.71800231933594','245','AS','KR','KR-42','Chun Chon City','no','RKNC','QUN',NULL,NULL,NULL,NULL),(22034,'MI21','closed','A.C. Miller Airport','41.737499','-84.564903','944','NA','US','US-MI','Frontier','no',NULL,NULL,NULL,NULL,NULL,'MI21'),(45737,'24PN','heliport','A.H. Butz Downtown Allentown Heliport','40.601056','-75.475083','456','NA','US','US-PA','Allentown','no','24PN',NULL,'24PN',NULL,NULL,NULL),(46075,'16DE','heliport','A.I. Dupont Children\'s Hospital Heliport','39.7809055556','-75.55576666670001','356','NA','US','US-DE','Wilmington','no','16DE',NULL,'16DE',NULL,NULL,NULL),(17143,'DE28','heliport','A.I.Dupont Institute Heliport','39.77999878','-75.55549622','327','NA','US','US-DE','Wilmington','no','DE28',NULL,'16DE',NULL,NULL,NULL),(14480,'7Y7','small_airport','A.R.S. Sport Strip','44.66659927368164','-93.78359985351562','955','NA','US','US-MN','Belle Plaine','no','7Y7',NULL,'7Y7',NULL,NULL,NULL),(316200,'IT-0146','small_airport','A/S Cà del Conte','44.868889','9.938057',NULL,'EU','IT','IT-45','Alseno','no',NULL,NULL,NULL,NULL,NULL,'Cortina di Alseno'),(4560,'LTCO','medium_airport','A?r? Airport','39.654541015625','43.025978088378906','5462','AS','TR','TR-04',NULL,'yes','LTCO','AJI',NULL,NULL,'http://en.wikipedia.org/wiki/A%C4%9Fr%C4%B1_Airport',NULL),(28490,'EDKA','small_airport','Aachen-Merzbrück Airport','50.823055267333984','6.186388969421387','623','EU','DE','DE-NW','Aachen','no','EDKA','AAH',NULL,NULL,NULL,NULL),(26188,'XA63','heliport','AAF Heliport','33.0890007019043','-96.59210205078125','615','NA','US','US-TX','Lucas','no','XA63',NULL,'XA63',NULL,NULL,NULL),(12482,'5MD4','heliport','Aai Heliport','39.469600677490234','-76.6405029296875','350','NA','US','US-MD','Cockeysville','no','5MD4',NULL,'5MD4',NULL,NULL,NULL),(2562,'EKYT','large_airport','Aalborg Airport','57.0927589138','9.84924316406','10','EU','DK','DK-81','Aalborg','yes','EKYT','AAL',NULL,'http://www.aal.dk','http://en.wikipedia.org/wiki/Aalborg_Airport',NULL),(2260,'EDPA','small_airport','Aalen-Heidenheim/Elchingen Airport','48.77777862548828','10.264721870422363','1916','EU','DE','DE-BW','Aalen','no','EDPA',NULL,NULL,NULL,NULL,NULL),(298604,'EBAL','heliport','Aalst Hospital Helistrip','50.943333','4.055833',NULL,'EU','BE','BE-VOV','Aalst','no','EBAL',NULL,NULL,NULL,NULL,'OLV-Ziekenhuis'),(46556,'IN-0033','small_airport','Aamby Valley Airport','18.609616666699996','73.37758333330001','2262','AS','IN','IN-MM','Aamby Valley City','no',NULL,NULL,NULL,NULL,NULL,NULL),(44046,'BGAQ','heliport','Aappilattoq (Kujalleq) Heliport','60.148357','-44.286916','30','NA','GL','GL-U-A','Nanortalik','yes','BGAQ',NULL,'QUV',NULL,'http://en.wikipedia.org/wiki/Aappilattoq_Heliport_(Kujalleq)','Aappilattoq (Nanortalik)'),(43214,'BGAG','heliport','Aappilattoq (Qaasuitsup) Heliport','72.8870298223','-55.5962866545','42','NA','GL','GL-U-A','Qaasuitsup','yes','BGAG',NULL,'AAP',NULL,'http://en.wikipedia.org/wiki/Aappilattoq_(Qaasuitsup)_Heliport',NULL),(2540,'EKAH','medium_airport','Aarhus Airport','56.2999992371','10.619000434899998','82','EU','DK','DK-82','Aarhus','yes','EKAH','AAR',NULL,'http://www.aar.dk/default.asp?id=87','http://en.wikipedia.org/wiki/Aarhus_Airport',NULL),(319199,'DK-0012','heliport','Aarhus Universitetshospital Helipad','56.192123','10.175912',NULL,'EU','DK','DK-82','Århus','no',NULL,NULL,NULL,NULL,NULL,NULL),(8719,'1VA7','small_airport','Aaron Penston Field','36.66600036621094','-78.72250366210938','413','NA','US','US-VA','South Boston','no','1VA7',NULL,'1VA7',NULL,NULL,NULL),(7900,'14NE','small_airport','Aaron\'s Field','40.86249923706055','-98.06420135498047','1825','NA','US','US-NE','Aurora','no','14NE',NULL,'14NE',NULL,NULL,NULL),(31697,'BGAA','medium_airport','Aasiaat Airport','68.7218017578','-52.7846984863','74','NA','GL','GL-U-A','Aasiaat','yes','BGAA','JEG',NULL,'http://airgreenland.com/om_rejsen/efter_rejsen/din_destination_/aasiaat/','http://en.wikipedia.org/wiki/Aasiaat_Airport',NULL),(27245,'EFAA','small_airport','Aavahelukka Airport','67.60359954833984','23.97170066833496','738','EU','FI','FI-LL',NULL,'no','EFAA',NULL,NULL,NULL,NULL,NULL),(31400,'FZJF','small_airport','Aba Airport','3.9000000953674316','30.25','3051','AF','CD','CD-OR','Aba','no','FZJF',NULL,NULL,NULL,NULL,NULL),(37059,'SNDH','small_airport','Aba Airport','-12.1602783203125','-45.022499084472656','1682','SA','BR','BR-BA','Barreiras','no','SNDH',NULL,NULL,NULL,NULL,NULL),(3162,'HADR','medium_airport','Aba Tenna Dejazmach Yilma International Airport','9.624699592590332','41.85419845581055','3827','AF','ET','ET-DD','Dire Dawa','yes','HADR','DIR',NULL,NULL,'http://en.wikipedia.org/wiki/Aba_Tenna_Dejazmach_Yilma_International_Airport',NULL),(29641,'MYAW','small_airport','Abaco I Walker C Airport','27.266700744628906','-78.39969635009766','10','NA','BS','BS-GT',NULL,'no','MYAW','WKR',NULL,NULL,NULL,NULL),(16429,'AZ41','heliport','Abacus Tower Heliport','33.4833984375','-112.06999969482422','1850','NA','US','US-AZ','Phoenix','no','AZ41',NULL,'AZ41',NULL,NULL,NULL),(5130,'OIAA','medium_airport','Abadan Airport','30.371099472','48.2282981873','10','AS','IR','IR-10','Abadan','yes','OIAA','ABD',NULL,NULL,'http://en.wikipedia.org/wiki/Abadan_Airport',NULL),(42524,'OISA','small_airport','Abadeh Airport','31.166667938232422','52.66666793823242','5320','AS','IR','IR-14','Abadeh','no','OISA',NULL,NULL,NULL,NULL,NULL),(345,'SNLI','small_airport','Abaeté Airport','-19.15559959411621','-45.49480056762695','2178','SA','BR','BR-MG','Abaeté','no','SNLI',NULL,'SNLI',NULL,NULL,NULL),(30611,'NGAB','small_airport','Abaiang Airport','1.798609972000122','173.04100036621094',NULL,'OC','KI','KI-G','Abaiang','no','NGAB','ABF',NULL,NULL,NULL,NULL),(6503,'UNAA','medium_airport','Abakan Airport','53.7400016784668','91.38500213623047','831','AS','RU','RU-KK','Abakan','yes','UNAA','ABA',NULL,NULL,'http://en.wikipedia.org/wiki/Abakan_Airport',NULL);
/*!40000 ALTER TABLE `world` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-09-23 17:33:42
