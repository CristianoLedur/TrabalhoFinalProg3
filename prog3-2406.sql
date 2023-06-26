-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 25, 2023 at 10:41 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `prog3`
--

-- --------------------------------------------------------

--
-- Table structure for table `atividade`
--

CREATE TABLE `atividade` (
  `id` int(11) NOT NULL,
  `status` enum('Aceita','Em avaliação','A reformular','Cancelada') DEFAULT NULL,
  `titulo` varchar(255) NOT NULL,
  `descricao` varchar(255) NOT NULL,
  `modalidade` varchar(255) NOT NULL,
  `categoria` varchar(255) NOT NULL,
  `diasEturnos` varchar(255) NOT NULL,
  `quantidadeVagas` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `cidadeId` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `atividade`
--

INSERT INTO `atividade` (`id`, `status`, `titulo`, `descricao`, `modalidade`, `categoria`, `diasEturnos`, `quantidadeVagas`, `userId`, `cidadeId`, `createdAt`, `updatedAt`) VALUES
(1, 'Em avaliação', 'Curso de programação em Python', 'Aprenda os conceitos básicos e avançados da linguagem Python.', 'Presencial', 'Curso', 'Segundas e Quartas, das 19h às 21h', 0, 1, NULL, '2023-06-25 01:04:29', '2023-06-25 01:04:29'),
(2, 'Em avaliação', 'Curso de Design Gráfico', 'Explore sua criatividade e aprenda a criar designs gráficos incríveis.', 'Online', 'Curso', 'Flexível, aulas gravadas', 0, 4, NULL, '2023-06-25 01:05:56', '2023-06-25 01:05:56'),
(3, 'A reformular', 'Curso de Marketing Digital', 'Descubra as estratégias e ferramentas do marketing digital para impulsionar seus negócios.', 'Presencial', 'Curso', 'Sábados, das 9h às 12h', 0, 6, NULL, '2023-06-25 01:09:42', '2023-06-25 01:09:42'),
(4, 'Aceita', 'Curso de Fotografia Profissional', 'Aprenda as técnicas e segredos da fotografia profissional e crie imagens incríveis.', 'Presencial', 'Curso', 'Terças e Quintas, das 19h às 21h', 0, 4, NULL, '2023-06-25 01:10:42', '2023-06-25 01:10:42'),
(5, 'Em avaliação', 'Curso de Desenvolvimento Web', 'Aprenda a criar websites dinâmicos e interativos utilizando as últimas tecnologias web.', 'Híbrido', 'Curso', 'Quartas e Sextas, das 18h30 às 20h30', 0, 1, NULL, '2023-06-25 01:11:39', '2023-06-25 01:11:39'),
(6, 'Aceita', 'Curso de Inglês Avançado', 'Aperfeiçoe suas habilidades de conversação, escrita e compreensão oral no idioma inglês.', 'Remoto', 'Curso', 'Segundas e Quartas, das 19h às 21h', 0, 10, NULL, '2023-06-25 01:12:04', '2023-06-25 01:12:04'),
(7, 'A reformular', 'Curso de Gastronomia Molecular', 'Explore a ciência por trás da culinária e crie pratos surpreendentes com técnicas moleculares.', 'Presencial', 'Curso', 'Sábados e Domingos, das 10h às 14h', 0, 11, NULL, '2023-06-25 01:12:42', '2023-06-25 01:12:42'),
(8, 'Em avaliação', 'Curso de Dança de Salão', 'Aprenda a dançar diversos estilos de dança de salão, como salsa, tango, samba, entre outros.', 'Presencial', 'Curso', 'Segundas e Quartas, das 20h às 22h', 0, 13, NULL, '2023-06-25 01:13:28', '2023-06-25 01:13:28'),
(9, 'Aceita', 'Curso de Maquiagem Profissional', 'Aprenda técnicas de maquiagem para diferentes ocasiões e transforme-se em uma maquiadora profissional.', 'Presencial', 'Curso', 'Terças e Quintas, das 14h às 16h', 0, 6, NULL, '2023-06-25 01:14:08', '2023-06-25 01:14:08'),
(10, 'A reformular', 'Curso de Yoga e Meditação', 'Aprenda práticas de yoga e meditação para alcançar equilíbrio e bem-estar físico e mental.', 'Remoto', 'Curso', 'Terças e Quintas, das 19h às 20h30', 0, 15, NULL, '2023-06-25 01:16:36', '2023-06-25 01:16:36'),
(11, 'Aceita', 'Palestra sobre Empreendedorismo', 'Conheça histórias inspiradoras de empreendedores de sucesso e aprenda valiosas lições de negócios.', 'Remoto', 'Palestra', 'Data e horário a serem confirmados', 0, 4, NULL, '2023-06-25 01:17:03', '2023-06-25 01:17:03'),
(12, 'Em avaliação', 'Palestra sobre Saúde Mental', 'Entenda a importância da saúde mental e aprenda estratégias para cuidar do seu bem-estar emocional.', 'Presencial', 'Palestra', 'Data e horário a serem confirmados', 0, 15, NULL, '2023-06-25 01:17:34', '2023-06-25 01:17:34'),
(13, 'A reformular', 'Palestra sobre Inovação Tecnológica', 'Descubra as tendências e novidades no mundo da tecnologia e como elas podem impactar os negócios.', 'Presencial', 'Palestra', 'Data e horário a serem confirmados', 0, 1, NULL, '2023-06-25 01:18:15', '2023-06-25 01:18:15'),
(14, 'Aceita', 'Palestra sobre Sustentabilidade Ambiental', 'Entenda a importância da sustentabilidade ambiental e descubra como contribuir para um futuro mais verde.', 'Remoto', 'Palestra', 'Data e horário a serem confirmados', 0, 11, NULL, '2023-06-25 01:18:36', '2023-06-25 01:18:36'),
(15, 'Em avaliação', 'Palestra sobre Liderança e Motivação', 'Aprenda técnicas de liderança e motivação para alcançar o sucesso pessoal e profissional.', 'Presencial', 'Palestra', 'Data e horário a serem confirmados', 0, 4, NULL, '2023-06-25 01:20:38', '2023-06-25 01:20:38'),
(16, 'Aceita', 'Palestra sobre Marketing Digital', 'Conheça as estratégias e ferramentas do marketing digital para alavancar o seu negócio online.', 'Presencial', 'Palestra', 'Data e horário a serem confirmados', 0, 6, NULL, '2023-06-25 01:21:06', '2023-06-25 01:21:06'),
(17, 'A reformular', 'Palestra sobre Inteligência Artificial', 'Entenda os conceitos básicos e aplicações da inteligência artificial na atualidade.', 'Remoto', 'Palestra', 'Data e horário a serem confirmados', 0, 8, NULL, '2023-06-25 01:21:32', '2023-06-25 01:21:32'),
(18, 'Em avaliação', 'Palestra sobre Mindfulness', 'Aprenda a praticar mindfulness e descubra como reduzir o estresse e aumentar a atenção plena.', 'Presencial', 'Palestra', 'Data e horário a serem confirmados', 0, 15, NULL, '2023-06-25 01:22:06', '2023-06-25 01:22:06'),
(19, 'Aceita', 'Palestra sobre Empoderamento Feminino', 'Conheça histórias inspiradoras de mulheres empoderadas e discuta questões de gênero e igualdade.', 'Presencial', 'Palestra', 'Data e horário a serem confirmados', 0, 5, NULL, '2023-06-25 01:23:11', '2023-06-25 01:23:11'),
(20, 'A reformular', 'Palestra sobre Finanças Pessoais', 'Aprenda a organizar suas finanças e planejar seu futuro financeiro de forma inteligente.', 'Remoto', 'Palestra', 'Data e horário a serem confirmados', 0, 1, NULL, '2023-06-25 01:23:27', '2023-06-25 01:23:27'),
(21, 'Aceita', 'Serviço de Consultoria Empresarial', 'Obtenha orientação especializada para impulsionar o crescimento e o sucesso do seu negócio.', 'Presencial', 'Serviço', 'A combinar', 0, 8, NULL, '2023-06-25 01:25:01', '2023-06-25 01:25:01'),
(22, 'Em avaliação', 'Serviço de Personal Trainer', 'Tenha um treinador pessoal para desenvolver um programa de exercícios personalizado de acordo com seus objetivos.', 'Presencial', 'Serviço', 'A combinar', 0, 15, NULL, '2023-06-25 01:25:39', '2023-06-25 01:25:39'),
(23, 'A reformular', 'Serviço de Design de Interiores', 'Transforme seus espaços com um projeto de design de interiores personalizado e funcional.', 'Presencial', 'Serviço', 'A combinar', 0, 11, NULL, '2023-06-25 01:26:09', '2023-06-25 01:26:09'),
(24, 'Aceita', 'Serviço de Fotografia Profissional', 'Capture momentos especiais com um serviço de fotografia profissional para eventos, ensaios e muito mais.', 'Presencial', 'Serviço', 'A combinar', 0, 4, NULL, '2023-06-25 01:27:07', '2023-06-25 01:27:07'),
(25, 'Em avaliação', 'Serviço de Manutenção Residencial', 'Conte com profissionais qualificados para realizar reparos e manutenção em sua casa ou apartamento.', 'Presencial', 'Serviço', 'A combinar', 0, 13, NULL, '2023-06-25 01:27:47', '2023-06-25 01:27:47'),
(26, 'Aceita', 'Serviço de Corte e Costura', 'Tenha peças de roupas personalizadas e ajustes em suas peças favoritas com um serviço de corte e costura especializado.', 'Presencial', 'Serviço', 'A combinar', 0, 6, NULL, '2023-06-25 01:28:19', '2023-06-25 01:28:19'),
(27, 'A reformular', 'Serviço de Marketing Digital', 'Alavanque sua presença online e impulsione seus negócios com um serviço especializado em marketing digital.', 'Remoto', 'Serviço', 'A combinar', 0, 6, NULL, '2023-06-25 01:28:41', '2023-06-25 01:28:41'),
(28, 'Em avaliação', 'Serviço de Tradução', 'Garanta traduções precisas e de alta qualidade com um serviço profissional de tradução em diversos idiomas.', 'Remoto', 'Serviço', 'A combinar', 0, 8, NULL, '2023-06-25 01:29:03', '2023-06-25 01:29:03'),
(29, 'Aceita', 'Serviço de Web Design', 'Desenvolva um website moderno e responsivo com um serviço profissional de web design.', 'Remoto', 'Serviço', 'A combinar', 0, 1, NULL, '2023-06-25 01:29:38', '2023-06-25 01:29:38'),
(30, 'A reformular', 'Serviço de Coaching de Carreira', 'Receba orientação e suporte para alavancar sua carreira e alcançar seus objetivos profissionais.', 'Remoto', 'Serviço', 'A combinar', 0, 15, NULL, '2023-06-25 01:29:51', '2023-06-25 01:29:51');

-- --------------------------------------------------------

--
-- Table structure for table `atividadecidade`
--

CREATE TABLE `atividadecidade` (
  `id` int(11) NOT NULL,
  `atividadeId` int(11) NOT NULL,
  `cidadeId` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `atividadecidade`
--

INSERT INTO `atividadecidade` (`id`, `atividadeId`, `cidadeId`, `createdAt`, `updatedAt`) VALUES
(1, 1, 2, '2023-06-25 01:04:29', '2023-06-25 01:04:29'),
(2, 1, 4, '2023-06-25 01:04:29', '2023-06-25 01:04:29'),
(3, 1, 6, '2023-06-25 01:04:29', '2023-06-25 01:04:29'),
(4, 4, 1, '2023-06-25 01:10:42', '2023-06-25 01:10:42'),
(5, 4, 2, '2023-06-25 01:10:42', '2023-06-25 01:10:42'),
(6, 4, 3, '2023-06-25 01:10:42', '2023-06-25 01:10:42'),
(7, 4, 4, '2023-06-25 01:10:42', '2023-06-25 01:10:42'),
(8, 4, 5, '2023-06-25 01:10:42', '2023-06-25 01:10:42'),
(9, 5, 1, '2023-06-25 01:11:39', '2023-06-25 01:11:39'),
(10, 5, 2, '2023-06-25 01:11:39', '2023-06-25 01:11:39'),
(11, 5, 3, '2023-06-25 01:11:39', '2023-06-25 01:11:39'),
(12, 7, 8, '2023-06-25 01:12:42', '2023-06-25 01:12:42'),
(13, 7, 9, '2023-06-25 01:12:42', '2023-06-25 01:12:42'),
(14, 7, 7, '2023-06-25 01:12:42', '2023-06-25 01:12:42'),
(15, 7, 6, '2023-06-25 01:12:42', '2023-06-25 01:12:42'),
(16, 8, 1, '2023-06-25 01:13:28', '2023-06-25 01:13:28'),
(17, 8, 2, '2023-06-25 01:13:28', '2023-06-25 01:13:28'),
(18, 8, 3, '2023-06-25 01:13:28', '2023-06-25 01:13:28'),
(19, 8, 4, '2023-06-25 01:13:28', '2023-06-25 01:13:28'),
(20, 8, 5, '2023-06-25 01:13:28', '2023-06-25 01:13:28'),
(21, 8, 6, '2023-06-25 01:13:28', '2023-06-25 01:13:28'),
(22, 8, 7, '2023-06-25 01:13:28', '2023-06-25 01:13:28'),
(23, 8, 8, '2023-06-25 01:13:28', '2023-06-25 01:13:28'),
(24, 8, 9, '2023-06-25 01:13:28', '2023-06-25 01:13:28'),
(25, 9, 7, '2023-06-25 01:14:08', '2023-06-25 01:14:08'),
(26, 12, 1, '2023-06-25 01:17:34', '2023-06-25 01:17:34'),
(27, 13, 2, '2023-06-25 01:18:15', '2023-06-25 01:18:15'),
(28, 15, 6, '2023-06-25 01:20:38', '2023-06-25 01:20:38'),
(29, 16, 2, '2023-06-25 01:21:06', '2023-06-25 01:21:06'),
(30, 18, 3, '2023-06-25 01:22:06', '2023-06-25 01:22:06'),
(31, 18, 4, '2023-06-25 01:22:06', '2023-06-25 01:22:06'),
(32, 18, 5, '2023-06-25 01:22:06', '2023-06-25 01:22:06'),
(33, 19, 3, '2023-06-25 01:23:11', '2023-06-25 01:23:11'),
(34, 19, 4, '2023-06-25 01:23:11', '2023-06-25 01:23:11'),
(35, 19, 8, '2023-06-25 01:23:11', '2023-06-25 01:23:11'),
(36, 19, 6, '2023-06-25 01:23:11', '2023-06-25 01:23:11'),
(37, 21, 1, '2023-06-25 01:25:01', '2023-06-25 01:25:01'),
(38, 21, 3, '2023-06-25 01:25:01', '2023-06-25 01:25:01'),
(39, 21, 5, '2023-06-25 01:25:01', '2023-06-25 01:25:01'),
(40, 21, 7, '2023-06-25 01:25:01', '2023-06-25 01:25:01'),
(41, 21, 9, '2023-06-25 01:25:01', '2023-06-25 01:25:01'),
(42, 22, 1, '2023-06-25 01:25:39', '2023-06-25 01:25:39'),
(43, 22, 2, '2023-06-25 01:25:39', '2023-06-25 01:25:39'),
(44, 22, 3, '2023-06-25 01:25:39', '2023-06-25 01:25:39'),
(45, 23, 1, '2023-06-25 01:26:09', '2023-06-25 01:26:09'),
(46, 23, 6, '2023-06-25 01:26:09', '2023-06-25 01:26:09'),
(47, 23, 7, '2023-06-25 01:26:09', '2023-06-25 01:26:09'),
(48, 24, 1, '2023-06-25 01:27:07', '2023-06-25 01:27:07'),
(49, 24, 3, '2023-06-25 01:27:07', '2023-06-25 01:27:07'),
(50, 24, 4, '2023-06-25 01:27:07', '2023-06-25 01:27:07'),
(51, 24, 5, '2023-06-25 01:27:07', '2023-06-25 01:27:07'),
(52, 25, 1, '2023-06-25 01:27:47', '2023-06-25 01:27:47'),
(53, 25, 2, '2023-06-25 01:27:47', '2023-06-25 01:27:47'),
(54, 25, 3, '2023-06-25 01:27:47', '2023-06-25 01:27:47'),
(55, 25, 4, '2023-06-25 01:27:47', '2023-06-25 01:27:47'),
(56, 25, 5, '2023-06-25 01:27:47', '2023-06-25 01:27:47'),
(57, 25, 6, '2023-06-25 01:27:47', '2023-06-25 01:27:47'),
(58, 26, 6, '2023-06-25 01:28:19', '2023-06-25 01:28:19'),
(59, 26, 7, '2023-06-25 01:28:19', '2023-06-25 01:28:19'),
(60, 26, 8, '2023-06-25 01:28:19', '2023-06-25 01:28:19'),
(61, 26, 9, '2023-06-25 01:28:19', '2023-06-25 01:28:19');

-- --------------------------------------------------------

--
-- Table structure for table `cidade`
--

CREATE TABLE `cidade` (
  `id` int(11) NOT NULL,
  `nome` varchar(255) NOT NULL,
  `estado` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cidade`
--

INSERT INTO `cidade` (`id`, `nome`, `estado`, `createdAt`, `updatedAt`) VALUES
(1, 'Bom princípio', 'RS', '2023-06-14 10:00:00', '2023-06-14 10:00:00'),
(2, 'Feliz', 'RS', '2023-06-14 10:00:00', '2023-06-14 10:00:00'),
(3, 'São Vendelino', 'RS', '2023-06-14 10:00:00', '2023-06-14 10:00:00'),
(4, 'São Sebastião do Caí', 'RS', '2023-06-14 10:00:00', '2023-06-14 10:00:00'),
(5, 'Alto Feliz', 'RS', '2023-06-14 10:00:00', '2023-06-14 10:00:00'),
(6, 'Vale Real', 'RS', '2023-06-14 10:00:00', '2023-06-14 10:00:00'),
(7, 'Tupandi', 'RS', '2023-06-14 10:00:00', '2023-06-14 10:00:00'),
(8, 'Harmonia', 'RS', '2023-06-14 10:00:00', '2023-06-14 10:00:00'),
(9, 'Linha Nova', 'RS', '2023-06-14 10:00:00', '2023-06-14 10:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `sequelizemeta`
--

CREATE TABLE `sequelizemeta` (
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `sequelizemeta`
--

INSERT INTO `sequelizemeta` (`name`) VALUES
('20230608190107-create-table-cidade.cjs'),
('20230608195949-create-table-user.cjs'),
('20230608200038-create-table-atividade.cjs'),
('20230614182719-create-table-solicitada.cjs'),
('20230614182736-create-table-sugerida.cjs'),
('20230614182813-create-table-solicitadacidade.cjs'),
('20230614184954-create-table-sugeridacidade.cjs'),
('20230615031706-create-table-atividadecidade.cjs');

-- --------------------------------------------------------

--
-- Table structure for table `solicitada`
--

CREATE TABLE `solicitada` (
  `id` int(11) NOT NULL,
  `status` enum('Aceita','Em avaliação','A reformular','Cancelada') NOT NULL,
  `titulo` varchar(255) NOT NULL,
  `observacao` varchar(255) NOT NULL,
  `quantidadeInteressados` int(11) NOT NULL,
  `comentario` varchar(255) DEFAULT NULL,
  `userId` int(11) NOT NULL,
  `cidadeId` int(11) DEFAULT NULL,
  `atividadeId` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `solicitada`
--

INSERT INTO `solicitada` (`id`, `status`, `titulo`, `observacao`, `quantidadeInteressados`, `comentario`, `userId`, `cidadeId`, `atividadeId`, `createdAt`, `updatedAt`) VALUES
(1, 'Aceita', 'Curso de Programação Web', 'Estou interessado em participar de um curso de programação web para aprimorar minhas habilidades em HTML, CSS e JavaScript. Gostaria que o curso fosse presencial e com duração de 3 meses. Aguardo mais informações sobre datas e horários disponíveis.', 1, NULL, 2, NULL, 1, '2023-06-25 01:50:24', '2023-06-25 01:50:24'),
(2, 'Aceita', 'Palestra sobre Empreendedorismo', 'Tenho interesse em participar de uma palestra sobre Empreendedorismo. Gostaria que a palestra fosse remota, com possibilidade de interação através de chat. Aguardo informações sobre a data e horário da palestra.', 2, NULL, 7, NULL, 11, '2023-06-25 02:02:40', '2023-06-25 02:02:40'),
(3, 'Aceita', 'Palestra de Consultoria Financeira', 'Estou em busca de um serviço de consultoria financeira para auxiliar na organização das minhas finanças pessoais. Aguardo informações sobre disponibilidade.', 1, NULL, 12, NULL, 20, '2023-06-25 02:04:40', '2023-06-25 02:04:40'),
(4, 'Aceita', 'Curso de Marketing Digital', 'Tenho interesse em participar de um curso de Marketing Digital para aprimorar minhas habilidades em estratégias de marketing online. Gostaria que o curso fosse presencial e com carga horária de 40 horas. Aguardo informações sobre datas e horários disponív', 3, NULL, 16, NULL, 3, '2023-06-25 02:06:21', '2023-06-25 02:06:21'),
(5, 'Aceita', 'Serviço de Design de Interiores', 'Estou em busca de um serviço de design de interiores para a criação de um ambiente  para minha empresa. Aguardo informações sobre disponibilidade e prazos.', 1, NULL, 17, NULL, 23, '2023-06-25 02:09:10', '2023-06-25 02:09:10'),
(6, '', 'Palestra sobre Inovação Tecnológica', 'Estou interessado em uma palestra sobre Inovação Tecnológica, abordando temas como inteligência artificial e blockchain. Aguardo a análise da demanda e informações sobre a disponibilidade do palestrante.', 15, NULL, 18, NULL, 13, '2023-06-25 02:11:09', '2023-06-25 02:11:09'),
(7, '', 'Curso de Fotografia Profissional', 'Tenho interesse em participar de um curso de Fotografia, aprendendo técnicas de composição, iluminação e edição de imagens. Gostaria que o curso fosse presencial, com aulas práticas e teóricas. Aguardo a análise da demanda e informações sobre a disponibil', 1, NULL, 7, NULL, 4, '2023-06-25 02:14:22', '2023-06-25 02:14:22'),
(8, '', 'Serviço de Manutenção Residencial', 'Preciso de um serviço de manutenção residencial para realizar reparos em minha empresa, incluindo pintura, troca de lâmpadas e conserto de encanamento. Gostaria que o serviço fosse com profissionais qualificados e disponibilidade para atender em horários ', 1, NULL, 12, NULL, 25, '2023-06-25 02:16:12', '2023-06-25 02:16:12'),
(9, '', 'Curso de Marketing Digital', 'Tenho interesse em participar de um curso de Marketing Digital, abordando estratégias de mídias sociais, SEO e criação de conteúdo. Gostaria que o curso tivesse material de apoio e exercícios práticos. Aguardo a análise da demanda e informações sobre a di', 1, NULL, 17, NULL, 3, '2023-06-25 02:25:59', '2023-06-25 02:25:59'),
(10, 'Aceita', 'Serviço de Design de Interiores', 'Estou em busca de um serviço de design de interiores. Aguardo informações sobre prazos e disponibilidade.', 1, NULL, 18, NULL, 23, '2023-06-25 02:28:45', '2023-06-25 02:28:45'),
(11, '', 'Palestra sobre Liderança e Motivação', 'Estou interessado em uma palestra sobre Liderança e Motivação, abordando técnicas para gerir equipes e manter o engajamento dos colaboradores. Gostaria que a palestra fosse híbrida, com a opção de participar presencialmente ou remotamente. Aguardo a análi', 1, NULL, 16, NULL, 15, '2023-06-25 02:30:12', '2023-06-25 02:30:12');

-- --------------------------------------------------------

--
-- Table structure for table `solicitadacidade`
--

CREATE TABLE `solicitadacidade` (
  `id` int(11) NOT NULL,
  `solicitadaId` int(11) DEFAULT NULL,
  `cidadeId` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `solicitadacidade`
--

INSERT INTO `solicitadacidade` (`id`, `solicitadaId`, `cidadeId`, `createdAt`, `updatedAt`) VALUES
(1, 1, 2, '2023-06-25 01:50:24', '2023-06-25 01:50:24'),
(2, 4, 1, '2023-06-25 02:06:21', '2023-06-25 02:06:21'),
(3, 5, 6, '2023-06-25 02:09:10', '2023-06-25 02:09:10'),
(4, 7, 1, '2023-06-25 02:14:22', '2023-06-25 02:14:22'),
(5, 11, 4, '2023-06-25 02:30:12', '2023-06-25 02:30:12');

-- --------------------------------------------------------

--
-- Table structure for table `sugerida`
--

CREATE TABLE `sugerida` (
  `id` int(11) NOT NULL,
  `status` enum('Aceita','Em avaliação','A reformular','Cancelada') NOT NULL,
  `titulo` varchar(255) NOT NULL,
  `descricao` varchar(255) NOT NULL,
  `quantidadeInteressados` int(11) NOT NULL,
  `modalidade` varchar(255) NOT NULL,
  `categoria` varchar(255) NOT NULL,
  `comentario` varchar(255) DEFAULT NULL,
  `diasEturnos` varchar(255) NOT NULL,
  `userId` int(11) NOT NULL,
  `atividadeId` int(11) DEFAULT NULL,
  `cidadeId` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sugerida`
--

INSERT INTO `sugerida` (`id`, `status`, `titulo`, `descricao`, `quantidadeInteressados`, `modalidade`, `categoria`, `comentario`, `diasEturnos`, `userId`, `atividadeId`, `cidadeId`, `createdAt`, `updatedAt`) VALUES
(1, 'Aceita', 'Inteligência Artificial e o Futuro', 'Tenho interesse em entender como a inteligência artificial está impactando diferentes setores e como isso pode afetar meu trabalho no futuro. Gostaria de participar de uma palestra que explore esse tema.', 5, 'Remoto', 'Palestra', NULL, 'Flexível', 2, 17, NULL, '2023-06-25 02:34:15', '2023-06-25 02:34:15'),
(2, 'Cancelada', 'Consultoria Financeira Personalizada', 'Estou passando por problemas financeiros e não consigo me organizar e pagar minhas contas. Gostaria de uma consultoria financeira personalizada que me ajudasse a criar um plano de ação para sair dessa situação e alcançar estabilidade financeira.', 1, 'Híbrido', 'Serviço', 'Não possuimos nenhum aluno com qualificações necessárias para esta demanda', 'Segundas a tarde', 18, NULL, NULL, '2023-06-25 02:37:05', '2023-06-25 02:37:05'),
(3, '', 'Marketing Digital para Iniciantes', 'Tenho um pequeno negócio e gostaria de aprender estratégias de marketing digital para promovê-lo de forma mais eficaz. Procuro um curso que cubra desde os conceitos básicos até as táticas avançadas de marketing digital.', 1, 'Presencial', 'Curso', NULL, 'Segundas a tarde', 2, 3, NULL, '2023-06-25 02:38:51', '2023-06-25 02:38:51'),
(4, 'A reformular', 'O Poder da Comunicação Efetiva', 'Sou estudante universitário e estou buscando desenvolver minhas habilidades de comunicação para me tornar um comunicador mais eficaz. Gostaria de uma palestra que aborde técnicas e estratégias para aprimorar minha comunicação verbal e escrita.', 1, 'Remoto', 'Palestra', 'Não há disponibilidades para segundas a tarde, no entanto, nas sextas pela manhã haveria a possibilidade.', 'Segundas a tarde', 15, NULL, NULL, '2023-06-25 02:44:05', '2023-06-25 02:44:05'),
(5, '', 'Desenvolvimento Web Avançado', 'Trabalho como desenvolvedor web e estou buscando aprimorar minhas habilidades em tecnologias web avançadas. Gostaria de um curso que aborde tópicos como frameworks, APIs e práticas recomendadas para desenvolvimento web avançado.', 1, 'Híbrido', 'Curso', NULL, 'Flexível', 1, NULL, NULL, '2023-06-25 02:45:06', '2023-06-25 02:45:06'),
(6, 'Cancelada', 'Consultoria em processos gerenciais', 'Estou passando por problemas financeiros e não consigo me organizar e pagar minhas contas. Vi que no instituto é ofertado o curso de Processos gerenciais e gostaria de uma consultoria para minha empresa.', 1, 'Presencial', 'Serviço', 'Não trabalhamos com este tipo de serviço.', 'Segundas a Sextas em horário comercial', 16, NULL, NULL, '2023-06-25 02:48:21', '2023-06-25 02:48:21'),
(7, '', 'Consultoria em Recursos Humanos', 'Sou gerente de uma pequena empresa e estou enfrentando desafios relacionados à gestão de recursos humanos, como contratação, treinamento e desenvolvimento de funcionários. Gostaria de uma consultoria em recursos humanos que possa me fornecer orientações e', 1, 'Remoto', 'Serviço', NULL, 'Segundas a Sextas em horário comercial', 12, NULL, NULL, '2023-06-25 02:50:19', '2023-06-25 02:50:19'),
(8, 'Aceita', 'Fotografia de Paisagens Naturais', 'Sou um entusiasta da fotografia de paisagens naturais e gostaria de aprimorar minhas habilidades nessa área. Procuro um curso que me ensine técnicas específicas para capturar a beleza das paisagens naturais e aprimorar minhas habilidades de composição fot', 1, 'Presencial', 'Curso', NULL, 'Quintas pela manhã', 7, 4, NULL, '2023-06-25 02:53:02', '2023-06-25 02:53:02'),
(9, 'Aceita', 'Empreendedorismo Digital', 'Sou um empreendedor iniciante e estou interessado em aprender mais sobre empreendedorismo digital. Gostaria de uma palestra que cubra tópicos como criação de negócios online, marketing digital e estratégias de crescimento.', 1, 'Remoto', 'Palestra', NULL, 'Quarta-feira das 19h às 21h', 7, 11, NULL, '2023-06-25 02:55:32', '2023-06-25 02:55:32');

-- --------------------------------------------------------

--
-- Table structure for table `sugeridacidade`
--

CREATE TABLE `sugeridacidade` (
  `id` int(11) NOT NULL,
  `sugeridaId` int(11) NOT NULL,
  `cidadeId` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sugeridacidade`
--

INSERT INTO `sugeridacidade` (`id`, `sugeridaId`, `cidadeId`, `createdAt`, `updatedAt`) VALUES
(1, 2, 4, '2023-06-25 02:37:05', '2023-06-25 02:37:05'),
(2, 2, 5, '2023-06-25 02:37:05', '2023-06-25 02:37:05'),
(3, 2, 6, '2023-06-25 02:37:05', '2023-06-25 02:37:05'),
(4, 3, 7, '2023-06-25 02:38:51', '2023-06-25 02:38:51'),
(5, 3, 8, '2023-06-25 02:38:51', '2023-06-25 02:38:51'),
(6, 5, 1, '2023-06-25 02:45:06', '2023-06-25 02:45:06'),
(7, 5, 9, '2023-06-25 02:45:06', '2023-06-25 02:45:06'),
(8, 6, 4, '2023-06-25 02:48:21', '2023-06-25 02:48:21'),
(9, 8, 1, '2023-06-25 02:53:02', '2023-06-25 02:53:02'),
(10, 8, 2, '2023-06-25 02:53:02', '2023-06-25 02:53:02'),
(11, 8, 3, '2023-06-25 02:53:02', '2023-06-25 02:53:02'),
(12, 8, 4, '2023-06-25 02:53:02', '2023-06-25 02:53:02'),
(13, 8, 5, '2023-06-25 02:53:02', '2023-06-25 02:53:02');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `nome` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `status` enum('ativo','inativo') DEFAULT NULL,
  `tipoUsuario` varchar(255) DEFAULT NULL,
  `cidadeId` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `nome`, `email`, `password_hash`, `status`, `tipoUsuario`, `cidadeId`, `createdAt`, `updatedAt`) VALUES
(1, 'Mary', 'mary@gmail.com', '$2a$08$fvMCGCs9qZqalq4m7CBcJe1hsuAOOucFEdg4YXtCY3VbTYwfK21Om', 'inativo', 'Aluno', 1, '2023-06-25 00:55:33', '2023-06-25 00:55:33'),
(2, 'João', 'joao@gmail.com', '$2a$08$lbZqg17G63vVyblAX.9wNeQfMTxWUzfxVQJrmfw/3HUMLYDiASdqS', 'inativo', 'Comunidade Externa', 1, '2023-06-25 00:55:46', '2023-06-25 00:55:46'),
(3, 'Claudio', 'claudio@gmail.com', '$2a$08$tv5NhoIaA2bwg7VhddewdOgI6uLjzIbSDUvvxnvSeor1mDgejC3dC', 'inativo', 'Servidor', 1, '2023-06-25 00:55:57', '2023-06-25 00:55:57'),
(4, 'João Silva', 'joaosilva@gmail.com', '$2a$08$stNgqlzhpxIW06wuHRwtueVU/PI14uGXoA8pNjO.yl1zDMZVmPUI2', 'inativo', 'Aluno', 1, '2023-06-25 00:56:46', '2023-06-25 00:56:46'),
(5, 'Maria Santos', 'maria@gmail.com', '$2a$08$J2J975tc3g78Vbak8qmYmeHMokQjoo6r9kwxrXA68iFJp4z.bnn2y', 'inativo', 'Servidor', 3, '2023-06-25 00:57:03', '2023-06-25 00:57:03'),
(6, 'Pedro Oliveira', 'pedro@gmail.com', '$2a$08$p1sLLmcsjcDdTY7lCqAQOekpMeBi3avyunR.DJDw20vCD7umdkLnO', 'inativo', 'Aluno', 6, '2023-06-25 00:57:25', '2023-06-25 00:57:25'),
(7, 'Ana Souza', 'ana@gmail.com', '$2a$08$tS/73Rh3f4fpXCHJYccaAeSujF3xUxC2oKmUybypTWyMU3oDxN4m6', 'inativo', 'Comunidade Externa', 4, '2023-06-25 00:57:50', '2023-06-25 00:57:50'),
(8, 'Lucas Santos', 'lucas@gmail.com', '$2a$08$0bDajGCEbLZx.pXknHhygeXZgcVw.6/uf/fnxQiZIFZAYtzqzvcfi', 'inativo', 'Aluno', 5, '2023-06-25 00:58:08', '2023-06-25 00:58:08'),
(9, 'Carla Mendes', 'carla@gmail.com', '$2a$08$n9OqVFYo62qL1KfN0VavyeQr9HBtTU6yijkDpj5mE0LLZjhp3eyB6', 'inativo', 'Servidor', 6, '2023-06-25 00:58:23', '2023-06-25 00:58:23'),
(10, 'Gustavo Ferreira', 'gustavo@gmail.com', '$2a$08$m2uTAY7iAbQNlZ.ZMjxZxe1JZ4M0TP6sSP0HuJ23ROuqTzt6nm5aC', 'inativo', 'Aluno', 7, '2023-06-25 00:58:45', '2023-06-25 00:58:45'),
(11, 'Sara Oliveira', 'sara@gmail.com', '$2a$08$Jw2wa/46HRvXywuOHd1SuuVQ7x5JG1SHCZ0yAsDdlqOJi0opUcFSa', 'inativo', 'Aluno', 8, '2023-06-25 00:59:01', '2023-06-25 00:59:01'),
(12, 'Ricardo Almeida', 'ricardo@gmail.com', '$2a$08$heLZLfpSQ1oliSpsIf0dKuZ6Cx/r6knDqpA8VomCVHVpB54YA0dVO', 'inativo', 'Comunidade Externa', 9, '2023-06-25 00:59:24', '2023-06-25 00:59:24'),
(13, 'Mariana Lima', 'mariana@gmail.com', '$2a$08$nkJzaZx7V.QobIDPvVTexuL8f0D8XWSKnpJbbgBbc/ZDtDWxNClzG', 'inativo', 'Aluno', 1, '2023-06-25 00:59:46', '2023-06-25 00:59:46'),
(14, 'André Costa', 'andre@gmail.com', '$2a$08$tduyujzsB1ZDTrVh7AgnYOUdlq1GPwGB5mobQGQDBIgRC1GaVWgve', 'inativo', 'Servidor', 3, '2023-06-25 01:00:11', '2023-06-25 01:00:11'),
(15, 'Camila Santos', 'camila@gmail.com', '$2a$08$RMMbXNPDoywTekQyPtBg8OMnmAEhYC9GcH7ufmPCpXPniSq4kklDu', 'inativo', 'Aluno', 2, '2023-06-25 01:00:29', '2023-06-25 01:00:29'),
(16, 'Rafaela Oliveira', 'rafaela@gmail.com', '$2a$08$qsId01iui7flM8NMEf2TvOxWVh/DH4WA1Fsda1XL6U2VLCumgRgyq', 'inativo', 'Comunidade Externa', 4, '2023-06-25 01:00:48', '2023-06-25 01:00:48'),
(17, 'Fernando Silva', 'fernando@gmail.com', '$2a$08$GaAYZXs5wCCIGZKHypDux.t0baqGxEKxnW6VvwEKP/rOTRbT91ria', 'inativo', 'Comunidade Externa', 5, '2023-06-25 01:01:31', '2023-06-25 01:01:31'),
(18, 'Juliana Santos', 'juliana@gmail.com', '$2a$08$Dgt8abG3T38.0Rsgvai0F.glBqLPYqK7IfVCHzzMDrjfJJHoUe1U.', 'inativo', 'Comunidade Externa', 6, '2023-06-25 01:02:00', '2023-06-25 01:02:00');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `atividade`
--
ALTER TABLE `atividade`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`),
  ADD KEY `cidadeId` (`cidadeId`);

--
-- Indexes for table `atividadecidade`
--
ALTER TABLE `atividadecidade`
  ADD PRIMARY KEY (`id`),
  ADD KEY `atividadeId` (`atividadeId`),
  ADD KEY `cidadeId` (`cidadeId`);

--
-- Indexes for table `cidade`
--
ALTER TABLE `cidade`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sequelizemeta`
--
ALTER TABLE `sequelizemeta`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `solicitada`
--
ALTER TABLE `solicitada`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`),
  ADD KEY `cidadeId` (`cidadeId`),
  ADD KEY `atividadeId` (`atividadeId`);

--
-- Indexes for table `solicitadacidade`
--
ALTER TABLE `solicitadacidade`
  ADD PRIMARY KEY (`id`),
  ADD KEY `solicitadaId` (`solicitadaId`),
  ADD KEY `cidadeId` (`cidadeId`);

--
-- Indexes for table `sugerida`
--
ALTER TABLE `sugerida`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`),
  ADD KEY `atividadeId` (`atividadeId`),
  ADD KEY `cidadeId` (`cidadeId`);

--
-- Indexes for table `sugeridacidade`
--
ALTER TABLE `sugeridacidade`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sugeridaId` (`sugeridaId`),
  ADD KEY `cidadeId` (`cidadeId`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `cidadeId` (`cidadeId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `atividade`
--
ALTER TABLE `atividade`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `atividadecidade`
--
ALTER TABLE `atividadecidade`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=62;

--
-- AUTO_INCREMENT for table `cidade`
--
ALTER TABLE `cidade`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `solicitada`
--
ALTER TABLE `solicitada`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `solicitadacidade`
--
ALTER TABLE `solicitadacidade`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `sugerida`
--
ALTER TABLE `sugerida`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `sugeridacidade`
--
ALTER TABLE `sugeridacidade`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `atividade`
--
ALTER TABLE `atividade`
  ADD CONSTRAINT `atividade_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `atividade_ibfk_2` FOREIGN KEY (`cidadeId`) REFERENCES `cidade` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `atividadecidade`
--
ALTER TABLE `atividadecidade`
  ADD CONSTRAINT `atividadecidade_ibfk_1` FOREIGN KEY (`atividadeId`) REFERENCES `atividade` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `atividadecidade_ibfk_2` FOREIGN KEY (`cidadeId`) REFERENCES `cidade` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `solicitada`
--
ALTER TABLE `solicitada`
  ADD CONSTRAINT `solicitada_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `solicitada_ibfk_2` FOREIGN KEY (`cidadeId`) REFERENCES `cidade` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `solicitada_ibfk_3` FOREIGN KEY (`atividadeId`) REFERENCES `atividade` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `solicitadacidade`
--
ALTER TABLE `solicitadacidade`
  ADD CONSTRAINT `solicitadacidade_ibfk_1` FOREIGN KEY (`solicitadaId`) REFERENCES `solicitada` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `solicitadacidade_ibfk_2` FOREIGN KEY (`cidadeId`) REFERENCES `cidade` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `sugerida`
--
ALTER TABLE `sugerida`
  ADD CONSTRAINT `sugerida_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `sugerida_ibfk_2` FOREIGN KEY (`atividadeId`) REFERENCES `atividade` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `sugerida_ibfk_3` FOREIGN KEY (`cidadeId`) REFERENCES `cidade` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `sugeridacidade`
--
ALTER TABLE `sugeridacidade`
  ADD CONSTRAINT `sugeridacidade_ibfk_1` FOREIGN KEY (`sugeridaId`) REFERENCES `sugerida` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `sugeridacidade_ibfk_2` FOREIGN KEY (`cidadeId`) REFERENCES `cidade` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `user_ibfk_1` FOREIGN KEY (`cidadeId`) REFERENCES `cidade` (`id`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
