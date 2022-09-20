import { Mp4Box } from '../src';

describe('makeBox', () => {
    it('pasp', async () => {
        //      const mp4box =  new Mp4Box(1, 10, 90000, 1, 1, 16909060, 4294967295, Uint8Array.from([1, 2, 3, 4]), Uint8Array.from([5, 6, 7, 8 ]));
        const mp4box = new Mp4Box({
            type: "video",
            trackId: 1,
            timescale: 90000,
            width: 256,
            height: 65535,
            hPixelRatio: 1,
            vPixelRatio: 16777216,
            sps: Uint8Array.from([1, 2, 3, 4, 5, 6, 7, 8, 9]),
            pps: Uint8Array.from([100, 200, 255]),      
        });
        await mp4box.load_boxes();
        let ret = mp4box.makeBox('pasp');
        //console.dir(ret);
        expect(ret).toEqual(Uint8Array.from([0, 0, 0, 16,
                                             112, 97, 115, 112,
                                             0, 0, 0, 1, 1, 0, 0, 0
                                            ]));
    });
});
