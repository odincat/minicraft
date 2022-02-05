import {
	Math_cos,
	Math_min,
	Math_sin,
} from '../etc/helpers.js';

export const player_create = () => ({
	accel_x: 0.0,
	accel_y: 0.0,
	accel_z: 0.0,
	position_x: 0.0,
	position_y: 10.0,
	position_z: 0.0,
	speed_x: 0.0,
	speed_y: 0.0,
	speed_z: 0.0,
	angle_h: 0.0,
	angle_v: 0.0,
	block_focus_x: 0,
	block_focus_y: -1,
	block_focus_z: 0,
	block_focus_face: 0,
});

export const player_tick = (model, delay) => {
	const time_factor = Math_min(5, delay * .01);

	model.speed_x -= model.speed_x * .1 * time_factor;
	model.speed_y -= model.speed_y * .1 * time_factor;
	model.speed_z -= model.speed_z * .1 * time_factor;

	model.speed_x += (
		Math_cos(model.angle_h) * model.accel_x +
		Math_sin(model.angle_h) * model.accel_z
	) * time_factor;
	model.speed_y += model.accel_y * time_factor;
	model.speed_z += (
		-Math_sin(model.angle_h) * model.accel_x +
		Math_cos(model.angle_h) * model.accel_z
	) * time_factor;

	model.position_x += model.speed_x * time_factor;
	model.position_y += model.speed_y * time_factor;
	model.position_z += model.speed_z * time_factor;
};
