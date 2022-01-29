import {ControllerOnEvent} from './controller-on-event';
import {ControllerOffEvent} from './controller-off-event';
import {Utils} from '../utils.js';

/**
 * Wrapper for controllerOnEvent/controllerOffEvent objects that builds both events.
 * @param {object} fields {controllerNumber: integer, controllerValue: integer, delta: integer, duration: '4', wait: '4'}
 * @return {ControllerChangeEvent}
 */
class ControllerEvent {
	constructor(fields) {
		// Set default fields
		fields = Object.assign({
			delta: 0x00,
			startTick: null,
			wait: 0,
		}, fields);

		this.fields = fields;
		// delta time defaults to 0.
		this.data 		= [];
		this.type 		= 'controller';

		this.duration 	= fields.duration;
		this.startTick	= fields.startTick;
		this.wait 		= fields.wait;

		this.tickDuration = Utils.getTickDuration(this.duration);
		this.restDuration = Utils.getTickDuration(this.wait);

		this.events 	= []; // Hold actual ControllerOn/ConrollerOff events
	}

	/**
	 * Builds int array for this event.
	 * @return {NoteEvent}
	 */
	buildData() {
		// Reset data array
		this.data = [];

		var controllerOnNew = new ControllerOnEvent({
			startTick: this.startTick,
			controllerNumber: this.fields.controllerNumber,
			conrollerValue: this.fields.controllerValue, // XXX Should be just 127 ???
		});

		var controllerOffNew = new ControllerOffEvent({
			duration: this.duration,
			controllerNumber: this.fields.controllerNumber,
			controllerValue: 0x00, // XXX OK???
		});

		this.events.push(controllerOnNew, controllerOffNew);

		return this;
	}
}

export {ControllerEvent};
