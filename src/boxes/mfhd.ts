import { Mp4Box} from "../";
import { SampleParams } from "../types";

// ISO/IEC 14496-12 8.2.2
export function make(mp4box: Mp4Box, params: SampleParams | SampleParams[] | undefined = undefined): Uint8Array {
    params = params as SampleParams;
    const sn = params.seaquenceNumber!;
    return Uint8Array.from([
	0x00,
	0x00, 0x00, 0x00, // flag
	sn >> 24,
	(sn >> 16) & 0xff,
	(sn >> 8) & 0xff,
	sn & 0xff,
    ]);
}
