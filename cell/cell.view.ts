namespace $.$$ {

	export class $bog_stschool_cell extends $.$bog_stschool_cell {

		room() {
			return $bog_stschool_room.of( this.room_link() )
		}

		replies() {
			return this.room().replies( this.student_link(), this.task_link(), this.item() )
		}

		last() {
			return this.replies().at( -1 ) ?? null
		}

		text() {
			return this.last()?.Text()?.val() ?? ''
		}

		mark( next?: string ) {
			return this.last()?.Mark( next === undefined ? undefined : 'auto' )?.val( next ) ?? ''
		}

		ok( next?: boolean ) {
			if( next !== undefined ) this.mark( next ? 'ok' : '' )
			return this.mark() === 'ok'
		}

		bad( next?: boolean ) {
			if( next !== undefined ) this.mark( next ? 'bad' : '' )
			return this.mark() === 'bad'
		}

		cell_sub() {
			if( !this.last() ) return [ this.Empty() ]
			return [
				this.Text(),
				this.Marks(),
				... this.replies().length > 1 ? [ this.History() ] : [],
			]
		}

		history_title() {
			return `ещё ${ this.replies().length - 1 }`
		}

		history() {
			return this.replies().slice( 0, -1 ).reverse().map( reply => this.History_row( reply.link().str ) )
		}

		reply( link: string ) {
			return this.replies().find( reply => reply.link().str === link ) ?? null
		}

		@ $mol_mem_key
		history_text( link: string ) {
			const reply = this.reply( link )
			return `${ reply?.Time()?.val()?.toString( 'hh:mm' ) ?? '' }  ${ reply?.Text()?.val() ?? '' }`
		}

		@ $mol_mem_key
		history_mark( link: string ) {
			return this.reply( link )?.Mark()?.val() ?? ''
		}

	}

}
