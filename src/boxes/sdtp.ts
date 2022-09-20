import { Mp4Box } from "../";
//import type { SampleParams, SampleDependencyTypeBox } from "../types";
import type { SampleParams } from "../types";

// ISO/IEC 14496-12 8.6.4
export function make(mp4box: Mp4Box, params: SampleParams | SampleParams[] | undefined = undefined): Uint8Array {
    //const samples = params![0].sampleDependencyTypeBoxList as Array<SampleDependencyTypeBox>;
    params = params as Array<SampleParams>;
    let ret = new Uint8Array(1 /* version */ + 3 /* flags*/ + params!.length);
    for (let idx = 0; idx < params.length; idx++) {
	let sample = params[idx];
	if (sample.flags == undefined) {
	    throw new Error("need flags");
	}
	if (sample.flags.isLeading == undefined) {
	    throw new Error("need isLeading");
	}
	if (sample.flags.dependsOn == undefined) {
	    throw new Error("need dependsOn");
	}
	if (sample.flags.isDependedOn == undefined) {
	    throw new Error("need isDependedOn");
	}
	if (sample.flags.hasRedundancy == undefined) {
	    throw new Error("need hasRedundancy");
	}
	ret[1 + 3 + idx] =
	    (sample.flags.isLeading << 6) |
	    (sample.flags.dependsOn << 4) |
	    (sample.flags.isDependedOn << 2) |
	    sample.flags.hasRedundancy;
    }
    return ret;
}
