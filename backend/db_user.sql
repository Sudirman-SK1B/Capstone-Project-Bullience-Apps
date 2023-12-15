-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 05, 2023 at 06:20 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `capstone`
--

-- --------------------------------------------------------

--
-- Table structure for table `db_user`
--

CREATE TABLE `db_user` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `db_user`
--

INSERT INTO `db_user` (`id`, `username`, `email`, `password`) VALUES
(3, 'sudirman', 'sudirman.xtkj2@gmail.com', '$2b$10$tUtoPeYxHt76TRstZxp.lekgm0tN1h6Id9mdqA14pDj94Pz6nd59S'),
(4, 'bohri', 'bohri@gmail.com', '$2b$10$9CpeFUeMnknVV4qoUoVplOT2Oe1D45FEIUazZGyA9s/HRV4nAI4Nm'),
(5, 'sudirman', 'sudirman@gmail.com', '$2b$10$wLQE2qqnvEpNStqQ5G1zWe3hE16lUQLj6upg7P2vFX1IgO0bWRNaK'),
(6, 'Andri', 'andri.99@gmail.com', '$2b$10$5K3/XqJBqHIZ.f2qYoWcQOlOmTImijyVCDcI.tGhUe2BQyW73D8aq'),
(7, 'Riski', 'riski@gmail.com', '$2b$10$prx6Jflj/HuBurIn2MFbp.QPC5bol5jiD27n9ttEGqNvobVH/MtD.');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `db_user`
--
ALTER TABLE `db_user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `db_user`
--
ALTER TABLE `db_user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
