


SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;


COMMENT ON SCHEMA "public" IS 'standard public schema';



CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";






CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";






CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";






CREATE TYPE "public"."access_type" AS ENUM (
    'walk_in',
    'appointment',
    'referral',
    'online',
    'unknown'
);


ALTER TYPE "public"."access_type" OWNER TO "postgres";


CREATE TYPE "public"."cost_type" AS ENUM (
    'free',
    'sliding',
    'paid',
    'unknown'
);


ALTER TYPE "public"."cost_type" OWNER TO "postgres";


CREATE TYPE "public"."coverage_type" AS ENUM (
    'national',
    'state',
    'county',
    'city',
    'zip'
);


ALTER TYPE "public"."coverage_type" OWNER TO "postgres";


CREATE TYPE "public"."note_status" AS ENUM (
    'new',
    'reviewed',
    'actioned'
);


ALTER TYPE "public"."note_status" OWNER TO "postgres";


CREATE TYPE "public"."outcome_type" AS ENUM (
    'helped',
    'partial_help',
    'waitlisted',
    'no_response',
    'not_eligible',
    'denied',
    'scam_suspicious',
    'other'
);


ALTER TYPE "public"."outcome_type" OWNER TO "postgres";


CREATE TYPE "public"."resource_category" AS ENUM (
    'housing',
    'food',
    'transportation',
    'legal',
    'healthcare',
    'mental_health',
    'employment',
    'education',
    'child_support',
    'emergency'
);


ALTER TYPE "public"."resource_category" OWNER TO "postgres";


CREATE TYPE "public"."resource_status" AS ENUM (
    'active',
    'paused',
    'retired'
);


ALTER TYPE "public"."resource_status" OWNER TO "postgres";


CREATE TYPE "public"."verification_status" AS ENUM (
    'verified',
    'stale',
    'unverified'
);


ALTER TYPE "public"."verification_status" OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."set_updated_at"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    SET "search_path" TO 'public', 'pg_temp'
    AS $$
BEGIN
  NEW.updated_at := pg_catalog.now();
  RETURN NEW;
END;
$$;


ALTER FUNCTION "public"."set_updated_at"() OWNER TO "postgres";

SET default_tablespace = '';

SET default_table_access_method = "heap";


CREATE TABLE IF NOT EXISTS "public"."geo_states" (
    "state_code" "text" NOT NULL,
    "state_name" "text" NOT NULL
);


ALTER TABLE "public"."geo_states" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."geo_zip_city_aliases" (
    "zip" "text" NOT NULL,
    "city" "text" NOT NULL,
    "state_code" "text" NOT NULL
);


ALTER TABLE "public"."geo_zip_city_aliases" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."geo_zipcodes" (
    "zip" "text" NOT NULL,
    "state_code" "text" NOT NULL,
    "county_fips" "text",
    "primary_city" "text" NOT NULL,
    CONSTRAINT "geo_zipcodes_zip_format" CHECK (("zip" ~ '^[0-9]{5}(-[0-9]{4})?$'::"text"))
);


ALTER TABLE "public"."geo_zipcodes" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."geo_zipcodes_raw" (
    "primary_city" "text",
    "state_code" "text",
    "zip" "text"
);


ALTER TABLE "public"."geo_zipcodes_raw" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."organizations" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "name" "text" NOT NULL,
    "website" "text",
    "phone" "text",
    "email" "text",
    "description" "text",
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."organizations" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."resource_admin_notes" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "resource_id" "uuid" NOT NULL,
    "note" "text" NOT NULL,
    "status" "public"."note_status" DEFAULT 'new'::"public"."note_status" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."resource_admin_notes" OWNER TO "postgres";


CREATE OR REPLACE VIEW "public"."resource_directory" AS
SELECT
    NULL::"uuid" AS "id",
    NULL::"text" AS "slug",
    NULL::"text" AS "title",
    NULL::"public"."resource_category" AS "category",
    NULL::"text" AS "summary",
    NULL::"text" AS "details",
    NULL::"public"."cost_type" AS "cost",
    NULL::"public"."access_type" AS "access",
    NULL::"text" AS "eligibility",
    NULL::"jsonb" AS "how_to_apply",
    NULL::"jsonb" AS "requirements",
    NULL::"text" AS "hours",
    NULL::"public"."resource_status" AS "status",
    NULL::"public"."verification_status" AS "verification",
    NULL::timestamp with time zone AS "last_verified_at",
    NULL::timestamp with time zone AS "created_at",
    NULL::timestamp with time zone AS "updated_at",
    NULL::"uuid" AS "org_id",
    NULL::"text" AS "org_name",
    NULL::"text" AS "org_website",
    NULL::"text" AS "org_phone",
    NULL::"text" AS "org_email",
    NULL::"text" AS "org_description",
    NULL::"jsonb" AS "service_areas",
    NULL::boolean AS "is_national",
    NULL::"text"[] AS "state_codes",
    NULL::"text"[] AS "zips";


