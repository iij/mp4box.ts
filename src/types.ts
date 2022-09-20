
export type SampleDependencyTypeBox = {
    isLeading?:     0|1|2|3;
    dependsOn?:     0|1|2|3;
    isDependedOn?:  0|1|2|3;
    hasRedundancy?: 0|1|2|3;
}

/*
export type SampleParams = {
    seaquenceNumber?: number;
    baseMediaDecodeTime?: number;
    sampleDependencyTypeBoxList?: Array<SampleDependencyTypeBox>;
};
*/

export type SampleParams = {
    seaquenceNumber?: number;
    baseMediaDecodeTime?: number;
    //sampleDependencyTypeBox?: SampleDependencyTypeBox;
    duration?: number;
    size?: number;
    cts?: number;
    flags?: SampleDependencyTypeBox & {
	paddingValue?: number;
	isNonSync?: number;
	degradation_priority?: number;
    };
};

export type InitParams = {
    type: "video"|"audio";
    trackId: number;
//    duration: number;
    timescale: number;
    width: number;
    height: number;
    hPixelRatio: number;
    vPixelRatio: number;
    sps: Uint8Array;
    pps: Uint8Array;
};
