import React from 'react'
import axios from 'axios'

export default {
	getSiteData: () => ({
		title: 'React Static',
	}),
	getRoutes: async () => {
		const { data: posts } = await axios.get('https://jsonplaceholder.typicode.com/posts')
		return [{
				path: '/',
				component: 'src/containers/Home',
			},
			{
				path: '/about',
				component: 'src/containers/About',
			},
			{
				path: '/blog',
				component: 'src/containers/Blog',
				getData: () => ({
					posts,
				}),
				children: posts.map(post => ({
					path: `/post/${post.id}`,
					component: 'src/containers/Post',
					getData: () => ({
						post,
					}),
				})),
			},
			{
				is404: true,
				component: 'src/containers/404',
			},
		]
	},
	Document: ({ Html, Head, Body, children, renderMeta }) => (
		// `renderMeta.styleTags` contains the styles we need to inject
		// into the head of each page.
		<Html>
			<Head>
				{renderMeta.styleTags}
				<link rel="shortcut icon" type="image/png" href="/favicon.ico"/>
			</Head>
			<Body> { children } </Body>
		</Html>
	),
}