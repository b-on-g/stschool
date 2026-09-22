namespace $.$$ {

	export type $bog_stschool_board_stroke = { c: string, p: number[] }
	export type $bog_stschool_board_text = { x: number, y: number, t: string }
	export type $bog_stschool_board_data = { s: $bog_stschool_board_stroke[], t: $bog_stschool_board_text[] }

	const colors = {
		black: '#1a1a1a',
		red: '#d32f2f',
		blue: '#1565c0',
		green: '#2e7d32',
	} as Record< string, string >

	export class $bog_stschool_board extends $.$bog_stschool_board {

		@ $mol_mem
		data(): $bog_stschool_board_data {
			try {
				const parsed = JSON.parse( this.value() || '{}' )
				return { s: parsed.s ?? [], t: parsed.t ?? [] }
			} catch {
				return { s: [], t: [] }
			}
		}

		save( data: $bog_stschool_board_data ) {
			this.value( JSON.stringify( data ) )
		}

		@ $mol_mem
		draft( next?: $bog_stschool_board_stroke | null ) {
			return next ?? null
		}

		all_strokes() {
			const draft = this.draft()
			return [ ... this.data().s, ... draft ? [ draft ] : [] ]
		}

		strokes() {
			return this.all_strokes().map( ( stroke, index )=> this.Stroke( index ) )
		}

		@ $mol_mem_key
		stroke_geometry( index: number ) {
			const points = this.all_strokes()[ index ]?.p ?? []
			if( points.length < 2 ) return ''
			let path = `M ${ points[0] } ${ points[1] }`
			if( points.length === 2 ) path += ` L ${ points[0] } ${ points[1] }`
			for( let i = 2; i < points.length; i += 2 ) path += ` L ${ points[ i ] } ${ points[ i + 1 ] }`
			return path
		}

		@ $mol_mem_key
		stroke_color( index: number ) {
			return this.all_strokes()[ index ]?.c ?? colors.black
		}

		texts() {
			return this.data().t.map( ( text, index )=> this.Text( index ) )
		}

		@ $mol_mem_key
		text_x( index: number ) {
			return this.data().t[ index ]?.x ?? 0
		}

		@ $mol_mem_key
		text_y( index: number ) {
			return this.data().t[ index ]?.y ?? 0
		}

		text_value( index: number, next?: string ) {
			if( next === undefined ) return this.data().t[ index ]?.t ?? ''
			const data = this.data()
			const texts = data.t.map( ( text, i )=> i === index ? { ... text, t: next } : text )
			this.save({ ... data, t: texts })
			return next
		}

		point( event: PointerEvent | MouseEvent ) {
			const rect = this.Sheet().dom_node().getBoundingClientRect()
			return [ Math.round( event.clientX - rect.left ), Math.round( event.clientY - rect.top ) ]
		}

		down( event?: PointerEvent ) {
			if( !event || event.button !== 0 ) return
			if( ( event.target as HTMLElement ).tagName === 'TEXTAREA' ) return
			const [ x, y ] = this.point( event )
			const tool = this.tool()
			if( tool === 'pen' ) {
				this.Sheet().dom_node().setPointerCapture( event.pointerId )
				this.draft({ c: colors[ this.color() ] ?? colors.black, p: [ x, y ] })
			}
			if( tool === 'eraser' ) this.erase( x, y )
		}

		move( event?: PointerEvent ) {
			if( !event ) return
			const draft = this.draft()
			if( draft ) {
				const [ x, y ] = this.point( event )
				this.draft({ ... draft, p: [ ... draft.p, x, y ] })
				return
			}
			if( this.tool() === 'eraser' && event.buttons ) {
				const [ x, y ] = this.point( event )
				this.erase( x, y )
			}
		}

		up( event?: PointerEvent ) {
			const draft = this.draft()
			if( !draft ) return
			this.draft( null )
			const data = this.data()
			this.save({ ... data, s: [ ... data.s, draft ] })
		}

		erase( x: number, y: number ) {
			const data = this.data()
			const kept = data.s.filter( stroke => !this.hit( stroke, x, y ) )
			if( kept.length === data.s.length ) return
			this.save({ ... data, s: kept })
		}

		hit( stroke: $bog_stschool_board_stroke, x: number, y: number ) {
			for( let i = 0; i < stroke.p.length; i += 2 ) {
				if( Math.hypot( stroke.p[ i ] - x, stroke.p[ i + 1 ] - y ) < 12 ) return true
			}
			return false
		}

		text_add( event?: MouseEvent ) {
			if( !event ) return
			if( ( event.target as HTMLElement ).tagName === 'TEXTAREA' ) return
			const [ x, y ] = this.point( event )
			const data = this.data()
			const texts = [ ... data.t.filter( text => text.t.trim() ), { x, y, t: '' } ]
			this.save({ ... data, t: texts })
			this.Text( texts.length - 1 ).focused( true )
		}

		clear() {
			this.save({ s: [], t: [] })
		}

	}

}
