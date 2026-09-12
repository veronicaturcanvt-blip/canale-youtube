-- Rename REFORMER -> KETTLEBELLS and add RESISTANCE_BANDS.
-- Postgres enums can't rename/remove a value in place, so recreate the type.
ALTER TYPE "Equipment" RENAME TO "Equipment_old";

CREATE TYPE "Equipment" AS ENUM ('NONE', 'MAT', 'KETTLEBELLS', 'RESISTANCE_BANDS');

ALTER TABLE "Practice" ALTER COLUMN "equipment" DROP DEFAULT;
ALTER TABLE "Practice" ALTER COLUMN "equipment" TYPE "Equipment" USING (
  CASE "equipment"::text
    WHEN 'REFORMER' THEN 'KETTLEBELLS'
    ELSE "equipment"::text
  END
)::"Equipment";

DROP TYPE "Equipment_old";
