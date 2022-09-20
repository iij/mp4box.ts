import { Mp4Box } from '../src';

describe('makeBox', () => {
    it('mvhd', async () => {
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
	const ret = mp4box.makeBox('mvhd', {
            duration: 60,
	}) as Uint8Array;
	expect(ret.slice(0, 8)).toEqual(Uint8Array.from([
	    0, 0, 0, 120,
	    109, 118, 104, 100,
	]));
	expect(ret.slice(8 + 20, 8 + 20 + 4)).toEqual(Uint8Array.from([
	    0, 1, 95, 144,
	]));
	expect(ret.slice(8 + 24, 8 + 24 + 8)).toEqual(Uint8Array.from([
	    0, 0, 0, 0, 0, 82, 101, 192,
	]));
	expect(ret.slice(8 + 32)).toEqual(Uint8Array.from([
	    0x00,
	    0x01,
	    0x00,
	    0x00, // 1.0 rate
	    0x01,
	    0x00, // 1.0 volume
	    0x00,
	    0x00, // reserved
	    0x00,
	    0x00,
	    0x00,
	    0x00, // reserved
	    0x00,
	    0x00,
	    0x00,
	    0x00, // reserved
	    0x00,
	    0x01,
	    0x00,
	    0x00,
	    0x00,
	    0x00,
	    0x00,
	    0x00,
	    0x00,
	    0x00,
	    0x00,
	    0x00,
	    0x00,
	    0x00,
	    0x00,
	    0x00,
	    0x00,
	    0x01,
	    0x00,
	    0x00,
	    0x00,
	    0x00,
	    0x00,
	    0x00,
	    0x00,
	    0x00,
	    0x00,
	    0x00,
	    0x00,
	    0x00,
	    0x00,
	    0x00,
	    0x40,
	    0x00,
	    0x00,
	    0x00, // transformation: unity matrix
	    0x00,
	    0x00,
	    0x00,
	    0x00,
	    0x00,
	    0x00,
	    0x00,
	    0x00,
	    0x00,
	    0x00,
	    0x00,
	    0x00,
	    0x00,
	    0x00,
	    0x00,
	    0x00,
	    0x00,
	    0x00,
	    0x00,
	    0x00,
	    0x00,
	    0x00,
	    0x00,
	    0x00, // pre_defined
	    0xff,
	    0xff,
	    0xff,
	    0xff, // next_track_ID
	]));
    });
});
