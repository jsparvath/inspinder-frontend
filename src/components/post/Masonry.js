import { withStyles } from '@material-ui/core/styles';
import React from 'react';

const styles = (theme) => ({
	masonry: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		width: '100%',
		margin: 'auto'
	},
	masonryRow: {
		margin: '0 ' + theme.postList.masonryGap + 'px'
	},
	item: {
		marginBottom: 2 * theme.postList.masonryGap,
		width: '250'
	}
});

class Masonry extends React.Component {
	constructor(props) {
		super(props);
		this.state = { columns: 1 };
		this.onResize = this.onResize.bind(this);
	}
	componentDidMount() {
		this.onResize();
		window.addEventListener('resize', this.onResize);
	}

	getColumns(w) {
		return (
			this.props.brakePoints.reduceRight((p, c, i) => {
				return c < w ? p : i;
			}, this.props.brakePoints.length) + 1
		);
	}

	onResize() {
		try {
			const columns = this.getColumns(this.refs.Masonry.offsetWidth);
			if (columns !== this.state.columns) {
				this.setState({ columns: columns });
			}
		} catch (err) {}
	}

	mapChildren() {
		let col = [];
		const numC = this.state.columns;
		for (let i = 0; i < numC; i++) {
			col.push([]);
		}
		return this.props.children.reduce((p, c, i) => {
			p[i % numC].push(c);
			return p;
		}, col);
	}

	render() {
		const { classes } = this.props;
		return (
			<div className={classes.masonry} ref="Masonry">
				{this.mapChildren().map((col, ci) => {
					return (
						<div className={classes.masonryRow} key={ci}>
							{col.map((child, i) => {
								return (
									<div className={classes.item} key={i}>
										{child}
									</div>
								);
							})}
						</div>
					);
				})}
			</div>
		);
	}
}

export default withStyles(styles)(Masonry);
