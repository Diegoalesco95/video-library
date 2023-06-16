'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { MdPlayArrow, MdPlaylistAdd, MdPlaylistRemove } from 'react-icons/md';

import styles from 'app/styles/components/carousel-item.module.scss';

// import { setFavoriteUserMovie, deleteFavoriteUserMovie, getUserMovies } from '../actions';

const CarouselItem = (props) => {
	const {
		_id,
		cover,
		title,
		year,
		contentRating,
		duration,
		isList,
		userList,
		myList,
		setFavoriteUserMovie,
		deleteFavoriteUserMovie,
		getUserMovies,
	} = props;

	const handleSetFavorite = () => {
		const exist = myList.find((item) => item._id === _id);
		if (!exist) {
			setFavoriteUserMovie({
				_id,
				cover,
				title,
				year,
				contentRating,
				duration,
			});
			getUserMovies({ _id });
		} else {
		}
	};

	const handleDeleteFavorite = () => {
		const userMovieId = userList.find((userList) => userList.movieId === _id);
		deleteFavoriteUserMovie(userMovieId);
	};

	const handlePlay = (_id) => {
		// getVideoSource(_id);
	};

	return (
		<div className={styles['carousel-item']}>
			<Image className={styles['carousel-item__img']} width={200} height={250} src={cover} alt={title} />
			<div className={styles['carousel-item__details']}>
				<div className={styles['carousel-item__detail--icon']}>
					<Link href={`/player/${_id}`}>
						<MdPlayArrow className={styles.play} title='Play video' onClick={() => handlePlay(_id)} />
					</Link>
					{isList ? (
						<MdPlaylistRemove className={styles.remove} title='Delete from list' onClick={handleDeleteFavorite} />
					) : (
						<MdPlaylistAdd className={styles.add} title='Add to list' onClick={handleSetFavorite} />
					)}
				</div>
				<h2 className={styles['carousel-item__details--title']}>{title}</h2>
				<p className={styles['carousel-item__details--subtitle']}>{`${year} ${contentRating} ${duration}`}</p>
			</div>
		</div>
	);
};

export default CarouselItem;
