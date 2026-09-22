namespace $ {

	$mol_test({

		'board keeps strokes and texts in value'() {
			const board = new $$.$bog_stschool_board
			board.value( '' )
			board.save({ s: [ { c: '#1a1a1a', p: [ 1, 2, 3, 4 ] } ], t: [ { x: 10, y: 20, t: 'hi' } ] })
			$mol_assert_equal( board.stroke_geometry( 0 ), 'M 1 2 L 3 4' )
			$mol_assert_equal( board.text_value( 0 ), 'hi' )
		},

	})

}
