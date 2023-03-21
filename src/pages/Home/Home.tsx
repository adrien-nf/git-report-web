import React from 'react';
import Box from '@mui/material/Box';
import { Stack, styled, Container } from '@mui/material';
import CommandLine from './CommandLine/CommandLine';
import Footer from '../../components/Footer/Footer';
import GithubLink from '../../components/GithubLink/GithubLink';
import MadeBy from '../../components/MadeBy/MadeBy';
import HowDoesItWork from './HowDoesItWork/HowDoesItWork';
import WatchInAction from './WatchInAction/WatchInAction';
import Description from './Description/Description';
import { ScriptUrlContextProvider } from '../../contexts/ScriptUrlContext/ScriptUrlContext';

const paddingInline = {
	xl: '250px',
	lg: '100px',
	md: '60px',
	xs: '20px',
};

const paddingBlock = {
	md: '150px',
	sm: '100px',
	xs: '70px',
};

const HomeFooter = styled(Footer)(() => ({
	textAlign: 'center',
}))

export default function Home() {
	return (
		<React.Fragment>
			<Box sx={{ paddingInline, paddingBlock }}>
				<Stack direction="column" spacing={12}>
					<ScriptUrlContextProvider>
						<Description />
						<CommandLine />
					</ScriptUrlContextProvider>
					<HowDoesItWork />
					<WatchInAction />
				</Stack>
			</Box>
			<HomeFooter>
				<Box display="flex" gap="10px" justifyContent="center" alignItems="center">
					<GithubLink />
					<small>v{__APP_VERSION__}</small>
				</Box>
				<MadeBy />
			</HomeFooter>
		</React.Fragment >
	);
}
