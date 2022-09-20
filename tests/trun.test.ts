import { Mp4Box } from '../src';

describe('makeBox', () => {
  it('trun', async () => {
    const mp4box = new Mp4Box({
      type: "video",
      trackId: 1,
      timescale: 90000,
//      duration: 10,
      width: 1,
      height: 1,
      hPixelRatio: 10,
      vPixelRatio: 20,
      sps: Uint8Array.from([0]),
      pps: Uint8Array.from([0]),      
    });
      
    await mp4box.load_boxes();
      let ret = mp4box.makeBox('trun', [
	  {
	      duration: 1,
	      size: 0,
	      cts: 10,
	      flags: {
		  isLeading: 3,
		  dependsOn: 3,
		  isDependedOn: 3,
		  hasRedundancy: 3,
		  paddingValue: 0,
		  isNonSync: 0,
		  degradation_priority: 0,
	      },
	  },
	  {
	      duration: 3,
	      size: 0,
	      cts: 10,
	      flags: {
		  isLeading: 3,
		  dependsOn: 3,
		  isDependedOn: 3,
		  hasRedundancy: 3,
		  paddingValue: 0,
		  isNonSync: 0,
		  degradation_priority: 0,
	      },
	  },
	  {
	      duration: 2,
	      size: 4294967295,
	      cts: 65793,
	      flags: {
		  isLeading: 0,
		  dependsOn: 1,
		  isDependedOn: 0,
		  hasRedundancy: 0,
		  paddingValue: 0,
		  isNonSync: 1,
		  degradation_priority: 0,
	      },
	  },
	  
      ]) as Uint8Array;
      
      //console.dir(ret);
      
      expect(ret.slice(0, 8)).toEqual(Uint8Array.from([
	  0, 0, 0, 68,
      116, 114, 117, 110,
      ]));
      expect(ret.slice(-16)).toEqual(Uint8Array.from([
	  0, 0, 0, 2,         // duration
	  255, 255, 255, 255, // size
	  1, 1, 0, 0,
	  0, 1, 1, 1, 
      ]));
  });
});

