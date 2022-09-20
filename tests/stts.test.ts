import { Mp4Box } from '../src';

describe('makeBox', () => {
    it('stts', async () => {
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
        let ret = mp4box.makeBox('stts');
        //console.dir(ret);
        expect(ret).toEqual(Uint8Array.from([
	    0, 0, 0, 16,
            115, 116, 116, 115,
            0, 0, 0, 0, 0, 0, 0, 0
        ]));
    });
});
