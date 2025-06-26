import { createConfirmationCreater, createMountPoint, createReactTreeMounter } from 'react-confirm';

const mounter = createReactTreeMounter();
export const MountPoint = createMountPoint(mounter);

export const confirmCreator = createConfirmationCreater(mounter);
