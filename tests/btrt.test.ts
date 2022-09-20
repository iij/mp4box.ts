import { Mp4Box } from '../src';

describe('makeBox', () => {
    it('stts', async () => {
        // const mp4box =  new Mp4Box(1, 10, 90000, 1, 1, 1, 1, Uint8Array.from([1, 2, 3, 4]), Uint8Array.from([5, 6, 7, 8 ]));
	const mp4box = new Mp4Box({
	    type: "video",
	    trackId: 1,
	    timescale: 90000,
	    width: 1,
	    height: 65281,
	    hPixelRatio: 10,
	    vPixelRatio: 20,
	    sps: Uint8Array.from([1, 2, 3, 4]),
	    pps: Uint8Array.from([5, 6, 7, 8]),      
	});
        await mp4box.load_boxes();
        let ret = mp4box.makeBox('btrt');
        //console.dir(ret);
        expect(ret!.slice(0, 8)).toEqual(Uint8Array.from([
            0, 0, 0, 20,
            98, 116, 114, 116,
        ]));
    });
});
