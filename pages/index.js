import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import User from '../src/components/user/User';
import LandingPage from '../src/components/landing/LandingPage';
import PostList from '../src/components/post/PostList';
const styles = (theme) => ({
	root: {
		textAlign: 'center',
		paddingTop: theme.spacing.unit * 15
	}
});

class Index extends React.Component {
	state = {
		open: false
	};

	handleClose = () => {
		this.setState({
			open: false
		});
	};

	handleClick = () => {
		this.setState({
			open: true
		});
	};

	render() {
		const { classes } = this.props;
		const { open } = this.state;

		return (
			<div className={classes.root}>
				<User>
					{({ data, loading, error }) => {
						if (error) return <p>Error</p>;
						if (!data.me) return <LandingPage />;

						return <PostList />;
					}}
				</User>
			</div>
		);
	}
}

Index.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Index);
