import { Mp4Box } from '../src';

describe('makeBox', () => {
  it('mdhd', async () => {
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
    const ret = mp4box.makeBox('mdhd', {
      duration: 60,
    }) as Uint8Array;
    expect(ret.slice(0, 8)).toEqual(Uint8Array.from([
      0, 0, 0, 44,
      109, 100, 104, 100,
    ]));
    expect(ret.slice(8 + 20, 8 + 20 + 4)).toEqual(Uint8Array.from([
      0, 1, 95, 144, // 90000 hz
    ]));
    expect(ret.slice(8 + 24, 8 + 24 + 8)).toEqual(Uint8Array.from([
      0, 0, 0, 0,
      0, 82, 101, 192, // duration 60
    ]));
  });
});