ALTER VIEW "public"."resource_directory" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."resource_outcome_reports" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "resource_id" "uuid" NOT NULL,
    "outcome" "public"."outcome_type" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."resource_outcome_reports" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."resource_service_areas" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "resource_id" "uuid" NOT NULL,
    "coverage" "public"."coverage_type" NOT NULL,
    "state_code" "text",
    "county_fips" "text",
    "city_name" "text",
    "zip" "text",
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."resource_service_areas" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."resource_verification_events" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "resource_id" "uuid" NOT NULL,
    "method" "text" NOT NULL,
    "notes" "text",
    "verified_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."resource_verification_events" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."resources" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "org_id" "uuid",
    "slug" "text" NOT NULL,
    "title" "text" NOT NULL,
    "category" "public"."resource_category" NOT NULL,
    "summary" "text",
    "details" "text",
    "cost" "public"."cost_type" DEFAULT 'unknown'::"public"."cost_type" NOT NULL,
    "access" "public"."access_type" DEFAULT 'unknown'::"public"."access_type" NOT NULL,
    "eligibility" "text",
    "how_to_apply" "jsonb" DEFAULT '[]'::"jsonb" NOT NULL,
    "requirements" "jsonb" DEFAULT '[]'::"jsonb" NOT NULL,
    "hours" "text",
    "status" "public"."resource_status" DEFAULT 'active'::"public"."resource_status" NOT NULL,
    "verification" "public"."verification_status" DEFAULT 'unverified'::"public"."verification_status" NOT NULL,
    "last_verified_at" timestamp with time zone,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."resources" OWNER TO "postgres";


ALTER TABLE ONLY "public"."geo_states"
    ADD CONSTRAINT "geo_states_pkey" PRIMARY KEY ("state_code");



ALTER TABLE ONLY "public"."geo_zip_city_aliases"
    ADD CONSTRAINT "geo_zip_city_aliases_pkey" PRIMARY KEY ("zip", "city", "state_code");



ALTER TABLE ONLY "public"."geo_zipcodes"
    ADD CONSTRAINT "geo_zipcodes_pkey" PRIMARY KEY ("zip");



ALTER TABLE ONLY "public"."organizations"
    ADD CONSTRAINT "organizations_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."resource_admin_notes"
    ADD CONSTRAINT "resource_admin_notes_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."resource_outcome_reports"
    ADD CONSTRAINT "resource_outcome_reports_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."resource_service_areas"
    ADD CONSTRAINT "resource_service_areas_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."resource_verification_events"
    ADD CONSTRAINT "resource_verification_events_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."resources"
    ADD CONSTRAINT "resources_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."resources"
    ADD CONSTRAINT "resources_slug_key" UNIQUE ("slug");



CREATE INDEX "geo_zip_city_aliases_zip_idx" ON "public"."geo_zip_city_aliases" USING "btree" ("zip");



CREATE INDEX "geo_zipcodes_city_idx" ON "public"."geo_zipcodes" USING "btree" ("primary_city");



CREATE INDEX "geo_zipcodes_state_idx" ON "public"."geo_zipcodes" USING "btree" ("state_code");



CREATE INDEX "idx_admin_notes_resource" ON "public"."resource_admin_notes" USING "btree" ("resource_id");



CREATE INDEX "idx_admin_notes_status" ON "public"."resource_admin_notes" USING "btree" ("status");



CREATE INDEX "idx_geo_zip_city" ON "public"."geo_zipcodes" USING "btree" ("primary_city");



CREATE INDEX "idx_geo_zip_county" ON "public"."geo_zipcodes" USING "btree" ("county_fips");



CREATE INDEX "idx_geo_zip_state" ON "public"."geo_zipcodes" USING "btree" ("state_code");



CREATE INDEX "idx_organizations_name" ON "public"."organizations" USING "btree" ("name");



CREATE INDEX "idx_outcomes_created" ON "public"."resource_outcome_reports" USING "btree" ("created_at");



