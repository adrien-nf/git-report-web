import { Box, Link } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';

export default function GithubLink() {
	return (
		<Link href="https://github.com/adrien-nf/git-report-web" target="_blank">
			<Box display="flex" alignItems="center" gap="6px" width="fit-content">
				<GitHubIcon />
				Git Report
			</Box>
		</Link>
	)
}