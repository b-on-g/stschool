namespace $.$$ {

	export type $bog_stschool_slides_step = { page: number } | { slide: string }

	export class $bog_stschool_slides extends $.$bog_stschool_slides {

		room() {
			return $bog_stschool_room.of( this.room_link() )
		}

		deck() {
			return this.room().deck( this.deck_link() )
		}

		file() {
			return this.deck()?.File()?.remote() ?? null
		}

		@ $mol_mem
		pdf() {
			return $bog_stschool_pdf.make({ bytes: ()=> this.file()?.buffer() ?? new Uint8Array })
		}

		slides() {
			return this.deck()?.Slides()?.remote_list() ?? []
		}

		slide( link: string ) {
			return this.slides().find( slide => slide.link().str === link ) ?? null
		}

		@ $mol_mem
		steps(): $bog_stschool_slides_step[] {
			const count = this.pdf().count()
			const slides = this.slides()
			const steps = [] as $bog_stschool_slides_step[]
			for( let page = 0; page <= count; ++ page ) {
				if( page ) steps.push({ page })
				for( const slide of slides ) {
					if( ( slide.After()?.val() ?? 0 ) === page ) steps.push({ slide: slide.link().str })
				}
			}
			return steps
		}

		@ $mol_mem
		pos( next?: number ) {
			const last = Math.max( 0, this.steps().length - 1 )
			return Math.min( Math.max( 0, next ?? 0 ), last )
		}

		step() {
			return this.steps()[ this.pos() ] ?? null
		}

		page() {
			const step = this.step()
			return step && 'page' in step ? step.page : 0
		}

		slide_link() {
			const step = this.step()
			return step && 'slide' in step ? step.slide : ''
		}

		page_uri() {
			return this.pdf().page_uri( this.page() )
		}

		slide_board( next?: string ) {
			return this.slide( this.slide_link() )?.Board( next === undefined ? undefined : 'auto' )?.val( next ) ?? ''
		}

		stage() {
			if( !this.file()?.buffer().byteLength ) return [ this.Wait() ]
			if( this.slide_link() ) return [ this.Slide() ]
			return [ this.Page() ]
		}

		numb() {
			return `${ this.pos() + 1 } / ${ this.steps().length }`
		}

		prev() {
			this.pos( this.pos() - 1 )
		}

		next() {
			this.pos( this.pos() + 1 )
		}

		keys_action() {
			return {
				left: ()=> this.prev(),
				right: ()=> this.next(),
			}
		}

		insert() {
			const after = this.page() || this.after_of( this.slide_link() )
			const slide = this.deck()!.Slides( 'auto' )!.make( null )
			slide.After( 'auto' )!.val( after )
			slide.Board( 'auto' )!.val( '' )
			this.pos( this.steps().findIndex( step => 'slide' in step && step.slide === slide.link().str ) )
		}

		after_of( link: string ) {
			return this.slide( link )?.After()?.val() ?? 0
		}

		remove() {
			const link = this.slide_link()
			if( !link ) return
			this.deck()!.Slides( 'auto' )!.cut( new $giper_baza_link( link ) )
			this.pos( this.pos() - 1 )
		}

	}

}
