import MainCard from '../components/MainCard';
import Cards from '../components/Cards';

const Home = ({ blogs, loading }) => {
	return (
		<main>
			<article className='main__article'>
				{!loading && <MainCard blogs={blogs} />}
			</article>
			<article className='main__articles'>
				<Cards blogs={blogs} />
			</article>
		</main>
	);
};

export default Home;
