namespace $.$$ {

	export class $bog_stschool_edit extends $.$bog_stschool_edit {

		room() {
			return $bog_stschool_room.of( this.room_link() )
		}

		task() {
			return this.room().task( this.task_link() )
		}

		task_title( next?: string ) {
			return this.task()?.Title( next === undefined ? undefined : 'auto' )?.val( next ) ?? ''
		}

		current( next?: boolean ) {
			if( next !== undefined ) this.room().current_link( next ? this.task_link() : '' )
			return this.room().current_link() === this.task_link()
		}

		home( next?: boolean ) {
			return this.task()?.Home( next === undefined ? undefined : 'auto' )?.val( next ) ?? false
		}

		items() {
			return this.room().items( this.task_link() )
		}

		item_rows() {
			return this.items().map( item => this.Item_row( item.link().str ) )
		}

		item( link: string ) {
			return this.items().find( item => item.link().str === link ) ?? null
		}

		@ $mol_mem_key
		item_numb( link: string ) {
			return String( this.items().findIndex( item => item.link().str === link ) + 1 )
		}

		item_text( link: string, next?: string ) {
			return this.item( link )?.Text( next === undefined ? undefined : 'auto' )?.val( next ) ?? ''
		}

		item_key( link: string, next?: string ) {
			return this.item( link )?.Key( next === undefined ? undefined : 'auto' )?.val( next ) ?? ''
		}

		item_add() {
			const item = this.task()!.Items( 'auto' )!.make( null )
			item.Text( 'auto' )!.val( '' )
		}

	}

}
