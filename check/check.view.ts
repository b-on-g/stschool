namespace $.$$ {

	export class $bog_stschool_check extends $.$bog_stschool_check {

		room() {
			return $bog_stschool_room.of( this.link() )
		}

		group_title() {
			return `Проверка: ${ this.room().title() || 'Группа' }`
		}

		task_options() {
			return this.room().task_links().slice().reverse()
		}

		@ $mol_mem
		task_dictionary() {
			const dict = {} as Record< string, string >
			for( const task of this.room().tasks() ) dict[ task.link().str ] = task.Title()?.val() ?? ''
			return dict
		}

		@ $mol_mem
		task_link( next?: string ) {
			return next ?? this.room().current_link() ?? this.task_options()[0] ?? ''
		}

		items() {
			return this.room().items( this.task_link() )
		}

		students() {
			return this.room().member_links()
		}

		body_rows() {
			return [ this.students().length ? this.Grid() : this.Nobody() ]
		}

		grid_rows() {
			return [
				this.Grid_head(),
				... this.students().map( student => this.Student_row( student ) ),
			]
		}

		head_cells() {
			return [
				this.Head_name(),
				... this.items().map( ( item, index )=> this.Head_item( index ) ),
			]
		}

		@ $mol_mem_key
		item_text( index: number ) {
			return `${ index + 1 }. ${ this.items()[ index ]?.Text()?.val() ?? '' }`
		}

		@ $mol_mem_key
		student_cells( student: string ) {
			return [
				this.Student_name( student ),
				... this.items().map( ( item, index )=> this.Cell( `${ student }|${ index }` ) ),
			]
		}

		@ $mol_mem_key
		student_name( student: string ) {
			return this.room().member_names().get( student ) ?? ''
		}

		@ $mol_mem_key
		student_sent( student: string ) {
			const sent = this.room().sent( student, this.task_link() )
			return sent ? `сдано ${ sent.toString( 'DD.MM hh:mm' ) }` : ''
		}

		@ $mol_mem_key
		cell_student( key: string ) {
			return key.slice( 0, key.lastIndexOf( '|' ) )
		}

		@ $mol_mem_key
		cell_item( key: string ) {
			return Number( key.slice( key.lastIndexOf( '|' ) + 1 ) )
		}

	}

}