CREATE INDEX "idx_outcomes_resource" ON "public"."resource_outcome_reports" USING "btree" ("resource_id");



CREATE INDEX "idx_resources_category" ON "public"."resources" USING "btree" ("category");



CREATE INDEX "idx_resources_status" ON "public"."resources" USING "btree" ("status");



CREATE INDEX "idx_resources_title" ON "public"."resources" USING "btree" ("title");



CREATE INDEX "idx_resources_verification" ON "public"."resources" USING "btree" ("verification");



CREATE INDEX "idx_rsa_city" ON "public"."resource_service_areas" USING "btree" ("city_name");



CREATE INDEX "idx_rsa_county" ON "public"."resource_service_areas" USING "btree" ("county_fips");



CREATE INDEX "idx_rsa_resource_id" ON "public"."resource_service_areas" USING "btree" ("resource_id");



CREATE INDEX "idx_rsa_state" ON "public"."resource_service_areas" USING "btree" ("state_code");



CREATE INDEX "idx_rsa_zip" ON "public"."resource_service_areas" USING "btree" ("zip");



CREATE INDEX "idx_verification_date" ON "public"."resource_verification_events" USING "btree" ("verified_at");



CREATE INDEX "idx_verification_resource" ON "public"."resource_verification_events" USING "btree" ("resource_id");



CREATE UNIQUE INDEX "organizations_name_uq" ON "public"."organizations" USING "btree" ("name");



CREATE INDEX "rsa_city_idx" ON "public"."resource_service_areas" USING "btree" ("city_name");



CREATE INDEX "rsa_resource_id_idx" ON "public"."resource_service_areas" USING "btree" ("resource_id");



CREATE INDEX "rsa_state_idx" ON "public"."resource_service_areas" USING "btree" ("state_code");



CREATE INDEX "rsa_zip_idx" ON "public"."resource_service_areas" USING "btree" ("zip");



CREATE OR REPLACE VIEW "public"."resource_directory" WITH ("security_invoker"='true') AS
 SELECT "r"."id",
    "r"."slug",
    "r"."title",
    "r"."category",
    "r"."summary",
    "r"."details",
    "r"."cost",
    "r"."access",
    "r"."eligibility",
    "r"."how_to_apply",
    "r"."requirements",
    "r"."hours",
    "r"."status",
    "r"."verification",
    "r"."last_verified_at",
    "r"."created_at",
    "r"."updated_at",
    "o"."id" AS "org_id",
    "o"."name" AS "org_name",
    "o"."website" AS "org_website",
    "o"."phone" AS "org_phone",
    "o"."email" AS "org_email",
    "o"."description" AS "org_description",
    COALESCE("jsonb_agg"("jsonb_build_object"('id', "sa"."id", 'coverage', "sa"."coverage", 'state_code', "sa"."state_code", 'county_fips', "sa"."county_fips", 'city_name', "sa"."city_name", 'zip', "sa"."zip") ORDER BY "sa"."coverage", "sa"."state_code", "sa"."city_name", "sa"."zip") FILTER (WHERE ("sa"."id" IS NOT NULL)), '[]'::"jsonb") AS "service_areas",
    (EXISTS ( SELECT 1
           FROM "public"."resource_service_areas" "x"
          WHERE (("x"."resource_id" = "r"."id") AND ("x"."coverage" = 'national'::"public"."coverage_type")))) AS "is_national",
    COALESCE("array_agg"(DISTINCT "sa"."state_code") FILTER (WHERE ("sa"."state_code" IS NOT NULL)), '{}'::"text"[]) AS "state_codes",
    COALESCE("array_agg"(DISTINCT "sa"."zip") FILTER (WHERE ("sa"."zip" IS NOT NULL)), '{}'::"text"[]) AS "zips"
   FROM (("public"."resources" "r"
     LEFT JOIN "public"."organizations" "o" ON (("o"."id" = "r"."org_id")))
     LEFT JOIN "public"."resource_service_areas" "sa" ON (("sa"."resource_id" = "r"."id")))
  GROUP BY "r"."id", "o"."id";



CREATE OR REPLACE TRIGGER "trg_orgs_updated_at" BEFORE UPDATE ON "public"."organizations" FOR EACH ROW EXECUTE FUNCTION "public"."set_updated_at"();



