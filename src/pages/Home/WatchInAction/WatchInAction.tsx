import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import demo from '../../../assets/demo.gif';
import { styled } from "@mui/material";

const ResponsiveGif = styled('img')({
	border: '1px solid #00C2FF11',
})

export default function WatchInAction() {
	return (
		<section id="demo">
			<SectionTitle>Watch it in action!</SectionTitle>
			<ResponsiveGif src={demo} width="100%" />
		</section>
	)
}