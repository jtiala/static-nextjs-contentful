import type {
  ChainModifiers,
  Entry,
  EntryFieldTypes,
  EntrySkeletonType,
  LocaleCode,
} from "contentful";
import type { TypeClubSkeleton } from "./TypeClub";

/**
 * Fields type definition for content type 'TypeManager'
 * @name TypeManagerFields
 * @type {TypeManagerFields}
 * @memberof TypeManager
 */
export interface TypeManagerFields {
  /**
   * Field type definition for field 'name' (Name)
   * @name Name
   * @localized false
   */
  name: EntryFieldTypes.Symbol;
  /**
   * Field type definition for field 'nationality' (Nationality)
   * @name Nationality
   * @localized false
   */
  nationality: EntryFieldTypes.Symbol;
  /**
   * Field type definition for field 'born' (Born)
   * @name Born
   * @localized false
   */
  born: EntryFieldTypes.Date;
  /**
   * Field type definition for field 'bio' (Bio)
   * @name Bio
   * @localized false
   */
  bio?: EntryFieldTypes.RichText;
  /**
   * Field type definition for field 'photo' (Photo)
   * @name Photo
   * @localized false
   */
  photo?: EntryFieldTypes.AssetLink;
  /**
   * Field type definition for field 'club' (Club)
   * @name Club
   * @localized false
   */
  club?: EntryFieldTypes.EntryLink<TypeClubSkeleton>;
  /**
   * Field type definition for field 'role' (Role)
   * @name Role
   * @localized false
   */
  role?: EntryFieldTypes.Symbol<
    "Assistant Manager" | "Coach" | "Head Coach" | "Manager"
  >;
  /**
   * Field type definition for field 'formerClubs' (Former Clubs)
   * @name Former Clubs
   * @localized false
   */
  formerClubs?: EntryFieldTypes.Array<
    EntryFieldTypes.EntryLink<TypeClubSkeleton>
  >;
}

/**
 * Entry skeleton type definition for content type 'manager' (Manager)
 * @name TypeManagerSkeleton
 * @type {TypeManagerSkeleton}
 * @author 3WUQQcC4T6x5SOhsOVxhGg
 * @since 2024-02-21T16:21:30.849Z
 * @version 29
 */
export type TypeManagerSkeleton = EntrySkeletonType<
  TypeManagerFields,
  "manager"
>;
/**
 * Entry type definition for content type 'manager' (Manager)
 * @name TypeManager
 * @type {TypeManager}
 * @author 3WUQQcC4T6x5SOhsOVxhGg
 * @since 2024-02-21T16:21:30.849Z
 * @version 29
 */
export type TypeManager<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode,
> = Entry<TypeManagerSkeleton, Modifiers, Locales>;

export function isTypeManager<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode,
>(
  entry: Entry<EntrySkeletonType, Modifiers, Locales>,
): entry is TypeManager<Modifiers, Locales> {
  return entry.sys.contentType.sys.id === "manager";
}
