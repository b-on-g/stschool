namespace $ {

	export class $bog_stschool_room extends $mol_object {

		@ $mol_mem_key
		static of( link: string ) {
			return this.make({ link: $mol_const( link ) })
		}

		link() {
			return ''
		}

		static land_of( link: string ) {
			const land = this.$.$giper_baza_glob.Land( new $giper_baza_link( link ) )
			try { land.sync() }
			catch( error ) { if( !$mol_promise_like( error ) ) throw error }
			return land
		}

		static home() {
			return this.$.$giper_baza_glob.home().land().Data( $bog_stschool_home )
		}

		static my_lord() {
			return this.$.$giper_baza_auth.current().pass().lord().str
		}

		land() {
			return $bog_stschool_room.land_of( this.link() )
		}

		data() {
			return this.land().Data( $bog_stschool_group )
		}

		title( next?: string ) {
			return this.data().Title( next === undefined ? undefined : 'auto' )?.val( next ) ?? ''
		}

		teacher_pass() {
			return this.data().Teacher()?.val() ?? ''
		}

		roster() {
			const link = this.data().Roster()?.val() ?? ''
			if( !link ) return null
			return $bog_stschool_room.land_of( link ).Data( $bog_stschool_roster )
		}

		members() {
			return this.roster()?.Members()?.remote_list() ?? []
		}

		@ $mol_mem
		member_links() {
			return this.members().map( member => member.Land()?.val() ?? '' ).filter( Boolean )
		}

		@ $mol_mem
		member_names() {
			const names = new Map< string, string >()
			for( const member of this.members() ) {
				const land = member.Land()?.val() ?? ''
				if( land ) names.set( land, member.Name()?.val() ?? '' )
			}
			return names
		}

		tasks() {
			return this.data().Tasks()?.remote_list() ?? []
		}

		@ $mol_mem
		task_links() {
			return this.tasks().map( task => task.link().str )
		}

		task( link: string ) {
			return this.tasks().find( task => task.link().str === link ) ?? null
		}

		current_link( next?: string ) {
			return this.data().Current( next === undefined ? undefined : 'auto' )?.val( next ) ?? ''
		}

		current() {
			return this.task( this.current_link() )
		}

		items( task: string ) {
			return this.task( task )?.Items()?.remote_list() ?? []
		}

		decks() {
			return this.data().Decks()?.remote_list() ?? []
		}

		deck( link: string ) {
			return this.decks().find( deck => deck.link().str === link ) ?? null
		}

		board( next?: string ) {
			return this.data().Board( next === undefined ? undefined : 'auto' )?.val( next ) ?? ''
		}

		student( link: string ) {
			return $bog_stschool_room.land_of( link ).Data( $bog_stschool_student )
		}

		replies( student: string, task: string, item: number ) {
			return ( this.student( student ).Replies()?.remote_list() ?? [] )
				.filter( reply => reply.Task()?.val() === task && ( reply.Item()?.val() ?? 0 ) === item )
				.sort( ( a, b )=> ( a.Time()?.val()?.valueOf() ?? '' ) < ( b.Time()?.val()?.valueOf() ?? '' ) ? -1 : 1 )
		}

		reply_last( student: string, task: string, item: number ) {
			return this.replies( student, task, item ).at( -1 ) ?? null
		}

		sent( student: string, task: string ) {
			return this.student( student ).Sent()?.key( task )?.val() ?? null
		}

		am_teacher() {
			return ( $bog_stschool_room.home().Teach()?.items() ?? [] ).includes( this.link() )
		}

		my_student_link() {
			return $bog_stschool_room.home().Learn()?.key( this.link() )?.val() ?? ''
		}

	}

}
