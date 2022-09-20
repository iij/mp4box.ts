import { Mp4Box } from '../src';

describe('makeBox', () => {
    it('ftyp', async () => {
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
	await mp4box.load_boxes();
	let ret = mp4box.makeBox('ftyp');
	//console.dir(ret);
	expect(ret).toEqual(Uint8Array.from([0, 0, 0, 24,
                                             102, 116, 121, 112,
                                             105, 115, 111, 109,
                                             0, 0, 0, 1,
                                             105, 115, 111, 109,
                                             97, 118, 99, 49,
                                            ]));
    });
});
