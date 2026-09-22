namespace $ {

	export function $bog_stschool_link_synced< const Value extends any >( Value: Value ) {
		const Base = $giper_baza_atom_link_to( Value )
		class Synced extends Base {
			remote( next?: any ) {
				const target = ( super.remote as any )( next )
				if( target && next === undefined ) {
					try { target.land().sync() }
					catch( error ) { if( !$mol_promise_like( error ) ) throw error }
				}
				return target
			}
		}
		return Synced as typeof Base
	}

	export class $bog_stschool_item extends $giper_baza_dict.with({
		Text: $giper_baza_atom_text,
		Key: $giper_baza_atom_text,
	}) {}

	export class $bog_stschool_task extends $giper_baza_dict.with({
		Title: $giper_baza_atom_text,
		Home: $giper_baza_atom_bool,
		Items: $giper_baza_list_link.to( ()=> $bog_stschool_item ),
		Created: $giper_baza_atom_time,
	}) {}

	export class $bog_stschool_slide extends $giper_baza_dict.with({
		After: $giper_baza_atom_real,
		Board: $giper_baza_atom_text,
	}) {}

	export class $bog_stschool_deck extends $giper_baza_dict.with({
		Title: $giper_baza_atom_text,
		File: $bog_stschool_link_synced( ()=> $giper_baza_file ),
		Slides: $giper_baza_list_link.to( ()=> $bog_stschool_slide ),
	}) {}

	export class $bog_stschool_group extends $giper_baza_dict.with({
		Title: $giper_baza_atom_text,
		Teacher: $giper_baza_atom_text,
		Roster: $giper_baza_atom_text,
		Tasks: $giper_baza_list_link.to( ()=> $bog_stschool_task ),
		Current: $giper_baza_atom_text,
		Decks: $giper_baza_list_link.to( ()=> $bog_stschool_deck ),
		Board: $giper_baza_atom_text,
	}) {}

	export class $bog_stschool_member extends $giper_baza_dict.with({
		Name: $giper_baza_atom_text,
		Land: $giper_baza_atom_text,
	}) {}

	export class $bog_stschool_roster extends $giper_baza_dict.with({
		Members: $giper_baza_list_link.to( ()=> $bog_stschool_member ),
	}) {}

	export class $bog_stschool_reply extends $giper_baza_dict.with({
		Task: $giper_baza_atom_text,
		Item: $giper_baza_atom_real,
		Text: $giper_baza_atom_text,
		Time: $giper_baza_atom_time,
		Mark: $giper_baza_atom_text,
	}) {}

	export class $bog_stschool_student extends $giper_baza_dict.with({
		Name: $giper_baza_atom_text,
		Group: $giper_baza_atom_text,
		Replies: $giper_baza_list_link.to( ()=> $bog_stschool_reply ),
		Sent: $giper_baza_dict_to( $giper_baza_atom_time ),
	}) {}

	export class $bog_stschool_home extends $giper_baza_dict.with({
		Name: $giper_baza_atom_text,
		Teach: $giper_baza_list_str,
		Learn: $giper_baza_dict_to( $giper_baza_atom_text ),
	}) {}

}
