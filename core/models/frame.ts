class Camera {
	av			= '30';
	ah			= '-15';
	az			= '0';
	height 		= '1.0';
	distance	= '5.0';
}

class Specs {
	camera: Camera = new Camera;
	plan 	= '/images/frames/sketch-map.jpg';
}

export class Frame {
	title	= 'New Frame title...';
	descr	= 'New frames description...';
	key		= '';
	images: string[];
	specs:  Specs;

	constructor(){

		this.images = new Array('/images/frames/frame-thumbnail.jpg');
		this.specs = new Specs;

	}
}
