import { Mp4Box} from "../";
import { SampleParams } from "../types";

// ISO/IEC 14496-12 12.2.2.1
export function make(mp4box: Mp4Box, params: SampleParams | SampleParams[] | undefined = undefined): Uint8Array {    
  return Uint8Array.from([
    0x00, // version
    0x00, 0x00, 0x00, // flags
    0x00, 0x00, // balance
    0x00, 0x00, //reserved
  ]);
}
