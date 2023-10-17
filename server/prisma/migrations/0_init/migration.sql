-- CreateTable
CREATE TABLE `admins` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `adminName` VARCHAR(255) NULL,
    `password` VARCHAR(255) NULL,
    `avatarUrl` TEXT NULL,
    `createdAt` DATETIME(0) NOT NULL,
    `updatedAt` DATETIME(0) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `appointments` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `date` VARCHAR(255) NULL,
    `status` ENUM('pending', 'accepted', 'rejected') NULL DEFAULT 'pending',
    `disease` VARCHAR(255) NULL,
    `isFinished` BOOLEAN NULL DEFAULT false,
    `createdAt` DATETIME(0) NOT NULL,
    `updatedAt` DATETIME(0) NOT NULL,
    `PatientId` INTEGER NULL,
    `DoctorId` INTEGER NULL,

    INDEX `DoctorId`(`DoctorId`),
    INDEX `PatientId`(`PatientId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `doctors` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NULL,
    `age` INTEGER NULL,
    `cin` VARCHAR(255) NULL,
    `avatarUrl` TEXT NULL,
    `schedule` JSON NULL,
    `papers` JSON NULL,
    `gender` ENUM('male', 'female') NULL,
    `phone` INTEGER NULL,
    `email` VARCHAR(255) NULL,
    `address` VARCHAR(255) NULL,
    `isVerified` BOOLEAN NULL DEFAULT false,
    `department` ENUM('Neurologist', 'Dermatology', 'Gynecologist', 'Generalist', 'Radiology', 'Orthopedics', 'Dentistry', 'Surgery') NULL,
    `password` VARCHAR(255) NULL,
    `createdAt` DATETIME(0) NOT NULL,
    `updatedAt` DATETIME(0) NOT NULL,

    UNIQUE INDEX `phone`(`phone`),
    UNIQUE INDEX `email`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `messages` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `content` VARCHAR(255) NOT NULL,
    `senderPhone` VARCHAR(255) NULL,
    `createdAt` DATETIME(0) NOT NULL,
    `updatedAt` DATETIME(0) NOT NULL,
    `PatientId` INTEGER NULL,
    `DoctorId` INTEGER NULL,
    `RoomId` INTEGER NULL,

    INDEX `DoctorId`(`DoctorId`),
    INDEX `PatientId`(`PatientId`),
    INDEX `RoomId`(`RoomId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `patients` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NULL,
    `age` INTEGER NULL,
    `gender` ENUM('male', 'female') NULL,
    `avatarUrl` TEXT NULL,
    `phone` INTEGER NULL,
    `email` VARCHAR(255) NULL,
    `address` VARCHAR(255) NULL,
    `isBlocked` BOOLEAN NULL DEFAULT false,
    `password` VARCHAR(255) NULL,
    `cin` VARCHAR(255) NULL,
    `createdAt` DATETIME(0) NOT NULL,
    `updatedAt` DATETIME(0) NOT NULL,

    UNIQUE INDEX `phone`(`phone`),
    UNIQUE INDEX `email`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `reports` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `content` VARCHAR(255) NULL,
    `createdAt` DATETIME(0) NOT NULL,
    `updatedAt` DATETIME(0) NOT NULL,
    `PatientId` INTEGER NULL,
    `DoctorId` INTEGER NULL,

    INDEX `DoctorId`(`DoctorId`),
    INDEX `PatientId`(`PatientId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `reviews` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `rate` ENUM('ONE', 'TWO', 'THREE', 'FOUR', 'FIVE') NULL,
    `content` VARCHAR(255) NULL,
    `createdAt` DATETIME(0) NOT NULL,
    `updatedAt` DATETIME(0) NOT NULL,
    `PatientId` INTEGER NULL,
    `DoctorId` INTEGER NULL,

    INDEX `DoctorId`(`DoctorId`),
    INDEX `PatientId`(`PatientId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `rooms` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(0) NOT NULL,
    `updatedAt` DATETIME(0) NOT NULL,
    `PatientId` INTEGER NULL,
    `DoctorId` INTEGER NULL,

    INDEX `DoctorId`(`DoctorId`),
    INDEX `PatientId`(`PatientId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `appointments` ADD CONSTRAINT `appointments_ibfk_1` FOREIGN KEY (`PatientId`) REFERENCES `patients`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `appointments` ADD CONSTRAINT `appointments_ibfk_2` FOREIGN KEY (`DoctorId`) REFERENCES `doctors`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `messages` ADD CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`PatientId`) REFERENCES `patients`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `messages` ADD CONSTRAINT `messages_ibfk_2` FOREIGN KEY (`DoctorId`) REFERENCES `doctors`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `messages` ADD CONSTRAINT `messages_ibfk_3` FOREIGN KEY (`RoomId`) REFERENCES `rooms`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reports` ADD CONSTRAINT `reports_ibfk_1` FOREIGN KEY (`PatientId`) REFERENCES `patients`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reports` ADD CONSTRAINT `reports_ibfk_2` FOREIGN KEY (`DoctorId`) REFERENCES `doctors`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reviews` ADD CONSTRAINT `reviews_ibfk_1` FOREIGN KEY (`PatientId`) REFERENCES `patients`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reviews` ADD CONSTRAINT `reviews_ibfk_2` FOREIGN KEY (`DoctorId`) REFERENCES `doctors`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `rooms` ADD CONSTRAINT `rooms_ibfk_1` FOREIGN KEY (`PatientId`) REFERENCES `patients`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `rooms` ADD CONSTRAINT `rooms_ibfk_2` FOREIGN KEY (`DoctorId`) REFERENCES `doctors`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

