namespace $.$$ {

	export class $bog_stschool_app extends $.$bog_stschool_app {

		static {
			$giper_baza_yard.masters_default.length = 0
		}

		auto() {
			this.home()
		}

		home() {
			return $bog_stschool_room.home()
		}

		name( next?: string ) {
			return this.home().Name( next === undefined ? undefined : 'auto' )?.val( next ) ?? ''
		}

		join_link() {
			return this.$.$mol_state_arg.value( 'join' ) ?? ''
		}

		group_link_current() {
			return this.$.$mol_state_arg.value( 'group' ) ?? ''
		}

		screen() {
			return this.$.$mol_state_arg.value( 'screen' ) ?? ''
		}

		room() {
			return $bog_stschool_room.of( this.group_link_current() )
		}

		screens() {
			const group = this.group_link_current()
			if( group && this.screen() === 'stream' ) return [ this.Stream() ]
			if( group && this.screen() === 'check' ) return [ this.Check() ]
			return [ this.Book() ]
		}

		pages() {
			const join = this.join_link()
			const group = this.group_link_current()
			return [
				this.Home(),
				... join ? [ this.Join() ] : [],
				... group ? [ this.room().am_teacher() ? this.Teach_page() : this.Study() ] : [],
			]
		}

		teach_links() {
			return this.home().Teach()?.items() ?? []
		}

		learn_links() {
			return this.home().Learn()?.keys().map( String ) ?? []
		}

		teach_rows() {
			return this.teach_links().map( link => this.Teach_link( link ) )
		}

		learn_rows() {
			return this.learn_links().map( link => this.Learn_link( link ) )
		}

		@ $mol_mem_key
		group_title( link: string ) {
			return $bog_stschool_room.of( link ).title() || 'Группа'
		}

		@ $mol_mem_key
		group_link( link: string ) {
			return link
		}

		group_add() {
			$mol_wire_async( this ).group_make()
		}

		group_make() {
			const glob = this.$.$giper_baza_glob
			const roster = glob.land_grab([[ null, $giper_baza_rank_post( 'just' ) ]])
			const land = glob.land_grab([[ null, $giper_baza_rank_read ]])
			const group = land.Data( $bog_stschool_group )
			group.Title( 'auto' )!.val( `Группа ${ this.teach_links().length + 1 }` )
			group.Teacher( 'auto' )!.val( this.$.$giper_baza_auth.current().pass().toString() )
			group.Roster( 'auto' )!.val( roster.link().str )
			roster.Data( $bog_stschool_roster ).Members( 'auto' )
			this.home().Teach( 'auto' )!.add( land.link().str )
			this.$.$mol_state_arg.value( 'group', land.link().str )
		}

	}

}
