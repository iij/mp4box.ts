import { Mp4Box } from "../";
import { SampleParams } from "../types";

// ISO/IEC 14496-12 8.6.4
export function make(mp4box: Mp4Box, params: SampleParams | SampleParams[] | undefined = undefined): Uint8Array {
    const samples = params as SampleParams[];
    const offset = getOffset(samples.length);
    //console.log("offset: %d", offset);
    const ret = new Uint8Array(
        1 + 3 + // versino + flags
            4 + // sample_count
            4 + // data_offset
            16 * samples.length);
    ret.set([
        0x00, //version
        0x00, 0x0f, 0x01, // flags
        (samples.length >>> 24) & 0xff,
        (samples.length >>> 16) & 0xff,
        (samples.length >>> 8 ) & 0xff,
        samples.length & 0xff,
        (offset >>> 24) & 0xff,
        (offset >>> 16) & 0xff,
        (offset >>> 8) & 0xff,
        offset & 0xff,
    ], 0);
    for (let idx = 0; idx < samples.length; idx++) {
        //console.log(`idx: ${idx}`);
        const duration = samples[idx].duration;
	if (duration == undefined) {
	    throw new Error("need duration");
	}
        const size = samples[idx].size;
	if (size == undefined) {
	    throw new Error("need size");
	}
        const cts = samples[idx].cts;
	if (cts == undefined) {
	    throw new Error("need cts");
	}
        const flags = samples[idx].flags;
	if (flags == undefined ||
	    flags.isLeading == undefined ||
	    flags.dependsOn == undefined ||
	    flags.isDependedOn == undefined ||
	    flags.hasRedundancy == undefined ||
	    flags.paddingValue == undefined ||
	    flags.isNonSync == undefined ||
	    flags.degradation_priority == undefined
	   ) {
	    throw new Error("need flags");
	}
        //console.log(`idx: ${idx}`);
        ret.set(
            [
                (duration >>> 24) & 0xff,
                (duration >>> 16) & 0xff,
                (duration >>> 8) & 0xff,
                duration & 0xff, // sample_duration
                (size >>> 24) & 0xff,
                (size >>> 16) & 0xff,
                (size >>> 8) & 0xff,
                size & 0xff, // sample_size
                (flags.isLeading << 2) | flags.dependsOn,
                (flags.isDependedOn << 6) | (flags.hasRedundancy << 4) | (flags.paddingValue << 1) | flags.isNonSync,
                flags.degradation_priority & (0xf0 << 8),
                flags.degradation_priority & 0x0f, // sample flags
                (cts >>> 24) & 0xff,
                (cts >>> 16) & 0xff,
                (cts >>> 8) & 0xff,
                cts & 0xff, // sample_composition_time_offset
            ],
            12 + /* version + flags + sample length + offset*/
                16 * idx
        );
        
    }
    return ret;
}

function getOffset(samplelen: number): number {
    return 4 + 4 /* box type + length */ + 4 /* version + flags */ + samplelen + // sdtp
        16 + // tfhd
        20 + // tfdt
        8 +  // traf header
        16 + // mfhd
        8 +  // moof header
        8;   // mdat header
}
