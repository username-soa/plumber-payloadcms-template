import re
import os

MIGRATION_FILE = 'manual_migration.sql'

def make_idempotent(content):
    # 1. Handle ALTER TABLE ... ADD CONSTRAINT
    # Relaxed pattern to match ALTER TABLE ... ADD CONSTRAINT ... ; 
    # capturing everything up to the semicolon.
    constraint_pattern = re.compile(r'(ALTER TABLE\s+"[^"]+"\s+ADD CONSTRAINT\s+"[^"]+"\s+FOREIGN KEY\s*\([^)]+\)\s*REFERENCES\s+[^;]+;)', re.IGNORECASE | re.DOTALL)
    
    def constraint_replacer(match):
        stmt = match.group(1).strip()
        return f"""DO $$ BEGIN
  {stmt}
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;"""

    content = constraint_pattern.sub(constraint_replacer, content)

    # 2. Handle CREATE INDEX (ensure IF NOT EXISTS)
    # This is a bit simpler: just replace "CREATE INDEX" with "CREATE INDEX IF NOT EXISTS"
    # treating "CREATE INDEX IF NOT EXISTS" as already correct so we don't double it.
    
    # Negative lookahead to ensure we don't match if it already has IF NOT EXISTS
    index_pattern = re.compile(r'CREATE INDEX\s+(?!IF NOT EXISTS\s+)', re.IGNORECASE)
    content = index_pattern.sub('CREATE INDEX IF NOT EXISTS ', content)

    return content

def main():
    file_path = os.path.join(os.getcwd(), MIGRATION_FILE)
    if not os.path.exists(file_path):
        print(f"Error: {MIGRATION_FILE} not found at {file_path}")
        return

    print(f"Reading {MIGRATION_FILE}...")
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    new_content = make_idempotent(content)

    print(f"Writing updated content to {MIGRATION_FILE}...")
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(new_content)
    
    print("Done.")

if __name__ == '__main__':
    main()
