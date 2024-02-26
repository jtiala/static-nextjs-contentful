import type {
  ChainModifiers,
  Entry,
  EntryFieldTypes,
  EntrySkeletonType,
  LocaleCode,
} from "contentful";
import type { TypeLeagueSkeleton } from "./TypeLeague";

/**
 * Fields type definition for content type 'TypeClub'
 * @name TypeClubFields
 * @type {TypeClubFields}
 * @memberof TypeClub
 */
export interface TypeClubFields {
  /**
   * Field type definition for field 'name' (Name)
   * @name Name
   * @localized false
   */
  name: EntryFieldTypes.Symbol;
  /**
   * Field type definition for field 'established' (Established)
   * @name Established
   * @localized false
   * @summary Year when the club was established
   */
  established: EntryFieldTypes.Integer;
  /**
   * Field type definition for field 'badge' (Badge)
   * @name Badge
   * @localized false
   */
  badge?: EntryFieldTypes.AssetLink;
  /**
   * Field type definition for field 'nicknames' (Nicknames)
   * @name Nicknames
   * @localized false
   */
  nicknames?: EntryFieldTypes.Array<EntryFieldTypes.Symbol>;
  /**
   * Field type definition for field 'country' (Country)
   * @name Country
   * @localized false
   */
  country: EntryFieldTypes.Symbol;
  /**
   * Field type definition for field 'city' (City)
   * @name City
   * @localized false
   */
  city: EntryFieldTypes.Symbol;
  /**
   * Field type definition for field 'league' (League)
   * @name League
   * @localized false
   */
  league: EntryFieldTypes.EntryLink<TypeLeagueSkeleton>;
}

/**
 * Entry skeleton type definition for content type 'club' (Club)
 * @name TypeClubSkeleton
 * @type {TypeClubSkeleton}
 * @author 3WUQQcC4T6x5SOhsOVxhGg
 * @since 2024-02-21T16:15:50.244Z
 * @version 15
 */
export type TypeClubSkeleton = EntrySkeletonType<TypeClubFields, "club">;
/**
 * Entry type definition for content type 'club' (Club)
 * @name TypeClub
 * @type {TypeClub}
 * @author 3WUQQcC4T6x5SOhsOVxhGg
 * @since 2024-02-21T16:15:50.244Z
 * @version 15
 */
export type TypeClub<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode,
> = Entry<TypeClubSkeleton, Modifiers, Locales>;

export function isTypeClub<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode,
>(
  entry: Entry<EntrySkeletonType, Modifiers, Locales>,
): entry is TypeClub<Modifiers, Locales> {
  return entry.sys.contentType.sys.id === "club";
}
