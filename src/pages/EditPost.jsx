import React, {useEffect, useState} from 'react';
import {Container, PostForm} from '../components';
import service from '../appwrite/config';
import { useNavigate, useParams } from 'react-router-dom';

function EditPost() {
    const [post, setPost] = useState(null);
    const {slug} = useParams();
    const navigate = useNavigate();
    useEffect(() => {       
        if(slug){           
            service.getPost(slug).then((response) => {
                if(response) setPost(response)
            })
        } else {
            navigate('/');
        }
    }, [])
  return post ? (
    <div className='py-8'>
      <Container>
        <PostForm post={post}></PostForm>
      </Container>
    </div>
  ) : null;
}

export default EditPost
