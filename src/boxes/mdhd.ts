import { Mp4Box} from "../";
import { SampleParams } from "../types";

// ISO/IEC 14496-12 8.4.2
export function make(mp4box: Mp4Box, params: SampleParams | SampleParams[] | undefined = undefined): Uint8Array {
    const UINT32_MAX = Math.pow(2, 32) - 1;
    const timescale = mp4box.timescale;
    params = params as SampleParams;
    if (params == undefined || params.duration == undefined) {
	throw new Error("neeed the duration");
    }
    const duration = params.duration * timescale;
    const upperword = Math.floor(duration / (UINT32_MAX + 1));
    const lowerword = Math.floor(duration % (UINT32_MAX + 1));
    return Uint8Array.from([
        0x01, // version 1
        0x00,
        0x00,
        0x00, // flags
        0x00,
        0x00,
        0x00,
        0x00,
        0x00,
        0x00,
        0x00,
        0x02, // creation_time
        0x00,
        0x00,
        0x00,
        0x00,
        0x00,
        0x00,
        0x00,
        0x03, // modification_time
        (timescale >> 24) & 0xff,
        (timescale >> 16) & 0xff,
        (timescale >> 8) & 0xff,
        timescale & 0xff, // timescale
        upperword >> 24,
        (upperword >> 16) & 0xff,
        (upperword >> 8) & 0xff,
        upperword & 0xff,
        lowerword >> 24,
        (lowerword >> 16) & 0xff,
        (lowerword >> 8) & 0xff,
        lowerword & 0xff,
        0x55,
        0xc4, // 'und' language (undetermined)
        0x00,
        0x00,
    ]);
}
