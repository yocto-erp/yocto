import { Instance, SnapshotOut, types } from "mobx-state-tree"

/**
 * Model description here for TypeScript hints.
 */
export const AssetIpfsModel = types
  .model("AssetIpfs")
  .props({
    id: types.identifierNumber,
    carId: types.maybeNull(types.string),
    lastModifiedDate: types.maybeNull(types.string),
    totalPinned: types.number,
    totalDeal: types.number,
    lastUpdatedStatus: types.maybeNull(types.string),
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

type AssetIpfsType = Instance<typeof AssetIpfsModel>

export type AssetIpfs = AssetIpfsType

type AssetIpfsSnapshotType = SnapshotOut<typeof AssetIpfsModel>

export type AssetIpfsSnapshot = AssetIpfsSnapshotType