CREATE OR REPLACE TRIGGER "trg_resources_updated_at" BEFORE UPDATE ON "public"."resources" FOR EACH ROW EXECUTE FUNCTION "public"."set_updated_at"();



ALTER TABLE ONLY "public"."resource_admin_notes"
    ADD CONSTRAINT "resource_admin_notes_resource_id_fkey" FOREIGN KEY ("resource_id") REFERENCES "public"."resources"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."resource_outcome_reports"
    ADD CONSTRAINT "resource_outcome_reports_resource_id_fkey" FOREIGN KEY ("resource_id") REFERENCES "public"."resources"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."resource_service_areas"
    ADD CONSTRAINT "resource_service_areas_resource_id_fkey" FOREIGN KEY ("resource_id") REFERENCES "public"."resources"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."resource_verification_events"
    ADD CONSTRAINT "resource_verification_events_resource_id_fkey" FOREIGN KEY ("resource_id") REFERENCES "public"."resources"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."resources"
    ADD CONSTRAINT "resources_org_id_fkey" FOREIGN KEY ("org_id") REFERENCES "public"."organizations"("id") ON DELETE SET NULL;



ALTER TABLE "public"."geo_states" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."geo_zip_city_aliases" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."geo_zipcodes" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."geo_zipcodes_raw" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."organizations" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."resource_admin_notes" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."resource_outcome_reports" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."resource_service_areas" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."resource_verification_events" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."resources" ENABLE ROW LEVEL SECURITY;




ALTER PUBLICATION "supabase_realtime" OWNER TO "postgres";


GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";

























































































































































GRANT ALL ON FUNCTION "public"."set_updated_at"() TO "anon";
GRANT ALL ON FUNCTION "public"."set_updated_at"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."set_updated_at"() TO "service_role";


















GRANT ALL ON TABLE "public"."geo_states" TO "anon";
GRANT ALL ON TABLE "public"."geo_states" TO "authenticated";
GRANT ALL ON TABLE "public"."geo_states" TO "service_role";



GRANT ALL ON TABLE "public"."geo_zip_city_aliases" TO "anon";
GRANT ALL ON TABLE "public"."geo_zip_city_aliases" TO "authenticated";
GRANT ALL ON TABLE "public"."geo_zip_city_aliases" TO "service_role";



GRANT ALL ON TABLE "public"."geo_zipcodes" TO "anon";
GRANT ALL ON TABLE "public"."geo_zipcodes" TO "authenticated";
GRANT ALL ON TABLE "public"."geo_zipcodes" TO "service_role";



GRANT ALL ON TABLE "public"."geo_zipcodes_raw" TO "anon";
GRANT ALL ON TABLE "public"."geo_zipcodes_raw" TO "authenticated";
GRANT ALL ON TABLE "public"."geo_zipcodes_raw" TO "service_role";



GRANT ALL ON TABLE "public"."organizations" TO "anon";
GRANT ALL ON TABLE "public"."organizations" TO "authenticated";
GRANT ALL ON TABLE "public"."organizations" TO "service_role";



GRANT ALL ON TABLE "public"."resource_admin_notes" TO "anon";
GRANT ALL ON TABLE "public"."resource_admin_notes" TO "authenticated";
GRANT ALL ON TABLE "public"."resource_admin_notes" TO "service_role";



GRANT ALL ON TABLE "public"."resource_directory" TO "anon";
GRANT ALL ON TABLE "public"."resource_directory" TO "authenticated";
GRANT ALL ON TABLE "public"."resource_directory" TO "service_role";



GRANT ALL ON TABLE "public"."resource_outcome_reports" TO "anon";
GRANT ALL ON TABLE "public"."resource_outcome_reports" TO "authenticated";
GRANT ALL ON TABLE "public"."resource_outcome_reports" TO "service_role";



GRANT ALL ON TABLE "public"."resource_service_areas" TO "anon";
GRANT ALL ON TABLE "public"."resource_service_areas" TO "authenticated";
GRANT ALL ON TABLE "public"."resource_service_areas" TO "service_role";



GRANT ALL ON TABLE "public"."resource_verification_events" TO "anon";
GRANT ALL ON TABLE "public"."resource_verification_events" TO "authenticated";
GRANT ALL ON TABLE "public"."resource_verification_events" TO "service_role";



GRANT ALL ON TABLE "public"."resources" TO "anon";
GRANT ALL ON TABLE "public"."resources" TO "authenticated";
GRANT ALL ON TABLE "public"."resources" TO "service_role";









ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "service_role";































