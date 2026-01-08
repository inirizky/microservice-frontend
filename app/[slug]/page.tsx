import getShortLink from '@/lib/shortlink'
import { redirect } from 'next/navigation';
import React from 'react'
interface Params {
	params: {
		slug: string;
	}
}
export default async function page({ params }: Params) {
	const { slug } = await params
	const data = await getShortLink(slug)

	if (!data) {
		return (
			<div className='flex justify-center items-center h-screen'>
				Link not found
			</div>
		)
	}
	const url = data.data.url


	console.log(data);

	redirect(url)

}
