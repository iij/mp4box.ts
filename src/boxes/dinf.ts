import { Mp4Box} from "../";
import { SampleParams } from "../types";

// ISO/IEC 14496-12 8.7.1
export function make(mp4box: Mp4Box, params: SampleParams | SampleParams[] | undefined = undefined): Uint8Array {
  // it's just a container.
  return Uint8Array.from([]);
}
