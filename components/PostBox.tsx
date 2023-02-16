import { useSession } from 'next-auth/react';
import React, { useState } from 'react';
import Avatar from './Avatar';
import { LinkIcon, PhotoIcon } from '@heroicons/react/24/outline';
import { useForm } from 'react-hook-form';
import { useMutation } from '@apollo/client';
import { ADD_POST, ADD_SUBREDDIT } from '@/graphql/mutations';
import client from '@/apollo-client';
import { GET_ALL_POSTS, GET_SUBREDDIT_BY_TOPIC } from '@/graphql/queries';
import toast from 'react-hot-toast';

type FormData = {
  postTitle: string;
  postBody: string;
  postImage: string;
  subreddit: string;
};

type Props = {
  subreddit?: string;
};

const PostBox = ({ subreddit }: Props) => {
  const { data: session } = useSession();
  const [addPost] = useMutation(ADD_POST, {
    refetchQueries: [GET_ALL_POSTS, 'postList'],
  });
  const [addSubreddit] = useMutation(ADD_SUBREDDIT);

  const [imageBoxUpen, setImageBoxOpen] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm<FormData>();

  const onSubmit = handleSubmit(async (formData) => {
    const notification = toast.loading('Creating new post...');
    try {
      // Query for subreddit topic
      const {
        data: { subredditListByTopic },
      } = await client.query({
        query: GET_SUBREDDIT_BY_TOPIC,
        variables: {
          topic: subreddit || formData.subreddit,
        },
      });

      const subredditExists = subredditListByTopic.length > 0;

      if (!subredditExists) {
        // create subreddit
        console.log('Subreddit is new! -> Createing a NEW Subreddit!');

        const {
          data: { insertSubreddit: newSubreddit },
        } = await addSubreddit({
          variables: {
            topic: formData.subreddit,
          },
        });

        console.log('Creating post...', formData);
        const image = formData.postImage || '';

        const {
          data: { insertPost: newPost },
        } = await addPost({
          variables: {
            body: formData.postBody,
            image,
            subreddit_id: newSubreddit.id,
            title: formData.postTitle,
            username: session?.user?.name,
          },
        });

        console.log('New Post added', newPost);
      } else {
        // use existing subreddit
        console.log('Using existing subreddit');
        const image = formData.postImage || '';

        const {
          data: { insertPost: newPost },
        } = await addPost({
          variables: {
            body: formData.postBody,
            image,
            subreddit_id: subredditListByTopic[0].id,
            title: formData.postTitle,
            username: session?.user?.name,
          },
        });

        console.log('New Post added', newPost);
      }

      setValue('postBody', '');
      setValue('postTitle', '');
      setValue('postImage', '');
      setValue('subreddit', '');

      toast.success('New Post Created!', { id: notification });
    } catch (error) {
      toast.error('Whoops something went wrong!', { id: notification });
    }
  });

  return (
    <form
      onSubmit={onSubmit}
      className="sticky top-16 z-50 bg-white border rounded-md border-gray-300 p-2"
    >
      <div className="flex items-center space-x-3">
        <Avatar />
        <input
          {...register('postTitle', { required: true })}
          disabled={!session}
          className="bg-gray-50 p-2 pl-5 outline-none rounded-md flex-1"
          type="text"
          placeholder={
            session
              ? subreddit
                ? `Create a post in r/${subreddit}`
                : 'Create a post by entering a title!'
              : 'Sign in to post'
          }
        />
        <PhotoIcon
          onClick={() => setImageBoxOpen(!imageBoxUpen)}
          className={`h-6 text-gray-300 cursor-pointer ${
            imageBoxUpen && 'text-blue-300'
          }`}
        />
        <LinkIcon className="h-6 text-gray-300" />
      </div>
      {!!watch('postTitle') && (
        <div className="flex flex-col py-2">
          {/* Body */}
          <div className="flex items-center px-2">
            <p className="min-w-[90px]">Body:</p>
            <input
              className="m-2 flex-1 bg-blue-50 p-2 outline-none"
              {...register('postBody')}
              type="text"
              placeholder="Text (Optional)"
            />
          </div>
          {/* Subreddit */}
          {!subreddit && (
            <div className="flex items-center px-2">
              <p className="min-w-[90px]">Subreddit:</p>
              <input
                {...register('subreddit', { required: true })}
                className="m-2 flex-1 bg-blue-50 p-2 outline-none"
                type="text"
                placeholder="i.e. reactjs"
              />
            </div>
          )}

          {/* Image */}
          {imageBoxUpen && (
            <div className="flex items-center px-2">
              <p className="min-w-[90px]">Image URL:</p>
              <input
                className="m-2 flex-1 bg-blue-50 p-2 outline-none"
                {...register('postImage')}
                type="text"
                placeholder="Optional..."
              />
            </div>
          )}

          {/* Errors */}
          {Object.keys(errors).length > 0 && (
            <div className="space-y-2 p-2 text-red-500">
              {errors.postTitle?.type === 'required' && (
                <p>- A Post Title is required</p>
              )}

              {errors.subreddit?.type === 'required' && (
                <p>- Subreddit is required</p>
              )}
            </div>
          )}

          {watch('postTitle') && (
            <button
              type="submit"
              className="w-full rounded-full bg-blue-400 p-2 text-white"
            >
              Create Post
            </button>
          )}
        </div>
      )}
    </form>
  );
};

export default PostBox;
