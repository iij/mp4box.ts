import { Mp4Box } from '../src';

describe('Mp4Box invalid', () => {
    it('exception', () => {
        //const log = jest.spyOn(console, 'log').mockReturnValue();    
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
	expect(() => { mp4box.makeBox('xxxxx')}).toThrowError(/invalid box type/);
        //log.mockRestore();    
    });
    
    it('exception', () => {
//        const log = jest.spyOn(console, 'log').mockReturnValue();
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
	expect(() => { mp4box.makeBox('xxx')}).toThrowError(/invalid box type/);
//        log.mockRestore();    
    });
});

