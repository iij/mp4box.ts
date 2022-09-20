import { Mp4Box} from "../";
import { SampleParams } from "../types";

export function make(mp4box: Mp4Box, params: SampleParams | SampleParams[] | undefined = undefined): Uint8Array {
  return new Uint8Array([
      0x00, // version 0
      0x00, 0x00, 0x00, // flags
      0x00, 0x00, 0x00, 0x01, // entry_count
      0x00, 0x00, 0x00, 0x0c, // entry_size
      0x75, 0x72, 0x6c, 0x20, // 'url ' type
      0x00, // version 0
      0x00, 0x00, 0x01, // entry_flags
  ]);
}
