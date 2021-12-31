import React, { useState, useContext } from 'react';
import { Button, TextField, Grid, Typography, Container, Paper, ThemeProvider } from '@material-ui/core';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Assignment, Phone, PhoneDisabled } from '@material-ui/icons';
import GetAppRoundedIcon from '@material-ui/icons/GetAppRounded';
import NotesRoundedIcon from '@material-ui/icons/NotesRounded';
import { makeStyles, createTheme } from '@material-ui/core/styles';
import { SocketContext } from '../SocketContext';


const theme = createTheme({
    palette: {
        primary: {
            main: '#3f50b5',
        },
        secondary: {
            main: '#c2185b',
        },
    },
});


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',

    },
    gridContainer: {
        width: '100%',
        [theme.breakpoints.down('xs')]: {
            flexDirection: 'column',
        },
    },
    container: {
        width: '600px',
        margin: '35px 0',
        padding: 0,
        [theme.breakpoints.down('xs')]: {
            width: '80%',
        },
    },
    margin: {
        marginTop: 20,
    },
    padding: {
        padding: 20,
    },
    paper: {
        padding: '10px 20px',
        border: '2px solid black',
        background: '#a977',
        // color: 'white',
    },
}));



const Options = ({ children }) => {
    const { me, callAccepted, name, setName, callEnded, leaveCall, callUser } = useContext(SocketContext);
    const [idToCall, setIdToCall] = useState('');
    const classes = useStyles();


    return (
        <Container className={classes.container}>
            <Paper elevation={10} className={classes.paper}>
                <form className={classes.root} noValidate autoComplete="off">
                    <Grid container className={classes.gridContainer}>
                        <Grid item xs={12} md={6} className={classes.padding}>
                            <Typography gutterBottom variant="h6">📜  Details</Typography>
                            <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} fullWidth />
                            <CopyToClipboard text={me} className={classes.margin}>
                                <Button variant="contained" color="primary" fullWidth startIcon={<Assignment fontSize="large" />}>
                                    Copy Your ID
                                </Button>
                            </CopyToClipboard>
                        </Grid>
                        <Grid item xs={12} md={6} className={classes.padding}>
                            <Typography gutterBottom variant="h6">Quick Call 📞</Typography>
                            <TextField label="ID to call" value={idToCall} onChange={(e) => setIdToCall(e.target.value)} fullWidth />
                            {callAccepted && !callEnded ? (
                                <Button variant="contained" color="secondary" startIcon={<PhoneDisabled fontSize="large" />} fullWidth onClick={leaveCall} className={classes.margin}>
                                    Hang Up
                                </Button>
                            ) : (
                                <Button variant="contained" color="primary" startIcon={<Phone fontSize="large" />} fullWidth onClick={() => callUser(idToCall)} className={classes.margin}>
                                    Call
                                </Button>
                            )}
                        </Grid>
                        {/* <ThemeProvider theme={theme}>
                            <Grid item xs={12} md={6} className={classes.padding}>
                                {callAccepted && !callEnded ? (
                                    <Button variant="contained" startIcon={<GetAppRoundedIcon fontSize="large" />} style={{ color: "white", background: "#2b57ad" }} fullWidth >
                                        Minutes of Meet
                                    </Button>
                                ) : null}
                            </Grid>
                            <Grid item xs={12} md={6} className={classes.padding}>
                                {callAccepted && !callEnded ? (
                                    <Button variant="contained" id="start" startIcon={<NotesRoundedIcon fontSize="large" />} style={{ color: "white", background: "#497049" }} fullWidth >
                                        Live Caption
                                    </Button>
                                ) : null}
                            </Grid>
                        </ThemeProvider> */}

                    </Grid>
                </form>
                {children}
            </Paper>
        </Container>
    );
};

export default Options;
