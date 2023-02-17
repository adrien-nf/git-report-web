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

const BoxContainer = styled(Box)(({ theme }) => ({
	paddingTop: theme.spacing(11),
	paddingBottom: theme.spacing(11),
}))

const HomeFooter = styled(Footer)(() => ({
	textAlign: 'center',
}))

export default function Home() {
	return (
		<React.Fragment>
			<BoxContainer>
				<Container maxWidth="xl">
					<Stack direction="column" spacing={10}>
						<Description />
						<CommandLine />
						<HowDoesItWork />
						<WatchInAction />
					</Stack>
				</Container>
			</BoxContainer>
			<HomeFooter>
					<GithubLink />
					<MadeBy />
			</HomeFooter>
		</React.Fragment >
	);
}
