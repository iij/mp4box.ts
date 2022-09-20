import { Mp4Box } from '../src';

describe('makeBox', () => {
    it('dref', async () => {
        const mp4box = new Mp4Box({
            type: "video",
            trackId: 1,
            timescale: 90000,
            width: 1,
            height: 65281,
            hPixelRatio: 10,
            vPixelRatio: 20,
            sps: Uint8Array.from([0]),
            pps: Uint8Array.from([0]),      
        });
	//await mp4box.load_boxes();
	await mp4box.load_boxes();
	let ret = mp4box.makeBox('dref');
	//console.dir(ret);
	expect(ret).toEqual(Uint8Array.from([
            0, 0, 0, 28,
            100, 114, 101, 102,
            0,
            0, 0, 0,
            0, 0, 0, 1,
            0, 0, 0, 12,
            117, 114, 108, 32,
            0,
            0, 0, 1,
	]));
    });
});

