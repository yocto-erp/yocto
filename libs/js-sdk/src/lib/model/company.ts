import { Instance, SnapshotOut, types } from "mobx-state-tree"

/**
 * Model description here for TypeScript hints.
 */
export const CompanyModel = types
  .model("Company")
  .props({
    id: types.identifierNumber,
    name: types.string,
    gsm: types.maybeNull(types.string),
    email: types.maybeNull(types.string),
    address: types.maybeNull(types.string),
    remark: types.maybeNull(types.string),
    domain: types.maybeNull(types.string),
    publicId: types.maybeNull(types.string),
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

type CompanyType = Instance<typeof CompanyModel>

export type Company = CompanyType

type CompanySnapshotType = SnapshotOut<typeof CompanyModel>

export type CompanySnapshot = CompanySnapshotType
