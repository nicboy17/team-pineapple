import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { getFollowing } from '../../actions/user';
import { withStyles } from '@material-ui/styles';
import Users from '../../components/Users/Users';

const styles = theme => ({
    root: {
        padding: '1rem 5rem'
    },
    header: {
        marginBottom: theme.spacing(4)
    }
});

class FollowingPage extends Component {
    componentDidMount () {
        const { userStore, getFollowing, match } = this.props;
        if (match.params.username === userStore.user.username) {
            getFollowing(this.props.userStore.user._id);
        } else {
            getFollowing(this.props.profileStore.user._id);
        }
    }

    render () {
        const { classes, profileStore: { following } } = this.props;
        return (
            <div className={classes.root}>
                <h1>Following:</h1>
                <div>
                    <Users users={following} history={this.props.history}/>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    userStore: state.UserStore,
    profileStore: state.ProfileStore
});

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            getFollowing
        },
        dispatch
    );
};

export default compose(
    withStyles(styles),
    connect(
        mapStateToProps,
        mapDispatchToProps
    )
)(FollowingPage);