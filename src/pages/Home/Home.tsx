import React from 'react';
import Box from '@mui/material/Box';
import { Stack, styled } from '@mui/material';
import { Container } from '@mui/system';
import CommandLine from './CommandLine/CommandLine';
import Footer from '../../components/Footer/Footer';
import GithubLink from '../../components/GithubLink/GithubLink';
import MadeBy from '../../components/MadeBy/MadeBy';
import HowDoesItWork from './HowDoesItWork/HowDoesItWork';
import WatchInAction from './WatchInAction/WatchInAction';
import Description from './Description/Description';

const BoxContainer = styled(Box)(({ theme }) => ({
	paddingTop: theme.spacing(7),
	paddingBottom: theme.spacing(7),
}))

export default function Home() {
	return (
		<React.Fragment>
			<BoxContainer>
				<Container>
					<Stack direction="column" spacing={8}>
						<Description />
						<CommandLine />
						<HowDoesItWork />
						<WatchInAction />
					</Stack>
				</Container>
			</BoxContainer>
			<Footer textAlign="center">
				<GithubLink />
				<MadeBy />
			</Footer>
		</React.Fragment >
	);
}
