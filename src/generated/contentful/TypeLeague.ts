import type {
  ChainModifiers,
  Entry,
  EntryFieldTypes,
  EntrySkeletonType,
  LocaleCode,
} from "contentful";

/**
 * Fields type definition for content type 'TypeLeague'
 * @name TypeLeagueFields
 * @type {TypeLeagueFields}
 * @memberof TypeLeague
 */
export interface TypeLeagueFields {
  /**
   * Field type definition for field 'name' (Name)
   * @name Name
   * @localized false
   */
  name: EntryFieldTypes.Symbol;
  /**
   * Field type definition for field 'country' (Country)
   * @name Country
   * @localized false
   */
  country: EntryFieldTypes.Symbol;
}

/**
 * Entry skeleton type definition for content type 'league' (League)
 * @name TypeLeagueSkeleton
 * @type {TypeLeagueSkeleton}
 * @author 3WUQQcC4T6x5SOhsOVxhGg
 * @since 2024-02-21T16:44:21.628Z
 * @version 3
 */
export type TypeLeagueSkeleton = EntrySkeletonType<TypeLeagueFields, "league">;
/**
 * Entry type definition for content type 'league' (League)
 * @name TypeLeague
 * @type {TypeLeague}
 * @author 3WUQQcC4T6x5SOhsOVxhGg
 * @since 2024-02-21T16:44:21.628Z
 * @version 3
 */
export type TypeLeague<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode,
> = Entry<TypeLeagueSkeleton, Modifiers, Locales>;

export function isTypeLeague<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode,
>(
  entry: Entry<EntrySkeletonType, Modifiers, Locales>,
): entry is TypeLeague<Modifiers, Locales> {
  return entry.sys.contentType.sys.id === "league";
}
