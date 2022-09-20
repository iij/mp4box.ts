import { Mp4Box } from '../src';

describe('makeBox', () => {
    it('smhd', async () => {
        const mp4box = new Mp4Box({
            type: "video",
            trackId: 1,
            timescale: 90000,
            width: 256,
            height: 65535,
            hPixelRatio: 10,
            vPixelRatio: 20,
            sps: Uint8Array.from([1, 2, 3, 4, 5, 6, 7, 8, 9]),
            pps: Uint8Array.from([100, 200, 255]),      
        });
	await mp4box.load_boxes();
	const ret = mp4box.makeBox('smhd', [{
            duration: 10,
            seaquenceNumber: 16843009,
	    size: 1,
	    cts: 1,
	    flags: {
		isLeading: 0,
		dependsOn: 0,
		isDependedOn: 0,
		hasRedundancy: 0,
		paddingValue: 0,
		isNonSync: 0,
		degradation_priority: 0,
	    },
	}]) as Uint8Array;
	expect(ret).toEqual(Uint8Array.from([
	    0, 0, 0, 16,
	    115, 109, 104, 100,
	    0, 0, 0, 0,
	    0, 0, 0, 0,
	]));
    });
});
