import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const Errorpage = () => {
	const navigate = useNavigate();
	useEffect(() => {
		setTimeout(() => navigate('/'), 3000);
	}, []);
	return (
		<div className='flex w-full h-screen bg-white text-center align-middle justify-center'>
			<div className=' my-72 font-bold text-3xl text-blue-600 '>
				OOPPSSS!!!Something went wrong
			</div>
		</div>
	);
}

export default Errorpage;