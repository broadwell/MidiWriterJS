import {Constants} from '../constants';
import {Utils} from '../utils';

/**
 * Holds all data for a "controller off" MIDI event
 * @param {object} fields {data: []}
 * @return {ControllerOffEvent}
 */
class ControllerOffEvent {
	constructor(fields) {
		// Set default fields
		fields = Object.assign({
			tick: null,
		}, fields);

		this.type 		= 'controller-off';
		this.duration 	= fields.duration;

		this.tick 		= fields.tick;
		this.delta 		= Utils.getTickDuration(this.duration);
		this.data 		= fields.data;
	}

	/**
	 * Builds int array for this event.
	 * @param {Track} track - parent track
	 * @return {ControllerOffEvent}
	 */
	buildData(track, precisionDelta) {
		if (this.tick === null) {
			this.tick = Utils.getRoundedIfClose(this.delta + track.tickPointer);
		}

		this.deltaWithPrecisionCorrection = Utils.getRoundedIfClose(this.delta - precisionDelta);

		this.data = Utils.numberToVariableLength(this.deltaWithPrecisionCorrection).concat(Constants.CONTROLLER_CHANGE_STATUS, this.fields.controllerNumber, this.fields.controllerValue);

		return this;
	}

}

export {ControllerOffEvent};
