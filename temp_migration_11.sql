
-- Mark migrations as applied
INSERT INTO "payload_migrations" ("name", "batch", "created_at", "updated_at") VALUES ('20260204_135744_add_tag_slug_and_applied_to', 1, now(), now()) ON CONFLICT DO NOTHING;
INSERT INTO "payload_migrations" ("name", "batch", "created_at", "updated_at") VALUES ('20260207_200000_fix_numbers_columns', 1, now(), now()) ON CONFLICT DO NOTHING;
INSERT INTO "payload_migrations" ("name", "batch", "created_at", "updated_at") VALUES ('20260212_094850_add_form_block', 1, now(), now()) ON CONFLICT DO NOTHING;
INSERT INTO "payload_migrations" ("name", "batch", "created_at", "updated_at") VALUES ('20260212_120000_add_locked_documents', 1, now(), now()) ON CONFLICT DO NOTHING;
INSERT INTO "payload_migrations" ("name", "batch", "created_at", "updated_at") VALUES ('20260212_130000_fix_pages_ver', 1, now(), now()) ON CONFLICT DO NOTHING;
