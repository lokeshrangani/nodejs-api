-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 07, 2020 at 01:33 PM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.4.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `nodejs_project`
--

-- --------------------------------------------------------

--
-- Table structure for table `quesions`
--

CREATE TABLE `quesions` (
  `id` int(11) NOT NULL,
  `QuizFK` int(11) NOT NULL,
  `Quesion` text NOT NULL,
  `option1` text NOT NULL,
  `option2` text NOT NULL,
  `option3` text NOT NULL,
  `option4` text NOT NULL,
  `status` text DEFAULT NULL,
  `mark` int(10) NOT NULL DEFAULT 5,
  `is_removed` varchar(255) DEFAULT 'No',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `quesions`
--

INSERT INTO `quesions` (`id`, `QuizFK`, `Quesion`, `option1`, `option2`, `option3`, `option4`, `status`, `mark`, `is_removed`, `createdAt`, `updatedAt`) VALUES
(1, 2, 'Test Quest for quiz 2.1', 'Test2', 'Test2', 'Test3', 'Test4', 'Test1', 5, 'No', '2020-10-28 08:39:18', '2020-11-07 06:01:46'),
(2, 2, 'Test Quest for quiz 2.22', 'Test1', 'Test2', 'Test3', 'Test4', 'Test1', 5, 'No', '2020-10-28 08:39:18', '2020-10-28 12:05:38'),
(3, 2, 'Test Quest for quiz 2.3', 'Test1', 'Test2', 'Test3', 'Test4', 'Test1', 5, 'No', '2020-10-28 08:39:18', '2020-10-28 12:05:38'),
(4, 2, 'Test Quest for quiz 2.4', 'Test1', 'Test2', 'Test3', 'Test14', 'Test1', 5, 'No', '2020-10-28 08:39:18', '2020-10-28 12:05:38'),
(5, 1, 'Test Quest for quiz 345', 'Test2', 'Test22', 'Test33', 'Test44', 'Test', 5, 'Yes', '2020-10-28 08:39:52', '2020-11-07 06:04:57'),
(6, 1, 'Test Quest for quiz 1.2', 'Test148', 'Test2', 'Test3', 'Test4', 'Test1', 5, 'No', '2020-10-28 08:39:52', '2020-11-07 06:12:16'),
(7, 1, 'Test PHP Ques', 'PHP1', 'PHP2', 'PHP3', 'PHP4', 'PHP1', 5, 'No', '2020-10-28 11:02:14', '2020-11-05 11:55:39'),
(9, 1, 'ffdgfdg 34', 'fdgfg34', 'fgfg23451911', 'fgfg233', 'fgfgfgg', 'fgfg45811', 5, 'Yes', '2020-10-28 11:17:31', '2020-10-28 11:45:56'),
(10, 1, 'test quest last', 'dfdfd', 'dfdf', 'dfdf', 'test', 'dfdf', 5, 'Yes', '2020-10-28 11:26:46', '2020-10-28 11:45:51'),
(11, 3, '123', '123', '123', '123', '123', '123', 5, 'Yes', '2020-10-28 11:36:45', '2020-10-28 11:37:02'),
(12, 4, 'PHP Quiz', '1', '2', '3', '4', '3', 5, 'Yes', '2020-11-03 05:43:13', '2020-11-03 05:44:21'),
(13, 6, 'PHP Quiz123', 'PHP Quiz113', 'PHP Quiz123', 'PHP Quiz123', 'PHP Quiz13', 'PHP Quiz1', 5, 'Yes', '2020-11-06 14:26:59', '2020-11-07 10:47:41'),
(14, 6, 'PHP Quiz', 'PHP Quiz', 'PHP Quiz', 'PHP Quiz', 'PHP Quiz', 'PHP Quiz', 5, 'Yes', '2020-11-07 06:03:12', '2020-11-07 10:47:41');

-- --------------------------------------------------------

--
-- Table structure for table `quizzes`
--

CREATE TABLE `quizzes` (
  `id` int(11) NOT NULL,
  `QuizTitle` varchar(255) NOT NULL,
  `QuizStatus` varchar(255) NOT NULL DEFAULT 'Success',
  `QuizCode` text DEFAULT '',
  `UserFK` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `quizzes`
--

INSERT INTO `quizzes` (`id`, `QuizTitle`, `QuizStatus`, `QuizCode`, `UserFK`, `createdAt`, `updatedAt`) VALUES
(1, 'PHP Quiz', 'Success', 'php-code1', 1, '2020-10-28 08:41:04', '2020-11-03 05:42:07'),
(2, 'Javascript', 'Success', 'java-script', 1, '2020-10-28 08:41:24', '2020-10-28 12:05:38'),
(3, 'Network Technology', 'remove', 'net-tech', 1, '2020-10-28 08:54:40', '2020-10-28 11:37:02'),
(4, '213', 'remove', '123-132', 1, '2020-11-03 05:41:58', '2020-11-03 05:44:21'),
(5, 'PHP Quiz', 'remove', 'php-code1', 1, '2020-11-06 14:26:25', '2020-11-06 14:26:31'),
(6, 'PHP Quiz', 'remove', 'php-code2', 1, '2020-11-06 14:26:35', '2020-11-07 10:47:41'),
(7, 'PHP Quiz', 'Success', 'php-code1', 1, '2020-11-07 11:05:08', '2020-11-07 11:05:08');

-- --------------------------------------------------------

--
-- Table structure for table `resetpasses`
--

CREATE TABLE `resetpasses` (
  `id` int(11) NOT NULL,
  `UserFK` int(255) NOT NULL,
  `code` text NOT NULL,
  `status` varchar(255) DEFAULT NULL,
  `is_clicked` int(11) NOT NULL DEFAULT 0,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `resetpasses`
--

INSERT INTO `resetpasses` (`id`, `UserFK`, `code`, `status`, `is_clicked`, `createdAt`, `updatedAt`) VALUES
(1, 0, '$2b$10$mB6aHGqksK/wIn/r1/ezB.Z4Ge24IUPyDjpWLpgWzXK15gwFq2cga', 'success', 0, '2020-10-19 10:18:42', '2020-10-19 10:18:42'),
(2, 0, '$2b$10$CW/DRSAwSWiwP12GA02a3ukteJQjmd/oLc9r79dIBqDbGGd2XsUai', 'success', 0, '2020-10-19 10:21:29', '2020-10-19 10:21:29'),
(3, 0, '$2b$10$z2cGaHMgJ5B5LeyqTk5E/ejpX4N0jlsjjDJg5lsUnNRwRkCY53k4i', 'success', 0, '2020-10-19 10:25:12', '2020-10-19 10:25:12'),
(4, 0, '$2b$10$9qZlJCHSsW/.DTMYLvY3geDFurOEVngwGqzDraUcWhM07LGHZTk7e', 'success', 0, '2020-10-19 10:25:56', '2020-10-19 10:25:56'),
(5, 1, '$2b$10$hcit/InA9IEnMKWuyPuQVeq/T3N.Rs/Ch9YV/uPCdc5FzzfHqvx4e', 'success', 0, '2020-10-19 10:51:15', '2020-10-19 10:51:15'),
(6, 1, '$2b$10$OXK4SoC9YOazaOWg/tMjduqm.1LYPUwFgywgT2vaOe/L6SZyXdBRe', 'success', 0, '2020-10-19 10:58:59', '2020-10-19 10:58:59'),
(7, 1, '6c4c2f67c485ba81643564921bbd38c6', 'success', 0, '2020-10-19 11:04:56', '2020-10-19 11:04:56'),
(8, 1, '6c4c2f67c485ba81643564921bbd38c6', 'success', 0, '2020-10-19 11:16:24', '2020-10-19 11:16:24'),
(9, 1, '801deea0bf175cdda83d364fb0fa18d5', 'success', 1, '2020-10-20 11:25:42', '2020-10-22 12:48:59'),
(10, 1, '801deea0bf175cdda83d364fb0fa18d5', 'success', 1, '2020-10-20 11:37:12', '2020-10-22 12:48:49'),
(11, 1, '801deea0bf175cdda83d364fb0fa18d5', 'success', 1, '2020-10-22 06:24:20', '2020-10-22 12:43:18'),
(12, 1, '801deea0bf175cdda83d364fb0fa1', 'success', 1, '2020-10-22 06:31:23', '2020-10-22 13:04:17'),
(13, 1, '801deea0bf175cdda83d364fb0fa18d5', 'success', 1, '2020-10-23 06:22:37', '2020-10-23 06:23:13');

-- --------------------------------------------------------

--
-- Table structure for table `results`
--

CREATE TABLE `results` (
  `id` int(11) NOT NULL,
  `UserFK` int(11) NOT NULL,
  `QuizFK` int(11) NOT NULL,
  `TotalMark` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `results`
--

INSERT INTO `results` (`id`, `UserFK`, `QuizFK`, `TotalMark`, `createdAt`, `updatedAt`) VALUES
(1, 1, 1, 10, '2020-11-06 13:20:32', '2020-11-06 13:20:32'),
(2, 1, 2, 20, '2020-11-06 13:51:09', '2020-11-06 13:51:09'),
(3, 1, 2, 15, '2020-11-06 14:12:34', '2020-11-06 14:12:34'),
(4, 1, 6, 0, '2020-11-07 05:51:08', '2020-11-07 05:51:08');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` text NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `createdAt`, `updatedAt`) VALUES
(1, 'Lokesh', 'lokesh@test.com', '$2b$10$osR5Q9Qc4WzAhLzf6rxeEOGxzcvkL9Uyzwn04w1BbYMut/ggENmea', '2020-10-19 14:04:52', '2020-10-23 06:23:20'),
(2, 'Test', 'Test@test.com', '$2b$10$FDr1cGcCHPtITU7.Qh4jhum6q5B3ug5WRNO.LnVaLaE2vQSc0CoaC', '2020-10-26 11:47:50', '2020-10-26 11:47:50'),
(3, 'test', 'test', '$2b$10$wmpBk68hWKYWD7x76nuNpuCmmhNX10rhdq/3T5LF1PU0ux09dixR.', '2020-11-07 11:50:42', '2020-11-07 11:50:42'),
(4, 're', 'er', '$2b$10$EiSzGRCY3vUtAKAUoPHoMerjiqvUh1LKF7lUhGZ7Oh/sB/hmoA3Zu', '2020-11-07 12:05:05', '2020-11-07 12:05:05');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `quesions`
--
ALTER TABLE `quesions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `QuizFK` (`QuizFK`);

--
-- Indexes for table `quizzes`
--
ALTER TABLE `quizzes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `UserFK` (`UserFK`);

--
-- Indexes for table `resetpasses`
--
ALTER TABLE `resetpasses`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `results`
--
ALTER TABLE `results`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `quesions`
--
ALTER TABLE `quesions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `quizzes`
--
ALTER TABLE `quizzes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `resetpasses`
--
ALTER TABLE `resetpasses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `results`
--
ALTER TABLE `results`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `quesions`
--
ALTER TABLE `quesions`
  ADD CONSTRAINT `quesions_ibfk_1` FOREIGN KEY (`QuizFK`) REFERENCES `quizzes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `quizzes`
--
ALTER TABLE `quizzes`
  ADD CONSTRAINT `quizzes_ibfk_1` FOREIGN KEY (`UserFK`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
