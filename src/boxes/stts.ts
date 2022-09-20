import { Mp4Box} from "../";
import { SampleParams } from "../types";

// ISO/IEC 14496-12 8.6.1.2
export function make(mp4box: Mp4Box, params: SampleParams | SampleParams[] | undefined = undefined): Uint8Array {
  return new Uint8Array([
    0x00, // version
    0x00,
    0x00,
    0x00, // flags
    0x00,
    0x00,
    0x00,
    0x00, // entry_count
  ]);
}
