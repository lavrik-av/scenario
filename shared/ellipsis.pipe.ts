import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: 'ellipsis' })
export class EllipsisPipe implements PipeTransform {

	transform( text: string, length?: number ){

		if ( text ) {
		
			if ( text.length > length ) {
			
				return text.substr( 0, (length) ? length : 8 ) + '...';
			
			}
			else {
			
				return text;
			
			}
			
		} 
		else {
		
			return text;
		
		}
		
	}

}

@Pipe({ name : 'noquotes' })
export class NoquotesPipe implements PipeTransform {

	transform( text: string ){

		var newText = text.replace(/\"/g, "");
		return newText;

	}

}