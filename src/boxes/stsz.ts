import { Mp4Box} from "../";
import { SampleParams } from "../types";

export function make(mp4box: Mp4Box, params: SampleParams | SampleParams[] | undefined = undefined): Uint8Array {
  return new Uint8Array([
    0x00, // version
    0x00,
    0x00,
    0x00, // flags
    0x00,
    0x00,
    0x00,
    0x00, // sample_size
    0x00,
    0x00,
    0x00,
    0x00, // sample_count
  ]);
}
