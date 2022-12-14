import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import Date from '../../components/date'
import Layout from '../../components/layout'
import { getAllPostIds, getPostData } from '../../lib/posts'
import utilStyles from '../../styles/utils.module.css'

export interface PostProps {
	postData: {
		title: string
		date: string
		contentHtml: string
	}
}

const Post: React.FC<PostProps> = ({ postData }) => {
	return (
		<Layout>
			<Head>
				<title>{postData.title}</title>
			</Head>
			<article>
				<h1 className={utilStyles.headingXl}>{postData.title}</h1>
				<div className={utilStyles.lightText}>
					<Date dateString={postData.date} />
				</div>
				<div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
			</article>
		</Layout>
	)
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const postData = await getPostData(params.id as string)
	return {
		props: {
			postData,
		},
	}
}
/**
 * This function is required for dynamic route pages.
 * It must return an array of objects with a `params`
 * property, the value of each being an object with a
 * property name that matches the name of the page
 * between the square brackets.
 *
 * @example
 * [
 *  {
 *    params: {
 *      // the `id` property here matches to `[id].js`
 *      id: "some-path-id"
 *    }
 *  },
 *  {
 *    params: {
 *      id: "a-different-path-id"
 *    }
 *  }
 * ]
 */
export const getStaticPaths: GetStaticPaths = () => {
	const paths = getAllPostIds()
	return {
		paths,
		fallback: false,
	}
}

export default Post
