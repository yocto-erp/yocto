import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { AssetIpfsModel } from "./asset-ipfs"
import {imageUrl} from "../api/image.api";

const IPFS_GATEWAY = {
  cloudflare: "https://cloudflare-ipfs.com/ipfs",
  ipfs: "https://ipfs.io/ipfs",
  dweb: "https://dweb.link/ipfs",
}

export const AssetModel = types
  .model("Asset")
  .props({
    id: types.identifierNumber,
    name: types.maybeNull(types.string),
    size: types.number,
    mimeType: types.maybeNull(types.string),
    type: types.number,
    fileId: types.string,
    syncStatus: types.maybeNull(types.number),
    lastSynced: types.maybeNull(types.string),
    ipfs: types.maybeNull(AssetIpfsModel),
  })
  .views((self) => ({
    get imageUrl(){
      if (self.ipfs && self.ipfs.totalPinned >= 2) {
        return `${IPFS_GATEWAY.dweb}/${self.ipfs.carId}/${self.fileId}`
      }
      return imageUrl(self.fileId)
    }
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

type AssetType = Instance<typeof AssetModel>

export type Asset = AssetType

type AssetSnapshotType = SnapshotOut<typeof AssetModel>

export type AssetSnapshot = AssetSnapshotType
