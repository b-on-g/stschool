namespace $ {

	$mol_style_define( $bog_stschool_slides, {
		flex: { direction: 'column', grow: 1 },
		minHeight: 0,
		Stage: {
			flex: { grow: 1 },
			minHeight: 0,
			justify: { content: 'center' },
			align: { items: 'center' },
			overflow: 'hidden',
		},
		Page: {
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
