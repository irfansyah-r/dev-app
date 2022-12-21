-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 15, 2022 at 01:19 AM
-- Server version: 10.4.14-MariaDB
-- PHP Version: 7.4.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `apps_dev`
--

-- --------------------------------------------------------

--
-- Table structure for table `jobdesc`
--

CREATE TABLE `jobdesc` (
  `id` int(11) NOT NULL,
  `job` varchar(100) NOT NULL,
  `description` varchar(500) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `jobdesc`
--

INSERT INTO `jobdesc` (`id`, `job`, `description`, `created_at`) VALUES
(1, 'Admin', 'User Management', '2021-08-15 02:41:41'),
(2, 'Back End', 'Developing Back End', '2021-08-15 02:41:41'),
(3, 'Front End', 'Developing Front End', '2021-08-15 02:41:41'),
(4, 'UI/UX', 'Creating UI/UX Design pentok', '2021-08-15 02:41:41');

-- --------------------------------------------------------

--
-- Table structure for table `tasks`
--

CREATE TABLE `tasks` (
  `id` int(11) NOT NULL,
  `task` varchar(100) NOT NULL,
  `status` varchar(100) NOT NULL DEFAULT 'Unhandled',
  `users_id` int(11) DEFAULT NULL,
  `deadline` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tasks`
--

INSERT INTO `tasks` (`id`, `task`, `status`, `users_id`, `deadline`, `created_at`) VALUES
(1, 'Developing Back End for Dev App', 'Unhandled', NULL, '2021-08-15 13:30:18', '2021-08-15 13:28:47'),
(2, 'Developing Front End for Dev App', 'Unhandled', NULL, '2021-08-15 13:30:31', '2021-08-15 13:29:56'),
(3, 'Developing UI/UX for Dev App', 'Unhandled', NULL, '2021-08-31 13:30:46', '2021-08-15 13:31:02');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `jobdesc_id` int(100) DEFAULT NULL,
  `password` varchar(100) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `jobdesc_id`, `password`, `created_at`) VALUES
(1, 'John Doe', 'john.doe@gmail.com', 1, '$2b$10$uUHIvqZ7YFKp9A6EC53CZe1nqmmuP5LKMOrQTqLIxNhQuMqel9vau', '2021-08-16 02:05:38'),
(2, 'Liam Christopher', 'liam.chris@gmail.com', 2, '$2b$10$22WVkjG6ewtdOKMddQM/EO9gfcKrblCDDrRSRjSGydaufoxMGVr9S', '2021-08-16 02:05:43'),
(3, 'David Brown', 'david.brown@gmail.com', 3, '$2b$10$EPhMxVQOmXjBSwmEB3l.YuHdLA709OsKi1sGxU0TwyKFLHQz01Gza', '2021-08-16 02:05:47'),
(4, 'Helena Owen', 'helena.owen@gmail.com', 4, '$2b$10$ttd79L09fG3PsFNaKjrzhu0/Vqg./uw719blFPzzx5NmmRM1XRkVa', '2021-08-16 02:06:10');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `jobdesc`
--
ALTER TABLE `jobdesc`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tasks`
--
ALTER TABLE `tasks`
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
-- AUTO_INCREMENT for table `jobdesc`
--
ALTER TABLE `jobdesc`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `tasks`
--
ALTER TABLE `tasks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
