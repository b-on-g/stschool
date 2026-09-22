namespace $ {

	$mol_style_define( $bog_stschool_check, {
		Head: {
			align: { items: 'flex-end' },
			font: { weight: 'bold' },
		},
		Head_name: {
			flex: { basis: '12rem', shrink: 0 },
			padding: $mol_gap.block,
		},
		Head_item: {
			flex: { basis: '18rem', grow: 1 },
			padding: $mol_gap.block,
		},
		Student_row: {
			align: { items: 'stretch' },
			border: { top: { width: '1px', style: 'solid', color: $mol_theme.field } },
		},
		Student_name: {
			flex: { basis: '12rem', shrink: 0, direction: 'column' },
			padding: $mol_gap.block,
			font: { weight: 'bold' },
		},
		Cell: {
			flex: { basis: '18rem', grow: 1 },
		},
	})

}
