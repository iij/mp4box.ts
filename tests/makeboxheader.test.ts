import { Mp4Box } from '../src';

describe('makeBoxHeader', () => {
    it('normal path', () => {
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
	let ret = (mp4box as any).makeBoxHeader(65535 - 8, 'ftyp');
	expect(ret).toEqual(Uint8Array.from([0, 0, 255, 255, 102, 116, 121, 112]));
    });

    it('merge', () => {
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
	let ret = mp4box._mergeForTest(Uint8Array.from([0, 1, 2, 3, 4]),
				       Uint8Array.from([5, 6, 7, 8, 9]));
	expect(ret).toEqual(Uint8Array.from([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]));
    });
});
