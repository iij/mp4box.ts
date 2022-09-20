type BoxTypeChar = "a" | "b" | "c" | "d" | "e" | "f" | "g" | "h" | "i" | "j" | "k" | "l" | "m" | "n" | "o" | "p" | "q" | "r" | "s" | "t" | "u" | "v" | "w" | "x" | "y" | "z";

export type Box = {
  size: Uint32Array,
  boxtype: [BoxTypeChar, BoxTypeChar, BoxTypeChar, BoxTypeChar],
};

function merge(a: Uint8Array, b: Uint8Array): Uint8Array {
  let merged = new Uint8Array(a.length + b.length);
  merged.set(a);
  merged.set(b, a.length);
  return merged;
}

import type {SampleParams, InitParams} from "./types";

export class Mp4Box {
  callbox: Record<string, (arg0: Mp4Box, arg1: SampleParams | SampleParams[] | undefined) => Uint8Array> = {};
  private boxes: Array<string> = [
    "avc1",
    "avcc",
    "btrt",
    "dinf",
    "dref",
    "ftyp",
    "hdlr",
    "mdhd",
    "mfhd",
    "mvex",
    "mvhd",
    "pasp",
    "sdtp",
    "smhd",
    "stts",
    "stsc",
    "stco",
    "stsz",
    "stsd",
    "tfdt",
    "tfhd",
    "tkhd",
    "trex",
    "trun",
    "vmhd",
  ];
  type: "video"|"audio";
  trackId: number;
  //duration: number;
  timescale: number;
  width: number;
  height: number;
  hPixelRatio: number;
  vPixelRatio: number;
  sps: Uint8Array;
  pps: Uint8Array;
  
  constructor(params: InitParams) {
    this.type = params.type;
    this.trackId = params.trackId;
    this.timescale = params.timescale;
    this.width = params.width;
    this.height = params.height;
    this.hPixelRatio = params.hPixelRatio;
    this.vPixelRatio = params.vPixelRatio;
    this.sps = params.sps;
    this.pps = params.pps;
  }
    
  async load_boxes() {
    //    let boxtype = "stts";
    for (let boxtype of this.boxes) {
      await import(`./boxes/${boxtype}`).
        then((box) => {
          this.callbox[boxtype] = box.make;          
        }).
        catch((err) => {
          console.error(err);
        });        
    }
  }

  makeInitSegment() {
  }

  _mergeForTest(a: Uint8Array, b: Uint8Array): Uint8Array {
    return merge(a, b);
  }

  makeBox(boxtype: string,
          params: SampleParams | SampleParams[] | undefined = undefined,
          ...boxes: Array<Uint8Array>): Uint8Array|undefined {
    let box: Uint8Array;
    if (boxtype.length != 4) {
      throw new Error("invalid box type");
    }
    try {
      box = this.callbox[boxtype](this, params);
    } catch(err) {
      console.error("call back error");
      return undefined;
    }

    if (boxes.length == 0) {
      return merge(this.makeBoxHeader(box.byteLength, boxtype), box);
    } else {
      let prev = undefined;
      for (let childbox of boxes) {
        if (prev === undefined) {
          prev = childbox;
          continue;
        }
        prev = merge(prev, childbox);
      }
      return merge(this.makeBoxHeader(box.byteLength + prev!.byteLength, boxtype),
                   merge(box, prev!));
    }
  }

  private makeBoxHeader(size: number, boxtype: string): Uint8Array {
    size += 8;
    const header = new Uint8Array(8);
    header[0] = (size >> 24) & 0xff;
    header[1] = (size >> 16) & 0xff;
    header[2] = (size >> 8) & 0xff;
    header[3] = size & 0xff;
    header[4] = boxtype.charCodeAt(0);
    header[5] = boxtype.charCodeAt(1);
    header[6] = boxtype.charCodeAt(2);
    header[7] = boxtype.charCodeAt(3);     
    return header;
  }
}
