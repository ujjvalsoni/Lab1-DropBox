-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 16, 2017 at 06:12 AM
-- Server version: 10.1.26-MariaDB
-- PHP Version: 7.1.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `nodemysql`
--

-- --------------------------------------------------------

--
-- Table structure for table `files`
--

CREATE TABLE `files` (
  `UserName` varchar(300) NOT NULL,
  `name` varchar(300) NOT NULL,
  `star` tinyint(1) NOT NULL,
  `action` varchar(300) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `files`
--

INSERT INTO `files` (`UserName`, `name`, `star`, `action`) VALUES
('arth', '00-CmpE202-01+02-SSE-syllabus-Fall2017.pdf', 0, 'upload'),
('arth', '2_WirelessIntro.ppt', 0, 'upload'),
('arth', '2_WirelessIntro (1).ppt', 0, 'upload'),
('arth', '2_WirelessIntro.ppt', 0, 'delete');

-- --------------------------------------------------------

--
-- Table structure for table `people`
--

CREATE TABLE `people` (
  `ID` int(11) NOT NULL,
  `UserName` varchar(255) DEFAULT NULL,
  `PassWord` char(60) DEFAULT NULL,
  `FirstName` varchar(255) DEFAULT NULL,
  `LastName` varchar(255) DEFAULT NULL,
  `Age` int(11) DEFAULT NULL,
  `Gender` char(1) DEFAULT NULL,
  `birth` date DEFAULT NULL,
  `Work` varchar(300) NOT NULL,
  `Education` varchar(300) NOT NULL,
  `Phone` int(10) NOT NULL,
  `Music` varchar(4000) NOT NULL,
  `Shows` varchar(4000) NOT NULL,
  `Sports` varchar(4000) NOT NULL,
  `Email` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `people`
--

INSERT INTO `people` (`ID`, `UserName`, `PassWord`, `FirstName`, `LastName`, `Age`, `Gender`, `birth`, `Work`, `Education`, `Phone`, `Music`, `Shows`, `Sports`, `Email`) VALUES
(27, 'arth', 'U2FsdGVkX1++/9qOQgP3eAE/cpHRYmyYPliuJlrG0Ro=', 'arth', 'soni', 21, 'M', '2017-01-01', 'ghj', 'hj', 67, 'yu', 'yu', 'y', ''),
(28, 'ujjval', 'U2FsdGVkX18/qGmXUTS3RmL9s3goj4BT4A+0tQpH1sQ=', 'ujjval', 'soni', 21, 'M', '1996-01-29', 'Student', 'MS', 2147483647, 'Rock', 'GOT', 'Cricket', 'ujjval.soni@sjsu.edu');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `people`
--
ALTER TABLE `people`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `people`
--
ALTER TABLE `people`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
