import { Mp4Box} from "../";
import { SampleParams } from "../types";

// ISO/IEC 14496-12 8.8.3
export function make(mp4box: Mp4Box, params: SampleParams | SampleParams[] | undefined = undefined): Uint8Array {
  const id = mp4box.trackId;
  return new Uint8Array([
    0x00, // version 0
    0x00,
    0x00,
    0x00, // flags
    id >> 24,
    (id >> 16) & 0xff,
    (id >> 8) & 0xff,
    id & 0xff, // track_ID
    0x00,
    0x00,
    0x00,
    0x01, // default_sample_description_index
    0x00,
    0x00,
    0x00,
    0x00, // default_sample_duration
    0x00,
    0x00,
    0x00,
    0x00, // default_sample_size
    0x00,
    0x01,
    0x00,
    0x01, // default_sample_flags
  ]);
}
