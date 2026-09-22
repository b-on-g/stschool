namespace $.$$ {

	export class $bog_stschool_study extends $.$bog_stschool_study {

		room() {
			return $bog_stschool_room.of( this.link() )
		}

		group_title() {
			return this.room().title() || 'Группа'
		}

		student_link() {
			return this.room().my_student_link()
		}

		current_link() {
			return this.room().current_link()
		}

		@ $mol_mem
		home_links() {
			return this.room().tasks()
				.filter( task => task.Home()?.val() && task.link().str !== this.current_link() )
				.map( task => task.link().str )
				.reverse()
		}

		@ $mol_mem_key
		home_link( link: string ) {
			return link
		}

		body_rows() {
			return [
				this.Current_head(),
				this.current_link() ? this.Current() : this.Nothing(),
				... this.home_links().length ? [ this.Home_head() ] : [],
				... this.home_links().map( link => this.Home_row( link ) ),
			]
		}

	}

}
