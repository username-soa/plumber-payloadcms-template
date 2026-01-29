import * as migration_20260128_121330_remove_slug_from_tags from './20260128_121330_remove_slug_from_tags';

export const migrations = [
  {
    up: migration_20260128_121330_remove_slug_from_tags.up,
    down: migration_20260128_121330_remove_slug_from_tags.down,
    name: '20260128_121330_remove_slug_from_tags'
  },
];
