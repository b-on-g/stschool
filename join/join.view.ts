namespace $.$$ {

	export class $bog_stschool_join extends $.$bog_stschool_join {

		auto() {
			if( !this.room().my_student_link() ) return
			this.$.$mol_state_arg.go({ join: null, group: this.link() })
		}

		room() {
			return $bog_stschool_room.of( this.link() )
		}

		group_title() {
			return this.room().title() || 'Группа'
		}

		ready() {
			return !!this.room().teacher_pass() && !!this.name().trim()
		}

		hint() {
			if( !this.room().teacher_pass() ) return 'Загружаем группу…'
			return `Вы входите в группу «${ this.group_title() }». Учитель увидит ваши ответы, остальные ученики нет.`
		}

		name( next?: string ) {
			return $bog_stschool_room.home().Name( next === undefined ? undefined : 'auto' )?.val( next ) ?? ''
		}

		enter() {
			$mol_wire_async( this ).join()
		}

		join() {
			const room = this.room()
			const link = this.link()
			const name = this.name().trim()
			const pass = $giper_baza_auth_pass.from( room.teacher_pass() )
			const land = this.$.$giper_baza_glob.land_grab([[ pass, $giper_baza_rank_post( 'just' ) ]])
			const student = land.Data( $bog_stschool_student )
			student.Name( 'auto' )!.val( name )
			student.Group( 'auto' )!.val( link )
			student.Replies( 'auto' )
			const member = room.roster()!.Members( 'auto' )!.make( null )
			member.Name( 'auto' )!.val( name )
			member.Land( 'auto' )!.val( land.link().str )
			$bog_stschool_room.home().Learn( 'auto' )!.key( link, 'auto' ).val( land.link().str )
			this.$.$mol_state_arg.go({ join: null, group: link })
		}

	}

}
