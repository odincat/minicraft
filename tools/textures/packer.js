import {PNG} from 'pngjs';
import {optimizeZopfliPngSync} from 'node-zopflipng';
import {
	readFileSync,
	writeFileSync,
} from 'fs';

const input_meta = JSON.parse(readFileSync('./blocks.json', 'utf8'));
const tiles_length = input_meta.tiles.length;
const {resolution} = input_meta;
console.log('metafile read, tiles:', tiles_length);

const input_resolution_log2 = Math.log2(resolution);
if (input_resolution_log2 % 1)
	throw new Error('resolution must be in 1, 2, 4, 8...');

const input_data = readFileSync('blocks.png');
console.log('input read, size:', input_data.length);

const input_png = PNG.sync.read(input_data);
console.log('input parsed, resolution:', input_png.width, input_png.height);

if (input_png.width !== resolution)
	throw new Error('wrong input width');
if (input_png.height !== resolution * tiles_length)
	throw new Error('wrong input height');

console.log('input size matches metafile');

const image_buffer = input_png.data;

const resolution_half = resolution >>> 1;
for (let texture = 0; texture < tiles_length; ++texture) {
	const texture_offset = texture << (input_resolution_log2 << 1);
	for (let row = 0; row < resolution_half; ++row) {
		const row_offset_a = (
			texture_offset |
			row << input_resolution_log2
		);
		const row_offset_b = (
			texture_offset |
			(resolution - 1 - row) << input_resolution_log2
		);
		for (let column = 0; column < resolution; ++column) {
			let index_a = (
				row_offset_a |
				column
			) << 2;
			let index_b = (
				row_offset_b |
				column
			) << 2;
			let tmp = image_buffer[index_a];
			image_buffer[index_a] = image_buffer[index_b];
			image_buffer[index_b] = tmp;
			tmp = image_buffer[++index_a];
			image_buffer[index_a] = image_buffer[++index_b];
			image_buffer[index_b] = tmp;
			tmp = image_buffer[++index_a];
			image_buffer[index_a] = image_buffer[++index_b];
			image_buffer[index_b] = tmp;
			tmp = image_buffer[++index_a];
			image_buffer[index_a] = image_buffer[++index_b];
			image_buffer[index_b] = tmp;
		}
	}
}

const output_png = new PNG({
	width: resolution ** 2,
	height: tiles_length,
});
output_png.data = image_buffer;

const transformed_data = PNG.sync.write(output_png);
console.log('transformed png generated, size:', transformed_data.length);

const transformed_data_optimized = optimizeZopfliPngSync(transformed_data, {
	lossyTransparent: true,
	lossy8bit: true,
	iterations: 1e3,
});
console.log('transformed png optimized, size:', transformed_data_optimized.length);

writeFileSync('../../assets/blocks.png', transformed_data_optimized);

let output_text = `// This file was automatically generated by packer.js

`;

let tiles_index = 0;
for (const tile of input_meta.tiles) {
	output_text += 'export const TILE_' + tile.toUpperCase() + ' = ' + tiles_index +  ';\n';
	++tiles_index;
}

output_text += `
export const TILES_RESOLUTION = ${resolution};
export const TILES_RESOLUTION_LOG2 = ${input_resolution_log2};
`;

writeFileSync('textures.js', output_text, 'utf8');
console.log('textures.js written');
