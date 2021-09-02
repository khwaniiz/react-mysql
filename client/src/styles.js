
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
    container: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(2, 0, 2),
        textAlign: "center",
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    employeesBox: {
        fontFamily: 'Courier New',
    }
}))

export default useStyles;