-- phpMyAdmin SQL Dump
-- version 3.3.9
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Feb 25, 2014 at 09:43 AM
-- Server version: 5.5.8
-- PHP Version: 5.3.5

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `ums`
--

-- --------------------------------------------------------

--
-- Table structure for table `ci_cookies`
--

DROP TABLE IF EXISTS `ci_cookies`;
CREATE TABLE IF NOT EXISTS `ci_cookies` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cookie_id` varchar(255) DEFAULT NULL,
  `netid` varchar(255) DEFAULT NULL,
  `ip_address` varchar(255) DEFAULT NULL,
  `user_agent` varchar(255) DEFAULT NULL,
  `orig_page_requested` varchar(120) DEFAULT NULL,
  `php_session_id` varchar(40) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

--
-- Dumping data for table `ci_cookies`
--


-- --------------------------------------------------------

--
-- Table structure for table `ci_sessions`
--

DROP TABLE IF EXISTS `ci_sessions`;
CREATE TABLE IF NOT EXISTS `ci_sessions` (
  `session_id` varchar(40) NOT NULL DEFAULT '0',
  `ip_address` varchar(45) NOT NULL DEFAULT '0',
  `user_agent` varchar(120) NOT NULL,
  `last_activity` int(10) unsigned NOT NULL DEFAULT '0',
  `user_data` text NOT NULL,
  PRIMARY KEY (`session_id`),
  KEY `last_activity_idx` (`last_activity`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `ci_sessions`
--

INSERT INTO `ci_sessions` (`session_id`, `ip_address`, `user_agent`, `last_activity`, `user_data`) VALUES
('c53d8c0d2aa5e1c4974f5f5d78a65062', '127.0.0.1', 'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:27.0) Gecko/20100101 Firefox/27.0', 1393316816, 'a:3:{s:9:"user_data";a:1:{i:0;a:12:{s:5:"lg_id";s:3:"386";s:8:"lg_fname";s:5:"admin";s:8:"lg_mname";s:0:"";s:8:"lg_lname";s:5:"admin";s:8:"lg_email";s:5:"admin";s:11:"lg_email_id";s:5:"admin";s:11:"lg_password";s:32:"21232f297a57a5a743894a0e4a801fc3";s:7:"lg_type";s:1:"0";s:4:"s_id";s:1:"0";s:7:"pr_name";N;s:8:"pr_email";N;s:14:"is_super_admin";s:1:"1";}}s:17:"session_user_data";a:1:{s:4:"data";a:1:{i:0;a:6:{s:2:"id";s:1:"0";s:4:"name";s:5:"admin";s:8:"password";s:32:"05665723952545e6cba0158ab8f45a7d";s:6:"status";b:1;s:9:"date_time";s:19:"2012-12-15 18:58:11";s:3:"res";i:1;}}}s:9:"sloggedin";s:4:"true";}');

-- --------------------------------------------------------

--
-- Table structure for table `membership`
--

DROP TABLE IF EXISTS `membership`;
CREATE TABLE IF NOT EXISTS `membership` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `email_addres` varchar(255) DEFAULT NULL,
  `user_name` varchar(255) DEFAULT NULL,
  `pass_word` varchar(32) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `membership`
--

INSERT INTO `membership` (`id`, `first_name`, `last_name`, `email_addres`, `user_name`, `pass_word`) VALUES
(1, 'umair', 'majeed', 'umair_majeed786@live.com', 'umairmajeed', 'e7aabb41315aaff23439860e5788349d');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_about`
--

DROP TABLE IF EXISTS `tbl_about`;
CREATE TABLE IF NOT EXISTS `tbl_about` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `text` text NOT NULL,
  `date_time` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

--
-- Dumping data for table `tbl_about`
--


-- --------------------------------------------------------

--
-- Table structure for table `tbl_city`
--

