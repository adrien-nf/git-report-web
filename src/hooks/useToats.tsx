import { OptionsObject, SnackbarMessage, useSnackbar } from "notistack";

export function useToasts() {
	const { enqueueSnackbar, closeSnackbar } = useSnackbar();

	const successSnackbar = (message: SnackbarMessage, options?: OptionsObject) => {
		return enqueueSnackbar(message, { ...options, variant: "success" })
	}

	const errorSnackbar = (message: SnackbarMessage, options?: OptionsObject) => {
		return enqueueSnackbar(message, { ...options, variant: "error" })
	}

	const warningSnackbar = (message: SnackbarMessage, options?: OptionsObject) => {
		return enqueueSnackbar(message, { ...options, variant: "warning" })
	}

	return {
		enqueueSnackbar,
		closeSnackbar,
		successSnackbar,
		errorSnackbar,
		warningSnackbar
	}
}