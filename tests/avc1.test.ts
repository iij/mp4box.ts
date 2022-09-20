import { Mp4Box } from '../src';

describe('makeBox', () => {
    it('avc1', async () => {
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
	let ret = mp4box.makeBox('avc1');
	//console.dir(ret);
	expect(ret!.slice(0, 8)).toEqual(Uint8Array.from([
            0, 0, 0, 76,
            97, 118, 99, 49,
	]));
	expect(ret!.slice(8 + 12, 8 + 24)).toEqual(Uint8Array.from([
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	]));
	// width
	expect(ret!.slice(8 + 24, 8 + 24 + 2)).toEqual(Uint8Array.from([
            0, 1,
	]));
	// height      
	expect(ret!.slice(8 + 26, 8 + 26 + 2)).toEqual(Uint8Array.from([
            255, 1,
	]));
	expect(ret!.slice(8 + 42, 8 + 42 + 8)).toEqual(Uint8Array.from([
            8, 105, 105, 106, 115, 104, 111, 116,
	]));
    });
});

