import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Button, Dialog, AppBar, Toolbar, IconButton, Typography, Slide } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

const styles = {
    appBar: {
        position: 'relative'
    },
    flex: {
        flex: 1
    }
};

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

class FullScreenModal extends React.Component {
    handleClose = () => {
        const { handleClose } = this.props;
        handleClose();
    };

    render() {
        const { classes, open, title, children } = this.props;
        return (
            <div>
                <Dialog fullScreen open={open} onClose={this.handleClose} TransitionComponent={Transition}>
                    <AppBar className={classes.appBar}>
                        <Toolbar>
                            <IconButton color="inherit" onClick={this.handleClose} aria-label="Close">
                                <CloseIcon />
                            </IconButton>
                            <Typography variant="h6" color="inherit" className={classes.flex}>
                                {title}
                            </Typography>
                            <Button color="inherit" onClick={this.handleClose}>
                                Sauvegarder
                            </Button>
                        </Toolbar>
                    </AppBar>
                    {children}
                </Dialog>
            </div>
        );
    }
}

FullScreenModal.propTypes = {
    classes: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    open: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired,
    handleClose: PropTypes.func.isRequired
};

export default withStyles(styles)(FullScreenModal);
