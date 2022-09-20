import { Mp4Box} from "../";
import { SampleParams } from "../types";

// // ISO/IEC 14496-12 8.5.2 Bit Rate Box
export function make(mp4box: Mp4Box, params: SampleParams | SampleParams[] | undefined = undefined): Uint8Array {
  // XXX
  return new Uint8Array([
    0x00, 0x1c, 0x9c, 0x80, //bufferSizeDB
    0x00, 0x2d, 0xc6, 0xc0, //maxBitrate
    0x00, 0x2d, 0xc6, 0xc0, //avgBitrate
  ]);
}
