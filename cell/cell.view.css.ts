namespace $ {

	$mol_style_define( $bog_stschool_cell, {
		flex: { direction: 'column' },
		padding: $mol_gap.block,
		'@': {
			bog_stschool_cell_mark: {
				ok: { background: { color: '#2e7d3222' } },
				bad: { background: { color: '#d32f2f22' } },
			},
		},
		Text: {
			font: { size: '1.1rem' },
		},
		Marks: {
			gap: $mol_gap.space,
		},
		History_row: {
			padding: $mol_gap.space,
			color: $mol_theme.shade,
			'@': {
				bog_stschool_cell_mark: {
					ok: { color: '#2e7d32' },
					bad: { color: '#d32f2f' },
				},
			},
		},
	})

}
