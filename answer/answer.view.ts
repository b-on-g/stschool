namespace $.$$ {

	export class $bog_stschool_answer extends $.$bog_stschool_answer {

		room() {
			return $bog_stschool_room.of( this.room_link() )
		}

		task() {
			return this.room().task( this.task_link() )
		}

		student() {
			return this.room().student( this.student_link() )
		}

		task_title() {
			return this.task()?.Title()?.val() ?? ''
		}

		is_home() {
			return this.task()?.Home()?.val() ?? false
		}

		sent() {
			return this.room().sent( this.student_link(), this.task_link() )
		}

		sent_text() {
			const sent = this.sent()
			return sent ? `Сдано ${ sent.toString( 'DD.MM hh:mm' ) }, ниже ответы из ключа` : ''
		}

		items() {
			return this.room().items( this.task_link() )
		}

		answer_rows() {
			return [
				this.Title(),
				... this.items().map( ( item, index )=> this.Item_row( index ) ),
				... this.is_home() ? [ this.sent() ? this.Sent() : this.Send() ] : [],
			]
		}

		@ $mol_mem_key
		item_sub( index: number ) {
			return [
				this.Item_text( index ),
				... this.item_last( index ) ? [ this.Item_last( index ) ] : [],
				... this.sent() && this.item_key( index ) ? [ this.Item_key( index ) ] : [],
				this.Item_input( index ),
				... this.replies( index ).length > 1 ? [ this.Item_history( index ) ] : [],
			]
		}

		@ $mol_mem_key
		item_text( index: number ) {
			return `${ index + 1 }. ${ this.items()[ index ]?.Text()?.val() ?? '' }`
		}

		@ $mol_mem_key
		item_key( index: number ) {
			const key = this.items()[ index ]?.Key()?.val() ?? ''
			return key ? `Ключ: ${ key }` : ''
		}

		replies( index: number ) {
			return this.room().replies( this.student_link(), this.task_link(), index )
		}

		@ $mol_mem_key
		item_last( index: number ) {
			return this.replies( index ).at( -1 )?.Text()?.val() ?? ''
		}

		@ $mol_mem_key
		item_mark( index: number ) {
			return this.replies( index ).at( -1 )?.Mark()?.val() ?? ''
		}

		@ $mol_mem_key
		item_draft( index: number, next?: string ) {
			return next ?? ''
		}

		item_send( index: number ) {
			const text = this.item_draft( index ).trim()
			if( !text ) return
			const student = this.student()
			this.replies( index )
			const reply = student.Replies( 'auto' )!.make( null )
			reply.Task( 'auto' )!.val( this.task_link() )
			reply.Item( 'auto' )!.val( index )
			reply.Text( 'auto' )!.val( text )
			reply.Time( 'auto' )!.val( new $mol_time_moment() )
			this.item_draft( index, '' )
		}

		@ $mol_mem_key
		item_history( index: number ) {
			return this.replies( index ).slice( 0, -1 ).reverse().map( reply => this.History_row( reply.link().str ) )
		}

		reply( link: string ) {
			return ( this.student().Replies()?.remote_list() ?? [] ).find( reply => reply.link().str === link ) ?? null
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

		send() {
			this.student().Sent( 'auto' )!.key( this.task_link(), 'auto' ).val( new $mol_time_moment() )
		}

	}

}
