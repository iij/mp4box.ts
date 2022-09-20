import { Mp4Box } from '../src';

describe('makeBox', () => {
    it('mfhd', async () => {
        // public type: "video" | "audio",
        // public trackId: number,
        // public sequenceNumber: number,
        // public duration: number,
        // public timescale: number,
        // public width: number,
        // public height: number,
        // public hPixelRatio: number,
        // public vPixelRatio: number,    
        // public sps: Uint8Array,
        // public pps: Uint8Array
        //    const mp4box =  new Mp4Box("video", 1, 16843009, 10, 90000, 256, 65535, 1, 1, Uint8Array.from([1, 2, 3, 4, 5, 6, 7, 8, 9]), Uint8Array.from([100, 200, 255]));
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
        //let ret = mp4box.makeBox('mfhd', ) as Uint8Array;
	const ret = mp4box.makeBox('mfhd', {
            seaquenceNumber: 16843009,
	}) as Uint8Array;
        //console.dir(ret);
        expect(ret).toEqual(Uint8Array.from([
            0, 0, 0, 16,
            109, 102, 104, 100,
            0, 0, 0, 0,
            1, 1, 1, 1,
        ]));
    });
});
