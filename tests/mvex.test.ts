import { Mp4Box } from '../src';

describe('makeBox', () => {
  it('mvex', async () => {
      //    const mp4box =  new Mp4Box("video", 1, 10, 90000, 256, 65535, 1, 1, Uint8Array.from([1, 2, 3, 4, 5, 6, 7, 8, 9]), Uint8Array.from([100, 200, 255]));
	const mp4box = new Mp4Box({
	    type: "video",
	    trackId: 1,
	    timescale: 90000,
	    width: 1,
	    height: 65281,
	    hPixelRatio: 10,
	    vPixelRatio: 20,
	    sps: Uint8Array.from([1, 2, 3, 4, 5, 6, 7, 8, 9]),
	    pps: Uint8Array.from([100, 200, 255]),      
	});
    await mp4box.load_boxes();
    const trex = mp4box.makeBox('trex') as Uint8Array;
    //console.log(trex);

      //    const mp4boy =  new Mp4Box("video", 2, 10, 90000, 256, 65535, 1, 1, Uint8Array.from([1, 2, 3, 4, 5, 6, 7, 8, 9]), Uint8Array.from([100, 200, 255]));
	const mp4boy = new Mp4Box({
	    type: "video",
	    trackId: 2,
	    timescale: 90000,
	    width: 1,
	    height: 65281,
	    hPixelRatio: 10,
	    vPixelRatio: 20,
	    sps: Uint8Array.from([1, 2, 3, 4, 5, 6, 7, 8, 9]),
	    pps: Uint8Array.from([100, 200, 255]),      
	});
    await mp4boy.load_boxes();
    const trey = mp4boy.makeBox('trex') as Uint8Array;
    
    const ret = mp4box.makeBox('mvex', undefined, trex, trey) as Uint8Array;
    //console.dir(ret);
    
    expect(ret.slice(0, 8)).toEqual(Uint8Array.from([
      0, 0, 0, 72,
      109, 118, 101, 120,
    ]));

    expect(ret.slice(8, 16)).toEqual(Uint8Array.from([
      0, 0, 0, 32,
      116, 114, 101, 120,
    ]));

    expect(ret.slice(40, 48)).toEqual(Uint8Array.from([
      0, 0, 0, 32,
      116, 114, 101, 120,
    ]));
  });
});

