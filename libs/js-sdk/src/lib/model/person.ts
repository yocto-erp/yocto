import { Instance, SnapshotOut, types } from "mobx-state-tree"

/**
 * Model description here for TypeScript hints.
 */
export const PersonModel = types
  .model("Person")
  .props({
    id: types.identifierNumber,
    name: types.string,
    firstName: types.string,
    lastName: types.string,
    gsm: types.maybeNull(types.string),
    email: types.maybeNull(types.string),
    address: types.maybeNull(types.string),
    birthday: types.maybeNull(types.string),
    sex: types.maybeNull(types.number),
    remark: types.maybeNull(types.string),
    fullName: types.maybeNull(types.string),
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

type PersonType = Instance<typeof PersonModel>

export type Person = PersonType

type PersonSnapshotType = SnapshotOut<typeof PersonModel>

export type PersonSnapshot = PersonSnapshotType
