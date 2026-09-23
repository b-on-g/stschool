namespace $ {

	$mol_style_define( $bog_stschool_stream, {
		flex: { direction: 'column' },
		height: '100vh',
		background: { color: $mol_theme.back },
		Task: {
			flex: { direction: 'column', shrink: 0 },
			padding: $mol_gap.block,
			font: { size: '1.6rem' },
			background: { color: $mol_theme.card },
		},
		Task_title: {
			font: { weight: 'bold' },
		},
		Stage: {
			flex: { grow: 1, shrink: 1, direction: 'column' },
			minHeight: 0,
			overflow: 'hidden',
		},
		Tabs: {
			flex: { grow: 0, shrink: 0, wrap: 'wrap' },
			padding: $mol_gap.block,
			background: { color: $mol_theme.card },
		},
	})

}
