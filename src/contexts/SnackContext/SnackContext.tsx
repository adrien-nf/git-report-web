import { Alert, AlertColor, Slide, SlideProps, Snackbar } from '@mui/material';
import React, { createContext, useContext, useState } from 'react';

interface SnackAlert {
	message: string,
	autoHideDuration?: number,
	severity: AlertColor,
}

interface SnackContextSpec {
	successSnackbar: (message: string) => void,
	errorSnackbar: (message: string) => void,
}

const SnackContext = createContext<SnackContextSpec | undefined>(undefined);

function SlideTransition(props: SlideProps) {
	// eslint-disable-next-line react/jsx-props-no-spreading
	return <Slide {...props} direction="up" />;
}

function SnackContextProvider({ children }: { children: React.ReactNode }) {
	const [open, setOpen] = useState(false);
	const [snackAlert, setSnackAlert] = useState<SnackAlert>();

	const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
		if (reason === 'clickaway') return;
		setOpen(false);
	};

	const snackbar = (options: SnackAlert) => {
		setSnackAlert({
			...options
		});
		setOpen(true);
	}

	const successSnackbar = (message: string) => {
		snackbar({
			message,
			autoHideDuration: 4000,
			severity: "success",
		})
		setOpen(true);
	};

	const errorSnackbar = (message: string) => {
		snackbar({
			message,
			autoHideDuration: 4000,
			severity: "error",
		})
		setOpen(true);
	}

	return (
		<SnackContext.Provider value={{ errorSnackbar, successSnackbar }}>
			<Snackbar
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'center',
				}}
				TransitionComponent={SlideTransition}
				open={open}
				autoHideDuration={snackAlert?.autoHideDuration}
				onClose={handleClose}
			>
				<Alert
					onClose={handleClose}
					severity={snackAlert?.severity}
					sx={{ width: '100%' }}
				>
					{snackAlert?.message}
				</Alert>
			</Snackbar>
			{children}
		</SnackContext.Provider>
	);
}

export default SnackContextProvider;

export function useSnack(): SnackContextSpec {
	const context = useContext(SnackContext);
	if (!context) throw new Error('Using snack context outside of provider');
	return context;
}