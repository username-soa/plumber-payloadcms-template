import * as migration_20260204_135744_add_tag_slug_and_applied_to from './20260204_135744_add_tag_slug_and_applied_to';

export const migrations = [
  {
    up: migration_20260204_135744_add_tag_slug_and_applied_to.up,
    down: migration_20260204_135744_add_tag_slug_and_applied_to.down,
    name: '20260204_135744_add_tag_slug_and_applied_to'
  },
];
