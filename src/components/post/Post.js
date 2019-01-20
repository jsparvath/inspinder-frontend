import { withStyles } from '@material-ui/core/styles';
import { Card, CardMedia, CardContent, Typography, IconButton } from '@material-ui/core';
import { Edit, Delete } from '@material-ui/icons';
import { Collapse } from 'react-collapse';
import Link from 'next/link';
const styles = (theme) => ({
	// card: { maxWidth: 100 }
	card: {
		backgroundColor: theme.palette.bcSurface.main,
		color: theme.palette.bcSurface.contrastText,
		textAlign: 'left'
	},
	// icon: { color: theme.customColors.iconPrimary }
	icon: { color: theme.palette.secondary.main }
	// text: { color: theme.palette.primary.contrastText }
	// media: { height: 0, paddingTop: '58%' }
});
class Post extends React.Component {
	state = {
		expanded: false
	};
	render() {
		const { classes, image, thumbnailType, title, description, link, postId } = this.props;
		return (
			<Card
				className={classes.card}
				onMouseEnter={() => this.setState({ expanded: true })}
				onMouseLeave={() => this.setState({ expanded: false })}
			>
				{image && <CardMedia component={thumbnailType} className={classes.media} image={image} />}
				<CardContent>
					<Link href={{ pathname: '/update', query: { id: postId	 } }}>
						<a>
							<IconButton>
								<Edit className={classes.icon} />
							</IconButton>
						</a>
					</Link>
					<Delete className={classes.icon} />
					{title && <Typography variant="h6" component="p" />}
					{link && (
						<Typography className={classes.text} variant="p" component="p">
							{link}
						</Typography>
					)}
				</CardContent>
				<Collapse isOpened={this.state.expanded}>
					<CardContent>
						{description && (
							<Typography className={classes.text} variant="p" component="p">
								{description}
							</Typography>
						)}
					</CardContent>
				</Collapse>
			</Card>
		);
	}
}

export default withStyles(styles)(Post);
