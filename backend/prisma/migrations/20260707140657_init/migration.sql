-- CreateTable
CREATE TABLE `control` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `type` BOOLEAN NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `quotes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `student_name` VARCHAR(255) NOT NULL,
    `feeling_text` TEXT NOT NULL,
    `created_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `image_url` TEXT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ig_quotes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `quote_text` TEXT NOT NULL,
    `image_url` TEXT NULL,
    `ig_account` VARCHAR(255) NOT NULL,
    `created_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `popup` BOOLEAN NULL DEFAULT false,
    `type` TEXT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `popcat_users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `student_id` VARCHAR(50) NOT NULL,
    `student_name` VARCHAR(255) NOT NULL,
    `created_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `unique_student`(`student_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `popcat_players` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `student_id` VARCHAR(50) NOT NULL,
    `department_key` VARCHAR(100) NOT NULL,
    `total_clicks` BIGINT NOT NULL DEFAULT 0,
    `created_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `student_name` TEXT NULL,

    UNIQUE INDEX `unique_player_dept`(`student_id`, `department_key`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `departments_score` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `department_key` VARCHAR(100) NOT NULL,
    `department_name` TEXT NOT NULL,
    `total_clicks` BIGINT NOT NULL DEFAULT 0,
    `created_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `ImageCat` TEXT NULL,

    UNIQUE INDEX `unique_dept_key`(`department_key`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
