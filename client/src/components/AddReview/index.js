import React, { useState } from 'react';
import { ADD_REVIEW } from '../../utils/mutations';
import { useMutation } from '@apollo/react-hooks';

const ReviewForm = ({ sellerId }) => {
    const [addReview, { error } ] = useMutation(ADD_REVIEW);
    const [reviewBody, setBody] = useState('');
    const [characterCount, setCharacterCount] = useState(0);

    const handleChange = event => {
        if(event.target.value.length <=500) {
            setBody(event.target.value);
            setCharacterCount(event.target.value.length);
        }
    };

    const handleFormSubmit = async event => {
        event.preventDefault();

        //try/catch for updating database
        try{
            await addReview({
                variables: { sellerId, reviewBody }
            });
            setBody('');
        setCharacterCount(0);
        } catch(e) {
            console.error(e);
        }

    };

    return (
        <div>
            <p className = "m-0">
                Character Count {characterCount}/500
                {error && <span className = "ml-2">Something went wrong...</span>}
            </p>
            <form className="flex-row justify-center justify-space-between-md align-stretch" onSubmit = {handleFormSubmit}>
                <textarea
                placeholder = "Leave a review of your purchase experience." 
                value = {reviewBody} 
                className="form-input col-12 col-md-9"
                onChange = {handleChange}>
                </textarea>
                <button className="btn col-12 col-md-3" type="submit">
                    Submit
                </button>
            </form>
        </div>

    );
};

export default ReviewForm;
