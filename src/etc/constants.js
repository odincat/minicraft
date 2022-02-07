export const CHUNK_WIDTH_L2 = 4;
export const CHUNK_WIDTH_L2_T2 = CHUNK_WIDTH_L2 << 1;
export const CHUNK_WIDTH = 1 << CHUNK_WIDTH_L2;
export const CHUNK_HEIGHT = 64;
export const CHUNK_WIDTH_M1 = CHUNK_WIDTH - 1;
export const COORDINATE_OFFSET = 1 << 16;
export const COORDINATE_OFFSET_M1 = COORDINATE_OFFSET - 1;

export const BLOCK_TYPE_AIR = 0;
export const BLOCK_TYPE_STONE = 1;
export const BLOCK_TYPE_GRASS = 2;
export const BLOCK_TYPE_DIRT = 3;
export const BLOCK_TYPE_COBBLE = 4;
export const BLOCK_TYPE_PLANKS = 5;
export const BLOCK_TYPE_BEDROCK = 6;
export const BLOCK_TYPE_LOG = 7;
export const BLOCK_TYPE_LEAVES = 8;
export const BLOCK_TYPE_BRICKS = 9;
export const BLOCK_TYPE_WOOL = 10;

// B G R
export const BLOCK_COLORS = [
	0x000000, // VOID
	0x797979, // STONE
	0x52b77f, // GRASS
	0x395478, // DIRT
	0x828282, // COBBLE
	0x4d7b97, // PLANKS
	0x454545, // BEDROCK
	0x2f4d60, // LOG
	0x22822f, // LEAVES
	0x808cb8, // BRICKS
	0xd7d7d7, // WOOL
];

export const BLOCK_TYPE_FACE_LABELS = 'WEBTSN'.split('');
export const BLOCK_TYPE_FACE_W = 0;
export const BLOCK_TYPE_FACE_E = 1;
export const BLOCK_TYPE_FACE_B = 2;
export const BLOCK_TYPE_FACE_T = 3;
export const BLOCK_TYPE_FACE_S = 4;
export const BLOCK_TYPE_FACE_N = 5;

export const SKY_COLOR = 0xffb184;

export const PLAYER_FOCUS_DISTANCE = 5;
