namespace $ {

	const cdn = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@4.10.38/build/'

	export type $bog_stschool_pdf_lib = {
		GlobalWorkerOptions: { workerSrc: string }
		getDocument( source: { data: Uint8Array } ): { promise: Promise< $bog_stschool_pdf_doc > }
	}

	export type $bog_stschool_pdf_doc = {
		numPages: number
		getPage( numb: number ): Promise< {
			getViewport( options: { scale: number } ): { width: number, height: number }
			render( options: { canvasContext: CanvasRenderingContext2D, viewport: unknown } ): { promise: Promise< void > }
		} >
	}

	export class $bog_stschool_pdf extends $mol_object {

		bytes(): Uint8Array {
			return new Uint8Array
		}

		@ $mol_mem
		lib() {
			const lib = this.$.$mol_import.module( cdn + 'pdf.min.mjs' ) as $bog_stschool_pdf_lib
			lib.GlobalWorkerOptions.workerSrc = cdn + 'pdf.worker.min.mjs'
			return lib
		}

		@ $mol_mem
		doc() {
			const bytes = this.bytes()
			if( !bytes.byteLength ) return null
			return $mol_wire_sync( this ).doc_load( this.lib(), bytes )
		}

		async doc_load( lib: $bog_stschool_pdf_lib, bytes: Uint8Array ) {
			return await lib.getDocument({ data: bytes.slice() }).promise
		}

		count() {
			return this.doc()?.numPages ?? 0
		}

		@ $mol_mem_key
		page_uri( numb: number ) {
			const doc = this.doc()
			if( !doc || numb < 1 || numb > doc.numPages ) return ''
			return $mol_wire_sync( this ).page_render( doc, numb )
		}

		async page_render( doc: $bog_stschool_pdf_doc, numb: number ) {
			const page = await doc.getPage( numb )
			const viewport = page.getViewport({ scale: 2 })
			const canvas = $mol_dom_context.document.createElement( 'canvas' )
			canvas.width = viewport.width
			canvas.height = viewport.height
			await page.render({ canvasContext: canvas.getContext( '2d' )!, viewport }).promise
			return canvas.toDataURL( 'image/png' )
		}

	}

}
