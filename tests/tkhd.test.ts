import { Mp4Box } from '../src';

describe('makeBox', () => {
    it('tkhd', async () => {
        const mp4box = new Mp4Box({
            type: "video",
            trackId: 1,
            timescale: 90000,
            width: 257,
            height: 65535,
            hPixelRatio: 10,
            vPixelRatio: 20,
            sps: Uint8Array.from([1, 2, 3, 4, 5, 6, 7, 8, 9]),
            pps: Uint8Array.from([100, 200, 255]),      
        });
	await mp4box.load_boxes();
	const ret = mp4box.makeBox('tkhd', {
            duration: 10,
	}) as Uint8Array;
	expect(ret.slice(0, 8)).toEqual(Uint8Array.from([
	    0, 0, 0, 104,
	    116, 107, 104, 100,
	]));
	expect(ret.slice(96)).toEqual(Uint8Array.from([
	    1, 1, 0, 0,
	    255, 255, 0, 0,
	]));
    });
});
