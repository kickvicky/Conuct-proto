import React, { useContext } from 'react'
import { Typography, AppBar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import VideoPlayer from './components/VideoPlayer';
import Options from './components/options';
import Notifications from './components/Notifications';
import TextToSpeech from './components/TextToSpeech'
import { SocketContext } from './SocketContext';

const useStyles = makeStyles((theme) => ({
    appBar: {
        borderRadius: 25,
        margin: '30px 100px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '600px',
        border: '3px solid #997690',
        color: '#bd9b3e',
        [theme.breakpoints.down('xs')]: {
            width: '90%',
        },
    },
    wrapper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
    },
}));

const App = () => {
    const classes = useStyles();
    const { callAccepted } = useContext(SocketContext);
    return (
        <div className={classes.wrapper}>
            <AppBar className={classes.appBar} position='static' color='inherit'>
                <Typography variant='h2' align='center'>
                    <b id='head'>CONUCT ⚓</b>
                    {/* 🔗 */}
                </Typography>
            </AppBar>
            <VideoPlayer />
            {callAccepted && (
                <TextToSpeech />
            )}
            <Options>
                <Notifications />
            </Options>
        </div>
    )
}

export default App
