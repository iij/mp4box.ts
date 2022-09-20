import { Mp4Box} from "../";
import { SampleParams } from "../types";

// ISO/IEC 14496-12 4.3
export function make(mp4box: Mp4Box, params: SampleParams | SampleParams[] | undefined = undefined): Uint8Array {
  return new Uint8Array([
    105, 115, 111, 109, // major brand isom
    0, 0, 0, 1, // minor version
    105, 115, 111, 109, // major brand isom
    97, 118, 99, 49, // avc1
  ]);
}
