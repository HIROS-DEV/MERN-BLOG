import { useNavigate } from 'react-router-dom';

const MainCard = ({ blogs }) => {
	const navigate = useNavigate();

	const mainArticle = blogs.slice(-1)[0];

	const jumpArticlePage = () => {
		navigate(`/blog/${mainArticle._id}`);
	};

	return (
		<article
			className='main__card'
			onClick={jumpArticlePage}
		>
			<div>
				<img
					src={mainArticle.image}
					alt={mainArticle.title}
				/>
			</div>
			<div>
				<h3>LATEST FROM THE BLOG</h3>

				<h1>{mainArticle.title}</h1>

				<p>
					{mainArticle.creator.username},{' '}
					{new Date(
						mainArticle.createdAt
					).toLocaleDateString('en-us', {
						weekday: 'long',
						year: 'numeric',
						month: 'short',
						day: 'numeric',
					})}
				</p>

				<h2>{mainArticle.description}</h2>
			</div>
		</article>
	);
};

export default MainCard;
