const SNACKBAR_ERROR_OPTIONS = {
  duration: 3500,
  type: 'is-danger',
  position: 'is-bottom-right'
}

const ERROR_MESSAGES = {
  401: 'You are unathorized. Please refresh the website and log in.',
  404: 'Resource not found. Please refresh the website and try again.',
  422: 'Something went wrong. Please try again.',
  500: 'Something went wrong. Please try later.'
}

const ERROR_MESSAGE_FALLBACK = 'Something went wrong. Please try again later.'

export default {
  methods: {
    handleError (error, options = { snackbar: true, console: true }) {
      if (options['snackbar']) {
        const errorCode = (error.response || {}).status
        this.showSnackbarError(errorCode, options['snackbarConfig'])
      }

      if (options['console']) {
        console.error(error)
      }
    },
    showSnackbarError (errorCode, snackbarConfig = {}) {
      const errorMsg = this.getErrorMessage(errorCode)
      const options = { ...SNACKBAR_ERROR_OPTIONS, ...snackbarConfig, message: errorMsg }

      this.$buefy.snackbar.open(options)
    },
    getErrorMessage (errorCode) {
      return ERROR_MESSAGES[errorCode] || ERROR_MESSAGE_FALLBACK
    }
  }
}
