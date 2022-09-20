#!/usr/bin/env node

import { Mp4Box } from '../';

const mp4box = new Mp4Box({
  type: "video",
  trackId: 1,
  timescale: 90000000,
  width: 10,
  height: 20,
  hPixelRatio: 16,
  vPixelRatio: 16,
  sps: Uint8Array.from([0]),
  pps: Uint8Array.from([0]),
});
(async () => {
  await mp4box.load_boxes();
  const stts = mp4box.makeBox('stts');
  console.dir(stts);
})();
