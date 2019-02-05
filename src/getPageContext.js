import { SheetsRegistry } from 'jss';
import { createMuiTheme, createGenerateClassName } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';
import green from '@material-ui/core/colors/green';

// A theme with custom primary and secondary color.
// It's optional.
const theme = createMuiTheme({
	palette: {
		// type: 'dark',
		primary: { main: '#272727', contrastText: '#fafafa' },
		secondary: {
			// main: '#faed26'
			main: '#f4976c'
		},
		bcSurface: {
			main: '#fafafa',
			contrastText: '#272727'
		}
	},
	typography: {
		useNextVariants: true
	},
	postList: {
		masonryGap: 10,
		masonryItemWidth: 220
	},
	customColors: {
		iconPrimary: '#fefefe'
	},
	post: {
		iconButton: {
			padding: '5px'
		}
	}
});

function createPageContext() {
	return {
		theme,
		// This is needed in order to deduplicate the injection of CSS in the page.
		sheetsManager: new Map(),
		// This is needed in order to inject the critical CSS.
		sheetsRegistry: new SheetsRegistry(),
		// The standard class name generator.
		generateClassName: createGenerateClassName()
	};
}

let pageContext;

export default function getPageContext() {
	// Make sure to create a new context for every server-side request so that data
	// isn't shared between connections (which would be bad).
	if (!process.browser) {
		return createPageContext();
	}

	// Reuse context on the client-side.
	if (!pageContext) {
		pageContext = createPageContext();
	}

	return pageContext;
}
