import supabase from '$lib/db';

/** @type {import('./__types/items').RequestHandler} */
export async function get({ params }: { params: { uuid: string } }) {
	// console.log({ params });

	const { uuid } = params;

	if (!uuid) {
		return {
			status: 400,
			body: { errors: ['id is required'] }
		};
	}

	const { data, error } = await supabase.from('rosters').select('*').eq('uuid', uuid);

	// console.log({ data, error });

	if (!data || data.length === 0) {
		return {
			status: 404,
			body: { errors: ['roster not found'] }
		};
	}

	if (error) {
		return {
			status: 400,
			body: { errors: [error] }
		};
	}

	const { roster } = data[0];

	return {
		body: { roster }
	};
}
