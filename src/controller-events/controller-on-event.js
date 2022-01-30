import {Constants} from '../constants';
import {Utils} from '../utils';

/**
 * Holds all data for a "controller on" MIDI event
 * @param {object} fields {data: []}
 * @return {ControllerOnEvent}
 */
class ControllerOnEvent {
	constructor(fields) {
		// Set default fields
		fields = Object.assign({
			startTick: null,
			data: null,
			wait: 0,
		}, fields);

		this.type 		= 'controller-on';
		this.startTick 	= fields.startTick;
		this.controllerNumber = fields.controllerNumber;
		this.controllerValue = fields.controllerValue;

		this.wait 		= fields.wait;
		this.tick 		= null;
		this.delta 		= null;
		this.data 		= fields.data;
	}

	/**
	 * Builds int array for this event.
	 * @param {Track} track - parent track
	 * @return {ControllerOnEvent}
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
			this.delta = Utils.getTickDuration(this.wait);
			this.tick = Utils.getRoundedIfClose(track.tickPointer + this.delta);
		}

		this.deltaWithPrecisionCorrection = Utils.getRoundedIfClose(this.delta - precisionDelta);

		this.data = Utils.numberToVariableLength(this.deltaWithPrecisionCorrection).concat(Constants.CONTROLLER_CHANGE_STATUS, this.controllerNumber, this.controllerValue);

		return this;
	}

}

export {ControllerOnEvent};
