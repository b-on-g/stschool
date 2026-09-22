namespace $.$$ {

	export class $bog_stschool_stream extends $.$bog_stschool_stream {

		room() {
			return $bog_stschool_room.of( this.link() )
		}

		task() {
			return this.room().current()
		}

		task_title() {
			return this.task()?.Title()?.val() ?? ''
		}

		items() {
			return this.room().items( this.room().current_link() )
		}

		task_sub() {
			if( !this.task() ) return []
			return [
				this.Task_title(),
				... this.items().map( ( item, index )=> this.Task_item( index ) ),
			]
		}

		@ $mol_mem_key
		task_item( index: number ) {
			return `${ index + 1 }. ${ this.items()[ index ]?.Text()?.val() ?? '' }`
		}

		@ $mol_mem
		tab_options() {
			const options = { board: 'Доска' } as Record< string, string >
			for( const deck of this.room().decks() ) options[ deck.link().str ] = deck.Title()?.val() || 'PDF'
			return options
		}

		@ $mol_mem_key
		deck_link( link: string ) {
			return link
		}

		stage() {
			const tab = this.tab()
			if( tab === 'board' || !this.room().deck( tab ) ) return [ this.Board() ]
			return [ this.Slides( tab ) ]
		}

		board( next?: string ) {
			return this.room().board( next )
		}

	}

}
