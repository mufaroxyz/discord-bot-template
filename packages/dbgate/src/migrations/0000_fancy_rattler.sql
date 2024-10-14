CREATE TABLE `dynamic_config` (
	`key` text,
	`value` blob
);
--> statement-breakpoint
CREATE UNIQUE INDEX `dynamic_config_key_unique` ON `dynamic_config` (`key`);