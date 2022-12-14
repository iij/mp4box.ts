import { Mp4Box} from "../";
import { SampleParams } from "../types";

// ISO/IEC 14496-12 8.4.3
export function make(mp4box: Mp4Box, params: SampleParams | SampleParams[] | undefined = undefined): Uint8Array {
  const video = Uint8Array.from([
    0x00, // version 0
    0x00,
    0x00,
    0x00, // flags
    0x00,
    0x00,
    0x00,
    0x00, // pre_defined
    0x76,
    0x69,
    0x64,
    0x65, // handler_type: 'vide'
    0x00,
    0x00,
    0x00,
    0x00, // reserved
    0x00,
    0x00,
    0x00,
    0x00, // reserved
    0x00,
    0x00,
    0x00,
    0x00, // reserved
    0x56,
    0x69,
    0x64,
    0x65,
    0x6f,
    0x48,
    0x61,
    0x6e,
    0x64,
    0x6c,
    0x65,
    0x72,
    0x00, // name: 'VideoHandler'
  ]);

  const audio = Uint8Array.from([
    0x00, // version 0
    0x00,
    0x00,
    0x00, // flags
    0x00,
    0x00,
    0x00,
    0x00, // pre_defined
    0x73,
    0x6f,
    0x75,
    0x6e, // handler_type: 'soun'
    0x00,
    0x00,
    0x00,
    0x00, // reserved
    0x00,
    0x00,
    0x00,
    0x00, // reserved
    0x00,
    0x00,
    0x00,
    0x00, // reserved
    0x53,
    0x6f,
    0x75,
    0x6e,
    0x64,
    0x48,
    0x61,
    0x6e,
    0x64,
    0x6c,
    0x65,
    0x72,
    0x00, // name: 'SoundHandler'
  ]);

  return mp4box.type == "video" ? video : audio;
}
