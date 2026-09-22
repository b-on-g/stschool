namespace $.$$ {

	export class $bog_stschool_teach extends $.$bog_stschool_teach {

		room() {
			return $bog_stschool_room.of( this.link() )
		}

		group_title( next?: string ) {
			return this.room().title( next ) || ( next === undefined ? 'Группа' : '' )
		}

		invite_uri() {
			const base = this.$.$mol_state_arg.href_normal().replace( /#.*$/, '' )
			return base + this.$.$mol_state_arg.make_link({ join: this.link(), group: null, screen: null })
		}

		task_rows() {
			return this.room().task_links().slice().reverse().map( link => this.Task_row( link ) )
		}

		@ $mol_mem_key
		task_link( link: string ) {
			return link
		}

		task_add() {
			const room = this.room()
			const task = room.data().Tasks( 'auto' )!.make( null )
			task.Title( 'auto' )!.val( `Задание ${ room.task_links().length + 1 }` )
			task.Created( 'auto' )!.val( new $mol_time_moment() )
			const item = task.Items( 'auto' )!.make( null )
			item.Text( 'auto' )!.val( '' )
			room.current_link( task.link().str )
		}

		deck_rows() {
			return this.room().decks().map( deck => this.Deck_row( deck.link().str ) )
		}

		deck_title( link: string, next?: string ) {
			return this.room().deck( link )?.Title( next === undefined ? undefined : 'auto' )?.val( next ) ?? ''
		}

		deck_drop( link: string ) {
			this.room().data().Decks( 'auto' )!.cut( new $giper_baza_link( link ) )
		}

		deck_files( next?: readonly File[] ) {
			if( !next?.length ) return []
			$mol_wire_async( this ).deck_save( next[0] )
			return []
		}

		deck_save( file: File ) {
			const deck = this.room().data().Decks( 'auto' )!.make( null )
			deck.Title( 'auto' )!.val( file.name.replace( /\.pdf$/i, '' ) )
			const store = deck.File( 'auto' )!.ensure([[ null, $giper_baza_rank_read ]])
			store.blob( file )
			deck.File( 'auto' )!.remote( store )
			deck.Slides( 'auto' )
		}

		member_rows() {
			return this.room().member_links().map( link => this.Member_row( link ) )
		}

		members_name() {
			return `Ученики: ${ this.room().member_links().length }`
		}

		@ $mol_mem_key
		member_name( link: string ) {
			return this.room().member_names().get( link ) ?? ''
		}

	}

}
