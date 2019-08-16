import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Typography, Grid } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import face from '../../assets/face.jpg';

const useStyles = makeStyles(theme => ({
    author: {
        marginTop: '1rem'
    },
    avatar: {
        display: 'inline-block',
        margin: 10,
        width: 25,
        height: 25
    },
    title: {
        padding: '1rem 0 1rem 0',
        fontWeight: 'bold'
    },
    date: {
        fontSize: 10,
        marginBottom: '1rem',
        fontStyle: 'oblique'
    },
    favorite: {
        background: 'white',
        border: '1px solid lightgrey',
        borderRadius: '25px',
        padding: '15px',
        '&:hover': {
            background: 'rgb(225, 225, 225)',
            cursor: 'pointer'
        }
    }
}));

const PostDetails = ({ post }) => {
    const classes = useStyles();

    return (
        <div>
            <Grid container direction="row" justify="flex-start" alignItems="center" spacing={4} className={classes.author}>
                <Avatar src={face} component={'div'} className={classes.avatar} />
                <Typography variant="subtitle2" component="subtitle2"
                    className={classes.user}>{post.user.name}</Typography>
            </Grid>
            <Grid className={classes.content}>
                <Typography variant="h5" component="h5" className={classes.title}>{post.title}</Typography>
                <Typography variant="subtitle2" component="subtitle"
                    className={classes.text}>{post.description}</Typography>
                <p className={classes.date}>{post.date}</p>
                <button className={classes.favorite}>Favorite This Post!</button>
            </Grid>
        </div>
    );
};

export default PostDetails;