DROP TABLE IF EXISTS `tbl_city`;
CREATE TABLE IF NOT EXISTS `tbl_city` (
  `city_id` int(11) NOT NULL,
  `city_name` varchar(200) DEFAULT NULL,
  `country_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`city_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_city`
--


-- --------------------------------------------------------

--
-- Table structure for table `tbl_config`
--

DROP TABLE IF EXISTS `tbl_config`;
CREATE TABLE IF NOT EXISTS `tbl_config` (
  `config_id` int(10) NOT NULL,
  `config_category` varchar(100) NOT NULL DEFAULT '''site''',
  `config_caption` varchar(255) NOT NULL,
  `config_key` varchar(255) NOT NULL,
  `config_value` text NOT NULL,
  `config_order` smallint(4) NOT NULL DEFAULT '0',
  PRIMARY KEY (`config_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_config`
--


-- --------------------------------------------------------

--
-- Table structure for table `tbl_countries`
--

DROP TABLE IF EXISTS `tbl_countries`;
CREATE TABLE IF NOT EXISTS `tbl_countries` (
  `country_id` int(11) NOT NULL AUTO_INCREMENT,
  `country_name` varchar(64) NOT NULL DEFAULT '',
  `iso_code_2` char(2) NOT NULL,
  `iso_code_3` char(3) NOT NULL,
  `format_id` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`country_id`),
  KEY `IDX_COUNTRY_NAME` (`country_name`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=240 ;

--
-- Dumping data for table `tbl_countries`
--

INSERT INTO `tbl_countries` (`country_id`, `country_name`, `iso_code_2`, `iso_code_3`, `format_id`) VALUES
(1, 'Afghanistan', 'AF', 'AFG', 1),
(2, 'Albania', 'AL', 'ALB', 1),
(3, 'Algeria', 'DZ', 'DZA', 1),
(4, 'American Samoa', 'AS', 'ASM', 1),
(5, 'Andorra', 'AD', 'AND', 1),
(6, 'Angola', 'AO', 'AGO', 1),
(7, 'Anguilla', 'AI', 'AIA', 1),
(8, 'Antarctica', 'AQ', 'ATA', 1),
(9, 'Antigua and Barbuda', 'AG', 'ATG', 1),
(10, 'Argentina', 'AR', 'ARG', 1),
(11, 'Armenia', 'AM', 'ARM', 1),
(12, 'Aruba', 'AW', 'ABW', 1),
(13, 'Australia', 'AU', 'AUS', 1),
(14, 'Austria', 'AT', 'AUT', 5),
(15, 'Azerbaijan', 'A', 'AZE', 1),
(16, 'Bahamas', 'BS', 'BHS', 1),
(17, 'Bahrain', 'BH', 'BHR', 1),
(18, 'Bangladesh', 'BD', 'B', 1),
(19, 'Barbados', 'BB', 'BRB', 1),
(20, 'Belarus', 'BY', 'BLR', 1),
(21, 'Belgium', 'BE', 'BEL', 1),
(22, 'Belize', 'BZ', 'BLZ', 1),
(23, 'Benin', 'BJ', 'BEN', 1),
(24, 'Bermuda', 'BM', 'BMU', 1),
(25, 'Bhutan', 'BT', 'BTN', 1),
(26, 'Bolivia', 'BO', 'BOL', 1),
(27, 'Bosnia and Herzegowina', 'BA', 'BIH', 1),
(28, 'Botswana', 'BW', 'BWA', 1),
(29, 'Bouvet Island', 'BV', 'BVT', 1),
(30, 'Brazil', 'BR', 'BRA', 1),
(31, 'British Indian Ocean Territory', 'IO', 'IOT', 1),
(32, 'Brunei Darussalam', 'BN', 'BRN', 1),
(33, 'Bulgaria', 'BG', 'BGR', 1),
(34, 'Burkina Faso', 'BF', 'BFA', 1),
(35, 'Burundi', 'BI', 'BDI', 1),
(36, 'Cambodia', 'KH', 'KHM', 1),
(37, 'Cameroon', 'CM', 'CMR', 1),
(38, 'Canada', 'CA', 'CAN', 1),
(39, 'Cape Verde', 'CV', 'CPV', 1),
(40, 'Cayman Islands', 'KY', 'CYM', 1),
(41, 'Central African Republic', 'CF', 'CAF', 1),
(42, 'Chad', 'TD', 'TCD', 1),
(43, 'Chile', 'CL', 'CHL', 1),
(44, 'China', 'CN', 'CHN', 1),
(45, 'Christmas Island', 'CX', 'CXR', 1),
(46, 'Cocos (Keeling) Islands', 'CC', 'CCK', 1),
(47, 'Colombia', 'CO', 'COL', 1),
(48, 'Comoros', 'KM', 'COM', 1),
(49, 'Congo', 'CG', 'COG', 1),
(50, 'Cook Islands', 'CK', 'COK', 1),
(51, 'Costa Rica', 'CR', 'CRI', 1),
(52, 'CoteIvoire', 'CI', 'CIV', 1),
(53, 'Croatia', 'HR', 'HRV', 1),
(54, 'Cuba', 'CU', 'CUB', 1),
(55, 'Cyprus', '', 'CYP', 1),
(56, 'Czech Republic', 'CZ', 'CZE', 1),
(57, 'Denmark', 'DK', 'DNK', 1),
(58, 'Djibouti', 'DJ', 'DJI', 1),
(59, 'Dominica', 'DM', 'DMA', 1),
(60, 'Dominican Republic', 'DO', 'DOM', 1),
(61, 'East Timor', 'TP', 'TMP', 1),
(62, 'Ecuador', 'EC', 'ECU', 1),
(63, 'Egypt', 'EG', 'EGY', 1),
(64, 'El Salvador', 'SV', 'SLV', 1),
(65, 'Equatorial Guinea', 'GQ', 'GNQ', 1),
(66, 'Eritrea', 'ER', 'ERI', 1),
(67, 'Estonia', 'EE', 'EST', 1),
(68, 'Ethiopia', 'ET', 'ETH', 1),
(69, 'Falkland Islands (Malvinas)', 'FK', 'FLK', 1),
(70, 'Faroe Islands', 'FO', 'FRO', 1),
(71, 'Fiji', 'FJ', 'FJI', 1),
(72, 'Finland', 'FI', 'FIN', 1),
(73, 'France', 'FR', 'FRA', 1),
(74, 'France, Metropolitan', 'FX', 'FXX', 1),
(75, 'French Guiana', 'GF', 'GUF', 1),
(76, 'French Polynesia', 'PF', 'PYF', 1),
(77, 'French Southern Territories', 'TF', 'ATF', 1),
(78, 'Gabon', 'GA', 'GAB', 1),
(79, 'Gambia', 'GM', 'GMB', 1),
(80, 'Georgia', 'GE', 'GEO', 1),
(81, 'Germany', 'DE', 'DEU', 5),
(82, 'Ghana', 'GH', 'GHA', 1),
(83, 'Gibraltar', 'GI', '', 1),
(84, 'Greece', 'GR', 'GRC', 1),
(85, 'Greenland', 'GL', 'GRL', 1),
(86, 'Grenada', 'GD', 'GRD', 1),
(87, 'Guadeloupe', 'GP', 'GLP', 1),
(88, 'Guam', 'GU', 'GUM', 1),
(89, 'Guatemala', 'GT', 'GTM', 1),
(90, 'Guinea', 'GN', 'GIN', 1),
(91, 'Guinea-bissau', 'GW', 'GNB', 1),
(92, 'Guyana', 'GY', 'GUY', 1),
(93, 'Haiti', 'HT', 'HTI', 1),
(94, 'Heard and Mc Donald Islands', 'HM', 'HMD', 1),
(95, 'Honduras', 'HN', 'HND', 1),
(96, 'Hong Kong', 'HK', 'HKG', 1),
(97, 'Hungary', 'HU', 'HUN', 1),
(98, 'Iceland', 'IS', 'ISL', 1),
(99, 'India', 'IN', 'IND', 1),
(100, 'Indonesia', 'ID', 'IDN', 1),
(101, 'Iran (Islamic Republic of)', 'IR', 'IRN', 1),
(102, 'Iraq', 'IQ', 'IRQ', 1),
(103, 'Ireland', 'IE', 'IRL', 1),
(104, 'Israel', 'IL', 'ISR', 1),
(105, 'Italy', 'IT', 'ITA', 1),
(106, 'Jamaica', 'JM', 'JAM', 1),
(107, 'Japan', 'JP', 'JPN', 1),
(108, 'Jordan', 'JO', 'JOR', 1),
(109, 'Kazakhstan', 'KZ', 'KAZ', 1),
(110, 'Kenya', 'KE', 'KEN', 1),
(111, 'Kiribati', 'KI', 'KIR', 1),
(112, 'Korea, Democratic Republic', 'KP', 'PRK', 1),
(113, 'Korea, Republic', 'KR', 'KOR', 1),
(114, 'Kuwait', 'KW', 'KWT', 1),
(115, 'Kyrgyzstan', 'KG', 'KGZ', 1),
(116, 'Lao Peoples Democratic Republic', 'LA', 'LAO', 1),
(117, 'Latvia', 'LV', 'LVA', 1),
(118, 'Lebanon', 'LB', 'LBN', 1),
(119, 'Lesotho', 'LS', 'LSO', 1),
(120, 'Liberia', 'LR', 'LBR', 1),
(121, 'Libyan Arab Jamahiriya', 'LY', 'LBY', 1),
(122, 'Liechtenstein', 'LI', 'LIE', 1),
(123, 'Lithuania', 'LT', 'LTU', 1),
(124, 'Luxembourg', 'LU', 'LUX', 1),
(125, 'Macau', 'MO', 'MAC', 1),
(126, 'Macedonia', 'MK', 'MKD', 1),
(127, 'Madagascar', 'MG', 'MDG', 1),
(128, 'Malawi', 'MW', 'MWI', 1),
(129, 'Malaysia', 'MY', 'MYS', 1),
(130, 'Maldives', 'MV', 'MDV', 1),
(131, 'Mali', 'ML', 'MLI', 1),
(132, 'Malta', 'MT', 'M', 1),
(133, 'Marshall Islands', 'MH', 'MHL', 1),
(134, 'Martinique', 'MQ', 'MTQ', 1),
(135, 'Mauritania', 'MR', 'MRT', 1),
(136, 'Mauritius', 'MU', 'MUS', 1),
(137, 'Mayotte', 'YT', 'MYT', 1),
(138, 'Mexico', 'MX', 'MEX', 1),
(139, 'Micronesia', 'FM', 'FSM', 1),
(140, 'Moldova', 'MD', 'MDA', 1),
(141, 'Monaco', 'MC', 'MCO', 1),
(142, 'Mongolia', 'MN', 'MNG', 1),
(143, 'Montserrat', 'MS', 'MSR', 1),
(144, 'Morocco', 'MA', 'MAR', 1),
(145, 'Mozambique', 'MZ', 'MOZ', 1),
(146, 'Myanmar', 'MM', 'MMR', 1),
(147, 'Namibia', 'NA', 'NAM', 1),
(148, 'Nauru', 'NR', 'NRU', 1),
(149, 'Nepal', 'NP', 'NPL', 1),
(150, 'Netherlands', 'NL', 'NLD', 1),
(151, 'Netherlands Antilles', 'AN', 'ANT', 1),
(152, 'New Caledonia', 'NC', 'NCL', 1),
(153, 'New Zealand', 'NZ', 'NZL', 1),
(154, 'Nicaragua', 'NI', 'NIC', 1),
(155, 'Niger', 'NE', 'NER', 1),
(156, 'Nigeria', 'NG', 'NGA', 1),
(157, 'Niue', 'NU', 'NIU', 1),
(158, 'Norfolk Island', 'NF', 'NFK', 1),
(159, 'Northern Mariana Islands', 'MP', 'MNP', 1),
(160, 'Norway', 'NO', 'NOR', 1),
(161, 'Oman', 'OM', 'OMN', 1),
(162, 'Pakistan', 'PK', 'PAK', 1),
(163, 'Palau', 'PW', 'PLW', 1),
(164, 'Panama', 'PA', 'PAN', 1),
(165, 'Papua New Guinea', 'PG', 'PNG', 1),
(166, 'Paraguay', 'PY', 'PRY', 1),
(167, 'Peru', 'PE', 'PER', 1),
(168, 'Philippines', 'PH', 'PHL', 1),
(169, 'Pitcairn', 'PN', 'PCN', 1),
(170, 'Poland', 'PL', 'POL', 1),
(171, 'Portugal', 'PT', 'PRT', 1),
(172, 'Puerto Rico', 'PR', 'PRI', 1),
(173, 'Qatar', 'QA', 'QAT', 1),
(174, 'Reunion', 'RE', 'REU', 1),
(175, 'Romania', '', 'ROM', 1),
(176, 'Russian Federation', 'RU', 'RUS', 1),
(177, 'Rwanda', 'RW', 'RWA', 1),
(178, 'Saint Kitts and Nevis', 'KN', 'KNA', 1),
(179, 'Saint Lucia', 'LC', 'LCA', 1),
(180, 'Saint Vincent and the Grenadines', 'VC', 'VCT', 1),
(181, 'Samoa', 'WS', 'WSM', 1),
(182, 'San Marino', 'SM', 'SMR', 1),
(183, 'Sao Tome and Principe', 'ST', 'STP', 1),
(184, 'Saudi Arabia', 'SA', 'SAU', 1),
(185, 'Senegal', 'SN', 'SEN', 1),
(186, 'Seychelles', 'SC', 'SYC', 1),
(187, 'Sierra Leone', 'SL', 'SLE', 1),
(188, 'Singapore', 'SG', 'SGP', 4),
(189, 'Slovakia (Slovak Republic)', 'SK', 'SVK', 1),
(190, 'Slovenia', 'SI', 'SVN', 1),
(191, 'Solomon Islands', 'SB', 'SLB', 1),
(192, 'Somalia', 'SO', 'SOM', 1),
(193, 'South Africa', 'ZA', 'ZAF', 1),
(194, 'South Georgia and the South Sandwich Islands', 'GS', 'SGS', 1),
(195, 'Spain', 'ES', 'ESP', 3),
(196, 'Sri Lanka', 'LK', 'LKA', 1),
(197, 'St. Helena', 'SH', 'SHN', 1),
(198, 'St. Pierre and Miquelon', 'PM', 'SPM', 1),
(199, 'Sudan', 'SD', 'SDN', 1),
(200, 'Suriname', 'SR', 'SUR', 1),
(201, 'Svalbard and Jan Mayen Islands', 'SJ', 'SJM', 1),
(202, 'Swaziland', 'SZ', 'SWZ', 1),
(203, 'Sweden', 'SE', 'SWE', 1),
(204, 'Switzerland', 'CH', 'CHE', 1),
(205, 'Syrian Arab Republic', 'SY', 'SYR', 1),
(206, 'Taiwan', 'TW', 'TWN', 1),
(207, 'Tajikistan', 'TJ', 'TJK', 1),
(208, 'Tanzania, United Republic of', 'TZ', 'TZA', 1),
(209, 'Thailand', 'TH', 'THA', 1),
(210, 'Togo', 'TG', 'TGO', 1),
(211, 'Tokelau', 'TK', 'TKL', 1),
(212, 'Tonga', 'TO', 'TON', 1),
(213, 'Trinidad and Tobago', 'TT', 'TTO', 1),
(214, 'Tunisia', 'TN', 'TUN', 1),
(215, 'Turkey', 'TR', 'TUR', 1),
(216, 'Turkmenistan', 'TM', 'TKM', 1),
(217, 'Turks and Caicos Islands', 'TC', 'TCA', 1),
(218, 'Tuvalu', 'TV', 'TUV', 1),
(219, 'Uganda', 'UG', 'UGA', 1),
(220, 'Ukraine', 'UA', 'UKR', 1),
(221, 'United Arab Emirates', 'AE', 'ARE', 1),
(222, 'United Kingdom', 'GB', 'GBR', 1),
(223, 'United States', 'US', 'USA', 2),
(224, 'United States Minor Outlying Islands', 'UM', 'UMI', 1),
(225, 'Uruguay', 'UY', 'URY', 1),
(226, 'Uzbekistan', 'UZ', 'UZB', 1),
(227, 'Vanuatu', 'VU', 'VUT', 1),
(228, 'Vatican City State (Holy See)', 'VA', 'VAT', 1),
(229, 'Venezuela', 'VE', 'VEN', 1),
(230, 'Viet Nam', 'VN', 'VNM', 1),
(231, 'Virgin Islands (British)', 'VG', 'VGB', 1),
(232, 'Virgin Islands (U.S.)', 'VI', 'VIR', 1),
(233, 'Wallis and Futuna Islands', 'WF', 'WLF', 1),
(234, 'Western Sahara', 'EH', 'ESH', 1),
(235, 'Yemen', 'YE', 'YEM', 1),
(236, 'Yugoslavia', 'YU', 'YUG', 1),
(237, 'Zaire', 'ZR', 'ZAR', 1),
(238, 'Zambia', 'ZM', 'ZMB', 1),
(239, 'Zimbabwe', 'ZW', 'ZWE', 1);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_course_cate_type`
--

DROP TABLE IF EXISTS `tbl_course_cate_type`;
CREATE TABLE IF NOT EXISTS `tbl_course_cate_type` (
  `ct_id` int(11) NOT NULL AUTO_INCREMENT,
  `ct_name` varchar(300) DEFAULT NULL,
  `ct_code` varchar(255) DEFAULT NULL,
  `is_parent` int(11) NOT NULL DEFAULT '0',
  `ct_user` int(11) DEFAULT NULL,
  `ct_status` varchar(10) DEFAULT NULL,
  `ct_date` date DEFAULT NULL,
  `is_course` tinyint(4) NOT NULL DEFAULT '0' COMMENT '0=>type, 1=>course',
  PRIMARY KEY (`ct_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

--
-- Dumping data for table `tbl_course_cate_type`
--


-- --------------------------------------------------------

--
-- Table structure for table `tbl_grades`
--

DROP TABLE IF EXISTS `tbl_grades`;
CREATE TABLE IF NOT EXISTS `tbl_grades` (
  `g_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(300) DEFAULT NULL,
  `is_parent` int(11) DEFAULT '0',
  `is_parent_name` varchar(300) DEFAULT NULL,
  `g_strength` int(11) NOT NULL DEFAULT '0',
  `total_enrol` int(11) DEFAULT '0',
  `status` tinyint(4) NOT NULL,
  `date` date NOT NULL,
  `update_date` date DEFAULT NULL,
  `is_section` tinyint(4) NOT NULL DEFAULT '0',
  `user_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`g_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

--
-- Dumping data for table `tbl_grades`
--


-- --------------------------------------------------------

--
-- Table structure for table `tbl_language`
--

DROP TABLE IF EXISTS `tbl_language`;
CREATE TABLE IF NOT EXISTS `tbl_language` (
  `lang_id` int(11) NOT NULL AUTO_INCREMENT,
  `lang_title` varchar(50) NOT NULL,
  PRIMARY KEY (`lang_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=12 ;

--
-- Dumping data for table `tbl_language`
--

INSERT INTO `tbl_language` (`lang_id`, `lang_title`) VALUES
(1, 'english'),
(2, 'russian'),
(3, 'Portuguese'),
(11, 'urdu');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_login`
--

DROP TABLE IF EXISTS `tbl_login`;
CREATE TABLE IF NOT EXISTS `tbl_login` (
  `lg_id` int(11) NOT NULL AUTO_INCREMENT,
  `lg_fname` varchar(100) NOT NULL,
  `lg_mname` varchar(100) NOT NULL,
  `lg_lname` varchar(100) NOT NULL,
  `lg_email` varchar(254) NOT NULL,
  `lg_email_id` varchar(200) NOT NULL,
  `lg_password` text NOT NULL,
  `lg_type` varchar(100) NOT NULL,
  `s_id` varchar(50) NOT NULL,
  `pr_name` varchar(300) DEFAULT NULL,
  `pr_email` varchar(300) DEFAULT NULL,
  `is_super_admin` tinyint(4) NOT NULL DEFAULT '0',
  PRIMARY KEY (`lg_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=387 ;

--
-- Dumping data for table `tbl_login`
--

INSERT INTO `tbl_login` (`lg_id`, `lg_fname`, `lg_mname`, `lg_lname`, `lg_email`, `lg_email_id`, `lg_password`, `lg_type`, `s_id`, `pr_name`, `pr_email`, `is_super_admin`) VALUES
(386, 'admin', '', 'admin', 'admin', 'admin', '21232f297a57a5a743894a0e4a801fc3', '0', '0', NULL, NULL, 1);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_permissions`
--

DROP TABLE IF EXISTS `tbl_permissions`;
CREATE TABLE IF NOT EXISTS `tbl_permissions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `permission_array` text NOT NULL,
  `permission_core` int(11) NOT NULL,
  `admin_permissions` text NOT NULL,
  `status` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=547 ;

--
-- Dumping data for table `tbl_permissions`
--


-- --------------------------------------------------------

--
-- Table structure for table `tbl_permissions_lists`
--

DROP TABLE IF EXISTS `tbl_permissions_lists`;
CREATE TABLE IF NOT EXISTS `tbl_permissions_lists` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `permission_name` varchar(255) NOT NULL,
  `permission_mask_name` text NOT NULL,
  `active` int(11) NOT NULL,
  `date_time` datetime NOT NULL,
  `show` varchar(15) NOT NULL,
  `img` varchar(500) NOT NULL,
  `is_parent` int(11) NOT NULL,
  `role_id` tinyint(4) NOT NULL DEFAULT '0' COMMENT '1=>admin, 2=>instructor,3=>student, 4=>principal',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=212 ;

--
-- Dumping data for table `tbl_permissions_lists`
--

INSERT INTO `tbl_permissions_lists` (`id`, `permission_name`, `permission_mask_name`, `active`, `date_time`, `show`, `img`, `is_parent`, `role_id`) VALUES
(24, 'can clear keys', 'can clear keys', 1, '2012-11-14 22:09:56', '', '', -1, 0),
(25, 'can add additional info', 'can add additional info', 1, '2012-11-14 22:10:22', '', '', -1, 0),
(26, 'can add course additional info', 'can add course additional info', 1, '2012-11-14 22:10:35', '', '', -1, 0),
(27, 'can send notification', 'can send notification', 1, '2012-11-14 22:10:44', '', '', -1, 0),
(28, 'can export events', 'can export events', 1, '2012-11-14 22:10:54', '', '', -1, 0),
(30, 'send notfication by role', 'send notfication by role', 1, '2012-11-21 14:43:05', '', '', -1, 0),
(31, 'can import fb events', 'can import fb events', 1, '2012-11-22 12:38:35', '', '', -1, 0),
(32, 'can import information', 'can import information', 1, '2012-11-22 13:58:10', '', '', -1, 0),
(33, 'remove select all', 'remove select all', 1, '2012-11-23 14:48:01', '', '', -1, 0),
(34, 'remove automatic push', 'remove automatic push', 1, '2012-11-23 14:54:42', '', '', -1, 0),
(35, 'can import event', 'can import event', 1, '2012-11-26 12:49:23', '', '', -1, 0),
(36, 'have_mobile_app', 'have_mobile_app', 1, '2012-12-06 13:30:48', 'hide', '', -1, 0),
(37, 'school_website', 'school_website', 1, '2012-12-06 13:30:52', 'hide', '', -1, 0),
(38, 'own_smartphone', 'own_smartphone', 1, '2012-12-06 13:30:57', 'hide', '', -1, 0),
(39, 'own_smartphone_option', ' own_smartphone_option', 1, '2012-12-06 15:11:10', 'hide', '', -1, 0),
(40, 'plateform_data', ' plateform_data', 1, '2012-12-06 15:11:14', 'hide', '', -1, 0),
(41, 'role_in_school', ' role_in_school', 1, '2012-12-07 12:50:07', 'hide', '', -1, 0),
(42, 'level_of_school', ' level_of_school', 1, '2012-12-07 12:50:11', 'hide', '', -1, 0),
(43, 'own_smartphone_no_option', 'own_smartphone_no_option', 1, '2012-12-07 12:50:15', 'hide', '', -1, 0),
(44, 'using_school_website', ' using_school_website', 1, '2012-12-07 12:50:19', 'hide', '', -1, 0),
(45, 'using_school_mobile_app', ' using_school_mobile_app', 1, '2012-12-07 12:50:23', 'hide', '', -1, 0),
(47, 'can import/export in cv formate', 'can import/export in cv formate', 1, '2013-03-05 13:50:32', '', '', -1, 0),
(48, 'can manage courses settings', 'can manage courses settings', 1, '2013-03-07 04:04:24', '', '', -1, 0),
(49, 'strong password', 'strong password', 1, '2013-04-11 06:04:24', '', '', -1, 0),
(59, 'course drop', 'course  drop', 1, '2013-05-31 03:46:35', '', '', -1, 0),
(62, 'can select course', 'can select course', 1, '2013-06-05 02:54:26', '', '', -1, 0),
(63, 'can log in', 'can log in', 1, '2013-06-05 07:18:37', '', '', -1, 0),
(64, 'absent today', 'absent today', 1, '2013-06-05 07:28:49', '', '', -1, 0),
(65, 'can add additional info student', 'can add additional info student', 1, '2013-06-05 07:30:34', '', '', -1, 0),
(66, 'can login in', 'can login in', 1, '2013-06-07 04:46:45', '', '', -1, 0),
(67, 'can manage health', 'can manage health', 1, '2013-06-13 07:30:17', '', '', -1, 0),
(68, 'can clear  keys ', 'keys  settings', 1, '2013-06-17 01:51:20', '', '', -1, 0),
(69, 'manage_health', 'manage health system', 1, '2013-06-19 08:54:12', '', '', -1, 0),
(116, 'Dashboard', '', 1, '2013-09-25 17:17:35', 'hide', '<i class="icon-home"></i>', -1, 1),
(117, 'Manage User', '', 1, '2013-09-25 17:17:35', 'hide', '<i class="icon-user"></i>', -1, 1),
(118, 'User Management', 'users/', 1, '2013-09-25 17:17:35', 'hide', '<i class="icon-user"></i>', 117, 1),
(119, 'Add New User', 'add_user/', 1, '2013-09-25 17:17:35', 'hide', '<i class="icon-user"></i>', 117, 1),
(120, 'Self Registration', 'self_registration/', 1, '2013-09-25 17:17:35', 'hide', '<i class="icon-user"></i>', 117, 1),
(121, 'Messaging', 'messaging/', 1, '2013-09-25 17:17:35', 'hide', '<i class="icon-envelope"> </i>', -1, 1),
(122, 'Manage Roles', 'roles/', 1, '2013-09-25 17:17:35', 'hide', '<i class="icon-sitemap"></i>', -1, 1),
(123, 'Manage Courses', 'mng_courses/', 1, '2013-09-25 17:17:35', 'hide', '<i class="icon-barcode"> </i>', -1, 1),
(124, 'Calendar Requests', 'manage_calendar/', 1, '2013-09-25 17:17:35', 'hide', '<i class="icon-cogs"> </i>', -1, 1),
(125, 'Events', 'instructor/', 1, '2013-09-25 17:17:35', 'hide', '<i class="icon-calendar"></i>', -1, 1),
(126, 'File Managment', '', 1, '2013-09-25 17:17:36', 'hide', '<i class="icon-bullhorn"> </i>', -1, 1),
(127, 'Uploads', 'filesharing/', 1, '2013-09-25 17:17:36', 'hide', '<i class="icon-bullhorn"> </i>', 126, 1),
(128, 'Video Repository', 'video_repo/', 1, '2013-09-25 17:17:36', 'hide', '<i class="icon-bullhorn"> </i>', 126, 1),
(129, 'School Information', 'instructor/profile/', 1, '2013-09-25 17:17:36', 'hide', '<i class="icon-info"></i>', -1, 1),
(130, 'Reports', 'reports/', 1, '2013-09-25 17:17:36', 'hide', '<i class="icon-bar-chart"> </i>', -1, 1),
(131, 'Settings', 'settings/', 1, '2013-09-25 17:17:36', 'hide', '<i class="icon-cogs"> </i>', -1, 1),
(132, 'About Management', '', 1, '2013-09-25 17:17:36', 'hide', '<i class="icon-bullhorn"> </i>', -1, 1),
(133, 'Image Manager', 'image_gallery/', 1, '2013-09-25 17:17:36', 'hide', '<i class="icon-bullhorn"> </i>', 132, 1),
(134, 'News Management', 'mng_news/', 1, '2013-09-25 17:17:36', 'hide', '<i class="icon-bullhorn"> </i>', 132, 1),
(135, 'Account Setting', 'account_settings/', 1, '2013-09-25 17:17:36', 'hide', '<i class="icon-user"></i>', -1, 1),
(136, 'Dashboard', 'instructor/show_dashboard/', 1, '2013-09-25 17:17:36', 'hide', '<i class="icon-home"></i>', -1, 2),
(137, 'Events', 'instructor/', 1, '2013-09-25 17:17:36', 'hide', '<i class="icon-calendar"></i>', -1, 2),
(138, 'Additional information', 'instructor/profile/', 1, '2013-09-25 17:17:36', 'hide', '<i class="icon-info"></i>', -1, 2),
(139, 'Messaging', 'messaging/', 1, '2013-09-25 17:17:36', 'hide', '<i class="icon-envelope"> </i>', -1, 2),
(140, 'Video repository', 'instructor/video_repo/', 1, '2013-09-25 17:17:36', 'hide', '<i class="icon-play-circle"></i>', -1, 2),
(142, 'Attendance', 'attendence/', 1, '2013-09-25 17:17:36', 'hide', '<i class="icon-user-md"></i>', -1, 2),
(144, 'Grade Book', 'grade_book/', 1, '2013-09-25 17:17:36', 'hide', '<i class="icon-book"></i>', -1, 2),
(146, 'Filesharing', 'filesharing/', 1, '2013-09-25 17:17:36', 'hide', '<i class="icon-share"></i>', -1, 2),
(148, 'Lession Plans', 'instructor/lesson_plans/', 1, '2013-09-25 17:17:36', 'hide', '<i class="icon-road"></i>', -1, 2),
(150, 'Reports', 'reports/', 1, '2013-09-25 17:17:36', 'hide', '<i class="icon-bar-chart"></i>', -1, 2),
(152, 'Settings', 'instructor/settings/', 1, '2013-09-25 17:17:36', 'hide', '<i class="icon-cogs"></i>', -1, 2),
(154, 'Forums', 'forum/', 1, '2013-09-25 17:17:36', 'hide', '<i class="icon-comments-alt"></i>', -1, 2),
(156, 'My Calendar', 'instructor/add_calendar/', 1, '2013-09-25 17:17:36', 'hide', '<i class="icon-calendar"></i>', -1, 2),
(158, ' Account Settings', 'instructor/user_account_settings/', 1, '2013-09-25 17:17:36', 'hide', '<i class="icon-user"></i>', -1, 2),
(160, 'Dashboard', 'instructor/show_dashboard/', 1, '2013-09-25 17:17:36', 'hide', '<i class="icon-home"></i>', -1, 3),
(162, 'Events', 'instructor/', 1, '2013-09-25 17:17:36', 'hide', '<i class="icon-calendar"></i>', -1, 3),
(164, 'Additional information', 'instructor/profile/', 1, '2013-09-25 17:17:36', 'hide', '<i class="icon-info"></i>', -1, 3),
(166, 'Messaging', 'messaging/', 1, '2013-09-25 17:17:36', 'hide', '<i class="icon-envelope"> </i>', -1, 3),
(168, 'Video repository', 'instructor/video_repo/', 1, '2013-09-25 17:17:36', 'hide', '<i class="icon-play-circle"></i>', -1, 3),
(170, 'Attendance', 'attendence/', 1, '2013-09-25 17:17:36', 'hide', '<i class="icon-user-md"></i>', -1, 3),
(172, 'Grade Book', 'grade_book/', 1, '2013-09-25 17:17:36', 'hide', '<i class="icon-book"></i>', -1, 3),
(174, 'Filesharing', 'filesharing/', 1, '2013-09-25 17:17:36', 'hide', '<i class="icon-share"></i>', -1, 3),
(176, 'Lession Plans', 'instructor/lesson_plans/', 1, '2013-09-25 17:17:36', 'hide', '<i class="icon-road"></i>', -1, 3),
(178, 'Forums', 'forum/', 1, '2013-09-25 17:17:36', 'hide', '<i class="icon-comments-alt"></i>', -1, 3),
(180, 'My Calendar', 'instructor/add_calendar/', 1, '2013-09-25 17:17:36', 'hide', '<i class="icon-calendar"></i>', -1, 3),
(182, ' Account Settings', 'instructor/user_account_settings/', 1, '2013-09-25 17:17:36', 'hide', '<i class="icon-user"></i>', -1, 3),
(208, 'Update User', 'update_user/', 1, '2013-10-02 18:45:44', 'hide', '<i class="icon-user"></i>', 117, 1),
(209, 'Tests', 'tests_admin/', 1, '2013-10-14 15:22:38', 'hide', '<i class="icon-cogs"> </i>', -1, 2),
(210, 'Tests', 'tests/', 1, '2013-10-14 15:23:01', 'hide', '<i class="icon-cogs"> </i>', -1, 3),
(211, 'test', 'test', 1, '2014-01-24 14:58:30', '', '', 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_roles`
--

DROP TABLE IF EXISTS `tbl_roles`;
CREATE TABLE IF NOT EXISTS `tbl_roles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `role_name` varchar(100) NOT NULL,
  `s_id` int(11) DEFAULT NULL,
  `s_type` varchar(50) DEFAULT NULL,
  `date_time` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=991 ;

--
-- Dumping data for table `tbl_roles`
--


-- --------------------------------------------------------

--
-- Table structure for table `tbl_student_detail`
--

DROP TABLE IF EXISTS `tbl_student_detail`;
CREATE TABLE IF NOT EXISTS `tbl_student_detail` (
  `st_id` int(11) NOT NULL AUTO_INCREMENT,
  `st_lg_id` int(11) NOT NULL,
  `st_addmission_id` varchar(100) NOT NULL,
  `st_add_date` varchar(100) NOT NULL,
  `st_fname` varchar(254) NOT NULL,
  `st_mname` varchar(200) NOT NULL,
  `st_lname` varchar(200) NOT NULL,
  `st_faculty` varchar(200) NOT NULL,
  `st_year` varchar(50) NOT NULL,
  `st_batch` varchar(300) DEFAULT NULL,
  `st_dob` varchar(300) DEFAULT NULL,
  `st_gender` varchar(300) NOT NULL,
  `st_fin_cate` varchar(300) NOT NULL,
  `st_blood_group` varchar(50) NOT NULL,
  `st_birth_place` varchar(300) NOT NULL,
  `st_nationality` varchar(300) NOT NULL,
  `st_mother_tongue` varchar(300) NOT NULL,
  `st_cate` varchar(300) NOT NULL,
  `st_religion` varchar(300) NOT NULL,
  `st_nationalId` varchar(300) NOT NULL,
  `st_address_1` text,
  `st_addres_2` text,
  `st_city` varchar(300) NOT NULL,
  `st_state` varchar(300) NOT NULL,
  `st_pin_code` varchar(300) NOT NULL,
  `st_country` varchar(300) NOT NULL,
  `st_phone` varchar(300) NOT NULL,
  `st_mphone` varchar(300) NOT NULL,
  `st_email` varchar(300) NOT NULL,
  `st_image` varchar(300) NOT NULL,
  PRIMARY KEY (`st_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

--
-- Dumping data for table `tbl_student_detail`
--


-- --------------------------------------------------------

--
-- Table structure for table `tbl_timezones`
--

DROP TABLE IF EXISTS `tbl_timezones`;
CREATE TABLE IF NOT EXISTS `tbl_timezones` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `GMT` varchar(5) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `name` varchar(120) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=150 ;

--
-- Dumping data for table `tbl_timezones`
--

INSERT INTO `tbl_timezones` (`id`, `GMT`, `name`) VALUES
(1, '-12.0', '(GMT-12:00)-International Date Line West'),
(2, '-11.0', '(GMT-11:00)-Midway Island, Samoa'),
(3, '-10.0', '(GMT-10:00)-Hawaii'),
(4, '-9.0', '(GMT-09:00)-Alaska'),
(5, '-8.0', '(GMT-08:00)-Pacific Time (US & Canada); Tijuana'),
(6, '-7.0', '(GMT-07:00)-Arizona'),
(7, '-7.0', '(GMT-07:00)-Chihuahua, La Paz, Mazatlan'),
(8, '-7.0', '(GMT-07:00)-Mountain Time (US & Canada)'),
(9, '-6.0', '(GMT-06:00)-Central America'),
(10, '-6.0', '(GMT-06:00)-Central Time (US & Canada)'),
(11, '-6.0', '(GMT-06:00)-Guadalajara, Mexico City, Monterrey'),
(12, '-6.0', '(GMT-06:00)-Saskatchewan'),
(13, '-5.0', '(GMT-05:00)-Bogota, Lima, Quito'),
(14, '-5.0', '(GMT-05:00)-Eastern Time (US & Canada)'),
(15, '-5.0', '(GMT-05:00)-Indiana (East)'),
(16, '-4.0', '(GMT-04:00)-Atlantic Time (Canada)'),
(17, '-4.0', '(GMT-04:00)-Caracas, La Paz'),
(18, '-4.0', '(GMT-04:00)-Santiago'),
(19, '-3.5', '(GMT-03:30)-Newfoundland'),
(20, '-3.0', '(GMT-03:00)-Brasilia'),
(21, '-3.0', '(GMT-03:00)-Buenos Aires, Georgetown'),
(22, '-3.0', '(GMT-03:00)-Greenland'),
(23, '-2.0', '(GMT-02:00)-Mid-Atlantic'),
(24, '-1.0', '(GMT-01:00)-Azores'),
(25, '-1.0', '(GMT-01:00)-Cape Verde Is.'),
(26, '0.0', '(GMT)-Casablanca, Monrovia'),
(27, '0.0', '(GMT)-Greenwich Mean Time: Dublin, Edinburgh, Lisbon, London'),
(28, '1.0', '(GMT+01:00)-Amsterdam, Berlin, Bern, Rome, Stockholm, Vienna'),
(29, '1.0', '(GMT+01:00)-Belgrade, Bratislava, Budapest, Ljubljana, Prague'),
(30, '1.0', '(GMT+01:00)-Brussels, Copenhagen, Madrid, Paris'),
(31, '1.0', '(GMT+01:00)-Sarajevo, Skopje, Warsaw, Zagreb'),
(32, '1.0', '(GMT+01:00)-West Central Africa'),
(33, '2.0', '(GMT+02:00)-Athens, Beirut, Istanbul, Minsk'),
(34, '2.0', '(GMT+02:00)-Bucharest'),
(35, '2.0', '(GMT+02:00)-Cairo'),
(36, '2.0', '(GMT+02:00)-Harare, Pretoria'),
(37, '2.0', '(GMT+02:00)-Helsinki, Kyiv, Riga, Sofia, Tallinn, Vilnius'),
(38, '2.0', '(GMT+02:00)-Jerusalem'),
(39, '3.0', '(GMT+03:00)-Baghdad'),
(40, '3.0', '(GMT+03:00)-Kuwait, Riyadh'),
(41, '3.0', '(GMT+03:00)-Moscow, St. Petersburg, Volgograd'),
(42, '3.0', '(GMT+03:00)-Nairobi'),
(43, '3.5', '(GMT+03:30)-Tehran'),
(44, '4.0', '(GMT+04:00)-Abu Dhabi, Muscat'),
(45, '4.0', '(GMT+04:00)-Baku, Tbilisi, Yerevan'),
(46, '4.5', '(GMT+04:30)-Kabul'),
(47, '5.0', '(GMT+05:00)-Ekaterinburg'),
(48, '5.0', '(GMT+05:00)-Islamabad, Karachi, Tashkent'),
(49, '5.5', '(GMT+05:30)-Chennai, Kolkata, Mumbai, New Delhi'),
(50, '5.75', '(GMT+05:45)-Kathmandu'),
(51, '6.0', '(GMT+06:00)-Almaty, Novosibirsk'),
(52, '6.0', '(GMT+06:00)-Astana, Dhaka'),
(53, '6.0', '(GMT+06:00)-Sri Jayawardenepura'),
(54, '6.5', '(GMT+06:30)-Rangoon'),
(55, '7.0', '(GMT+07:00)-Bangkok, Hanoi, Jakarta'),
(56, '7.0', '(GMT+07:00)-Krasnoyarsk'),
(57, '8.0', '(GMT+08:00)-Beijing, Chongqing, Hong Kong, Urumqi'),
(58, '8.0', '(GMT+08:00)-Irkutsk, Ulaan Bataar'),
(59, '8.0', '(GMT+08:00)-Kuala Lumpur, Singapore'),
(60, '8.0', '(GMT+08:00)-Perth'),
(61, '8.0', '(GMT+08:00)-Taipei'),
(62, '9.0', '(GMT+09:00)-Osaka, Sapporo, Tokyo'),
(63, '9.0', '(GMT+09:00)-Seoul'),
(64, '9.0', '(GMT+09:00)-Vakutsk'),
(65, '9.5', '(GMT+09:30)-Adelaide'),
(66, '9.5', '(GMT+09:30)-Darwin'),
(67, '10.0', '(GMT+10:00)-Brisbane'),
(68, '10.0', '(GMT+10:00)-Canberra, Melbourne, Sydney'),
(69, '10.0', '(GMT+10:00)-Guam, Port Moresby'),
(70, '10.0', '(GMT+10:00)-Hobart'),
(71, '10.0', '(GMT+10:00)-Vladivostok'),
(72, '11.0', '(GMT+11:00)-Magadan, Solomon Is., New Caledonia'),
(73, '12.0', '(GMT+12:00)-Auckland, Wellington'),
(74, '12.0', '(GMT+12:00)-Fiji, Kamchatka, Marshall Is.'),
(75, '-12.0', '(GMT-12:00)-International Date Line West'),
(76, '-11.0', '(GMT-11:00)-Midway Island, Samoa'),
(77, '-10.0', '(GMT-10:00)-Hawaii'),
(78, '-9.0', '(GMT-09:00)-Alaska'),
(79, '-8.0', '(GMT-08:00)-Pacific Time (US & Canada); Tijuana'),
(80, '-7.0', '(GMT-07:00)-Arizona'),
(81, '-7.0', '(GMT-07:00)-Chihuahua, La Paz, Mazatlan'),
(82, '-7.0', '(GMT-07:00)-Mountain Time (US & Canada)'),
(83, '-6.0', '(GMT-06:00)-Central America'),
(84, '-6.0', '(GMT-06:00)-Central Time (US & Canada)'),
(85, '-6.0', '(GMT-06:00)-Guadalajara, Mexico City, Monterrey'),
(86, '-6.0', '(GMT-06:00)-Saskatchewan'),
(87, '-5.0', '(GMT-05:00)-Bogota, Lima, Quito'),
(88, '-5.0', '(GMT-05:00)-Eastern Time (US & Canada)'),
(89, '-5.0', '(GMT-05:00)-Indiana (East)'),
(90, '-4.0', '(GMT-04:00)-Atlantic Time (Canada)'),
(91, '-4.0', '(GMT-04:00)-Caracas, La Paz'),
(92, '-4.0', '(GMT-04:00)-Santiago'),
(93, '-3.5', '(GMT-03:30)-Newfoundland'),
(94, '-3.0', '(GMT-03:00)-Brasilia'),
(95, '-3.0', '(GMT-03:00)-Buenos Aires, Georgetown'),
(96, '-3.0', '(GMT-03:00)-Greenland'),
(97, '-2.0', '(GMT-02:00)-Mid-Atlantic'),
(98, '-1.0', '(GMT-01:00)-Azores'),
(99, '-1.0', '(GMT-01:00)-Cape Verde Is.'),
(100, '0.0', '(GMT)-Casablanca, Monrovia'),
(101, '0.0', '(GMT)-Greenwich Mean Time: Dublin, Edinburgh, Lisbon, London'),
(102, '1.0', '(GMT+01:00)-Amsterdam, Berlin, Bern, Rome, Stockholm, Vienna'),
(103, '1.0', '(GMT+01:00)-Belgrade, Bratislava, Budapest, Ljubljana, Prague'),
(104, '1.0', '(GMT+01:00)-Brussels, Copenhagen, Madrid, Paris'),
(105, '1.0', '(GMT+01:00)-Sarajevo, Skopje, Warsaw, Zagreb'),
(106, '1.0', '(GMT+01:00)-West Central Africa'),
(107, '2.0', '(GMT+02:00)-Athens, Beirut, Istanbul, Minsk'),
(108, '2.0', '(GMT+02:00)-Bucharest'),
(109, '2.0', '(GMT+02:00)-Cairo'),
(110, '2.0', '(GMT+02:00)-Harare, Pretoria'),
(111, '2.0', '(GMT+02:00)-Helsinki, Kyiv, Riga, Sofia, Tallinn, Vilnius'),
(112, '2.0', '(GMT+02:00)-Jerusalem'),
(113, '3.0', '(GMT+03:00)-Baghdad'),
(114, '3.0', '(GMT+03:00)-Kuwait, Riyadh'),
(115, '3.0', '(GMT+03:00)-Moscow, St. Petersburg, Volgograd'),
(116, '3.0', '(GMT+03:00)-Nairobi'),
(117, '3.5', '(GMT+03:30)-Tehran'),
(118, '4.0', '(GMT+04:00)-Abu Dhabi, Muscat'),
(119, '4.0', '(GMT+04:00)-Baku, Tbilisi, Yerevan'),
(120, '4.5', '(GMT+04:30)-Kabul'),
(121, '5.0', '(GMT+05:00)-Ekaterinburg'),
(122, '5.0', '(GMT+05:00)-Islamabad, Karachi, Tashkent'),
(123, '5.5', '(GMT+05:30)-Chennai, Kolkata, Mumbai, New Delhi'),
(124, '5.75', '(GMT+05:45)-Kathmandu'),
(125, '6.0', '(GMT+06:00)-Almaty, Novosibirsk'),
(126, '6.0', '(GMT+06:00)-Astana, Dhaka'),
(127, '6.0', '(GMT+06:00)-Sri Jayawardenepura'),
(128, '6.5', '(GMT+06:30)-Rangoon'),
(129, '7.0', '(GMT+07:00)-Bangkok, Hanoi, Jakarta'),
(130, '7.0', '(GMT+07:00)-Krasnoyarsk'),
(131, '8.0', '(GMT+08:00)-Beijing, Chongqing, Hong Kong, Urumqi'),
(132, '8.0', '(GMT+08:00)-Irkutsk, Ulaan Bataar'),
(133, '8.0', '(GMT+08:00)-Kuala Lumpur, Singapore'),
(134, '8.0', '(GMT+08:00)-Perth'),
(135, '8.0', '(GMT+08:00)-Taipei'),
(136, '9.0', '(GMT+09:00)-Osaka, Sapporo, Tokyo'),
(137, '9.0', '(GMT+09:00)-Seoul'),
(138, '9.0', '(GMT+09:00)-Vakutsk'),
(139, '9.5', '(GMT+09:30)-Adelaide'),
(140, '9.5', '(GMT+09:30)-Darwin'),
(141, '10.0', '(GMT+10:00)-Brisbane'),
(142, '10.0', '(GMT+10:00)-Canberra, Melbourne, Sydney'),
(143, '10.0', '(GMT+10:00)-Guam, Port Moresby'),
(144, '10.0', '(GMT+10:00)-Hobart'),
(145, '10.0', '(GMT+10:00)-Vladivostok'),
(146, '11.0', '(GMT+11:00)-Magadan, Solomon Is., New Caledonia'),
(147, '12.0', '(GMT+12:00)-Auckland, Wellington'),
(148, '12.0', '(GMT+12:00)-Fiji, Kamchatka, Marshall Is.'),
(149, '13.0', '(GMT+13:00)-Nuku''alofa ');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_university_info`
--

DROP TABLE IF EXISTS `tbl_university_info`;
CREATE TABLE IF NOT EXISTS `tbl_university_info` (
  `ad_id` int(11) NOT NULL AUTO_INCREMENT,
  `ad_univ_id` int(11) NOT NULL,
  `ad_univ_name` varchar(100) NOT NULL,
  `ad_univ_office_hours` text NOT NULL,
  `ad_univ_address1` text NOT NULL,
  `ad_univ_city` text NOT NULL,
  `ad_univ_state` text NOT NULL,
  `ad_univ_zip` text NOT NULL,
  `ad_univ_address2` text NOT NULL,
  `ad_univ_email` text NOT NULL,
  `ad_univ_phone` text NOT NULL,
  `ad_univ_fax` text NOT NULL,
  `ad_univ_website` text NOT NULL,
  `ad_univ_notes` text NOT NULL,
  `ad_univ_image` text,
  `ad_univ_timezone` varchar(15) NOT NULL,
  `ad_univ_phn` varchar(45) NOT NULL,
  PRIMARY KEY (`ad_univ_id`),
  UNIQUE KEY `ad_id` (`ad_id`),
  UNIQUE KEY `ad_univ_id` (`ad_univ_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

--
-- Dumping data for table `tbl_university_info`
--

