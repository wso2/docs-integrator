/**
 * Extends the stock registry with one custom navbar item type,
 * `custom-exploreDropdown` -- a card-grid mega-menu (see
 * src/components/ExploreDropdown), used for the "Explore" navbar item.
 * Docusaurus's built-in `dropdown` type only supports a flat link list,
 * not a rich card layout, so this is the supported way to add one.
 *
 * The `custom-` prefix is load-bearing, not a style choice: the
 * navbar.items config is validated against a Joi schema that only
 * recognizes the built-in type names PLUS anything matching
 * `custom-*` as a deliberate escape hatch for exactly this case (that
 * validation runs before this file's own registration is ever
 * consulted, so a plain `exploreDropdown` type fails config validation
 * outright with "Bad navbar item type", regardless of this file).
 */
import ComponentTypes from '@theme-original/NavbarItem/ComponentTypes';
import ExploreDropdownNavbarItem from '@site/src/components/ExploreDropdown';

export default {
  ...ComponentTypes,
  'custom-exploreDropdown': ExploreDropdownNavbarItem,
};
