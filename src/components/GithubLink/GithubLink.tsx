import { Link } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';

export default function GithubLink() {
	return (
		<Link href="https://github.com/adrien-nf/git-report-web" target="_blank" >
			<GitHubIcon style={{
				verticalAlign: "middle",
				display: "inline-block",
				fontSize: "1.25em"
			}} /> <span style={{
				verticalAlign: "text-top",
				display: "inline-block"
			}}>Git Report</span>
		</Link>
	)
}