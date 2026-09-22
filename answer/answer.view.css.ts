namespace $ {

	$mol_style_define( $bog_stschool_answer, {
		gap: $mol_gap.block,
		padding: $mol_gap.block,
		Title: {
			font: { size: '1.3rem', weight: 'bold' },
		},
		Item_row: {
			flex: { direction: 'column' },
			gap: $mol_gap.space,
		},
		Item_last: {
			padding: $mol_gap.block,
			border: { radius: $mol_gap.round },
			background: { color: $mol_theme.field },
			'@': {
				bog_stschool_answer_mark: {
					ok: { background: { color: '#2e7d3233' } },
					bad: { background: { color: '#d32f2f33' } },
				},
			},
		},
		Item_key: {
			color: $mol_theme.shade,
		},
		History_row: {
			padding: $mol_gap.space,
			color: $mol_theme.shade,
			'@': {
				bog_stschool_answer_mark: {
					ok: { color: '#2e7d32' },
					bad: { color: '#d32f2f' },
				},
			},
		},
	})

}
