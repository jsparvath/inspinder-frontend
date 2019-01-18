import React from 'react';
import App, { Container } from 'next/app';
import Head from 'next/head';
import cookies from 'next-cookies';
import { ApolloProvider } from 'react-apollo';
import withApollo from '../lib/withApollo';
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import JssProvider from 'react-jss/lib/JssProvider';
import getPageContext from '../src/getPageContext';
import Layout from '../src/components/layout/Layout';

class MyApp extends App {
	constructor() {
		super();
		this.pageContext = getPageContext();
	}
	static async getInitialProps({ Component, router, ctx }) {
		console.log('before pagesprops');
		let pageProps = {};
		const c = cookies(ctx);

		if (Component.getInitialProps) {
			pageProps = await Component.getInitialProps(ctx);
		}
		pageProps.query = ctx.query;
		console.log('pageProps');
		console.log(pageProps);
		if (pageProps.statusCode == 404) {
			console.log('pageprops bad status');
			pageProps = {};
		} else {
			console.log('pageProps good status');
		}
		return { pageProps };
	}
	componentDidMount() {
		// Remove the server-side injected CSS.
		const jssStyles = document.querySelector('#jss-server-side');
		if (jssStyles && jssStyles.parentNode) {
			jssStyles.parentNode.removeChild(jssStyles);
		}
	}

	render() {
		const { Component, pageProps, apollo } = this.props;
		return (
			<Container>
				<Head>
					<title>My page</title>
				</Head>
				{/* Wrap every page in Jss and Theme providers */}
				<JssProvider
					registry={this.pageContext.sheetsRegistry}
					generateClassName={this.pageContext.generateClassName}
				>
					{/* MuiThemeProvider makes the theme available down the React
              tree thanks to React context. */}
					<MuiThemeProvider theme={this.pageContext.theme} sheetsManager={this.pageContext.sheetsManager}>
						{/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
						<CssBaseline />
						<ApolloProvider client={apollo}>
							<Layout>
								{/* Pass pageContext to the _document though the renderPage enhancer
                to render collected styles on server-side. */}
								<Component pageContext={this.pageContext} {...pageProps} />
							</Layout>
						</ApolloProvider>
					</MuiThemeProvider>
				</JssProvider>
			</Container>
		);
	}
}

export default withApollo(MyApp);
