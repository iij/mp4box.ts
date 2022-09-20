import { Mp4Box} from "../";
import { SampleParams } from "../types";

// // ISO/IEC 14496-12 12.1.4
export function make(mp4box: Mp4Box, params: SampleParams | SampleParams[] | undefined = undefined): Uint8Array {
  const hSpacing = mp4box.hPixelRatio;
  const vSpacing = mp4box.vPixelRatio;
  return new Uint8Array([
    hSpacing >> 24, // hSpacing
    (hSpacing >> 16) & 0xff,
    (hSpacing >> 8) & 0xff,
    hSpacing & 0xff,
    vSpacing >> 24, // vSpacing
    (vSpacing >> 16) & 0xff,
    (vSpacing >> 8) & 0xff,
    vSpacing & 0xff,
  ]);
}
