import { Stack } from "@mui/material";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";

export default function WatchInAction() {
	return (
		<Stack spacing={2}>
			<SectionTitle>Watch it in action!</SectionTitle>
			<iframe
				src="https://www.youtube.com/embed/wnhvanMdx4s"
				style={{ border: 0, aspectRatio: 16 / 9 }}
				title="GitReport demo"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
				allowFullScreen></iframe>
		</Stack>
	)
}