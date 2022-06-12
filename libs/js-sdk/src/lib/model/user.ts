import { Instance, SnapshotOut, types } from 'mobx-state-tree';
import { CompanyModel } from './company';
import { PersonModel } from './person';
import { AssetModel, AssetSnapshot } from './asset';

export interface ProfileForm {
  avatar: AssetSnapshot;
  displayName: string;
  isUpdateAvatar: boolean;
}

const PermissionModel = types.model({
  id: types.identifierNumber,
});

/**
 * Model description here for TypeScript hints.
 */
export const UserModel = types
  .model('User')
  .props({
    id: types.identifierNumber,
    displayName: types.maybeNull(types.string),
    email: types.string,
    gsm: types.maybeNull(types.string),
    avatar: types.maybeNull(AssetModel),
    createdDate: types.maybeNull(types.string),
    remark: types.maybeNull(types.string),
    permissions: types.maybeNull(types.map(PermissionModel)),
    shopPermissions: types.maybeNull(types.array(types.frozen([]))),
    userCompanies: types.maybeNull(types.array(CompanyModel)),
    companyId: types.maybeNull(types.number),
    person: types.maybeNull(PersonModel),
  })
  .views((self) => ({
    get name() {
      return self.displayName != null ? self.displayName : self.email;
    },
    hasAnyPermission(...permissions: number[]) {
      let rs = false;
      for (let i = 0; i < permissions.length; i += 1) {
        if (self.permissions?.get(String(permissions[i]))) {
          rs = true;
          break;
        }
      }
      return rs;
    },
    get avatarURL() {
      return self.avatar?.imageUrl;
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => {
    function updateProfile({
      avatar,
      displayName,
      isUpdateAvatar,
    }: ProfileForm) {
      self.displayName = displayName;
      if (isUpdateAvatar) {
        if (avatar) {
          self.avatar = AssetModel.create(avatar);
        } else {
          self.avatar = null;
        }
      }
    }

    return {
      updateProfile,
    };
  }); // eslint-disable-line @typescript-eslint/no-unused-vars

type UserType = Instance<typeof UserModel>;

export type User = UserType;

type UserSnapshotType = SnapshotOut<typeof UserModel>;

export type UserSnapshot = UserSnapshotType;
