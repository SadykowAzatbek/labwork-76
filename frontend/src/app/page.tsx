'use client';
import React, { useState } from 'react';
import { Button, Grid, TextField } from '@mui/material';
import { useMutation } from 'react-query';
import axiosApi from '@/axiosApi';
import { useRouter } from 'next/router';

interface Props {
  author: string;
  message: string;
}

export default function Home() {
  const [message, setMessage] = useState<Props>({
    message: '',
    author: '',
  });

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setMessage((prevState) => (
      {
        ...prevState,
        [name]: value,
      }));
  };

  const messagePost = useMutation({
    mutationFn: async (messagePost: Props) => {
      await axiosApi.post('/message', messagePost);
    },
  });

  const formSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setMessage((prev) => ({
      ...prev,
      message: '',
      author: '',
    }));

    await messagePost.mutateAsync(message);
  };

  return (
    <form onSubmit={formSubmit}>
      <Grid container direction="column" spacing={1}>
        <Grid item xs>
          <TextField
            required
            id="author" name="author"
            label="author"
            value={message.author}
            onChange={inputChangeHandler}
          />
        </Grid>
        <Grid item xs>
          <TextField
            required
            id="message" name="message"
            label="message"
            value={message.message}
            onChange={inputChangeHandler}
          />
        </Grid>
        <Grid item xs>
          <Button type="submit" color="primary" variant="contained">post</Button>
        </Grid>
      </Grid>
    </form>
  );
}
