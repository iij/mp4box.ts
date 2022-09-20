import { Mp4Box } from '../src';

describe('makeBox', () => {
    it('sdtp', async () => {
        const mp4box = new Mp4Box({
            type: "video",
            trackId: 1,
            timescale: 90000,
	    //          duration: 10,
            width: 1,
            height: 1,
            hPixelRatio: 10,
            vPixelRatio: 20,
            sps: Uint8Array.from([0]),
            pps: Uint8Array.from([0]),      
        });
        await mp4box.load_boxes();
        const ret = mp4box.makeBox('sdtp', [
            {
                duration: 10,
		seaquenceNumber: 16843009,
		size: 1,
		cts: 1,
		flags: {
                    isLeading: 3,
                    dependsOn: 3,
                    isDependedOn: 3,
                    hasRedundancy: 3,
                    paddingValue: 0,
                    isNonSync: 0,
                    degradation_priority: 0,
		},
            },
            {
                duration: 10,
		seaquenceNumber: 16843009,
		size: 1,
		cts: 1,
		flags: {
                    isLeading: 0,
                    dependsOn: 0,
                    isDependedOn: 0,
                    hasRedundancy: 1,
                    paddingValue: 0,
                    isNonSync: 0,
                    degradation_priority: 0,
		},
            },
            {
                duration: 10,
		seaquenceNumber: 16843009,
		size: 1,
		cts: 1,
		flags: {
                    isLeading: 0,
                    dependsOn: 1,
                    isDependedOn: 2,
                    hasRedundancy: 0,
                    paddingValue: 0,
                    isNonSync: 0,
                    degradation_priority: 0,
		},
            },
        ]) as Uint8Array;
	//console.dir(ret);
        expect(ret).toEqual(Uint8Array.from([
            0, 0, 0, 15,
            115, 100, 116, 112,
            0, // version 
            0, 0, 0, // flgas
            255,
            1,
            24,
        ]));
    });
});
