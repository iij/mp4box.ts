import { Mp4Box } from '../src';

describe('makeBox', () => {
    it('avcc', async () => {
        const mp4box = new Mp4Box({
            type: "video",
            trackId: 1,
            timescale: 90000,
            width: 1,
            height: 65281,
            hPixelRatio: 10,
            vPixelRatio: 20,
            sps: Uint8Array.from([1, 2, 3, 4, 5, 6, 7, 8, 9]),
            pps: Uint8Array.from([100, 200, 255]),      
        });
	await mp4box.load_boxes();
	let ret = mp4box.makeBox('avcc') as Uint8Array;
	//console.dir(ret);
	expect(ret.slice(0, 8)).toEqual(Uint8Array.from([
	    0, 0, 0, 31,
	    97, 118, 99, 99,
	]));
	expect(ret.slice(ret.byteLength - 5)).toEqual(Uint8Array.from([
	    0, 3, 100, 200, 255,
	]));
    });
});

