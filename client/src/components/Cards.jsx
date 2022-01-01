import { useNavigate } from 'react-router-dom';

const Cards = ({ blogs }) => {
	const navigate = useNavigate();
	const jumpArticlePage = (id) => {
		navigate(`/blog/${id}`);
	};
	
	const selectedBlog = blogs.slice(0, -1);

	return (
		<section className='main__cards'>
			{selectedBlog.map((blog) => (
				<div
					key={blog._id}
					onClick={() => jumpArticlePage(blog._id)}
				>
					<img src={blog.image} alt={blog.title} />

					<div>
						<h1>{blog.title}</h1>

						<p>
							{blog.creator.username}, {blog.createdAt}
						</p>

						<h2>
							{blog.description}
						</h2>
					</div>
				</div>
			))}
		</section>
	);
};

export default Cards;
