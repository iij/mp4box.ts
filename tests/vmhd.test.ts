import { Mp4Box } from '../src';

describe('makeBox', () => {
    it('vmhd', async () => {
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
	const ret = mp4box.makeBox('vmhd') as Uint8Array;
	expect(ret).toEqual(Uint8Array.from([
	    0, 0, 0, 20,
	    118, 109, 104, 100,
	    0, 0, 0, 1,
	    0, 0,
	    0, 0, 0, 0, 0, 0,
	]));
    });
});
