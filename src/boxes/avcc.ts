import { Mp4Box } from "../";
import { SampleParams } from "../types";

function pack(data: Uint8Array): Uint8Array {
  const len = Uint8Array.from([(data.byteLength >>> 8) & 0xff,
                              data.byteLength & 0xff]);
  return Uint8Array.from([...len,
                          ...data]);
}

export function make(mp4box: Mp4Box, params: SampleParams | SampleParams[] | undefined = undefined): Uint8Array {
  const sps = pack(mp4box.sps);
  const pps = pack(mp4box.pps);
  return new Uint8Array([
    0x01, // version
    sps[3],
    sps[4],
    sps[5],
    0xfc | 3,
    0xe0 | mp4box.sps.byteLength,
    ...sps,
    mp4box.pps.length,
    ...pps
  ]);
}
