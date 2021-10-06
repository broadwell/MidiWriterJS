import {Constants} from '../constants';
import {Utils} from '../utils.js';

/**
 * Holds all data for a "controller change" MIDI event
 * @param {object} fields {controllerNumber: integer, controllerValue: integer, delta: integer}
 * @return {ControllerChangeEvent}
 */
class ControllerChangeEvent {
	constructor(fields) {
		// Default fields values
		fields = Object.assign({
			wait: 0,
			startTick: null,
			delta: 0x00,
		}, fields);

		this.type = 'controller';
		this.fields = fields;
		this.startTick = fields.startTick;
		// delta time defaults to 0.
		this.data = Utils.numberToVariableLength(fields.delta).concat(Constants.CONTROLLER_CHANGE_STATUS, fields.controllerNumber, fields.controllerValue);
	}

	/**
	 * Builds int array for this event.
	 * @param {Track} track - parent track
	 * @return {ControllerChangeEvent}
	 */
	buildData(track, precisionDelta) {
		this.data = [];

		// Explicitly defined startTick event
		if (this.startTick) {
			this.tick = Utils.getRoundedIfClose(this.startTick);

			// If this is the first event in the track then use event's starting tick as delta.
			if (track.tickPointer == 0) {
				this.delta = this.tick;
			}

		} else {
			this.delta = Utils.getTickDuration(this.fields.wait);
			this.tick = Utils.getRoundedIfClose(track.tickPointer + this.delta);
		}

		this.deltaWithPrecisionCorrection = Utils.getRoundedIfClose(this.delta - precisionDelta);

		this.data = Utils.numberToVariableLength(0x00).concat(Constants.CONTROLLER_CHANGE_STATUS, this.fields.controllerNumber, this.fields.controllerValue);

		return this;
	}
}

export {ControllerChangeEvent};
