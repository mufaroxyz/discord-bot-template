CREATE TABLE IF NOT EXISTS "dynamic_config" (
	"key" text,
	"value" json,
	CONSTRAINT "dynamic_config_key_unique" UNIQUE("key")
);
