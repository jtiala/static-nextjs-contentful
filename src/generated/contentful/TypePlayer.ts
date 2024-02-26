import type {
  ChainModifiers,
  Entry,
  EntryFieldTypes,
  EntrySkeletonType,
  LocaleCode,
} from "contentful";
import type { TypeClubSkeleton } from "./TypeClub";

/**
 * Fields type definition for content type 'TypePlayer'
 * @name TypePlayerFields
 * @type {TypePlayerFields}
 * @memberof TypePlayer
 */
export interface TypePlayerFields {
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
   * Field type definition for field 'position' (Position)
   * @name Position
   * @localized false
   */
  position: EntryFieldTypes.Symbol<
    "Defender" | "Forward" | "Goalkeeper" | "Midfielder"
  >;
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
   * Field type definition for field 'isCaptain' (Is Captain)
   * @name Is Captain
   * @localized false
   */
  isCaptain: EntryFieldTypes.Boolean;
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
 * Entry skeleton type definition for content type 'player' (Player)
 * @name TypePlayerSkeleton
 * @type {TypePlayerSkeleton}
 * @author 3WUQQcC4T6x5SOhsOVxhGg
 * @since 2024-02-21T16:20:48.012Z
 * @version 23
 */
export type TypePlayerSkeleton = EntrySkeletonType<TypePlayerFields, "player">;
/**
 * Entry type definition for content type 'player' (Player)
 * @name TypePlayer
 * @type {TypePlayer}
 * @author 3WUQQcC4T6x5SOhsOVxhGg
 * @since 2024-02-21T16:20:48.012Z
 * @version 23
 */
export type TypePlayer<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode,
> = Entry<TypePlayerSkeleton, Modifiers, Locales>;

export function isTypePlayer<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode,
>(
  entry: Entry<EntrySkeletonType, Modifiers, Locales>,
): entry is TypePlayer<Modifiers, Locales> {
  return entry.sys.contentType.sys.id === "player";
}
