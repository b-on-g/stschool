namespace $ {

	$mol_style_define( $bog_stschool_slides, {
		flex: { direction: 'column', grow: 1, shrink: 1, basis: '0px' },
		minHeight: 0,
		minWidth: 0,
		Stage: {
			flex: { grow: 1, shrink: 1, basis: '0px' },
			minHeight: 0,
			minWidth: 0,
			justify: { content: 'center' },
			align: { items: 'center' },
			overflow: 'hidden',
		},
		Page: {
			flex: { shrink: 1 },
			minHeight: 0,
			minWidth: 0,
			maxWidth: '100%',
			maxHeight: '100%',
			objectFit: 'contain',
		},
		Bar: {
			flex: { shrink: 0 },
			align: { items: 'center' },
			gap: $mol_gap.space,
			padding: $mol_gap.space,
		},
	})

}
