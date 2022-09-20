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
        expect(ret).toEqual(Uint8Array.from([0, 0, 0, 16,
                                             115, 116, 116, 115,
                                             0, 0, 0, 0, 0, 0, 0, 0
                                            ]));
    });

    it('makeBox contains a box', async () => {
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
        let child = Uint8Array.from([1, 2, 3, 4]);
        await mp4box.load_boxes();
        let ret = mp4box.makeBox('stts', undefined, child);
        //console.dir(ret);      
        expect(ret).toEqual(Uint8Array.from([0, 0, 0, 20,
                                             115, 116, 116, 115,
                                             0, 0, 0, 0, 0, 0, 0, 0,
                                             1, 2, 3, 4]));
    });

    it('makeBox contains some boxes', async () => {
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
        let child1 = Uint8Array.from([1, 2, 3, 4]);
        let child2 = Uint8Array.from([5, 6, 7, 8, 9, 10]);
        await mp4box.load_boxes();
        let ret = mp4box.makeBox('stts', undefined, child1, child2);
        //console.dir(ret);      
        expect(ret).toEqual(Uint8Array.from([0, 0, 0, 26,
                                             115, 116, 116, 115,
                                             0, 0, 0, 0, 0, 0, 0, 0,
                                             1, 2, 3, 4,
                                             5, 6, 7, 8, 9, 10]));
    });
});
