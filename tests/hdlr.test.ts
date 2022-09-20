import { Mp4Box } from '../src';

describe('makeBox', () => {
    it('hdlr', async () => {
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
	const ret = mp4box.makeBox('hdlr');    
	expect(ret).toEqual(Uint8Array.from([
	    0, 0, 0, 45,
	    104, 100, 108, 114,
	    0x00, // version 0
	    0x00,
	    0x00,
	    0x00, // flags
	    0x00,
	    0x00,
	    0x00,
	    0x00, // pre_defined
	    0x76,
	    0x69,
	    0x64,
	    0x65, // handler_type: 'vide'
	    0x00,
	    0x00,
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
	    0x56,
	    0x69,
	    0x64,
	    0x65,
	    0x6f,
	    0x48,
	    0x61,
	    0x6e,
	    0x64,
	    0x6c,
	    0x65,
	    0x72,
	    0x00, // name: 'VideoHandler'
	]));
    });
    it('hdlr2', async () => {
        const mp4box = new Mp4Box({
            type: "audio",
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
	const ret = mp4box.makeBox('hdlr');    
	expect(ret).toEqual(Uint8Array.from([
	    0, 0, 0, 45,
	    104, 100, 108, 114,
	    0x00, // version 0
	    0x00,
	    0x00,
	    0x00, // flags
	    0x00,
	    0x00,
	    0x00,
	    0x00, // pre_defined
	    0x73,
	    0x6f,
	    0x75,
	    0x6e, // handler_type: 'soun'
	    0x00,
	    0x00,
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
	    0x53,
	    0x6f,
	    0x75,
	    0x6e,
	    0x64,
	    0x48,
	    0x61,
	    0x6e,
	    0x64,
	    0x6c,
	    0x65,
	    0x72,
	    0x00, // name: 'SoundHandler'
	]));
    });  
});
