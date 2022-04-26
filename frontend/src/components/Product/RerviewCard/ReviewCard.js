import React from 'react';
import ReactStars from 'react-rating-stars-component';

import profilePng from '../../../assets/images/Profile.png';
import './ReviewCard.css';

const ReviewCard = ({ review }) => {

    const options = {
        edit: false,
        color: 'rgba(20, 20, 20, 0.1)',
        activeColor: 'tomato',
        size: window.innerHeight < 600 ? 20 : 25,
        value: review.rating,
        isHalf: true,
    };

    return (
        <div className='review-card'>
            <img className='review-card__avatar' src={profilePng} alt="user" />
            <p className='review-card__person' >{review.name}</p>
            <ReactStars {...options} />
            <span className='review-card__comment'>{review.comment}</span>
        </div>
    );
};

export default ReviewCard;