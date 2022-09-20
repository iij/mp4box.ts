import { Mp4Box} from "../";
import { SampleParams } from "../types";

// ISO/IEC 14496-12 8.8.7
export function make(mp4box: Mp4Box, params: SampleParams | SampleParams[] | undefined = undefined): Uint8Array {
  return Uint8Array.from([
    0x00, // version
    0x00, 0x00, 0x00, // flags
    mp4box.trackId >> 24,
    (mp4box.trackId >> 16) & 0xff,
    (mp4box.trackId >>  8) & 0xff,
    mp4box.trackId         & 0xff,
  ]);
}
