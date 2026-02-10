import * as migration_20260204_135744_add_tag_slug_and_applied_to from "./20260204_135744_add_tag_slug_and_applied_to";

import * as migration_20260207_200000_fix_numbers_columns from "./20260207_200000_fix_numbers_columns";
export const migrations = [
	{
		up: migration_20260204_135744_add_tag_slug_and_applied_to.up,
		down: migration_20260204_135744_add_tag_slug_and_applied_to.down,
		name: "20260204_135744_add_tag_slug_and_applied_to",
	},
	{
		up: migration_20260207_200000_fix_numbers_columns.up,
		down: migration_20260207_200000_fix_numbers_columns.down,
		name: "20260207_200000_fix_numbers_columns",
	},
];
