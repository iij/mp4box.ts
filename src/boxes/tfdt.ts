import { Mp4Box } from "../";
import { SampleParams } from "../types";

// ISO/IEC 14496-12 8.8.12
export function make(mp4box: Mp4Box, params: SampleParams | SampleParams[] | undefined = undefined): Uint8Array {
    const UINT32_MAX = Math.pow(2, 32) - 1;
    let upperbmdt = 0;
    let lowerbmdt = 0;
    params = params as SampleParams;
    if (params.baseMediaDecodeTime == undefined) {
	throw new Error("need baseMediaDecodeTime");
    }
    upperbmdt = Math.floor(params.baseMediaDecodeTime / (UINT32_MAX + 1));
    lowerbmdt = Math.floor(params.baseMediaDecodeTime % (UINT32_MAX + 1));
    return Uint8Array.from([
	0x01, // version
	0x00, 0x00, 0x00, // flags
	upperbmdt >> 24,
	(upperbmdt >> 16) & 0xff,
	(upperbmdt >> 8) & 0xff,
	upperbmdt & 0xff,
	lowerbmdt >> 24,
	(lowerbmdt >> 16) & 0xff,
	(lowerbmdt >> 8) & 0xff,
	lowerbmdt & 0xff,
    ]);
}
